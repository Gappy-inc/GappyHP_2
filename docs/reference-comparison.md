# Travel LP — PR #23 reference comparison

Review target: `/travel` on `feat/global-travel-ai-workforce-lp`  
Reference source: seven original PNGs from the supplied v3 handoff (review evidence only; not shipped)  
Rendered QA: production build at `http://localhost:3011/travel`

This document records a composition-level comparison. The third-party reference PNGs are deliberately not copied into `public/` or committed as product assets.

| Ref | Inspected source | Implemented section | Matched characteristics | Intentional deviation | Unresolved issue |
| --- | --- | --- | --- | --- | --- |
| R1 | `01_hero_resolve.png` | Hero | Cinematic workplace context, compact product overlay, short headline, two immediate conversion paths, legible dark overlay | Uses an original illustrative travel-operations image; no competitor person, logo, copy, or UI | None found in 1440 / 390 review |
| R2 | `02_workflow_serval.png` | `#work-demo` | Connected dark split-pane stage; fixed instruction, observable evidence, seven-step workflow, current status, explicit controls | Uses one fictional booking and no unsupported integrations or hidden-reasoning display | None found |
| R3 | `03_roles_end_user.png` | Guide/supplier role panel | Minimal external response view, operator-branded prototype label, same booking fixture and version | Gappy-specific confirmation task; no copied agent/product UI | None found |
| R4 | `04_roles_admin.png` | Operations role panel | Role switch, approval boundary, workflow visibility, current evidence and synchronized state | Workflow is deliberately bounded to guide confirmation | None found |
| R5 | `05_platform_explainer.png` | Operating layer | Quiet neutral field, short copy at left, compact relationship diagram at right, ample negative space | Diagram contains only supportable Gappy concepts | None found |
| R6 | `06_scenario_cards.png` | Workflow states | Three image-led cards, real-world travel context, dark readability treatment, short scenario copy and actions | Original illustrative imagery; no customer logos, metrics, or case-study claims | None found |
| R7 | `07_short_form.png` | Final conversion | Calm light two-column composition, compact email-only access card, independent booking CTA | No pricing tiers or full-name field; form remains gated by deployment readiness | Live public capture remains blocked pending approved infrastructure |

## Interaction evidence

- Required lifecycle passed in the rendered browser: `09:00 / v3` → approval → guide response → verification → booking change → `10:30 / v4` → separate prepare and approval → guide response → verification.
- `10:30 / v4` stayed authoritative through waiting, both role views, response received, verification, and the synchronized explanatory projection.
- `RESPONSE RECEIVED ≠ VERIFIED` remains explicit.
- Approval automatically exposes the guide action in the same demo stage. The visitor does not have to search below the video.
- Desktop dock, mobile two-action dock, access dialog, player dialog, disabled/loading/error/success states were checked with the shared Travel theme scope.
- 375, 390, 768, and 1440 widths were checked; document `scrollWidth` equaled viewport width at 375 and 768.
- `/ja/travel`, `/`, `/ja/`, `/technology`, `/cases`, `/resources`, `/about`, `/careers`, and `/contact` retained visible H1 content with no browser console error.

## Acquisition fixture evidence

The connected UI was tested against a local, controlled receiver only. It exercised invalid input, upstream failure, an 8-second timeout, success, and repeated submission. The success case produced one durable JSONL test record; a repeat with the same idempotency key did not create a second record. No real lead or production secret was used.

The public capture path remains fail-closed unless all three conditions are set: explicit enablement, an approved webhook destination, and an approved privacy notice URL.

## Video evidence

`public/travel-demo-v3.mp4` is a real 60-second, 1600×900 H.264 file. Its checked-in captions and in-dialog transcript use the same booking story:

1. Operational question (0–8s)
2. Instruction becomes work (8–18s)
3. Operator approval (18–28s)
4. Guide response is not verification (28–37s)
5. Current-booking verification of v3 (37–45s)
6. `09:00 / v3` invalidated by `10:30 / v4`, then reconfirmation (45–55s)
7. Book a demo (55–60s)

The actual media was played in the local browser with captions visible. Verification is described as confirmation evidence, not proof that the tour operated.

## Reviewer decision

Rendered comparison is ready for Mitsuki's review. This file does not claim `VISUAL_REFERENCE_ACCEPTED`; final visual acceptance belongs to the reviewer.
