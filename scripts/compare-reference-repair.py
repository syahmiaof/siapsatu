"""Matched-viewport evidence; never stretches source mockups or overwrites them."""
from pathlib import Path
from PIL import Image, ImageDraw
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
QA = ROOT / 'artifacts/visual-qa/reference-repair'
phase = sys.argv[1] if len(sys.argv) > 1 else 'final'
OUT = QA / f'{phase}-comparisons'
OUT.mkdir(exist_ok=True)
refs = {'home':'homepage-theme-03-malaysia-utility.png', 'tools':'ui-01-tools-directory-desktop.png',
        'paths-ai-automation':'ui-04-learning-path-automation-v2.png', 'community':'ui-09-community-hub.png'}
rows = []
for name, reference in refs.items():
    ref = Image.open(ROOT/'mockups'/reference).convert('RGB')
    current = Image.open(QA/phase/f'1505-{name}-fold.png').convert('RGB')
    h = max(ref.height,current.height)
    a = Image.new('RGB',(1505,h),'white'); a.paste(ref,(0,0))
    b = Image.new('RGB',(1505,h),'white'); b.paste(current,(0,0))
    pair = Image.new('RGB',(3010,h+36),'white')
    pair.paste(a,(0,36)); pair.paste(b,(1505,36))
    draw=ImageDraw.Draw(pair); draw.rectangle((0,0,3010,36),fill='#03143a')
    draw.text((16,10),'APPROVED REFERENCE - '+name,fill='white')
    draw.text((1521,10),phase.upper()+' - 1505 x 1029 CSS, DPR 1',fill='white')
    pair.save(OUT/f'{name}-reference-pair.jpg',quality=90)
    Image.blend(a,b,.5).save(OUT/f'{name}-overlay.png')
    before=Image.open(ROOT/'artifacts/visual-qa/independent-v4-audit'/f'{name}.png').convert('RGB')
    pair.paste(before,(0,36)); draw.rectangle((0,0,3010,36),fill='#03143a')
    draw.text((16,10),'BEFORE - V4 LIVE AUDIT',fill='white');draw.text((1521,10),'AFTER - '+phase.upper(),fill='white')
    pair.save(OUT/f'{name}-before-after.jpg',quality=90)
    rows.append(f'<h2>{name}</h2><a href="{phase}-comparisons/{name}-reference-pair.jpg">Reference pair</a> · <a href="{phase}-comparisons/{name}-overlay.png">50% overlay</a><img src="{phase}-comparisons/{name}-before-after.jpg" alt="{name}: before v4 / after repair">')
mobile_ref=Image.open(ROOT/'mockups/ui-10-tools-directory-mobile-v2.png').convert('RGB')
mobile_ref=mobile_ref.crop((0,90,mobile_ref.width,mobile_ref.height))
for w in (390,360):
    act=Image.open(QA/phase/f'{w}-tools-fold.png').convert('RGB')
    ref=mobile_ref.resize((w,round(mobile_ref.height*w/mobile_ref.width)),Image.Resampling.LANCZOS)
    h=max(ref.height,act.height);pair=Image.new('RGB',(w*2,h+30),'white')
    pair.paste(ref,(0,30));pair.paste(act,(w,30));d=ImageDraw.Draw(pair);d.text((8,8),'REFERENCE / '+phase.upper(),fill='black')
    pair.save(OUT/f'{w}-tools-reference-pair.jpg',quality=92)
records=json.loads((QA/phase/'geometry.json').read_text())
summary={'phase':phase,'captures':len(records),'overflow':sum(r['scrollWidth']>r['width'] for r in records),
         'brokenImages':sum(len(r['brokenImages']) for r in records),'pageErrors':sum(len(r['errors']) for r in records),
         'maxObservedCLS':max(r.get('cls',0) for r in records),
         'referenceNormalization':'Desktop 1505px native width; white padding only. Tools mobile source status bar cropped by 90px then proportionally scaled. No approved Home/Path/Community mobile mockups.'}
(OUT/'summary.json').write_text(json.dumps(summary,indent=2))
(QA/'index.html').write_text('<!doctype html><meta charset="utf-8"><title>SiapSatu reference repair</title><style>body{font:16px system-ui;margin:32px;background:#f2f7ff;color:#03143a}img{display:block;width:100%;margin:16px 0 40px}a{color:#062457}h1{font-size:30px}</style><h1>SiapSatu — reference extraction repair</h1><p>Original reference / before v4 / '+phase+' captures. Full screenshots and geometry remain beside this viewer.</p>'+''.join(rows),encoding='utf-8')
print(summary)
