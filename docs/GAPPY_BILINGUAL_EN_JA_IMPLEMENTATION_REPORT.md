# Gappy EN/JP Bilingual Implementation Report

## 1. Executive Summary

Gappy Corporate Website v2 was extended from an English-only site to a bilingual English/Japanese corporate site without changing the existing English URL architecture. English remains the default global surface. Japanese pages live under `/ja`, with the Japanese homepage canonicalized to `/ja/`.

The implementation uses shared page templates and locale content dictionaries. No i18n dependency was added.

## 2. Initial State

- Production source: `codex/gappy-corporate-v2`
- Pre-deploy SHA: `6dafb26`
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

- Pre-deploy SHA: `6dafb26`
- Post-deploy SHA: Pending deployment
- Rollback: redeploy `6dafb26` or revert the bilingual implementation commit through the normal GitHub/Vercel deployment path

## 15. Search Console

- Sitemap: Pending production deployment and resubmission
- Japanese URLs requested: Pending production live tests

## 16. Known External Blockers

- `www.gappy.jp` Cloudflare self-loop: out of scope
- Legacy Vercel project: out of scope
- Google Business Profile: out of scope

## 17. Remaining Manual Actions

None unless GitHub/Vercel/Search Console presents MFA, CAPTCHA, or reauthentication.

## 18. Final Status

Implementation and local QA are complete. Production, PR, deployment, and Search Console fields will be updated after the authorized release workflow finishes.
