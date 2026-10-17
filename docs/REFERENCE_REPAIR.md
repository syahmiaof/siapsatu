# Reference artwork repair — 17 October 2026

Baseline: Antigravity v4 commit `31f8998`. Scope: Home, Tools, AI Automation Path and Community. This report supersedes prior claims of visual parity; historical reports remain available.

## What changed

Seven lossless WebP crops now use the actual approved reference pixels. Reproducible polygon masks remove surrounding UI; the source mockups and protected logos remain untouched. Home retains the exact people, crescent/star, ribbon, skyline and handwritten notes. Tools has separate desktop/mobile crops. Path and Community use their own reference compositions. The Home discussion strip uses the actual reference characters.

Home hero placement, title scale, audience chips and tall-desktop card sizing follow the reference geometry. Path no longer applies the badge's saturated theme to the entire first card, and its primary CTA fits the 1505 × 1029 fold. Community has a compact two-line hero, composer and visible feed; mobile toolbars scroll within their containers. Existing navigation and interactions remain HTML. Unsupported learner counts, unavailable WhatsApp invites and artificial challenge deadlines use truthful preview wording.

## Evidence and limits

- [Comparison viewer](../artifacts/visual-qa/reference-repair/index.html): matched native-width desktop reference pairs, 50% overlays and fresh v4 before/after pairs.
- [Crop manifest](../artifacts/visual-qa/reference-repair/asset-manifest.json) and [pixel integrity](../artifacts/visual-qa/reference-repair/pixel-integrity.json): all seven source hashes unchanged, opaque extracted pixels RGB-identical, excluded controls transparent.
- [Local browser tests](../artifacts/visual-qa/reference-repair/tests-local.log): **70 passed, 10 device-specific skips, no failures**. Final decorative ribbon adjustment was followed by a production build; the full production suite verifies the released source.
- [Local geometry](../artifacts/visual-qa/reference-repair/final/geometry.json): 28 route/viewport combinations, no overflow, broken images or page errors; maximum observed CLS 0.001103 (rounded up). These captures precede the final decorative ribbon adjustment; use live captures for the released result.
- [Local runtime audit](../artifacts/visual-qa/reference-repair/runtime-local.json): 28 checks, no findings.
- Local production build, lint and typecheck passed. Release verification is recorded in RELEASE.md after publication.

Viewports: 1880 × 880, 1505 × 1029, 1440 × 900, 768 × 1024, 390 × 844, 360 × 800 at DPR 1; 1248 × 588 at DPR 1.5. Normal entrance, settled fold, full-page, reduced-motion and reverse-scroll checks are captured. Desktop reference width is native 1505px, padded only where heights differ. Tools mobile removes its 90px system-status region then scales proportionally. No approved mobile mockup exists for Home, Path or Community; these are responsive adaptations.

**Verdict: exact source artwork, closer composition, not whole-page pixel-perfect parity.** Browser font metrics, live text, line breaks, UI icons, card decorations, current navigation and truthful module/community data still differ from the flattened mockups. Masks keep original edge pixels and may retain small background fringes; scaling beyond source resolution cannot create new detail. The reference's one-line card copy and synthetic lettering cannot be claimed identical to selectable browser text. Auth, checkout and community/progress remain prototype/local-state flows.

## Reproduce

Run `python scripts/extract-reference-art.py`, then `python scripts/verify-reference-extraction.py`. Run the app on port 3113 and use `node scripts/capture-reference-repair.mjs final`, followed by `python scripts/compare-reference-repair.py final`. Set `QA_URL` to the public production URL for live captures/tests. `node scripts/verify-reference-release.mjs` checks public assets against local SHA-256 hashes and verifies all four reference compositions and the WhatsApp status interaction.

## Public production verification

Application commit `3617bf4e6863248536a71e16c89bfc6f5d247fdc` is deployed at [siapsatu.syahmiaof.my](https://siapsatu.syahmiaof.my). Vercel deployment `dpl_A61WmXGfZmd9A3fL5ti2LvuxVSg6` reached READY with the exact Git SHA, and the public custom domain resolves to this deployment. [Deployment proof](../artifacts/visual-qa/reference-repair/release-app.json).

The [live capture summary](../artifacts/visual-qa/reference-repair/live-comparisons/summary.json) records **28 route/viewport captures, zero horizontal overflow, broken images or page errors, and zero observed CLS** in this controlled run. [Live runtime audit](../artifacts/visual-qa/reference-repair/runtime-live.json): **28 checks, zero findings**. [Public asset/version verification](../artifacts/visual-qa/reference-repair/version-live.json) confirms HTTPS 200, seven byte-identical assets, all four reference compositions and the WhatsApp status interaction. [Local/live geometry](../artifacts/visual-qa/reference-repair/local-live-geometry.json): measured headers, heroes and cards have **0 CSS px maximum delta**.

The comparison viewer now uses the released production captures, including the final decorative ribbon adjustment. It intentionally preserves the font, icon and truthful-data differences described above rather than treating passing functional tests as visual identity.

The complete [production browser suite](../artifacts/visual-qa/reference-repair/tests-live.log) finished with **70 passed, 10 device-specific skips, zero failures (2.8 minutes)**. The following evidence-only commit records these results without changing application code.
