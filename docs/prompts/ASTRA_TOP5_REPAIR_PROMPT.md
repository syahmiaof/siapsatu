# Astra — SiapSatu Top 5 Repair Sprint

Working directory: `C:\Users\USER\Desktop\academy-syahmi`

You are the implementation owner for this existing Next.js 14, React 18, TypeScript, CSS Modules and GSAP app. **Implement the five repairs below in the current codebase, then prove the result with fresh browser captures and tests.** Do not stop at a plan or another prompt. The owner wants the approved Malaysia Utility mockups matched closely, with working UX and truthful product data.

Read `DESIGN.md`, `PRODUCT.md`, `docs/UI_REVIEW_2026-10-16.md`, `docs/VISUAL_QA.md`, `docs/ASSET_SOURCES.md` and the relevant page/component code before editing. Treat prior QA screenshots as historical evidence; capture a new baseline from your local app. Preserve all existing user changes, including the currently deleted/untracked mockup and QA files. Do not reset or clean the worktree. Keep the original brand logo and supplied n8n/Hermes marks unchanged.

## The five outcomes, in priority order

### 1. Remove dead ends from the Tools journey

Current verified failure: on the deployed `/tools`, clicking **Claude · 0 modul** goes to `/modules?search=Claude` and ends at “Tiada modul yang sepadan”. Inspect all tool cards, not just Claude. A tool with zero published modules must not masquerade as a link to available learning content. Implement a clear, useful state: either a real tool overview with an official verified URL and honest “modul akan datang” messaging, or a visibly non-navigating upcoming card. Choose one consistent pattern based on current architecture. Keep module counts derived from published data; never copy the mockup's invented counts. For tools with modules, clicking must lead to the correct available content. Add a focused interaction test for zero-module and available-module cards.

### 2. Bring `/tools` desktop and mobile close to the approved compositions

References: `mockups/ui-01-tools-directory-desktop.png` and **primary mobile reference** `mockups/ui-10-tools-directory-mobile-v2.png`. Compare at 1440×1024 and 390×844, normalizing reference width and judging the first fold separately from a full-page capture. Match the header/logo scale, headline width/line breaks, flag/green arrow hero shape, learner illustration crop, search/filter geometry, tool-card height, logo scale, typography, gaps and bottom dock spacing. Curate the visible order so tools with real modules, especially Gemini, ChatGPT, n8n, Hermes, Codex and GitHub, appear early on mobile. Make filtering/search preserve predictable ordering and meaningful empty states. Do not manufacture modules or use entire mockup crops as artwork. Use verified marks or documented neutral text when a mark cannot be verified.

### 3. Repair the lesson reader hierarchy and reachability

Reference: `mockups/ui-06-lesson-reader-n8n.png` for desktop and `mockups/lesson-mobile-siapsatu-v2.png` for mobile. Routes: `/learn/n8n-google-sheets/2` and, for subject/step alignment, `/learn/n8n-google-sheets/3`. The reference illustrates a later step; **do not change real step 2's content or URL merely to imitate its screenshot**. Instead match the reader grammar: one clear reader header, step rail, large workflow/lesson illustration, copyable template, task/action panel, official tool link and next-step navigation. Keep every sentence/code snippet selectable DOM text. At 390×844 and 360×800, sticky header/footer and mobile dock must not cover the last paragraph, template, checklist or CTA. Test copy success/fallback, progress persistence, next/back and reverse scrolling, keyboard focus and reduced motion.

### 4. Tighten the homepage visual match and first-fold conversion

Reference: `mockups/homepage-theme-03-malaysia-utility.png`. The current desktop structure is recognizable; focus on the remaining medium delta. Match headline/CTA geometry, illustrated trio placement, Jalur Gemilang ribbon with crescent/star, green growth arrow, KL skyline/sticky-note accents, featured-card illustration scale and community-strip composition. On mobile, keep at least the beginning of module discovery visible at a useful scroll depth; don't let decorative hero art consume the whole journey. Preserve the exact approved logo, Malay-first value proposition, RM10 offer and working CTA routes. Build text, badges, cards and controls as DOM/CSS/SVG; use clean illustration assets only. Do not fabricate community size, buyers or social proof to imitate the mockup.

### 5. Make `/modules` a clear, reference-led discovery page

References: `mockups/modules-catalog-desktop.png` and `mockups/modules-catalog-mobile.png`; include `mockups/modules-mega-menu-desktop.png` when checking the desktop Modul entry point. Match first-fold hierarchy, hero proportions, filter/search placement, featured-card size and compact-card density. Let buyers understand the concrete result they will make before the tool name. Preserve published modules/prices and functional search, filters, URL history and navigation to module detail. Do not add placeholder modules solely to fill the screenshot. If the reference has more products than the real catalog, preserve the composition with truthful available data and document the remaining content gap.

## Engineering and visual constraints

- Preserve the current stack and working routes. No generic redesign, stack migration, full-screen screenshot background, baked-in text crop, fake official logo, invented testimonial, fabricated module count or dead CTA.
- Use `DESIGN.md` for colors, type, spacing and motion. Keep restrained headline and card entrance/exit animation, hover/focus/active feedback and GSAP cleanup. `prefers-reduced-motion: reduce` must show content immediately. Prevent layout shifts or invisible content after reverse scroll/back navigation.
- Keep sign-in, checkout, community and progress clearly labelled as prototype/demo where still unimplemented. They are outside this sprint except for a regression or misleading link caused by these five repairs.
- Avoid brittle magic offsets. Use responsive layout primitives and semantic interactive elements. Maintain keyboard access, visible focus, tap targets and no horizontal overflow.
- Do not edit approved mockups to make the comparison easier. Update `docs/ASSET_SOURCES.md` for any changed asset provenance.

## Required execution and evidence

1. Record `git status`, inspect current code and make fresh local baseline screenshots for the five scopes. Preserve existing unrelated changes.
2. Implement priority 1 first, then 2–5. After each repair, view the actual rendered page at its target viewport and correct the largest remaining geometry/art mismatch.
3. Save labelled **reference vs final side-by-side and 50% overlays** under a new `artifacts/visual-qa/top5/` directory. Include first-fold captures at 1440×1024, 390×844 and 360×800; test 768×1024 too. Do not confuse full-page stitching of fixed elements with a real overlap; verify overlaps in viewport screenshots and by scrolling.
4. Make a compact route table in `docs/VISUAL_QA.md` with before issue, change, final verdict (`close` or `material delta remains`) and evidence links. Call out any unavailable original illustration or content gap honestly. Never claim pixel-perfect/1:1 from a passing test.
5. Run `npm run typecheck`, `npm run lint`, `npm run test:e2e` and `npm run build` after the final edit. Add only meaningful tests for the changed journey. Verify no serious console errors, broken images or horizontal overflow. Do not claim an external/live test unless you actually run it.
6. Finish with code-change summary, screenshot links, exact command results and residual deltas. The five outcomes above must be implemented before reporting completion. Do not push or deploy as a side effect of this local repair; leave a reviewable result.

Success means the buyer can move from Home or Tools to a real module without a dead end, the Tools and catalog first folds visibly resemble the chosen mockups on desktop/mobile, the reader is comfortable and reachable, and the QA report shows the actual remaining differences.
