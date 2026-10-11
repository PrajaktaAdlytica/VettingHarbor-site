# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved refinement — 10 Oct 2026

The user explicitly superseded repeated cream section backgrounds and reused raster heroes. Retain approved Harbor Atlas typography, logo2/Open Register, complete brief coverage and synthetic-demo boundaries, while giving chapters varied forest/lilac/sky/terracotta/sage/plum/yellow environments. Use subject-specific native cards, figures, charts, tables and diagrams; the user expressly authorized these. Original four Home illustrations appear once each. About and Sandbox have separate new editorial imagery.

Scroll behavior must continue beyond entrance animations: reversible section progress, native piece/card scrub, connected workflow path draw and existing sticky version/module sequencing. Keep Pause, manual controls, accessible still states and reduced movement on mobile. Do not regress to the original repeated cream/raster treatments merely to match the initial mock.

## Targeted browser feedback — latest

Restore only the Home hero to the previous cream background (#f8f0e4) with wine/dark text and clay CTA. Retain varied colors in the remaining sections. Keep hero-version-strip and life-stamp unrotated at every viewport, including animated states. Shared CTA controls should have modest, consistent arrow icons and polished borders/hover states. Footer logo width selectors must exclude button icons.

Publisher dossier, human-review note and review attestation cards must also stay straight everywhere they are reused, including Products and individual module pages. Keep the nested version stamp level with its attestation. Preserve scroll translation without rotational tilt.

Lifecycle status panels must be fully static: exclude .life-stamp from scroll-piece animation and force no transform/rotate/translate, including stale inline animation styles.

The procurement purchase-gate worksheet (.purchase-memo) must remain straight, with no rotation or transform tilt.
