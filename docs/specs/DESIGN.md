# SiapSatu Design System & UI Specification

**Version:** 1.0.0  
**Brand:** SiapSatu (`Satu modul. Satu hasil.`)  
**Design Thesis:** Malaysia Utility — Official, friendly, highly legible, energetic, practical Malay-first micro-learning.

---

## 1. Design Tokens & Color System

### 1.1 Structural Palette
- `--ss-navy-950`: `#03143a` (Deepest structure, primary text, high-contrast borders)
- `--ss-navy-900`: `#062457` (Malaysian utility navy, card backgrounds, header elements)
- `--ss-navy-800`: `#0b3474` (Mid-tone navy, secondary headers, active state accents)
- `--ss-ink`: `#071a3d` (Deep text color for body copy on light backgrounds)
- `--ss-muted`: `#53627d` (Secondary metadata, subtitles, timestamps, inactive borders)
- `--ss-line`: `#dbe4f1` (Crisp container borders, subtle card dividers)

### 1.2 Action & Signal Accents
- `--ss-orange`: `#ff5a0a` (Brand energy orange, secondary CTA accents, badge highlights)
- `--ss-red`: `#ff2445` (Primary action CTA red, urgency tags, Malaysian flag red)
- `--ss-cta-gradient`: `linear-gradient(135deg, #ff5a0a 0%, #ff2445 100%)` (Signature high-energy button fill)
- `--ss-green`: `#08bd59` (Outcome completed, growth arrows, WhatsApp brand green `#25d366`)
- `--ss-green-dark`: `#057a44` (Vibe Code card background, dark success states)
- `--ss-yellow`: `#ffd12a` (Malaysian star & crescent yellow, callout highlights, sticky note accents)
- `--ss-blue`: `#1777f2` (Direct tool link blue, Meta Ads brand blue)

### 1.3 Surface Backgrounds
- `--ss-surface`: `#ffffff` (Pure card surface, inputs, modal containers)
- `--ss-bg`: `#f8fafd` (Primary app backdrop: clean, light, cool Malaysian utility white)
- `--ss-surface-blue`: `#f2f7ff` (Soft info containers, tool category chips)
- `--ss-surface-red`: `#fff2f4` (Active step callout, lesson highlights, urgent tips)
- `--ss-surface-green`: `#effbf5` (Completed outcome panels, WhatsApp card backgrounds)
- `--ss-surface-yellow`: `#fffbe8` (Sticky notes, tip callouts)
- `--ss-surface-subtle`: `#f1f5fa` (Search inputs, inactive progress tracks)

### 1.4 Border Radii & Elevation
- `--ss-radius-xs`: `8px` (Chips, small badge tags)
- `--ss-radius-sm`: `14px` (Inputs, secondary buttons, tool icons)
- `--ss-radius-md`: `22px` (Standard cards, module tiles, popovers)
- `--ss-radius-lg`: `32px` (Hero containers, large banner panels)
- `--ss-radius-pill`: `9999px` (Action buttons, category filter tabs)
- `--ss-shadow-sm`: `0 2px 8px rgb(3 20 58 / 0.05)`
- `--ss-shadow-card`: `0 16px 44px rgb(3 20 58 / 0.08)`
- `--ss-shadow-lift`: `0 22px 60px rgb(3 20 58 / 0.16)`
- `--ss-shadow-glow-orange`: `0 8px 24px rgb(255 90 10 / 0.28)`

### 1.5 Motion Speeds
- `--ss-motion-fast`: `160ms`
- `--ss-motion-base`: `280ms`
- `--ss-motion-slow`: `760ms`
- `--ss-ease-spring`: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- `--ss-ease-out`: `cubic-bezier(0.16, 1, 0.3, 1)`

---

## 2. Typography System

- **Display & Headings:** `Bricolage Grotesque`, sans-serif (Bold, 700 & 800 weights, tight letter-spacing, rounded geometry).
- **Body & Controls:** `Manrope`, sans-serif (Medium 500, Semi-Bold 600, Bold 700, high legibility for Malay text, wide x-height).
- **Code & Snippets:** `JetBrains Mono` or system monospace font for JSON templates and workflows.

### Scale:
- Hero H1: `clamp(2.4rem, 5vw, 4.2rem)` / Line height `1.08` / Weight `800`
- Section H2: `clamp(1.75rem, 3.5vw, 2.5rem)` / Line height `1.15` / Weight `800`
- Card H3: `1.25rem - 1.5rem` / Line height `1.25` / Weight `700`
- Subheading: `1.05rem - 1.25rem` / Line height `1.45` / Weight `500`
- Body Text: `0.95rem - 1.05rem` / Line height `1.6` / Weight `500`
- Microcopy & Badges: `0.75rem - 0.85rem` / Line height `1.3` / Weight `600` - `700`

---

## 3. Component Grammar

### 3.1 Buttons
- **Primary CTA (`PrimaryButton`):**
  - Pill shape (`border-radius: 9999px`), bold text, trailing right arrow icon.
  - Fill: `--ss-orange` or gradient `--ss-cta-gradient`, white text.
  - Hover: `translateY(-3px)`, shadow lift (`--ss-shadow-glow-orange`), arrow slides `+4px`.
  - Active: scale down to `0.98`.
  - Focus-visible: 3px high-contrast outline (`--ss-navy-950`) with 2px offset.
  - Subtle light sweep pseudo-element on hover.
