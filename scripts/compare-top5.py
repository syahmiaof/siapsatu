"""Normalize immutable references and emit labelled comparisons. No pixel-parity claim."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'artifacts/visual-qa/top5/comparisons'
OUT.mkdir(parents=True,exist_ok=True)
PAIRS={
 'home':'homepage-theme-03-malaysia-utility.png',
 'modules':'modules-catalog-desktop.png',
 'mega-menu':'modules-mega-menu-desktop.png',
 'tools':'ui-01-tools-directory-desktop.png',
 'learn-n8n-google-sheets-2':'ui-06-lesson-reader-n8n.png',
 'learn-n8n-google-sheets-3':'ui-06-lesson-reader-n8n.png',
}
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',20)
records=[]
def compare(slug,ref_name,width=1440,status_crop=0):
 caption_font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',12) if width<600 else font
 original=Image.open(ROOT/'mockups'/ref_name).convert('RGB')
 ref=original.crop((0,status_crop,original.width,original.height))
 ref=ref.resize((width,round(ref.height*width/ref.width)),Image.Resampling.LANCZOS)
 live=Image.open(ROOT/f'artifacts/visual-qa/top5/final/{width}-{slug}-fold.png').convert('RGB')
 height=min(ref.height,live.height)
 ref=ref.crop((0,0,width,height));live=live.crop((0,0,width,height))
 slug=f'{width}-{slug}'
 ref.save(OUT/f'{slug}-reference.png')
 side=Image.new('RGB',(width*2,height+44),'#e7edf6');side.paste(ref,(0,44));side.paste(live,(width,44))
 d=ImageDraw.Draw(side);d.text((16,12),'REFERENCE - normalized (not edited)',fill='#062457',font=caption_font);d.text((width+16,12),'LIVE - final, reduced motion',fill='#062457',font=caption_font)
 side.save(OUT/f'{slug}-side-by-side.jpg',quality=92)
 overlay=Image.new('RGB',(width,height+44),'#e7edf6');overlay.paste(Image.blend(ref,live,.5),(0,44));ImageDraw.Draw(overlay).text((16,12),'50% reference + 50% live - same width/crop',fill='#062457',font=caption_font);overlay.save(OUT/f'{slug}-overlay.png')
 records.append(dict(slug=slug,reference=ref_name,originalSize=original.size,removedTopPixels=status_crop,width=width,comparedHeight=height))
for slug,ref in PAIRS.items():compare(slug,ref)
# Mobile references include device chrome; remove only the documented status-bar area.
# Reader reference has a different lesson subject; compare layout grammar, not its words.
for width in [390,360]:
 compare('modules','modules-catalog-mobile.png',width,70)
 compare('tools','ui-10-tools-directory-mobile-v2.png',width,90)
 compare('learn-n8n-google-sheets-2','lesson-mobile-siapsatu-v2.png',width,0)
 compare('learn-n8n-google-sheets-3','lesson-mobile-siapsatu-v2.png',width,0)
(OUT/'normalization.json').write_text(json.dumps(records,indent=2),encoding='utf-8')
thumbs=[]
for r in records:
 im=Image.open(OUT/f"{r['slug']}-side-by-side.jpg");im.thumbnail((960,500));thumbs.append((r['slug'],im.copy()))
sheet=Image.new('RGB',(1920,((len(thumbs)+1)//2)*540),'#d8e0eb');draw=ImageDraw.Draw(sheet)
for i,(label,im) in enumerate(thumbs):
 x=(i%2)*960;y=(i//2)*540;draw.text((x+8,y+4),label,fill='black',font=font);sheet.paste(im,(x,y+32))
sheet.save(OUT/'contact.jpg',quality=88)
print(f'{len(records)} normalized pairs, side-by-sides and overlays generated.')
