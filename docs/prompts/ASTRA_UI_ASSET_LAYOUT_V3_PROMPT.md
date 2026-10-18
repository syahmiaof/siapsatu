# Astra — UI / asset / layout repair v3 (current live screenshots)

Working directory: `C:\Users\USER\Desktop\academy-syahmi`.

You own the implementation and visual QA of SiapSatu's **current** UI. The founder supplied five fresh screenshots of the deployed site and says the Malaysia artwork and layout still do not match the approved mockups. **Edit the app, create/refine the actual assets, render it, compare it, and fix the remaining discrepancies.** Do not respond with only a plan, CSS advice, a new prompt, or “close enough.” This v3 brief supersedes the earlier Astra Top 5 and parity-v2 prompts for the surfaces below. Start at current HEAD (observed `b079d3c`); inspect HEAD/status again before editing because work may have moved.

## Source of truth and evidence

Read `DESIGN.md`, `PRODUCT.md`, `docs/ASSET_SOURCES.md`, relevant route CSS/components, and the **five user captures** copied without modification to `artifacts/visual-qa/user-feedback-2026-10-16/`:

| User screenshot | Live route | Approved design reference |
|---|---|---|
| `live-home-first-fold.png` | `/` | `mockups/homepage-theme-03-malaysia-utility.png` |
| `live-home-cards-community.png` | `/` scrolled | same homepage reference |
| `live-tools.png` | `/tools` | `mockups/ui-01-tools-directory-desktop.png`; mobile: `mockups/ui-10-tools-directory-mobile-v2.png` |
| `live-learning-path.png` | `/paths/ai-automation` | `mockups/ui-04-learning-path-automation-v2.png` |
| `live-community.png` | `/community` | `mockups/ui-09-community-hub.png` |

The user screenshots include **Edge browser chrome and Windows taskbar**. Crop those for visual comparison; measure layout in CSS viewport coordinates using Playwright/DevTools. Do not normalize only by image width and ignore the effective browser height. The user is viewing a wide, relatively short content viewport (roughly 1880×880 CSS-pixel *shape*; measure actual viewport/zoom). Also compare at the reference's 1505×1029 shape, 1440×900, 768×1024, 390×844 and 360×800. Save the exact `innerWidth`, `innerHeight`, DPR/zoom assumptions and screenshot metadata. No source mockup or user screenshot may be modified in place.

## Diagnosis that the screenshots and code already establish

1. **Homepage fold is blown up on wide/short desktop.** In `src/app/page.module.css`, `.heroHeadline` uses `clamp(64px, 6.7vw, 96px)`, `.subtitle` has `white-space: nowrap`, `.ctaContainer > a` reaches 30px/74px, and `.heroRight` uses `inset: -112px ... 16px 42%`. These width-driven sizes and offsets make the hero dominate the 880px-tall viewport; the featured cards barely enter screenshot 1. The 1505×1029 mockup shows all three cards and the beginning of the community strip. Solve this with a robust responsive layout that considers **height and available space**, not one more hard-coded offset at 1920px.
2. **Malaysia visual is recognisable but proportionally wrong.** The live crescent/star is too large relative to the people and intersects the ribbon differently; the red-white bands, arrow and skyline occupy different silhouettes. `src/components/brand/MalaysiaBackdrop.tsx` draws all routes from one 900×580 SVG with `preserveAspectRatio="xMidYMid slice"`, so the artwork crops differently in each box. `HeroArtwork.tsx` overlays characters, laptop marks, handwritten note and yellow card; their placement needs route-specific art direction, not just scaling the whole scene.
3. **Featured row and community strip lose their alignment and rhythm in screenshot 2.** Check whether cards are actually misaligned at rest or captured mid-GSAP stagger. Three featured cards should share one top edge and height, and the next strip must not overlap them during animation or after settling. The community strip should read as one designed scene rather than a generic banner plus a large empty right panel.
4. **Tools, Learning Path and Community still borrow generic flag/trio language without matching their unique references.** The Tools hero/grid should match its reference's first-fold density; the Learning Path reference has a seated laptop learner with floating n8n/Sheets/AI/mail symbols and a compact timeline; Community has a conversational scene and rich demo post thumbnails. Current live screenshots do not show those compositions.

## Implementation targets (UI and assets only)

### A. Rebuild homepage first-fold geometry

Edit `src/app/page.tsx`, `src/app/page.module.css`, `src/components/brand/HeroArtwork.tsx`/`.module.css`, `src/components/brand/MalaysiaBackdrop.tsx`, header sizing if needed, and the featured-card CSS. Establish layout contracts rather than independent magic numbers:

- At 1505×1029, use the mockup's visual landmarks as guides: header ends near y≈110; featured cards start near y≈580; community strip starts near y≈855. Compare normalized coordinates, not the browser frame. Text/art proportions, CTA, audience chips and three cards should follow the same focal order.
- At the user's wide/short viewport, all three featured cards should be **substantially visible without scrolling**; target their top edge no lower than ~560 CSS px in an 880px-high viewport, subject to measuring the actual page header. Keep a visible start of the next section if the composition allows. Do not shrink text until illegible; use sensible max-width, `clamp()` that also responds to height, balanced line breaks and a bounded hero height.
- At 768px, prevent headline/subtitle overflow and illustration collision. At 390/360px, preserve a clear text→CTA→chips→art→first-card sequence, safe bottom-dock spacing and no horizontal scroll.
- At rest, all three card tops/bottoms align within a few CSS pixels; cards, arrow buttons and tag rows never overlap the community strip. During GSAP entrance, keep movement subtle enough that the grid does not look broken in a normal screenshot.

