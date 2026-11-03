# Homepage CTA analytics map

Implementation date: 2026-09-30. No visual/copy/IA changes. One delegated `trackedLink` adapter observes the existing anchors; navigation is never delayed or cancelled. Tracking below means implementation, **not verified Google receipt**.

Destinations: Demo = `https://gappy-workforce-lab-0925.mitsuki222581.chatgpt.site/`; Calendar = `https://calendar.app.google/KpXGF5RTgqRpg72n6`.

| CTA ID | JP label | EN label | Location | Destination | Event | Tracked? | Verified? |
| --- | --- | --- | --- | --- | --- | --- | --- |
| header_demo | デモを見る | View demo | Desktop header | Demo | cta_click | Consent-gated | Unit/runtime commands; receipt pending |
| header_sales | 相談する | Talk to sales | Desktop header | Calendar | cta_click | Consent-gated | Unit/runtime commands; receipt pending |
| hero_demo | インタラクティブデモを見る | Start interactive demo | Hero | Demo | cta_click | Consent-gated | Unit/runtime commands; receipt pending |
| hero_sales | 相談する | Talk to sales | Hero | Calendar | cta_click | Consent-gated | Unit/runtime commands; receipt pending |
| final_demo | インタラクティブデモを見る | View interactive demo | Final CTA | Demo | cta_click | Consent-gated | Unit/runtime commands; receipt pending |
| final_sales | Gappyに相談する | Talk to Gappy | Final CTA | Calendar | cta_click | Consent-gated | Unit/runtime commands; receipt pending |
| announcement_demo | デモを見る | View demo | Announcement | Demo | cta_click | Consent-gated | Unit/runtime commands; receipt pending |
| mobile_header_demo | インタラクティブデモを見る | Start interactive demo | Mobile menu | Demo | cta_click | Consent-gated | Unit/runtime commands; receipt pending |
| mobile_header_sales | 相談する | Talk to sales | Mobile menu | Calendar | cta_click | Consent-gated | Unit/runtime commands; receipt pending |
| proof_demo | 公開デモを体験する | Explore the public demo | Three proof links (aggregate) | Demo | cta_click | Consent-gated | Unit/runtime commands; receipt pending |
| footer_sales | デモを予約 | Book a demo | Footer | Calendar | cta_click | Consent-gated | Unit/runtime commands; receipt pending |
| footer_contact | Existing contact address | Existing contact address | Footer | Existing mailto | cta_click | Consent-gated; address NOT sent | Unit/runtime commands; receipt pending |
| workflow_demo / verification_demo / recovery_demo | — | — | — | No Demo anchors in these sections | None | Not invented | Source inspected |
| language_switch | EN / JP | EN / JP | Header, mobile menu, footer | Existing locale link | language_switch | Consent-gated; same-locale suppressed | Unit/runtime commands; receipt pending |

`cta_click`: cta_id, cta_location, locale, destination_type. No label, raw URL, booking data or email. Shared page parameters are sanitized. `language_switch`: from_locale, to_locale. No meeting inference; booking remains a link click only. Optional section_view deliberately omitted to minimize collection.

Header/mobile locale switching keeps the existing hard navigation. Footer markup is unchanged. Internal navigation/brand links are not conversion events; permitted destination pages have page views after consent.
