# Gappy Corporate Website V4 — Company Reality & Trust Refinement Report

Date: 2026-08-26  
Branch: `codex/gappy-corporate-trust-v4`  
Base / rollback SHA: `e5a0761ae2eca841af685fed85560ee05a3d654b`

## 1. Summary

V4 moves the EN/JP corporate site from abstract AI positioning to a verifiable, operations-led company story. The primary focus is travel operations: Gappy executes work across existing software, keeps authority with people, records evidence, and verifies completion. The implementation avoids unsupported client names, fabricated metrics, inflated hiring claims, and unverified security certifications.

Production was not changed. Delivery stops at a reviewable pull request and Vercel Preview.

## 2. Information architecture

- The primary navigation is now Travel, Technology, Work, Company, and Careers.
- Home is structured as Hero, What We Build, Travel, Current Work, Technology, Company, Careers, and CTA.
- `/travel` explains the target operators, current focus, six concrete workflows, system boundaries, deployment model, and success criteria.
- `/technology` explains Context, Authority, Execution, Verification, human escalation, and the operating loop.
- `/cases` is an evidence-oriented Current Work / Validation page rather than an unsupported client-logo wall.
- `/resources` and `/ja/resources` remain reachable but are intentionally `noindex, follow` and excluded from the sitemap.
- `/privacy`, `/ja/privacy`, `/security`, and `/ja/security` are new first-class routes.

## 3. Visual changes

- Unified the interface around ivory, navy, black, and the Gappy signal green (`#00ff7d`).
- Replaced generic hero abstraction with a semantic six-step execution trace: Trigger → Understand → Operate → Communicate → Verify → Complete.
- Added status, workflow metadata, trust-strip, verification-path, operating-loop, timeline, and current-openings primitives.
- Added clear page-hero variants for brand, product, technology, company, and utility pages.
- Reduced the footer footprint and made company identity, legal routes, and contact information easier to verify.
- Replaced the 4 MB founder source with a metadata-stripped, responsive 73 KB WebP and removed three unused executive portraits plus the unrelated legacy icon asset.
- Rebuilt the 1200 × 630 social image around the current travel-operations story; the raster file is approximately 20 KB.
- Motion is finite, purposeful, and disabled under `prefers-reduced-motion: reduce`.

## 4. Content changes

- EN and JP home pages now lead with real travel operations and verified completion.
- Travel workflows cover supplier reconfirmation, booking operations, reconciliation, QA / fulfillment, schedule changes, and customer communication.
- Technology copy distinguishes permission boundaries, human approval, execution, evidence, and escalation.
- Work is explicit about what is currently validated and what is illustrative.
- Company content identifies the founder, corporate address, legal name, current focus, and an honest founder-led operating state.
- Careers shows no public positions and offers an Open Application without presenting disciplines as vacancies.
- Contact offers only a workflow/design-partner path and general email; no non-functional form was added.
- Privacy includes the required legal-review marker and avoids promises the implementation cannot verify.
- Security describes design controls and pilot stages without claiming certification.

## 5. Files changed

Key implementation areas:

- `app/`: global tokens, root metadata, sitemap, OG image, and four new legal/trust routes.
- `components/`: navigation, footer, hero system, motion/verification primitives, workflow evidence, and page compositions.
- `content/`: fully revised EN/JP company and product copy.
- `lib/metadata.ts`: per-route indexing control while preserving canonical and hreflang output.
- `public/`: optimized founder image and social image; obsolete oversized portraits and unrelated icon removed.
- `docs/screenshots/`: 28 baseline and 36 final browser screenshots.

## 6. Validation

Commands:

```text
npm ci                                      PASS
npm run lint                                PASS — 0 warnings / 0 errors
npx tsc --noEmit                            PASS
npm run build                               PASS — 25 generated pages
git diff --check                            PASS
```

Runtime and browser checks:

- Production-build runtime: 20/20 routes returned 200; average local response 16.0 ms, maximum 110.4 ms.
- SEO: 20/20 routes passed canonical, EN/JP/x-default hreflang, HTML lang, exactly one H1, and intended robots behavior.
- Sitemap: 18 indexable URLs; legal/trust routes included; resources routes excluded.
- Internal navigation: 20 discovered internal paths returned without 4xx/5xx.
- Responsive QA: 18 pages × 6 viewports (390, 430, 768, 1024, 1440, 1728) = 108 checks, 0 failures.
- Browser QA: no document overflow, broken images, out-of-viewport controls, nameless controls, heading-level skips, or sub-44 px non-inline mobile controls.
- Mobile menu: localized labels, focus return, Escape close, body scroll lock, and same-path language switching verified.
- Contrast: key text/focus/signal combinations range from 4.86:1 to 19.86:1.
- Reduced motion: all animations and transitions are disabled by the reduced-motion media query; no infinite animation remains in application code.
- Tests: the repository has no dedicated test script; no test framework was added solely for this change.
- Vercel Git Preview: deployment check completed successfully for the implementation commit.

## 7. Required screenshots

- EN Home desktop: `docs/screenshots/v4-final/home-desktop.png`
- EN Home mobile: `docs/screenshots/v4-final/home-mobile.png`
- JP Home desktop: `docs/screenshots/v4-final/home-ja-desktop.png`
- JP Home mobile: `docs/screenshots/v4-final/home-ja-mobile.png`
- JP Travel desktop: `docs/screenshots/v4-final/travel-ja-desktop.png`
- JP About desktop: `docs/screenshots/v4-final/about-ja-desktop.png`
- JP Careers desktop: `docs/screenshots/v4-final/careers-ja-desktop.png`
- JP Contact mobile: `docs/screenshots/v4-final/contact-ja-mobile.png`

## 8. Known limitations and follow-ups

- Legal review is required before production approval of the Privacy page.
- No verified client names, customer metrics, public job openings, or security certifications were available; the site deliberately does not invent them.
- The contact experience uses email and an external scheduling service; there is no first-party submission backend.
- Field Core Web Vitals require real traffic and are not available from local QA.
- Corporate routes remain dynamically rendered because the root layout uses request headers for locale. Converting this to static route groups is a separate architecture change.
- `npm audit --omit=dev` reports four high-severity dependency findings in the current Next.js dependency tree. The suggested complete remediation is a semver-major Next.js upgrade and should be handled as a separately scoped framework migration.
- Browserslist and baseline-browser-mapping datasets are stale; build output reports the advisory but completes successfully.
- The Preview uses Vercel Deployment Protection. The deployment completed, but route-level post-deploy inspection requires access to the owning Vercel team; protection was not weakened for QA.

## 9. Git

- Repository: `https://github.com/Gappy-inc/GappyHP_2`
- Branch: `codex/gappy-corporate-trust-v4`
- Implementation SHA: `8d10f782c0643de85875271cb84f986221e0a090`
- Base / rollback SHA: `e5a0761ae2eca841af685fed85560ee05a3d654b`
- Pull request: `https://github.com/Gappy-inc/GappyHP_2/pull/20`

## 10. Deployment

- Production: unchanged (`https://gappy.jp`)
- Target: Vercel Preview only
- Preview status: READY / Vercel check passed
- Preview URL: `https://gappy-hp-2-git-codex-gappy-corpo-ebb9d7-yutas-projects-f8eebdcf.vercel.app`
- Access: protected by Vercel login; verification is supported by the successful Vercel check plus the full local production-build and browser evidence above.
