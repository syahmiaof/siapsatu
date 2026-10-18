# MASTER BUILD PROMPT — SiapSatu LMS Frontend

Paste everything below into the coding agent while its working directory is:

`C:\Users\USER\Desktop\academy-syahmi`

---

You are the lead frontend engineer and interaction designer for **SiapSatu**, a Malaysian micro-learning platform.

Your job is to build the complete responsive frontend shown in the supplied reference mockups. Do not stop after writing a plan. Inspect the references, implement every required route and interaction, run the application, capture desktop and mobile screenshots, compare them against the references, fix material differences, then run typecheck, lint, tests and the production build.

## 1. Product truth

- Brand: **SiapSatu**
- Main tagline: **Satu modul. Satu hasil.**
- Category: practical Malay-first learning for AI, tools and software.
- Base product: one standalone module for **RM10**.
- Module format: text, images, direct official links, templates, workflows, examples and a practical task.
- Do not add video to the base module experience.
- Users: Malaysian non-technical adults, business owners, students and beginner/intermediate IT learners.
- A learner should finish one concrete result, then see one logical next module.
- Never invent learner counts, sales numbers, testimonials, accreditations, guarantees or income claims.
- Read `PRODUCT.md`, `UI_PLAN.md`, `BRAND_COPY.md` and `mockups/UI_MOCKUPS_INDEX.md` before coding. These files override accidental or malformed text inside AI-generated mockups.

## 2. Visual source-of-truth hierarchy

### Primary visual authority

Use these files as the approved visual system:

1. `mockups/homepage-theme-03-malaysia-utility.png`
2. `mockups/modules-catalog-desktop.png`
3. `mockups/modules-mega-menu-desktop.png`
4. `mockups/modules-catalog-mobile.png`
5. `mockups/lesson-mobile-siapsatu-v2.png`
6. `mockups/ui-01-tools-directory-desktop.png`
7. `mockups/ui-02-tool-n8n-desktop.png`
8. `mockups/ui-03-tool-hermes-desktop.png`
9. `mockups/ui-04-learning-path-automation-v2.png`
10. `mockups/ui-05-module-detail-n8n.png`
11. `mockups/ui-06-lesson-reader-n8n.png`
12. `mockups/ui-07-library-dashboard.png`
13. `mockups/ui-08-progress-map.png`
14. `mockups/ui-09-community-hub.png`
15. `mockups/ui-10-tools-directory-mobile-v2.png`

### Approved brand assets

- Main logo: `brand/logo-concepts/siapsatu-primary-final.png`
- n8n logo reference: `brand/tool-logos/n8n-official.png`
- Hermes Agent logo reference: `brand/tool-logos/hermes-agent-official.png`

Preserve these files. Do not redraw or replace the SiapSatu logo.

### References to ignore for the SiapSatu build

- `homepage-theme-02-ai-saas.png` was rejected.
- `homepage-theme-01-editorial.png` belongs to an alternate exploration.
- `syambal-*` files are an unrelated F&B tangent.
- Files without `-v2` for screens 04 and 10 are superseded drafts.
- Temporary “Academy Syahmi” concept files are not the approved identity.

## 3. Non-negotiable visual direction

Recreate the **Malaysia Utility** world: official, friendly, highly legible and energetic.

- White and very light cool backgrounds.
- Deep Malaysian navy as the structural colour.
- Orange-red for primary CTAs and highlighted words.
- Green for completed outcomes and growth.
- Malaysian flag ribbons, crescent/star motifs and skyline shapes used as controlled brand accents.
- Bold rounded display typography, compact navigation and clean body text.
- Illustrated Malaysian learners with thick navy outlines and restrained vector shading.
- Strong borders, soft tinted panels, large rounded rectangles and clear icon containers.
- Dense enough to feel useful, but never like a generic SaaS dashboard.
- No purple AI gradients, glassmorphism soup, random blobs, neon cyberpunk, stock-dashboard templates or generic three-card landing-page filler.

The webpage must be rebuilt as semantic HTML, React components and CSS. Never use an entire reference screenshot as a page background. Decorative artwork may be extracted only when the crop contains artwork alone—never embedded headings, buttons, cards or UI text. Record every derived or sourced image in `docs/ASSET_SOURCES.md`.

## 4. Required stack

Create a production-quality application using:

