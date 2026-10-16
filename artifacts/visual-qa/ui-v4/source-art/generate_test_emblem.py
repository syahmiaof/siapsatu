import math
import numpy as np
from PIL import Image, ImageDraw

# Parameters
ox, oy, R = 47.0, 62.5, 55.0
ix, iy, r = 78.5, 62.5, 52.0

# Calculate intersection points (cusps)
d = math.hypot(ix - ox, iy - oy)
a = (R**2 - r**2 + d**2) / (2 * d)
h = math.sqrt(max(0, R**2 - a**2))

# Midpoint on line between centers
x2 = ox + a * (ix - ox) / d
y2 = oy + a * (iy - oy) / d

# Cusps
p1_x = x2 + h * (iy - oy) / d
p1_y = y2 - h * (ix - ox) / d

p2_x = x2 - h * (iy - oy) / d
p2_y = y2 + h * (ix - ox) / d

print(f'Cusp 1: ({p1_x:.2f}, {p1_y:.2f})')
print(f'Cusp 2: ({p2_x:.2f}, {p2_y:.2f})')

# Star
cx, cy = 121.5, 62.5
R_star = 49.0
r_star = 21.5
n_points = 14
rot = math.radians(-88)

star_pts = []
for i in range(2 * n_points):
    ang = rot + i * math.pi / n_points
    rad = R_star if i % 2 == 0 else r_star
    star_pts.append((round(cx + rad * math.cos(ang), 2), round(cy + rad * math.sin(ang), 2)))

points_str = ' '.join(f'{x},{y}' for x, y in star_pts)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 176 125" fill="none">
  <!-- Malaysian Crescent Moon -->
  <path fill="#ffd12a" d="M{p1_x:.2f} {p1_y:.2f} A{R:.2f} {R:.2f} 0 1 0 {p2_x:.2f} {p2_y:.2f} A{r:.2f} {r:.2f} 0 1 1 {p1_x:.2f} {p1_y:.2f} Z"/>
  <!-- 14-Point Star (Bintang Persekutuan) -->
  <polygon fill="#ffd12a" points="{points_str}"/>
</svg>'''

with open('artifacts/visual-qa/ui-v4/source-art/test_emblem.svg', 'w') as f:
    f.write(svg)
print('Wrote test_emblem.svg successfully.')