- **Secondary / Ghost Button:**
  - Pill shape, pure white or transparent surface, 2px border `--ss-navy-950` or `--ss-line`.
  - Hover: `translateY(-2px)`, subtle background tint.

### 3.2 Header & Navigation
- **Site Header (`SiteHeader`):**
  - Crisp white backdrop with subtle bottom line `--ss-line`.
  - Left: Brand logo with animated hover lift.
  - Center: Nav links (`Modul`, `Tools`, `Laluan`, `Komuniti`) with sliding orange bottom indicator.
  - `Modul` trigger opens the interactive Desktop Mega Menu.
  - Right: "Masuk ->" button linking to `/login` or user avatar when signed in.
  - Mobile: Search trigger + Hamburger trigger that slides out `MobileMenuSheet`.
- **Desktop Mega Menu (`DesktopMegaMenu`):**
  - 3 structured columns:
    1. Nak capai apa? (Jual lebih jelas, Kerja lebih laju, Bina & deploy)
    2. Untuk siapa? (Owner bisnes, Student, Beginner AI)
    3. Tool popular (Gemini, GitHub, Codex, Meta Ads, Automation)
  - Bottom spotlight banner (Featured module of the week: Meta Ads + AI RM10).
  - Keyboard accessible: Trap-free, Escape to dismiss, outside click detection.
- **Mobile Bottom Navigation (`MobileBottomNav`):**
  - Fixed dock at viewport bottom on mobile (`z-index: 100`).
  - Items: `Home`, `Modul`, `Tools`, `Profil` (or `Komuniti`).
  - Active tab receives solid accent icon, red label, and active pip.

### 3.3 Cards & Tiles
- **Featured Module Card (Large 3-Up Row):**
  - Deep Malaysian navy (`#062457`), crimson red (`#c4161c`), or deep green (`#057a44`).
  - Tool icon in pure white rounded squircle.
  - Title, description, tags, bold `RM10` price, circular arrow action button.
  - Subtle background vector motifs (upward graph, cards, wireframe browser).
- **Compact Module Card (`ModuleCard`):**
  - White surface, crisp border `--ss-line`, rounded corners (`--ss-radius-md`).
  - Tool mark in squircle, category badge, estimated duration, level badge.
  - Price `RM10` and action button.
- **Tool Card (`ToolCard`):**
  - High-clarity white tile, centered/left-aligned official tool logo in squircle.
  - Tool title, category pill, module count indicator ("X modul"), arrow icon.
  - Hover: Halo glow matching tool's brand color, scale 1.02.
- **Lesson Reader (`LessonSidebar`, `CopyTemplate`):**
  - Sticky step rail with numbered circles and connection lines.
  - Step details card with red numbered badge ("03"), actionable steps.
  - Copyable template block with one-click copy, confirmation toast, and official tool link.
  - Try-it task container with checklist completion toggle.

---

## 4. Illustration & Visual Identity Treatment

1. **Malaysian Learner Trio:**
   - Vector illustrated figures representing Malaysian students, business owners, and tech learners.
   - Distinct features: young male student with laptop, female professional in modern dark hijab with laptop, tech learner in hoodie and glasses.
   - Outlines: Bold, crisp Malaysian navy (`#062457`) strokes with smooth cel-shading.
2. **National & Cultural Accent Motifs:**
   - Jalur Gemilang dynamic red and white waving ribbons with navy canton field.
   - 14-pointed Federal Star (Bintang Persekutuan) and Crescent Moon in golden yellow (`#ffd12a`).
   - Kuala Lumpur skyline silhouette (Petronas Twin Towers, Menara KL) as subtle structural backdrop.
   - Green growth vector arrow pointing upward.
3. **Asset Discipline:**
   - Visual crops must contain purely vector art/illustrations—never embedded typography, UI cards, or buttons. All text is rendered via accessible semantic HTML/CSS.

---

## 5. Motion Grammar (GSAP & CSS)

- **Accessible Animated Headings (`AnimatedHeading`):**
  - Semantic heading tags (`h1`, `h2`, `h3`) with text split into word spans.
  - Screen readers receive the unified text; decorative spans are flagged or structured cleanly.
  - Initial GSAP state: `autoAlpha: 0, yPercent: 115, rotationX: -12`.
  - Reveal: stagger `0.05s`, duration `0.7s`, `power3.out`. Accent words settle with a subtle micro-scale.
  - Scroll exit/re-entry: cleanly animated in and out based on viewport scroll.
- **Hero Entrance Sequence:**
  1. Header & logo fade in (`y: -10 -> 0`).
  2. Eyebrow & headline words stagger in.
  3. Supporting copy & CTA rise (`y: 20 -> 0, opacity: 0 -> 1`).
  4. Audience pills stagger in.
  5. Hero illustration settles (`xPercent: 6 -> 0, scale: 0.96 -> 1`).
  6. Decorative ribbons receive gentle parallax response.
- **Scroll Triggers (`ScrollTrigger.batch`):**
  - Batch entrance for card grids (`y: 30, opacity: 0 -> y: 0, opacity: 1, stagger: 0.08`).
  - Plugins registered once at root, scoped with `useGSAP()`, and cleanly reverted on route changes.
- **Reduced Motion:**
  - Evaluated via `gsap.matchMedia("(prefers-reduced-motion: reduce)")`.
  - When enabled: All content is immediately visible with zero translation or stagger. Instant opacity transitions only.
