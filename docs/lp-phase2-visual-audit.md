# Gappy Travel LP Phase 2 — Visual Audit

Date: 2026-09-03  
Baseline: PR #22 at `c100752f398497be354902e6110e15fa99fc94b9`

## Baseline classification

| Section screenshot | Decision | Audit note |
| --- | --- | --- |
| 01 Header / Hero | KEEP + POLISH | Strong left-copy/right-product composition and recognizable green field. Preserve layout; refine Japanese type rhythm, header-to-hero spacing, and demo labelling. |
| 02 Definition | KEEP | Clear, short, centered definition on dark green. Keep its height and copy density. |
| 03 Problems | KEEP + POLISH | The 3×2 card grid gives immediate Japanese comprehension. Tighten type and visual hierarchy without changing the information model. |
| 04 Layers | MERGE | Repeats understand / operate / verify without showing actual work. Move these ideas into the walkthrough trace and capability strip. |
| 05 Product | MERGE | The product console is strong but repeats the hero as a static overview. Reuse its design language as the walkthrough's changing product view. |
| 06 Capabilities | MERGE | Content is useful; the large masonry-like cards overstate secondary material. Compress to an equal 3×2 support grid. |
| 07 Workflows | REBUILD | Three long cases repeat the same abstract four-box diagram. Replace with five selectable, workflow-specific operating states. |
| 08 Built For | KEEP + MOVE | The eight audience labels are compact and credible. Move after the product walkthrough. |
| 09 Integrations | KEEP + POLISH | Strong dark visual. Clarify the Detect → Read → Act → Verify flow and use a mobile vertical topology. |
| 10 Measurement | REBUILD | Hidden-value dashes reduce confidence. Replace with explicit metric definitions and evaluation method, without invented numbers. |
| 11 Design Partner | KEEP + RELABEL | Useful entry paths but currently reads like pricing tiers. Label as HOW TO START and connect the cards as progression. |
| 12 Deployment | KEEP + POLISH | Five-stage bounded rollout is clear and credible. Improve typography and mobile sequence only. |
| 13 Safety | KEEP + PRODUCT EVIDENCE | Preserve the three principles and dark setting; add an approval trace so control is evidenced in-product. |
| 14 FAQ | KEEP | Strong sales-enablement structure and readable sticky heading. |
| 15 Final CTA | KEEP | Strong closing green field and clear CTA hierarchy. |
| 16 Footer | KEEP | Complete and visually consistent; no structural change required. |

## Cross-section findings

- Preserve: Gappy green, ivory, deep black, current logo, current hero structure, problem cards, FAQ, final CTA and footer.
- Consolidate: Layers, static Product, Capabilities and old Workflows into one outcome-led operating story.
- Typography: use a Japanese-first sans stack for headings, reserve mono for system labels, keep body copy at 13px or larger outside product UI, and avoid blanket extreme negative tracking.
- B2B visual quality: make status, SLA, source context, rules, before/after updates, evidence and approval boundaries visible in the product surface.
- Claims: do not display unapproved customer names, percentages, integrations, certifications or performance values.

## Before assets

- Section baseline: `gappy-section-screenshots-2026-09-03.zip` (16 PNG files, visually reviewed before implementation).
- Full-page comparison captures are stored under `artifacts/phase2/before/`.

## Implemented result

- Replaced the four repetitive Layers / Product / Capabilities / Workflows sections with one five-state Operational Walkthrough.
- Kept the hero composition, definition, 3×2 problem grid, audience list, dark integration map, deployment sequence, FAQ, final CTA and footer.
- Rebuilt measurement as six explicit definitions and added in-product approval evidence to Control & Safety.
- Retained all eight Built For labels; the possible six-category consolidation remains a future copy decision.
- Preserved Japanese option A in the hero: `旅行業務を、AIで完了まで。`

## Visual QA result

| Check | Result |
| --- | --- |
| Full-page length | 1440px: 16,096 → 11,394px (-29.2%). 390px: 24,551 → 17,667px (-28.0%). |
| Responsive widths | 1440×900, 1280×800, 1024×768, 768×1024 and 390×844 rendered without document-level horizontal overflow. |
| Workflow states | All five selectors change the product name, state, SLA, trigger, context, rule, actions, record update, evidence and escalation. |
| Keyboard | ArrowRight moves selection and roving tabindex from WF-01 to WF-02. |
| No-JavaScript fallback | All five panels remain in the static HTML; CSS hides inactive panels only after the walkthrough adds its enhanced class. |
| Header anchors | `#workflows` lands at 99.9px with an 80px sticky header. |
| FAQ | Native details/summary opens and closes correctly. |
| Reduced motion | Workflow and integration animation is disabled under `prefers-reduced-motion: reduce`. |
| Routes and CTA | `/`, `/en/`, `/404.html` and the existing booking/contact URLs verified in the Cloudflare local preview. |

After screenshots and the comparison package are produced outside the repository as review artifacts so the product branch does not accumulate large PNG binaries.
