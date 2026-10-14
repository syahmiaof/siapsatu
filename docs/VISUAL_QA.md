# SiapSatu LMS Frontend — Visual QA & Forensic Verification Report

**Date:** 2026-10-15  
**Product:** SiapSatu (*"Satu modul. Satu hasil."*)  
**Design Authority:** Malaysia Utility Reference Suite (`mockups/`)  
**Audit Protocol:** Normalized width comparisons (1440px Desktop, 390px Mobile), 50% alpha overlays, bounding-box geometry checks, and automated behavior tests.  
**Interactive Evidence Viewer:** [`artifacts/visual-qa/astra/index.html`](../artifacts/visual-qa/astra/index.html)  
**Comparison Contact Sheet:** [`artifacts/visual-qa/astra/comparisons/contact.jpg`](../artifacts/visual-qa/astra/comparisons/contact.jpg)

---

## 1. Executive Summary

This report supersedes all prior unverified "100% Match" claims. Visual fidelity has been measured by pairing immutable mockup references against live production builds at identical normalized widths (1440px and 390px) with corresponding viewport crops.

### Key Milestones Achieved
1. **Asset Contamination Resolved:**
   - Replaced rectangular mockup crops that contained baked-in text, navigation fragments, and buttons with transparent vector SVGs and clean transparent character artwork (`learners-clean.png`, `learner-clean.png`, `hermes-clean.png`).
   - Sourced and verified genuine brand geometry via Simple Icons for Gemini, Claude, Cursor, ChatGPT, Perplexity, Make, Zapier, GitHub, Vercel, Canva, Figma, Notion, Meta, and WhatsApp.
   - Transparent logo padding resolved via pixel-exact display crop (`public/assets/brand/siapsatu-display.png`).
2. **Layout & Hierarchy Alignment:**
   - Reconstructed prominent header, wide hero compositions, integrated Malaysian flag ribbons, and responsive card grids.
   - Solved double-header collision, step coherence, and sticky dock content occlusion in `/learn/n8n-google-sheets/2`.
   - Recreated live HTML/CSS workflow nodes in `WorkflowDiagram.tsx` replacing pixelated screenshot cards.
3. **Engineering Gates:**
   - **TypeScript (`strict: true`):** 0 errors (`npm run typecheck`).
   - **ESLint:** 0 warnings, 0 errors (`npm run lint`).
   - **Production Build:** All 13 routes statically compiled (`npm run build`).
   - **Playwright Test Suite:** 47 passed, 7 skipped (cross-platform guards), 0 failed across Chromium Desktop (1440x1024) and Mobile (390x844).
   - **Responsive Geometry Check:** 0 horizontal overflows across 6 viewports (1440px, 1280px, 768px, 430px, 390px, 360px).

---

## 2. Route Verdict Matrix

Verdicts are categorized as:
- **Close:** Layout, typography, spacing, card proportions, and first-fold density match reference structure within acceptable production tolerances (~5%).
- **Material delta remains:** Measurable structural, compositional, or artwork differences persist.
- **Blocked by missing artwork:** High-fidelity source illustration does not exist in repository assets.

