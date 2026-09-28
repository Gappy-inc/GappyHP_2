# Gappy LP V2 — Phase C implementation and QA

Date: 2026-09-29. Local-only implementation on `feat/home-v2-product-led`, based on main `bcd5821e3d25490204b365319869530e25c37704`. No push, merge, Vercel deployment, database, environment, or Production changes.

## Specification freeze

The approved files are included byte-for-byte and checked by `test:home-v2`:

- `GAPPY_LP_V2_SPEC.md`: SHA-256 `2e921cd45caaebf2083e39cacc3f947cfc1cac39657ec370d16a482bdbd4bd41`
- `GAPPY_LP_V2_SECTION_MAP.md`: SHA-256 `f8f31f11fa70ff0b9706d947a7bf7b974c6dc0135a586b7961ac9d008d8f059e`

Scope clarification: the latest Phase C request explicitly requires both JP and EN. Both homepages are implemented despite the earlier Phase B rollout restriction to JP. The frozen documents were not rewritten. Travel and unrelated corporate content remain unchanged.

## Final section order

Navigation → Hero → Product Proof → Workflow → Verification → Recovery → Operational Context → Architecture → Verifiable Proof → Final CTA → Footer.

## Product UI fidelity and claims

Primary source: public Gappy interactive demo at `https://gappy-workforce-lab-0925.mitsuki222581.chatgpt.site/`. The supplied product PNGs inform dark navy/lime shell, navigation, dense requirements, activity, evidence and readiness composition. Attio references inform marketing typography, spacing and rules, not copied components.

| Section | Source and implementation |
| --- | --- |
| Hero | Canonical demo's 86% state, one unresolved item, 12 evidence records, operational requirements and agent activity. |
| Product Proof | Source-backed synthetic progression 42 → 57 → 71 → 86 → reply/checks → 100. Intermediate unknown evidence/count values are omitted. |
| Workflow | Four distinct rendered operational surfaces: identify, execute, verify and recover. No identical screenshot with only caption swaps. |
| Verification | Reply remains 86%; explicit checks precede verified evidence and 100%. Manual action, not automatic completion on arrival. |
| Recovery | Source story 100 → 76 → 100 with invalidated prior verification, replacement candidate and five checks. Synthetic story controls do not execute real operations. |
| Context | Eight information categories; explicitly not an assertion of connected vendors. |
| Architecture | Four design principles; explicitly not certification or third-party integration proof. |
| Verifiable Proof | Three links to inspect the public synthetic demo, not customer testimonials or production case studies. |

No unsupported customer logos, benchmarks, ROI uplift, production deployment claims, self-serve SaaS claims, or provider integrations added. No competitor screenshots or supplied illustrative logos in public assets. The supplied MP4 is not embedded because it is not a verified localized media contract for this phase. Existing Travel media is unchanged.

## Visual correction loop 1

Initial screenshots exposed these P1 issues, then corrected:

1. Hero product was too tall and headline vertically detached: top-aligned 5:7 layout, compact readiness/activity grouping.
2. Operational text was too small: product metadata raised to at least 13px in key UI; clearer task hierarchy and contrast.
3. Repeated split compositions: Product Proof 4:8, Context 5:7, proof as ruled editorial rows rather than generic cards.
4. Mobile duplicated desktop density: compact hero with three requirements, one activity, secondary text CTA and controlled workflow accordion.
5. Recovery lacked sufficient keyboard access: arrow/Home/End controls; static readable fallback for reduced motion and no JavaScript.

## Visual correction loop 2

Round 2 inspection exposed these P1 issues, then corrected:

1. Recovery state evidence competed with narrative: 4:8 narrative/state and 7:5 internal panel, all three percentages visible in one desktop viewport.
2. Manual state selection could be alongside the wrong chapter: selecting a state synchronizes the scroll chapter.
3. Seven small text contrast findings (4.14/3.87:1): darker metadata colour; final sampled computed-text check had zero failures.
4. Tablet workflow lost useful navigation: retain controlled desktop navigation at tablet widths, reserve accordion for mobile.
5. Reply/checking distinction needed explicit UI: five pending checks in the conditions stage; completion remains guarded.
6. Shared navigation could load home styles on corporate routes: dynamic home navigation/footer boundaries; rendered verification confirms no home CSS on 14 other routes.

