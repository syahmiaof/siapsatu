"""Deterministic user-authorized cutout cleanup and responsive exports."""
from pathlib import Path
import json, hashlib
from PIL import Image, ImageDraw
import cv2
import numpy as np
root=Path(__file__).resolve().parents[1]
src=root/'artifacts/visual-qa/ui-v3/source-art/path-learner.png'
out=root/'public/assets/illustrations/ui-v3'
im=Image.open(src).convert('RGBA'); p=np.array(im); a=p[:,:,3]
n,labels,stats,_=cv2.connectedComponentsWithStats((a>200).astype('uint8'),8)
largest=1+int(np.argmax(stats[1:,cv2.CC_STAT_AREA]))
p[:,:,3]=np.where(labels==largest,a,0)
im=Image.fromarray(p); bounds=im.getbbox(); im=im.crop(bounds)
# A straight desk baseline removes generated paint flecks below the opaque laptop.
im=im.crop((0,0,im.width,round(im.height*.97)))
outputs=[]
for width in [1100,600]:
 resized=im.resize((width,round(im.height*width/im.width)),Image.Resampling.LANCZOS)
 dest=out/f'path-learner-{width}.webp';resized.save(dest,'WEBP',quality=90,method=6)
 outputs.append({'path':str(dest.relative_to(root)),'size':resized.size,'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
(src.parent/'manifest.json').write_text(json.dumps({'sourceSha256':hashlib.sha256(src.read_bytes()).hexdigest(),'alphaThreshold':200,'bounds':bounds,'bottomTrim':.03,'outputs':outputs},indent=2))
check=Image.new('RGBA',im.size)
d=ImageDraw.Draw(check)
for y in range(0,im.height,20):
 for x in range(0,im.width,20):d.rectangle((x,y,x+19,y+19),fill='#d8d8d8' if (x//20+y//20)%2 else '#ffffff')
check.alpha_composite(im);check.convert('RGB').save(src.parent/'alpha-100-percent.png')
print(outputs)
