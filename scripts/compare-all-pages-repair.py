"""Native-width reference comparisons; never stretches original reference images."""
from pathlib import Path
from PIL import Image, ImageDraw
import json
import sys

ROOT=Path(__file__).resolve().parents[1]
QA=ROOT/'artifacts/visual-qa/all-pages-repair'
phase=sys.argv[1] if len(sys.argv)>1 else 'final'
OUT=QA/f'{phase}-comparisons';OUT.mkdir(exist_ok=True)
refs={
 'home':'homepage-theme-03-malaysia-utility', 'modules':'modules-catalog-desktop',
 'tools':'ui-01-tools-directory-desktop', 'tools-n8n':'ui-02-tool-n8n-desktop',
 'tools-hermes-agent':'ui-03-tool-hermes-desktop', 'paths-ai-automation':'ui-04-learning-path-automation-v2',
 'modules-n8n-google-sheets':'ui-05-module-detail-n8n', 'learn-n8n-google-sheets-3':'ui-06-lesson-reader-n8n',
 'library':'ui-07-library-dashboard', 'progress':'ui-08-progress-map', 'community':'ui-09-community-hub'
}
html=[]
for name,ref in refs.items():
 current=Image.open(QA/phase/f'1505-{name}.png').convert('RGB')
 original=Image.open(ROOT/'mockups'/f'{ref}.png').convert('RGB')
 height=max(current.height,original.height)
 a=Image.new('RGB',(1505,height),'white');a.paste(original,(0,0))
 b=Image.new('RGB',(1505,height),'white');b.paste(current,(0,0))
 pair=Image.new('RGB',(3010,height+30),'white');pair.paste(a,(0,30));pair.paste(b,(1505,30))
 d=ImageDraw.Draw(pair);d.text((10,8),'APPROVED REFERENCE',fill='black');d.text((1515,8),phase.upper(),fill='black')
 pair.save(OUT/f'{name}-reference.jpg',quality=90)
 Image.blend(a,b,.5).save(OUT/f'{name}-overlay.png')
 before=Image.open(QA/'baseline'/f'1505-{name}.png').convert('RGB')
 pair.paste(before,(0,30));d.rectangle((0,0,1505,30),fill='white');d.text((10,8),'BEFORE - 9fab745',fill='black')
 pair.save(OUT/f'{name}-before-after.jpg',quality=88)
 html.append(f'<h2>{name}</h2><a href="{phase}-comparisons/{name}-overlay.png">50% overlay</a> · <a href="{phase}-comparisons/{name}-before-after.jpg">Before / after</a><img loading="lazy" src="{phase}-comparisons/{name}-reference.jpg" alt="Reference and current {name}">')
records=json.loads((QA/phase/'geometry.json').read_text())
summary={'phase':phase,'checks':len(records),'routes':len(set(r['route'] for r in records)),
 'overflow':sum(r['scrollWidth']>r['width'] for r in records), 'brokenImages':sum(len(r['brokenImages']) for r in records),
 'pageErrors':sum(len(r['errors']) for r in records),'non200':sum(r['status']!=200 for r in records),
 'normalization':'Desktop reference at native 1505px width; white padding for differing heights only. No whole-page pixel-perfect claim.'}
(OUT/'summary.json').write_text(json.dumps(summary,indent=2))
(QA/'index.html').write_text('<!doctype html><meta charset="utf-8"><title>SiapSatu all-page reference audit</title><style>body{font:16px system-ui;background:#f2f7ff;color:#03143a;margin:32px}img{width:100%;display:block;margin:16px 0 40px}a{color:#062457}</style><h1>SiapSatu — all-page reference audit</h1><p>11 reference-mapped pages. Login and generic Gemini module/reader checked for usability; no dedicated reference exists. Artwork is source-extracted; text, icons and demo data remain HTML.</p>'+''.join(html),encoding='utf-8')
print(summary)
