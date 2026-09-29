# Attio handoff compliance — pre-edit audit

Date: 2026-09-29. Baseline: `b140e01d0eda1db276ce045b31d5acd83a660ecb`.
Created before implementation edits. This is an engineering audit, not human visual acceptance.

## Sources inspected

Fresh extraction of the supplied `Downloads/project.zip` into the private sibling directory `attio-compliance-source-ZBw8LE`. Read README.md (525 lines), the entire report HTML (706 lines), and report.css. Compared their contents with the earlier extracted copy. Visually opened every unique reference: 15 desktop JPGs, m1–m4, 11 split JPGs and live_sections.png. The README says 20 references, but the archive contains 19 unique assets/ref images (also duplicated inside its handoff directory). All 11 split JPGs are black; live_sections.png is black apart from small section labels. They cannot establish visual fidelity. The normal 19 reference images remain usable. The archived hero has missing animated heading text; current live Attio at 1440×1000 supplies this missing evidence.

Source priority: handoff §6 translation rules → live attio.com → current implementation. Do not replicate the report's own rust-colored documentation layout, licensed assets, CRM content, blue brand, microstripes or arc. Current Gappy public synthetic demo was opened and its actual booking/requirements flow inspected. No demo data was sent externally. Product state/copy/claims remain frozen.

## Rule-by-rule baseline

| Rule | Status | Evidence / bounded action |
|---|---|---|
| Page width / grid | PARTIAL | Most `.hv-container` elements are 1400px at x20 on 1440px, but final CTA is 1140px at x150. Normalize one shared primitive/token. |
| Gutters | PARTIAL | 48 / 32 / 20 already used, but independently specified; unify tokens and align optional vertical rules. |
| Section spacing | PASS | 128px desktop / 72px mobile; chapter boundaries are rules, not floating cards. Preserve. |
| Typography families | PASS | Existing Space Grotesk, Noto Sans JP, DM Mono; no new font or licensed Attio font. |
| Headline scale | PASS | Editorial H1 96 EN / 82 JA, locale-tuned H2 68 / 54; mobile 52 / 39. Keep hierarchy. |
| Line-height | PASS | EN display 1.02–1.08; JA 1.2–1.32; readable localized body. |
| Tracking | PASS | Negative display tracking, separate Japanese tuning; no identical forced line breaks. |
| Type scale discipline | PARTIAL | Repeated local font-size overrides; normalize headline/body/label primitives without flattening product data numerals. |
| Border system | PARTIAL | 1px generally correct, but Workflow alone invents outer vertical rules. Align shared desktop section edge rules. |
| Shadows | PASS | Effective marketing shadows none; hero product alone has 5% alpha subtle shadow, none on mobile. |
| Radii / card soup | PASS | Open grids, border-separated controls, meaningful dark product objects; no repeated 16–24px marketing cards. |
| Surface colors | PARTIAL | Tinted #f0f1ef differs from #fafaf9 by more than requested 1–2%; reduce the chapter tint delta. |
| Brightness rhythm | PASS | Light hero → tinted proof → light workflow/verification → tinted recovery → dark context/architecture → light proof → dark CTA. |
| Accent usage | PASS | Lime limited to active/progress/verified states and product affordances; no gradients. Existing brand mark preserved. |
| Hero composition | PASS | Editorial spanning headline, offset product spanning cols 5–12, detached readiness and overlapping activity. No scenic imagery. |
| Product integration | PARTIAL | Reusable HTML readiness/requirements/activity/evidence/candidate fragments good; closing Proof is still only a text index. Add three compact source-backed fragments, no new claims. |
| Section variety | PASS | Editorial hero, full-width instrument, pinned workflow, centered verification, asymmetrical recovery, dark context, 2×2 architecture, proof index, closing statement. |
| Sticky behavior | PASS | Compact header, four-state sticky workflow, three-state recovery. No scroll interception. Recheck keyboard and pooled DOM state after changes. |
| Interaction transitions | PARTIAL | State changes are meaningful; Workflow remount lacks a scoped transition; Context is static. Add restrained opacity/border activation, no autonomous product actions. |
| Motion duration | PASS | Existing effective 150 / 300 / 400ms; preserve and expose shared tokens. |
| Easing | PASS | Main cubic-bezier(0,0,0,1); retain reduced-motion static content. |
| Verification | PASS | Response is not completion; explicit requirements checks before verified state. No semantic change. |
| Recovery | PARTIAL | Desktop 100→76→100 is clear; mobile states stack, but overview rail remains horizontal. Make mobile summary explicitly vertical. |
| Context / Architecture | PARTIAL | Distinct layouts already; Context needs subtle line/node state on viewport entry (not a pitch-deck illustration). No new integration claims. |
| Verifiable Proof | PARTIAL | Synthetic label and correct demo links exist, but missing the requested small product moments. |
| Mobile composition | PARTIAL | Readiness-first hero and accordion work; seven visible text-link targets below 44px at 390px. Increase hit areas, not button decoration. |
| Navigation | PARTIAL | Height reduction / thin rule correct; mobile announcement CTA is 32px. Make hit target 44px, preserve single primary path. |
| CTA hierarchy | PASS | Primary demo + secondary consultation, no form or capture. Preserve URLs. |
| Breakpoints | PASS | 1200 nav / 768 composition justified by bilingual density; not obliged to copy Attio's 992 breakpoint. |
| Customer logos / quotes / scale statistics | NOT APPLICABLE | Not source-backed Gappy claims. Do not introduce them or add handoff's suggested extra sections. |
| Newsletter / email capture | NOT APPLICABLE | Explicit no-capture mode; do not translate Attio's mobile form. |
| Fonts, microstripes, arc, CRM assets | NOT APPLICABLE | Handoff explicitly says replace these brand identifiers. Keep all reference images outside repo/public. |

## Implementation scope

One normalization pass: shared grid/type/motion tokens; subtle tint; compact Proof product moments; restrained Context activation; mobile vertical recovery/44px targets. Preserve all route/content/state/API files. Then capture an initial review, list at most five remaining P1 visual differences, perform exactly one correction loop, and re-review. Final approval remains human-owned. Local commit only; no push, merge or deploy.

## First rendered review → single final correction loop

Evidence: private `comparison-initial.png`, `baseline/initial-proof-1440.png`, `baseline/initial-context-1440.png`, `baseline/initial-recovery-390.png`. Initial checks: no console warnings/errors, no overflow; mobile visible links now ≥44px. Four remaining P1 differences identified (not five invented issues):

1. Shared vertical rules stop at the content inset instead of continuing through chapter whitespace. Move section padding onto the shared grid at desktop without changing overall chapter spacing.
2. Proof's three new fragments increase right-column length while leaving a large empty left column. Use a ruled three-column product-proof strip below the existing editorial heading, distinct from Architecture's 2×2 matrix.
3. Mobile recovery rail inherited `display:none` on arrows. Restore downward connectors and remove the unnecessary background panel.
4. Marketing heading sizes still depend on local overrides. Normalize six effective type roles, with JP/EN and mobile overrides; product instrument numerals remain separate from marketing typography.

Only these four items enter the final correction loop. No new IA, copy or product behavior.
