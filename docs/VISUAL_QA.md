# SiapSatu — Top 5 repair QA

Date: 16 Oct 2026. **Local production build only**, served at http://localhost:3112. No push, deployment or DNS change in this sprint, as required by the latest repair brief. [Previous report](VISUAL_QA_PRE_TOP5.md) is preserved as historical evidence.

## Result and evidence

All five repairs are implemented: truthful tool availability, reference-led Tools composition, reachable reader controls, earlier mobile Home discovery, and outcome-first catalog titles with reversible URL filters. Existing sign-in, checkout, community and local-progress demo labels remain.

- [Before/reference/final viewer](../artifacts/visual-qa/top5/index.html)
- [Comparison contact sheet](../artifacts/visual-qa/top5/comparisons/contact.jpg) · [normalization](../artifacts/visual-qa/top5/comparisons/normalization.json)
- [Fresh baseline geometry](../artifacts/visual-qa/top5/baseline/geometry.json) · [final geometry](../artifacts/visual-qa/top5/final/geometry.json)
- [Runtime audit](../artifacts/visual-qa/top5/runtime-audit.json) · [asset provenance](ASSET_SOURCES.md)

Baseline and final cover five route states at **1440×1024, 390×844, 360×800 and 768×1024**: 20 route/viewport checks per phase, with first-fold and full-page captures plus the desktop mega menu. Twelve additional final mobile reader captures show templates, tasks and the last paragraph with the real fixed footer.

**14 reference/final pairs** have labelled side-by-sides and 50% overlays. Comparison copies are width-normalized; mobile Tools removes 90 original pixels of device status bar, catalog removes 70. Height is cropped to the shorter image, never stretched. Original references are unchanged. Mobile reader reference has a different subject; comparisons concern layout grammar. Home has no dedicated approved mobile reference, so its mobile evidence is before/final.

Captures wait for fonts/images and use reduced motion for stable geometry; normal motion is tested separately. Full-page captures move fixed docks to the document bottom only during screenshot stitching. Fold/scrolled captures retain actual fixed positioning.

## Route verdicts

**close** means recognizable composition, not pixel parity. **material delta remains** is a visual verdict, separate from functional test results.

| Route / state | Before issue | Change | Final verdict / residual delta | Evidence |
|---|---|---|---|---|
| Tools journey | Zero-module cards led to empty searches; available modules were buried. | All 8 unavailable tools are non-interactive upcoming articles without arrows/tab stops. Counts derive from MODULES. Available cards reach hubs or exact tool filters. | **close** — all journeys tested. Real counts deliberately differ from invented reference counts. | [Baseline](../artifacts/visual-qa/top5/baseline/390-tools-fold.png), [tests](../artifacts/visual-qa/top5/test-e2e.log) |
| /tools desktop + mobile | Mobile order, logo scale, hero and card hierarchy differed. | Larger tiles/type, learner crop, flag/star/arrow, desktop caption; Gemini, ChatGPT, n8n, Hermes, Codex and GitHub lead. URL-backed search/category/reset. | **close** — 390px first row is about 34px below normalized reference. Learner pose, neutral Codex/NLM labels and low-resolution supplied Hermes mark differ. | [Desktop](../artifacts/visual-qa/top5/comparisons/1440-tools-side-by-side.jpg), [mobile](../artifacts/visual-qa/top5/comparisons/390-tools-side-by-side.jpg), [360px overlay](../artifacts/visual-qa/top5/comparisons/360-tools-overlay.png) |
| /learn/n8n-google-sheets/2 | Small workflow, weak rail/hierarchy and footer reachability risk. | Single header, clearer rail, large DOM workflow, template/task/official link. Dock reserve measures actual footer height with observer cleanup. | **material delta remains** — desktop reference depicts step 3; mobile reference depicts Gemini with different type/content. Real step 2 is preserved. Larger readable content puts the full workflow below the mobile fold. | [Desktop](../artifacts/visual-qa/top5/comparisons/1440-learn-n8n-google-sheets-2-side-by-side.jpg), [template](../artifacts/visual-qa/top5/final/390-learn-n8n-google-sheets-2-template.png), [last paragraph](../artifacts/visual-qa/top5/final/360-learn-n8n-google-sheets-2-last-paragraph.png) |
| /learn/n8n-google-sheets/3 | Later lesson lacked the reference hierarchy and diagram prominence. | Larger heading, deliberate line break, stronger action panel, full workflow, template/task and accessible previous/next. | Desktop **close**; mobile **material delta remains** — reference is a different lesson and serif design. Supporting artwork and diagram detail remain approximate. Reachability passes. | [Desktop](../artifacts/visual-qa/top5/comparisons/1440-learn-n8n-google-sheets-3-side-by-side.jpg), [360px task/last paragraph](../artifacts/visual-qa/top5/final/360-learn-n8n-google-sheets-3-last-paragraph.png) |
| Home | Mobile artwork pushed discovery down; desktop art/CTA accents were weak. | Mobile hero art 280→200px; larger desktop title/CTA/trio, undistorted emblem, KL skyline/note and conversation icon. | **close** — first card moves 684→604px at 390px, 681→601px at 360px. At least 100px of the card is visible above the dock at both widths. Poses, skyline and community artwork remain approximate; no invented member proof. | [Desktop](../artifacts/visual-qa/top5/comparisons/1440-home-side-by-side.jpg), [390px](../artifacts/visual-qa/top5/final/390-home-fold.png), [360px](../artifacts/visual-qa/top5/final/360-home-fold.png) |
| /modules + desktop Modul menu | Tool-name-first cards, loose density and nonpersistent filters. | Outcome titles retain canonical names/prices. Exact tool filters, reversible categories/search/reset. Shorter hero copy, compact mobile cards and CSS portrait crops. Menu behavior retained. | **close** — all three featured cards fit the 390px fold. Three featured products versus four in mobile reference; no invented fourth product. Portraits are closer crops than the original torso art; exact illustration parity remains unavailable. | [Desktop](../artifacts/visual-qa/top5/comparisons/1440-modules-side-by-side.jpg), [mobile](../artifacts/visual-qa/top5/comparisons/390-modules-side-by-side.jpg), [menu](../artifacts/visual-qa/top5/comparisons/1440-mega-menu-side-by-side.jpg) |

