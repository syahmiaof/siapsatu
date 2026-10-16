import math

theta = math.radians(42.0)
cos_t = math.cos(theta)
sin_t = math.sin(theta)

tip_x, tip_y = 232.0, 48.0
head_length = 78.0
head_half_width = 42.0
shaft_half_width = 19.0
shaft_length = 220.0

base_center_x = tip_x - head_length * cos_t
base_center_y = tip_y + head_length * sin_t

left_barb_x = base_center_x - head_half_width * sin_t
left_barb_y = base_center_y - head_half_width * cos_t

right_barb_x = base_center_x + head_half_width * sin_t
right_barb_y = base_center_y + head_half_width * cos_t

# The undercut corners where head meets shaft
shaft_top_left_x = base_center_x - shaft_half_width * sin_t
shaft_top_left_y = base_center_y - shaft_half_width * cos_t

shaft_top_right_x = base_center_x + shaft_half_width * sin_t
shaft_top_right_y = base_center_y + shaft_half_width * cos_t

shaft_base_center_x = tip_x - (head_length + shaft_length) * cos_t
shaft_base_center_y = tip_y + (head_length + shaft_length) * sin_t

shaft_base_left_x = shaft_base_center_x - shaft_half_width * sin_t
shaft_base_left_y = shaft_base_center_y - shaft_half_width * cos_t

shaft_base_right_x = shaft_base_center_x + shaft_half_width * sin_t
shaft_base_right_y = shaft_base_center_y + shaft_half_width * cos_t

# Polygon points in clockwise order:
# 1. Tip
# 2. Right barb
# 3. Right undercut (inner corner)
# 4. Shaft base right
# 5. Shaft base left
# 6. Left undercut (inner corner)
# 7. Left barb
pts = [
    (tip_x, tip_y),
    (right_barb_x, right_barb_y),
    (shaft_top_right_x, shaft_top_right_y),
    (shaft_base_right_x, shaft_base_right_y),
    (shaft_base_left_x, shaft_base_left_y),
    (shaft_top_left_x, shaft_top_left_y),
    (left_barb_x, left_barb_y)
]

pts_str = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 280" fill="none">
  <polygon points="{pts_str}" fill="#00ba51" stroke="#00ba51" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
</svg>'''

with open('public/assets/illustrations/ui-v4/growth-arrow.svg', 'w') as f:
    f.write(svg)
print('Generated refined growth-arrow.svg with stroke-linejoin=round')
