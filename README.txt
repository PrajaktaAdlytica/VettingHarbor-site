VETTING HARBOR — HARBOR ATLAS WEBSITE + SYNTHETIC EVIDENCE WORKSPACE
Concept 8 / 10 Oct 2026
Approved visual direction: Harbor Atlas. Approved logo: option2 / Open Register.

RUN
  npm install
  npm run dev -- --host 127.0.0.1 --port 4188 --strictPort
  Open http://127.0.0.1:4188/
  npm run build
  node --test tests/*.test.mjs
  npm run preview -- --host 127.0.0.1 --port 4188 --strictPort
Production static output is dist/client. Product Design starter also creates a Sites worker/package, tested separately; Vercel is the preferred future deployment target.

WHAT IS BUILT
27 connected public pages including home, problem, portfolio and all5 individual offers, platform, workflow, both buyer solutions, evidence standard, independence, reviewer limits, sample pack, hypothetical pricing, pilot, about/contact, preview access, resources/results and privacy/terms. Custom404 recovery.
Demo: ten synthetic records, queue search/status filters, opened records, version diff, reproducibility protocol, source inspector, report section selector and labeled export, separate lifecycle presets, notification preview, local reviewer step, reset and data dictionary.
GSAP ScrollTrigger + Lenis, reversible public-section progress, native piece/card scrub, connector draw, sticky version-story and five-module progression, Pause and Skip. Forest/lilac/plum/sky/terracotta/sage/yellow chapters, subject-specific native visuals and two new unique illustrations. Four original Home scenes used once each. Mobile/short screens use native layouts and selectable story steps. Reduced-motion media queries render still content.

IMPORTANT OPERATING BOUNDARIES
Research-stage concept. No operating review product, real publisher verification, actual sandbox scanning, cryptographic signing, live monitoring, customer metrics, active integrations, payment or universal safety certification.
Forms prepare memory-only local drafts and explicitly say they are not sent. Downloads stay on the visitor's device. There is no lead inbox, identity provider, verified signup, interview booking or server lead persistence.
Analytics is optional, off by default, memory-only and never sent by this client. Its contexts distinguish public-preview from synthetic-demo. Revoke consent clears data. UTM/campaign/ad fields are allowlisted; no form contents or personal identifiers enter events.
An INACTIVE optional Vercel event adapter is included in api/events.js. It requires an approved origin and durable Redis REST store. It rejects preview/synthetic contexts, strips unexpected fields, deduplicates stable UUIDs using SET NX, and rejects untrusted signup/booking confirmations. Unit tests cover these boundaries. Production integration has not been exercised.

FILES
src/App.jsx: public routes, navigation, marketing sections, forms, preferences and motion
src/Demo.jsx: isolated synthetic workflow
src/data.js: five product definitions, public page content and ten consistent fixtures
src/utils.js: consent-aware preview instrumentation and labeled downloads
src/styles.css: base tokens, layouts and interaction states
src/refinement.css: varied chapter colors, native figure layouts and polish
src/Visuals.jsx: semantic cards, tables, charts, diagrams and illustration consumers
public/assets/: approved Open Register assets, licensed icons/Latin fonts, optimized original WebP illustrations
source-assets/: editable/master PNGs and original font source files; not published
screenshots/: actual in-app-browser renders, not generated screenshots
server/ + api/: optional inactive server event adapter
vercel.json: static SPA + optional API deployment configuration
.env.example: server-only configuration names; no credentials
LICENSES.txt and asset license files: attribution/provenance

VERCEL / GITHUB HANDOFF
1. Create or select the intended repository; exclude node_modules, .env files and local logs. Include package-lock.json and this source.
2. Import that repository into the intended Vercel project. Framework: Vite. Build: npm run build. Output: dist/client. Confirm SPA deep-link rewrites and api/events routing.
3. Keep analytics and forms in preview mode until a verified operator, privacy contact, retention policy, delivery adapter and any required double opt-in are approved. There is no frontend switch that silently begins transmitting leads.
4. Set only reviewed server values if enabling the optional event receiver; never expose tokens with a VITE_ prefix. Add rate limiting and retention/deletion enforcement before real telemetry use.
5. Supply the real public origin and absolute social preview URL, then replace noindex only when publication is approved. Run the production build and real-host checks again.
6. Register/clear the proposed brand/domain before connection. Configure DNS only for a domain the operator controls. No registration, trademark clearance or DNS changes have been performed.
7. Check desktop/mobile navigation, form error/success, consent revocation, fixture isolation, downloads, direct-route reloads, metadata and headers on the deployed host.
8. Preserve synthetic demo boundaries after launch. Actual buyer/publisher consent and field experiments are separate from website completion.

REVIEW
docs/brief-coverage.csv is the requirement-by-requirement build audit.
docs/QA.txt contains checks performed and limitations.
docs/EXPERIMENT.txt and experiment-readout.csv prepare the demand test.
docs/tracking-fields.csv prepares the future Notion field map; no Notion page was updated.
The existing research/IA and brand kit live beside this website folder. No external company profiles, ads or outreach were created.
