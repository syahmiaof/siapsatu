import math
import numpy as np
from PIL import Image

ox, oy, R = 60.5, 60.5, 60.5
ix, iy, r = 81.0, 60.5, 54.0

d = ix - ox
a = (R**2 - r**2 + d**2) / (2 * d)
h = math.sqrt(R**2 - a**2)
x_cusp = ox + a
y_cusp1 = oy - h
y_cusp2 = oy + h

cx, cy = 120.0, 60.5
R_star = 50.0
r_star = 21.0
rot = -math.pi / 2 # straight top peak

star_pts = []
for i in range(28):
    ang = rot + i * math.pi / 14
    rad = R_star if i % 2 == 0 else r_star
    star_pts.append((round(cx + rad * math.cos(ang), 2), round(cy + rad * math.sin(ang), 2)))

pts_str = ' '.join(f'{x},{y}' for x, y in star_pts)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172 121" fill="none">
  <!-- Malaysian Crescent Moon -->
  <path fill="#ffd12a" d="M{x_cusp:.2f} {y_cusp1:.2f} A{R:.2f} {R:.2f} 0 1 0 {x_cusp:.2f} {y_cusp2:.2f} A{r:.2f} {r:.2f} 0 1 1 {x_cusp:.2f} {y_cusp1:.2f} Z"/>
  <!-- 14-Point Star (Bintang Persekutuan) -->
  <polygon fill="#ffd12a" points="{pts_str}"/>
</svg>'''

with open('public/assets/illustrations/ui-v4/emblem.svg', 'w') as f:
    f.write(svg)
print('Updated emblem.svg with rot=-pi/2')