| Route / Screen | Reference Mockup | Viewport | Verdict | Comparative Analysis & Remaining Deltas | Evidence Links |
|:---|:---|:---|:---|:---|:---|
| **Laman Utama (`/`)** | `homepage-theme-03-malaysia-utility.png` | 1440px | **Close** | Hero width, two-line bold title, Malaysian flag ribbon accent, and 3-column featured cards align tightly. Artwork uses clean generated Malaysian learner trio (`learners-clean.png`) rather than the exact mockup characters. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-home-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-home-overlay.png) |
| **Katalog Modul (`/modules`)** | `modules-catalog-desktop.png` | 1440px | **Close** | Wide headline, search input, category filter pills, RM10 price callouts, and dense card grid match the reference first fold. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-modules-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-modules-overlay.png) |
| **Katalog Modul Mobile** | `modules-catalog-mobile.png` | 390px | **Close** | Device status bar excluded from web layout. Search and chips start at reference depth; single-column card stack scrolls smoothly above the persistent bottom dock. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/390-modules-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/390-modules-overlay.png) |
| **Mega Menu** | `modules-mega-menu-desktop.png` | 1440px | **Close** | 3 categorical columns (AI & Ejen, Automasi & Integrasi, No-Code & Web) open cleanly below "Modul" link with keyboard focus trapping and Escape restoration. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-mega-menu-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-mega-menu-overlay.png) |
| **Direktori Alat (`/tools`)** | `ui-01-tools-directory-desktop.png` | 1440px | **Close** | Broad flag/ribbon hero, search input, 4-column tool grid, opaque brand marks, and module count badges match reference geometry. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-tools-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-tools-overlay.png) |
| **Direktori Alat Mobile** | `ui-10-tools-directory-mobile-v2.png` | 390px | **Close** | Large logo, compact filters, readable tool cards, and non-obscuring bottom navigation dock. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/390-tools-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/390-tools-overlay.png) |
| **Hab n8n (`/tools/n8n`)** | `ui-02-tool-n8n-desktop.png` | 1440px | **Close** | Wide integrated workflow area built via `WorkflowDiagram.tsx`, official n8n mark, outcome pillars, and 4-column module tiles row. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-tools-n8n-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-tools-n8n-overlay.png) |
| **Hab Hermes (`/tools/hermes-agent`)** | `ui-03-tool-hermes-desktop.png` | 1440px | **Close** | Hermes official logo preserved, CLI quickstart terminal block, practical enterprise outcome points, and character illustration card (`hermes-clean.png`). | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-tools-hermes-agent-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-tools-hermes-agent-overlay.png) |
| **Laluan Automasi (`/paths/ai-automation`)** | `ui-04-learning-path-automation-v2.png` | 1440px | **Close** | 4-step progressive timeline rail, outcome checklist boxes, bundle price comparison (RM35 vs RM40), and deep links to modules. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-paths-ai-automation-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-paths-ai-automation-overlay.png) |
| **Detail Modul (`/modules/n8n-google-sheets`)** | `ui-05-module-detail-n8n.png` | 1440px | **Close** | RM10 standalone purchase card, step breakdown, "Apa yang anda dapat" deliverables list, and interactive checkout modal preview. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-modules-n8n-google-sheets-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-modules-n8n-google-sheets-overlay.png) |
| **Lesson Reader (`/learn/n8n-google-sheets/2`)** | `ui-06-lesson-reader-n8n.png` | 1440px | **Material delta remains** | Single unified reader header fixed; step sidebar and template copy box operational. Note: mockup depicts step 3 while implemented demo serves step 2 content with accurate interactive template copy. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-learn-n8n-google-sheets-2-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-learn-n8n-google-sheets-2-overlay.png) |
| **Lesson Reader Mobile** | `lesson-mobile-siapsatu-v2.png` | 390px | **Material delta remains** | Single header and accessible copy box operational; sticky footer leaves content reachable. Reference depicts different lesson topic (Meta Ads vs n8n); structural layout matches. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/390-learn-n8n-google-sheets-2-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/390-learn-n8n-google-sheets-2-overlay.png) |
| **Library (`/library`)** | `ui-07-library-dashboard.png` | 1440px | **Close** | Active purchased modules, progress percentages, deliverable downloads, and recommended next module card. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-library-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-library-overlay.png) |
| **Peta Kemajuan (`/progress`)** | `ui-08-progress-map.png` | 1440px | **Close** | Skill tracks with progress bars, completed milestone badges, and clear "Next Action" recommendations. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-progress-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-progress-overlay.png) |
| **Komuniti (`/community`)** | `ui-09-community-hub.png` | 1440px | **Close** | Official WhatsApp channel links, Malaysian learner showcase wins, and community guidelines with local post creation dialog. | [Side-by-side](../artifacts/visual-qa/astra/comparisons/1440-community-side-by-side.jpg)<br>[50% Overlay](../artifacts/visual-qa/astra/comparisons/1440-community-overlay.png) |
| **Log Masuk (`/login`)** | *Derived Malaysia Utility* | 1440px / 390px | **Close** | Clean, focused card with phone/email OTP input, prototype disclaimer, and return link to home. No dedicated mockup was supplied. | [Desktop Fold](../artifacts/visual-qa/astra/final/1440-login-fold.png)<br>[Mobile Fold](../artifacts/visual-qa/astra/final/390-login-fold.png) |

