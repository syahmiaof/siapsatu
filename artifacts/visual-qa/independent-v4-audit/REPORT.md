# Independent UI-v4 audit — 17 October 2026

Read-only application audit of HEAD `31f8998` after Antigravity changes (`cd5c825`). Fresh public-domain captures at 1505×1029, DPR 1, reduced motion; additional Home capture at 390×844. Reference: repository DESIGN.md and approved mockups. No application changes or deployment performed.

## Verdict

UI v4 is live, but visual reference parity is not achieved. Four desktop routes returned HTTP 200 with no observed horizontal overflow or broken images. This is a capture audit, not a rerun of the full interaction suite.

| Route | Current finding |
|---|---|
| Home | Aligned cards and usable fold preserved. Hero skyline is high behind the white handwritten note instead of low right; emblem is smaller, arrow larger, ribbon contour and people proportions differ. Heading weight/width, CTA width and audience chips also differ. Matching card-row Y does not establish composition parity. |
| Tools | Four-column density broadly follows reference. Ribbon contour and arrow/note placement still differ. Real counts, upcoming tools and neutral tool marks are intentional content exceptions. |
| Path | Seated learner composition is recognizable. First card is saturated blue instead of pale blue. `m.colorClass` is applied to both card and numbered badge; `.step-01` overrides the card background, while higher-specificity nth-child rules protect the other three. CTA is partly below the 1029px fold, unlike the reference. |
| Community | Hero headline is a smaller single line; card padding and vertical gaps make the first post begin much lower than the reference. Mockup-derived thumbnails improve fidelity. Unsupported 'Ratusan learners' copy has returned, and the join CTA still opens a notice saying invitations are unavailable. |

## Why repeated reconstruction misses

The runtime combines regenerated people, authored vectors and independently positioned notes/logos. Each element can resemble the reference while their silhouettes, scale and overlaps differ. The v4 report's few Y-coordinate landmarks are insufficient evidence for a visual finish. The reference uses a coherent painted composition and display lettering that differs from browser-rendered DESIGN.md typography.

## Recommended asset approach

Use exact reference-derived decorative artwork wherever a clean crop or mask is possible; retain actual headings, navigation, buttons and cards as DOM. Community thumbnails already demonstrate this approach. A crop is itself an asset.

For Home, a rectangular crop of the full right side includes the Masuk button near the top and adjacent UI near the bottom/left. Mask/extract the illustration silhouette and exclude those UI elements. Preserve the original composition as one decorative image where possible; create a separately framed mobile variant. Embedded decorative handwriting is acceptable, but functional text/buttons should remain HTML. Source hero pixels are roughly 900px wide: suitable near that CSS width at DPR 1, with limited sharpness on high-DPR displays. Cropping preserves existing detail; it cannot recover hidden pixels or create additional resolution.

This is a change in asset-production method, not another round of approximate image generation. It addresses the largest illustration differences; typography, spacing and the Path/Community regressions still require CSS/content fixes.

## Evidence

- [Home reference versus fresh live](home-reference-vs-live.jpg)
- [Home](home.png), [Tools](tools.png), [Path](paths-ai-automation.png), [Community](community.png), [Home mobile](home-mobile.png)
- [Fresh route/status/image observations](current.json)

Original mockups and app code remain unchanged. Audit artifacts are local and uncommitted.
