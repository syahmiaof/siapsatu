import math
import numpy as np
import cv2
from PIL import Image

ref = Image.open('artifacts/visual-qa/ui-v4/source-art/pure_ref_emblem.png').convert('RGB')
ref_arr = np.array(ref)
ref_mask = ((ref_arr[:, :, 0] > 180) & (ref_arr[:, :, 1] > 140) & (ref_arr[:, :, 2] < 80)).astype(np.uint8)

y_idx, x_idx = np.where(ref_mask)
rx0, ry0, rx1, ry1 = x_idx.min(), y_idx.min(), x_idx.max(), y_idx.max()
ref_sub = ref_mask[ry0:ry1+1, rx0:rx1+1]
H, W = ref_sub.shape
print(f'H={H}, W={W}')

# In ref_sub:
# Crescent is x < 75
ref_cres = ref_sub[:, :75]
best_iou = 0
best_cres = None

for ox in np.arange(38, 48, 1):
    for oy in np.arange(58, 64, 1):
        for R in np.arange(55, 62, 1):
            for ix in np.arange(75, 86, 1):
                for iy in np.arange(58, 64, 1):
                    for r in np.arange(50, 56, 1):
                        d = math.hypot(ix - ox, iy - oy)
                        if d >= R + r or d <= abs(R - r): continue
                        Y, X = np.ogrid[:H, :75]
                        cres_test = ((X - ox)**2 + (Y - oy)**2 <= R**2) & ((X - ix)**2 + (Y - iy)**2 > r**2)
                        inter = np.logical_and(ref_cres, cres_test).sum()
                        union = np.logical_or(ref_cres, cres_test).sum()
                        iou = inter / union if union > 0 else 0
                        if iou > best_iou:
                            best_iou = iou
                            best_cres = (ox, oy, R, ix, iy, r)

print(f'Best crescent IoU: {best_iou:.4f}, params: {best_cres}')
