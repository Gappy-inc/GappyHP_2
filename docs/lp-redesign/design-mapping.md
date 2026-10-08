# REFERENCE AUDIT COMPLETE / Design specification

2026-10-08 — READY under the user's follow-up “これで行く”, attached to the Airレジ-only finding. Three independent references are no longer required. We retain one truthful source group and create three interpretations, not three fictional source LPs.

## Access and scope

- Drive: 21 original PNGs downloaded, decoded, visually inspected, byte sizes verified; inventory and contact sheets retained.
- Distinct groups: 1 (Airレジ); unclassified: 0; exact duplicates: 0.
- Playbook: all 22 pages extracted and visually reviewed in rendered page sheets.
- Repository: Gappy-inc/GappyHP_2, local GappyHP_2_localization, baseline 776fb70, Next.js 15.5.24 / React 18; installed dependencies available. No Astro app in this checkout.
- Live https://gappy.jp/ja/ and local content/home-v2.ts match the headline “すべてのツアーを、催行可能な状態へ。” and the synthetic demonstration framing. English homepage is `/`, not `/en/`.
- New comparison pages only: /lp-a, /lp-b, /lp-c. No production publish. Existing analytics eligibility excludes these preview paths and remains unchanged.

## Brand review by page

1 cover/vision; 2 purpose and message/design/audience/production; 3 preserve headline-led diagrams and standardize; 4 vision/promise/category/posture; 5 Outcome → Problem → Category → Mechanism → Proof/CTA; 6 enterprise emphasis on control/proof; 7 clear operational human-safe ambitious voice; 8 logo roles; 9 clear space equal to lowercase a height, minimum 96px; 10 five brand tokens and semantic-only extra colors; 11 Noto Sans JP/Inter; 12 responsive adaptation of hierarchy, not slide point sizes; 13 12 columns, 8px spacing, 16px cards and 1px borders; 14 composition patterns; 15 Detect/Decide/Execute/Verify and WorkItem/Policy/Human Approval/Evidence; 16 source/period/units for real metrics (example scores are not claims); 17 operations photography; 18 one UI value and at most three callouts; 19 enterprise mechanism/proof emphasis; 20 concise concrete quality bar; 21 handoff principles; 22 Japan-first/Asia-ready vision.

The repository's official `public/gappy-logo-official.png`, documented in GAPPY_UI_V3_IMPLEMENTATION_REPORT.md, differs from the playbook primary wordmark and its green. Preserve the approved current asset unmodified; do not use the older SVG, which recreates text with Arial. Record this as a brand asset discrepancy for future primary-wordmark delivery. No PDF logo extraction.

## Shared messaging and sources

- H1 on all variants: 人を増やさずに、成長できる旅行事業へ。 A brand ambition, not measured customer performance.
- Body: 旅行会社・ツアー運営の予約後業務を、AIで前に進める。既存システムを活かし、重要な判断は人へ。Gappyは実行結果と完了条件の確認を重視するAI Workforceです。
- Primary CTA: Gappyに相談する → GOODTIME_URL from lib/config.ts. Secondary: #proof, a real on-page explanation/demo. Official demo link sourced from content/home-v2.ts; show only if accessible, otherwise use existing /ja/ demo sections.
- Source of illustrative state: lib/home-demo.ts, homeCopy.ja and the existing public demo. Clearly label redesigned UI as 説明用UI・合成データ・実送信なし. No unsupported live integrations, savings, certifications, users or customer testimonials.
- Guide confirmation, reply verification and cancellation recovery are illustrated demo workflows, not claimed production availability. Other workflows discussed only as consultation scope. Existing systems described as an approach, not universal compatibility.
- Proof consists of inspectable state changes and existing technical-design links. New UI is explanatory, never a production screenshot.

## Reference mapping

All filenames begin `Screenshot 2026-10-08 at ` and end `.png`; full names below are exact.

| Section | LP A — Overview | LP B — Product | LP C — Workflow |
|---|---|---|---|
| Hero | `Screenshot 2026-10-08 at 18.27.58.png`: split message/UI, two CTAs | `Screenshot 2026-10-08 at 18.30.38.png`: centered lockup and product presentation expanded into hero | `Screenshot 2026-10-08 at 18.28.32.png`: asymmetric numbered narrative with a vertical work summary |
| Problem | `Screenshot 2026-10-08 at 18.28.14.png`: three concise benefits adapted into three pain points | `Screenshot 2026-10-08 at 18.29.46.png`: compact directory-like grid | `Screenshot 2026-10-08 at 18.29.54.png`: rows of concrete operational work |
| Mechanism | `Screenshot 2026-10-08 at 18.28.32.png`, `Screenshot 2026-10-08 at 18.28.40.png`, `Screenshot 2026-10-08 at 18.28.49.png`: alternating numbered feature rows | `Screenshot 2026-10-08 at 18.29.21.png`: modular columns, focused product stage | `Screenshot 2026-10-08 at 18.30.02.png`: sequential steps expanded as a vertical journey |
| Proof | `Screenshot 2026-10-08 at 18.29.37.png`: compact proof panels without customer claims | `Screenshot 2026-10-08 at 18.28.22.png`: large product demonstration | `Screenshot 2026-10-08 at 18.30.20.png`: paired evidence/control panels |
| FAQ/final/footer | `Screenshot 2026-10-08 at 18.30.29.png`, `Screenshot 2026-10-08 at 18.30.38.png`, `Screenshot 2026-10-08 at 18.31.02.png` | Same observed patterns, centered/inset arrangement | Same observed patterns, editorial two-column arrangement |

All three follow Outcome → Problem → Mechanism → Proof → CTA. A emphasizes alternating bands and approachable explanation; B presents centered product UI with modular evidence; C uses asymmetric editorial columns and a numbered journey. Same copy, palette, CTA and semantic UI. Desktop source confidence: High. Responsive layouts are original adaptations because mobile references were not supplied. Motion and interactions in source: Not observable.

## Implementation boundaries

Scoped styles, shared tokens and small client islands for navigation and synthetic state transitions. Root shell condition applies only to the three exact preview paths; middleware sets their Japanese locale. Metadata noindex/nofollow, canonical to own route, explicit Japanese OG, no sitemap additions. Existing consent/analytics components preserved. No new dependencies or lockfile changes.
