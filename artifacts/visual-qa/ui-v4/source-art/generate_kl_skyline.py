# Python script to build the refined KL skyline SVG
svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" fill="none">
  <defs>
    <radialGradient id="sunset-sky" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#fff176"/>
      <stop offset="45%" stop-color="#ffd12a"/>
      <stop offset="80%" stop-color="#ff9828"/>
      <stop offset="100%" stop-color="#f57c00"/>
    </radialGradient>
    <clipPath id="skyline-circle">
      <circle cx="160" cy="160" r="148"/>
    </clipPath>
  </defs>

  <!-- Circular Sun & Sunset Vignette -->
  <circle cx="160" cy="160" r="148" fill="url(#sunset-sky)" stroke="#ffffff" stroke-width="7"/>

  <g clip-path="url(#skyline-circle)">
    <!-- Midground Silhouettes: Distant skyscrapers & warm atmospheric buildings -->
    <path fill="#e85d26" opacity="0.88" d="
      M 10 320
      L 10 240
      L 25 240
      L 25 220
      L 45 220
      L 45 240
      L 58 240
      L 58 198
      L 72 198
      L 72 235
      L 90 235
      L 90 180
      L 98 165
      L 106 180
      L 106 230
      L 125 230
      L 125 205
      L 142 205
      L 142 235
      L 178 235
      L 178 205
      L 195 205
      L 195 225
      L 214 225
      L 214 175
      L 226 160
      L 238 175
      L 238 230
      L 255 230
      L 255 210
      L 275 210
      L 275 245
      L 295 245
      L 295 225
      L 310 225
      L 310 320
      Z
    "/>

    <!-- Foreground Silhouettes: Petronas Twin Towers, Menara KL, and Primary City Blocks -->
    <!-- City block lowrises (Navy #072a5a) -->
    <path fill="#072a5a" d="
      M 10 320
      L 10 252
      L 22 252
      L 22 238
      L 34 238
      L 34 260
      L 48 260
      L 48 242
      L 62 242
      L 62 268
      L 82 268
      L 82 320
      Z
    "/>

    <!-- PETRONAS TWIN TOWERS (Menara Berkembar Petronas) -->
    <!-- Symmetrical setback architecture centered around x=135 and x=175 -->
    <!-- Left Tower: Center x=135 -->
    <path fill="#072a5a" stroke="#072a5a" stroke-linejoin="round" d="
      M 119 320
      L 119 220
      L 121 220
      L 121 190
      L 124 190
      L 124 162
      L 127 162
      L 127 138
      L 130 138
      L 130 118
      L 132 118
      L 132 102
      L 134 102
      L 134 76
      L 135 55
      L 136 76
      L 136 102
      L 138 102
      L 138 118
      L 140 118
      L 140 138
      L 143 138
      L 143 162
      L 146 162
      L 146 190
      L 149 190
      L 149 220
      L 151 220
      L 151 320
      Z
    "/>

    <!-- Right Tower: Center x=175 -->
    <path fill="#072a5a" stroke="#072a5a" stroke-linejoin="round" d="
      M 159 320
      L 159 220
      L 161 220
      L 161 190
      L 164 190
      L 164 162
      L 167 162
      L 167 138
      L 170 138
      L 170 118
      L 172 118
      L 172 102
      L 174 102
      L 174 76
      L 175 55
      L 176 76
      L 176 102
      L 178 102
      L 178 118
      L 180 118
      L 180 138
      L 183 138
      L 183 162
      L 186 162
      L 186 190
      L 189 190
      L 189 220
      L 191 220
      L 191 320
      Z
    "/>

    <!-- Skybridge linking the two towers at y=170-178, with V-shaped supporting struts -->
    <!-- Bridge walkway deck -->
    <rect x="146" y="170" width="18" height="6" fill="#072a5a" rx="1"/>
    <!-- Diagonal V-struts supporting skybridge -->
    <path d="M 148 176 L 155 198 L 162 176" fill="none" stroke="#072a5a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>

    <!-- Spire pinnacle antennas -->
    <line x1="135" y1="55" x2="135" y2="40" stroke="#072a5a" stroke-width="2"/>
    <circle cx="135" cy="39" r="1.5" fill="#072a5a"/>
    <line x1="175" y1="55" x2="175" y2="40" stroke="#072a5a" stroke-width="2"/>
    <circle cx="175" cy="39" r="1.5" fill="#072a5a"/>

    <!-- MENARA KL (KL Tower) on the right: Center x=232 -->
    <!-- Tower base -->
    <path fill="#072a5a" d="
      M 226 320
      L 228 215
      L 230 165
      L 234 165
      L 236 215
      L 238 320
      Z
    "/>
    <!-- Observation Head & Revolving Restaurant (Tiered bulb) -->
    <path fill="#072a5a" stroke="#072a5a" stroke-linejoin="round" d="
      M 224 165
      L 240 165
      L 243 155
      L 242 147
      L 238 143
      L 226 143
      L 222 147
      L 221 155
      Z
    "/>
    <!-- Head accents -->
    <line x1="223" y1="152" x2="241" y2="152" stroke="#ffffff" stroke-width="1.2" opacity="0.6"/>
    <!-- Upper mast and antenna -->
    <path fill="#072a5a" d="
      M 230 143
      L 230 128
      L 231 128
      L 231 104
      L 233 104
      L 233 128
      L 234 128
      L 234 143
      Z
    "/>
    <line x1="232" y1="104" x2="232" y2="88" stroke="#072a5a" stroke-width="1.8"/>
    <circle cx="232" cy="87" r="1.2" fill="#072a5a"/>

    <!-- Right Foreground City Blocks -->
    <path fill="#072a5a" d="
      M 252 320
      L 252 248
      L 264 235
      L 274 235
      L 274 270
      L 288 270
      L 288 252
      L 298 252
      L 298 280
      L 310 280
      L 310 320
      Z
    "/>
  </g>
</svg>'''

with open('public/assets/illustrations/ui-v4/kl-skyline.svg', 'w') as f:
    f.write(svg)
print('Generated v4 kl-skyline.svg')
