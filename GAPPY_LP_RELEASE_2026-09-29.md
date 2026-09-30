# Gappy LP release — 2026-09-29 request / 2026-09-30 implementation

## Release state

Hero frozen in `1aa522c` (parent `b49a6a2`). Branch `feat/home-final-release-seo-analytics`. Hero CSS is its own commit. No new visual, IA, product, Travel or Ops changes in the GA4 pass. No new dependencies; lockfile unchanged. Machine now had 15 GiB available before build; no cache/unknown files were deleted.

**Analytics activation and Production acceptance remain BLOCKED**, not verified. Missing: real Measurement ID/property access, approved public privacy policy/target regions/consent integration, Google property settings verification. No Production configuration changed. No real leads collected.

## Measurement configuration

| Setting | Production | Preview/local/test |
| --- | --- | --- |
| NEXT_PUBLIC_GA_MEASUREMENT_ID | Real web stream `G-…`, currently unset | Unset |
| GA_CONFIGURATION_REVIEWED | `true` only after the checklist below is approved; currently unset | Unset/false |
| VERCEL_ENV | Actual Vercel `production`, never spoof | Actual environment |
| TRAVEL_ACQUISITION_COLLECTION_ENABLED | Keep false | Unchanged |
| TRAVEL_ACQUISITION_PRODUCTION_ENABLED | Keep false | Unchanged |
| TRAVEL_DEMO_LEAD_CAPTURE_ENABLED | Keep false | Unchanged |
| TRAVEL_ANALYTICS_ENABLED | Keep false (legacy receiver, not GA4) | Unchanged |

Set Production-scoped ID in the actual `gappy-hp-2` project and rebuild: NEXT_PUBLIC variables are build-time values. Do not put an invented ID in source. `GA_CONFIGURATION_REVIEWED` is not visitor consent; both configuration approval AND explicit per-visitor consent are required. Rollback: unset ID or set review gate false and redeploy, independently roll back the website deployment if needed.

## Consent / privacy — CONSENT_REVIEW_REQUIRED

Repository has only `/travel/preview-privacy` (synthetic test notice), not an approved public GA4 policy. Target audience includes EN and JP; jurisdictions have not been approved. No claim of legal compliance or implicit consent. No new banner.

Basic-consent behavior: before consent, no gtag.js load, GA request or GA cookie. The future approved CMP restores its decision per document by setting `window.gappyAnalyticsConsent` to `granted`/`denied` and dispatching `new Event('gappy:analytics-consent')`. No hardcoded consent grant. Default is denied. Revocation disables the measurement ID via Google's ga-disable flag and consent update; the CMP owns consent persistence and applicable cookie deletion. No advanced-mode cookieless pings before consent.

Before setting GA_CONFIGURATION_REVIEWED=true, the human owner must:

1. Approve a public privacy notice describing Google Analytics, cookies, purposes, retention, recipient, opt-out/deletion and applicable regions.
2. Approve/connect consent handling; no UI is added in this PR.
3. Verify GA4 **Enhanced Measurement is OFF**, including history pageviews, outbound clicks, forms, search, video, downloads. `send_page_view:false` alone does not disable these settings.
4. Keep Google Signals, advertising personalization, user-provided data, Ads links, cross-domain linking and unwanted tag destinations OFF. Code also sets allow_google_signals=false and allow_ad_personalization_signals=false; ad_storage/ad_user_data/ad_personalization remain denied.
5. Confirm the stream is Standard (free), intended retention/access, no paid BigQuery/360 features, and register required event-scoped custom dimensions.

## Collection and redaction

Uses existing `next/script` afterInteractive + gtag.js; no provider package. Production environment + canonical https://gappy.jp + known public route + valid ID + configuration approval + consent are all required. DNT, webdriver and explicit `?analytics_qa=1` suppress collection. The QA opt-out uses a single non-identifying sessionStorage bit so hard locale navigation remains excluded. Automated smoke starts with this query. No debug bypass enables local/Preview delivery.

