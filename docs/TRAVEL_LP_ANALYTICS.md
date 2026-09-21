# Travel landing page analytics handoff

The repository does not currently include an analytics provider. The Travel landing page therefore emits a browser `CustomEvent` named `gappy:travel-lp-event` for key interactions without adding a dependency or sending data to a third party.

The event detail has this shape:

```ts
{ name: TravelEventName }
```

Proposed events:

| Event | Trigger |
| --- | --- |
| `travel_lp_view` | Interactive Travel LP client component mounts |
| `demo_start` | Visitor selects the hero demo CTA or begins the demo |
| `demo_approve` | Visitor approves the fictional guide outreach |
| `demo_response_received` | Visitor confirms from the fictional guide screen |
| `demo_verified` | Verification checks complete |
| `demo_booking_change` | Visitor changes the fictional booking time |
| `demo_reconfirmation` | The prior confirmation is invalidated |
| `pilot_cta_click` | Visitor selects a Shadow Pilot CTA |

When a site-wide analytics provider is selected, one listener can translate these events into the provider's naming and consent conventions. No production booking data is included in the event payload.
