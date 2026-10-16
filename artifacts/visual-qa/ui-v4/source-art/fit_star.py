import math
import numpy as np
import cv2
from PIL import Image, ImageDraw

ref = Image.open('artifacts/visual-qa/ui-v4/source-art/pure_ref_emblem.png').convert('RGB')
ref_arr = np.array(ref)
ref_mask = ((ref_arr[:, :, 0] > 180) & (ref_arr[:, :, 1] > 140) & (ref_arr[:, :, 2] < 80)).astype(np.uint8)

y_idx, x_idx = np.where(ref_mask)
rx0, ry0, rx1, ry1 = x_idx.min(), y_idx.min(), x_idx.max(), y_idx.max()
ref_sub = ref_mask[ry0:ry1+1, rx0:rx1+1]
H, W = ref_sub.shape

# Star is x >= 70
ref_star = ref_sub[:, 70:]
sH, sW = ref_star.shape

best_star_iou = 0
best_star = None

# Grid search star parameters: cx, cy, R_star, r_star, rot_deg
for cx in np.arange(118, 124, 1):
    for cy in np.arange(55, 61, 1):
        for R in np.arange(48, 53, 1):
            for r in np.arange(20, 25, 1):
                for rot_deg in np.arange(-90, -78, 2):
                    rot = math.radians(rot_deg)
                    # draw polygon with PIL
                    im = Image.new('L', (W, H), 0)
                    draw = ImageDraw.Draw(im)
                    pts = []
                    for i in range(28):
                        ang = rot + i * math.pi / 14
                        rad = R if i % 2 == 0 else r
                        pts.append((cx + rad * math.cos(ang), cy + rad * math.sin(ang)))
                    draw.polygon(pts, fill=1)
                    test_star = np.array(im)[:, 70:]
                    inter = np.logical_and(ref_star, test_star).sum()
                    union = np.logical_or(ref_star, test_star).sum()
                    iou = inter / union if union > 0 else 0
                    if iou > best_star_iou:
                        best_star_iou = iou
                        best_star = (cx, cy, R, r, rot_deg)

print(f'Best star IoU: {best_star_iou:.4f}, params: {best_star}')
