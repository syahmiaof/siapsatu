import math

# Refined home-ribbon.svg:
# Extended start and end points so strokes flow off-canvas seamlessly
# Centerline curve dips gently under the emblem (x=380..560, y=285..310)
# and sweeps up past the arrow towards top-right.

curve_path = "M -40 540 C 160 380, 360 330, 520 295 C 680 260, 770 140, 950 10"

# Background light blue envelope
light_bg = "M 0 580 C 20 360, 140 210, 340 135 L 900 0 V 580 Z"

# Midnight Navy Negative Space (covering full right and top behind ribbon)
navy_bg = "M 30 580 C 70 340, 150 190, 340 115 C 500 45, 700 25, 900 0 V 580 H 260 Z"

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 580" fill="none">
  <!-- Soft accent backdrop -->
  <path fill="#e4edff" d="{light_bg}"/>
  
  <!-- Midnight Navy Negative Space -->
  <path fill="#062457" d="{navy_bg}"/>

  <!-- Fluid Malaysian Ribbon (Jalur Gemilang) -->
  <g id="malaysia-fluid-ribbon">
    <!-- Outer White Protective Border -->
    <path d="{curve_path}" fill="none" stroke="#ffffff" stroke-width="84" stroke-linejoin="round"/>
    
    <!-- Top & Bottom Red Stripes -->
    <path d="{curve_path}" fill="none" stroke="#ff1938" stroke-width="74" stroke-linejoin="round"/>
    
    <!-- Crisp Center White Stripe -->
    <path d="{curve_path}" fill="none" stroke="#ffffff" stroke-width="26" stroke-linejoin="round"/>
  </g>
</svg>'''

with open('public/assets/illustrations/ui-v4/home-ribbon.svg', 'w') as f:
    f.write(svg)
print('Updated home-ribbon.svg')
