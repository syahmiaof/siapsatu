# Astra execution brief — SiapSatu reference-parity pass 2

**Workspace:** `C:\Users\USER\Desktop\academy-syahmi`  
**Your role:** senior frontend engineer, art-direction implementer and visual QA owner.  
**Mission:** edit the *existing local codebase* until the approved Malaysia Utility mockups and rendered UI are as visually close as the available truthful content and assets permit. This is an implementation task, not a planning or prompt-writing task. Do not report completion after a green build or after calling a screen “close”.

The founder has inspected the Top 5 result and **does not accept its current visual fidelity**. The independent audit at `docs/INDEPENDENT_VISUAL_AUDIT_2026-10-16.md` is your starting defect list. Inspect the images yourself. In particular, compare `mockups/homepage-theme-03-malaysia-utility.png` with `artifacts/visual-qa/top5/independent-review/1440-home-fold.png`: the frame/layout is similar, but the art direction and community strip are visibly different. That is the main job in this pass.

## Read and protect before editing

Read `DESIGN.md`, `PRODUCT.md`, `docs/ASSET_SOURCES.md`, `docs/INDEPENDENT_VISUAL_AUDIT_2026-10-16.md`, `docs/VISUAL_QA.md`, and the current route/component source. Record `git status` first. The worktree already contains uncommitted Top 5 code, historical captures and unrelated deleted/duplicate mockups. **Build on the current Top 5 work. Do not reset, clean, restore, overwrite or silently commit unrelated user files.** Keep the original SiapSatu logo and supplied n8n/Hermes assets intact. Do not edit reference PNGs.

Approved references for this pass:

1. `mockups/homepage-theme-03-malaysia-utility.png` — top priority, desktop visual world.
2. `mockups/ui-01-tools-directory-desktop.png` and `mockups/ui-10-tools-directory-mobile-v2.png`.
3. `mockups/modules-catalog-desktop.png`, `mockups/modules-catalog-mobile.png`, `mockups/modules-mega-menu-desktop.png`.
4. `mockups/ui-06-lesson-reader-n8n.png` for desktop reader grammar and `mockups/lesson-mobile-siapsatu-v2.png` for mobile reader grammar.

Do not use rejected theme 02, old Academy Syahmi concepts or the unrelated sambal mockups. `artifacts/visual-qa/top5/comparisons/` and `independent-review/` are evidence of current defects, **not** new design references.

## Fix these five visual gaps, in this order

### 1. Homepage hero: reconstruct the actual composition

Touch `src/app/page.tsx`, `src/app/page.module.css`, `src/components/brand/BrandScene.tsx`/`.module.css` and new clean art assets as needed. The current `BrandScene` has a geometric SVG ribbon, a simple skyline and generated trio. Do not merely nudge margins or scale this same scene and call it fixed.

At 1440×1024, match the reference's visual *silhouette*: white left copy field; people integrated into a flowing dark-navy Malaysian ribbon on the right; clear yellow crescent/star; upward green arrow; yellow KL city circle; visible Petronas/Menara KL impression; handwritten “Ilmu hari ini, hasil esok.” note; small orange sketch accents; yellow practical-module note. Characters need comparable size, overlap, pose direction and bottom crop. Add the SiapSatu device marks as separate crisp graphics where appropriate. The reference feels illustrated and layered, not like a flag clipped into a diagonal trapezoid.

Keep title, subtitle, CTA and audience pills as semantic DOM; they must remain selectable and accessible. Preserve actual logo art. Preserve the already-good overall first-fold structure: featured-card row begins approximately where it does now (current first-card top around y=559 at 1440), so do not create another tall hero. The hero/title/card boxes should align closely to the normalized reference; prioritize shape and asset fidelity where geometry is already close.

If a clean, exact character source is absent, make a new transparent illustration or carefully isolate/rebuild only the artwork from the reference. It must contain **no baked-in navbar, headings, buttons, prices or UI**. You may use image generation/editing, vector tracing or careful masking if available; then inspect transparency and edges at 100% and in browser. A rectangular crop of the entire mockup is prohibited. Save a reproducible asset/source trail in `docs/ASSET_SOURCES.md`.

### 2. Homepage cards and community: match their authored detail

The three featured cards currently have the right colours/positions but flatter artwork and different tool marks. Match the reference's icon size, white logo tiles, background motifs, tag spacing, price baseline and arrow placement. Use a sourced/verified multicolour Gemini mark if obtainable; otherwise keep an honest neutral mark and record the exact limitation. Do not invent an “official” logo.

`src/components/community/CommunityNotice.tsx`/`.module.css`: replace the current repeated hero-trio crop with a **distinct discussion scene**: learners interacting around a laptop, conversation bubbles, flag ribbon, and the same energetic balance as the reference. The right WhatsApp panel should have comparable weight, hierarchy and avatar treatment. Keep copy truthful: community invitation/WhatsApp access is not live, and no fake “ratusan learners”, fabricated avatars presented as real people, buyer counts or reviews. Make the visual equivalent without false social proof. This strip is a key reason the current homepage feels copy-pasted.

### 3. Tools directory: restore reference's brand energy and card rhythm

