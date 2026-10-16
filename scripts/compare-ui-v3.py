from PIL import Image,ImageDraw,ImageOps
from pathlib import Path
import json,hashlib
root=Path(__file__).resolve().parents[1]
qa=root/'artifacts/visual-qa/ui-v3'; out=qa/'comparisons';out.mkdir(exist_ok=True)
refs={'home':'homepage-theme-03-malaysia-utility.png','tools':'ui-01-tools-directory-desktop.png','paths-ai-automation':'ui-04-learning-path-automation-v2.png','community':'ui-09-community-hub.png'}
records=[]
def pair(left,right,dest,labels):
 left=left.convert('RGB');right=right.convert('RGB')
 # Preserve aspect ratio. White canvas, not a vertical stretch, accounts for differing heights.
 w=right.width;left=left.resize((w,round(left.height*w/left.width)),Image.Resampling.LANCZOS)
 h=max(left.height,right.height);a=Image.new('RGB',(w,h),'white');b=a.copy();a.paste(left);b.paste(right)
 combined=Image.new('RGB',(w*2,h+32),'white');combined.paste(a,(0,32));combined.paste(b,(w,32));d=ImageDraw.Draw(combined);d.text((12,10),labels[0],fill='black');d.text((w+12,10),labels[1],fill='black');combined.save(out/f'{dest}-side-by-side.jpg',quality=88)
 Image.blend(a,b,.5).save(out/f'{dest}-overlay.png')
 return {'leftOriginalSize':left.size,'canvas':(w,h),'heightPolicy':'aspect preserved; white padding; no vertical stretch'}
phase='live' if (qa/'live/geometry.json').exists() else 'final'
for row in json.loads((qa/phase/'geometry.json').read_text()):
 w=row['width'];name='home' if row['route']=='/' else row['route'][1:].replace('/','-');key=f'{w}-{name}'
 final=Image.open(qa/phase/f'{key}-fold.png');before=Image.open(qa/'baseline'/f'{key}-fold.png')
 pair(before,final,f'{key}-before-after',('Current HEAD baseline',phase+' UI v3'))
 if w>=768 or name=='tools':
  refname='ui-10-tools-directory-mobile-v2.png' if w<700 else refs[name]
  ref=Image.open(root/'mockups'/refname);crop=None
  if w<700:crop=(0,90,ref.width,ref.height);ref=ref.crop(crop)
  norm=pair(ref,final,key,('Approved reference; proportional resize',phase+' UI v3; actual viewport'))
  records.append({'key':key,'reference':refname,'crop':crop,**norm,'viewport':row,'note':'Tablet uses desktop reference for composition only; no dedicated approved tablet mockup' if w==768 else 'Different height shapes are padded, not stretched'})
userdir=root/'artifacts/visual-qa/user-feedback-2026-10-16';crops=qa/'user-crops';crops.mkdir(exist_ok=True)
for name,route,kind in [('live-home-first-fold','home','fold'),('live-home-cards-community','home','cards-community'),('live-tools','tools','fold'),('live-learning-path','paths-ai-automation','fold'),('live-community','community','fold')]:
 source=userdir/f'{name}.png';im=Image.open(source);crop=(0,120,min(1864,im.width),min(1001,im.height));clean=im.crop(crop);clean.save(crops/f'{name}.png')
 norm=pair(clean,Image.open(qa/phase/f'1248-{route}-{kind}.png'),name,('User capture; browser/taskbar removed',phase+' UI v3; 1248x588 CSS at DPR 1.5'))
 records.append({'userCapture':name,'sourceSize':im.size,'sourceSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'cropPixels':crop,'zoom':'1.5 inferred from logo/text scale, not measured user browser zoom; paired viewport approximates crop within 8px','normalization':norm})
(out/'normalization.json').write_text(json.dumps(records,indent=2))
cards=[]
for name in refs:
 im=Image.open(out/f'1505-{name}-side-by-side.jpg');cards.append(ImageOps.contain(im,(1200,460)))
contact=Image.new('RGB',(1200,sum(im.height for im in cards)),'white');y=0
for im in cards:contact.paste(im,(0,y));y+=im.height
contact.save(out/'contact.jpg')
links=''.join(f'<h2>{r}</h2>'+''.join(f'<p>{w}px: <a href="comparisons/{w}-{r}-before-after-side-by-side.jpg">Before / after</a> · <a href="{phase}/{w}-{r}-fold.png">Fold</a> · <a href="{phase}/{w}-{r}-full.png">Full page</a> · <a href="{phase}/{w}-{r}-entrance.png">Entrance</a> · <a href="{phase}/{w}-{r}-reduced.png">Reduced motion</a></p>' for w in [1880,1505,1440,768,390,360,1248]) for r in refs)
(qa/'index.html').write_text('<!doctype html><meta charset="utf-8"><title>SiapSatu UI v3 evidence</title><style>body{max-width:1100px;margin:40px auto;padding:20px;font:16px system-ui;color:#062457}a{color:#064ba4}img{width:100%}</style><h1>SiapSatu UI v3</h1><p>Exact viewport/DPR and runtime findings: <a href="'+phase+'/geometry.json">metadata</a>. <a href="comparisons/normalization.json">Comparison/crop assumptions</a>. Generated assets are reconstructed, not exact illustrator layers.</p><img src="comparisons/contact.jpg" alt="Approved references and v3 desktop pages">'+links)
print(f'Wrote comparisons and viewer from {phase}')
