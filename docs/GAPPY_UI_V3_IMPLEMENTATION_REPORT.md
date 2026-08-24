# Gappy Corporate Website v3 — UI/UX Redesign Implementation Report

## 1. Mission

Redesign the existing English/Japanese Gappy corporate website around a new visual system without changing its public URL structure or international SEO architecture.

## 2. Source and Release Baseline

- Repository: `Gappy-inc/GappyHP_2`
- Working branch: `codex/gappy-ui-v3`
- Production/main baseline: `3758fe99634118a7eb60b5475490ab109892c781`
- Baseline verification: GitHub `main` and the deployed bilingual release matched before implementation
- Public URL: `https://gappy.jp`

## 3. Reference Audit

The BitStar corporate site was reviewed as an abstract reference for:

- decisive first-screen type scale;
- sparse editorial rhythm;
- early capability positioning;
- compact navigation;
- clean corporate footer structure;
- restrained motion.

No copy, assets, layout, or proprietary interaction was reproduced. The Gappy result uses its own operating-workforce narrative and a bespoke axis-based visual grammar.

## 4. Visual Concept — GAPPY AXIS

The new system expresses the movement from trigger to verified completion through a central horizontal/vertical axis and two opposing triangular markers.

- Upward green triangle: trigger, motion, initiation
- Downward black/white triangle: completion, verification, control
- Connecting axis: movement across fragmented systems
- Sparse pulse nodes: bounded events and handoffs

The official supplied Gappy logo is the source of truth for the wordmark and integrated axis geometry. The production asset preserves its original Gappy Green color, proportions, and transparent background; only unused transparent canvas around the artwork is trimmed for efficient responsive display. Page-level axis motifs abstract the same directional relationship without redrawing the logo.

## 5. Design System

### Color

- Warm paper: `#FBFBF7`
- Paper secondary: `#F2F2EC`
- Near black: `#0B0C0C`
- Gappy Green: `#00FF7D`
- Muted text: `#5F625F`

Green is reserved for directional markers, active rules, indices, and the final CTA. Most surfaces remain warm white or near black.

### Typography

- English display and UI: Space Grotesk
- Japanese: Noto Sans JP
- Operational labels: DM Mono
- Hero scale: up to 9rem desktop, fluid down to mobile
- Inner-page heroes reuse the same editorial architecture

### Component Primitives

- `AxisMark`
- `GappyAxis`
- `SectionLabel`
- `CapabilityRows`
- `OperatingLoop`
- `OperationalGraph`
- `PageHero`
- `CTASection`

## 6. Home Page Architecture

1. Exact bilingual hero statement with intentional line break
2. What We Build editorial statement
3. Seven-stage operating loop rendered as a connected rail
4. Near-black travel visual break with an operational diagram
5. Travel workflows rendered as editorial rows
6. `Action ≠ Completion` technology statement and capability list
7. Number-led projects section
8. Insights and About rhythm section
9. Large Careers banner
10. Full Gappy Green closing CTA

## 7. Inner Pages

All seven inner templates, in both languages, now inherit the v3 system:

- Technology
- Travel
- Projects
- Insights
- About
- Careers
- Contact

Rounded SaaS cards, deep drop shadows, and navy/gold treatments were removed. Content is organized through border lists, numbered rows, vertical rails, black editorial sections, and shared page heroes.

## 8. Navigation and Footer

- Minimal fixed desktop navigation
- Active-page green rule
- Same-path EN/JP switch retained
- Full-height near-black mobile navigation architecture
- Escape-to-close behavior retained
- Mobile body scroll locking added
- Footer rebuilt as a black editorial destination with all seven inner links, contact details, same-path language access, and the Gappy operating statement

## 9. Motion and Accessibility

- Motion is limited to small axis drift, pulse, and path-flow cues
- No video or motion dependency is required for comprehension
- `prefers-reduced-motion` disables animation and transition duration
- Focus-visible states use a 2px Gappy Green outline
- Buttons and language controls retain 44px minimum target sizing
- Semantic headings, lists, navigation labels, button labels, and diagram alt text are retained

## 10. Responsive QA

Browser rendering was inspected using a local responsive harness and then removed from the source tree.

| Width | Locale / Page | Result |
| --- | --- | --- |
| 1440 | JP Home | PASS — wide editorial scale and two-column axis |
| 1280 | EN Home, EN Technology | PASS — no horizontal overflow |
| 1024 | EN Home | PASS — desktop navigation and axis layout |
| 768 | EN Technology | PASS — mobile navigation and single-column hero |
| 390 | JP Home | PASS — natural four-line Japanese hero |
| 375 | EN Home | PASS — three-line hero and two CTA buttons fit |

The Tailwind layout also covers the requested 1440, 1280, 1024, 768, 390, and 375 breakpoints without route-specific CSS.

## 11. SEO and Route Regression

All 16 public routes passed production-mode checks:

- HTTP 200
- exactly one H1
- correct HTML `lang`
- canonical present
- English hreflang present
- Japanese hreflang present
- x-default hreflang present
- same-path language switch retained

Sitemap result:

- 16 URLs total
- 16 unique URLs
- 8 English URLs
- 8 Japanese URLs

No URL, metadata copy, canonical, hreflang, sitemap, robots, organization JSON-LD, or identity configuration was changed.

## 12. Verification Commands

- `npm ci`: PASS
- `npm run lint`: PASS — no warnings or errors
- `npm run build`: PASS on Next.js 15.5.23
- Automated tests: not present in this repository
- Production-mode 16-route SEO regression: PASS

First Load JS remains approximately 103 kB shared; route payloads remain 136–176 B before shared chunks.

## 13. Dependency Note

Next.js was minimally patched from 15.5.9 to 15.5.23 after the final dependency audit identified advisories fixed within the same release line. A separate future framework migration should evaluate Next.js 16 and its React/runtime requirements; remaining audit reports originate in transitive packages bundled by the 15.x toolchain and require a major framework change or upstream backport.

## 14. Release Procedure

1. Commit the complete v3 implementation and the prior bilingual finalization report update.
2. Push `codex/gappy-ui-v3`.
3. Open PR titled `feat: redesign Gappy corporate site with new visual system`.
4. Confirm GitHub checks.
5. Merge to `main`.
6. Confirm deployment SHA and production availability.
7. Re-run the 16-route production verification and visual spot checks.

## 15. Search Console Decision

No sitemap resubmission or indexing request is needed for this release because the public URLs, canonicals, hreflang graph, sitemap, metadata, and crawl directives are unchanged. Search Console should continue from the already completed bilingual submission state.

## 16. Rollback

If a production rollback is required, revert the v3 merge commit or redeploy baseline SHA `3758fe99634118a7eb60b5475490ab109892c781` through the normal GitHub/Vercel release path.
