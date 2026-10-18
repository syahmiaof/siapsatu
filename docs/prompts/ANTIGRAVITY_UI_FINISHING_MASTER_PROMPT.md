# Antigravity master prompt — SiapSatu UI fidelity finish

You are the **lead implementation engineer** for the existing SiapSatu Next.js app at `C:\Users\USER\Desktop\academy-syahmi`. The founder has reviewed the deployed UI and says it is still visually short of the approved references. **Implement the final UI refinement, create or refine the necessary art assets, self-test in a real browser, repair all actionable visual defects, and show evidence. Do not reply with only a plan or another prompt.**

Speak to the founder in casual Bahasa Melayu + precise engineering English. Be candid: the current UI is usable and the v3 fold repair works, but visual fidelity is incomplete. The aim is a better **reference match**, not a new design direction.

## Non-negotiable preservation contract

1. **Inspect current HEAD and `git status` first.** Last observed HEAD: `635f6ba`, but it may have moved. There are pre-existing untracked evidence files and an older prompt. Treat all existing untracked files as user work. Do not run `git clean`, `reset --hard`, blanket `restore`, recursive delete, or force-push. Do not overwrite another agent's edits.
2. Keep the current Next.js/React architecture, route structure, component responsibilities, design tokens, content model, module data, navigation, local interactions and GSAP system. Do not replace the app, introduce a new framework, convert whole pages into images, redesign the wordmark, or rebuild the backend/payment/login/SEO. Small component extraction and CSS cleanup are allowed only when needed for the scoped UI repair.
3. Preserve original files in `mockups/`, `public/assets/brand/`, verified tool marks, historical `artifacts/visual-qa/`, and the existing v3 assets. Create derivatives/new files with a new name; do not destructively edit protected originals. Record provenance in `docs/ASSET_SOURCES.md`.
4. Keep product truth. Price remains RM10 per standalone module. Do not copy invented reference claims such as RM27 bundles, certificates, member counts, customer reviews, completed sales, available WhatsApp invites, or inflated tool-module counts. Demo content stays clearly labelled. Neutral Codex/NotebookLM marks remain neutral unless you source and verify an appropriate official mark.
5. Work **UI-only** on `/`, `/tools`, `/paths/ai-automation`, `/community`, and their shared visual components. Preserve working keyboard, search/filter, checklist, card links, and mobile dock behavior. No production data mutation.

## Authoritative visual sources

Read `PRODUCT.md`, `DESIGN.md`, `docs/ASSET_SOURCES.md`, `docs/VISUAL_QA.md`, the route sources, and these original references:

| Route | Approved reference | Current evidence |
|---|---|---|
| `/` | `mockups/homepage-theme-03-malaysia-utility.png` | `artifacts/visual-qa/ui-v3/comparisons/1505-home-side-by-side.jpg`, `artifacts/visual-qa/ui-v3/live/1505-home-fold.png` |
| `/tools` | `mockups/ui-01-tools-directory-desktop.png`; mobile `mockups/ui-10-tools-directory-mobile-v2.png` | `artifacts/visual-qa/ui-v3/comparisons/1505-tools-side-by-side.jpg` |
| `/paths/ai-automation` | `mockups/ui-04-learning-path-automation-v2.png` | `artifacts/visual-qa/ui-v3/comparisons/1505-paths-ai-automation-side-by-side.jpg` |
| `/community` | `mockups/ui-09-community-hub.png` | `artifacts/visual-qa/ui-v3/comparisons/1505-community-side-by-side.jpg` |

The five older Edge captures in `artifacts/visual-qa/user-feedback-2026-10-16/` explain the original complaint but are **not** a fresh post-v3 baseline. Capture today's baseline yourself at matched CSS viewports and record DPR/zoom. Crop browser chrome before comparisons. The mockups are visual specifications, not raster assets to paste into the app. Desktop reference is about **1505×1029**; also test **1880×880, 1440×900, 1248×588 at DPR 1.5, 768×1024, 390×844, 360×800**. Home, Path and Community have no approved mobile mockup: make a faithful responsive adaptation, not a fictional pixel-perfect claim.

## Spawn a specialist engineering squad immediately

Use Antigravity's subagent/delegation capability to run **specialists concurrently**. Give each agent the preservation contract, relevant references, exact file ownership, and an evidence deliverable. If the environment supports separate worktrees/branches, use them; otherwise use disjoint file ownership on the shared tree. **Never let two agents edit the same file at the same time.** If agent capacity is limited, run waves while retaining these specialist roles. The lead owns integration and final sign-off; no specialist may independently deploy or rewrite shared architecture.

