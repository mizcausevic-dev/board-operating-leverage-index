# Architecture

Board Operating Leverage Index is a static-friendly TypeScript executive-intelligence surface for showing where leadership already has scale-ready leverage, where drag still remains, and which owners are ready to expand the gains.

## Core flow

- `src/data/sampleVerticalBrief.ts` models operating-leverage lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness.
- `src/analyze.ts` scores leverage, drag pressure, owner readiness, reinvestment confidence, urgency, and annual leverage value while generating leverage findings.
- `src/services/verticalBriefService.ts` exposes the leverage-index, drag-pockets, scaling-motions, and risk-map packets used by both the app and prerender step.
- `src/services/render.ts` turns those packets into board-readable HTML routes plus a sample export.
- `scripts/prerender.ts` produces the static site and JSON payloads for GitHub Pages.

## Output shape

Each lane is designed to answer the same executive questions:

- where is leverage already compounding
- where is drag still open
- which owners are actually ready to scale
- which story can survive the next board or diligence room

## Guardrails

- synthetic data only
- read-only public surface
- no tenant credentials or private documents
- no compliance overclaim language
