from pathlib import Path
import json, hashlib
from PIL import Image, ImageDraw
import cv2
import numpy as np

root = Path('.').resolve()
src = root / 'artifacts/visual-qa/ui-v3/source-art/path-learner.png'
out = root / 'public/assets/illustrations/ui-v4'
out.mkdir(parents=True, exist_ok=True)

im = Image.open(src).convert('RGBA')
p = np.array(im)
a = p[:, :, 3]

# Isolate largest connected component of alpha > 200 to remove stray flecks
n, labels, stats, _ = cv2.connectedComponentsWithStats((a > 200).astype('uint8'), 8)
largest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
p[:, :, 3] = np.where(labels == largest, a, 0)

im = Image.fromarray(p)
bounds = im.getbbox()
im = im.crop(bounds)
print(f'Cropped bounds without bottom trim: {bounds}, size: {im.size}')

# Let's save a preview of the bottom
bottom_preview = im.crop((0, im.height - 100, im.width, im.height))
bottom_preview.save('artifacts/visual-qa/ui-v4/source-art/preview_unclipped_baseline.png')

# Save full 1100 and 600 responsive webp exports
outputs = []
for width in [1100, 600]:
    h = round(im.height * width / im.width)
    resized = im.resize((width, h), Image.Resampling.LANCZOS)
    dest = out / f'path-learner-{width}.webp'
    resized.save(dest, 'WEBP', quality=92, method=6)
    sha = hashlib.sha256(dest.read_bytes()).hexdigest()
    outputs.append({'path': str(dest.relative_to(root)), 'size': resized.size, 'sha256': sha})
    print(f'Saved {dest}: size={resized.size}, sha={sha}')

# Checkerboard visual proof at 100%
check = Image.new('RGBA', im.size)
d = ImageDraw.Draw(check)
for y in range(0, im.height, 20):
    for x in range(0, im.width, 20):
        d.rectangle((x, y, x + 19, y + 19), fill='#d8d8d8' if (x // 20 + y // 20) % 2 else '#ffffff')
check.alpha_composite(im)
check.convert('RGB').save('artifacts/visual-qa/ui-v4/source-art/path-learner-100-proof.png')
print('Finished preparing unclipped path learner art.')
