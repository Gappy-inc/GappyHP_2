# Gappy Typography / Visual / Motion Refinement Report

## Initial state

- Baseline production source: `f07a77778fb095463214e274ec006ded4b334982`
- The v3 site already had a strong black / white / Gappy green editorial direction and 16 stable EN/JP routes.
- Home and inner-page heroes shared an oversized display scale, small UI labels were often 9–10px, and Japanese line breaks were left too heavily to automatic balancing.
- Travel workflows were primarily text cards/rows. Motion existed, but the Axis triangles drifted decoratively rather than communicating operational progress.

## Typography decisions

- Split the previous shared display style into role-specific `hero-title`, `page-title`, `section-title`, `subsection-title`, `body-lead`, and metadata tokens.
- English hero: up to 88px desktop, 40–48px mobile.
- Japanese hero: up to 68px desktop, 34–40px mobile.
- English page hero: up to 64px; Japanese page hero: up to 52px.
- Section headings: up to 44px English / 38px Japanese with 26–30px / 24–28px mobile ranges.
- Body copy: 17–19px desktop and 15–18px mobile, with locale-specific line-height.
- Small labels and UI metadata were raised to 12–13px in practical UI contexts.

## Font decisions

- Retained `Space Grotesk` for English and `Noto Sans JP` for Japanese through `next/font`.
- Retained `DM Mono` for operational labels and indices.
- No new font request, CSS import, or runtime dependency was added. Existing self-hosted `next/font` delivery keeps layout shift risk low.
- Weight hierarchy now uses 700 for hero statements, 600–700 for section headings, 400–500 for body copy, and 500–600 for navigation/CTA text.

## JP readability improvements

- Japanese body copy uses Noto Sans JP first, 1.9 line-height, strict line breaking, and reduced negative letter spacing.
- Home H1 uses a deliberate semantic line break: two lines on desktop and three on mobile.
- Browser QA measured the Japanese home H1 at 68px / two lines on desktop and 39.78px / three lines on 390px mobile.
- Japanese page heroes measured 52px on desktop; mobile page titles use the 30–36px range.
- Japanese CTA labels retain 48px touch height and fit without horizontal overflow.

## Visual asset strategy

- Created a single typed `CaseVisual` component with six distinct SVG compositions rather than six unrelated image styles.
- The SVGs use only the Gappy white / black / green system, a shared technical frame, precise lines, operational nodes, and accessible localized labels.
- Assets are inline, responsive, resolution-independent, and require no extra network request.

## New case visuals

1. **Supplier Operations** — email → context → portal → verified confirmation path.
2. **Booking Operations** — incoming booking queue converging into an operating system.
3. **Reconciliation** — supplier and internal records compared through a controlled verification point.
4. **QA & Fulfillment** — integrity/milestone checklist, exception review, and completed outcome.
5. **Schedule Changes** — a time-shift event propagating to supplier, booking, and customer branches.
6. **Customer Communication** — policy/context hub orchestrating email, message, notice, and update delivery.

## Motion strategy

- Replaced decorative Axis drift with a vertical operational signal.
- Added a synchronized seven-step workflow activation line, with a stronger Verify pulse.
- Added dashed signal propagation and sequential node activation for change/system diagrams.
- Added a dedicated `VerificationPath` showing Action → Verify → Completion.
- Added semantic hover response: line extension, 6px arrow movement, node activation, and copy emphasis.
- Used CSS transforms, opacity, stroke dash-offset, and lightweight SVG only; no WebGL, video, particle, parallax, or animation library was added.

## Motion primitives

- `axis-signal`
- `axis-pulse`
- `workflow-line`
- `workflow-node` / `workflow-node--verify`
- `signal-path` / `signal-node`
- `verify-path` / `verify-node`
- `view-react`
- `capability-row` and `case-row` hover states

## Homepage changes

- Refined EN/JP hero scales, line breaks, CTA rhythm, and Axis behavior.
- Reworked the workflow area into six editorial case rows with purpose-built SVGs.
- Converted oversized dark-section statements to the unified heading scale.
- Added a visual verification path beside the technology capability rows.
- Refined Projects, Careers, and final CTA typography for consistency.

## Inner page changes

- `Travel`: six case visuals integrated into a two-column editorial workflow system; section and meta type normalized.
- `Technology`: seven-step workflow motion and Action → Verify → Completion visual added; layers and principles normalized.
- `Cases`: schedule-propagation visual added to the flagship case; section typography normalized.
- `About`, `Resources`, `Careers`, `Contact`: page/section/subsection hierarchy and metadata readability normalized.

## Accessibility

- Semantic heading hierarchy retained.
- SVG figures include localized accessible names.
- All essential visual meaning is present in the static SVG state.
- `prefers-reduced-motion: reduce` reduces animation and transition durations without hiding content.
- Existing visible focus treatment, keyboard navigation, skip link, accessible language switch, and 44px+ primary touch targets were retained.
- Bright green is used as an accent/graphic or with dark text; long-form copy uses dark or muted neutral colors.

## Performance

- No new runtime dependency, client component, image request, video, or JavaScript animation was added.
- New assets are inline SVG and CSS animation.
- Production build First Load JS remains approximately 103–111 kB across the public routes.
- Browser QA found no horizontal overflow or console errors on required P0 views.
- Exact field Core Web Vitals require post-deployment real-user data; the implementation avoids the common LCP/CLS/INP regressions targeted by this mission.

## SEO regression check

- 16/16 public EN/JP routes returned HTTP 200 in local production-equivalent QA.
- Canonical: PASS on all routes.
- Hreflang: PASS (`en`, `ja`, `x-default`) on all routes.
- HTML lang: PASS (`en` / `ja`) on all routes.
- Same-path language switch: PASS on all route pairs.
- Sitemap: PASS, 16 URLs.
- Metadata and route topology were not changed.

## Visual QA

- EN: `/` desktop/mobile, `/travel` desktop, `/technology` desktop — PASS.
- JP: `/ja/` desktop/mobile, `/ja/travel` desktop, `/ja/technology` desktop — PASS.
- Checked font consistency, H1 wrapping, visual quality, whitespace, CTA rhythm, overflow, layout stability, and console errors.

## Validation

- `npm ci`: PASS.
- `npm run lint`: PASS, zero warnings/errors.
- `npm run build`: PASS, 21 generated app routes including all 16 public EN/JP routes.
- Dedicated test script: not present; no script was added solely for this mission.
- `git diff --check`: PASS.

## Production SHA

- Implementation source commit: `8914071d79d0ffd8b9bab0f2fb96d075043a0981`
- Final production deployment SHA is recorded in the mission response after PR merge and deployment verification.

## Rollback SHA

- `f07a77778fb095463214e274ec006ded4b334982`

## Known limitations

- Core Web Vitals targets must be confirmed with production field data after sufficient traffic; local browser QA is not a substitute for CrUX/RUM.
- `npm ci` reports inherited dependency audit findings (1 moderate, 10 high). This refinement adds no packages and does not expand that pre-existing dependency surface.
- The repository has no dedicated automated test script; lint, strict TypeScript build, route/SEO assertions, and browser QA are the available gates.
