# Gappy Corporate / SEO Recovery Report

## 1. Executive Summary

`https://gappy.jp` was confirmed as the canonical production domain for Gappy. The production source was confirmed as `Gappy-inc/GappyHP_2`, default branch `main`, deployed to Vercel through the repository's GitHub integration.

The production site initially presented Gappy primarily as the previous product “Gappy Stay.” The recovery replaces that positioning with “Gappy — AI Workforce for Travel Operations,” restructures the main corporate pages, removes obsolete product routes and assets, and aligns canonical, Open Graph, X/Twitter, sitemap, robots, and structured data.

The corporate site is now deployed and externally verified. The follow-up external-access closure verified Search Console ownership, submitted the canonical sitemap, and requested priority recrawls for the three primary identity pages. The `www` redirect, legacy Vercel deployment, and Google Business Profile remain blocked by the owning accounts and are documented with exact evidence and next actions.

## 2. Initial State

- `https://gappy.jp/`: HTTP 200; Vercel; title was “Gappy Stay | ホテル向けAIアップセル自動化ツール — RevPAR・客室単価を向上.”
- `https://www.gappy.jp/`: Cloudflare-served 308 self-redirect loop to the same URL.
- `https://gappy-homepage.vercel.app/`: HTTP 200; Vercel; title was “株式会社Gappy - タビナカの隙間時間を本物の日本体験で満たす.”
- `/`, `/about`, `/cases`, and `/contact`: HTTP 200.
- `/resources`: HTTP 404.
- `robots.txt` and `sitemap.xml`: HTTP 200.

## 3. Production Architecture

Domain: `https://gappy.jp`

DNS: Cloudflare authoritative DNS (`paris.ns.cloudflare.com`, `sergi.ns.cloudflare.com`); apex A `216.198.79.1`; `www` proxied through Cloudflare.

Hosting: Vercel

Project: `gappy-hp-2` (confirmed by GitHub deployment target and Vercel deployment URL)

Repository: `Gappy-inc/GappyHP_2`

Branch: `main`

Commit: `5558fbecb8bcaad3a4282a4cdd3151b14e638d22` at initial audit

Current production merge commit at the external-closure baseline: `6128cc3cc6f35837b61a36022739f7bd3556967b`

Deployment method: merge/push to `main` → Vercel GitHub integration → Production deployment

Confidence: **CONFIRMED**

## 4. Evidence

- GitHub reports `main` as the default branch and the authenticated user has `ADMIN` permission.
- GitHub deployment `4663409236` records Production ref/SHA `5558fbecb8bcaad3a4282a4cdd3151b14e638d22`.
- GitHub commit status reports successful Vercel deployment to project `gappy-hp-2`.
- Vercel environment URL: `https://gappy-hp-2-czec45fu0-yutas-projects-f8eebdcf.vercel.app`.
- Production HTML contains the same title and primary body copy as repository `main`.
- Production response headers include `server: Vercel`, `x-vercel-cache`, `x-vercel-id`, and Next.js prerender headers.
- Authoritative DNS is Cloudflare, while the apex application response is Vercel.

## 5. Code Changes

- Rebuilt the corporate homepage around Gappy's current company thesis.
- Added complete Home, About, Cases, Resources, and Contact experiences.
- Replaced the non-functional mock contact form with working scheduling and email destinations.
- Updated global Header and Footer to use the Gappy corporate identity.
- Added a branded raster social-preview card.
- Removed obsolete product components, product routes, static assets, and outdated setup notes.
- Added permanent redirects for retired `/solutions/*` and `/news` routes.
- Added a code-level permanent redirect policy for `www.gappy.jp` and the current Vercel project domain.

## 6. Corporate Positioning Changes

- Primary company name: **Gappy** / **株式会社Gappy**
- Primary positioning: **AI Workforce for Travel Operations**
- Product thesis: operate end-to-end workflows across existing travel systems rather than replace core systems.
- Primary customers: enterprise travel companies, TMCs, DMCs, OTAs, tour operators, and travel groups.
- Primary workflows: supplier operations, booking operations, reconciliation, QA and fulfillment, schedule changes, and customer communication.
- Previous products are no longer presented as the current corporate identity.