- Next.js App Router
- React
- TypeScript with `strict: true`
- CSS Modules plus a global token file; do not depend on a generic component kit
- GSAP, `@gsap/react` and ScrollTrigger for coordinated motion
- `next/image` for raster assets
- Playwright for route, responsive and interaction checks
- ESLint and a dedicated `typecheck` script

Use current stable package versions compatible with each other. Do not use experimental APIs unless they are progressive enhancements with a reliable fallback.

Recommended structure:

```text
src/
  app/
  components/
    brand/
    navigation/
    motion/
    modules/
    tools/
    learning/
    community/
  data/
  lib/
  styles/
  types/
public/
  assets/
    brand/
    tools/
    illustrations/
tests/
artifacts/
  visual-qa/
docs/
```

Do not duplicate module or tool data inside page components. Create typed data records and map them into reusable components.

## 5. Design tokens

Extract final values from the references, starting from this baseline:

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

Use a self-hosted rounded display face close to the mockups for headings and a highly readable geometric sans for body text. Good starting pair: Bricolage Grotesque for display and Manrope for body. Prevent font loading from causing layout shifts.

## 6. Required routes

Build these routes with shared navigation and responsive layouts:

| Route | Reference |
|---|---|
| `/` | `homepage-theme-03-malaysia-utility.png` |
| `/modules` | desktop/mobile module catalogue references |
| `/tools` | `ui-01...` on desktop and `ui-10...-v2` on mobile |
| `/tools/n8n` | `ui-02-tool-n8n-desktop.png` |
| `/tools/hermes-agent` | `ui-03-tool-hermes-desktop.png` |
| `/paths/ai-automation` | `ui-04-learning-path-automation-v2.png` |
| `/modules/n8n-google-sheets` | `ui-05-module-detail-n8n.png` |
| `/learn/n8n-google-sheets/2` | `ui-06-lesson-reader-n8n.png` |
| `/library` | `ui-07-library-dashboard.png` |
| `/progress` | `ui-08-progress-map.png` |
| `/community` | `ui-09-community-hub.png` |
| `/login` | derive from the approved visual system; keep it concise |

The desktop `Modul` navigation item must open the mega-menu shown in `modules-mega-menu-desktop.png`. On mobile, use a proper menu sheet and persistent bottom navigation where the references show it.

## 7. Functional interactions

Implement real frontend behaviour with local typed seed data:

- Search tools and modules by name and keyword.
- Category chips filter results and expose a clear “no results” state.
- Mega-menu opens by pointer and keyboard, traps no focus, closes on Escape and outside click.
- Mobile menu opens/closes with focus management and scroll locking.
- Module cards link to real implemented routes.
- Tool pages list relevant modules and learning paths.
- Lesson sidebar tracks the active step.
- Template copy button writes to the clipboard and shows an accessible confirmation.
- External tool links open the exact official URL in a new tab with safe `rel` attributes.
- Progress controls can persist prototype state in local storage behind a typed adapter.
- “Masuk” links to `/login`.
- Purchase CTAs may show a clearly labelled checkout preview state, but must not claim a real payment or entitlement exists.
- Do not fabricate authentication, payment completion, email delivery or WhatsApp delivery.

## 8. Official tool logos

Every tool card must use a correct, locally stored brand mark.

- Use the supplied n8n and Hermes files exactly.
- Obtain official SVG assets or reputable official-brand sources for OpenAI/Codex, Gemini, Claude, Perplexity, NotebookLM, Make, Zapier, GitHub, Cursor, Vercel, Canva, Figma and Notion.
- Prefer official brand kits. When unavailable, use the matching Simple Icons SVG and record its source.
- Do not approximate logos with CSS, emoji, text glyphs or a made-up icon.
- Preserve each logo's aspect ratio and clear space.
- Save local assets under `public/assets/tools/`; do not hotlink production logos.
- Record brand name, source URL, file path and retrieval date in `docs/ASSET_SOURCES.md`.

## 9. Component requirements

At minimum, create reusable components for:

- `SiteHeader`
- `DesktopMegaMenu`
- `MobileMenuSheet`
- `MobileBottomNav`
- `AnimatedHeading`
- `RevealSection`
- `PrimaryButton`
- `ToolLogoTile`
- `ToolCard`
- `ModuleCard`
- `LearningPathCard`
- `OutcomePanel`
- `ProgressRail`
- `LessonSidebar`
- `CopyTemplate`
- `CommunityNotice`
- `EmptyState`

Components must expose typed props and semantic elements. Avoid a single giant page component and avoid abstraction layers that have only one trivial consumer.

