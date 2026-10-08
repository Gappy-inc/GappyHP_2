# Reference audit — 2026-10-08

Current status: **REFERENCE AUDIT COMPLETE — READY**

The user subsequently instructed “これで行く”, referring to the Airレジ-only finding. This authorizes one reference LP interpreted as three different designs. All 22 brand pages have now been read and visually reviewed; repository and public-site checks are complete. See `design-mapping.md` for current scope and mappings and `qa-report.md` for implementation verification.

The initial blocked audit below is retained as historical evidence, not the current execution status.

Initial status: **BLOCKED_REFERENCE_CLASSIFICATION**

## Access

- Google Drive: PASS. The supplied folder `1qujbGA6pJDga8u_2Bwkfu9RSPIiG0jCW` is titled Airレジ. Folder fetch returned 21 PNG files and no subfolders. An image metadata search returned the same 21 files, without a next-page token.
- Original files: PASS. All 21 streamed raw-file references were downloaded. Initial sandbox DNS resolution failed; the permitted network retry succeeded. Every local byte count matches Drive metadata; all images decode as PNG. Dimensions and SHA256 are in `image-inventory.csv`. Originals are in `/tmp/gappy-lp-reference-audit/`; contact sheets are saved beside this report.
- Visual access: PASS. All 21 images were reviewed in four contact sheets. Classification uses visible logos, product interfaces, copy, color, composition, and section continuity, not filenames or capture times.
- Brand Playbook: local PDF opens and contains 22 pages. Full text/visual brand review is NOT RUN because reference classification blocks subsequent work.
- Current repository: `GappyHP_2_localization`, remote `https://github.com/Gappy-inc/GappyHP_2.git`. Root package is Next.js 15.5.24 with React 18, not the historical Astro configuration. Detailed implementation audit is NOT RUN. Existing untracked `.DS_Store` files were not changed.
- Current public site comparison: NOT RUN; stopped before implementation preflight completion.

## Classification

- Total image files: 21
- Distinct LP groups: 1 — Airレジ
- Desktop: 21 desktop section crops; pixel dimensions alone do not establish CSS viewport sizes.
- Mobile / Tablet screenshots: 0 / 0. Tablet devices pictured inside desktop layouts are product illustrations, not tablet viewport captures.
- Unclassified images: 0
- Exact duplicates: 0 (21 unique SHA256 hashes)
- Visually redundant full sections: 0 observed. Hero and final CTA repeat product and logo intentionally, with different layouts.
- Confidence: High

The first image shows the AirREGI wordmark and POS-register hero. Subsequent images retain the cyan/pale-blue palette, Japanese typography, POS tablet interface and Airレジ wording. Numbered features run from 1 to 5. Later sections show related services, users, features, onboarding, hardware, support, FAQ and a matching final CTA. The last crop shows the associated footer. These are sequential sections of one LP, not three independent references.

## Group 01 structure

The precise filenames and visual descriptions appear in CSV order:

1. Hero and navigation
2. Announcements
3. Three value propositions
4. Video poster
5. Feature 1 and reasons introduction
6. Feature 2 and campaign banner
7. Feature 3
8. Feature 4
9. Feature 5
10. Related services
11. Trust/photo mosaic
12. Customer cards
13. Feature directory
14. Industry cards and updates
15. Onboarding steps
16. Hardware peripherals
17. Support cards
18. FAQ
19. Final CTA
20. Download resources and articles
21. Footer

## Observed design structure

1. Hero: left-aligned promise and two stacked CTAs beside a large real-world hardware photograph.
2. Navigation: narrow blue utility strip above white brand/navigation header.
3. Grid: centered content in wide full-width bands; alternating two-column features; three- and four-column cards. Exact CSS content width is not observable.
4. Spacing: generous vertical padding, large centered section intros, consistent horizontal alignment. Exact CSS measurements are not established.
5. Headings: blue Japanese section headings; numbered feature headings, smaller dark explanatory body copy.
6. CTAs: orange rounded registration action, secondary white/blue consultation action; smaller pill-shaped detail links.
7. Order: outcome, announcements, benefits, numbered features, integrations, customer proof, feature/industry directories, onboarding, hardware, support, FAQ, final CTA, resources, footer.
8. Product UI: large tablet and phone screens; UI rendered inside physical devices.
9. Cards: rectangular photo-led cards with subtle border/shadow; structured multi-column content.
10. Backgrounds: white and pale blue alternate; saturated blue benefit/hardware sections; dark customer-photo banner and gray footer.
11. Type scale: hero larger than section headings, followed by feature headings and compact body copy; exact font family/size cannot be verified from screenshots.
12. Photography: hardware, shop staff, customer portraits; simple line icons for benefits and onboarding.
13. Proof: award badge, customer portrait mosaic and three testimonial cards. These facts belong to Airレジ and are not evidence for Gappy.
14. Final CTA: centered product/brand lockup, orange registration CTA and App Store badge.
15. Footer: dense multi-column navigation and related-service lists on dark gray.
16. Responsive behavior: Not observable. No mobile screenshots supplied. Animation, hover, accordion operation and sticky behavior: Not observable.

## Selected references

- LP A: not assigned. Group 01 is a usable candidate, but selection of a comparative set requires three independent references.
- LP B: unavailable.
- LP C: unavailable.

Implementation readiness: **BLOCKED**

The user's Step 5 explicitly requires stopping when three independent LPs cannot be identified. Supply screenshots for at least two additional independent LPs, or the intended parent folder containing all three sets. Do not artificially split Group 01.

## Work preserved

Saved image inventory, original Drive metadata, four visual contact sheets, this audit and selection status. No application source, existing routes, CTAs, forms, SEO, analytics, dependencies, deployment or DNS were changed. Build, browser QA, visual repair and regression checks are NOT RUN because no implementation was started. No commit, push, PR, merge or deployment was performed.
