# Gappy LP V2 — Attio fidelity pass

Baseline: `e5ad031451c723d3c624d64f4eba918e79c990e5`.

Scope: homepage visual composition and interaction only, JP and EN. The canonical specification files, localized content model, pure product state machine, routes, Travel components, metadata, acquisition APIs, and environment configuration are unchanged. No cloud deployment, push, merge or Production change.

## Composition changes

- Hero: oversized editorial headline above an offset product canvas. The original requirements window retains its Gappy sidebar; readiness is detached on the page grid, and an activity rail overlaps the lower edge. The 86% value, unresolved count, evidence count and requirements remain the same synthetic product state.
- Product Proof: full-width, ruled progression instead of left copy/right screenshot. Booking detail, readiness and operational evidence occupy distinct columns.
- Workflow: one sticky product stage with four genuinely different component trees, driven by scroll position and native section links. Sticky labels remain outside the product surface. Execution detaches the readiness ring from the dark activity rail. Mobile keeps the controlled accordion.
- Verification: centered editorial statement, isolated dark response fragment, light requirements matrix and bordered verification result. The existing explicit check → checking → verified state machine and timing are untouched.
- Recovery: tinted chapter, large 100 → 76 → 100 controls, independent readiness, invalidation and candidate fragments. Existing recovery selection, keyboard and scroll synchronization are untouched.
- Context: centered full-width dark chapter and ruled information grid. Architecture follows with a 2×2 design-principle matrix, not another copy/screenshot split.
- Proof and CTA: ruled editorial index and large dark closing statement. Existing destinations and copy meaning retained.

Marketing shadows removed; only the hero product window has a restrained shadow. Smaller radii, fewer status-pill backgrounds, fewer decorative panel icons. No decorative gradients or new assets/dependencies.

## Actual side-by-side review

Used the locally supplied Attio `01_hero.jpg` and `03_platform_intro.jpg`, displayed alongside Gappy desktop screenshots in an internal local comparison page. Reference images are outside the repository and public assets. The Attio hero capture does not contain its animated headline; typography comparison therefore uses the Platform reference, not the blank area.

| Dimension | Comparison finding | Final correction |
| --- | --- | --- |
| Whitespace | Initial fidelity Hero still vertically overextended. | Reduced top spacing and product title/row padding; moved the isolated 86% ring into the lower-left empty canvas without obstructing CTA copy. |
| Hierarchy | Original homepage gave headline and dashboard equal column weight. | Dominant full-width headline; subordinate short body column; product enters below and beyond that column. |
| Rhythm | Repeated light split sections flattened the story. | Full-width proof → sticky workflow → centered verification → tinted recovery → dark context/matrix → light proof → dark CTA. |
| Product integration | Initial execution state remained one dark rectangle. | Readiness sits directly on the tinted canvas; activity rail offsets into the grid boundary. Evidence and candidate fragments retain dark operational identity. |
| Type scale | Chapter headings looked like ordinary section titles. | EN up to 68px / JP up to 54px; Hero EN96px / JP82px at desktop; localized responsive sizes preserved. |
| Density | UI needed to remain operational without a repeated browser frame. | One hero shell; elsewhere tables, evidence, ring, checks, activity and candidate surfaces—not raster screenshots. |
| Borders | Pill/card styling competed with structure. | 1px grid boundaries, neutral surfaces, square status text, restrained window radius. |
| Variety | Same two-column template repeated. | Offset hero, wide progression, pinned stage, centered verification, numeral-led recovery, full dark diagram, 2×2 controls and proof index. |

One explicit correction loop followed the side-by-side comparison, with final captures compared again. This moves the page toward the reference's compositional discipline rather than matching CRM content or brand colour. It is not a claim of pixel parity or human visual acceptance.

## Build-only issue caught and fixed

The first optimized build exposed CSS import-order conflict: dynamic home chrome could load the old stylesheet after the new fidelity stylesheet. The development server did not expose it. The fidelity rules now share the existing homepage stylesheet, preserving deterministic order. The optimized build was rebuilt and visually retested; computed Hero layout is `block`, JP heading is 82px at 1440px. Broken interim optimized captures were replaced, not delivered as final evidence.

## Tests and browser evidence

Final chained command exited 0:

- `npm run lint` — pass, no ESLint warnings/errors.
- `npx tsc --noEmit` — pass.
- `npm run test:home-v2` — 11 groups pass; includes single evolving workflow canvas, readable fallback, observer cleanup and no decorative gradients.
- `npm run test:travel-demo` — pass.
- `npm run test:travel-acquisition` — pass.
- `npm run test:travel-localization` — pass.
- `npm run build` — pass; home first-load JS remains 124kB.
- `git diff --check` — pass.

Browser verification used the optimized local build on port3020, through the connected Chrome browser:

- JP/EN at 375, 390, 430, 768, 1024, 1440px: no horizontal body overflow (12/12).
- Desktop workflow: identify → execute → verify → recover, one visible canvas, distinct booking/requirements, readiness/activity, evidence and candidate component trees. Keyboard activation of section links verified.
- Mobile accordion: `[false,false,true,false]` after selecting verification; exactly one panel open.
- Mobile menu: modal opens, scroll locks; Escape closes and restores focus to menu.
- JP/EN verification: explicit action enters checking then ready; readiness becomes100 only after checks. Pure transition regression still passes.
- Recovery:76 on invalidation/evaluation; ArrowRight selects recovered100. No state-machine changes.
- Reduced motion: sticky workflow hidden, four readable fallback scenes; static recovery visible.
- JavaScript disabled: four readable workflow scenes and static recovery, with the existing explanatory notice.
- Console: final optimized local warning/error collection empty.
- Network:133 requests in a non-truncated trace, no POST requests during the captured homepage interactions.
- Sampled rendered text contrast: no failures in the final JP DOM using computed foreground/nearest opaque background. Not a comprehensive WCAG audit.
- `/travel`, `/ja/travel`, `/technology`, `/ja/about`: expected heading/title, no home implementation mounted. Route source and Travel components unchanged.

The initial dev load had a transient chunk syntax error during server/build switching; it was not present after reload or in the final optimized session. Existing Node type-stripping, stale browser-data and Next lint deprecation messages remain tooling warnings, not disabled checks. Remote CI was not run because no push was authorized/performed.

## Review artifact

External directory `Gappy_LP_V2_Attio_Fidelity_Review` contains before/after comparison PNGs, desktop/mobile/full-page final PNGs, interaction states, exact test log and JSON evidence. Internal reference images are deliberately not in Git/public assets. Full-page captures cannot demonstrate a changing sticky canvas; the separate workflow state captures and local interaction provide that evidence.

Known remaining P0/P1: none in the tested scope. Human visual acceptance remains pending. Production deployment is not authorized by this pass.

**GAPPY LP V2 — ATTIO FIDELITY PASS COMPLETE**
