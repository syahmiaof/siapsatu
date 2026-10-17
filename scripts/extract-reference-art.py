"""Deterministic, user-authorized crops. Originals remain byte-for-byte intact.

Masks exclude functional UI. Decorative lettering stays inside the artwork.
Coordinates are in the supplied source image, never an upscaled screenshot.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/assets/illustrations/reference'
QA = ROOT / 'artifacts/visual-qa/reference-repair'
OUT.mkdir(parents=True, exist_ok=True)
QA.mkdir(parents=True, exist_ok=True)

SPECS = {
    'home': ('homepage-theme-03-malaysia-utility.png', (600, 0, 1505, 575),
        [(644,565),(644,550),(625,522),(615,495),(604,460),(618,410),(645,355),(675,300),(710,250),(743,226),(718,185),(715,134),(777,125),(790,105),(895,72),(1040,0),(1505,0),(1505,575),(1340,575),(1335,565)],
        [(1290,8,1480,82)]),
    'tools': ('ui-01-tools-directory-desktop.png', (740,103,1505,337),
        [(980,103),(1505,103),(1505,337),(742,337),(795,286),(825,237),(870,183),(918,145)], []),
    'path-learner': ('ui-04-learning-path-automation-v2.png', (740,84,1505,475),
        [(768,475),(768,400),(780,360),(748,290),(748,205),(775,190),(775,110),(825,104),(900,97),(975,57),(1100,0),(1505,0),(1505,475)],
        [(1318,8,1480,83)]),
    'community': ('ui-09-community-hub.png', (635,89,1505,287),
        [(635,287),(660,265),(675,235),(710,195),(728,140),(757,120),(850,89),(1505,89),(1505,287)], []),
    'home-discussion': ('homepage-theme-03-malaysia-utility.png', (35,856,610,1027),
        [(35,1027),(45,980),(65,940),(75,912),(92,884),(130,865),(170,867),(195,878),(207,859),(270,856),(291,872),(296,898),(326,900),(341,878),(350,867),(413,865),(427,887),(447,881),(482,878),(510,891),(525,920),(557,920),(590,922),(609,937),(608,958),(579,970),(584,1000),(588,1027)], []),
    'tools-mobile': ('ui-10-tools-directory-mobile-v2.png', (380,190,853,606),
        [(380,514),(475,472),(535,439),(560,400),(570,350),(571,286),(543,280),(542,214),(610,214),(633,258),(690,228),(735,215),(790,211),(853,190),(853,606),(653,606),(665,581),(665,540),(650,520),(630,514)], []),
}

manifest = []
for name, (source, box, points, holes) in SPECS.items():
    src = ROOT / 'mockups' / source
    im = Image.open(src).convert('RGBA')
    mask = Image.new('L', (im.width*4, im.height*4))
    draw = ImageDraw.Draw(mask)
    draw.polygon([(x*4,y*4) for x,y in points], fill=255)
    for hole in holes:
        draw.rectangle(tuple(v*4 for v in hole), fill=0)
    alpha = mask.resize(im.size, Image.Resampling.LANCZOS)
    # Keep functional-control exclusions exactly transparent after resampling.
    for hole in holes:
        ImageDraw.Draw(alpha).rectangle(hole, fill=0)
    im.putalpha(alpha)
    crop = im.crop(box)
    if name == 'home-discussion':
        # Retain white character/speech outlines around the hand-drawn envelope.
        crop.putalpha(crop.getchannel('A').filter(ImageFilter.MaxFilter(25)).filter(ImageFilter.GaussianBlur(0.6)))
    target = OUT / f'{name}.webp'
    crop.save(target, lossless=True, method=6)
    # A small source-derived mobile Home frame keeps all three people, no new pixels.
    if name == 'home':
        crop.crop((0,40,crop.width,crop.height)).save(OUT/'home-mobile.webp', lossless=True, method=6)
        mobile = OUT/'home-mobile.webp'
        manifest.append({'name':'home-mobile','source':str(src.relative_to(ROOT)),
            'sourceSha256':hashlib.sha256(src.read_bytes()).hexdigest(),
            'crop':(600,40,1505,575),'maskPolygon':points,'excludedUI':holes,
            'output':str(mobile.relative_to(ROOT)),'size':(905,535),
            'outputSha256':hashlib.sha256(mobile.read_bytes()).hexdigest()})
    checker = Image.new('RGBA', crop.size, '#e7eaf0')
    cd = ImageDraw.Draw(checker)
    for y in range(0,crop.height,20):
        for x in range(0,crop.width,20):
            if (x//20+y//20)%2: cd.rectangle((x,y,x+19,y+19), fill='white')
    checker.alpha_composite(crop)
    checker.convert('RGB').save(QA/f'{name}-mask-check.png')
    manifest.append({'name':name,'source':str(src.relative_to(ROOT)),
        'sourceSha256':hashlib.sha256(src.read_bytes()).hexdigest(),
        'crop':box,'maskPolygon':points,'excludedUI':holes,
        'output':str(target.relative_to(ROOT)),'size':crop.size,
        'outputSha256':hashlib.sha256(target.read_bytes()).hexdigest()})
(QA/'asset-manifest.json').write_text(json.dumps(manifest,indent=2))
print(f'Extracted {len(SPECS)+1} lossless artwork assets; originals untouched.')