## 10. CSS effects and micro-interactions

Every interactive item should feel authored. Effects must stay controlled and consistent.

### Navigation

- Nav links: animated underline that grows from left to right.
- Active link: persistent orange underline or tinted pill according to the reference.
- Logo: subtle `translateY(-2px)` and shadow increase on hover; no continuous bouncing.
- Mega-menu: opacity + `y: -10` + slight scale entrance, reversible on close.

### Buttons

- Primary CTA: orange-red surface, white label and arrow.
- Hover: `translateY(-3px)`, shadow lift and arrow moves 4–6px.
- Active: scale to `0.98` for tactile feedback.
- Focus-visible: 3px high-contrast ring with offset.
- Add a restrained light sweep with a pseudo-element; it runs only on hover/focus.

### Cards

- Default: visible border, coloured surface, stable height and clean hierarchy.
- Hover: `translateY(-6px)`, slight `scale(1.01)`, stronger shadow and border-colour change.
- Card arrow: rotate or translate 4px toward the destination.
- Use `overflow: clip` and pseudo-elements for subtle colour swells; do not add heavy backdrop blur.
- Touch devices must not rely on hover to reveal required content.

### Tool logos

- Each logo sits inside a consistent white or tinted tile.
- Hover/focus: logo scales to `1.07`, rotates no more than 2 degrees and gains a brand-colour halo.
- Add a subtle radial glow behind the logo using a pseudo-element.
- The halo must use opacity/transform and must not repaint a large blurred area every frame.
- Never animate a logo continuously except for a tiny hero decoration where motion conveys automation.

### Filters, chips and badges

- Animate background, text and border colour in 160–220ms.
- Selected chip receives a short spring scale from `0.96` to `1`.
- Module count updates without layout jumping.

### Progress and paths

- Animate progress lines with `scaleX` from the left.
- Step nodes enter with a short stagger.
- Completed checks draw or pop once; no confetti.

## 11. GSAP motion system

Use GSAP for coordinated entrances, route-level reveals and scroll-based section choreography. Use CSS transitions for simple hover, focus and active feedback.

### Required reusable heading motion

Create `AnimatedHeading` that renders words as accessible spans.

- Keep one readable heading for assistive technology.
- Mark decorative split-word spans `aria-hidden` or use an equivalent accessible technique.
- Initial state: `autoAlpha: 0`, `yPercent: 115`, `rotationX: -12`.
- Enter: stagger words by 0.045–0.07 seconds, duration 0.65–0.85 seconds, `power3.out`.
- Accent words may enter 0.08 seconds later and settle with a very small scale change.
- On scroll back above the section, reverse cleanly so headings have a real in/out transition.
- Do not split or animate long lesson paragraphs word-by-word.
- Do not cause cumulative layout shift; reserve final text geometry before animation.

Apply it to every hero headline and section heading across all routes.

### Hero timeline

Sequence:

1. Header and logo fade/slide in.
2. Eyebrow and headline words reveal.
3. Supporting copy and CTA rise in.
4. Audience chips/cards stagger in.
5. Hero illustration settles from `xPercent: 6`, `scale: 0.96`.
6. Decorative Malaysian ribbons/arrows get a restrained parallax response.

### Scroll reveals

- Use `ScrollTrigger.batch()` for repeated card grids.
- Use transforms and opacity only for primary reveals.
- Create triggers in document order.
- Call `ScrollTrigger.refresh()` after fonts and responsive images settle.
- Never attach ScrollTrigger to child tweens inside another timeline.
- Do not animate the pinned element itself if a section is pinned; animate a child wrapper.
- Remove all debug markers in production.

### React cleanup

- Register plugins once.
- Use `useGSAP()` scoped to a local ref.
- Ensure animations and ScrollTriggers revert on unmount and route changes.
- Avoid global selector collisions.

### Reduced motion

Use `gsap.matchMedia()` and `prefers-reduced-motion`.

- Reduced-motion mode must render all content immediately.
- Keep only colour/focus feedback and near-instant opacity changes.
- No parallax, word staggering, large translation or scroll scrubbing.

## 12. Responsive behaviour

Start with these QA targets:

- 1440 × 1024 desktop
- 1280 × 800 laptop
- 1024 × 768 tablet landscape
- 768 × 1024 tablet portrait
- 430 × 932 large phone
- 390 × 844 phone
- 360 × 800 small phone

Requirements:

