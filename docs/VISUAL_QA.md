# SiapSatu UI / asset / layout repair v3

Date: 17 October 2026 (work began 16 October). Started at b079d3c287e63cd6faf7519e4e33507881f53c0a. Scope: Home, Tools, AI Automation Path and Community. This report supersedes the older Top 5 runtime verdicts; historical reports/evidence remain unchanged.

## Current local result

Reference-led compositions are implemented and checked in a production build at http://localhost:3112. Release verification will be appended after the scoped GitHub/Vercel release. This is **not pixel-perfect artwork parity**: original illustrator layers were unavailable, and the truthful prototype deliberately differs from invented reference claims.

- [Evidence viewer](../artifacts/visual-qa/ui-v3/index.html)
- [Approved reference / current contact sheet](../artifacts/visual-qa/ui-v3/comparisons/contact.jpg)
- [Fresh baseline metadata](../artifacts/visual-qa/ui-v3/baseline/geometry.json), [final metadata](../artifacts/visual-qa/ui-v3/final/geometry.json)
- [Comparison normalization and user-capture cropping](../artifacts/visual-qa/ui-v3/comparisons/normalization.json)
- [Asset sources and provenance](ASSET_SOURCES.md)

## Measured viewport assumptions

Six requested CSS viewports: 1880×880, 1505×1029, 1440×900, 768×1024, 390×844 and 360×800, all DPR 1 with browser zoom 100% in controlled Playwright contexts. A seventh 1248×588 CSS viewport at DPR 1.5 approximates the user's 1872×882 physical-pixel content shape. The user's logo/type scale strongly suggests approximately 150% combined zoom/display scaling. **Actual zoom on the user's browser was not accessible and is not claimed measured.**

Original user captures retain their bytes. Comparison copies remove Edge chrome/taskbar using pixel crop (0,120,1864,1001); the resulting 1864×881 region differs by about 8 pixels from the simulated physical width. Individual user captures appear to have different effective scaling (Tools is denser than Home); the 1.5× simulation primarily matches Home. User comparisons are therefore an explicitly approximate reconstruction, with exact original sizes/crops/hashes in normalization.json. Approved mockups are never edited. Reference images are resized proportionally; differing heights are padded with white, never vertically stretched. Tools mobile removes its 90px status bar before proportional scaling. Tablet uses the desktop reference only as a composition guide; Home, Path and Community have no approved mobile references.

Each route/viewport has a normal-motion entrance capture, settled fold, full-page capture, reduced-motion capture and reverse-scroll check. Home also has a scrolled cards/community capture. Full-page stitching relocates the fixed dock only for that image; fold/scrolled images preserve actual fixed positioning. Capture metadata includes innerWidth, innerHeight, DPR, visualViewport.scale, rectangles, image errors and observed layout shifts.

## Route verdicts and remaining differences

| Surface | Verified repair | Reference exception / residual difference | Evidence |
|---|---|---|---|
| Home first fold | Height-aware title/CTA/hero contract keeps all three desktop cards visible, including short/zoomed viewport. Mobile retains text → CTA → chips → art → cards. | Hero poses/linework remain reconstructed; yellow skyline is a stylized vector, not exact original illustration. | [1505 comparison](../artifacts/visual-qa/ui-v3/comparisons/1505-home-side-by-side.jpg), [user counterpart](../artifacts/visual-qa/ui-v3/comparisons/live-home-first-fold-side-by-side.jpg) |
| Malaysia layers | Separate intrinsic crescent/14-point star, ribbon, arrow, skyline, people, device marks and DOM notes. No emblem stretch or slice cropping. Home, Tools, Path and Community use distinct compositions. | Ribbon curvature and handwritten lettering are not identical to original master layers. | [Home overlay](../artifacts/visual-qa/ui-v3/comparisons/1505-home-overlay.png), [source manifest](../artifacts/visual-qa/ui-v3/source-art/manifest.json) |
| Home cards / strip | GSAP now has explicit y=0 endpoint; featured row moves together by 6px and clears inline transforms. Card tops/bottoms align at rest and during sampled entrance. Discussion image preserves speech bubbles, panel widths and honest WhatsApp preview. | Abstract group badge replaces fake social proof. Local preview wording differs from unavailable WhatsApp invite in mockup. | [User scrolled counterpart](../artifacts/visual-qa/ui-v3/comparisons/live-home-cards-community-side-by-side.jpg), [motion regression](../tests/ui-v3.spec.ts) |
| Tools | Height-bounded wide flag/arrow hero, intrinsic emblem and compact controls. Four desktop columns, two mobile columns; required mobile first-six order retained. | Real module counts, 8 available/8 upcoming and neutral Codex/NLM marks intentionally differ. Protected Hermes source remains low resolution. | [Desktop](../artifacts/visual-qa/ui-v3/comparisons/1505-tools-side-by-side.jpg), [390](../artifacts/visual-qa/ui-v3/comparisons/390-tools-side-by-side.jpg) |
| AI Automation Path | Separate seated learner, floating workflow symbols and connecting arrows. Four colored steps, outcome panel and CTA fit at 1505×1029. Checklist persists locally. | Reconstructed learner pose and generic Sheet/Mail/step icons differ; no RM27 bundle, certificate or unsupported completion metric. Two-column tablet/mobile timeline keeps real content readable. | [Reference pair](../artifacts/visual-qa/ui-v3/comparisons/1505-paths-ai-automation-side-by-side.jpg), [user counterpart](../artifacts/visual-qa/ui-v3/comparisons/live-learning-path-side-by-side.jpg) |
| Community | Explicit 3-column grid, conversational hero, illustrated demo avatars and three authored thumbnail examples. Sidebar follows normal grid flow. Compose/filter/like actions remain local. | Demo qualifiers and longer truthful copy make posts taller than the reference; third post starts near the desktop fold. Thumbnail artwork represents examples, not real customer work. Public navigation stays consistent with the app instead of copying a fictitious logged-in profile. | [Reference pair](../artifacts/visual-qa/ui-v3/comparisons/1505-community-side-by-side.jpg), [user counterpart](../artifacts/visual-qa/ui-v3/comparisons/live-community-side-by-side.jpg) |

