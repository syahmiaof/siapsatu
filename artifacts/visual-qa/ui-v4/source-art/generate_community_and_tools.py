# Generate community-ribbon.svg, community-hero.svg, tools-ribbon.svg, and channel elements
import os

out_dir = 'public/assets/illustrations/ui-v4'
os.makedirs(out_dir, exist_ok=True)

# 1. community-ribbon.svg (viewBox="0 0 900 300", no preserveAspectRatio="none")
# Flowing ribbon that sits behind community learners
comm_curve = "M -20 280 C 180 230, 340 160, 480 140 C 640 120, 760 60, 920 15"
comm_navy = "M 80 300 C 160 210, 280 120, 440 60 C 580 15, 740 5, 900 0 V 300 H 80 Z"

comm_ribbon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" fill="none">
  <!-- Midnight Navy Negative Space -->
  <path fill="#062457" d="{comm_navy}"/>

  <!-- Fluid Malaysian Ribbon (Jalur Gemilang) -->
  <g id="comm-fluid-ribbon">
    <path d="{comm_curve}" fill="none" stroke="#ffffff" stroke-width="64" stroke-linejoin="round"/>
    <path d="{comm_curve}" fill="none" stroke="#ff1938" stroke-width="54" stroke-linejoin="round"/>
    <path d="{comm_curve}" fill="none" stroke="#ffffff" stroke-width="18" stroke-linejoin="round"/>
  </g>
</svg>'''

with open(f'{out_dir}/community-ribbon.svg', 'w') as f:
    f.write(comm_ribbon_svg)

# 2. tools-ribbon.svg (viewBox="0 0 800 250")
# Ribbon stays low under emblem (y=210..220 for x=0..380) to fix Tools collision!
tools_curve = "M -20 240 C 120 235, 260 230, 380 220 C 500 210, 580 80, 820 20"
tools_navy = "M 40 250 C 90 190, 150 110, 240 50 C 340 10, 520 0, 800 0 V 250 H 40 Z"

tools_ribbon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 250" fill="none">
  <!-- Clean Midnight Navy Negative Space: Ample room for 14-point star & crescent at x=200..360, y=20..140 -->
  <path fill="#062457" d="{tools_navy}"/>

  <!-- Fluid Malaysian Ribbon: Sweeps strictly BELOW the emblem region -->
  <g id="tools-fluid-ribbon">
    <path d="{tools_curve}" fill="none" stroke="#ffffff" stroke-width="66" stroke-linejoin="round"/>
    <path d="{tools_curve}" fill="none" stroke="#ff1938" stroke-width="54" stroke-linejoin="round"/>
    <path d="{tools_curve}" fill="none" stroke="#ffffff" stroke-width="18" stroke-linejoin="round"/>
  </g>
</svg>'''

with open(f'{out_dir}/tools-ribbon.svg', 'w') as f:
    f.write(tools_ribbon_svg)

# 3. Channel Icons for Community Sidebar
# All clean 32x32 vectors matching the mockup aesthetic

# Pengumuman (Megaphone)
pengumuman_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <path d="M 6 13 L 13 13 L 23 7 L 23 25 L 13 19 L 6 19 C 4.9 19 4 18.1 4 17 L 4 15 C 4 13.9 4.9 13 6 13 Z" fill="#ff3b00"/>
  <path d="M 23 10 C 25.5 11.5 27 13.6 27 16 C 27 18.4 25.5 20.5 23 22" stroke="#ff3b00" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M 10 19 L 10 24 C 10 25.1 10.9 26 12 26 C 13.1 26 14 25.1 14 24 L 14 19" fill="#d62800"/>
  <path d="M 6 13 H 13 V 19 H 6 Z" fill="#ff6b35"/>
</svg>'''

with open(f'{out_dir}/channel-pengumuman.svg', 'w') as f:
    f.write(pengumuman_svg)

# Tanya Modul (Speech Bubble)
tanya_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <path d="M 6 15 C 6 9.5 10.5 5 16 5 C 21.5 5 26 9.5 26 15 C 26 20.5 21.5 25 16 25 C 13.8 25 11.7 24.3 10 23.1 L 5 25 L 6.4 20.4 C 5.2 18.8 6 16.8 6 15 Z" 
        stroke="#062457" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'''

with open(f'{out_dir}/channel-tanya.svg', 'w') as f:
    f.write(tanya_svg)

# Kongsi Hasil (Media / Showcase Photo)
kongsi_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect x="5" y="6" width="22" height="20" rx="4" stroke="#062457" stroke-width="2.6"/>
  <circle cx="11" cy="12" r="2.2" fill="#062457"/>
  <path d="M 6 22 L 12 16 L 18 22 L 21 19 L 26 24" stroke="#062457" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
