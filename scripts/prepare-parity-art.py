"""Prepare user-authorized clean cutouts; originals/references remain untouched."""
from pathlib import Path
import hashlib, json, shutil
import cv2
import numpy as np
from PIL import Image
from fontTools import subset

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path('C:/Users/USER/.codex/generated_images/01a13c75-16d4-7e80-a719-f2b9c2b257b4')
EVIDENCE = ROOT / 'artifacts/visual-qa/parity-v2/source-art'
OUT = ROOT / 'public/assets/illustrations/parity-v2'
EVIDENCE.mkdir(parents=True, exist_ok=True)
OUT.mkdir(parents=True, exist_ok=True)
ASSETS = {
    'hero-trio': ('exec-9ab37cb6-8fe5-4a57-ad14-5b71da7bd028.png', [1400, 800]),
    'discussion': ('exec-248986f5-71c3-4f36-bfe0-04904fb5fe7d.png', [1200, 650]),
    'portrait-male': ('exec-b2c49598-ff7a-4e38-b326-de0359a07d42.png', [500]),
    'portrait-woman': ('exec-8659cb06-4cd5-44c9-a86e-7c06742c66d2.png', [500]),
    'portrait-coder': ('exec-9d413767-cc6b-40d0-ab58-0185230e698b.png', [500]),
}
records = []
for name, (source, widths) in ASSETS.items():
    original = EVIDENCE / source
    if not original.exists():
        shutil.copy2(SOURCE / source, original)
    im = Image.open(original).convert('RGBA')
    pixels = np.array(im)
    alpha = pixels[:, :, 3]
    # Remove isolated generated alpha flecks, retaining the original soft edge.
    # Portrait outputs include an unwanted low-alpha glow; isolate the opaque sticker.
    threshold = 220 if name.startswith('portrait') else 12
    count, labels, stats, _ = cv2.connectedComponentsWithStats((alpha > threshold).astype('uint8'), 8)
    keep = np.zeros(count, dtype=bool)
    keep[1:] = stats[1:, cv2.CC_STAT_AREA] >= 100
    pixels[:, :, 3] = np.where(keep[labels], alpha, 0)
    im = Image.fromarray(pixels)
    bounds = im.getbbox()
    im = im.crop(bounds)
    outputs = []
    for width in widths:
        resized = im.resize((width, round(im.height * width / im.width)), Image.Resampling.LANCZOS)
        dest = OUT / f'{name}-{width}.webp'
        resized.save(dest, 'WEBP', quality=88, method=6)
        outputs.append({'path': str(dest.relative_to(ROOT)), 'size': resized.size, 'bytes': dest.stat().st_size})
    records.append({'name': name, 'source': source, 'sourceSha256': hashlib.sha256(original.read_bytes()).hexdigest(), 'alphaBounds': bounds, 'outputs': outputs})
(EVIDENCE / 'manifest.json').write_text(json.dumps(records, indent=2), encoding='utf-8')
brand = Image.open(ROOT/'public/assets/brand/siapsatu-display.png').convert('RGBA')
brand.crop((0,0,470,455)).resize((160,155),Image.Resampling.LANCZOS).save(ROOT/'public/assets/brand/siapsatu-symbol-v2.webp','WEBP',lossless=True)
options=subset.Options()
options.flavor='woff2'
font=subset.load_font(str(ROOT/'public/assets/fonts/Kalam-Regular.ttf'),options)
subsetter=subset.Subsetter(options=options)
subsetter.populate(unicodes=range(32,256))
subsetter.subset(font)
subset.save_font(font,str(ROOT/'public/assets/fonts/Kalam-latin-v2.woff2'),options)
print(json.dumps(records, indent=2))