---

## 3. Forensic Asset & Logo Verification

Every logo in `public/assets/tools/` was audited against official brand marks and Simple Icons vector geometry:

- **Supplied Official Assets (Untouched):**
  - SiapSatu Logo: `brand/logo-concepts/siapsatu-primary-final.png` (SHA256: `ae9bb07d...`)
  - n8n Mark: `brand/tool-logos/n8n-official.png` (SHA256: `91dbb883...`)
  - Hermes Agent: `brand/tool-logos/hermes-agent-official.png` (SHA256: `5fbced60...`)
- **Simple Icons Geometry Verified (Exact SVG Path Match):**
  - `chatgpt.svg`, `claude.svg`, `cursor.svg`, `gemini.svg`, `perplexity.svg`, `make.svg`, `zapier.svg`, `github.svg`, `vercel.svg`, `canva.svg`, `figma.svg`, `notion.svg`, `meta.svg`, `whatsapp.svg`.
- **Neutral Text Treatments (Honest Provenance):**
  - `notebooklm.svg`: Neutral `NLM` text badge (Simple Icons retrieval timed out).
  - `codex.svg`: Neutral `Codex` text badge (no standalone official mark available).
  - `antigravity.svg`: Neutral `AG` text badge.
  - `vibecode.svg`: Authored code-bracket icon for learning topic.

---

## 4. Responsive & Accessibility Validation

- **Viewport Geometry (`geometry.json`):**
  - `1440x1024` (Desktop): `overflow: false`, `brokenImages: 0`, `errors: 0`.
  - `1280x800` (Small Desktop): `overflow: false`, `brokenImages: 0`, `errors: 0`.
  - `768x1024` (Tablet): `overflow: false`, `brokenImages: 0`, `errors: 0`.
  - `430x932` (Large Mobile): `overflow: false`, `brokenImages: 0`, `errors: 0`.
  - `390x844` (Standard Mobile): `overflow: false`, `brokenImages: 0`, `errors: 0`.
  - `360x800` (Compact Mobile): `overflow: false`, `brokenImages: 0`, `errors: 0`.
- **Keyboard & Focus Navigation:**
  - Mega Menu: Keyboard arrow navigation, focus loop, and `Escape` key trigger restoration.
  - Checkout Modal: Keyboard focus trap (`Tab`/`Shift+Tab`) with `Escape` dismiss and return focus to trigger button (`src/lib/useDialogFocus.ts`).
  - Mobile Drawer: Focus trapped inside drawer, body scroll locked, mounted via `createPortal`.
- **Accessible Clipboard Action:**
  - `CopyTemplate.tsx` implements `navigator.clipboard.writeText` with automated fallback to `document.execCommand("copy")` inside a hidden textarea for headless/restricted contexts.

---

## 5. Verification Command Logs

```bash
# 1. Typecheck
$ npm run typecheck
> tsc --noEmit
# Exit code 0 (0 errors)

# 2. Lint
$ npm run lint
> next lint
✔ No ESLint warnings or errors
# Exit code 0

# 3. Production Build
$ npm run build
> next build
✓ Compiled successfully
✓ Generating static pages (13/13)
# Exit code 0

# 4. Playwright End-to-End Suite
$ npm run test:e2e
47 passed, 7 skipped (cross-platform guards), 0 failed
# Exit code 0
```
