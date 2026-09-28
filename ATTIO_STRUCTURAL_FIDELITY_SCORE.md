# Structural fidelity score

Engineering visual assessment, not an objective pixel-similarity metric and not human visual acceptance. Base a47a18f56560e52c0db864b6cc1daf62b41cecc8. Reference: live attio.com measured1440×1000 and390×844; mapping was written before code edits.

## Initial implementation review

| Dimension | Maximum | Initial | Reason |
|---|---:|---:|---|
| Hero composition |15|12|Centered hierarchy now follows reference; old inner grid spans still make Product too tall. |
| Typography hierarchy |10|9|Measured display/body/chapter proportions now close; independent JA tuning retained. |
| Grid / spacing |10|9|1392px outer region,25/75workflow and shared rules; Hero height needs correction. |
| Product integration |15|13|Real Gappy fragments, but overlapping activity obscures requirement-status edge. |
| Platform / Workflow |20|17|Long four-state stage and persistent nav; bottom of viewport insufficiently used. |
| Section rhythm |10|9|Light/light-gray lifecycle,large dark Context,light Proof,dark CTA; unsupported proof/updates intentionally omitted. |
| Motion |10|8|Correct150–400ms restrained state/border transitions; not identical to Attio's Hero scroll-clipping. |
| Mobile |10|9|Centered Hero,cropped UI,accordion; secondary CTA has residual left alignment. |
| Total |100|86|Below required90: one correction loop required. |

## One correction loop

1. Explicit Hero inner grid placement; reduce accidental height,not content meaning.
2. Reserve a safe label gutter behind overlapping lifecycle fragments.
3. Move existing stage explanation to a ruled reinforcement strip below the Product scene; add existing synthetic/principle labels,not a new capability.
4. Center mobile secondary CTA and match Hero-to-product gap.

5. Final mobile comparison caught inherited light numerals on the light instrument surface. Set an explicit dark instrument foreground, added a regression assertion, rebuilt and refreshed affected mobile evidence.

## Final engineering assessment

| Dimension | Maximum | Final | Status / evidence |
|---|---:|---:|---|
| Hero composition |15|14|PASS: centered editorial opening, broad Product below, independent readiness/activity/evidence row. Two-line Gappy headline makes Product start lower than Attio. |
| Typography hierarchy |10|9|PASS: EN72/40/88/56 and JA64/38/68/48; Attio measured69.33/40/96/56. Licensed existing Gappy fonts, not Attio fonts. |
| Grid / spacing |10|10|PASS:1392px at1440,24px outer margin,58px inner gutter,25/75 lifecycle division,1px boundaries. |
| Product integration |15|14|PASS: source-backed booking, requirements, ring, activity, evidence and candidate fragments; deliberate overlap with protected status-label gutter. |
| Platform / Workflow |20|18|PASS: four changing Product compositions, continuous scroll markers, persistent navigation/progress, reinforcement strip. Fewer rows than Attio; no invented records to inflate density. |
| Section rhythm |10|9|PASS: light opening/tinted proof/lifecycle, verification/recovery, dark Context+Architecture, light Proof,dark ending. Unsupported customer/changelog chapters intentionally omitted. |
| Motion |10|8|PARTIAL:150–400ms state/border/opacity with handoff easing; sticky release and reduced-motion fallback verified. Attio's exact Hero clipping is not reproduced. |
| Mobile |10|9|PASS: centered40/36px opening,24px gutters,deliberate Product crop,stacked accordion,44px targets,Escape/focus return. No email form because capture remains prohibited. |
| Total |100|91|Required threshold90 retained. Subjective engineering rubric, not independent human approval. |

## Measured section comparison after correction

1440×1000 browser CSS viewport; heights rounded to CSS pixels. Full-page images represent one sticky/animation state; use individual state captures to inspect Product details.

| Chapter | Attio measured | Gappy EN / JP | Side-by-side findings |
|---|---:|---:|---|
| Hero |1296|1434 /1452|Centered gravity,short body,two restrained actions,broad lower Product. Extra height comes from requested two-line headline and decomposed evidence row. |
| Product proof / intro |194logo strip +413intro,Product integrated above|835 /846 proof|Gappy uses an interactive synthetic booking,not unsupported customer logos. This is a deliberate content-driven difference. |
| Lifecycle |6479 total,5jobs|4709 /4698,4jobs|Comparable long-form pacing and1:3 boundary. Gappy pins one evolving stage as requested; live Attio pins navigation beside scrolling articles. Not identical mechanics. |
| Supporting moments |1097 self-building|1171 /1237 Verification;2115 /2142 Recovery|Verification comparable scale. Recovery longer to expose three meaningful states100→76→100. |
| Context |2573 including internal chapters|1327 /1331|Large dark statement and open ruled system. Gappy has fewer verified concepts; no decorative planet or proprietary artwork copied. |
| Architecture/developer |593|598 /598|Close height and boundary rhythm;Gappy four operational principles rather than developer claims. |
| Proof |760scale +937stories|938 /933|Comparable story-block scale;Gappy only public synthetic demo proof. |
| Changelog |930+128|omitted|No verified update feed supplied;do not fabricate. |
| Final CTA |417|511 /525|Same simple editorial statement + two actions;two-line Gappy statement increases height. |

Typography,center-of-gravity,Product density,CTA density,spacing and motion were reviewed against the live reference,not merely judged as clean. Density remains intentionally lower where Gappy has fewer established Product concepts. Brand color and CRM content were not scored.

## Verification

- PASS lint,TypeScript,13 Home groups,Travel demo,Travel acquisition,Travel localization,optimized build24pages.
- PASS JP/EN at375,390,430,768,1024,1440:document scrollWidth equals viewport width.
- PASS JP/EN mobile navigation opens,Escape closes,focus returns to trigger;visible interactive targets>=44px;single-open Workflow accordion.
- PASS JP/EN Product sequence57→71→86;Workflow identify/execute/verify/recover;Verification response→checking→ready and Replay;Recovery100→76→100,ArrowRight/End.
- PASS reduced motion:sticky stage hidden,four static Product states visible,verification finishes immediately.
- PASS browser network observation including JP/EN document loads and interaction:122 requests,zero POST,complete non-truncated event window. Earlier complete JA interaction-only window also zero POST.
- PASS console error log empty;Travel/route/library/public assets have zero diff from base. Eleven local corporate/Travel GET routes return200.
- No capture/database/server behavior changed. No push,merge,deploy,cloud configuration,Production action.
- React/Next review:localized data/state components reused;no added fetches,effects,listeners,dependencies or provider;observer cleanup and native keyboard semantics retained.

## Remaining P0

None found in this scoped local verification.

## Remaining P1

None blocking this local handoff. Reference deviations above remain visible,especially exact Hero clip motion,shorter dark chapter and fewer lifecycle rows. Human visual acceptance remains pending;the91 score is not a substitute for that review.

## Final verdict

GAPPY LP — HIGH-FIDELITY ATTIO STRUCTURAL CLONE PASS

Local implementation gate only. This does not authorize publication.