- No horizontal overflow at any width.
- Desktop multi-column grids collapse intentionally, not by accidental wrapping.
- On mobile, preserve the reference's strong headline, search, filters and bottom navigation.
- Keep tap targets at least 44 × 44 CSS pixels.
- Cards do not become tiny two-column tiles when content needs one column.
- Lesson content uses a readable measure and the chapter index becomes a drawer or compact sticky control.
- Decorative flag/skyline art may crop, but core people, title, CTA and price cannot be obscured.

## 13. Accessibility and performance

- Semantic landmarks, heading order and form labels.
- Keyboard access for all controls.
- Visible focus states.
- Meaningful alt text for content images and empty alt text for decorative art.
- WCAG AA contrast for normal text and controls.
- No interaction available only through colour or hover.
- Reserve image dimensions to avoid layout shift.
- Lazy-load below-fold imagery.
- Prefer transform and opacity for animation.
- Keep desktop Lighthouse targets around Performance 90+, Accessibility 95+, Best Practices 95+ when tested locally in production mode.
- Avoid a second smooth-scroll library until native-scroll GSAP behaviour passes QA.

## 14. Data model

Create types similar to:

```ts
type ToolCategory = "ai" | "automation" | "coding" | "design" | "productivity";

interface Tool {
  slug: string;
  name: string;
  category: ToolCategory;
  logoPath: string;
  brandColor: string;
  summary: string;
  officialUrl: string;
  moduleSlugs: string[];
}

interface Module {
  slug: string;
  title: string;
  shortOutcome: string;
  priceMyr: 10;
  level: "beginner" | "intermediate";
  estimatedMinutes: number;
  toolSlugs: string[];
  tags: string[];
  prerequisites: string[];
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  body: string;
  officialLinks: { label: string; href: string }[];
  template?: string;
  task?: string;
}
```

Seed only enough truthful content to reproduce the references. Keep counts realistic and derived from the data, never hard-coded marketing theatre.

## 15. Implementation sequence

Follow this order and continue without routine approval pauses:

1. Inventory every reference and asset.
2. Read product and copy documents.
3. Write `DESIGN.md` containing the extracted tokens, typography, component grammar, illustration treatment and motion grammar.
4. Scaffold the app and shared layout.
5. Build reusable data and components.
6. Implement homepage, modules and tools discovery first.
7. Implement tool hubs and learning path.
8. Implement module detail and lesson reader.
9. Implement library, progress, community and login.
10. Add interactions and motion.
11. Run the app and verify real routes.
12. Capture desktop and mobile screenshots.
13. Compare against references and fix all high/medium visual differences in one batch.
14. Re-capture once and verify the fixes.
15. Run typecheck, lint, Playwright tests and production build.
16. Write `docs/VISUAL_QA.md` with tested routes, viewport sizes, commands, results and remaining low-severity differences.

Use this loop:

`INSPECT → RUN → RENDER → SCREENSHOT → COMPARE → FIX → QA → BUILD`

Do not declare completion from source inspection or a passing build alone.

## 16. Tests that must exist

Playwright must verify at minimum:

- All required routes return usable pages.
- No horizontal overflow at 1440px, 768px, 430px and 390px.
- Desktop mega-menu keyboard open/close.
- Mobile menu open/close and focus return.
- Tool search and category filters.
- Module links navigate correctly.
- Copy-template action works.
- Reduced-motion mode exposes all content.
- No broken local images.
- No serious browser console errors.

Also run:

```bash
npm run typecheck
npm run lint
npm run test:e2e
npm run build
```

Fix failures rather than deleting checks.

## 17. Definition of done

The build is done only when:

- All required routes are implemented.
- Desktop and mobile layouts clearly match their corresponding references.
- Supplied logo and brand assets are preserved.
- Tool logos are correct and locally stored.
- Navigation, filters, copy action and progress prototype work.
- Every hero and section heading uses the accessible GSAP in/out word animation.
- Interactive items have deliberate hover, focus and active CSS states.
- Reduced motion works.
- There is no video in the base module UI.
- There are no fabricated proof points or fake operational claims.
- Typecheck, lint, Playwright and production build pass.
- `DESIGN.md`, `docs/ASSET_SOURCES.md` and `docs/VISUAL_QA.md` exist and reflect the final implementation.
- Any remaining difference is documented honestly with severity and reason.

When reporting back, lead with what is actually implemented and tested. Include exact commands and results. Do not claim deployment, payment, authentication, email or WhatsApp automation unless those systems were separately implemented and verified.

---

End of master prompt.
