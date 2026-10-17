"""User-authorized source crops for the remaining pages. Never edits mockups."""
from pathlib import Path
from PIL import Image, ImageDraw
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/assets/illustrations/reference'
QA = ROOT / 'artifacts/visual-qa/all-pages-repair'
SPECS = {
    'catalog': ('modules-catalog-desktop.png', (740,0,1505,419),
        [(757,367),(771,320),(790,280),(810,240),(850,205),(875,175),(851,156),(850,105),(903,100),(918,80),(1040,0),(1505,0),(1505,419),(1030,419),(1030,367)], [(1290,8,1480,80)]),
    'hermes': ('ui-03-tool-hermes-desktop.png', (705,0,1505,494),
        [(711,494),(723,450),(735,406),(752,380),(752,327),(784,286),(788,209),(820,195),(900,140),(1100,75),(1240,0),(1505,0),(1505,494)], [(1310,8,1490,85)]),
    'module': ('ui-05-module-detail-n8n.png', (785,0,1505,443),
        [(789,443),(790,395),(815,344),(836,283),(868,223),(898,180),(870,161),(870,104),(926,100),(942,80),(1100,40),(1190,0),(1505,0),(1505,443)], [(1320,8,1490,85)]),
    'progress': ('ui-08-progress-map.png', (880,75,1505,361),
        [(885,361),(890,320),(903,274),(932,235),(973,190),(934,165),(932,112),(994,107),(1014,95),(1100,75),(1505,75),(1505,361)], []),
    'library': ('ui-07-library-dashboard.png', (518,300,980,618),
        [(518,618),(530,575),(558,550),(580,520),(588,490),(565,479),(558,440),(551,390),(560,366),(650,354),(690,320),(750,302),(810,307),(890,320),(950,344),(949,380),(973,405),(980,485),(974,546),(950,618)], []),
    'reader': ('ui-06-lesson-reader-n8n.png', (917,110,1505,387),
        [(927,162),(1050,135),(1188,110),(1390,114),(1505,165),(1505,387),(1075,387),(1035,350),(1019,320),(1001,290),(935,286),(917,245)], [(1410,100,1495,127)]),
    'n8n-learner': ('ui-02-tool-n8n-desktop.png', (1210,120,1505,574),
        [(1210,441),(1253,430),(1268,394),(1272,355),(1271,326),(1283,310),(1276,272),(1277,190),(1318,173),(1400,164),(1401,125),(1476,130),(1476,181),(1453,201),(1454,253),(1461,306),(1505,354),(1505,574),(1230,574)], []),
}

manifest=[]
OUT.mkdir(parents=True,exist_ok=True)
QA.mkdir(parents=True,exist_ok=True)
for name,(source,box,points,holes) in SPECS.items():
    src=ROOT/'mockups'/source
    original=Image.open(src).convert('RGBA')
    mask=Image.new('L',(original.width*4,original.height*4))
    ImageDraw.Draw(mask).polygon([(x*4,y*4) for x,y in points],fill=255)
    alpha=mask.resize(original.size,Image.Resampling.LANCZOS)
    for hole in holes: ImageDraw.Draw(alpha).rectangle(hole,fill=0)
    original.putalpha(alpha)
    crop=original.crop(box)
    dest=OUT/f'{name}.webp'
    crop.save(dest,lossless=True,method=6)
    check=Image.new('RGBA',crop.size,'#e7eaf0')
    check.alpha_composite(crop)
    check.convert('RGB').save(QA/f'{name}-mask-check.png')
    manifest.append({'name':name,'source':src.relative_to(ROOT).as_posix(),
        'sourceSha256':hashlib.sha256(src.read_bytes()).hexdigest(),
        'crop':box,'maskPolygon':points,'excludedUI':holes,'size':crop.size,
        'output':dest.relative_to(ROOT).as_posix(),'outputSha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
(QA/'asset-manifest.json').write_text(json.dumps(manifest,indent=2))
print(f'Extracted {len(manifest)} original reference crops.')
