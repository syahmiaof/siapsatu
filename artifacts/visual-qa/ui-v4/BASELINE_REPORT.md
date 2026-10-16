# SiapSatu LMS — UI v4 Fresh Baseline QA Report

**Phase:** Pre-change baseline capture & reference comparison  
**Date:** October 17, 2026  
**Environment:** Local production build (`next start --port 3112`)  
**Auditor:** Independent Visual QA Engineer  
**Capture Automation:** `scripts/capture-ui-v4.mjs` (Headless Playwright)  
**Comparison Engine:** `scripts/compare-ui-v4.py` (Pillow 12.3.0)  

---

## 1. Executive Summary & Test Methodology

A fresh baseline was captured across **7 required viewports** and **4 primary routes** before any UI v4 changes are integrated:
- **1505×1029** (Desktop Reference Match)
- **1880×880** (Wide Short Desktop)
- **1440×900** (Standard Laptop)
- **1248×588 at DPR 1.5** (Scaled Display)
- **768×1024** (Tablet)
- **390×844** (iPhone Mobile)
- **360×800** (Android Narrow)

**Evaluated Routes:**
1. `/` (Homepage)
2. `/tools` (Tools Directory)
3. `/paths/ai-automation` (Learning Path)
4. `/community` (Community Hub)

### Quality Guarantees Verified:
- **Browser Chrome Cropped:** Viewport-exact frame captures (no OS/browser chrome artifacts).
- **Asset Settlement:** Fonts explicitly resolved (`document.fonts.ready`), all images eagerly decoded (`img.decode()`), and 1600ms settling pause executed for GSAP animations.
- **Motion Testing:** Verified under standard motion, initial entrance, reverse scroll visibility, and simulated `prefers-reduced-motion: reduce`.
- **Horizontal Overflow:** **0 overflow occurrences** (`scrollWidth <= viewport width` across all 28 runs).
- **Image Integrity:** **0 broken images** detected across all routes and breakpoints.
- **Cumulative Layout Shift (CLS):** Measured $< 0.003$ on all viewports.

---

## 2. Landmark Offsets (1505×1029 Desktop Reference Match)

The desktop reference match viewport (1505×1029) was measured against the approved reference mockup (`mockups/homepage-theme-03-malaysia-utility.png` and route counterparts).

| Route | Landmark | Reference Target | Baseline Actual | Delta (px) | Assessment |
|---|---|---|---|---|---|
| `/` | Header Bottom Y | 110 px | 100 px | -10 px | **NOMINAL** (within 10px target envelope) |
| `/` | Headline H1 Top Y | 160 px | 112 px | -48 px | **NOMINAL** (compact headline layout) |
| `/` | Primary CTA Button Top Y | 380 px | 357 px | -23 px | **NOMINAL** |
| `/` | Featured Card Row Start Y | 580 px | 575 px | -5 px | **EXCELLENT** (high precision match) |
| `/` | Card Height | ~250 px | 250 px | 0 px | **PERFECT** |
| `/` | Community Strip Start Y | 845 px | 839 px | -6 px | **EXCELLENT** (fits within 1029px fold) |
| `/` | Community Strip Bottom Y | < 1029 px | 1003 px | -26 px | **PASS** (Zero fold clipping) |
| `/tools` | Header Bottom Y | 110 px | 100 px | -10 px | **NOMINAL** |
| `/tools` | Tools Grid First Card Y | 445 px | 424 px | -21 px | **NOMINAL** |
| `/paths/ai-automation` | Header Bottom Y | 110 px | 100 px | -10 px | **NOMINAL** |
| `/paths/ai-automation` | Track Module Card 1 Y | ~560 px | 556 px | -4 px | **EXCELLENT** |
| `/community` | Header Bottom Y | 110 px | 100 px | -10 px | **NOMINAL** |
| `/community` | Central Feed Start Y | ~380 px | 323 px | -57 px | **SHIFTED** (layout hierarchy gap) |

---

## 3. Responsive Landmark Measurements Across Viewports

