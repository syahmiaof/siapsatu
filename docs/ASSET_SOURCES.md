# SiapSatu asset provenance

Verified 15 October 2026. This replaces inaccurate descriptions of rectangular screenshot crops as isolated artwork. Simple Icons is a community-maintained library, not an official brand kit.

## Supplied originals

| Runtime file | Source | Treatment |
|---|---|---|
| `brand/siapsatu-logo.png` | `brand/logo-concepts/siapsatu-primary-final.png` | Original bytes preserved. |
| `brand/siapsatu-display.png` | Same logo | Exact-pixel crop `(99,213,1710,668)`, 1611 by 455. Meaningful alpha bounds approximately `(101,215,1706,664)`; near-transparent noise explains misleading full-image bounds. No redrawing. |
| `tools/n8n.png` | `brand/tool-logos/n8n-official.png` | Supplied bytes unchanged. Official label comes from the supplied filename. |
| `tools/hermes-agent.png` | `brand/tool-logos/hermes-agent-official.png` | Supplied bytes unchanged. Limited source resolution remains visible at large sizes. |

Runtime paths above are relative to `public/assets/`. SHA-256 checks: [protected assets](../artifacts/visual-qa/astra/protected-assets.json), [recovery verification](../artifacts/visual-qa/astra/recovery/protected-assets-verified.json). All three originals and runtime copies still match. This repair did not modify `brand/` or `mockups/`; unrelated deleted legacy references and added copies were already present in the workspace. `scripts/prepare_assets.py` only reproduces these copies and the logo crop. It does not crop mockup UI, invent marks, or overwrite provenance.

## Clean artwork

| Runtime asset | Creation and reference | Limits |
|---|---|---|
| `illustrations/learners-clean.png` | Generated transparent trio, guided by the approved Malaysia Utility homepage. | New illustration, not an exact extraction; different poses and silhouettes. No baked-in headings, navbar, buttons or prices. |
| `illustrations/learner-clean.png` | Generated transparent pointing learner and laptop, guided by the n8n reference. | Different pose; reused in supporting pages and mobile cards. |
| `illustrations/hermes-clean.png` | Generated transparent woman, laptop, books and mug, guided by the Hermes reference. | New illustration; simpler small-card composition. |
| Flag ribbon, crescent, 14-point star, arrow, skyline | Authored SVG in `BrandScene.tsx`. | Stylized brand decoration, not an official flag drawing; simplified skyline. |
| Workflow browser and nodes | Real HTML/CSS/Lucide in `WorkflowDiagram.tsx`, with supplied n8n mark. | Labelled `contoh visual`; does not claim a live integration ran. |
| Card decoration and avatars | Lucide icons, clean illustrations and initial-letter avatars. | Generic UI graphics and demo avatars, not real learners. |

Generated outputs: `exec-1fd48740-bd5e-4e36-aad0-2b0bf3ca3130.png`, `exec-cf375921-2f4d-4c6e-a915-2f1af37705d0.png`, `exec-e857bb0b-040e-45af-834e-54dec68ff13b.png` in this chat's generated-images folder. Runtime copies were inspected with transparency and in rendered pages.

## Tool marks

