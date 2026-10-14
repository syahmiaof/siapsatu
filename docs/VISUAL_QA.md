# SiapSatu LMS Frontend — Visual QA & Design System Verification Report

**Date:** 2026-10-15  
**Product:** SiapSatu ("Satu modul. Satu hasil.")  
**Design Direction:** Malaysia Utility  
**Target Viewports:**
- **Desktop:** 1440 × 1024 px
- **Mobile:** 390 × 844 px (iPhone 14 / standard modern mobile)

---

## 1. Executive Summary

All 12 required routes and interaction surfaces have been fully implemented, styled in accordance with the **Malaysia Utility** design system, and verified against the approved reference mockups.

Playwright end-to-end tests captured 27 full-fidelity screenshots under `artifacts/visual-qa/`. Automated tests and visual inspections confirm:
1. **Zero Layout Shifts & Zero Stacking Context Bleeds:** Header, mobile drawer, desktop mega menu, and checkout modal operate without z-index collisions or viewport clipping.
2. **Product Truth Adherence:** No fake user stats, fake ratings, or countdown timers. Standalone pricing is consistently RM10 per module. Base module lessons contain strictly text, screenshots, official links, template code, and practical tasks (zero video).
3. **Typography & Styling:** Display headings feature rounded geometric weights, navy structural backgrounds (`--ss-navy-900: #062457`), energetic orange-red primary CTAs (`--ss-orange: #ff5a0a`), clean green completion tags (`--ss-green: #08bd59`), and authentic Malaysian flag ribbon accents.
4. **All Tool Logos Locally Sourced:** SVG/PNG marks for n8n, Hermes Agent, OpenAI, Gemini, Claude, Perplexity, NotebookLM, Make, Zapier, GitHub, Vercel, Canva, Figma, Notion, Meta, WhatsApp, Cursor, and Codex are stored locally in `public/assets/tools/`.

---

## 2. Visual QA Matrix & Reference Comparison

| Screen # | Reference Mockup | Route | Desktop Capture (1440px) | Mobile Capture (390px) | Fidelity Status & Notes |
|:---|:---|:---|:---|:---|:---|
| **Home** | `homepage-theme-03-malaysia-utility.png` | `/` | `desktop-homepage.png` | `mobile-homepage.png` | **Match.** Malaysia utility hero with ribbon accents, value pillars, featured module cards, tool grid, community CTA, and Malaysian learner illustrations. |
| **Catalog** | `modules-catalog-desktop.png`<br>`modules-catalog-mobile.png` | `/modules` | `desktop-modules-catalog.png` | `mobile-modules-catalog.png` | **Match.** Category filter pills, search input, RM10 price callout, outcome badges, step counts, and active filter empty states. |
| **Mega Menu** | `modules-mega-menu-desktop.png` | `/` (nav dropdown) | `desktop-mega-menu-open.png` | *Covered by drawer* | **Match.** 3-column categorical layout (AI & Agent, Automasi & Integrasi, No-Code & Web) with quick links, outcome descriptions, and direct route navigation. |
| **01** | `ui-01-tools-directory-desktop.png` | `/tools` | `desktop-tools-directory.png` | `mobile-tools-directory.png` | **Match.** Multi-category tool directory, search filter, tool badges, module counts, and clean card grid. |
| **02** | `ui-02-tool-n8n-desktop.png` | `/tools/n8n` | `desktop-tool-n8n.png` | `mobile-tool-n8n.png` | **Match.** Hero with official n8n logo, official website link, outcome pillars, RM10 modules for n8n, and bundled AI automation path card. |
| **03** | `ui-03-tool-hermes-desktop.png` | `/tools/hermes-agent` | `desktop-tool-hermes-agent.png` | `mobile-tool-hermes-agent.png` | **Match.** Hermes Agent official mark, command-line quickstart block, practical enterprise outcomes, and related agent modules. |
| **04** | `ui-04-learning-path-automation-v2.png` | `/paths/ai-automation` | `desktop-learning-path-automation.png` | `mobile-learning-path-automation.png` | **Match.** 4-step progressive track, timeline connector line, outcome checklists, bundle pricing preview (RM35 vs RM40), and module deep-links. |
| **05** | `ui-05-module-detail-n8n.png` | `/modules/n8n-google-sheets` | `desktop-module-detail-n8n.png` | `mobile-module-detail-n8n.png` | **Match.** RM10 standalone purchase card, step breakdown, "Apa yang anda dapat", practical outcome preview, and interactive checkout modal trigger. |
| **06** | `ui-06-lesson-reader-n8n.png`<br>`lesson-mobile-siapsatu-v2.png` | `/learn/n8n-google-sheets/2` | `desktop-lesson-reader-n8n.png` | `mobile-lesson-reader-n8n.png` | **Match.** Step progress sidebar, clean reading typography, official link badges, code template box with accessible clipboard copy, and next step navigation. |
| **07** | `ui-07-library-dashboard.png` | `/library` | `desktop-library-dashboard.png` | `mobile-library-dashboard.png` | **Match.** Purchased modules list with progress percentage, quick resume actions, completed deliverables download, and recommended next RM10 module. |
| **08** | `ui-08-progress-map.png` | `/progress` | `desktop-progress-map.png` | `mobile-progress-map.png` | **Match.** Overall completion statistics, visual track progress bars, completed milestones, and actionable next steps. |
| **09** | `ui-09-community-hub.png` | `/community` | `desktop-community-hub.png` | `mobile-community-hub.png` | **Match.** WhatsApp group support channels, Malaysian learner showcase wins, and community guidelines with official links. |
| **10** | `ui-10-tools-directory-mobile-v2.png` | `/tools` (mobile) | *N/A (mobile specific)* | `mobile-tools-directory.png` | **Match.** Mobile-optimized single column card stack with category chips and persistent bottom navigation dock. |
| **Modal** | Interaction surface | Triggered on `/modules/[slug]` | `desktop-checkout-modal.png` | *Responsive modal* | **Match.** RM10 order summary, payment method options (FPX / DuitNow QR / Card), prototype disclaimer, and dismiss controls. |
| **Drawer** | Mobile navigation sheet | Triggered on hamburger | *N/A (mobile)* | `mobile-menu-drawer-open.png` | **Match.** Portalized full-height slide-over sheet with clean navigation links, search, and login button. |
| **Auth** | Derived from system | `/login` | `desktop-login-page.png` | `mobile-login-page.png` | **Match.** Clean, focused card with phone/email input, OTP trigger, and return link to home. |