Touch `/tools` and `src/components/tools/ToolCard*`, `ToolLogoTile*`, `BrandScene` directory variant. At 1440 and 390, compare the reference hero ribbon/arrow/caption, headline weight and wraps, search/filter position, card width/height, logo-tile size, category pills, arrow controls and vertical rhythm. The mobile heading/illustration must not visually collide. Preserve the new useful order (Gemini, ChatGPT, n8n, Hermes, Codex, GitHub first) and the Top 5 fix: zero-module tools are truthful “akan datang” cards, not dead links. Do not copy invented reference module counts. Never use a fabricated brand mark; acquire verified source art, or document a neutral text treatment. If the supplied Hermes mark is too low-resolution, improve presentation without altering the protected original file.

### 4. Module catalog: card art and hierarchy, with real products only

Touch `/modules`, `src/components/modules/ModuleCard*` and supporting art. Match the desktop hero fill, first-fold spacing and compact six-card row, then mobile featured-card framing, card artwork/portrait scale, logo tiles, price and tags. Current mobile cards use tightly cropped faces from the trio; the reference has separate half-body illustrations and stronger card-specific scenes. Create distinct clean portraits/illustrations or a reusable art system that achieves that composition. Preserve the outcome-led titles and canonical tool names. The mockup's fourth featured product is not in the real featured catalog: do not create a fake product merely to fill the picture. If a fourth real existing module genuinely fits, curate it with real data; otherwise document this one content-count difference.

### 5. Reader: improve visual grammar without falsifying lesson content

Touch `/learn/n8n-google-sheets/2` and `/learn/n8n-google-sheets/3` with `src/app/learn/[slug]/[step]/reader.module.css` and related components. The desktop n8n reference shows step **3**, while the mobile reference is a **Gemini slide** lesson. Never relabel actual step 2 as step 3 or paste the unrelated Gemini content into n8n. Match the reference's editorial reading hierarchy, step rail, prominent workflow diagram, result callout, tool link, template and task panels. On 390×844/360×800, ensure the workflow appears at a sensible reading point and every template/action remains reachable above the fixed footer. Keep text/code selectable DOM, clipboard feedback, next/back, progress persistence, keyboard access and reduced-motion behavior working.

## Design and engineering standard

- Keep Next.js App Router, React, TypeScript, CSS Modules and scoped GSAP. Use `DESIGN.md` tokens and existing semantic components. If `BrandScene` needs distinct hero/community/catalog variants, split it cleanly instead of adding fragile CSS overrides to a universal component.
- Preserve functional search/filter URL state, hover/focus/active states, tab order, touch targets, responsive layout and animations. Avoid layout shifts, offscreen invisible words after reverse scroll, horizontal overflow and sticky-dock overlap. Test normal and reduced motion.
- Use real content and real module counts/prices. Sign-in, checkout, entitlement, community and WhatsApp automation remain demos; do not imply they are live. A polished mockup must not become deceptive product UI.
- No placeholder `TODO`, screenshot-as-background, baked-in text, unverified “official” logo, unlicensed borrowed asset, or arbitrary giant z-index. Optimize new raster art (responsive sizes, lazy-load below fold, stable dimensions) so visual fidelity does not destroy loading performance.
- Do not deploy or push during this local visual pass. The existing live domain can lag the local result. Show the founder a reviewable result first.

## Verification: this is the completion gate

1. Capture **fresh baseline** locally. Do not reuse old screenshots as a claim about current code. Capture 1440×1024, 768×1024, 390×844 and 360×800. Use a settled-font/image state and reduced motion for geometry, then test normal motion separately.
2. Make a comparison table for every target: reference, baseline, desired edit. Normalize each reference to the matching CSS width; remove mobile device status-bar pixels when appropriate and disclose the crop. Compare first fold separately from full page. Save labelled side-by-side and 50% overlays to a **new** `artifacts/visual-qa/parity-v2/` folder; preserve `top5/` unchanged.
3. Implement homepage hero/community first. Render, inspect and resolve every visible medium/high actionable delta **before** moving to the next target. Repeat comparison after Tools, catalog and reader. Do not spend a whole pass chasing 2px details while major illustration/composition gaps remain.
4. Objective anchor check: title/CTA/first-card positions and size should be within roughly **5%** of the normalized reference where content matches. More importantly, an independent side-by-side view should show the same visual silhouette, art layering, card density and focal order. List any intentional exceptions (real product count, truthful community copy, different reader lesson). Numerical pixel diff is supporting evidence only; it cannot validate different illustration subjects.
5. Run `npm run typecheck`, `npm run lint`, `npm run test:e2e`, `npm run build`. Test Home→catalog→module, Tools available/upcoming states, reader next/back/copy/progress, desktop mega menu, mobile dock, keyboard focus, 360px/390px overflow, broken images and serious console errors. Add focused regression tests only where implementation changed behavior.
6. Update `docs/VISUAL_QA.md` and `docs/ASSET_SOURCES.md` with links to final screenshots/overlays and exact remaining differences. Do not erase the independent audit or edit references. A test pass proves behaviour, **not** visual equivalence.

**Do not declare “perfect”, “pixel-perfect”, “1:1” or “all match” unless the actual final captures support that statement.** Finish only when no fixable medium/high visual gap remains in the five targets. If exact illustration parity is impossible with available clean assets, complete all other repair work, identify the specific missing asset, show its effect in the comparison, and state the limitation plainly. Report files changed, screenshots, test outputs and deployment status.
