# Travel landing page measurement handoff

The repository does not currently send analytics to an approved destination. The Travel landing page emits a browser `CustomEvent` named `gappy:travel-lp-event` so a future site-wide adapter can be added without changing the conversion components.

This event bridge is instrumentation only. It is not durable measurement and must not be described as analytics implementation until an approved destination receives and validates the events.

The event detail is intentionally bounded:

```ts
{
  name: TravelEventName
  entryLocation?: 'hero' | 'sticky' | 'video' | 'final'
  progress?: 25 | 50 | 75 | 100
}
```

Raw email, booking data, guide data, tokens, and arbitrary query parameters are never included.

| Event | Meaning |
| --- | --- |
| `travel_lp_view` | English Travel LP client layer mounted |
| `demo_gate_view` | Visitor explicitly opened the video access UI |
| `email_submit_attempt` | A syntactically valid request was sent to the first-party API |
| `lead_capture_success` | The configured private destination returned durable acceptance |
| `lead_capture_error` | Validation, configuration, timeout, or destination failure |
| `video_play` | Native video player emitted `play` |
| `video_progress_25/50/75` | Native player crossed the named duration threshold |
| `video_complete` | Native player emitted `ended` |
| `booking_cta_click` | Visitor selected the external GoodTime scheduling link |
| `sample_demo_start` | Visitor ran the local fictional workflow fixture |
| `sample_demo_verified` | Prototype reached current-confirmation verification |
| `sample_demo_reconfirmation` | Prototype invalidated a confirmation after a booking change |

`booking_cta_click` is not a confirmed meeting. A `meeting_booked` event must only be added after a verified GoodTime callback, approved integration, or separately reconciled booking record exists.

Likewise, lead acceptance is not email verification, email delivery, a qualified conversation, a pilot start, or product-market fit. Those measures need independent sources of evidence.
