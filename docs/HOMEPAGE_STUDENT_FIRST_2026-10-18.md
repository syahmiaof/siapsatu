# SiapSatu student-first homepage — 18 October 2026

## Implemented
- Preserved logo, Malaysian source artwork, H1, header and existing motion components.
- Hero subtitle follows approved wording. “Pilih hasil pertama” opens /modules?category=student.
- Audience chips are Student, Bisnes, Kerja with correct catalogue filters.
- Homepage selects gemini-slide-assignment, notebooklm-pdf-study and vibe-code-website explicitly. Presentation titles/themes are local; no global module records or featured flags changed.
- ModuleCard accepts optional displayTitle, showPrice (default true), actionLabel and theme. Homepage displays “Lihat modul” with arrow; catalogue pricing remains RM10.
- Student story includes choose → follow → understand/verify/explain, with GitHub entry. Business story links Meta Ads + AI and 7 Hari Content. Work story links Gemini Canvas and weekly reports. CommunityNotice remains last.
- Desktop spotlight now features the student slide outcome with Gemini icon and no price. Mobile menu and homepage have no visible RM10.
- DESIGN.md rules applied: navy structure, orange CTA, navy/crimson/green cards, Bricolage display + Manrope body, existing radii, semantic links, visible focus and reduced-motion handling. Approved brief supersedes old homepage pricing examples in DESIGN.md.

## Changed files
- src/app/page.tsx
- src/app/page.module.css
- src/components/modules/ModuleCard.tsx
- src/components/modules/ModuleCard.module.css
- src/components/navigation/DesktopMegaMenu.tsx
- tests/top5-repair.spec.ts
- tests/homepage-outcomes.spec.ts
- scripts/qa-homepage-student.mjs
- This report and artifacts/homepage-student-2026-10-18/

## Verification
Story: homepage outcome/audience link → existing catalogue data/filter or module detail → visible RM10 before purchase. No API, auth or payment integration was added.
- npm run typecheck: PASS.
- npm run build: PASS including lint/type validation and static generation. Initial lint failure from local variable named module corrected to selectedModule.
- npx playwright test tests/homepage-outcomes.spec.ts tests/top5-repair.spec.ts against production server localhost:3114: **18 passed, 2 expected desktop skips**, 43.6 seconds.
- Assertions cover all three outcome links, all eight editorial links, all audience filters and excluded results, catalogue card pricing, detail purchase price, price-free navigation, keyboard spotlight access/Escape restoration, hero Enter activation, mobile first card above dock, and existing directory/reader regressions.
- node scripts/qa-homepage-student.mjs: PASS at 1440×900, 768×1024, 390×844, 360×800; no horizontal overflow, no rendered broken images, no page errors. Normal and reduced motion inspected, including reverse scroll.
- One bounded visual repair pass: student story columns aligned at top; artwork scales down on 360px so the whole first card clears the dock. First card ends at y=719.875, dock begins y=732. At 390px: card bottom 752.875, dock y=776.
- git diff --check: PASS.
- Browser coverage: Chromium desktop/mobile emulation; not physical iOS/Safari testing.

## Screenshots
Under artifacts/homepage-student-2026-10-18/:
- home-1440-fold.png / home-1440-full.png / home-1440-motion.png
- home-768-fold.png / home-768-full.png / home-768-motion.png
- home-390-fold.png / home-390-full.png / home-390-motion.png
- home-360-fold.png / home-360-full.png / home-360-motion.png
- render-checks.json contains geometry, image, focus and error evidence.

Full-page captures include the fixed mobile dock at the initial viewport position; this is browser screenshot behaviour, not an in-flow duplicate dock.

## Limits and measurement
This release changes the homepage presentation and discovery flow. Existing preview checkout/auth/community and reader issues from INTERACTION_AUDIT_2026-10-18.md are not repaired by this pass.
No analytics provider or tracker added. No conversion/sales uplift claim.
Future funnel: hero CTA click → module-detail view → checkout start → purchase, segmented Student/Bisnes/Kerja. Purchase must eventually be measured from confirmed payment, not the demo checkout confirmation.

Deployment status will be recorded separately after Git push and production verification.
