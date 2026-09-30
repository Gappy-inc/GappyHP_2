# GA4 activation — separate from website release

Status: BLOCKED_ON_GA4_MEASUREMENT_ID / BLOCKED_ON_HUMAN_ACTIVATION_INPUTS.
No ID supplied, no property access, no real Google receipt verified. Phase A must not merge/deploy or activate Production without a separate approval.

## Human inputs
1. Real web-stream Measurement ID for gappy.jp (never a test/fabricated ID).
2. Approval of EN/JP public privacy pages and completed legal review items in PRIVACY_POLICY_REVIEW_REQUIRED.md.
3. Approval of all-region explicit opt-in and consent wording/UI.
4. GA4 property access for configuration and Realtime/DebugView verification.
5. Sign-off on the following configuration and ownership checklist.

## Property / stream checklist (verify, do not assume)
- Standard/free GA4; no Analytics 360, BigQuery purchase or other paid service.
- Web stream gappy.jp, intended property and restricted access roles.
- Enhanced Measurement OFF, including automatic page history, outbound clicks, forms, downloads and videos. send_page_view:false alone is insufficient.
- Google Signals OFF; ads personalization OFF; user-provided data OFF.
- No unwanted Ads links or extra tag destinations. Cross-domain measurement OFF unless separately approved.
- Retention, consent policy and deletion/access owner approved and recorded, not invented.
- No replay, heatmap, user_id or custom fingerprint.

## Environment matrix
| Environment | NEXT_PUBLIC_GA_MEASUREMENT_ID | GA_CONFIGURATION_REVIEWED | Delivery |
| --- | --- | --- | --- |
| Current Production | unset | unset/false | OFF, banner hidden |
| Preview / development / tests | unset | unset/false | OFF, banner hidden |
| Future approved Production | real G-… | true | only after explicit visitor grant |

The same server-computed production-only gate controls banner and SiteAnalytics. Never spoof VERCEL_ENV to test delivery. NEXT_PUBLIC values require a new build after configuration. Keep all Travel lead/legacy analytics flags disabled. No Ops/marketing database changes.

## Dimensions / events
Existing `page_view`, `cta_click`, `language_switch` preserved. CTA map in HOMEPAGE_CTA_ANALYTICS_MAP.md remains authoritative.
New `section_view`: product_proof, workflow, verification, recovery, context, final_cta. A chapter is reached when >=50% of its heading is visible; observing an entire multi-screen sticky chapter would never meet a 50% threshold. Each ID is recorded at most once per document, after consent; no backfill for headings passed before consent. No scroll-depth stream.

| Parameters | Reporting setup |
| --- | --- |
| page_location, page_referrer, page_title; device/browser | Standard GA4 dimensions; do not register duplicate custom dimensions |
| campaign_source, campaign_medium, campaign_name | Mapped to standard acquisition reporting; confirm attribution in actual property |
| cta_id, cta_location, locale, destination_type, from_locale, to_locale, section_id | Register event-scoped custom dimensions; locale is site locale, not GA browser Language |
| utm_source, utm_medium, utm_campaign | Explicit event parameters need event-scoped custom registration if used directly; standard acquisition uses the campaign mappings above |

ChatGPT source: only allowed UTM values or origin chatgpt.com/chat.openai.com; no query, conversation path/ID or fragment in page_location/referrer. CTA clicks are NOT meetings.

Dashboard: page views by EN/JP; header/hero/final demo and sales clicks; demo vs sales clicks per eligible page_view (define event-count CTR explicitly, not unique visitor conversion); reached workflow/verification/recovery/final CTA; ChatGPT-sourced visits. These describe **consenting visitors**, not all visitors. Do not extrapolate opt-in totals to the entire audience.

## Phase B acceptance (not run in Phase A)
After approval, configure only real Production ID/review flag and rebuild. Verify fresh no-choice and decline sessions have zero Google requests/cookies; grant emits one page_view per document; inspect CTA/language/section payloads, persisted hard EN/JP navigation, DNT, blocked storage/provider, withdrawal/cookies and subsequent zero tracking. Test `?utm_source=chatgpt.com&utm_medium=referral&utm_campaign=gappy-lp`; prove received EN/JP page_view, hero_demo, hero_sales, language_switch and section_view in Realtime/DebugView. No fabricated Google receipt from mocks. Browser automation is intentionally excluded: use approved manual browser tests for actual provider receipt.

Rollback: unset ID and set review gate false, rebuild/deploy; independently revert website deployment if necessary. Do not enable legacy acquisition or analytics flags.

Sources: [Google basic consent mode](https://developers.google.com/tag-platform/security/concepts/consent-mode), [consent setup](https://developers.google.com/tag-platform/security/guides/consent), [custom dimensions](https://support.google.com/analytics/answer/14240153), [standard dimensions](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema). These are technical references, not legal approval.
