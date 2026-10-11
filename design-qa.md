# Vetting Harbor — refined website design QA

final result: passed

Scope: authorized local visual/motion refinement of the concept website. Passing does not imply production operation, deployment or validated demand.

## Lifecycle static correction — supersedes prior translation behavior

final result: passed

After repeated user feedback, lifecycle status panels are excluded from scroll-piece animation and force transform/rotate/translate:none, overriding old inline animation styles. Verified on /sample-evidence-pack at775×804 after reload: allthree computed properties are none. Actual proof: screenshots/comments/sample-pack-static-lifecycle.jpg. Build passed. Other section motion remains enabled.

## Sample-pack lifecycle follow-up

final result: passed

Scroll tween explicitly fixes rotation at0 for life-stamp and the previously straightened cards, avoiding retained tilt in animation transforms. Sample evidence pack checked at775×804: zero rotation,0 document overflow, Changed and Expired states remain level. Actual capture: screenshots/comments/sample-pack-straight-lifecycle.jpg. Production build passes. Scroll translation is preserved.

## Product-card alignment follow-up

final result: passed

Publisher dossier, human-review note, review attestation and its nested version stamp are now unrotated across Products and individual module pages. Scroll translations remain. Verified at1440px and390px on allthree affected routes and visually at the annotated775px viewport. Computed transforms show identity matrices plus translation only (or none); document overflow0. Evidence: docs/straight-product-cards-checks.json, refreshed identity/attestation desktop/mobile renders and screenshots/comments/products-straight-*.jpg. Compared with user-provided tilted-card annotations. Build passed; no new behavior tests needed for this CSS-only correction.

## Latest browser-comment corrections

final result: passed