### B. Re-author the Malaysian artwork as separate, scalable layers

Preserve the **approved SiapSatu wordmark** in `brand/`; the issue is the Malaysian **flag/emblem/hero scene**, not permission to redesign the brand logo. Keep the exact clean character illustrations if they genuinely fit; re-create only the parts that visibly do not. Use the existing source-art manifest and new source files under a v3 asset directory. Deliver distinct layers for: flowing navy field, continuous red/white ribbon, correctly proportioned crescent and 14-point star, green growth arrow, KL skyline in yellow circle, learner trio, device marks, handwritten note and yellow practical-module note. The crescent/star must retain its own aspect ratio and clear negative space; it must not swell or be cut by a responsive crop. Reference silhouette and layering matter more than matching one RGB value.

Use SVG for crisp geometric artwork; use transparent PNG/WebP for people. If the current generated people have the wrong pose/edges, use image generation or manual illustration work to improve them, then inspect transparent alpha on a checkerboard and at 100% zoom. Never paste the full mockup as a page background or bake navbar, text, buttons or prices into an asset. Keep semantic text in DOM. Export responsive image sizes with stable intrinsic dimensions and update `docs/ASSET_SOURCES.md` with source/prompt/licence/provenance. Make scene variants for Home, Tools and Path instead of distorting a single all-purpose backdrop.

### C. Match homepage cards and community strip

Use `mockups/homepage-theme-03-malaysia-utility.png` to match feature-card height/aspect, icon tiles, motif scale, internal padding, price baseline and arrows. Screenshot 2 shows the card row sitting unevenly above the community strip; fix its actual resting geometry and motion. In `CommunityNotice`, preserve the newer distinct discussion illustration, but adjust crop, bubbles, ribbon, text placement, WhatsApp tile and panel widths to the reference. Keep honest copy: no fabricated “ratusan learners”, testimonials, live WhatsApp link or real avatars if they are only prototype visuals.

### D. Give Tools, Path and Community their own reference-led layouts

- `/tools`: edit `src/app/tools/tools.module.css`, `DirectoryArtwork*`, `ToolCard*` and any route art. The first tool row should appear at the reference's depth with a strong full-width flag/arrow hero; controls should not balloon on wide displays. Verify marks from source assets; retain truthful counts and the zero-module “akan datang” behavior. Match mobile two-column card size and first six tool order.
- `/paths/ai-automation`: edit `src/app/paths/ai-automation/page.tsx`, `path.module.css` and a **specific path illustration**. Match the reference's compact hero, learner at laptop and floating workflow/tool symbols. Bring the four colored steps and outcome panel up into the first fold at the 1505×1029 reference viewport. Do **not** add unsupported RM27 bundle, certificate or completion claim from the mockup.
- `/community`: edit `src/app/community/page.tsx`, `community.module.css` and clean route-specific artwork. Match the 3-column information hierarchy, conversational hero, post image/thumbnail density and right-hand cards. This is still a demo: clearly label example posts, keep actions local, and remove or clearly qualify fabricated likes/replies/member numbers. Use illustrated demo avatars/thumbnails as examples, not presented as real customers.

Do not rework payment, login, backend, content model or SEO in this UI sprint. Preserve existing routes and working interactions.

## Visual QA and completion gate

1. Before editing, capture a fresh current baseline for the five user screenshots/routes. Preserve it under `artifacts/visual-qa/ui-v3/baseline/`. Record `git status`, HEAD, viewport and whether screenshots show reduced or normal motion.
2. Work in order **Home layout → Malaysia asset → Home cards/community strip → Tools → Path → Community**. After each, take new captures, inspect actual pixels and correct the largest remaining mismatch. Create labelled side-by-side and 50% overlays against each approved mockup in `artifacts/visual-qa/ui-v3/comparisons/`. Do not compare screenshots with browser chrome to naked mockups.
3. Produce both **settled** and **during-entrance** screenshots. At rest, no card stagger, blank reveal, overlap, text clipping or layout shift. Reverse-scroll, back navigation and reduced-motion must leave all content visible.
4. QA all six viewport shapes listed above. Check first fold and full page, `scrollWidth <= innerWidth`, images loaded, contrast/focus, keyboard menu, tap targets and the fixed mobile dock. Re-run `npm run typecheck`, `npm run lint`, `npm run test:e2e`, `npm run build`, plus targeted visual/interaction tests for changed surfaces.
5. Update `docs/VISUAL_QA.md` with **current** route-by-route verdicts and evidence links. “Close” is not enough when the founder can still point to an obvious asset/layout difference. List honest exceptions caused by truthful content or unavailable exact illustrator layers. Test success is not visual-parity proof.
6. After local checks pass, use the established release workflow only for the scoped changes, then capture the deployed custom domain at the same viewports and compare again. Verify the live version actually contains the new assets/CSS; do not say “fixed live” based on a local build. If release access is unavailable, provide the tested local result and precise blocker. Preserve unrelated work.

**Definition of done:** the founder's five screenshots have a visibly improved counterpart at the same effective viewport; homepage first-fold cards are visible; Malaysian emblem/ribbon proportions and layering resemble the approved reference; cards/sections align at rest and during motion; Tools, Path and Community each have their own approved-reference composition; interactions/tests still pass; final report links to before/after/overlay/live proof. Do not call it pixel-perfect unless the images genuinely demonstrate that claim.
