from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
import numpy as np

root = Path('.').resolve()
source_art_dir = root / 'artifacts/visual-qa/ui-v4/source-art'
proofs_dir = source_art_dir / 'proofs'
proofs_dir.mkdir(parents=True, exist_ok=True)

def make_pair(left, right, label_left, label_right, out_basename):
    left = left.convert('RGB')
    right = right.convert('RGB')
    
    # Match width and height
    w = max(left.width, right.width)
    h = max(left.height, right.height)
    
    canvas_l = Image.new('RGB', (w, h), 'white')
    canvas_r = Image.new('RGB', (w, h), 'white')
    canvas_l.paste(left, ((w - left.width)//2, (h - left.height)//2))
    canvas_r.paste(right, ((w - right.width)//2, (h - right.height)//2))
    
    # Side-by-side
    header_h = 36
    sbs = Image.new('RGB', (w * 2, h + header_h), '#061d47')
    sbs.paste(canvas_l, (0, header_h))
    sbs.paste(canvas_r, (w, header_h))
    
    draw = ImageDraw.Draw(sbs)
    draw.text((16, 10), label_left, fill='#ffffff')
    draw.text((w + 16, 10), label_right, fill='#ffd12a')
    
    sbs.save(proofs_dir / f'{out_basename}-side-by-side.png')
    
    # Overlay 50%
    overlay = Image.blend(canvas_l, canvas_r, 0.5)
    overlay.save(proofs_dir / f'{out_basename}-overlay.png')
    print(f'Generated proofs for {out_basename}')

# 1. Emblem Comparison
ref_emblem = Image.open(source_art_dir / 'pure_ref_emblem.png')
v4_emblem = Image.open(source_art_dir / 'v4_emblem_rendered.png')
# Add dark navy background for contrast
bg_emblem = Image.new('RGB', ref_emblem.size, '#062457')
bg_v4 = Image.new('RGB', v4_emblem.size, '#062457')
bg_v4.paste(v4_emblem, (0, 0), v4_emblem)
make_pair(ref_emblem, bg_v4, 'Approved Reference Emblem (100%)', 'v4 Vector Emblem (ui-v4/emblem.svg)', 'emblem')

# 2. Growth Arrow Comparison
ref_arrow = Image.open(source_art_dir / 'tools_arrow_crop_full.png')
v4_arrow = Image.open(source_art_dir / 'v4_arrow_rendered.png')
bg_arrow = Image.new('RGB', (280, 280), '#062457')
bg_arrow.paste(v4_arrow, (0, 0), v4_arrow)
make_pair(ref_arrow, bg_arrow, 'Approved Reference Arrow (100%)', 'v4 Growth Arrow (ui-v4/growth-arrow.svg)', 'growth-arrow')

# 3. KL Skyline Comparison
ref_skyline = Image.open(source_art_dir / 'ref_skyline_stamp.png')
v4_skyline = Image.open(source_art_dir / 'v4_skyline_rendered.png')
make_pair(ref_skyline, v4_skyline, 'Approved Reference Skyline (100%)', 'v4 KL Skyline Vignette (ui-v4/kl-skyline.svg)', 'kl-skyline')

# 4. Tools Hero Banner Comparison
ref_tools = Image.open(source_art_dir / 'ref_tools_art_full.png')
v4_tools_ribbon = Image.open(source_art_dir / 'v4_tools_ribbon_rendered.png')
# Composite emblem onto tools ribbon
tools_comp = v4_tools_ribbon.convert('RGBA')
# Emblem at left: 27%, top: 10% on 800x250 -> x=216, y=25, w=160, h=112
emb_scaled = v4_emblem.resize((160, round(160 * v4_emblem.height / v4_emblem.width)), Image.Resampling.LANCZOS)
tools_comp.paste(emb_scaled, (216, 25), emb_scaled)
# Arrow at right: 18%, bottom: 0% -> w=220, h=220 at x=530, y=30
arr_scaled = v4_arrow.resize((220, 220), Image.Resampling.LANCZOS)
tools_comp.paste(arr_scaled, (520, 30), arr_scaled)
make_pair(ref_tools, tools_comp, 'Approved Reference Tools Banner', 'v4 Tools Banner Layering (Zero Collision)', 'tools-banner')

# 5. Path Learner Baseline Comparison
ref_learner = Image.open(source_art_dir / 'ref_path_learner_crop.png')
v4_learner = Image.open(source_art_dir / 'path-learner-100-proof.png')
make_pair(ref_learner, v4_learner, 'Approved Reference Seated Learner', 'v4 Unclipped Desk Baseline (path-learner-1100.webp)', 'path-learner')

print('All 5 proof comparisons successfully generated.')
