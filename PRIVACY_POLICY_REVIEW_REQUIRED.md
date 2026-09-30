# Privacy review — required before activation

Status: NOT APPROVED. EN `/privacy`, JP `/ja/privacy` are implementation-based review drafts, noindex and excluded from the existing sitemap until approval. They do not replace legal advice. Public GA4 collection remains disabled.

Human/legal decisions:
- Approve both page texts and EN/JP consent wording, including accessibility and equal-choice buttons.
- Approve all-region explicit opt-in (no geo detection) and versioned localStorage decision. No ID, timestamp, campaign or history in consent storage.
- Identify controller and contact responsibility; confirm company/contact details already used by the site.
- Approve purpose, lawful basis, covered jurisdictions, processors, international transfers and required disclosures. Do not infer these from repository code.
- Approve actual GA4 retention settings, cookie lifetimes, property access roles and named access/deletion request owner. No retention duration or owner is invented here.
- Approve withdrawal semantics: future events blocked, accessible first-party GA cookies removed best-effort, previously collected Google data NOT erased by this control.
- Review Google terms, property settings and privacy disclosure links before launch.
- Approve deployment of this notice, remove draft wording only after review, and decide indexing. Do not silently label it legally approved.

Operational limitations: storage blocked → current-document choice only; new document defaults denied. Storage changes in other tabs synchronize; deleting the key defaults denied and asks again. Browser DNT and automation/QA exclusion remain respected. No analytics on the privacy routes themselves; settings remain accessible there. A loaded third-party script cannot be unloaded reliably; actual post-revocation network behavior must be tested with the real approved ID before Production acceptance.
