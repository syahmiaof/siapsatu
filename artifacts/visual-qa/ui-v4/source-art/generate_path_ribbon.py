# Generate v4 path-ribbon.svg
# Stable viewBox 0 0 900 580, no preserveAspectRatio="none"

upper_curve = "M -40 520 C 180 360, 380 320, 530 280 C 690 240, 780 130, 950 15"
lower_curve = "M 320 620 C 480 470, 680 430, 950 540"

light_bg = "M 0 580 C 20 350, 140 200, 340 130 L 900 0 V 580 Z"
navy_bg = "M 35 580 C 75 340, 150 185, 345 110 C 510 40, 700 20, 900 0 V 580 H 260 Z"

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 580" fill="none">
  <!-- Soft accent backdrop -->
  <path fill="#e4edff" d="{light_bg}"/>
  
  <!-- Midnight Navy Negative Space -->
  <path fill="#062457" d="{navy_bg}"/>

  <!-- Upper Fluid Malaysian Ribbon (Jalur Gemilang) -->
  <g id="path-upper-ribbon">
    <path d="{upper_curve}" fill="none" stroke="#ffffff" stroke-width="82" stroke-linejoin="round"/>
    <path d="{upper_curve}" fill="none" stroke="#ff1938" stroke-width="72" stroke-linejoin="round"/>
    <path d="{upper_curve}" fill="none" stroke="#ffffff" stroke-width="26" stroke-linejoin="round"/>
  </g>

  <!-- Lower Accent Malaysian Ribbon -->
  <g id="path-lower-ribbon">
    <path d="{lower_curve}" fill="none" stroke="#ffffff" stroke-width="76" stroke-linejoin="round"/>
    <path d="{lower_curve}" fill="none" stroke="#ff1938" stroke-width="66" stroke-linejoin="round"/>
    <path d="{lower_curve}" fill="none" stroke="#ffffff" stroke-width="24" stroke-linejoin="round"/>
  </g>
</svg>'''

with open('public/assets/illustrations/ui-v4/path-ribbon.svg', 'w') as f:
    f.write(svg)
print('Generated v4 path-ribbon.svg')
