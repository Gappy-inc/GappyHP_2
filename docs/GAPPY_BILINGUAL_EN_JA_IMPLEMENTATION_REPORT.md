# Gappy EN/JP Bilingual Implementation Report

## 1. Executive Summary

Gappy Corporate Website v2 was extended from an English-only site to a bilingual English/Japanese corporate site without changing the existing English URL architecture. English remains the default global surface. Japanese pages live under `/ja`, with the Japanese homepage canonicalized to `/ja/`.

The implementation uses shared page templates and locale content dictionaries. No i18n dependency was added.

## 2. Initial State

- Production source: `main` (Corporate Website v2 merged in PR #15)
- Pre-deploy main SHA: `99fd14bc966693ea702908367b6d82395238f4fc`
- Corporate Website v2 implementation SHA: `6dafb2662438819474c152840b79c7ea4df8de31`
- Framework: Next.js 15 App Router, React 18, TypeScript
- Package manager: npm (`package-lock.json`)
- Existing indexable English URLs: 8
- Existing sitemap: `https://gappy.jp/sitemap.xml`
- Existing production English URLs and their canonical strategy were preserved.

## 3. Locale Architecture

- `content/en.ts`: English corporate copy and UI labels
- `content/ja.ts`: Japanese localized corporate copy and UI labels
- `content/index.ts`: locale types, route map, and path conversion helpers
- `components/site/*`: eight shared locale-aware page templates
- `app/*/page.tsx` and `app/ja/*/page.tsx`: thin route wrappers that select locale and metadata

No new localization library was required because the site has a fixed set of eight corresponding page pairs.

## 4. URL Architecture

English remains at the existing root paths:

- `/`
- `/technology`
- `/travel`
- `/cases`
- `/resources`
- `/about`
- `/careers`
- `/contact`

Japanese is available at:

- `/ja/`
- `/ja/technology`
- `/ja/travel`
- `/ja/cases`
- `/ja/resources`
- `/ja/about`
- `/ja/careers`
- `/ja/contact`

`/ja` redirects permanently to `/ja/`. Existing non-root English paths remain without a trailing slash.

## 5. Japanese Pages

All eight Japanese pages were implemented with localized brand, technology, travel, project, company, careers, insights, and contact copy. Japanese content preserves the same company meaning and maturity claims as English and does not introduce unverified customer names, metrics, or market claims.

## 6. Localization Decisions

- `AI Workforce` remains an English brand term.
- High-level labels such as `Technology`, `Projects`, `Design principles`, and `Travel` remain in English where this supports the brand system.
- Long-form copy uses natural corporate Japanese rather than sentence-by-sentence literal translation.
- The current OG visual is localized through `?locale=ja` for Japanese pages.
- Existing verified company, founder, contact, and address information is reused.

## 7. Shared Components

The Header, Footer, CTA, Operating Loop, page hero, breadcrumbs, operational graph, and all eight page layouts are shared across locales. Route files contain no duplicated page JSX.

## 8. Language Switcher

- Desktop and mobile switchers display `EN / JP`.
- Every page switches to its same-path counterpart.
- The active locale is exposed with `aria-current="page"`.
- Switch links use `hrefLang`, `lang`, and explicit accessible labels.
- Tap targets are at least 44px.

## 9. International SEO

### Canonical

Every English and Japanese page has a self-referencing canonical. Japanese pages do not canonicalize to English.

### Hreflang

Every page pair emits reciprocal `en`, `ja`, and `x-default` alternates. `x-default` points to the English default surface.

### HTML Lang

Middleware attaches the requested locale to the server render. The root layout renders `lang="en"` or `lang="ja"` in the initial HTML response.

### Metadata

Titles, descriptions, Twitter metadata, OG titles/descriptions, and OG locale values are localized. English uses `en_US`; Japanese uses `ja_JP`.

### Sitemap

The sitemap contains 16 indexable URLs and language alternates for each pair.

### Structured Data

The same Organization and WebSite entities are used for both locales. Page language is expressed with `inLanguage`; no duplicate organization entity was created.

### OG Locale

English pages use `en_US` with `ja_JP` as the alternate locale. Japanese pages use `ja_JP` with `en_US` as the alternate locale.

## 10. Accessibility

- Locale-specific skip-link text
- Accessible primary and mobile navigation labels
- Accessible language-switch labels
- Visible active locale
- Keyboard-operable links and mobile menu
- Existing focus-visible styling preserved
- Japanese founder image alt text localized

## 11. Responsive QA

Browser rendering was checked at 1440px, 1280px, 768px, and 390px. Japanese headline wrapping, page hero copy, CTA widths, mobile navigation, language switcher, and horizontal overflow were inspected. The tested documents reported matching client and scroll widths at all checked breakpoints.

## 12. Performance

- No new runtime dependency
- Shared page components prevent JSX duplication
- First-load JS remains approximately 102 kB in the production build
- No duplicated locale-specific asset tree
- Locale is selected server-side so HTML language is correct before hydration

## 13. Tests

- `npm run lint`: PASS
- `npm run build`: PASS
- Rendered route status check across 16 URLs: PASS
- Rendered canonical/hreflang/html-lang/OG-locale/robots check across 16 URLs: PASS
- Pairwise language-switch mapping across 8 route pairs: PASS
- Sitemap URL count: 16
- Automated test script: not present in the repository

## 14. Production Deployment

- Pre-deploy main SHA: `99fd14bc966693ea702908367b6d82395238f4fc`
- Bilingual implementation SHA: `df532bb`
- Post-deploy SHA: `3758fe99634118a7eb60b5475490ab109892c781`
- Production URL: `https://gappy.jp`
- Production verification: 16 of 16 English/Japanese URLs live
- Rollback: redeploy `99fd14bc966693ea702908367b6d82395238f4fc` or revert the bilingual implementation commit through the normal GitHub/Vercel deployment path

## 15. Search Console Finalization

- Property: `gappy.jp`
- Sitemap: `https://gappy.jp/sitemap.xml`
- Sitemap status: Success
- Discovered URLs: 16
- Sitemap errors: 0

### Japanese Priority Index Requests

#### `/ja/`

- Current indexing status: Discovered — currently not indexed
- Live Test: PASS
- Indexable: YES
- User canonical: `https://gappy.jp/ja/`
- Google canonical: NOT_YET_DETERMINED
- Request: ALREADY_REQUESTED

#### `/ja/travel`

- Current indexing status: Discovered — currently not indexed
- Live Test: PASS
- Indexable: YES
- User canonical: `https://gappy.jp/ja/travel`
- Google canonical: NOT_YET_DETERMINED
- Request: REQUEST_ACCEPTED

#### `/ja/technology`

- Current indexing status: Discovered — currently not indexed
- Live Test: PASS
- Indexable: YES
- User canonical: `https://gappy.jp/ja/technology`
- Google canonical: NOT_YET_DETERMINED
- Request: REQUEST_ACCEPTED

#### `/ja/about`

- Current indexing status: URL not yet known to Google
- Live Test: PASS
- Indexable: YES
- User canonical: `https://gappy.jp/ja/about`
- Google canonical: NOT_YET_DETERMINED
- Request: REQUEST_ACCEPTED

#### `/ja/cases`

- Current indexing status: Discovered — currently not indexed
- Live Test: PASS
- Indexable: YES
- User canonical: `https://gappy.jp/ja/cases`
- Google canonical: NOT_YET_DETERMINED
- Request: REQUEST_ACCEPTED

### Final Search Status

- English: Production and sitemap complete
- Japanese: Production, sitemap, and priority indexing requests complete
- Google status: AWAITING_RECRAWL

## 16. Known External Blockers

- `www.gappy.jp` Cloudflare self-loop: out of scope
- Legacy Vercel project: out of scope
- Google Business Profile: out of scope

## 17. Remaining Manual Actions

None. Google crawling and indexing now proceed asynchronously.

## 18. Final Status

Mission complete. English and Japanese production pages, international SEO, sitemap discovery, and the five Japanese priority indexing requests are complete. Search result inclusion remains subject to Google's crawl and indexing systems.