## 7. SEO Changes

- Homepage title: `Gappy | AI Workforce for Travel Operations`
- Corporate description aligned to current positioning.
- Self-canonical URLs on all five primary pages.
- Open Graph and X/Twitter title, description, URL, and image set for every primary page.
- `og:site_name` set to `Gappy`.
- New `Organization` and `WebSite` JSON-LD graph with confirmed company values only.
- Sitemap limited to current canonical pages.
- Robots allows indexing and references the canonical sitemap.
- No production `noindex`, `nofollow`, blocking `X-Robots-Tag`, or `Disallow: /` directive in source.
- Legacy primary positioning removed from active site source.

## 8. Legacy Domain Migration

Legacy URL: `https://gappy-homepage.vercel.app/`

Initial status: HTTP 200; publicly indexable legacy content.

Ownership evidence: Vercel-generated domain. The authenticated Vercel identity is `mitsuki-6964` and can access the `gappy-inc` and `gappyinc` teams, but neither team contains or can inspect a `gappy-homepage` project. The accessible `gappy-inc` project inventory contains 13 unrelated projects and `gappyinc` contains only `gappy-stay`. GitHub organization, authenticated-user repository, deployment, exact-domain, exact-title, build-ID, and unique-copy searches did not identify a repository tied to this deployment. Candidate repositories `gappymitsuki/corporatesite` and `gappymitsuki/New-Corporate-Site` contain only `README.md`.

Project: **NOT IDENTIFIED**

Project ID: **NOT IDENTIFIED**

Vercel team/org ID: **NOT IDENTIFIED**

Repository: **NOT IDENTIFIED**

Owner: **NOT IDENTIFIED**; the two authenticated Gappy team scopes are excluded by direct project and deployment inspection.

Confidence: **HIGH** that the target is outside the currently authenticated Vercel scopes; **LOW** for any specific owner because the public response does not expose project ownership metadata.

Action: **BLOCKED_BY_VERCEL_AUTH**. The authenticated Vercel identity cannot access the owning project in its personal scope or either available Gappy team. No project, domain, repository, or deployment was deleted or marked unavailable. The legacy homepage still returns HTTP 200; `/about` returns HTTP 404.

Desired destination: `https://gappy.jp/` with a one-hop permanent path-preserving redirect where the destination path exists; otherwise the homepage.

## 9. Deployment

Pre-deploy SHA: `5558fbecb8bcaad3a4282a4cdd3151b14e638d22`

Pre-deploy GitHub deployment: `4663409236`

Pre-deploy Vercel deployment status ID: `13309580843`

Pre-deploy URL: `https://gappy-hp-2-czec45fu0-yutas-projects-f8eebdcf.vercel.app`

Post-deploy SHA: `471a96774d6f06be5d8e89f8624c1279d01e2d29`

Deployment: GitHub deployment `6045129831`; Vercel deployment status `17183650371`; `https://gappy-hp-2-qsb1cvp4m-yutas-projects-f8eebdcf.vercel.app`

Time: Recovery started `2026-08-23T15:18:58+09:00`; Production deployment completed `2026-08-23T15:23:15+09:00`

## 10. Verification

Local production build: PASS

ESLint: PASS with no warnings or errors

Test script: NOT PRESENT

Homepage: local HTTP 200; rendered title, description, canonical, Open Graph, X/Twitter, and JSON-LD verified

About: local HTTP 200; page-specific metadata verified

Cases: local HTTP 200; page-specific metadata verified

Resources: local HTTP 200; page-specific metadata verified

Contact: local HTTP 200; page-specific metadata verified

robots.txt: local HTTP 200; indexing allowed

sitemap.xml: local HTTP 200; five canonical URLs only

canonical: PASS locally

structured data: `Organization` and `WebSite` JSON-LD rendered

Internal links/assets: primary internal targets and referenced public assets returned local HTTP 200

Production verification: PASS. `/`, `/about`, `/cases`, `/resources`, `/contact`, `/robots.txt`, `/sitemap.xml`, and `/og.png` returned HTTP 200. Rendered page-specific metadata was verified externally. The project alias `gappy-hp-2.vercel.app/*` permanently redirects to `gappy.jp/*` in one hop. Retired current-domain routes return permanent redirects to current destinations.