page_location = origin + known pathname, never search/hash; page_title is a fixed locale label, not user content. Referrer is only an allowlisted public origin, never query, conversation ID, credentials or path. Unknown referrers are dropped (reporting limitation). Device uses GA4 standard handling. No user_id, raw form fields, emails, custom fingerprint, manual IP storage, session replay or heatmap. GA4 itself uses cookies after consent; this is not advertised as anonymous/cookieless tracking.

UTM keys AND values allowlisted:

- source: chatgpt.com, chatgpt, google, bing, linkedin
- medium: referral, organic, social
- campaign: gappy-lp, lp-launch, travel-lp

Other values, including PII disguised as campaign names, are dropped; new campaigns require reviewed allowlist changes. ChatGPT origins chatgpt.com/chat.openai.com map to source chatgpt.com if no allowed explicit source. Approved UTMs also map to campaign_source/medium/name for standard acquisition reports. Event dimensions may be registered for utm_source/medium/campaign. No arbitrary query is sent.

See `HOMEPAGE_CTA_ANALYTICS_MAP.md`. Single delegated adapter; clicks use regular native links with no preventDefault, callback wait or navigation replacement. Optional section_view omitted. Click != confirmed meeting.

## SEO / AIO audit

Local production build: all 16 indexable EN/JP routes returned 200, one H1, metadata description, self canonical, en/ja/x-default, OG title/description/image/locale and Twitter card; Organization/WebSite JSON-LD parsed on each page. Homepage EN title now explicitly AI Workforce for Travel Operations; Japanese title already correct. Root canonical serialized by Next as https://gappy.jp (equivalent to https://gappy.jp/).

Sitemap already includes precisely the 16 public production routes with alternates; no preview URLs or invented lastModified. robots retains the existing wildcard public Allow, so OAI-SearchBot/Googlebot/Bingbot and GPTBot public-page behavior are unchanged. Added exclusions for api/admin/private/internal/preview paths. Robots is not access control. Existing preview privacy page remains noindex and excluded from sitemap. No separate training policy invented.

Existing verified company name/address/email/logo retained. No ratings, offers, customer claims, price or SoftwareApplication rich-result claims added. Public source contains AI Workforce for Travel Operations, after-booking work, readiness, verification, cancellation/recovery and human control as HTML, not solely images. Frozen headings/meaning unchanged. Existing general corporate OG image remains; not a new Product claim. Google Rich Results and actual crawler/IP reachability not verified. No speculative llms.txt added.

## Verification evidence

- Local lint, typecheck, Home 15 groups, Travel demo/acquisition/localization, new GA4 policy and actual-TSX-effect harness, build: PASS.
- Hook harness uses existing TypeScript dependency and zero network: default denied, grant/revoke, EN/JA page_view, hero_demo/hero_sales/language_switch command shape, redaction, repeat-render deduplication, blocked provider, local/Preview/QA exclusion. **Not Google receipt proof.**
- Local Chrome 1440x900 and 390x844: one H1, no horizontal overflow, EN→JP and mobile JP→EN correct lang/skip/menu closed. Captured network window: GA requests 0, POST 0, runtime exceptions 0. Analytics script absent.
- Production Realtime/DebugView, live positive GA Network payload inspection, received events: NOT RUN, missing ID/consent/property access.
- Preview deployment/remote CI and production deploy: report actual status separately; never infer success from local build.
- Existing browser/performance baselines are historical, not re-measured GA-enabled performance. LCP/CLS with active GA remain pending consent/ID.

## Final release gates

No Production analytics activation until ID, approved policy/consent integration, reviewed GA settings and network/Realtime acceptance. After approved configuration: verify EN/JA page_view, hero_demo, hero_sales, language_switch and ChatGPT referral in Realtime (or an explicitly authorized DebugView test); inspect all Google request payloads for query/form data; verify Preview/local requests remain zero. Record deployment SHA/ID and real receiver evidence. Do not call the entire release VERIFIED while these gates remain open.

## References

- https://developers.google.com/tag-platform/security/concepts/consent-mode
- https://developers.google.com/tag-platform/security/guides/consent
- https://developers.google.com/analytics/devguides/collection/ga4/reference/config
- https://developers.google.com/analytics/devguides/collection/ga4/views
