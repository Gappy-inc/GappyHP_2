# Gappy Corporate / SEO Recovery Report

## 1. Executive Summary

`https://gappy.jp` was confirmed as the canonical production domain for Gappy. The production source was confirmed as `Gappy-inc/GappyHP_2`, default branch `main`, deployed to Vercel through the repository's GitHub integration.

The production site initially presented Gappy primarily as the previous product “Gappy Stay.” The recovery replaces that positioning with “Gappy — AI Workforce for Travel Operations,” restructures the main corporate pages, removes obsolete product routes and assets, and aligns canonical, Open Graph, X/Twitter, sitemap, robots, and structured data.

Production deployment, legacy-domain migration, Search Console, and Google Business Profile outcomes are updated in the later sections of this report after external verification.

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

Ownership evidence: Vercel-generated domain. The authenticated Vercel account can access the `gappy-inc` and `gappyinc` teams, but neither team has access to this domain/project. GitHub organization and authenticated-user repository searches did not identify a repository tied to the deployment.

Action: **PENDING / BLOCKED_BY_AUTH** until the owning Vercel account or team is available.

Desired destination: `https://gappy.jp/` with a one-hop permanent path-preserving redirect where the destination path exists; otherwise the homepage.

## 9. Deployment

Pre-deploy SHA: `5558fbecb8bcaad3a4282a4cdd3151b14e638d22`

Pre-deploy GitHub deployment: `4663409236`

Pre-deploy Vercel deployment status ID: `13309580843`

Pre-deploy URL: `https://gappy-hp-2-czec45fu0-yutas-projects-f8eebdcf.vercel.app`

Post-deploy SHA: `PENDING`

Deployment: `PENDING`

Time: Recovery started `2026-08-23T15:18:58+09:00`

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

Production verification: `PENDING`

## 11. Search Console

Status: `PENDING_AUTH_CHECK`

Actions completed: production SEO source and canonical sitemap prepared.

Blocked actions: sitemap submission/resubmission, URL Inspection live tests, and Request Indexing require an authenticated Search Console property session.

## 12. Google Business Profile

Status: `PENDING_AUTH_CHECK`

Current category: reported publicly as `観光案内所`; dashboard confirmation pending.

Recommended / changed category: confirm the current primary category and available local category list; if accurate for the business model, prefer the official Google category equivalent of `Software company`. Do not mark the profile closed or delete it automatically.

Website: desired `https://gappy.jp`

Description: desired company description aligned to AI Workforce for travel operations without keyword stuffing.

## 13. Remaining Manual Actions

- Obtain the owning Vercel account/team for `gappy-homepage.vercel.app` if the authenticated session cannot access it.
- Correct the Cloudflare `www.gappy.jp` self-redirect rule if dashboard access is unavailable during this run.
- Complete Search Console sitemap resubmission and URL Inspection/Request Indexing if an authorized browser session is unavailable.
- Confirm and update Google Business Profile fields if an authorized owner/manager session is unavailable.
- Allow time for Google to recrawl and refresh search-result titles, site name, and the Knowledge Panel.

## 14. Rollback

Rollback source SHA: `5558fbecb8bcaad3a4282a4cdd3151b14e638d22`

Rollback deployment: GitHub deployment `4663409236`; Vercel environment URL `https://gappy-hp-2-czec45fu0-yutas-projects-f8eebdcf.vercel.app`.

Rollback trigger: homepage or critical-route 5xx, broken application assets, redirect loop introduced at the apex, site-wide noindex, or major unusable regression.

## 15. Final Status

**IN PROGRESS — implementation and local QA complete; production and external Google actions pending.**
