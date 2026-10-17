"""Confirm provenance and lossless source RGB for all extracted artwork."""
from pathlib import Path
from PIL import Image, ImageChops
import json
import hashlib
import sys

ROOT = Path(__file__).resolve().parents[1]
QA = ROOT/(sys.argv[1] if len(sys.argv) > 1 else 'artifacts/visual-qa/reference-repair')
results=[]
for record in json.loads((QA/'asset-manifest.json').read_text()):
    source=ROOT/record['source']; output=ROOT/record['output']
    assert hashlib.sha256(source.read_bytes()).hexdigest()==record['sourceSha256']
    assert hashlib.sha256(output.read_bytes()).hexdigest()==record['outputSha256']
    original=Image.open(source).convert('RGB').crop(record['crop'])
    extracted=Image.open(output).convert('RGBA')
    opaque=extracted.getchannel('A').point(lambda value:255 if value==255 else 0)
    delta=ImageChops.difference(original,extracted.convert('RGB'))
    visible_delta=Image.new('RGB',original.size)
    visible_delta.paste(delta,(0,0),opaque)
    assert visible_delta.getbbox() is None, record['name']
    # Test the interior of masked controls, excluding the antialiased boundary.
    x,y,right,bottom=record['crop']
    for left,top,r,b in record['excludedUI']:
        intersection=(max(left+2,x),max(top+2,y),min(r-2,right),min(b-2,bottom))
        if intersection[0]<intersection[2] and intersection[1]<intersection[3]:
            area=(intersection[0]-x,intersection[1]-y,intersection[2]-x,intersection[3]-y)
            assert extracted.getchannel('A').crop(area).getbbox() is None, record['name']
    results.append({'asset':record['name'],'sourceUnchanged':True,'opaquePixelsMatchSourceExactly':True,'excludedUITransparent':True})
(QA/'pixel-integrity.json').write_text(json.dumps(results,indent=2))
print(f'{len(results)} assets: original hashes intact, opaque RGB exact, excluded UI transparent.')
