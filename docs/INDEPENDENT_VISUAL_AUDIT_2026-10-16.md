# SiapSatu — independent reference audit (16 Oct 2026)

Scope: independently rendered the current local production build at `http://localhost:3112` across `/`, `/tools`, `/modules`, and n8n reader steps 2–3 at 1440×1024, 390×844, 360×800 and 768×1024. Compared first-fold screenshots to the approved PNGs in `mockups/`. The local Top 5 changes remain uncommitted/undeployed. A separate live-domain check confirmed that `/tools` still has the old zero-module link. This review evaluates visual fidelity, not just functional tests.

Evidence: [fresh local captures](../artifacts/visual-qa/top5/independent-review/), [Astra's normalized comparisons](../artifacts/visual-qa/top5/comparisons/contact.jpg), [homepage reference](../mockups/homepage-theme-03-malaysia-utility.png). Fresh capture geometry: 20 route/viewport checks, no horizontal overflow, broken images or page exceptions. Existing test results in `docs/VISUAL_QA.md` are Astra's, not rerun as part of this independent check.

## Verdict

**No, the UI is not yet the same as the references.** Page hierarchy and brand palette are recognizable; illustration, decorative composition, card detail and some mobile content order still have material differences. “Close” in the Top 5 report should be read as structurally close, not near-identical.

| Surface | Independent visual verdict | Main observed gap |
| --- | --- | --- |
| [Home desktop](../artifacts/visual-qa/top5/independent-review/1440-home-fold.png) | Structure close; visual identity **materially different** | Reference has flowing flag, visible KL landmarks, handwritten “Ilmu hari ini, hasil esok.”, logos on learners' devices, layered trio and a discussion-focused community scene. Current scene uses angular ribbon, simplified skyline, no handwritten note/device marks and repeats the hero trio below. Featured card marks/motifs are simpler; Gemini is blue rather than the multicolour reference mark. |
| [Home mobile](../artifacts/visual-qa/top5/independent-review/390-home-fold.png) | Usable, but no approved mobile Home reference for a 1:1 verdict | First card starts around y=604 at 390px; the art takes a separate 200px block. Mobile discovery is improved, but the hero-to-card storytelling differs from the desktop reference. |
| [Tools desktop](../artifacts/visual-qa/top5/independent-review/1440-tools-fold.png) | **Material delta** | Reference's ribbon fills the right hero with a large upward arrow and handwritten caption; current art is flatter/smaller. Grid order and logos differ, including neutral Codex/NotebookLM marks and a low-resolution Hermes image. Truthful module counts must remain different from invented reference counts. |
| [Tools mobile](../artifacts/visual-qa/top5/independent-review/390-tools-fold.png) | Improved; **material delta remains** | Featured six tools are now near the top, but heading/art overlap, hero crop, search placement, card dimensions/mark treatment and bottom-row selection do not match the reference's visual rhythm. |
| [Modules desktop](../artifacts/visual-qa/top5/independent-review/1440-modules-fold.png) | Structure close; **material delta** | Same general sections, but reference has illustrated hero that fills more of the frame and denser, more colourful secondary module cards. Current secondary cards are mostly text-first and quieter. |
| [Modules mobile](../artifacts/visual-qa/top5/independent-review/390-modules-fold.png) | **Material delta** | Reference shows four fully illustrated featured products; current catalog has three real featured products, changed outcome-led titles and close-up portrait crops. Keep real catalog/copy; do not fabricate a fourth product merely for the screenshot. |
| [Reader step 2](../artifacts/visual-qa/top5/independent-review/390-learn-n8n-google-sheets-2-fold.png) | Functional hierarchy; **high visual delta** | Desktop reference depicts step 3 and mobile reference depicts a Gemini lesson, so exact content parity is impossible. Current reader is denser sans-serif UI with workflow below the mobile fold; reference has editorial serif hierarchy and a prominent illustrated workflow/slide graphic. Preserve accurate step 2 content and compare its hierarchy rather than swapping lesson content. |

## Live versus local

- [Live homepage capture](../artifacts/visual-qa/top5/independent-review/live-home-1440.png) and [local homepage capture](../artifacts/visual-qa/top5/independent-review/local-home-1440.png) look effectively the same at 1440px; the homepage visual gap is present in both.
- Live `/tools` still renders `Claude` as an anchor to `/modules?search=Claude`. Local `/tools` renders it as a non-interactive upcoming article. The Top 5 fix has **not reached the live domain**.

## Highest-leverage next visual pass

1. Rebuild the **Home hero art direction** with a clean bespoke layered asset set: correct flowing ribbon, landmark skyline, device marks and handwritten note. Keep heading/CTA/people as separate accessible elements. This is the largest reason the screen feels unlike the reference.
2. Recompose the **Home community strip** with a distinct discussion scene and honest WhatsApp preview. Do not duplicate the hero trio or invent member counts.
3. Bring **Tools/mobile brand marks and hero composition** closer to the reference, while retaining real availability and counts. Use verified source marks only.
4. Restore **catalog card art density** and mobile featured-card framing, without creating fake modules.
5. Make the reader's **editorial hierarchy and workflow visual** closer to its reference while preserving the correct lesson and footer reachability.

For each repaired surface, capture a fresh same-viewport reference/final side-by-side and 50% overlay. This is a visual repair brief; the successful engineering tests do not certify pixel parity.
