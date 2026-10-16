"""Read-only integrity checks and a checkerboard proof of new transparent art."""
from pathlib import Path
from PIL import Image, ImageDraw
import hashlib, json, subprocess

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'artifacts/visual-qa/parity-v2'
def sha(path): return hashlib.sha256(path.read_bytes()).hexdigest()
before=json.loads((OUT/'top5-integrity-before.json').read_text(encoding='utf-8-sig'))
now={str(p.relative_to(ROOT/'artifacts/visual-qa/top5')).replace('\\','/'):sha(p) for p in (ROOT/'artifacts/visual-qa/top5').rglob('*') if p.is_file()}
changes=[key for key,value in before.items() if now.get(key.replace('\\','/'))!=value]
extra=sorted(set(now)-{k.replace('\\','/') for k in before})
protected=[]
for item in json.loads((ROOT/'artifacts/visual-qa/top5/protected-assets.json').read_text()):
    protected.append({'source':item['source'],'copy':item['copy'],'unchanged':sha(ROOT/item['source'])==sha(ROOT/item['copy'])==item['sha256']})
references=[]
for item in json.loads((ROOT/'artifacts/visual-qa/top5/reference-integrity.json').read_text()):
    blob=subprocess.check_output(['git','hash-object',item['path']],cwd=ROOT,text=True).strip()
    references.append({'path':item['path'],'unchanged':blob==item['headBlob'],'blob':blob})
result={'top5Files':len(before),'top5Changed':changes,'top5Added':extra,'protected':protected,'references':references}
(OUT/'integrity.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
assert not changes and not extra and all(i['unchanged'] for i in protected+references),result

names=['hero-trio-800.webp','discussion-650.webp','portrait-male-500.webp','portrait-woman-500.webp','portrait-coder-500.webp']
sheet=Image.new('RGB',(1000, len(names)*340),'#eef3f9')
d=ImageDraw.Draw(sheet)
for row,name in enumerate(names):
    im=Image.open(ROOT/'public/assets/illustrations/parity-v2'/name).convert('RGBA')
    y=row*340
    for xx in range(0,1000,20):
        for yy in range(y+30,y+330,20):
            d.rectangle((xx,yy,xx+19,yy+19),fill='#d5dce5' if (xx//20+yy//20)%2 else '#fff')
    thumb=im.copy();thumb.thumbnail((700,290))
    sheet.paste(thumb,(0,y+40),thumb)
    # Unscaled top silhouette patch: the second panel is genuinely 100% source pixels.
    a=im.getchannel('A');box=a.point(lambda v:255 if v>220 else 0).getbbox()
    xx=max(0,min(im.width-250,box[0]+(box[2]-box[0])//2-125));yy=box[1]
    crop=im.crop((xx,yy,xx+250,min(im.height,yy+280)))
    sheet.paste(crop,(740,y+40),crop)
    d.text((10,y+8),name+' | overview left; unscaled 100% edge right',fill='#03143a')
sheet.save(OUT/'alpha-edge-inspection.png')
print(f"{len(before)} Top 5 files unchanged; {len(protected)} protected asset pairs and {len(references)} references unchanged.")
