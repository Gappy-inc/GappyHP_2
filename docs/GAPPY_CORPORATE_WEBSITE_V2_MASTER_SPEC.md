# Gappy Corporate Website v2 — Master Specification

## Purpose

This document is the repository source of truth for Gappy's corporate website v2. The site must present Gappy as an applied AI company with a reusable operating capability, not as a travel-only SaaS product, a generic AI agency, or a chatbot company.

## Brand Architecture

```text
Gappy
→ Applied AI / AI Workforce Company
→ AI Workforce for Business Operations
→ Starting with travel
→ AI Workforce for Travel Operations
→ Specific operational workflows
```

The one-sentence comprehension test is:

> Gappy is an AI company building AI Workforce for complex business operations, starting with travel.

Locked expressions:

- Corporate category: `AI Workforce for Business Operations`
- Hero: `AI that gets business done.`
- Vertical narrative: `Starting with travel.`
- Current flagship: `AI Workforce for Travel Operations`
- Mission: `Make complex operations autonomous.`

## Audience Priority

1. Enterprise customers
2. Investors
3. CTOs, engineers, and recruiting candidates
4. Strategic partners
5. Travel industry
6. Media

The homepage explains the company. `/travel` carries the primary commercial conversion path.

## Information Architecture

Primary navigation:

- Technology → `/technology`
- Travel → `/travel`
- Projects → `/cases`
- Insights → `/resources`
- Company dropdown → `/about`, `/careers`, `/contact`
- Talk to Gappy → verified GoodTime scheduling destination

`News` is intentionally omitted until at least two genuine, publishable items exist. `/news` permanently redirects to `/resources` and is not in the sitemap.

Indexed route set:

- `/`
- `/technology`
- `/travel`
- `/cases`
- `/resources`
- `/about`
- `/careers`
- `/contact`

Legacy route handling:

- `/workflows` → `/travel#workflows`
- `/solutions` → `/travel#workflows`
- `/solutions/platform` → `/technology`
- `/solutions/partners` → `/cases`
- `/solutions/insight` → `/resources`
- `/news` → `/resources`

## Page Responsibilities

### Home

Corporate thesis first: hero, shift from storing work to executing work, AI Workforce operating loop, Travel as the first vertical, Travel workflows, technology capability, active project area, Insights, company, careers, and final CTA. Do not render empty proof or news modules.

### Technology

Explain bounded operational responsibility through the operating loop, context, system interaction, verification, human control, and design principles. Never present unverified certifications.

### Travel

Present the commercial flagship: travel operating complexity, target operator categories, supplier reconfirmation example, six workflow areas, existing systems, bounded deployment, and measurement concepts. Do not publish invented performance figures.

### Projects

Show one truthful primary project area—AI Workforce for Travel Operations—and the design partnership lifecycle. Customer names, metrics, and confidential implementation details require disclosure approval.

### Insights

Present working topics without fake dates, authors, or article pages. Add authored publications only when genuine material exists.

### About

Explain the company, mission, why now, operating principles, founder view, and verified company information.

### Careers

Explain the work and conceptual disciplines without presenting a discipline as a current vacancy. Use open-application language only.

### Contact

Provide distinct paths for enterprise/design partners, strategic partners/investors, engineering/careers, and media/industry, using the verified scheduler and email address.

## Visual System

Direction: **Technical Corporate, not SaaS Template.**

- Warm ivory backgrounds
- Deep navy technical sections
- Graphite body copy
- Muted gold as a restrained state and rule accent
- Editorial type scale and generous negative space
- Dense information only where it clarifies a system or workflow
- Operational Networks as the primary visual motif
- HTML, CSS, and SVG diagrams; no fake product screenshots
- Subtle state/path motion with `prefers-reduced-motion` support

Prohibited visual language includes AI brains, robots, generic humanoids, purple AI gradients, fake dashboards or chat interfaces, stock tourist imagery, decorative 3D orbs, and unverified customer logos.

## Copy System

Voice: calm, precise, technical, ambitious, concrete, and global.

Prefer: operate, execute, verify, bounded, workflow, authority, context, systems, completion, exception, responsibility.

Avoid maturity overclaims such as fully autonomous, human-free, replace your team, or zero-human operations.

## Content Truth Policy

Public claims must be verified or explicitly user-approved. Do not invent customers, logos, revenue, funding, employee count, integrations, certifications, accuracy, ROI, deployment counts, countries, partnerships, press, or awards. Directional language is limited to clearly framed mission and vision copy.

## SEO Strategy

- Homepage title: `Gappy | AI Workforce for Business Operations`
- Homepage description: `Gappy builds AI systems that execute complex operational work across the software businesses already use. Starting with travel.`
- Canonical URLs use `https://gappy.jp`
- Homepage structured data: `Organization` and `WebSite`
- Interior structured data: `BreadcrumbList`
- `robots.txt` permits indexing and names the canonical sitemap
- Sitemap contains only the eight indexed, substantive routes above
- Do not add `Article`, `NewsArticle`, ratings, reviews, awards, clients, or funding data without the corresponding factual content

## Accessibility, Responsive, and Performance Requirements

- Semantic heading order and landmarks
- Keyboard-operable navigation and Company menus
- Visible focus states and skip link
- Minimum 44px primary tap targets
- Meaningful image alternative text; decorative visuals hidden from assistive technology
- No horizontal overflow at 390, 768, 1280, or 1440px
- Workflow diagrams stack vertically on narrow screens
- No hover-only information
- Respect `prefers-reduced-motion`
- Avoid unnecessary dependencies, heavy animation, canvas, WebGL, and layout-shifting media
- Performance intent: LCP under 2.5s, CLS under 0.1, INP under 200ms where field conditions allow

## Release Policy

Release only after lint and production build pass, critical routes and metadata are verified, desktop/mobile visual QA passes, and no accidental `noindex`, broken CTA, or important 404 is present. The production path remains GitHub `main` through the existing Vercel integration.
