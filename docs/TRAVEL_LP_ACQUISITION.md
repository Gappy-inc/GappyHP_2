# Travel demo access configuration

## Current release status

The UI, API contract, playable prototype video, captions, and transcript are implemented. The repository does not contain an approved lead destination or a published privacy notice. Until those are supplied, the API returns `503 unavailable`, the page states that no email was collected, and reviewers may play the clearly labeled prototype walkthrough directly.

## Lead adapter

Endpoint: `POST /api/travel/demo-access`

Required server-only environment variable:

```text
TRAVEL_DEMO_LEAD_WEBHOOK_URL=https://approved-private-destination.example/...
```

Optional server-only authorization:

```text
TRAVEL_DEMO_LEAD_WEBHOOK_TOKEN=...
```

The destination must be explicitly approved for Gappy marketing leads and must provide:

- durable private persistence before returning a successful HTTP status;
- idempotent handling of the supplied `Idempotency-Key` and `leadReference`;
- approved rate limiting and abuse protection;
- defined access controls, retention, deletion, and incident ownership;
- a test or sandbox destination that does not contact real prospects.

The API validates and bounds the request, allowlists the asset and entry location, forwards server-side credentials only, and returns success only after the destination returns success. It does not log the submitted email or store it in browser persistence.

An accepted response means the request was saved. It does not mean the address was verified or that an email was sent or delivered.

## Privacy blocker

The current corporate repository has no Privacy route or approved external privacy-notice URL. The LP therefore provides a direct privacy-questions contact and does not claim legal compliance. A reviewed privacy notice must be supplied and linked before the live email acquisition funnel is released.

## Conversion measurement blocker

The browser event bridge is documented in `docs/TRAVEL_LP_ANALYTICS.md`, but no approved analytics destination is configured. GoodTime link clicks can be instrumented locally; confirmed meetings require a verified scheduling callback or reconciliation process and are not inferred from clicks.