## Final verification

Commands ran after the final application/test edit. Browser checks use the local production build.

| Command / check | Result | Log |
|---|---|---|
| npm run typecheck | Pass, exit 0 | [typecheck](../artifacts/visual-qa/top5/typecheck.log) |
| npm run lint | Pass, no ESLint warnings/errors | [lint](../artifacts/visual-qa/top5/lint.log) |
| npm run build | Pass, 13 static pages generated | [build](../artifacts/visual-qa/top5/build.log) |
| QA_URL=http://localhost:3112 npm run test:e2e | **57 passed, 9 skipped, 0 failed**, 1.7m; skips are device-specific guards | [e2e](../artifacts/visual-qa/top5/test-e2e.log) |
| node scripts/capture-top5.mjs final | 20 checks; **0 overflow, 0 broken images, 0 page errors** | [geometry](../artifacts/visual-qa/top5/final/geometry.json) |
| node scripts/audit-astra-runtime.mjs | 28 route/viewport checks; **0 console/HTTP/request/retired-image findings** | [runtime](../artifacts/visual-qa/top5/runtime-audit.json) |
| Protected asset / reference hashes | 3 supplied asset pairs unchanged; 8 approved references unchanged | [assets](../artifacts/visual-qa/top5/protected-assets.json), [references](../artifacts/visual-qa/top5/reference-integrity.json) |

Coverage: every available/upcoming tool; exact filters, empty reset, reload/Back; clipboard contents, legacy fallback with focus restoration and denied-copy manual fallback; progress persistence; next/back; normal/reduced motion and reverse scroll; keyboard focus; 390px/360px dock reachability; Home→catalog; existing menu, checkout preview, login preview and local community regressions.

[Initial test failures](../artifacts/visual-qa/top5/test-e2e-initial.log) are retained. Test fixes await the next lesson URL before Back, wait for hydration before direct keyboard activation/reload history checks, and select the final tool card instead of the last link now that upcoming tools are articles. These are not hidden retries: the final full suite passed with retries disabled.

React review: filters derive from URL state; articles/links/buttons reflect real availability; observer and animation cleanup is retained. Existing protected mockup deletions and untracked user files were not reset, staged or removed. No external/live testing is claimed for this sprint.

## Reproduce

Run npm run build, then npm run start -- --port 3112. Set QA_URL=http://localhost:3112 and run the e2e suite and node scripts/capture-top5.mjs final. Run python scripts/compare-top5.py and python scripts/top5-report-index.py for comparisons/viewer. For runtime audit, set QA_OUTPUT=artifacts/visual-qa/top5/runtime-audit.json. Preserve the pre-edit baseline folder.
