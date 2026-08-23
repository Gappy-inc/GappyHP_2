# Gappy Corporate / SEO Recovery Report

## 1. Executive Summary

`https://gappy.jp` was confirmed as the canonical production domain for Gappy. The production source was confirmed as `Gappy-inc/GappyHP_2`, default branch `main`, deployed to Vercel through the repository's GitHub integration.

The production site initially presented Gappy primarily as the previous product “Gappy Stay.” The recovery replaces that positioning with “Gappy — AI Workforce for Travel Operations,” restructures the main corporate pages, removes obsolete product routes and assets, and aligns canonical, Open Graph, X/Twitter, sitemap, robots, and structured data.

The corporate site is now deployed and externally verified. Legacy-domain migration, the `www` redirect, Search Console, and Google Business Profile changes are blocked by external account access and are documented with exact next actions.

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

Action: **BLOCKED_BY_AUTH**. The authenticated Vercel identity cannot access the owning project in its personal scope or either available Gappy team. The legacy homepage still returns HTTP 200; `/about` returns HTTP 404.

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

Status: `BLOCKED_BY_AUTH`

Actions completed: production SEO source and canonical sitemap deployed and externally verified. The authenticated browser account was `mitsuki@gappy.jp`.

Blocked actions: the authenticated account has no accessible Search Console properties and does not have access to `sc-domain:gappy.jp`. The UI explicitly reports that the property belongs to another account or requires ownership verification.

Exact next action: an existing property owner should open **Search Console → Settings → Users and permissions**, add `mitsuki@gappy.jp` with Full access (or Owner where appropriate), then submit/resubmit `https://gappy.jp/sitemap.xml`. Run URL Inspection → Test live URL → Request Indexing for `/`, `/about`, and `/cases`.

## 12. Google Business Profile

Status: `BLOCKED_BY_AUTH`

Current category: reported publicly as `観光案内所`; authenticated dashboard confirmation unavailable.

Recommended / changed category: confirm the current primary category and available local category list; if accurate for the business model, prefer the official Google category equivalent of `Software company`. Do not mark the profile closed or delete it automatically.

Website: desired `https://gappy.jp`

Description: desired company description aligned to AI Workforce for travel operations without keyword stuffing.

Access evidence: the authenticated Business Profile Manager account `mitsuki@gappy.jp` shows `0 件のビジネス` and no managed locations.

Exact next action: an existing profile owner should open the Business Profile → Business Profile settings → People and access, invite `mitsuki@gappy.jp` as Manager or Owner, and then confirm the live fields. If `観光案内所` is the registered primary category and no longer accurate, select the locally available official category corresponding to `Software company` only after confirming it in Google's category picker. Set the website to `https://gappy.jp` and update the description to the current company positioning. Do not mark the profile closed or delete it.

## 13. Remaining Manual Actions

- Obtain the owning Vercel account/team for `gappy-homepage.vercel.app`, add the authenticated user as a project member, and configure a permanent path-preserving redirect to `https://gappy.jp`.
- Sign in to the Cloudflare account that owns the `gappy.jp` zone. Remove the self-redirect rule for `www.gappy.jp`, then create a one-hop permanent redirect from `https://www.gappy.jp/*` to `https://gappy.jp/${1}` with query-string preservation enabled. Verify with `curl -IL`.
- Grant `mitsuki@gappy.jp` access to the existing `gappy.jp` Search Console property, then resubmit the sitemap and request indexing for the primary pages.
- Grant `mitsuki@gappy.jp` Owner/Manager access to the existing Business Profile, then confirm/update category, website, and description.
- Allow time for Google to recrawl and refresh search-result titles, site name, and the Knowledge Panel.

## 14. Rollback

Rollback source SHA: `5558fbecb8bcaad3a4282a4cdd3151b14e638d22`

Rollback deployment: GitHub deployment `4663409236`; Vercel environment URL `https://gappy-hp-2-czec45fu0-yutas-projects-f8eebdcf.vercel.app`.

Rollback trigger: homepage or critical-route 5xx, broken application assets, redirect loop introduced at the apex, site-wide noindex, or major unusable regression.

## 15. Final Status

**PARTIAL SUCCESS — production website recovery complete and verified. Legacy redirect, `www` redirect, Search Console, and Business Profile changes are BLOCKED_BY_AUTH.**
