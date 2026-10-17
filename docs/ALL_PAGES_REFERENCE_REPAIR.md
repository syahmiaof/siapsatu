# All-page reference artwork pass — 17 October 2026

Baseline: `9fab745` (Antigravity's expanded tools catalogue and Login label). These changes preserve that work, current routes/data, protected brand assets and original mockups.

## Repairs

| Page | Applied repair |
|---|---|
| Module catalogue | Original catalogue trio, Malaysia ribbon, crescent/star, skyline and handwritten note replace the reconstructed scene. Existing mobile catalogue retains its reference-led card-first layout. |
| Hermes tool hub | Original Hermes illustration, books, laptop, ribbon and sticky note. Benefits now span the full desktop width and wrap into a two-column mobile grid. Compact cards restore the bottom explainer within the desktop fold. |
| Module detail template | Original two-person Malaysia composition, used across module detail pages. Desktop header transparency preserves the complete emblem; content and purchase-preview actions remain HTML. |
| Pustaka | Original seated learner with n8n/Sheets artwork. Corrected two-line heading, statistics scale, progress alignment and output-card hierarchy. |
| Peta Hasil | Original trio and Malaysia skyline, larger title and grouped statistics. Existing example output cards and progress states are preserved. |
| n8n tool hub | Original pointing learner and handwritten note. Semantic workflow diagram remains HTML and is spaced to avoid overlapping the learner. |
| Lesson reader | Original n8n-to-Sheets learner composition above the template column. Explicit desktop text clearance prevents the enlarged image covering headings, descriptions or outcome text at 1400px and above. Other modules use the neutral Malaysia duo. Template, copy, steps and completion remain usable. |
| Home, Tools, Path, Community, Login | Audited again. Existing four-page source artwork, expanded catalogue and Login label preserved. Login has no approved visual reference. |

Seven additional lossless crops bring the source-artwork set to **14 assets**. The [new manifest](../artifacts/visual-qa/all-pages-repair/asset-manifest.json) records original hashes, crop coordinates, mask polygons and excluded controls. [Pixel verification](../artifacts/visual-qa/all-pages-repair/pixel-integrity.json) confirms unchanged originals, exact opaque RGB values and transparent excluded controls. Nothing is generated or painted over the original reference.

## Audit

- [Comparison viewer](../artifacts/visual-qa/all-pages-repair/index.html): 11 reference-mapped desktop pages, native 1505px width, reference pairs, 50% overlays and before/after screenshots. Different heights are padded, never stretched.
- [Local capture summary](../artifacts/visual-qa/all-pages-repair/final-comparisons/summary.json): **56 checks across 14 pages × 4 widths (1505, 768, 390, 360)**; no overflow, broken images, page errors or non-200 responses. Each has fold and full-page captures.
- [Published route audit](../artifacts/visual-qa/all-pages-repair/published-pages-local.json): **72 checks** across all 18 catalogue modules and their first lessons at 1505px and 360px; no findings.
- Local production build, lint and typecheck passed. The full interaction suite passed **70 tests, with 10 device-specific skips and zero failures (2.2 minutes)**. [Local test log](../artifacts/visual-qa/all-pages-repair/tests-local.log). Reader clearance was additionally checked at 1400px and 1505px; targeted reader interactions passed **10 tests with 2 device-specific skips**.

Visual inspection covered desktop composition, narrow mobile, tablet, header overlap, text/illustration separation and fixed dock clearance. Original sources, `DESIGN.md`, supplied brand logos, catalogue data and business logic remain unchanged. The design uses the established navy/orange system, Bricolage/Manrope typography and existing responsive components.

## Production release

The source-artwork implementation is commit `86d465e553290fb5f0fef66140dcf453d9993b45`; the final reader clearance correction is `ec2d778386f56c5b5a399d87b6a4104a4d804017`. GitHub master was verified at the latter SHA. Vercel deployment `dpl_Bs8SAQxz75Q7WCkkHHmXvpvKuciD` is READY and serves [siapsatu.syahmiaof.my](https://siapsatu.syahmiaof.my). [Deployment proof](../artifacts/visual-qa/all-pages-repair/release-final-app.json).

- [Live artwork verification](../artifacts/visual-qa/all-pages-repair/version-live.json): HTTPS 200, **14 byte-identical artwork files**, **11 loaded reference compositions**, and working truthful WhatsApp status.
- [Full production interaction suite](../artifacts/visual-qa/all-pages-repair/tests-live.log): **70 passed, 10 device-specific skips, zero failures (2.9 minutes)** after the reader clearance correction.
- [Live visual summary](../artifacts/visual-qa/all-pages-repair/live-comparisons/summary.json): **56 checks across 14 pages at 1505, 768, 390 and 360px**, zero findings.
- [Live published-route audit](../artifacts/visual-qa/all-pages-repair/published-pages-live.json): **72 checks across all 18 published modules and their first lessons**, zero findings.
- [Boundary captures](../artifacts/visual-qa/all-pages-repair/boundaries/geometry.json): **8 checks** at 1101px and 1400px across catalogue, Hermes, module detail and reader. No overflow, broken images or browser errors. Visual inspection found and resolved reader text occlusion; the final 1400px live screenshot confirms clear text beside the artwork.
- [Live comparison viewer](../artifacts/visual-qa/all-pages-repair/index.html) uses production screenshots. The source mockups remain unchanged.

## Honest remaining differences

This is **exact source artwork, not a flattened screenshot masquerading as an app**. Browser typography, icon styles, live catalogue titles/counts, semantic workflow diagrams, real navigation and truthful demo/payment wording still differ. The low-resolution supplied Hermes logo is preserved. Extractions retain some reference background around antialiased illustration edges, and source resolution limits enlarged artwork sharpness. Mobile pages without approved references are responsive adaptations. The lesson diagram is deliberately usable/selectable HTML; the reference's illustrative workflow UI is not copied as a false working editor.

Reproduce crops with `python scripts/extract-page-reference-art.py`, verify with `python scripts/verify-reference-extraction.py artifacts/visual-qa/all-pages-repair`, capture with `node scripts/capture-all-pages-repair.mjs final`, and compare with `python scripts/compare-all-pages-repair.py final`. Set `QA_URL` for the deployment under test. `scripts/audit-published-pages.mjs` discovers catalogue routes instead of assuming a fixed module count.
