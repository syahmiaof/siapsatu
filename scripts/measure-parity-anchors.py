"""Same-width visual anchors. Reference bounds are hand-inspected, not DOM claims."""
from pathlib import Path
from PIL import Image
import numpy as np
import json

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'artifacts/visual-qa/parity-v2'
geometry=json.loads((OUT/'final/geometry.json').read_text())
records=[]
# Reference boxes in immutable original image pixels: x,y,width,height.
# Status crop is applied BEFORE normalization, consistently with compare-parity-v2.py.
anchors=[
 ('/',1440,'cta','homepage-theme-03-malaysia-utility.png',0,(54,367,388,77)),
 ('/',1440,'firstCard','homepage-theme-03-malaysia-utility.png',0,(35,580,471,262)),
 ('/tools',1440,'firstCard','ui-01-tools-directory-desktop.png',0,(38,445,350,132)),
 ('/modules',1440,'firstCard','modules-catalog-desktop.png',0,(37,524,476,216)),
 ('/tools',390,'firstCard','ui-10-tools-directory-mobile-v2.png',90,(22,738,397,206)),
 ('/tools',360,'firstCard','ui-10-tools-directory-mobile-v2.png',90,(22,738,397,206)),
 ('/modules',390,'firstCard','modules-catalog-mobile.png',70,(27,647,801,275)),
 ('/modules',360,'firstCard','modules-catalog-mobile.png',70,(27,647,801,275)),
]
for route,width,key,ref,crop,box in anchors:
 scale=width/Image.open(ROOT/'mockups'/ref).width
 x,y,w,h=box
 expected={'x':x*scale,'y':(y-crop)*scale,'width':w*scale,'height':h*scale}
 actual=next(r for r in geometry if r['route']==route and r['width']==width)[key]
 delta={k:round(actual[k]-expected[k],2) for k in expected}
 percent={k:round(100*delta[k]/expected[k],2) for k in expected if expected[k]}
 records.append({'route':route,'viewport':width,'anchor':key,'referenceBoxOriginal':box,'reference':expected,'actual':actual,'deltaPx':delta,'deltaPercentOfReference':percent})

# Ink bounds make heading comparison independent of full-width DOM wrapper boxes.
heads=[('home','homepage-theme-03-malaysia-utility.png',(45,116,615,310),(40,110,610,300)),('tools','ui-01-tools-directory-desktop.png',(45,135,760,275),(30,120,705,275)),('modules','modules-catalog-desktop.png',(42,130,860,202),(30,130,840,202))]
def ink(im,roi):
 x1,y1,x2,y2=roi;p=np.asarray(im.crop(roi));r,g,b=p[:,:,0],p[:,:,1],p[:,:,2]
 mask=((r<70)&(g<90)&(b<150))|((r>200)&(g<160)&(b<100))
 yy,xx=np.where(mask)
 return dict(x=int(xx.min()+x1),y=int(yy.min()+y1),width=int(xx.max()-xx.min()+1),height=int(yy.max()-yy.min()+1))
for slug,ref,refroi,live_roi in heads:
 original=Image.open(ROOT/'mockups'/ref).convert('RGB');scale=1440/original.width
 normalized=original.resize((1440,round(original.height*scale)))
 expected=ink(normalized,tuple(round(v*scale) for v in refroi))
 actual=ink(Image.open(OUT/f'final/1440-{slug}-fold.png').convert('RGB'),live_roi)
 delta={k:actual[k]-expected[k] for k in actual}
 records.append({'route':slug,'viewport':1440,'anchor':'heading ink','reference':expected,'actual':actual,'deltaPx':delta,'deltaPercentOfReference':{k:round(100*delta[k]/expected[k],2) for k in expected}})
(OUT/'anchors.json').write_text(json.dumps({'method':'Hand-inspected original reference card/CTA bounds; heading saturated/dark ink bounds in disclosed tight ROIs. Approximate 1-2px edge uncertainty. Positions and dimensions are not perceptual proof.','anchors':records},indent=2),encoding='utf-8')
for r in records: print(r['route'],r['viewport'],r['anchor'],r['deltaPercentOfReference'])
