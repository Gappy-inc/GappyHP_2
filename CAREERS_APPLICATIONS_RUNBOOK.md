# Careers application receiver contract

The public site does not store resumes or send recruitment email itself. It validates the application and forwards one server-side multipart request to an approved private receiver. The browser never receives the receiver URL, token, stored resume location, record ID, or notification details.

## Required environment variables

```text
CAREERS_APPLICATIONS_CONFIGURATION_REVIEWED=true
CAREERS_APPLICATIONS_MODE=production
CAREERS_APPLICATIONS_RECEIVER_ENABLED=true
CAREERS_APPLICATIONS_RECEIVER_URL=https://approved-private-receiver.example/applications
CAREERS_APPLICATIONS_RECEIVER_HOST_ALLOWLIST=approved-private-receiver.example
CAREERS_APPLICATIONS_RECEIVER_TOKEN=<at least 32 characters>
CAREERS_APPLICATIONS_SIGNING_SECRET=<at least 32 characters>
CAREERS_APPLICATIONS_RECEIVER_TIMEOUT_MS=8000
CAREERS_NOTIFICATION_TO=mitsuki@gappy.jp
```

Production mode is accepted only when `VERCEL_ENV=production`, the receiver is HTTPS, and its hostname is allowlisted. Local review remains unavailable unless an explicit non-production `test` configuration points to loopback.

## Receiver requirements

The receiver must:

1. authenticate the Bearer token and verify `X-Gappy-Signature`;
2. rate-limit `X-Gappy-Request-Key` without exposing applicant data;
3. enforce `Idempotency-Key` and return the same accepted record for an identical retry;
4. store the uploaded resume in private storage, never at a public URL;
5. send the recruitment notification to the supplied server-controlled `notificationTo` value;
6. return success only after both storage and notification have succeeded.

Accepted response:

```json
{
  "status": "accepted",
  "recordId": "private-record-id",
  "resumeStatus": "stored",
  "notificationStatus": "sent",
  "duplicate": false
}
```

The site displays `Application received` only for this complete response. Pending or failed resume storage, pending or failed notification, malformed responses, timeouts, network errors, and idempotency conflicts never produce a success screen.

The multipart body contains candidate fields, a normalized private resume attachment, a SHA-256 digest, the notification subject, and the configured recipient. Application data must not be added to marketing systems. Provider-side retention, deletion, access control, malware scanning, and privacy review remain production release gates.
