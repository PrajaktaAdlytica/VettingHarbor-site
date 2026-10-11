# Vetting Harbor — final prototype design QA

final result: passed

Scope: the authorized Harbor Atlas concept website and isolated synthetic demo. Passing this visual and local interaction gate does not imply deployment, active lead collection, production security review, or customer validation.

## Comparison truth and state

- Source: `/Users/prajaktagaikwad/Downloads/ChatGPT Image 10 Oct 2026, 20_44_29.png`, 870×1808 pixels, user-selected Harbor Atlas visual direction.
- Implementation: `http://127.0.0.1:4188/`, actual browser renders under `screenshots/`. Desktop CSS viewport and captured pixel dimensions1440×1000; mobile390×844. Browser captures are1pixel per CSS pixel, no device frame.
- Hero source crop0,0→870,462 normalized to1440×765; implementation crop0,0→1440,765. Combined input `screenshots/comparison-hero-final.png`2880×805 with40px labeling band. Focused input `comparison-hero-details.png`1240×510 compares actual type/CTA regions at identical scale. These are diagnostic comparison boards, not product screenshots.
- Offers source crop0,962→870,1410; governance0,1410→870,1738. Compared to actual chapter regions from desktop-five-offers.jpg and desktop-governance.jpg. `comparison-offers-final.png` and `comparison-governance-final.png` retain each aspect ratio in equal1000px panels; intentional expanded copy/control density means these are direction comparisons, not pixel-equality measurements.
- Desktop state: light theme; fully settled entrance animations; offers Behavior step selected; governance static roles. Actual mobile native layout has no separate source mobile mock, so responsive usability is reviewed independently.
- Explicit user change: approved logo option2/Open Register replaces the preliminary mark drawn in the reference. The provided approved SVG/PNG brand assets are used, not recreated in code.

## Findings and comparison history

No unresolved actionable P0/P1/P2 findings in the final concept-preview scope.

1. **P2 — hero typography/CTA lacked the source hierarchy.** Earlier comparison-hero-before.png showed smaller, heavier headline and compact CTA. Fixed desktop68px/450weight/-.04em tracking and16px/60px CTA; mobile42px/450. Post-fix full view and focused type/CTA comparison confirm the two-line headline and clear CTA hierarchy. Brand palette provides a darker clay CTA than the raster mock; accepted for contrast and approved kit consistency.
2. **P2 — mobile image crop omitted the report station.** Earlier mobile-hero-before.jpg used an overwide crop. Changed the mobile image to100% width. mobile-hero.jpg now shows Identity, Scope, Tests and Report with the sample-data label.
3. **P2 — mobile resize revealed12px document overflow.** Desktop GSAP entrance transforms persisted during resize. Small-screen data-reveal transforms are now disabled and opacity is1. All27 mobile routes report0 document overflow; mobile hero/demo/confirmation captures verified.
4. **P2 — paragraph selector enlarged/wrapped chapter eyebrows.** Added specific eyebrow sizes and limited offers paragraph max-width to non-eyebrow copy. Final desktop-five-offers.jpg has a balanced two-line caption; governance/source type hierarchy is legible.
5. **P2 — illustration multiply blend dulled the paper assets.** Removed multiply treatment. Final combined offers/governance boards preserve light cream paper, sage routes and sky surfaces. Scenes are custom raster assets generated with the selected reference, not CSS drawings or copied competitor imagery.
6. **P2 — form shrink hid the success confirmation.** Earlier desktop capture showed only the bottom of the success panel. Added success focus and scroll to the panel. Final desktop-form-success.jpg and mobile-form-success.jpg show the complete local-only confirmation and download/edit actions. Focus lands on “Your pilot draft is ready.”
7. **Runtime polish — missing GSAP targets on inner pages.** Guarded selectors before constructing animations. Fresh browser logs since16:00UTC show no warnings/errors; old warnings remain in tab history only.

## Five fidelity surfaces

- **Fonts/typography:** self-hosted Instrument Sans UI/display and Newsreader editorial italic/serif, with OFL licenses. Fonts reported loaded. Source's restrained humanist hierarchy is retained; secondary editorial serif is an approved brand adaptation. Large headlines, small caps, table labels, body text and mobile wraps checked. No essential text truncated.
- **Spacing/layout rhythm:** warm hero, peach sticky comparison, sage five-station panorama, two buyer lanes, oxblood process, sky report/governance and cream lifecycle/pricing/form. Consistent gutters with distinct chapter grids. Small screens stack and expose manual controls. More pages and explicit boundaries expand the initial five-section raster reference as required by the full brief.
- **Colors/tokens:** chalk#F8F3E8, wine#4B252B, sage#C6D8BE, clay#A4472E, peach#F1D6C6, sky#D6E5E9, honey#EBCB83. Functional text/focus/status contrast reviewed, statuses use labels as well as color. Removal of multiply blend corrected image color drift. No invented trust score or certification seal.
- **Image quality/assets:** original reference-guided hero, folios, five-station atlas and open report; optimized WebP with full-resolution masters retained outside public. Browser captures show sharp paper artwork and no clipped critical stations. Approved logo/favicons are real brand assets. Licensed Lucide interface icons and official social icons are attributed. No fake customer portraits/logos or pasted generated dashboard screenshot: the demo is rendered HTML controls.
- **Copy/content:** source headline retained; exact v1.2/v1.3 permission delta, sample age, issuer/funding and limits shown. All five separate offers preserved with hypothesis labels. Marketplace and procurement workflows, evidence-use conditions, independence, reviewer limits and experiment criteria are explicit. “Safer decisions” aspiration in the preliminary raster is replaced with narrower evidence language. No operating product, universal certification, live integration, accepted pricing or invented customer claim.

## Interactions and evidence

Navigation, menus/Escape, story forward/reverse/manual/Skip, Pause, five-module selection, lifecycle states, pricing and CTA routes, form errors/success, queue search/filter/empty state, source inspector, local reviewer next step, report selectors/export, reset and dictionary were exercised. Consent opt-in/revoke and fixture isolation reviewed. Export `docs/DEMO-clearpath-evidence-pack.txt` was obtained from the browser download.

27 desktop and27 mobile route results are in `docs/desktop-route-checks.json` and `docs/mobile-route-checks.json`. Tablet home checked at768×600. Desktop/mobile paired captures cover hero, workflow, pricing, demo queue/detail/diff/report and form success. Screenshot index records real dimensions, states and source provenance. Production build and all9 automated tests pass; these supplement, not replace, browser evidence.

## Accepted adaptations / residual test gaps

The reference was an art-direction concept, not a full product specification. Original illustrations use new camera angles/arrangement, approved logo2 and a richer real navigation. The governance panel uses a continuous sky surface; full individual offer/report pages and native workspace states were added to satisfy the brief. These intentional adaptations retain the visual language without implying pixel identity.

P3 follow-up: browser-specific font rasterization and optional fine asset/background seam tuning on additional physical devices. OS reduced-motion media behavior is implemented but the OS switch was not changed; Pause was tested. No Lighthouse score, assistive-technology certification, live lead/analytics integration, hosted Vercel smoke test or real buyer experiment is claimed.

## Implementation checklist

- [x] Compare source and final browser render together, including focused type/CTA regions.
- [x] Fix actionable responsive, hierarchy, image treatment and feedback findings.
- [x] Verify all five offers, current-version limits and synthetic boundaries.
- [x] Capture desktop/mobile core flows and labeled export.
- [x] Pass build/tests and prepare deployment/experiment runbook.
- [ ] Configure real operator, delivery, approved hosting/domain and field study separately before launch.
