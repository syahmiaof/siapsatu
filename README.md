# SiapSatu LMS Frontend

> **Satu modul. Satu hasil.**  
> Practical Malay-first micro-learning platform for AI, tools, and software at RM10 per module.

This repository contains the complete responsive frontend implementation for **SiapSatu**, built according to the **Malaysia Utility** visual design system and verified against the approved reference mockups.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 14 (App Router)
- **Library:** [React](https://react.dev/) 18 & [TypeScript](https://www.typescriptlang.org/) (strict mode)
- **Styling:** CSS Modules with custom design tokens (`src/styles/tokens.css`)
- **Motion & Interactions:** [GSAP](https://gsap.com/) & `@gsap/react` with ScrollTrigger
- **Icons:** Official SVGs for tools + [Lucide React](https://lucide.dev/) for UI glyphs
- **Testing & Visual QA:** [Playwright](https://playwright.dev/) test suite (Desktop 1440x1024 & Mobile 390x844)

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Typecheck
```bash
npm run typecheck   # TypeScript check (0 errors)
npm run lint        # ESLint check (0 errors)
npm run build       # Next.js production build
npm start           # Serve production build
```

### 4. Run End-to-End & Visual QA Tests
```bash
npm run test:e2e    # Runs Playwright suite and captures screenshots to artifacts/visual-qa/
```

---

## Route Overview

| Route | Description | Reference Mockup |
|:---|:---|:---|
| `/` | Homepage with Malaysia utility hero, value pillars, and tool grid | `homepage-theme-03-malaysia-utility.png` |
| `/modules` | Filterable module catalog with categories and search | `modules-catalog-desktop.png` / `modules-catalog-mobile.png` |
| `/tools` | Directory of AI, automation, and software tools | `ui-01-tools-directory-desktop.png` / `ui-10-tools-directory-mobile-v2.png` |
| `/tools/n8n` | Dedicated n8n tool landing page with outcomes | `ui-02-tool-n8n-desktop.png` |
| `/tools/hermes-agent` | Hermes Agent tool hub and quickstart | `ui-03-tool-hermes-desktop.png` |
| `/paths/ai-automation` | 4-step progressive AI Automation learning path | `ui-04-learning-path-automation-v2.png` |
| `/modules/[slug]` | RM10 module detail page & checkout preview | `ui-05-module-detail-n8n.png` |
| `/learn/[slug]/[step]` | Practical text/template/link lesson reader | `ui-06-lesson-reader-n8n.png` / `lesson-mobile-siapsatu-v2.png` |
| `/library` | Learner dashboard with purchased modules and outputs | `ui-07-library-dashboard.png` |
| `/progress` | Skill progress map and milestone tracking | `ui-08-progress-map.png` |
| `/community` | WhatsApp channels, learner wins, and guidelines | `ui-09-community-hub.png` |
| `/login` | High-conversion OTP login view | Derived Malaysia Utility system |

---

## Project Structure

```text
academy-syahmi/
├── artifacts/
│   └── visual-qa/            # 27 desktop & mobile full-page screenshots
├── brand/                    # Brand identity assets and concept files
├── docs/
│   ├── ASSET_SOURCES.md      # Official provenance of all logos and artwork
│   └── VISUAL_QA.md          # Visual audit matrix and design decision notes
├── mockups/                  # Visual source-of-truth mockup references
├── public/
│   └── assets/
│       ├── brand/            # Official SiapSatu logo marks
│       ├── illustrations/    # Extracted artwork crops (no baked text)
│       └── tools/            # Official vector SVG & PNG tool logos
├── src/
│   ├── app/                  # Next.js App Router routes & styles
│   ├── components/           # Modular React components
│   │   ├── brand/            # Logo & brand accents
│   │   ├── community/        # Community notices & discussion cards
│   │   ├── learning/         # ModuleCard, LessonSidebar, CopyTemplate
│   │   ├── motion/           # AnimatedHeading, RevealSection
│   │   ├── navigation/       # SiteHeader, DesktopMegaMenu, MobileMenuSheet, MobileBottomNav
│   │   └── tools/            # ToolCard, ToolLogoTile
│   ├── data/                 # Typed mock data (modules, tools, paths, lessons)
│   ├── lib/                  # LocalStorage adapter & helper utilities
│   ├── styles/               # Design tokens and global CSS
│   └── types/                # Strict TypeScript interfaces
└── tests/                    # Playwright test specs
```

---

## Planning & Research Documentation

- [PRODUCT.md](PRODUCT.md): Confirmed product facts and scope constraints.
- [RESEARCH.md](RESEARCH.md): Malaysian market signals and pricing evidence.
- [BUSINESS_STRATEGY.md](BUSINESS_STRATEGY.md): RM10 unit economics and catalog strategy.
- [UI_PLAN.md](UI_PLAN.md): UX architecture and visual direction.
- [BRAND_COPY.md](BRAND_COPY.md): Copy deck and taglines.
- [mockups/UI_MOCKUPS_INDEX.md](mockups/UI_MOCKUPS_INDEX.md): Index of 10 Malaysia Utility expansion screens.
- [docs/ASSET_SOURCES.md](docs/ASSET_SOURCES.md): Previous agent's asset log; some logo and crop claims need verification.
- [docs/VISUAL_QA.md](docs/VISUAL_QA.md): Previous agent's QA report; visual match claims need fresh comparison.
- [ASTRA_VISUAL_REBUILD_PROMPT.md](ASTRA_VISUAL_REBUILD_PROMPT.md): targeted repair brief for Astra, based on actual gaps between saved captures and approved mockups.