Final Round 3 captures are the review candidates. Human visual acceptance is pending; this document does not grant it.

## Functional browser QA

Local production-format server: `npm run start -- --port 3020`, after a successful build. Chrome controlled through the browser tool.

| Check | Result |
| --- | --- |
| JP and EN at 375, 390, 430, 768, 1024, 1440px | PASS: body width equals viewport, no visible element overflow. |
| Product stages | PASS: 57 → 71 → 86; reply remains 86; five checks; complete 100. |
| Verification JP/EN | PASS: explicit action, checking, 100%; replay resets to 86. Keyboard Enter checked. |
| Recovery | PASS: invalidation 76, replacement evaluation, recovered 100; arrow/Home/End controls and chapter alignment. |
| Mobile workflow | PASS: one panel open; choosing active panel does not leave all panels closed. |
| Mobile navigation | PASS: native modal, body scroll lock, focus containment, Escape and focus restoration. |
| Reduced motion | PASS: hero animation disabled, static three-state recovery, instant manual verification transition. |
| JavaScript disabled | PASS: readable workflow and recovery fallback; explicit no-JS notice. |
| Metadata | PASS: localized title/description, one H1, correct locale canonical and en/ja/x-default alternate links. |
| CTA destinations | PASS: all demo links use canonical demo; all booking links use `https://calendar.app.google/KpXGF5RTgqRpg72n6`. Public demo destination rendered successfully. |
| Console/hydration | PASS: final local Chrome warning/error collection empty. |
| No capture | PASS: complete non-truncated network trace, zero POST requests during load and interactive flow; no email input, iframe, video or capture provider introduced. |
| Corporate regression | PASS: Travel, Technology, Cases, Resources, About, Careers, Contact in both locales (14 routes); original header/footer and no V2 CSS. |

Responsive/metadata/route/console/network evidence is in the external review ZIP. Contrast sampling is a computed-colour check, not a comprehensive WCAG certification. Quantitative LCP/CLS were not obtained because the connected browser's PerformanceTimeline command is unsupported; no score is claimed. Build reports 124kB first-load JS for home/ja, with 103kB shared. No large hero raster, video or third-party embed was introduced.

## Automated verification

Final code checks all exited 0:

- `npm run lint`: no ESLint warnings/errors.
- `npx tsc --noEmit`: pass.
- `npm run test:home-v2`: 10 groups pass (freeze, state guards, counts, locale parity, destinations, no capture, accessibility contracts, IA).
- `npm run test:travel-demo`: pass.
- `npm run test:travel-acquisition`: pass, including existing failure, timeout, auth, stored-response and configuration cases.
- `npm run test:travel-localization`: pass.
- `npm run build`: pass, 24 static pages generated.
- `git diff --check`: pass.

CI validate now includes `test:home-v2`. Remote CI is not run because no push was made. Existing tooling advisories about stale browser data, experimental Node type stripping/module detection, Next lint deprecation and existing edge-route static generation are not new test failures.

## Changed-file scope

New `components/home-v2/` server/client presentation, `content/home-v2.ts`, pure `lib/home-demo.ts`, test script and this report. Home routes use localized V2 metadata/content. Shared Header/Footer only select the V2 implementation on the exact home paths. `package.json` and CI add the home regression command. Frozen specification files are included unchanged.

## Release boundary

Known remaining P0: none in the tested local implementation.

Known remaining P1: none in the tested local implementation.

Still required: human visual review of Round 3, any agreed polish, remote CI/Preview if authorized, then a separate Production release decision. Field performance metrics and cross-browser/device QA remain further release checks, not completed claims.

Status: **GAPPY LP V2 — READY FOR HUMAN VISUAL REVIEW**. Not Production Ready.