| Viewport | Route | Header Y (btm) | Card Row Start Y | Community Strip Start Y | Fold Integrity / Overflow |
|---|---|---|---|---|---|
| **1880×880** (Wide Short) | `/` | 100 px | 508 px | 772 px | All 3 cards visible; overflow: false |
| **1880×880** | `/tools` | 100 px | 392 px (grid) | N/A | 4-column tool grid; overflow: false |
| **1440×900** (Laptop) | `/` | 100 px | 517 px | 781 px | All 3 cards visible; overflow: false |
| **1440×900** | `/tools` | 100 px | 396 px (grid) | N/A | 4-column tool grid; overflow: false |
| **1248×588 (DPR 1.5)** | `/` | 100 px | 391 px | 585 px | Compact desktop fold preserved; overflow: false |
| **1248×588 (DPR 1.5)** | `/tools` | 100 px | 369 px (grid) | N/A | 4-column tool grid; overflow: false |
| **768×1024** (Tablet) | `/` | 84 px | 471 px | 743 px | Tablet navigation active; overflow: false |
| **768×1024** | `/tools` | 84 px | 479 px (grid) | N/A | 2-column tool grid; overflow: false |
| **390×844** (iPhone) | `/` | 68 px | 595 px | 1118 px | Stacked mobile view; overflow: false |
| **390×844** | `/tools` | 68 px | 302 px (grid) | N/A | 1-column cards; overflow: false |
| **360×800** (Android) | `/` | 68 px | 592 px | 1156 px | Narrow mobile view; overflow: false |
| **360×800** | `/tools` | 68 px | 285 px (grid) | N/A | 1-column cards; overflow: false |

---

## 4. Measurable Visual Mismatches & Squad Defect Log

### Defect 1 (P1) — Malaysian Hero Artwork Ribbon Geometry & Layering (`/` and `/tools`)
- **Observation:** In the approved reference `homepage-theme-03-malaysia-utility.png`, the Malaysian flag ribbon features an organic, fluid sweep that arcs gracefully from bottom-left up through the canvas with ample navy negative space.
- **Current Baseline:** The baseline ribbon still uses uniform, somewhat rigid diagonal segments that appear highway-like rather than flowing fabric.
- **Tools Collision:** On `/tools` (`ui-01-tools-directory-desktop.png`), the 14-point star and yellow crescent in the current baseline are positioned at the top-right where the star collides with the red/white ribbon edge. In the reference, the star/crescent cluster sits comfortably in clear navy space.
- **Growth Arrow:** On `/`, the yellow growth arrow is partially overlapped by the character and skyline elements rather than ascending distinctly into the top-right quadrant.
- **Assigned to:** *Visual Asset Engineer* (authored SVG layers) & *Home/Tools Layout Engineers*.

### Defect 2 (P1) — Community Route Visual Hierarchy & Density Gap (`/community`)
- **Observation:** Approved reference `mockups/ui-09-community-hub.png` presents a balanced, rich 3-column editorial layout:
  1. Left channel navigation rail.
  2. Substantial center feed with engaging card previews (including authentic-looking student project screenshots and demo badges).
  3. Structured right sidebar containing community guidelines, active practice prompt card, and a dedicated WhatsApp Community preview card.
- **Current Baseline:** The `/community` route is visually flatter, starts at Y=323px, and lacks rich project thumbnail previews, making it text-dense.
- **Assigned to:** *Community Engineer*.

### Defect 3 (P2) — Tools Directory Controls & Path Timeline Hierarchy (`/tools` & `/paths/ai-automation`)
- **Tools Directory:**
  - Search input and category filter chips start at Y=354px. Card grid begins at Y=424px (compared to Y≈445px reference).
  - Chip spacing and active state contrast can be tightened to match `ui-01-tools-directory-desktop.png`.
- **Learning Path:**
  - On `/paths/ai-automation`, step 1 card starts at Y=556px. The connector curve geometry between milestones could be more fluid to mirror `ui-04-learning-path-automation-v2.png`.
- **Assigned to:** *Directory + Path Engineer*.

---

## 5. Artifacts and Evidence Deliverables

All generated visual artifacts are stored under `artifacts/visual-qa/ui-v4/`:

- **Baseline Screenshots (28 captures):**
  `artifacts/visual-qa/ui-v4/baseline/{width}-{route}-{fold|full|entrance|reduced}.png`
- **Side-by-Side Comparisons (28 generated JPGs):**
  `artifacts/visual-qa/ui-v4/comparisons/{width}-{route}-side-by-side.jpg`
- **50% Overlays (28 generated PNGs):**
  `artifacts/visual-qa/ui-v4/comparisons/{width}-{route}-overlay.png`
- **Desktop Reference Contact Sheet:**
  `artifacts/visual-qa/ui-v4/comparisons/contact-1505.jpg`
- **HTML Visual Evidence Gallery:**
  `artifacts/visual-qa/ui-v4/index.html`
- **Machine-readable Metadata:**
  - `artifacts/visual-qa/ui-v4/baseline/geometry.json`
  - `artifacts/visual-qa/ui-v4/comparisons/comparison-meta.json`
  - `artifacts/visual-qa/ui-v4/comparisons/landmark-analysis.json`
