# Gappy lead forms — launch and retry runbook

The application deliberately separates the public CTA switch from the receiver connection. A form is never reported as accepted unless the durable receiver returns the documented accepted contract.

## Launch gates

All Book a demo CTAs lead to the request form. Google Calendar is shown only after the receiver durably accepts the request; there is no direct Calendar fallback when the receiver is unavailable. Keep `NEXT_PUBLIC_LEAD_FORMS_PUBLIC_ENABLED` unset until all items below are verified so the optional brochure CTA remains hidden.

1. The receiver durably stores a record before it returns `status: "accepted"`.
2. The receiver enforces durable, shared rate limits. An application-process memory counter is not sufficient.
3. The receiver enforces `Idempotency-Key`; the same key and payload returns the original record with `duplicate: true`, while a changed payload returns `409 idempotency_conflict`.
4. Notification to `mitsuki@gappy.jp` is authenticated, observable, and retried outside the page request. The receiver returns `notificationStatus: "pending" | "accepted" | "failed"`.
5. Access, deletion, retention, failure ownership, and privacy wording have human approval.
6. GA4 Admin custom definitions/conversions and consent behavior have human approval.

Required production variables:

- `NEXT_PUBLIC_LEAD_FORMS_PUBLIC_ENABLED=true` — exposes the optional brochure CTA after every gate passes.
- `LEAD_FORMS_CONFIGURATION_REVIEWED=true`
- `LEAD_FORMS_MODE=production`
- `LEAD_FORMS_RECEIVER_ENABLED=true`
- `LEAD_FORMS_RECEIVER_URL=https://…`
- `LEAD_FORMS_RECEIVER_HOST_ALLOWLIST=receiver.example`
- `LEAD_FORMS_RECEIVER_TOKEN` — at least 32 characters; server-only.
- `LEAD_FORMS_SIGNING_SECRET` — at least 32 characters; server-only.
- `LEAD_FORMS_RECEIVER_TIMEOUT_MS` — optional, 250–8000 ms.

For local contract tests only, use `LEAD_FORMS_MODE=test` with a loopback HTTP receiver. Test mode is rejected when `VERCEL_ENV=production`.

## Receiver contract

The application sends a signed JSON request with `Authorization`, `Idempotency-Key`, `X-Gappy-Signature`, and a pseudonymous `X-Gappy-Request-Key`. The receiver must not use the application response as a notification queue.

Accepted response (HTTP 2xx):

```json
{
  "status": "accepted",
  "recordId": "durable-internal-id",
  "duplicate": false,
  "notificationStatus": "pending"
}
```

Rate limits return HTTP 429 and `{ "status": "rate_limited" }`. Reusing a key with changed content returns HTTP 409 and `{ "status": "idempotency_conflict" }`. Any other response is treated as a failure; the page does not show success.

## Failure and retry operation

- A visitor retry keeps the same random idempotency key while the form content is unchanged. Editing content creates a new key.
- A stored record with failed notification remains accepted. Operations retries notification from the durable queue and records the outcome; the browser must not resubmit the lead.
- Receiver timeouts and malformed responses return a redacted 502/504. Search receiver logs by its internal request metadata, never by exposing PII in browser logs or GA4.
- Do not copy form payloads into application logs, URLs, `localStorage`, `sessionStorage`, analytics events, or support tickets.

## GA4 and search administration still required

GA4 events are consent-gated and contain only fixed `form_type` and error taxonomy values: `lead_form_view`, `form_start`, `generate_lead`, `lead_form_error`, `booking_link_click`, and optional `resource_download_click`. `generate_lead` is emitted only after durable acceptance. Configure conversions/custom definitions in GA4 Admin separately.

After production launch, submit the updated sitemap in Search Console and inspect the four canonical form URLs. Do not index API or transient success states.