## Homepage fold measurements (CSS px)

| Viewport | Before first card top | Final top | Final bottom |
|---|---:|---:|---:|
| 1880×880 | 554 | 508 | 758 |
| 1505×1029 | 554 | 575.05 | 825.05 |
| 1440×900 | 554 | 517 | 767 |
| 1248×588, DPR 1.5 | 554 | 390.81 | 570.81 |
| 768×1024 | 471 | 471 | 729.23 |
| 390×844 | 606.69 | 606.69 | 764.42 |
| 360×800 | 603.69 | 603.69 | 778.22 |

At the reference shape, first cards begin within 5px of the brief's approximate y=580 guide. The community strip starts at approximately y=839. The mobile dock covers the lower portion of the first card until scroll; the existing discovery/reachability test passes. Desktop three-card height is 250px, reduced to 180px only for short desktop viewports. Test sampling requires card top/bottom differences below 1 CSS pixel throughout entrance.

## Verification

- Production build, typecheck and lint: pass. [Build](../artifacts/visual-qa/ui-v3/build.log), [typecheck](../artifacts/visual-qa/ui-v3/typecheck.log), [lint](../artifacts/visual-qa/ui-v3/lint.log).
- Full E2E suite: **66 passed, 10 device-specific skips, 0 failures**; final results recorded in [test log](../artifacts/visual-qa/ui-v3/test-e2e.log). Device-specific skips are explicit; smoke results are not visual parity proof.
- Runtime audit: 28 route/viewport checks, zero findings; [JSON](../artifacts/visual-qa/ui-v3/runtime-audit.json). Covers all principal routes, not only these four. Cancelled speculative prefetches are recorded separately.
- Observed local CLS peaked at 0.003 during load (small font/entrance settling); this is not a claim of absolute zero layout shift.
- Complete captures and the interactive evidence index are retained locally; source control includes curated desktop/mobile/user comparison pairs, overlays, provenance and machine-readable metadata to keep release evidence bounded.
- 28 changed-route/viewport captures: geometry, overflow, broken images and page errors recorded in final metadata. Seven viewport variants × four routes. Normal and reduced-motion views retained separately.
- Tests cover entrance alignment, full short-desktop fold, Back/reverse scrolling, Path checklist persistence, community example labels/local actions, existing keyboard menus, search/history, reader copy/progress and mobile dock reachability.
- A final narrow-screen audit caught a 4px Path overflow at 360px caused by the tablet learner offset. A mobile-specific left inset corrected it; the Path test now explicitly uses 360px and asserts document width.
- During development, the first new Back-navigation test failed because it invoked Back before the client route finished changing. The test now awaits the destination URL; the corrected regression passes.
- [Integrity audit](../artifacts/visual-qa/ui-v3/protected-integrity.json): 666 protected files checked against HEAD; 637 byte-identical and 29 text files differ only by existing Windows CRLF checkout normalization. No content changes. Protected references, wordmark/tool sources and prior Top 5/parity-v2 evidence were not edited. Only scoped app components, new assets, scripts/tests and these reports are release candidates.

Commands: npm run build; npm run typecheck; npm run lint; QA_URL=http://localhost:3112 npm run test:e2e; node scripts/capture-ui-v3.mjs final; python scripts/compare-ui-v3.py. PowerShell environment syntax was used when running locally.