## 11. Search Console

Status: `VERIFIED`

Property: Domain Property `sc-domain:gappy.jp`

Authenticated account: `mitsuki@gappy.jp`

DNS verification: an existing `google-site-verification` TXT record was already publicly served for `gappy.jp`. Search Console automatically confirmed ownership on 2026-08-24; no DNS record was added, edited, or removed.

Sitemap: `https://gappy.jp/sitemap.xml` submitted on 2026-08-24. Search Console fetched it successfully and detected 5 pages.

URL Inspection:

- `https://gappy.jp/`: already indexed; live test passed as indexable; priority crawl requested.
- `https://gappy.jp/about`: already indexed; live test passed as indexable; priority crawl requested.
- `https://gappy.jp/cases`: already indexed; live test passed as indexable; priority crawl requested.

The general-purpose Indexing API was not used.

## 12. Google Business Profile

Status: `ELIGIBILITY_REVIEW_REQUIRED`

Current public profile:

- Business name: `株式会社Gappy`
- Primary category: `観光案内所`
- Hours: `24時間営業`
- Website: `https://official.gappy.jp/` (currently one permanent redirect to `https://gappy.jp/`)
- Public phone: `070-1185-3131`
- Public address: not displayed in the observed Google Maps profile
- Public description: not displayed in the observed Google Maps profile

Ownership: the authenticated Business Profile Manager account `mitsuki@gappy.jp` shows `0 件のビジネス` and no managed locations. Local files, accessible GitHub repositories, and Workspace-adjacent documentation contained no evidence identifying the managing Google account. No credentials were searched or extracted.

Eligibility: the current corporate operation presents itself online as a B2B AI/software company. Google states that a Business Profile normally requires in-person customer contact during stated hours and that online-only businesses are ineligible. The observed profile may instead represent a historical customer-facing or service-area tourism operation. Gappy must confirm whether that operation still legitimately meets customers in person before requesting changes. No duplicate profile was created, and no category, website, description, hours, or ownership fields were changed.

Recommended action: the business owner should first confirm whether the represented tourism operation still makes in-person customer contact. If yes, request ownership of the existing profile and update only factually current fields. If no, do not repurpose the profile as `Software company` solely for SEO; use Google's ownership/support flow to resolve the obsolete or ineligible profile. Reference: [Google Business Profile eligibility and ownership guidelines](https://support.google.com/business/answer/13763036).

## 13. Remaining Manual Actions

- An owner of the Cloudflare account containing the `gappy.jp` zone must sign in or invite `mitsuki@gappy.jp` with permission to edit Redirect Rules. The authenticated `Mitsuki@gappy.jp's Account` contains only `gappyops.com` and `japanamplified.com`; creating another zone is prohibited.
- An owner of the Vercel project serving `gappy-homepage.vercel.app` must identify the owning scope and invite the authenticated user or apply the documented permanent redirect.
- The business owner must confirm whether the existing Google Business Profile represents a currently eligible in-person/service-area tourism operation and, if appropriate, approve or complete the existing-profile ownership claim.
- Allow time for Google to process the submitted sitemap and priority crawl requests and refresh search-result titles, site name, and the Knowledge Panel.

## 14. Rollback

Rollback source SHA: `5558fbecb8bcaad3a4282a4cdd3151b14e638d22`

Rollback deployment: GitHub deployment `4663409236`; Vercel environment URL `https://gappy-hp-2-czec45fu0-yutas-projects-f8eebdcf.vercel.app`.

Rollback trigger: homepage or critical-route 5xx, broken application assets, redirect loop introduced at the apex, site-wide noindex, or major unusable regression.

## 15. Final Status

**PARTIAL SUCCESS — production website and Search Console closure are complete and verified. The `www` redirect is `BLOCKED_BY_CLOUDFLARE_AUTH`; the legacy deployment is `BLOCKED_BY_VERCEL_AUTH`; the Business Profile is `ELIGIBILITY_REVIEW_REQUIRED`.**

## External Access Closure

Closure run: `2026-08-24` (Asia/Tokyo)

### WWW Redirect