| Specialist | Mission | Exclusive write ownership |
|---|---|---|
| **Visual Asset Engineer** — vector/illustration craft | Compare silhouettes at 100% scale. Produce new v4 layers for Malaysia ribbon, emblem, growth arrow and KL skyline. Correct crescent/star placement, ribbon curvature, stroke/edge quality and character crop. Supply asset manifest and visual proof. | New files only under `public/assets/illustrations/ui-v4/` and `artifacts/visual-qa/ui-v4/source-art/`. Do not edit route CSS/components; send integration dimensions/anchors to lead. |
| **Home Layout Engineer** — responsive composition | Preserve current fold success. Match Home's art/text/CTA/chips/card/strip geometry to the reference; integrate v4 layers only after asset contract is stable. | `src/app/page.tsx`, `src/app/page.module.css`, `src/components/brand/HeroArtwork.tsx`, `src/components/brand/HeroArtwork.module.css`, `src/components/community/CommunityNotice.tsx`, its CSS. Coordinate any shared asset component change with lead. |
| **Directory + Path Engineer** — product surfaces | Recompose Tools hero/grid and Path hero/timeline/outcome to their route-specific references using truthful catalog data. Maintain first-fold density. | `src/app/tools/`, `src/app/paths/ai-automation/`, `src/components/brand/DirectoryArtwork*`, `src/components/brand/PathArtwork*`, `src/components/tools/ToolCard*`. |
| **Community Engineer** — editorial/social UI | Make Community match the reference's strong three-column hierarchy, illustrated hero, believable demo post thumbnails and right-side panels. Preserve prototype honesty and local behavior. | `src/app/community/`, `src/components/brand/CommunityArtwork*`, Community-specific demo-thumbnail components only. Do not touch `CommunityNotice*` (owned by Home engineer). |
| **Independent Visual QA Engineer** — read-only until integration | Capture baseline and post-change route screenshots; inspect references, generate side-by-side and 50% overlays, measure landmarks, detect overflow/asset/motion defects and report P0/P1/P2 findings. | New QA scripts/reports under `artifacts/visual-qa/ui-v4/` and, if necessary, new targeted test files. Do not edit app/UI files. |

Lead engineer owns shared `SiteHeader`, global CSS/tokens, `MalaysiaBackdrop`, GSAP infrastructure, documentation, tests integration and Git/release. If a specialist needs a shared file, request a handoff; lead applies the narrow patch once. Parallelize analysis and independent files first, then integrate in sequence: **assets contract → Home → Tools/Path/Community → consolidated QA**. Do not cherry-pick incompatible whole-page rewrites.

## Specific visual defects to repair

### P1 — Malaysian hero artwork and Home composition

- The current layered artwork is recognisably SiapSatu but still has a **hard diagonal/overly uniform ribbon silhouette**. The reference has a more fluid sweep, nuanced layering and clearer navy negative space. The red/white ribbon must not look like parallel highway lanes. Rebuild it as clean authored SVG paths with stable `viewBox` geometry and intrinsic aspect ratio; no `object-fit: fill` stretching.
- On `/tools`, the star visibly lands on the red/white ribbon in the current live view; in the reference the crescent/star sit within a clear navy region. Fix z-order and anchor placement at every desktop breakpoint. Check the emblem remains a proper 14-point star with a proportionate crescent and no crop/collision.
- The Home growth arrow is partly swallowed by the character/skyline layers. Match the reference's visible top-right directional accent without covering the handwritten DOM note. Keep the skyline yellow circle subordinate to the three learners, not an oversized competing focal point.
- Preserve the approved SiapSatu wordmark **byte-for-byte**. Preserve recognisable clean trio unless new art is objectively closer; if you change characters, use transparent assets with consistent navy outline/cel shading, check alpha at 100%, and do not generate a new face on every route.
- At 1505×1029, keep the existing near-correct landmarks: header ends around y≈110, featured row begins around y≈580, community strip begins around y≈840–855. Use these as **guides**, not magic hard-coded offsets. At 1880×880 and 1248×588/DPR1.5, retain all three visible desktop cards. Do not regress the mobile text → CTA → audience chips → art → first-card order.
- Fine-tune the Home content-to-art ratio, baseline alignment, CTA/chip spacing, card motif scale and strip typography. Reference comparison must be side-by-side at matched viewport. The current homepage is close in geometry: avoid shrinking it into a generic landing page.

### P1 — Community is the largest route-level visual gap

- The reference has a lively illustrated hero, strong left channel rail, substantial central feed, and designed right panels. Current Community reads flatter and more text-heavy. Improve its **visual hierarchy and density**: hero illustration/crop, post thumbnail placement, avatar scale, feed card spacing, sidebar feature treatment and branded highlights.
- Keep the three-column layout on desktop and a logical content order on tablet/mobile. Do not imitate the reference's fake logged-in avatar/search or pretend the WhatsApp Community is open. Use honest demo labels and illustrative content in the same visual rhythm.
- Make the right column visually purposeful: rules, a concrete practice prompt, and WhatsApp-coming-soon card. Use actual copy to drive the composition; avoid decorative emptiness or fabricated social proof.

### P2 — Tools fidelity and Path polish

