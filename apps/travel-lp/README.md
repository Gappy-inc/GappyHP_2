# Gappy Travel Product LP

Static bilingual product landing page for Gappy's AI Workforce for Travel Operations.

## Architecture

- Astro 7 with strict TypeScript
- Static Site Generation only
- Vanilla CSS and a small, framework-free mobile navigation script
- Cloudflare Workers Static Assets with no Worker script or runtime data services
- Shared locale data for `/` (Japanese) and `/en/` (English)

## Requirements

- Node.js 22.12 or later (the project `.nvmrc` selects Node 22)
- npm

## Local development

```bash
npm ci
npm run dev
```

The local site is normally available at `http://localhost:4321`.

## Validation and build

```bash
npm run check
npm run build
npm run preview
```

The static output is written to `dist/`.

## Cloudflare-compatible preview

```bash
npm run cf:preview
```

This runs a production build and serves `dist/` through Wrangler's Static Assets runtime.

## Deployment

```bash
npm run deploy
```

Deployment requires a Cloudflare-authenticated environment. This repository intentionally contains no Custom Domain, DNS, Worker route, D1, KV, R2, Durable Object, or analytics configuration.

## Environment

`PUBLIC_SITE_URL` controls canonical, hreflang, Open Graph, and structured-data URLs at build time. It defaults to `https://travel.gappy.jp`.

## Content updates

Localized product copy lives in `src/data/site.ts`. Shared markup lives in `src/components/LandingPage.astro`; do not duplicate the page for each language.