The user restored the Home hero cream background only (#f8f0e4); other chapter colors remain. Hero typography returned to wine/dark ink, with clay CTA and readable white arrow. Both hero-version-strip and life-stamp are unrotated, including scroll states. Shared CTA controls received consistent20px arrows, balanced padding,10px corners and refined border/shadow/hover treatment. Root cause of the oversized footer arrow: the footer logo img width selector also matched button icons. Selectors now exclude buttons at all breakpoints.

Checked1440,775 and390px widths:0 document overflow,0 oversized button icons, footer arrow20px, rotation-free matrices for both highlighted cards. Visually compared against the user's annotated screenshots; actual updated hero, straight strip/lifecycle and compact footer captures saved under screenshots/comments and refreshed hero paths. Platform mobile also checked for shared CTA contrast/layout. Production build passes. This targeted update supersedes the prior forest Home hero descriptions below; prior comparisons remain historical evidence.

## Comparison authority and truth

Original selected source: /Users/prajaktagaikwad/Downloads/ChatGPT Image 10 Oct 2026, 20_44_29.png,870×1808. Approved logo2 / Open Register remains. The latest request explicitly supersedes repeated cream backgrounds and reused inner-page raster heroes, and permits new cards, shapes, charts, tables and diagrams. Editorial brand, evidence storyline, five offers and synthetic boundaries remain.

Before/after actual browser renders were inspected together in screenshots/refinement/comparison-home-v2.png and comparison-platform-v2.png. Inputs are matching1440×1000 top-of-page desktop captures, normalized identically to900×625 with40px labeling band in1800×665 diagnostic boards. These composites are QA artifacts, not product screenshots. Final manifest, change, workflow, about, sandbox, attestation, independence and pricing captures were reviewed directly, alongside mobile hero and focused mobile attestation. Full mobile captures are390px wide with390×844 CSS viewport. The shot list records actual dimensions and states.

## Findings fixed

No unresolved actionable P0/P1/P2 findings in the refinement scope.

1. P2: repeated cream surfaces flattened the story. Added forest, lilac, peach, sage, sky, oxblood, plum and yellow environments. Header/footer intentionally retain the warm neutral brand surface. Inner editorial areas use near-white with colored native figures and distinct ending CTAs.
2. P2: inner pages reused the same evidence-book raster. All inner-page scenes now use subject-specific native visuals or unique About/Sandbox art. Only four original Home chapters use the four original raster assets, once each.
3. P2: entrance animations did not maintain scroll behavior. Every top-level public section now has a reversible chapter progress rail. Desktop headings, native pieces, cards and steps scrub with scroll, and the workflow connector draws. Existing sequential sticky version story and five-offer progression remain. Pause removes effects; mobile reduces movement.
4. P2: revised hero crop omitted a station. Changed to a contained3:2 frame. Final desktop/mobile captures show Identity, Scope, Tests and Report.
5. P2: identity note covered the source date. Moved note/tab into flow. Final mobile identity capture shows the documentation date and all facts.
6. P2: version stamp covered fictional issuer. Moved stamp into a separate row. Final desktop/mobile attestation captures show issuer, funding and validity unobstructed.
7. P2: dark pricing eyebrow and light CTA icons needed contrast. Light sage eyebrow and dark arrow overrides now read clearly in final captures; dark-module metadata inherits readable light color.
8. P2: some mobile product captures lost concept boundaries above the visual. VisualStage captions now precede the graphics, retaining DEMO/Synthetic labels in real renders.

## Five fidelity surfaces

Fonts/typography: licensed self-hosted Instrument Sans and Newsreader retained. Display, serif, body, table, field, status and small caps styles are distinct. Desktop/mobile wraps checked; essential facts remain editable semantic text, not raster substitutes.

Spacing/layout rhythm: full-width color chapters, offset manifests, dossier, report slip, timeline, field table, connected tiles, workbench and architectural art have different silhouettes. All27 public routes were checked at1440×1000 and390×844. Whole-document overflow is0; cards/tables fit or stack.

Colors/tokens: forest#203F37, lilac#E5DDF2, plum#312739, yellow#EEE2A6, terracotta#EDB6A0, ice#CFE2E6 complement approved wine/clay/sage. Functional statuses retain labels. Observed contrast issues on pricing, icons and module metadata were corrected.

Images/assets: new decision-harbor and sandbox-boundary illustrations use built-in ImageGen; project-local PNG masters and optimized WebP consumers retained. About and Sandbox use them uniquely. Products compact sandbox uses native ProtocolMatrix instead. Original four Home illustrations remain unique to their chapters. Native HTML/SVG visualizations are actual DOM, not generated dashboard screenshots.

Copy/content: all five proposed offers, both buyer roles, access/distribution requirements, independence/funding, consent, exact scope delta, source/test limits, expiry/revocation, price hypotheses and experiment criteria remain. Facts match synthetic fixtures. No safety score, real verification, universal certification, live telemetry or connected integration is claimed.

## Verification evidence

All27 routes checked again at desktop and mobile: headings present, no loaded broken images,0 document overflow. Desktop section count equals track count on every route. See docs/refinement-desktop-route-checks.json and refinement-mobile-route-checks.json. Final targeted checks after label/stamp fixes accompany these records.

Buyer-lane scroll progress0.548197→0.993065→0.65534 on reverse; card translation12.3786px→−3.7226px. Pause yielded0 tracks and normal-flow comparison; resume restored enabled state. About criteria CTA opens /results. Clearpath demo diff retains expected record/permission state. Refined local form success was exercised and desktop/mobile captures refreshed: details explicitly not sent/stored on server.

Build passes:52 modules; JS498.49KB/160.36KB gzip, CSS111.32KB/21.75KB gzip. All9 tests pass (five event receiver, four routing/packaging). Fresh browser logs after refinement have no warnings/errors. Prior demo/export/consent/keyboard checks are in docs/design-qa-initial.md and docs/QA.txt; demo-specific styling/services were not changed by public-page refinement.

## Accepted adaptations and limits

Newest user feedback governs palette, new graphics and ongoing motion; this intentionally supersedes pixel identity to the cream mock. Shared visual primitives remain coherent while arrangements/content/colors vary. Movement follows scroll rather than constant autoplay. Mobile limits heavy movement; Pause and reduced-motion rules give usable still states.

OS reduced-motion is implemented but the system flag was not changed; Pause was tested. No Lighthouse score, WCAG certification, physical-device audit, hosted production smoke test or genuine buyer validation is claimed. Deployment, real delivery/auth/analytics and operator/legal setup remain separate release work.

## Procurement worksheet correction

final result: passed

User-requested purchase-memo straightening applied globally. Compared actual775×804 render with annotated tilted source; computed transform and rotate are none, document overflow0. Evidence: screenshots/comments/procurement-straight-worksheet.jpg. Build passes.
