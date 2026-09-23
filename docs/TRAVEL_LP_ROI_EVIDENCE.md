# Travel LP ROI evidence review

Status: **CALCULATOR_ONLY**

Review date: 2026-09-23
Public numeric Gappy performance claims approved by this review: **none**

## Scope and sources

This was a read-only review of authorized repository evidence. No Production database, customer record, guest PII, guide PII, or supplier PII was accessed.

Sources inspected:

- `gappymitsuki/gappy-tour-os`, `main` and the current PR #67 branch at the time of review.
- `docs/internal-alpha/INTERNAL_ALPHA_METRICS.md`
- `docs/internal-alpha/INTERNAL_ALPHA_UAT_REPORT.md`
- `docs/gappy-live/REAL_WORKITEM_LEDGER.md`
- `docs/gappy-live/AS_BUILT_AUDIT.md`

The documents define measurement concepts and controlled test procedures, but do not contain a completed real-operations measurement window. The UAT and real-work ledgers state that the real-provider run has not started and that zero of the required real WorkItems have been sent or acknowledged. Synthetic/local runs are not treated as operational ROI evidence.

## Metric assessment

| Potential public metric | Definition | Numerator | Denominator | Time window | Sample size | Source / calculation | Data type | Limitations | Publishable? |
| --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- |
| Eligible workflow cases | Cases meeting a predeclared workflow and measurement inclusion rule | Eligible cases | All reviewed cases | Not started | 0 real cases | Real WorkItem ledger | Internal planning | No completed real measurement window | No |
| Verified Completion Rate | Eligible cases that reach verified completion with current evidence | Verified eligible cases | Eligible cases | Not started | 0 | Metrics definition; real ledger | Definition only | Denominator is zero; no real observations | No |
| Human Touch Rate | Eligible cases requiring one or more human interventions | Cases with human touch | Eligible cases | Not started | 0 | Metrics definition | Definition only | No real observations | No |
| Median Time to Verified Completion | Median elapsed time from eligible trigger to verified completion | N/A (median) | Completed eligible cases | Not started | 0 | Metrics definition | Definition only | No completed real cases or timestamps | No |
| Confirmation / reconfirmation count | Confirmations or reconfirmations completed within the defined workflow | Completed confirmation events | Eligible cases or reporting period | Not started | 0 | Real WorkItem ledger | Internal planning | Ledger entries remain pending | No |
| Follow-ups automatically handled | Follow-ups executed inside a bounded rule without manual execution | Qualifying follow-ups | Eligible follow-ups | Not started | 0 | UAT plan and ledger | Test definition | No external real-provider event is recorded | No |
| Human interventions | Human approvals, decisions, or handoffs on eligible cases | Intervention events | Eligible cases | Not started | 0 | Metrics definition | Definition only | No real operational event set | No |
| Human minutes per booking | Direct human handling minutes attributed to an eligible booking | Sum of measured human minutes | Eligible bookings | Not defined | 0 | No baseline source found | Unavailable | Manual baseline and collection method are absent | No |
| Hours or cost saved | Difference between a measured manual baseline and measured post-change handling | Baseline effort minus observed effort | Comparable eligible cases | Not defined | 0 | No valid calculation available | Unavailable | Must not be inferred from workflow activity | No |

## Public rendering decision

The Travel LP must not render an internal Gappy metric band at this time. It may render the client-only ROI calculator because every result is derived exclusively from visitor-entered assumptions and is labeled as illustrative, not a result, benchmark, or guarantee.

The calculator formulas are:

```text
baseline_hours = monthly_cases × manual_minutes / 60
addressable_hours = baseline_hours × coverage_rate
hours_returned = addressable_hours × assumed_reduction_rate
monthly_capacity_value = hours_returned × loaded_hourly_cost
annual_capacity_value = monthly_capacity_value × 12
```

No foreign-exchange conversion is performed. A future public Gappy metric requires a predeclared cohort, non-zero eligible sample, fixed time window, traceable event source, reviewed calculation, and explicit approval for publication.
