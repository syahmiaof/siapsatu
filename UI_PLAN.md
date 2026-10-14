# UX / UI direction — planning draft

Date: 14 October 2026. No name or visual identity has been approved. The two generated images are **exploratory**, and their “Academy Syahmi” label is temporary. The product format confirmed afterward is text, images, direct tool links, templates and workflows, without video.

## Naming shortlist

| Name | Tagline | Why it works | Watch-out |
| --- | --- | --- | --- |
| **SiapSatu** (recommended working name) | Satu modul. Satu hasil. | Owns the small-finished-outcome mechanism; easy to remember; flexible beyond AI. | Sounds unusual on first read; check pronunciation with five target buyers. |
| MulaSiap | Mula hari ini, siap satu hasil. | Beginner-friendly and active. | Less distinctive in conversation. |
| TahuBuat | Dari tak tahu ke boleh buat. | Human and direct. | More colloquial; may feel less premium in B2B. |
| IlmuSiap | Belajar ringkas, hasil jelas. | Trustworthy education cue. | Feels closer to conventional tuition branding. |

Basic exact-name web searches on 14 October 2026 did not surface a clear learning brand for these compounds. This is **not** a uniqueness or availability guarantee. Before final naming, check [MyIPO trademark search](https://www.myipo.gov.my/ms/carian-cap-dagangan/), SSM/company name, `.my`/`.com` domains and TikTok/Instagram/WhatsApp handles. MyIPO also offers [preliminary advice and search](https://www.myipo.gov.my/applying-for-a-trademark/). Keep “Syahmi” as visible founder byline for trust even if the platform brand is independent.

## Visual thesis

An **editorial field manual for doing real work**: warm paper, dark ink, one clear red signal colour, large but precise type, annotated screenshots and a chapter index. A buyer should feel they are purchasing an actionable guide, not an endless course portal. This direction is a proposed world to test with users; it is not a final DESIGN.md.

- Public catalog: persuasive, clear price and outcomes.
- Learning area: quiet, readable and task-oriented; visual drama decreases after checkout.
- Distinctive element: each module has a numbered “result sheet” that shows the deliverable and the exact next action.
- Avoid generic gradient/AI illustrations, fake learner counts, fake instructor credentials, gamified confetti and large unreadable card grids.

## Screen map and key states

| Screen | First thing the user must know/do | Important states |
| --- | --- | --- |
| Landing | Choose a goal: grow business, work faster, or build a project | Anonymous, returning learner |
| Catalog/search | Filter by outcome, level, time, tool and cost | No match, new module, owned module |
| Module detail | See exact finished artifact, prerequisites, what is inside, last checked, RM10, external tool costs | Unsupported paid tool, already owned |
| Create account / checkout | Email first, clear total, payment method, consent choices | Payment cancelled, pending, paid, duplicate callback |
| My library | Continue purchased module and see next recommended result | Empty, in progress, completed |
| Reader | Read step, open official tool link, copy template, record progress | Broken external link, changed tool UI, offline/network failure |
| Completion | Confirm artifact finished and recommend one logical next module | Need help, retry, already bought next |
| Community entry | Join WhatsApp Community voluntarily after purchase | Joined, declined, invite expired |
| Support | Search module FAQ, ask AI grounded in approved content, escalate | AI uncertain, human queue |

Account should exist before purchase as requested, but use a low-friction sign-in such as email code or magic link. Purchase/access is a server-side entitlement per account and module. A payment webhook must be verified and processed idempotently; the browser redirect alone cannot grant access. Store consent for transactional email, WhatsApp access notification and marketing separately. WhatsApp group membership never proves a module entitlement.

## Reader page anatomy

1. Sticky compact chapter index and progress, with a clear “what you will finish”.
2. Every step has one heading, one concrete instruction, one annotated screenshot or image when the UI matters, and a direct official link to the exact tool/download page.
3. Copyable template plus a worked example next to a “cuba dengan kes anda” task.
4. “If your screen looks different” and last-verified date for fast-changing tools.
5. A final checklist that verifies a real output, not just that all sections were scrolled.
6. One next module justified by the output the learner just made.

Motion: GSAP may choreograph the public hero and learning-path transitions; use simple CSS feedback for buttons/progress, and avoid animation in long reading blocks. Respect reduced-motion preferences, keyboard navigation, visible focus, contrast and slower mobile devices. Animation must help orientation, not delay opening a link or copying a template.

## Existing Meta Ads module: evidence-led critique

Read-only browser review of [the live module](https://modul-meta-ads.syahmiaof.my/) on 14 October 2026 after entering the founder-provided password. The page has an accessible chapter menu, glossary analogies, direct Meta links, code-copy affordance and final checklist. Its ten chapters span Page setup through System User tokens and AI/MCP integration, so the content is materially more advanced and longer than one beginner micro-module.

### P0 — paid access model

The full chapter text was present in the browser's accessibility tree **before** the password was submitted. That means the page had already delivered the protected content to the client; the current password screen only hides it visually. For paid LMS access, move authorization and content delivery behind a verified account + entitlement on the server, including image/download assets; do not reuse the shared password gate as the purchase system.

### P0 — claims that can mislead or overgrant access

- The module calls System User tokens “KEKAL (Never-Expiring)” and asks for `Admin (Wajib)` plus Page `Full Control`. A token without a scheduled expiry can still be invalidated or revoked; full control grants broad capabilities. Teach the minimum permissions required for a specific exercise, then explain how to revoke/rotate. [Meta explains the reach of Page full control](https://www.facebook.com/help/289207354498410/r.php/).
- The `.env` example has `MAX_DAILY_AD_BUDGET_MYR = 15.00` and `DEFAULT_AD_STATUS = PAUSED`, followed by “Hard-Lock” and “RM0.00 spend” language. An environment variable alone does not enforce a budget; the connected application must validate every write operation and actual account/billing settings. Rewrite this as a sample configuration until enforcement is demonstrated.
- “Tanpa risiko akaun disekat atau bajet terbakar”, “self-healing” and automatic campaign changes read as guarantees. Separate a **read-only learning demo** from any real mutation, state prerequisites and approvals, and never imply the agent has a capability before a tested integration proves it.

### P1 — mismatch with the intended buyer

- The opening promises click-by-click guidance for non-technical users, but important Meta setup steps are mostly text without annotated current screenshots. Add images where a control must be located, alternate paths for changed UI and a last-checked date per chapter.
- Split the ten-chapter journey by results: (1) set up a Page/Business assets, (2) read ad metrics safely, (3) create a paused draft, (4) connect an approved agent workflow. Mark prerequisites and tool costs; one RM10 module should have one finish line.
- Tool names such as MCP, Graph API and `.env` should appear after the learner has a clear job and plain-language explanation. For an owner who only wants better ads, the first recommendation should be creative/measurement, not Developer App credentials.
- The source contains demo-looking IDs/secrets. Mark all sample values visibly as fake and provide a safe copy workflow that never asks a learner to paste live secrets into Community or support.

These are review findings, not a claim that the current module was changed or that a live Meta integration was tested.

## Mockup files and prompt provenance

- [catalog-desktop-concept.png](mockups/catalog-desktop-concept.png): generated with the built-in image tool. Prompt: high-fidelity 1440px desktop catalog concept for temporary “Academy Syahmi”; premium Malaysian editorial studio, warm paper/black/red, three outcome paths and RM10 modules, no generic dashboard or fabricated proof.
- [lesson-mobile-concept.png](mockups/lesson-mobile-concept.png): generated with the built-in image tool. Prompt: high-fidelity mobile module reader in the same visual world, clear progress and applied exercise for a WhatsApp-script topic. **The exercise controls are a visual exploration**; actual initial modules should prioritise text, images, links, templates and workflow as confirmed by the founder.
- [lesson-mobile-siapsatu-v2.png](mockups/lesson-mobile-siapsatu-v2.png): generated with the built-in image tool. Prompt: high-fidelity mobile reader for working brand “SiapSatu” with text steps, annotated slide-outline image, direct official-tool link, copyable prompt template and try-it task; explicitly no video or quiz. This is the better match for the confirmed module format.

Image-generated text and details must be checked before implementation; the mockups are a direction to critique, not production-ready UI specs.
