# Astra master prompt — SiapSatu visual rebuild

Paste everything below into Astra. Working directory: `C:\Users\USER\Desktop\academy-syahmi`.

---

You are the staff frontend engineer and visual QA owner for the existing **SiapSatu** Next.js app. Improve the current codebase until the live rendered UI closely matches the approved mockups on desktop and mobile. Work in place. Do not start from a generic template. Do not stop after making a plan, passing a build, or reading the previous QA report.

The previous agent called most screens “Match” in `docs/VISUAL_QA.md`. I reviewed the saved captures against the mockups; the claim is inaccurate. Treat that document as an unverified historical claim. Inspect actual images and the live app yourself.

## Product truth and references

Read `PRODUCT.md`, `BRAND_COPY.md`, `UI_PLAN.md`, `DESIGN.md`, `mockups/UI_MOCKUPS_INDEX.md` and `MASTER_AGENT_PROMPT.md`. Keep SiapSatu's Malay-first RM10 text/image/link/template/practice format and “Satu modul. Satu hasil.” promise. Do not add video or fabricate real buyers, ratings, sales, payment, authentication, entitlements, email or WhatsApp delivery. If mockup text conflicts with product documents, keep the visual layout and correct the copy.

Approved visual references, in priority order:

1. `mockups/homepage-theme-03-malaysia-utility.png` — visual world and homepage.
2. `mockups/modules-catalog-desktop.png`, `mockups/modules-catalog-mobile.png`, `mockups/modules-mega-menu-desktop.png`.
3. `mockups/ui-01-tools-directory-desktop.png`, `mockups/ui-10-tools-directory-mobile-v2.png`.
4. `mockups/ui-02-tool-n8n-desktop.png`, `mockups/ui-03-tool-hermes-desktop.png`.
5. `mockups/ui-04-learning-path-automation-v2.png` through `mockups/ui-09-community-hub.png`.
6. `mockups/lesson-mobile-siapsatu-v2.png` for the mobile reader.

Preserve `brand/logo-concepts/siapsatu-primary-final.png`, `brand/tool-logos/n8n-official.png` and `brand/tool-logos/hermes-agent-official.png`. Ignore rejected `homepage-theme-02-ai-saas.png`, unrelated `syambal-*` files, old `Academy Syahmi` concepts and superseded non-v2 screen 04/10 images.

## Verified starting defects — reconfirm against fresh renders

| Route | Existing capture defect | Reference target |
|---|---|---|
| `/` | Tiny header logo; narrow split hero; too much dead space; hero screenshot crop contains original navbar/text fragments; CTA/cards undersized; truncated community art. | Large logo and bold two-line heading, integrated Malaysian characters/flag ribbon filling the right, CTA/chips beneath copy, rich featured cards immediately below hero. |
| `/modules` | Heading wraps into a tall narrow column; filters wrap; hero crop has stray UI; first card row starts too low. | Wide headline/search/filters with integrated people/ribbon; dense featured cards and first secondary row visible at the reference's depth. |
| `/tools` desktop | Generic outlined hero box, small cropped homepage art, excessive whitespace, tiny logos/cards, faded cards in capture. | Broad flag/arrow hero, larger controls, compact 4-column tool grid and fully opaque brand marks. |
| `/tools` mobile | Tall white hero card and tiny desktop crop with stray text; search/cards start too low; dock covers cards in full-page capture. | Big logo/heading, integrated artwork, large search, compact filters, readable tool tiles and non-obscuring bottom dock. |
| `/tools/n8n` | Workflow graphic shrunk into a bordered card; module grid becomes long two-column cards; illustration has duplicate note/UI. | Wide integrated workflow and character art; four compact illustrated module tiles in a desktop row; prerequisite panel at right. |
| `/learn/n8n-google-sheets/2` | URL says step 2; reference depicts step 3, while capture shows step 2; two stacked headers; main workflow image absent from first viewport; sticky footer covers content. | One reader header, coherent URL/step state, large illustrated lesson, template and try task visible, footer that leaves content reachable. |
| Shared assets | `scripts/prepare_assets.py` rectangular crops include screenshot UI/text despite provenance calling them isolated artwork. Several tool SVGs are hand-drawn stand-ins. | Artwork-only assets and verified logos, with honest provenance. |
| QA | `docs/VISUAL_QA.md` labels all routes “Match” although composition differs substantially. | Matched-viewport side-by-side comparisons and candid route verdicts. |

Audit remaining routes too. The table is a starting point, not a complete exemption list.

## Visual rules

Match **composition**, not just navy/orange tokens. Recreate header/logo size, hero height, text line breaks, copy/artwork proportions, first-fold position, card aspect ratios, icon scale, backgrounds, search/filter geometry and visual density. Preserve Malaysia Utility: clean white ground, deep navy structure, orange-red CTA, green result cues, Malaysian ribbon/star/skyline accents, rounded bold typography and friendly illustrated learners.

