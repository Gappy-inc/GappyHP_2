# Travel demo access configuration

## Current release status

The UI, API contract, playable prototype video, captions, and transcript are implemented. The repository does not contain an approved lead destination or a published privacy notice. Until those are supplied, the API returns `503 unavailable`, the page states that no email was collected, and reviewers may play the clearly labeled prototype walkthrough directly.

An isolated test receiver now exists on a separate branch/PR in the private
`gappymitsuki/gappy-tour-os` repository. It is not an approved Production
destination. Website delivery remains fail-closed unless explicit test-mode
configuration is present. Test mode refuses to activate when
`VERCEL_ENV=production`. Production remains separately disabled by default.

## Lead adapter

Endpoint: `POST /api/travel/demo-access`

All collection modes require the central kill switch plus the form switch.
Setting only a webhook URL does not activate collection:

```text
TRAVEL_ACQUISITION_COLLECTION_ENABLED=true
TRAVEL_DEMO_LEAD_CAPTURE_ENABLED=true
TRAVEL_DEMO_LEAD_WEBHOOK_URL=https://approved-private-destination.example/...
TRAVEL_DEMO_PRIVACY_NOTICE_URL=https://approved-public-privacy-notice.example/...
```

The isolated engineering test additionally requires:

```text
TRAVEL_ACQUISITION_MODE=test
TRAVEL_DEMO_PRIVACY_SECRET=<separate server-only secret, at least 32 characters>
TRAVEL_ANALYTICS_TEST_ENABLED=true
TRAVEL_ANALYTICS_RECEIVER_URL=https://isolated-test-receiver.example/api/marketing/travel-events
TRAVEL_RECEIVER_TIMEOUT_MS=2000
```

These values are test controls, not Production approval. The server refuses
test mode on Vercel Production.

The disabled-by-default Production path requires all of the following in the
real Vercel Production environment:

```text
TRAVEL_ACQUISITION_MODE=production
TRAVEL_ACQUISITION_COLLECTION_ENABLED=true
TRAVEL_ACQUISITION_PRODUCTION_ENABLED=true
TRAVEL_DEMO_LEAD_CAPTURE_ENABLED=true
TRAVEL_ANALYTICS_ENABLED=true
TRAVEL_ACQUISITION_RECEIVER_HOST_ALLOWLIST=<exact approved receiver host>
TRAVEL_PRIVACY_NOTICE_HOST_ALLOWLIST=<exact approved notice host>
```

Test analytics uses `TRAVEL_ANALYTICS_TEST_ENABLED`; Production analytics uses
the distinct `TRAVEL_ANALYTICS_ENABLED` switch. Production destinations and
privacy notices must be HTTPS and their exact hostnames must be allowlisted.
Removing or setting `TRAVEL_ACQUISITION_COLLECTION_ENABLED=false` disables
both lead and event forwarding.

Required server-only authorization:

```text
TRAVEL_DEMO_LEAD_WEBHOOK_TOKEN=...
```

The bearer token is required, must contain at least 32 characters, and is never
sent to the browser. Website success requires the receiver to return the exact
`stored` contract with the matching lead reference and a persisted record ID;
an arbitrary HTTP 2xx is rejected.

The destination must be explicitly approved for Gappy marketing leads and must provide:

- durable private persistence before returning a successful HTTP status;
- idempotent handling of the supplied `Idempotency-Key` and `leadReference`;
- approved rate limiting and abuse protection;
- defined access controls, retention, deletion, and incident ownership;
- a test or sandbox destination that does not contact real prospects.

The API validates and bounds the request, allowlists the asset and entry location, forwards server-side credentials only, and returns success only after the destination returns success. It does not log the submitted email or store it in browser persistence.

An accepted response means the request was saved. It does not mean the address was verified or that an email was sent or delivered.

`GET /api/travel/demo-access` reports the form as available only when the explicit enable flag, an approved destination URL, and an approved privacy-notice URL are all valid. The public privacy notice returned by that endpoint is then linked beside the form. This keeps Preview review mode separate from public lead collection.

## Privacy blocker

The current corporate repository has no Privacy route or approved external privacy-notice URL. The LP therefore provides a direct privacy-questions contact and does not claim legal compliance. A reviewed privacy notice must be supplied through `TRAVEL_DEMO_PRIVACY_NOTICE_URL` before the live email acquisition funnel can be enabled.

## Video source

The checked-in 60-second prototype walkthrough can be regenerated with:

```bash
node scripts/render-travel-demo-video.mjs
```

The script uses only local generated UI scenes and FFmpeg. It contains no customer data, competitor media, booking-system screenshots, or outbound integrations.

## Conversion measurement blocker

The browser event bridge is documented in `docs/TRAVEL_LP_ANALYTICS.md`, but no approved analytics destination is configured. GoodTime link clicks can be instrumented locally; confirmed meetings require a verified scheduling callback or reconciliation process and are not inferred from clicks.