| Local name | Source / status | Treatment |
|---|---|---|
| Gemini | [Simple Icons 16.0.0 googlegemini](https://cdn.jsdelivr.net/npm/simple-icons@16.0.0/icons/googlegemini.svg) | Verified library geometry, blue tint, not the reference's multicolor rendering. |
| Claude | [Simple Icons 16.0.0 claude](https://cdn.jsdelivr.net/npm/simple-icons@16.0.0/icons/claude.svg) | Correct spokes replace unrelated Anthropic A; orange tint. |
| Cursor | [Simple Icons 16.0.0 cursor](https://cdn.jsdelivr.net/npm/simple-icons@16.0.0/icons/cursor.svg) | Verified library geometry replaces invented mark. |
| NotebookLM | Neutral `NLM` text | Library retrieval timed out. No official-logo claim. |
| Codex | Neutral `Codex` text | No independently verified distinct mark acquired. |
| Antigravity | Neutral `AG` text | No independently verified mark acquired. |
| ChatGPT, Perplexity, Make, Zapier, GitHub, Vercel, Canva, Figma, Notion, Meta, WhatsApp | Simple Icons 14.0.0, individual SVG URLs in evidence below | Retrieved and compared path geometry. All final paths agree. Vercel differed and was replaced with the sourced file. Some fills tinted locally; geometry preserved. OpenAI library mark used for ChatGPT. |
| Vibe Code | Authored generic angle-bracket icon | A learning-topic icon, not an official product mark. |

Exact URLs, hashes and retrieval results: [new marks](../artifacts/visual-qa/astra/logo-retrieval.json), [existing marks](../artifacts/visual-qa/astra/existing-logo-verification.json). Trademark ownership remains with the respective owners; no endorsement implied.

## Retired screenshot crops

Old `hero-learners.png`, `community-learners.png`, `n8n-hero-character.png`, `hermes-hero-character.png`, `path-hero-character.png`, avatar and thumbnail crops are historical rectangular portions of generated mockups. Some contain UI/text. They are retained as historical files, **not isolated artwork**, and are not rendered by rebuilt route components. Dormant mock-data image paths do not constitute runtime usage.

The later `hero-malaysia-utility.png` was visually inspected during recovery: it includes baked-in navigation, a login button, text fragments and a sticky note. It has been removed from `BrandScene` runtime usage. `community-discussion.png` is another rectangular reference crop; the shared notice now uses the clean transparent trio instead. Both files remain on disk for recovery history, not as approved runtime assets. The prior implementation and screenshots are archived under `artifacts/visual-qa/astra/recovery/`.


## Top 5 local repair — 16 Oct 2026

No raster asset or approved mockup was changed or newly generated in this sprint. The exact supplied logo, n8n and Hermes files still match their recorded SHA-256 hashes: [fresh verification](../artifacts/visual-qa/top5/protected-assets.json). All eight selected approved references match HEAD blobs: [reference integrity](../artifacts/visual-qa/top5/reference-integrity.json). The four deleted legacy mockups were already deleted in the [initial worktree](../artifacts/visual-qa/top5/status-before.txt).

- `BrandScene` separates the crescent/star into an aspect-preserving SVG and adds simplified KL tower/twin-tower bridge accents. The ribbon remains stylized decoration.
- Directory mobile art reuses `learner-clean.png` with CSS placement. It is not extracted from a mockup; its pointing pose differs from the reference.
- Mobile featured cards reuse `learners-clean.png` inside CSS crop windows for the three characters. CSS clipping suppresses a neighbouring head on the middle crop. Original bytes remain untouched; the close portrait crops differ from the full torso poses in the approved card art.
- The community strip adds a decorative Lucide conversation icon above the existing clean trio. The demo/community copy remains factual and does not invent membership figures.
- All new card titles, badges, counts and reader controls are selectable DOM text. There is no screenshot used as interface or as a baked-in text illustration.

## Reference-parity pass 2 — 16 Oct 2026

This section supersedes the Top 5 runtime-art descriptions above for Home, the catalog, directory and n8n reader. Historical assets remain recoverable. [Integrity proof](../artifacts/visual-qa/parity-v2/integrity.json) verifies all 247 Top 5 evidence files, eight approved references and three protected source/runtime asset pairs unchanged.

### New transparent artwork

Five reference-guided illustrations were generated using the built-in `imagegen` tool with `transparent_background: true`, then copied into this workspace. These are reconstructed illustrations, **not exact extractions of the original illustrator's layers**. They contain no navigation, prices, headings or card UI. Device covers were generated plain; separate SiapSatu symbol graphics are composed in the browser.

| Runtime asset under `public/assets/illustrations/parity-v2/` | Reference and purpose | Optimized output |
|---|---|---|
| `hero-trio-1400.webp`, `hero-trio-800.webp` | Approved Home hero: navy shirt man looking left, hijab woman, shorter orange hoodie man; layered waist crop | 147,298 / 70,886 bytes |
| `discussion-1200.webp`, `discussion-650.webp` | Approved Home community strip: three people talking around a laptop, speech/group bubbles; distinct poses from hero | 103,046 / 46,358 bytes |
| `portrait-male-500.webp` | Approved mobile catalog's first card; full head, torso, hands and laptop | 56,118 bytes |
| `portrait-woman-500.webp` | Approved mobile catalog's second card; hijab, white blouse, tablet | 55,950 bytes |
| `portrait-coder-500.webp` | Approved mobile catalog's third card; orange hoodie, glasses and tablet | 65,046 bytes |

Original generated PNGs are preserved in [source-art](../artifacts/visual-qa/parity-v2/source-art/). The [manifest](../artifacts/visual-qa/parity-v2/source-art/manifest.json) records filenames, SHA-256, alpha crop bounds, dimensions and output sizes. Exact [scene prompts](../artifacts/visual-qa/parity-v2/source-art/scene-prompts.json) and [portrait prompts](../artifacts/visual-qa/parity-v2/source-art/portrait-prompts.json) are saved. Portrait prompts used `mockups/modules-catalog-mobile.png`; scene prompts used `mockups/homepage-theme-03-malaysia-utility.png`.

Reproduce derivatives with `python scripts/prepare-parity-art.py` (Pillow, OpenCV, NumPy, FontTools/Brotli). The script prefers preserved workspace originals, removes disconnected alpha islands under 100 pixels, crops to alpha bounds and emits WebP at quality 88. A threshold of 220 isolates the portraits' opaque white-edged silhouette from the generated low-alpha glow; the two scene assets use threshold 12 to retain their soft edge. This masking was explicitly permitted by the brief. [Checkerboard and unscaled edge inspection](../artifacts/visual-qa/parity-v2/alpha-edge-inspection.png) shows actual transparency at 100% in the right-hand panels. No mockup rectangle is used as live UI.

### Deterministic artwork, marks and typography

- `MalaysiaBackdrop.tsx`: authored SVG curves, crescent, fourteen-point star, green arrow, yellow city circle, Petronas bridge and Menara KL silhouette. Stylized cultural decoration, not an official flag specification.
- `DirectoryArtwork.tsx`: separate wide banner composition and mobile portrait; handwritten caption remains selectable DOM.
- `ReaderArtwork.tsx`: illustration plus separate n8n tile and generic spreadsheet/play icon. The spreadsheet icon is Lucide, **not a claimed official Google Sheets mark**. It illustrates the lesson and is not evidence of an executed workflow.
- `CardMotif.tsx`: authored growth arrow, document stack and browser-window motifs. Vibe Code's navy `Code2` is a generic topic icon, not an official product brand.
- `public/assets/brand/siapsatu-symbol-v2.webp`: nondestructive derivative of `siapsatu-display.png`, crop `(0,0,470,455)`, downsampled to 160×155 lossless WebP. Reproduced by the preparation script. Protected original logo files unchanged.
- `public/assets/tools/gemini-google-v2.png`: multicolour source found in the live [Google Gemini page](https://gemini.google.com/) and downloaded from [Google's static asset](https://www.gstatic.com/lamda/images/gemini_sparkle_4g_512_lt_f94943af3be039176192d.png). Retrieval URL/hash recorded in [sourced-assets.json](../artifacts/visual-qa/parity-v2/sourced-assets.json). Used to identify Gemini, with no affiliation or endorsement claim. This replaces the earlier monochrome runtime mark while keeping its file intact.
- `public/assets/fonts/Kalam-latin-v2.woff2`: Latin subset of [Google Fonts Kalam Regular](https://github.com/google/fonts/tree/main/ofl/kalam), with original TTF and SIL Open Font License preserved beside it. The preparation script subsets Unicode 32–255. Loaded locally with `font-display: swap`; used only for handwritten notes. Main UI retains DESIGN.md's Bricolage Grotesque/Manrope.
- ChatGPT's verified library geometry is presented white on a green tile with CSS; supplied n8n/Hermes bitmaps fill their tiles without modifying bytes. Codex/NotebookLM/Antigravity retain clearly neutral text marks because distinct verified assets were not acquired. Hermes remains visibly source-resolution limited.

The WhatsApp preview uses an abstract group icon instead of invented member avatars. No learner totals, reviews, invitation availability or payment/backend capability is asserted by the artwork.

## UI / asset / layout repair v3 — 16 Oct 2026

Home retains the clean parity-v2 trio and distinct discussion image; their original provenance above still applies. The SiapSatu wordmark, protected n8n/Hermes assets, mockups, Top 5 and parity-v2 evidence are unchanged.

- New authored SVG layers in public/assets/illustrations/ui-v3/: home-ribbon.svg, path-ribbon.svg, community-ribbon.svg, emblem.svg, growth-arrow.svg, kl-skyline.svg. These are original project vectors derived visually from the approved compositions, not official flag reproductions. The emblem has 14 outer star points and an intrinsic 162:100 ratio; it is separate from fabric paths, with no aspect-ratio slice crop. Skyline reuses the previous authored twin towers/bridge and Menara KL geometry. Home, Tools, Path and Community have separate scene arrangements. Handwritten/practical notes and all UI copy remain DOM text.
- Path seated learner generated with built-in imagegen using the approved learning-path reference and transparent_background=true. Original PNG, exact prompt and export manifest: [v3 source art](../artifacts/visual-qa/ui-v3/source-art/). This reconstructs the pose; it is not an exact original illustrator layer. Generated output has no third-party stock licence assertion. Project usage follows the image generation service terms.
- [prepare-ui-v3-art.py](../scripts/prepare-ui-v3-art.py) retains the largest alpha component above 200, trims 3% off the desk baseline to remove generated flecks, then exports 1100x741 and 600x404 WebP. Original is unchanged. [100% checkerboard inspection](../artifacts/visual-qa/ui-v3/source-art/alpha-100-percent.png) records clean transparent boundaries; silhouette is viewed at native scale.
- Path symbols: existing protected n8n source and verified ChatGPT geometry; Lucide Sheet/Mail are generic workflow symbols, not claimed official Sheets/Gmail logos. Separate laptop brand symbol is the existing approved derivative.
- CommunityArtwork uses the distinct discussion trio and authored ribbon/skyline. DemoThumbnail renders illustrative tools digest, portfolio and workflow examples in DOM/SVG, with explicit example captions. These are not actual student work. Small illustrated avatars reuse the v2 characters and are labelled Watak demo. Counts are explicitly Suka demo / Balasan demo; actions remain local. No invented membership, testimonial evidence, WhatsApp availability, certificate or bundle pricing was added.

Artwork has been reconstructed from visual references; differences in linework and exact pose remain documented in VISUAL_QA.md.
