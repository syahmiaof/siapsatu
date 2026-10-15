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