Initial: `https://www.gappy.jp/` and `https://www.gappy.jp/about?source=closure` return Cloudflare-served HTTP 308 responses whose `Location` values are the identical input URLs. `curl` reaches its redirect limit without leaving `www`.

Cause: an active Cloudflare edge redirect is self-targeting `www.gappy.jp`. The repository rule is not the cause: `next.config.js` sends `www.gappy.jp/:path*` to `https://gappy.jp/:path*`, but the Cloudflare response occurs before the Vercel origin. The exact Cloudflare rule name/ID cannot be read because the authenticated account does not contain the `gappy.jp` zone.

Change: none; status is `BLOCKED_BY_CLOUDFLARE_AUTH`. After the owning account grants access, disable the active Redirect Rule, Bulk Redirect, or Page Rule whose match includes `www.gappy.jp` and whose output retains the same `www.gappy.jp` URL. Create one Single Redirect with:

```text
Rule name: www.gappy.jp to apex
Match expression: (http.host eq "www.gappy.jp")
Target URL expression: concat("https://gappy.jp", http.request.uri.path)
HTTP status: 308
Preserve query string: Enabled
```

Equivalent wildcard UI values:

```text
Request URL: https://www.gappy.jp/*
Target URL: https://gappy.jp/${1}
HTTP status: 308
Preserve query string: Enabled
```

Reference: [Cloudflare Single Redirect settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/).

Verification: still blocked. `/` and `/about?source=closure` remain 308 self-loops as of the final external check.

### Legacy Vercel

Project: **NOT IDENTIFIED**

Team: **NOT IDENTIFIED**; confirmed absent from authenticated `gappy-inc` and `gappyinc` scopes.

Project ID: **NOT IDENTIFIED**

Repository: **NOT IDENTIFIED**

Owner: **NOT IDENTIFIED**

Action: no destructive action taken. Required target state is a permanent redirect from `gappy-homepage.vercel.app/*` to `gappy.jp/*` when the destination route exists, with other legacy paths falling back to `https://gappy.jp/`.

Verification: `https://gappy-homepage.vercel.app/` remains HTTP 200 with the legacy title; `/about` remains HTTP 404. Status is `BLOCKED_BY_VERCEL_AUTH`.

### Search Console

Property: Domain Property `gappy.jp`

DNS verification: existing public TXT record automatically verified ownership for `mitsuki@gappy.jp`; no DNS mutation was required.

Sitemap: `https://gappy.jp/sitemap.xml` submitted successfully on 2026-08-24; 5 pages detected.

Index requests: `/`, `/about`, and `/cases` were already indexed, passed live URL tests, and were added successfully to Google's priority crawl queue.

Status: `VERIFIED`

### Google Business Profile

Current profile: `株式会社Gappy`; category `観光案内所`; 24-hour hours; website `official.gappy.jp`; public phone `070-1185-3131`; no public address or description observed.

Ownership: `mitsuki@gappy.jp` manages 0 profiles; owning account not identified.

Eligibility: current corporate positioning is online B2B AI/software, while the profile appears tied to a prior tourism operation. In-person or service-area activity must be confirmed by the business owner.

Recommended action: do not create a duplicate and do not convert the category to `Software company` for SEO. Confirm eligibility first, then claim and update the existing profile only if it still represents a legitimate customer-facing operation.

Status: `ELIGIBILITY_REVIEW_REQUIRED`

### Search Engine Identity Audit

| URL | Live HTTP state | Live title / identity | Closure state |
| --- | --- | --- | --- |
| `https://gappy.jp/` | 200, Vercel | `Gappy | AI Workforce for Travel Operations`; self-canonical | Canonical corporate source, verified |
| `https://www.gappy.jp/` | Cloudflare 308 self-loop | Not fetchable through the loop | `BLOCKED_BY_CLOUDFLARE_AUTH` |
| `https://gappy-homepage.vercel.app/` | 200, Vercel | `株式会社Gappy - タビナカの隙間時間を本物の日本体験で満たす` | `BLOCKED_BY_VERCEL_AUTH` |

Desired architecture remains one canonical 200 source at `gappy.jp`, with one-hop permanent redirects from both `www.gappy.jp` and the legacy Vercel domain.