</svg>'''

with open(f'{out_dir}/channel-kongsi.svg', 'w') as f:
    f.write(kongsi_svg)

# Idea & Tools (Lightbulb)
idea_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <path d="M 11 18 C 9.5 16.5 8.5 14.3 8.5 12 C 8.5 7.9 11.9 4.5 16 4.5 C 20.1 4.5 23.5 7.9 23.5 12 C 23.5 14.3 22.5 16.5 21 18 L 19.5 21 H 12.5 L 11 18 Z" 
        stroke="#062457" stroke-width="2.6" stroke-linejoin="round"/>
  <line x1="12" y1="24" x2="20" y2="24" stroke="#062457" stroke-width="2.6" stroke-linecap="round"/>
  <path d="M 13.5 27 C 13.5 28.1 14.6 29 16 29 C 17.4 29 18.5 28.1 18.5 27" stroke="#062457" stroke-width="2.4" stroke-linecap="round"/>
</svg>'''

with open(f'{out_dir}/channel-idea.svg', 'w') as f:
    f.write(idea_svg)

# Semua Saluran (Hashtag / Grid)
semua_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <line x1="10" y1="5" x2="7" y2="27" stroke="#062457" stroke-width="2.6" stroke-linecap="round"/>
  <line x1="25" y1="5" x2="22" y2="27" stroke="#062457" stroke-width="2.6" stroke-linecap="round"/>
  <line x1="5" y1="12" x2="28" y2="12" stroke="#062457" stroke-width="2.6" stroke-linecap="round"/>
  <line x1="4" y1="20" x2="27" y2="20" stroke="#062457" stroke-width="2.6" stroke-linecap="round"/>
</svg>'''

with open(f'{out_dir}/channel-semua.svg', 'w') as f:
    f.write(semua_svg)

# 4. community-hero.svg
# Comprehensive Community Hero backdrop with discussion speech bubbles and notes
hero_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 240" fill="none">
  <!-- Right Midnight Navy Sky -->
  <path fill="#062457" d="M 220 240 C 300 160, 420 90, 560 40 C 680 5, 800 0, 900 0 V 240 H 220 Z"/>

  <!-- Fluid Malaysian Ribbon -->
  <g id="comm-hero-ribbon">
    <path d="M 180 240 C 320 180, 460 110, 580 90 C 720 70, 810 30, 920 10" fill="none" stroke="#ffffff" stroke-width="54" stroke-linejoin="round"/>
    <path d="M 180 240 C 320 180, 460 110, 580 90 C 720 70, 810 30, 920 10" fill="none" stroke="#ff1938" stroke-width="44" stroke-linejoin="round"/>
    <path d="M 180 240 C 320 180, 460 110, 580 90 C 720 70, 810 30, 920 10" fill="none" stroke="#ffffff" stroke-width="16" stroke-linejoin="round"/>
  </g>

  <!-- Discussion Speech Bubble 1 (Navy with Group Silhouettes) -->
  <g transform="translate(420, 25)">
    <rect width="64" height="42" rx="14" fill="#062457" stroke="#ffffff" stroke-width="2.5"/>
    <path d="M 28 42 L 32 50 L 38 42 Z" fill="#062457"/>
    <!-- 3 User Group Silhouettes inside bubble -->
    <!-- Middle leader -->
    <circle cx="32" cy="17" r="4.5" fill="#ffffff"/>
    <path d="M 24 33 C 24 28 27.5 25.5 32 25.5 C 36.5 25.5 40 28 40 33 Z" fill="#ffffff"/>
    <!-- Left user -->
    <circle cx="21" cy="20" r="3.5" fill="#ffffff" opacity="0.85"/>
    <path d="M 15 33 C 15 29 18 27 21 27 C 23.5 27 25 28.5 25.5 30 Z" fill="#ffffff" opacity="0.85"/>
    <!-- Right user -->
    <circle cx="43" cy="20" r="3.5" fill="#ffffff" opacity="0.85"/>
    <path d="M 38.5 30 C 39 28.5 40.5 27 43 27 C 46 27 49 29 49 33 Z" fill="#ffffff" opacity="0.85"/>
  </g>

  <!-- Discussion Speech Bubble 2 (White with Conversation Dots) -->
  <g transform="translate(500, 38)">
    <rect width="44" height="30" rx="12" fill="#ffffff" stroke="#e0e8f5" stroke-width="1.5"/>
    <path d="M 16 30 L 14 36 L 22 30 Z" fill="#ffffff"/>
    <circle cx="16" cy="15" r="2.5" fill="#062457"/>
    <circle cx="22" cy="15" r="2.5" fill="#062457"/>
    <circle cx="28" cy="15" r="2.5" fill="#062457"/>
  </g>

  <!-- Radiating Energy Ticks (Orange) -->
  <g stroke="#ff5a0a" stroke-width="3" stroke-linecap="round">
    <line x1="330" y1="40" x2="338" y2="28"/>
    <line x1="344" y1="48" x2="356" y2="44"/>
    <line x1="324" y1="52" x2="314" y2="48"/>
    
    <line x1="570" y1="90" x2="582" y2="82"/>
    <line x1="575" y1="102" x2="588" y2="100"/>
  </g>
</svg>'''

with open(f'{out_dir}/community-hero.svg', 'w') as f:
    f.write(hero_svg)

print('Generated community and tools SVG assets.')