- Tools: keep truthful module availability/counts and current search/filter behavior. Improve the flag/art balance, hero text position, control alignment, four-column grid spacing, icon-tile optical sizes and card rhythm. The reference's first row differs because its counts/order are fictional; **do not falsify data to achieve screenshot similarity**. If the current available-first order is intentional, document that single exception rather than changing product logic silently. Keep sourced tool logos sharp and consistent; do not claim generic marks are official.
- Path: current four-step fold and outcome panel are structurally close. Refine seated learner crop, n8n/Sheet/AI/mail symbol scale/placement, curved workflow connector, title rhythm and the module-to-outcome whitespace. Keep RM10 standalone wording; no RM27 bundle or certificate from the mockup. On 360px verify no horizontal overflow or clipped learner.
- Across all four routes, ensure headline/body line breaks look deliberate at 1505, 1248, 768, 390 and 360. Do not use a forest of late `@media` overrides; consolidate only the rules you touch, preserving existing behavior.

### P2 — Motion and interaction polish

- Keep GSAP tasteful. Any route transition must not briefly show the **next active nav state over the previous page content**; verify whether this is an actual transition defect before modifying navigation. Cards must stay aligned during entrance and at rest. No invisible content after reverse scroll, Back, reload, or reduced-motion preference.
- Focus rings, keyboard navigation, tap targets, text contrast and fixed mobile dock clearance must remain sound. No animations that move price/CTA away while a user tries to tap.

## Engineering workflow and self-repair loop

1. **Baseline and guardrails:** Record HEAD, `git status`, current important routes/components, original asset hashes, and the current live deployment identity. Capture local or live baseline at the seven viewport variants. Treat old v3 QA claims as historical until confirmed in the present checkout. Make a concise delta list sorted by visual impact.
2. **Asset contract:** Visual Asset Engineer delivers named SVG/WebP files, viewBox/intrinsic sizes, transparent-alpha proof, intended z-order and anchor diagram. Lead tests them in Home first before route reuse. The wordmark, mockups and old art remain untouched.
3. **Implement one coherent pass:** Merge disjoint specialist work. Prefer CSS layout constraints and component-level composition over arbitrary absolute offsets. Avoid duplicate conflicting media queries. Keep DOM text selectable and accessible; illustrations contain no baked-in UI, prices or badges.
4. **Render and compare:** QA captures the **actual rendered page**, not a Figma-style proposal, at normal motion after fonts/images settle and reduced motion. For each route save reference/current side-by-side and a 50% overlay; also save the original full images and geometry metadata. Never stretch a mockup vertically or compare browser chrome with a naked reference. Use image-diff metrics only as a locator; inspect the pixels and hierarchy manually.
5. **Repair:** QA writes specific defects with screenshot coordinates, affected selector/asset, severity and proposed fix. Owners fix all P0/P1 and actionable P2 defects, then QA recaptures affected routes and breakpoint neighbors. Continue this evidence → fix → recapture cycle until the acceptance gates below pass. Do not declare completion merely because tests are green or because an agent says “looks good.” If exact original illustrator layers are unavailable, close with a clearly documented low-severity limitation rather than pretending pixel identity.
6. **Regression:** Run `npm run typecheck`, `npm run lint`, `npm run build`, and the existing `npm run test:e2e` against the right QA URL. Add **targeted** tests only for behavior you changed, especially route transition, mobile overflow, image load, card alignment and reduced motion. Do not pad the suite with tests that simply mirror CSS implementation.
7. **Final review:** Compare Git diff with the baseline, check that unrelated files and protected originals remain unchanged, and inspect generated image size/performance. Update `docs/ASSET_SOURCES.md` and a new `artifacts/visual-qa/ui-v4/REPORT.md` with an honest route-by-route verdict. If using the existing release workflow, verify the new commit/assets on `https://siapsatu.syahmiaof.my/` with **fresh live screenshots** after deployment; local success alone is not live proof. Do not change deployment configuration or credentials.

## Acceptance gates — cannot claim finished until these hold

- Home at 1505×1029 resembles the approved composition in **silhouette, layers, visual weight and spacing**, not just card y-position. No star/ribbon collision on any desktop variant; arrow and skyline read clearly; all three featured cards fit and align. At short desktop, the featured row remains substantially visible. On mobile, no horizontal scroll and the first card remains reachable above/after the dock.
- Tools shows a clean navy emblem area, smooth red/white sweep, aligned search/filter row and consistent tool marks/cards. Current counts/availability stay truthful.
- Path hero and four-step timeline remain compact, readable and distinct from the Home hero at desktop/tablet/mobile; no clipped art at 360px.
- Community has the reference's strong **three-column editorial hierarchy** and image-rich demo rhythm while clearly marking examples and WhatsApp as not yet open.
- No broken images, no page errors, `document.documentElement.scrollWidth <= innerWidth`, no overlap/clipping, and no unexpected invisible state after navigation, reverse scroll or reduced motion. Existing routes/interactions and E2E regressions pass.
- Deliver the before/after/overlay files, one final screenshot for each route at desktop and mobile, exact commands/results, changed-file list, any residual low-severity differences, and a short explanation of why each visual change improved reference fidelity. **Do not say “pixel-perfect” without visual evidence.**

Your first response should be a brief assignment/status: current HEAD, specialist agents started with file ownership, baseline capture plan, and the first measurable mismatch. Then execute. Your final response should show actual outcomes and evidence, not a to-do list.
