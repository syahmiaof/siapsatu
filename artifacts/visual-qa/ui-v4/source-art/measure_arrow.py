import cv2
import numpy as np
from PIL import Image

# Inspect the arrow in homepage reference
home = Image.open('mockups/homepage-theme-03-malaysia-utility.png')
# arrow is around x=950..1250, y=140..420
arr = np.array(home)
# Green mask: R < 70, G > 150, B < 120 in this area
sub = arr[140:420, 950:1250]
green_mask = (sub[:, :, 0] < 80) & (sub[:, :, 1] > 140) & (sub[:, :, 2] < 120)

Image.fromarray((green_mask * 255).astype(np.uint8)).save('artifacts/visual-qa/ui-v4/source-art/ref_arrow_mask.png')
y_idx, x_idx = np.where(green_mask)
print(f'Arrow in crop bbox: x=[{x_idx.min()}, {x_idx.max()}], y=[{y_idx.min()}, {y_idx.max()}]')
w = x_idx.max() - x_idx.min()
h = y_idx.max() - y_idx.min()
print(f'Arrow size: {w} x {h}')

# In absolute mockup coordinates:
print(f'Absolute mockup arrow bounds: x=[{950+x_idx.min()}, {950+x_idx.max()}], y=[{140+y_idx.min()}, {140+y_idx.max()}]')
