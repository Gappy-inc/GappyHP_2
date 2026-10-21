# Gappy Travel LP — Cloudflare Operations Guide

## Architecture

The landing page is an independent Astro project in `apps/travel-lp/`. It builds Japanese, English, and 404 pages to static HTML. CSS is plain, global CSS; client JavaScript is limited to the accessible mobile menu. Cloudflare serves the generated `dist/` directory through Workers Static Assets. There is no Worker script, Function, server-rendered route, API, database, CMS, form backend, or runtime AI call.

## Why static Astro

The page is a narrative B2B product site whose content changes infrequently. Static Astro provides deterministic HTML, very little browser JavaScript, strong Core Web Vitals, simple bilingual SEO, and a small Cloudflare deployment surface. It also keeps this LP isolated from the existing Next.js corporate application.

## Directory structure

```text
apps/travel-lp/
├── public/                  # Logo, favicon, OG image, robots and sitemap
├── src/
│   ├── components/          # Shared Astro presentation components
│   ├── data/site.ts         # Japanese and English product copy
│   ├── layouts/             # SEO and document shell
│   ├── pages/               # /, /en/, and /404.html
│   └── styles/global.css    # Brand tokens, layout, responsive styles
├── astro.config.mjs
├── wrangler.jsonc
├── package.json
└── package-lock.json
```

## Local development

```bash
cd apps/travel-lp
npm ci
npm run dev
```

## Build

```bash
npm run check
npm run build
```

The build is static and writes to `apps/travel-lp/dist/`.

## Cloudflare preview

```bash
npm run cf:preview
```

Wrangler serves the same `dist/` assets Cloudflare will publish. Test `/`, `/en/`, and a missing path before deployment.

## Cloudflare deployment

After review and approval, authenticate Wrangler and run:

```bash
npm run deploy
```

The current `wrangler.jsonc` intentionally has no Custom Domain or route. Do not deploy from an unreviewed branch and do not add production DNS changes to the application config.

## Cloudflare dashboard build settings

For Git integration, select repository `Gappy-inc/GappyHP_2` and configure:

- Root directory: `apps/travel-lp`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Node.js version: `22`
- Environment variable: `PUBLIC_SITE_URL=https://travel.gappy.jp`

The lockfile is inside `apps/travel-lp/`, so Cloudflare must install from that directory.

## Custom Domain setup

This is a manual post-merge operation and is intentionally not performed by this change.

1. Confirm the Cloudflare Worker Static Assets deployment is healthy on its generated preview hostname.
2. In the Cloudflare dashboard, open the deployed Worker, then **Settings → Domains & Routes → Add → Custom Domain**.
3. Enter `travel.gappy.jp` and review the proposed DNS record.
4. Confirm no existing record or production route will be replaced.
5. Add the domain only during an approved release window, then verify TLS, `/`, `/en/`, `/404.html`, canonical URLs, and redirects.

## DNS steps for `travel.gappy.jp`

If the zone is already managed by Cloudflare, the Custom Domain flow normally creates the required proxied DNS record. Before accepting it:

1. Export or record the current DNS state for `travel.gappy.jp`.
2. Confirm the hostname is unused and that no CNAME, A, AAAA, or Worker route conflicts exist.
3. Let Cloudflare create the proxied record associated with the Worker Custom Domain.
4. Validate public DNS resolution and the certificate before announcing the URL.
5. Keep the previous target documented so the change can be reversed quickly.

Do not manually point the root `gappy.jp` hostname at this project.

## Environment variables

`PUBLIC_SITE_URL` is read at build time. The default is `https://travel.gappy.jp`. Set a different trusted origin for non-production builds only when their canonical and social metadata should point to that origin. No secrets are required.

## Rollback

Use the Cloudflare deployment history to promote the last known-good version. If the Custom Domain or DNS record caused the incident, detach the Custom Domain or restore the documented previous DNS target. Re-check `/`, `/en/`, and 404 handling after rollback.

## Known limitations

- Content updates require a code change and rebuild.
- Contact and meeting CTAs leave the LP for existing Gappy or GoodTime pages.
- Integrations are illustrative categories; compatibility is evaluated per workflow and system.
- No analytics is collected by default.
- The sitemap contains the production default origin. If the production hostname changes, update it together with `PUBLIC_SITE_URL`.

## Future integration into `gappy.jp/ja/travel`

Keep this project isolated until the LP and its conversion flow are proven. A future integration can either port the shared locale data and Astro markup into the corporate stack or route the corporate path to this static asset deployment. That change should be evaluated separately so it does not alter the current corporate build unexpectedly.

## No-CMS content update method

Edit localized text in `src/data/site.ts`, review both `/` and `/en/`, run the check and build commands, and deploy through the normal Git review flow. Structural changes belong in shared Astro components. Do not fork the Japanese and English UI into separate implementations.

## Expected paid services

- Hosting: expected `$0` within Cloudflare free/static asset usage
- Database: none
- CMS: none
- Form backend: none
- Analytics: none by default
- Paid font: none
- Paid stock image: none

Cloudflare Web Analytics may be evaluated later as an optional dashboard setting. It is not injected by this project.
