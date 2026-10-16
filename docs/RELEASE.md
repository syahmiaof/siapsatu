# SiapSatu release — 2026-10-17

## UI / asset / layout repair v3

Live at [siapsatu.syahmiaof.my](https://siapsatu.syahmiaof.my). Application commit `6ad909fc277a32665970110fc8d65954cf3d2cb5` was pushed to GitHub master and deployed automatically by Vercel. Deployment `dpl_51Wa8cUYmbBjzNUEccTHjy3z8Hqi` reached READY with that exact Git SHA and the existing custom-domain alias. DNS changes were unnecessary.

Home now sizes its first fold by viewport height and aligns featured cards through entrance animation. Separate proportional Malaysia layers, a seated Path learner, a conversation-based Community hero and demo thumbnails replace the shared oversized compositions. Tools controls and the 360px Path layout are repaired. Existing design tokens, typography and protected wordmark/reference sources are preserved.

Production checks on the public custom domain:

- Full browser suite: **66 passed, 10 device-specific skips, 0 failures**.
- Runtime: **28 route/viewport checks, 0 findings**.
- Visual captures: **28 route/viewport combinations**, no horizontal overflow, broken images or page errors. Reference/user comparisons use these live captures.
- HTTPS 200; all **8 new assets byte-identical** to local source. Matched local/live card positions have 0 CSS px delta.
- Local production build, typecheck and lint passed before release.

[Detailed QA and reference exceptions](VISUAL_QA.md), [live test log](../artifacts/visual-qa/ui-v3/test-e2e-live.log), [asset/version proof](../artifacts/visual-qa/ui-v3/live-version-proof.json), [live geometry](../artifacts/visual-qa/ui-v3/live/geometry.json).

Illustrations are reconstructed, not pixel-perfect copies. Auth, checkout and community/progress behavior remain the existing prototype/local-state flows. The following evidence-only commit records this release without changing application/runtime files.

## Previous release — 2026-10-16

- Live UI: https://siapsatu.syahmiaof.my
- Vercel alias: https://siapsatu.vercel.app
- Private source repository: https://github.com/syahmiaof/siapsatu
- Repair commit: `a630168507d403ca0959b553e400ec476da8881e`
- Vercel project: `syahmiaofs-projects/siapsatu`, linked to the repository with production branch `master`.
- Cloudflare: DNS-only CNAME `siapsatu.syahmiaof.my` → `fdae13dec356c81d.vercel-dns-017.com`, the project's rank-one recommended target. Existing apex and other records were not changed.

## Verified on the public custom domain

HTTPS returned HTTP 200 with normal certificate validation. Vercel's domain API reported `verified: true` and `misconfigured: false`. Public DNS resolver 1.1.1.1 returned the configured CNAME.

The full browser suite against `https://siapsatu.syahmiaof.my` completed **47 passed, 7 device-specific skips, 0 failed**. Runtime audits cover 14 routes at desktop/mobile widths: **28 checks, 0 findings** on both the custom domain and Vercel alias. Cancelled speculative Next.js prefetch requests are recorded separately only when their prefetch header is confirmed.

- [Live Playwright log](../artifacts/release/playwright-live.log)
- [Custom-domain runtime audit](../artifacts/release/runtime-custom-domain.json)
- [Vercel-alias runtime audit](../artifacts/release/runtime-vercel.json)
- [Domain configuration evidence](../artifacts/release/domain-config.json)
- [Live desktop homepage](../artifacts/release/home-1440.png)
- [Live mobile homepage](../artifacts/release/home-390.png)
- [Visual verdicts and remaining differences](VISUAL_QA.md)

These tests ran on the repaired app uploaded through the CLI before the release evidence commit; the app source is identical to repair commit `a630168`. The final release-evidence push exercises the GitHub production deployment connection. Its resulting commit/deployment status can be inspected in GitHub and Vercel.

## Operating the preview

Pushes to `master` deploy through the connected Vercel project. The public URL is available without running a local server. Purchases and authentication remain previews; community/progress interactions are local demo state, not a live backend service. See the visual report for remaining reference differences.

Deployment packaging excludes only root-level reference/QA folders. The initial unanchored ignore rule accidentally excluded runtime brand components; this was corrected before the successful production build.