Build headings, badges, cards, buttons, ribbons and diagrams as real HTML/CSS/SVG. Never use an entire mockup screenshot as a page background. Never call a rectangular screenshot crop an isolated illustration if it contains original headings, navbar, button or text. Prefer clean source art if present; otherwise create a transparent character illustration matching the approved style, carefully mask the artwork, or recreate non-character graphics in CSS/SVG. If image generation is unavailable, finish independent layout work and report the exact missing asset. Record truthful provenance in `docs/ASSET_SOURCES.md`.

Inspect the original logo's content bounds. If it has large transparent/white margins, derive a display crop that preserves the exact art, then size it so the visible wordmark matches the references. Do not solve a tiny logo by merely increasing an image box full of whitespace.

Inspect each tool logo visually. The manually authored NotebookLM, Cursor, Antigravity, Gemini/Codex variants and any others need verification. Replace invented marks with sourced official logos where available; if no trustworthy source exists, use a documented neutral text treatment. Do not label custom icons “official”. Keep n8n/Hermes supplied assets intact.

## Scope and behavior

Repair these existing routes: `/`, `/modules`, desktop mega-menu, `/tools`, `/tools/n8n`, `/tools/hermes-agent`, `/paths/ai-automation`, `/modules/n8n-google-sheets`, `/learn/n8n-google-sheets/2`, `/library`, `/progress`, `/community`, `/login`. Keep Next.js App Router, TypeScript, CSS Modules, GSAP and Playwright. Preserve currently working interactions. This is a visual/frontend repair, so checkout/login/community must remain truthful prototype UI.

Start with homepage and Tools directory as visual anchors, then carry their component grammar through the other routes. The reader can be quieter but must preserve its reference hierarchy.

Keep accessible GSAP word entrances/exits on hero and section headings. Fix any split-word layout shift or unintended line break. Apply restrained nav → headline → copy/CTA → cards → illustration sequencing. CSS hover/focus/active states should cover nav, CTA, chips, cards and logo tiles. In reduced-motion mode, content must be visible immediately. No looping logo animations or hover-only essential information.

For screenshots, wait for fonts, images and entrance animations to settle. A full-page capture must not show ScrollTrigger elements stuck at opacity zero. Scroll through before capturing or use reduced motion for geometry comparison, then test motion separately. Check back-navigation and reverse scrolling as well.

## Execution and verification

1. Record `git status` and inspect source, assets, routes, current screenshots and references. Keep reference assets unchanged.
2. Run the app. Create **fresh** baseline screenshots; existing `artifacts/visual-qa/` files are historical evidence.
3. Pair each route with its reference at the **same normalized width and corresponding viewport crop**. Do not compare a 1505px reference with a 1440px full-page capture without scaling. Compare the first fold separately from page length. For mobile, compare the 390px CSS viewport with the scaled reference mobile image.
4. Save labelled side-by-side and 50% overlay comparisons under `artifacts/visual-qa/astra/`. Make a route table listing the five biggest deltas and their severity.
5. Fix in impact order: asset contamination and logo → header/hero geometry → first fold → card/grid geometry → typography → decoration → motion. Preserve working interactions.
6. Re-render and inspect. Fix remaining high/medium deltas. Repeat only when a concrete mismatch remains.
7. Test at 1440×1024, 1280×800, 768×1024, 430×932, 390×844 and 360×800. Check initial viewport, full page, overflow, menu, filters and sticky dock.
8. Run `npm run typecheck`, `npm run lint`, `npm run test:e2e` and `npm run build` after final changes. Test keyboard navigation, search/filter, clipboard, reduced motion, broken images and serious console errors.
9. Rewrite `docs/VISUAL_QA.md` honestly. For each route say `close`, `material delta remains`, or `blocked by missing artwork`, with links to current screenshots/overlays and exact remaining issues. A passing test means functionality passed; it does not certify visual parity.

As a geometry check, normalize screenshots to a common width and compare bounding boxes for header, hero title, hero illustration, search/filter and first card row. Aim for position and size within roughly 5% where the generated reference is coherent. Use visual judgment for artwork and document approximations; raw pixel diff alone is noisy.

Do not deploy or push remotely. Do not edit `mockups/` or `brand/` to make comparisons easier. Do not claim “pixel-perfect”, “1:1” or “Match” without matching live screenshots. Do not leave placeholders, dead buttons or fabricated operational claims.

Finish with final desktop/mobile screenshot links, a route verdict matrix, highest-impact code/asset changes, exact test results and remaining limitations. Complete every independent repair before reporting an asset blocker.

---

End of prompt.
