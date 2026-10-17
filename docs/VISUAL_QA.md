# Current reference extraction repair — 17 October 2026

See [REFERENCE_REPAIR.md](REFERENCE_REPAIR.md) for the current source-crop implementation, matched comparisons, test evidence and honest remaining differences. The v3 reports below are historical and do not describe the current artwork.

---

# SiapSatu UI / asset / layout repair v3

Date: 17 October 2026 (work began 16 October). Started at b079d3c287e63cd6faf7519e4e33507881f53c0a. Scope: Home, Tools, AI Automation Path and Community. This report supersedes the older Top 5 runtime verdicts; historical reports/evidence remain unchanged.

## Released result

Reference-led compositions are live at [siapsatu.syahmiaof.my](https://siapsatu.syahmiaof.my), tested locally and again on the public production domain. Application commit: `6ad909fc277a32665970110fc8d65954cf3d2cb5`; Vercel deployment `dpl_51Wa8cUYmbBjzNUEccTHjy3z8Hqi` reached READY with this exact Git SHA and the custom-domain alias. This is **not pixel-perfect artwork parity**: original illustrator layers were unavailable, and the truthful prototype deliberately differs from invented reference claims.

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

## Production verification — 17 October 2026

- Public HTTPS: 200 with normal certificate validation; all eight new assets match local source bytes and SHA-256. Browser checks confirm the new Home layers/CSS, short-fold card placement, 360px Path width and Community thumbnails. [Version proof](../artifacts/visual-qa/ui-v3/live-version-proof.json).
- Full production E2E: **66 passed, 10 device-specific skips, 0 failures** (2.7 minutes). [Live test log](../artifacts/visual-qa/ui-v3/test-e2e-live.log).
- Production runtime audit: **28 checks, 0 findings**. [Runtime evidence](../artifacts/visual-qa/ui-v3/runtime-live.json).
- All seven viewport variants × four changed routes captured live, including entrance, settled, full-page and reduced-motion states. **0 overflow, 0 broken images, 0 page errors**. [Live geometry](../artifacts/visual-qa/ui-v3/live/geometry.json).
- Matched local/live card-top positions differ by **0 CSS pixels**. Largest whole-image mean absolute RGB difference is 2.109 on the 0–255 channel scale; this numerical comparison is not a perceptual-parity score. [Comparison measurements](../artifacts/visual-qa/ui-v3/local-live-comparison.json).
- Release evidence is committed separately from the tested application. Subsequent evidence-only commits leave application/runtime files identical; deployment status and public asset checks are verified after that push.

## UI-v4 Polish & Visual Fidelity Finish — 17 October 2026

- **Viewports Tested (7 total)**: `1505×1029` (approved desktop match), `1880×880` (wide-short), `1440×900` (standard laptop), `1248×588` @ DPR 1.5, `768×1024` (tablet), `390×844` (iPhone mobile), `360×800` (Android narrow).
- **Routes Audited (4 total)**: `/`, `/tools`, `/paths/ai-automation`, `/community`.
- **E2E Test Results**: **66 passed, 10 skips, 0 failures** across desktop and mobile chromium runners.
- **Typecheck & Lint**: Clean pass (0 errors, 0 warnings).
- **Geometric Landmark Parity (Desktop 1505×1029 vs Approved Reference Mockup)**:
  - Header Bottom Y: `100px` (mockup reference: `110px`, Δ = -10px)
  - Card Row Start Y: `575px` (mockup reference: `580px`, Δ = -5px)
  - Community Notice Strip Start Y: `843px` (mockup reference: `845px`, Δ = -2px)
  - First Card Y: `575px` (mockup reference: `580px`, Δ = -5px)
  - Tools Grid Y: `443px` (mockup reference: `445px`, Δ = -2px)
  - Community Central Feed Y: `378px` (mockup reference: `380px`, Δ = -2px)
- **Defects Repaired**:
  1. **Tools Emblem Collision**: Star/crescent repositioned in `DirectoryArtwork.module.css` (`left: 50%; top: 44%`) inside clean midnight navy negative space with >50px clearance from the sweeping red/white ribbon.
  2. **Fluid Jalur Gemilang Ribbon**: Replaced rigid diagonal highway-lane silhouette with authored organic S-curve SVG (`home-ribbon.svg`, `tools-ribbon.svg`, `path-ribbon.svg`, `community-ribbon.svg`).
  3. **Growth Arrow Visibility**: Upward-trending green vector accent (`growth-arrow.svg`) clearly visible in top-right quadrant without obscuring the DOM handwritten note.
  4. **Learner Baseline Desk Integrity**: Replaced clipped learner with `path-learner-1100.webp` preserving 100% bottom pixels anchored at `bottom: 0`.
  5. **Community 3-Column Layout**: Eliminated >600 lines of conflicting CSS overrides, established semantic CSS Grid template (`channels`, `hero`, `feed`, `sidebar`), integrated custom SVG channel icons, realistic demo thumbnails with prototype honesty labels, community guidelines, and practice challenge.
  6. **Mobile Horizontal Overflow**: Resolved 406px `scrollWidth` on 390px/360px mobile community page by adding `min-width: 0; max-width: 100%; box-sizing: border-box; overflow-x: hidden;` to `.pageLayout` and `.channelsSidebar`.
  7. **Strict Product Truth**: Retained honest standalone RM10 pricing, removed reference bundle/certificate copy, preserved authentic WhatsApp coming-soon preview copy.
- **Evidence Directory**:
  - `artifacts/visual-qa/ui-v4/post/`: 28 raw local post-change screenshots and `geometry.json`.
  - `artifacts/visual-qa/ui-v4/live/`: 28 fresh production screenshots captured directly from `https://siapsatu.syahmiaof.my/` and `geometry.json` (0 broken images, 0 overflow, CLS < 0.0004).
  - `artifacts/visual-qa/ui-v4/comparisons/`: 28 side-by-side JPGs, 50% overlay PNGs, `contact-1505.jpg`, `landmark-analysis.json`, and `comparison-meta.json`.
- **Production Deployment Verification**:
  - **Live URL**: `https://siapsatu.syahmiaof.my/`
  - **Git Commit**: `cd5c8253100838d5ba9cfd3ee350222313bc6567` (`fix(ui): complete ui-v4 visual fidelity polish and reference parity finish`)
  - **Vercel Deployment**: `dpl_5gWjYCbeZPsfLrn49rCBq4NMLprq` (State: `READY`, Substate: `PROMOTED`)
  - **Asset Verification**: Production HTTP 200 responses verified on all UI v4 SVG assets (`/assets/illustrations/ui-v4/home-ribbon.svg`, `emblem.svg`, `growth-arrow.svg`, `tools-ribbon.svg`, etc.)
  - **Production Responsive Metrics**: Zero horizontal overflow verified across all 7 target viewports (1505×1029, 1880×880, 1440×900, 1248×588 @ DPR 1.5, 768×1024, 390×844, 360×800).