---

## 3. Design Tokens & Styling Fidelity

The frontend strictly enforces the Malaysia Utility token system in `src/styles/tokens.css`:

```css
:root {
  --ss-navy-950: #03143a;
  --ss-navy-900: #062457;
  --ss-navy-800: #0b3474;
  --ss-orange: #ff5a0a;
  --ss-red: #ff2445;
  --ss-green: #08bd59;
  --ss-yellow: #ffd12a;
  --ss-blue: #1777f2;
  --ss-ink: #071a3d;
  --ss-muted: #53627d;
  --ss-line: #dbe4f1;
  --ss-surface: #ffffff;
  --ss-surface-blue: #f2f7ff;
  --ss-surface-red: #fff2f4;
  --ss-surface-green: #effbf5;
  --ss-radius-sm: 14px;
  --ss-radius-md: 22px;
  --ss-radius-lg: 32px;
  --ss-shadow-card: 0 16px 44px rgb(3 20 58 / 0.10);
  --ss-shadow-lift: 0 22px 60px rgb(3 20 58 / 0.18);
  --ss-motion-fast: 160ms;
  --ss-motion-base: 280ms;
  --ss-motion-slow: 760ms;
}
```

### Key UI Treatments
- **Header:** Sticky top nav with subtle backdrop blur, high-contrast links with hover underline animations, and a prominent "Masuk" button.
- **Ribbon Accent:** CSS linear-gradient flag stripe (`#ff2445`, `#ffffff`, `#1777f2`, `#ffd12a`) adorning top borders and hero badges.
- **Card Hovers:** `-3px` transform elevation with shadow shift (`--ss-shadow-lift`) and icon nudge.
- **Buttons:** Tactile feedback on press (`transform: scale(0.98)`), accessible `:focus-visible` ring with `2px` offset.
- **Persistent Mobile Dock:** Fixed 4-item bottom navigation (`Laman Utama`, `Modul`, `Alat`, `Akaun`) visible exclusively below 768px.

---

## 4. Architectural & Design Decisions

1. **Semantic HTML & CSS Modules:**
   - Every page and component utilizes dedicated `.module.css` files, preventing global style pollution and avoiding heavyweight CSS-in-JS runtimes.
   - Zero reliance on external UI kits (no MUI/Chakra/Shadcn bloat) ensures instant hydration and tight adherence to the mockup specs.

2. **GSAP ScrollTrigger Progressive Enhancement:**
   - Animations use `@gsap/react` with safe defaults (`gsap.from` with `start: "top 95%"`). If JavaScript or GSAP is disabled, elements remain fully visible.
   - Screen-readers receive unpolluted text via `aria-hidden` attributes on split-word spans paired with an accessible visually-hidden root label.

3. **React 18 `createPortal` for Modals & Mobile Drawer:**
   - Because `SiteHeader` uses `backdrop-filter: blur(...)`, CSS specifications dictate that it establishes a new containing block for `fixed` children.
   - Moving `MobileMenuSheet` and the Checkout Modal into `createPortal(..., document.body)` guarantees they render above all z-index and stacking contexts across all modern browsers.

4. **Resilient Clipboard API Implementation:**
   - `CopyTemplate.tsx` implements modern `navigator.clipboard.writeText` with a graceful fallback to `document.execCommand("copy")` inside a hidden textarea. This guarantees clipboard copying works reliably across headless CI environments, older browsers, and non-HTTPS local development.

5. **Local Storage Adapter with Seed Fallback:**
   - `src/lib/storage.ts` provides typed, crash-resilient access to prototype state (e.g., active user modules, completed steps) while ensuring server-side rendering never triggers hydration mismatches.

---

## 5. Verification Checklist & Test Results

- [x] `npm run typecheck` (`tsc --noEmit`): **0 errors**
- [x] `npm run lint` (`next lint`): **0 errors, 0 warnings**
- [x] `npm run build` (`next build`): **Successful production build (all routes statically optimized or dynamic)**
- [x] `npm run test:e2e` (`playwright test`): **29 tests passed**
  - Desktop viewports (1440x1024): All routes render cleanly without horizontal overflow.
  - Mobile viewports (390x844): Touch targets are >= 44px, bottom nav dock persists, menus open smoothly.
  - Interactive flows: Mega-menu opens on hover/focus, category filter updates cards, tool search filters instantaneously, template copy triggers confirmation badge, checkout modal opens and closes via escape key or overlay click.
