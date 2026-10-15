import cv2
import numpy as np

ref = cv2.imread('artifacts/visual-qa/homepage-v3/reference.png')
H, W, _ = ref.shape
print(f"Reference dimensions: {W} x {H}")

# 1. Header Analysis
# Let's check where the header bottom border/shadow or background transition is
# The header area is y: 0 to ~76
# Let's find logo x range: non-white pixels in y: 0..76, x: 20..300
logo_mask = np.any(ref[0:76, 20:300] < 240, axis=2)
ys, xs = np.where(logo_mask)
print(f"Ref Logo: x=[{xs.min()+20}, {xs.max()+20}] (w={xs.max()-xs.min()}), y=[{ys.min()}, {ys.max()}] (h={ys.max()-ys.min()})")

# Nav items:
nav_mask = np.any(ref[0:76, 300:700] < 240, axis=2)
ys, xs = np.where(nav_mask)
print(f"Ref Nav: x=[{xs.min()+300}, {xs.max()+300}] (w={xs.max()-xs.min()}), y=[{ys.min()}, {ys.max()}] (h={ys.max()-ys.min()})")

# Masuk button:
btn_mask = np.any(ref[0:76, 1050:1260] < 200, axis=2)
ys, xs = np.where(btn_mask)
print(f"Ref Masuk Btn: x=[{xs.min()+1050}, {xs.max()+1050}] (w={xs.max()-xs.min()}), y=[{ys.min()}, {ys.max()}] (h={ys.max()-ys.min()})")

# 2. Hero Left Analysis
# H1 "Satu modul. Satu hasil."
h1_mask = np.any(ref[76:270, 20:550] < 200, axis=2)
ys, xs = np.where(h1_mask)
print(f"Ref H1: x=[{xs.min()+20}, {xs.max()+20}] (w={xs.max()-xs.min()}), y=[{ys.min()+76}, {ys.max()+76}] (h={ys.max()-ys.min()})")

# Subtitle:
sub_mask = np.any(ref[240:310, 20:550] < 200, axis=2)
ys, xs = np.where(sub_mask)
print(f"Ref Subtitle: x=[{xs.min()+20}, {xs.max()+20}] (w={xs.max()-xs.min()}), y=[{ys.min()+240}, {ys.max()+240}] (h={ys.max()-ys.min()})")

# CTA: Orange button: High R, medium G, low B (R > 200, B < 50)
cta_mask = (ref[290:380, 20:400, 2] > 200) & (ref[290:380, 20:400, 0] < 50)
ys, xs = np.where(cta_mask)
print(f"Ref CTA button: x=[{xs.min()+20}, {xs.max()+20}] (w={xs.max()-xs.min()}), y=[{ys.min()+290}, {ys.max()+290}] (h={ys.max()-ys.min()})")

# Audience Chips:
chips_mask = np.any(ref[360:460, 20:560] < 240, axis=2)
ys, xs = np.where(chips_mask)
print(f"Ref Audience Chips: x=[{xs.min()+20}, {xs.max()+20}] (w={xs.max()-xs.min()}), y=[{ys.min()+360}, {ys.max()+360}] (h={ys.max()-ys.min()})")

# 3. Cards Section Analysis
# Card 1 (Navy): R < 40, B > 40
c1_mask = (ref[470:740, 20:450, 0] > 40) & (ref[470:740, 20:450, 2] < 40)
ys, xs = np.where(c1_mask)
print(f"Ref Card 1: x=[{xs.min()+20}, {xs.max()+20}] (w={xs.max()-xs.min()}), y=[{ys.min()+470}, {ys.max()+470}] (h={ys.max()-ys.min()})")

# Card 2 (Crimson): R > 150, B < 50
c2_mask = (ref[470:740, 420:860, 2] > 150) & (ref[470:740, 420:860, 0] < 50)
ys, xs = np.where(c2_mask)
print(f"Ref Card 2: x=[{xs.min()+420}, {xs.max()+420}] (w={xs.max()-xs.min()}), y=[{ys.min()+470}, {ys.max()+470}] (h={ys.max()-ys.min()})")

# Card 3 (Green): G > 120, B < 60, R < 60
c3_mask = (ref[470:740, 830:1260, 1] > 120) & (ref[470:740, 830:1260, 0] < 60)
ys, xs = np.where(c3_mask)
print(f"Ref Card 3: x=[{xs.min()+830}, {xs.max()+830}] (w={xs.max()-xs.min()}), y=[{ys.min()+470}, {ys.max()+470}] (h={ys.max()-ys.min()})")

# 4. Community Banner Analysis
# Navy Box:
comm_mask = (ref[710:880, 20:850, 0] > 40) & (ref[710:880, 20:850, 2] < 40)
ys, xs = np.where(comm_mask)
print(f"Ref Community Navy Box: x=[{xs.min()+20}, {xs.max()+20}] (w={xs.max()-xs.min()}), y=[{ys.min()+710}, {ys.max()+710}] (h={ys.max()-ys.min()})")

# WA Box:
wa_mask = np.any(ref[710:880, 830:1260] < 240, axis=2)
ys, xs = np.where(wa_mask)
print(f"Ref Community WA Box: x=[{xs.min()+830}, {xs.max()+830}] (w={xs.max()-xs.min()}), y=[{ys.min()+710}, {ys.max()+710}] (h={ys.max()-ys.min()})")
