# SiapSatu visual repair QA

Date: 2026-10-16. This report supersedes earlier blanket match claims.

## Outcome and scope

Restored the Malaysia Utility direction after the homepage regression at `b181799`. The restoration uses the `b52d035` layout checkpoint, then adjusts hero/card proportions, menu placement, catalog density, learning-path timeline, reader spacing and mobile slide previews. Reader lesson improvements from `b52d035` remain.

The root regression was artwork containing baked-in interface fragments. The homepage and shared brand scenes now use clean transparent character artwork, decorative ribbons and real DOM content. Community claims describe the prototype honestly. The generated artwork is an approximation of the approved references, not identical illustration geometry.

This remains a frontend prototype: purchases, sign-in, community posts and progress are explicitly preview/local-demo behavior. No payment collection or real account entitlement is claimed.

## Evidence

- [Interactive before/reference/final viewer](../artifacts/visual-qa/astra/index.html)
- [Normalized comparison contact sheet](../artifacts/visual-qa/astra/comparisons/contact.jpg)
- [Reference normalization metadata](../artifacts/visual-qa/astra/comparisons/normalization.json)
- [Measured live geometry](../artifacts/visual-qa/astra/final/geometry.json)
- [Asset provenance](ASSET_SOURCES.md)

Screenshots cover 14 routes at six viewports: 1440×1024, 1280×800, 768×1024, 430×932, 390×844 and 360×800 (84 route/viewport captures), plus the desktop mega menu. The two supplemental lesson routes check the actual reference subject/content. Seventeen reference pairs use width-normalized side-by-side images and 50% overlays; normalization is disclosed in the metadata. This is visual inspection, not a numerical image-similarity certification.

Captures wait for fonts/images and use reduced motion to stabilize geometry. Fold captures retain the real fixed learning dock. For full-page evidence only, the dock is moved to the document bottom so it does not obscure the long screenshot. The viewer includes the broken homepage baseline; other before images are an earlier restoration checkpoint and must not be mistaken for the same broken baseline.

## Route verdicts and five principal deltas

“Close” means recognizable composition with remaining differences; it does not mean pixel parity. “Material delta” means a visible mismatch remains. Severity describes the remaining visual gap, separately from working behavior.

| Route/state | Verdict | Five principal deltas (fixed or remaining) |
|---|---|---|
| `/` | Close — medium | Clean hero replaces contaminated crop; large heading/CTA hierarchy restored; logo/header scale restored; featured cards return to first fold; character poses and skyline remain approximate. |
| `/modules` | Desktop close / mobile material delta — medium | Desktop featured height reduced to 208px; six secondary modules use denser rows; filter/search remain functional; current catalog has three featured entries versus four in reference; mobile ordering/artwork remains different. |
| Desktop mega menu | Close — low | Centered under navigation; width restored to 660px; compact item spacing; hover bridge prevents accidental closure; icon/text metrics remain approximate. |
| `/tools` | Desktop close / mobile material delta — medium | Directory hierarchy retained; real available marks used; unverified marks rendered as text; live catalog counts preserved; mobile tool ordering differs from the reference. |
| `/tools/n8n` | Close — medium | Genuine supplied mark retained; structured hero restored; workflow is live DOM; content remains instructional; workflow contains three meaningful nodes versus four in reference. |
| `/tools/hermes-agent` | Close — medium | Hero reduced to 380px; cards compacted; process bar appears earlier; clean artwork replaces screen crop; character and low-resolution supplied mark differ from reference fidelity. |
| `/paths/ai-automation` | Close — medium | Heading wraps deliberately; artwork reduced to 310px; result panel compacted; rail and four timeline circles restored; truthful CTA omits unsupported bundle/certificate claims. |
| `/modules/n8n-google-sheets` | Close — low | Artwork reduced to 280px; purchase sidebar widened to 400px; learning steps compacted; template preview reaches first fold; n8n PNG no longer becomes a white square under a brightness filter. |
| `/learn/n8n-google-sheets/2` | Material delta — high | Real step 2 stays coherent; reference depicts different step/content; mobile gutters fixed; dock remains usable; typography/diagram differ from the reference. |
| `/library` | Close — medium | Library grid retained; navigation works; local progress stays local; demo labeling replaces implied real account; smaller stats icons and public header differ from reference. |
| `/progress` | Material delta — medium | Progress state persists locally; reset works; layout hierarchy retained; result previews remain text rather than illustrated thumbnails; text scale is smaller than reference. |
| `/community` | Material delta — medium | Card spacing compacted; reaction selector fixed; local composer works; demo posts use text and initial avatars rather than reference thumbnails; unsupported social proof removed. |
| `/login` | Derived layout — no parity rating | No approved login mockup; consistent brand/header; responsive form; validation works; submission clearly describes unavailable real authentication. |
| Supplemental `/learn/n8n-google-sheets/3` | Close hierarchy — medium | Correct later lesson retained; reference subject closer; live workflow used; diagram geometry differs; content is not copied from screenshot. |
| Supplemental `/learn/gemini-slide-assignment/2` | Material delta — medium | Correct Gemini lesson; eight mobile slide cards now visible; horizontal preview overflow removed; template/task content remains below first fold; Malaysia Utility typography differs from reference serif styling. |

## Verification

- Production build: passed. See [build log](../artifacts/visual-qa/astra/build-final.log).
- TypeScript: passed. See [typecheck log](../artifacts/visual-qa/astra/typecheck-final.log).
- ESLint: passed. See [lint log](../artifacts/visual-qa/astra/lint-final.log).
- Playwright: **47 passed, 7 skipped, 0 failed**. Skips are explicit device guards. See [test log](../artifacts/visual-qa/astra/test-results-final.log).
- Geometry: **84 route/viewport results, no horizontal overflow, broken images or recorded page exceptions**.
- Behavior coverage includes navigation and menu keyboard handling, search/filter URL history, reverse scrolling, copy success/fallback, checkout preview focus, local lesson/progress persistence, malformed local storage, community demo interactions and honest login behavior.
- Runtime network audit distinguishes cancelled Next.js prefetches only when their request carries `next-router-prefetch: 1`. Such cancellations remain recorded separately; real failed requests and HTTP/console errors are findings. Live deployment verification is recorded separately in `RELEASE.md`.

## Preservation and limits

Protected original logo/n8n/Hermes assets and runtime copies were hash-verified. Original reference files were not edited by this repair. Four pre-existing deleted legacy mockups and untracked duplicate reference files are outside the repair and are not included in its commit. A recoverable pre-repair archive remains local under `artifacts/visual-qa/astra/recovery/`.

The remaining reader, progress and community differences above are visible in the comparison evidence. They are not labeled exact matches or hidden behind the successful engineering checks. Mobile catalog/tool ordering and illustrated result thumbnails need further design work for closer reference parity.
