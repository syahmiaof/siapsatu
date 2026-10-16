# SiapSatu release — 2026-10-16

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
