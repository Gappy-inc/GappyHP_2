import { SectionLabel } from '@/components/GappyAxis'
import VerificationPath from '@/components/VerificationPath'
import {
  InteractiveConfirmationDemo,
  TrackedAnchor,
} from '@/components/travel/TravelInteractions'
import { globalTravelContent as copy } from '@/content/travel-global'
import { GOODTIME_URL } from '@/lib/config'

function HeroControlRoom() {
  const metrics = [
    ['79', 'Verified'],
    ['5', 'Waiting'],
    ['2', 'Need Approval'],
    ['1', 'Escalated'],
  ]

  return (
    <div className="border border-navy-900 bg-white shadow-[10px_10px_0_#101210]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-navy-900/20 p-5">
        <div>
          <p className="font-semibold text-navy-900">Atlas Experiences</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">Operations Control Room</p>
        </div>
        <span className="border border-navy-900/20 bg-ivory-100 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.1em]">Tomorrow · 87 bookings</span>
      </div>
      <dl className="grid grid-cols-2 gap-px bg-navy-900/15 sm:grid-cols-4">
        {metrics.map(([value, label]) => (
          <div key={label} className="bg-white p-4">
            <dd className="text-2xl font-semibold tracking-[-0.04em] text-navy-900">{value}</dd>
            <dt className="mt-1 text-xs text-ink-500">{label}</dt>
          </div>
        ))}
      </dl>
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-gold-700">Active work item</p>
            <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em]">Mt. Fuji Day Tour</h2>
            <p className="mt-1 text-sm text-ink-500">Tomorrow · 09:00 · Guide Tanaka</p>
          </div>
          <span className="border border-navy-900 bg-gold-500 px-3 py-2 font-mono text-[10px] font-medium">CONFIRMATION REQUIRED</span>
        </div>
        <div className="mt-5 grid gap-4 border-t border-navy-900/15 pt-5 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">AI recommendation</p>
            <p className="mt-2 text-sm font-medium">Contact assigned guide</p>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">Reason</p>
            <p className="mt-2 text-sm leading-6 text-ink-500">No valid confirmation exists for the current booking state.</p>
          </div>
        </div>
        <a href="#interactive-demo" className="btn-primary mt-5 w-full">Review &amp; Approve</a>
      </div>
    </div>
  )
}

function FlowStrip({ items, inverse = false }: { items: readonly string[]; inverse?: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-2" aria-label={items.join(' to ')}>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-center gap-2">
          <span className={`border px-3 py-2 text-xs font-medium ${inverse ? 'border-white/25 text-white' : 'border-navy-900/20 bg-white text-navy-900'}`}>{item}</span>
          {index < items.length - 1 ? <span className={inverse ? 'text-gold-300' : 'text-gold-700'} aria-hidden="true">→</span> : null}
        </li>
      ))}
    </ol>
  )
}

function ControlRoom() {
  const statuses = ['All', 'Needs Approval', 'Waiting', 'Reconfirmation', 'Blocked', 'Escalated', 'Verified']

  return (
    <div className="overflow-hidden border border-navy-900/20 bg-white">
      <div className="flex flex-wrap items-start justify-between gap-5 border-b border-navy-900/20 p-5 md:p-7">
        <div>
          <p className="font-semibold text-navy-900">Atlas Experiences</p>
          <p className="mt-1 text-sm text-ink-500">Tomorrow&apos;s operational queue</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Queue filters">
          {statuses.map((status, index) => (
            <span key={status} className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] ${index === 0 ? 'border-navy-900 bg-navy-900 text-white' : 'border-navy-900/20 text-ink-500'}`}>{status}</span>
          ))}
        </div>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[58rem] border-collapse text-left">
          <thead className="bg-ivory-100 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-400">
            <tr>
              {['Tour / booking', 'Date / time', 'Guide / supplier', 'Status', 'Next action', 'Deadline'].map((heading) => (
                <th key={heading} className="border-b border-navy-900/15 px-5 py-4 font-medium">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {copy.controlRoom.map((row) => (
              <tr key={row[0]} className="border-b border-navy-900/10 last:border-b-0">
                {row.map((value, index) => (
                  <td key={`${row[0]}-${value}`} className={`px-5 py-5 text-sm ${index === 0 ? 'font-medium text-navy-900' : index === 3 ? 'font-mono text-[11px] font-medium text-gold-700' : 'text-ink-500'}`}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-navy-900/15 md:hidden">
        {copy.controlRoom.map((row) => (
          <article key={row[0]} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold text-navy-900">{row[0]}</h3>
              <span className="font-mono text-[10px] font-medium text-gold-700">{row[3]}</span>
            </div>
            <p className="mt-2 text-sm text-ink-500">{row[1]} · {row[2]}</p>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-navy-900/10 pt-4 text-xs">
              <span>{row[4]}</span><span className="text-ink-400">{row[5]}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default function TravelGlobalPage() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <section className="relative overflow-hidden border-b border-navy-900/15 pb-20 pt-32 md:pb-28 md:pt-40">
        <div className="container-luxe">
          <SectionLabel index="00">{copy.hero.eyebrow}</SectionLabel>
          <div className="mt-8 grid gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-16">
            <div>
              <h1 className="page-title max-w-[13ch]">
                {copy.hero.title[0]}<br />
                <span className="text-gold-700">{copy.hero.title[1]}</span>
              </h1>
              <p className="body-lead mt-8 max-w-xl">{copy.hero.body}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <TrackedAnchor eventName="demo_start" href="#interactive-demo" className="btn-primary">{copy.hero.primary}</TrackedAnchor>
                <TrackedAnchor eventName="pilot_cta_click" href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">{copy.hero.secondary}</TrackedAnchor>
              </div>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-400">Start in Shadow Mode · Keep your booking system</p>
            </div>
            <HeroControlRoom />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionLabel index="01">The operational gap</SectionLabel>
          <div>
            <h2 className="section-title max-w-4xl">Your booking system manages the reservation.<br />The work around it is still manual.</h2>
            <div className="mt-10 border-y border-navy-900/20 py-8">
              <FlowStrip items={['Booking system', 'Spreadsheet', 'Email / messaging', 'Supplier portal', 'Human follow-up', 'Booking system']} />
            </div>
            <div className="mt-9 grid gap-6 md:grid-cols-2">
              <p className="body-lead">Post-booking operations live between systems, channels, suppliers, guides, and changing reservation data.</p>
              <p className="text-lg font-semibold leading-8 text-navy-900">The problem is not sending messages. The problem is that someone must keep watching whether the job actually finished.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/10 bg-white py-20 md:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionLabel index="02">An operator&apos;s day</SectionLabel>
            <h2 className="section-title mt-7">Your team should not have to watch every booking.</h2>
          </div>
          <ol className="grid border-l border-t border-navy-900/20 sm:grid-cols-2">
            {copy.operatorDay.map(([time, task]) => (
              <li key={time} className="grid min-h-24 grid-cols-[4.5rem_1fr] items-center border-b border-r border-navy-900/20 px-5">
                <time className="font-mono text-[12px] text-gold-700">{time}</time>
                <span className="text-sm font-medium text-navy-900">{task}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe">
          <SectionLabel index="03" inverse>Before / After</SectionLabel>
          <div className="mt-10 grid gap-px bg-white/20 lg:grid-cols-2">
            <article className="bg-navy-950 p-6 md:p-10">
              <p className="eyebrow text-white/45">Before</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">Operator watches every booking.</h2>
              <div className="mt-8"><FlowStrip items={copy.before} inverse /></div>
            </article>
            <article className="bg-white p-6 text-navy-900 md:p-10">
              <p className="eyebrow text-gold-700">After</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">Gappy watches every booking.</h2>
              <div className="mt-8"><FlowStrip items={copy.after} /></div>
              <p className="mt-9 border-t border-navy-900/15 pt-6 text-2xl font-semibold">Humans handle exceptions.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="interactive-demo" className="section-shell scroll-mt-24">
        <div className="container-luxe">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div><SectionLabel index="04">Interactive workflow</SectionLabel><h2 className="section-title mt-7">See one confirmation move from work detected to verified.</h2></div>
            <p className="body-lead max-w-2xl lg:justify-self-end">Approve the outreach, confirm as the guide, verify the current booking, then change the booking time to see why a response alone is not completion.</p>
          </div>
          <div className="mt-12"><InteractiveConfirmationDemo /></div>
          <div className="mt-8 flex justify-center">
            <TrackedAnchor eventName="pilot_cta_click" href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Start a Shadow Pilot</TrackedAnchor>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/10 bg-white py-20 md:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
          <div>
            <SectionLabel index="05">Action ≠ Completion</SectionLabel>
            <h2 className="section-title mt-7">Sending is not finishing.</h2>
            <div className="mt-9 grid gap-px bg-navy-900/15 sm:grid-cols-3">
              {[['Automation', 'Message Sent'], ['Typical AI Agent', 'Response Received'], ['Gappy', 'Outcome Verified']].map(([label, outcome], index) => (
                <div key={label} className={`p-5 ${index === 2 ? 'bg-gold-500' : 'bg-ivory-50'}`}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-500">{label}</p>
                  <p className="mt-4 font-semibold text-navy-900">{outcome}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 body-lead">Gappy checks the response against the current booking, assignment, relevant changes, source health, and available evidence before closing the work.</p>
          </div>
          <VerificationPath />
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div><SectionLabel index="06">Operations Control Room</SectionLabel><h2 className="section-title mt-7">Your team sees the exceptions.<br />Gappy watches the rest.</h2></div>
            <p className="body-lead max-w-xl lg:justify-self-end">Work is organized around what needs attention next—not decorative dashboards or activity counts.</p>
          </div>
          <div className="mt-12"><ControlRoom /></div>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe">
          <SectionLabel index="07" inverse>Concrete workflow</SectionLabel>
          <div className="mt-8 grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div><h2 className="section-title !text-white">From booking event to verified outcome.</h2><p className="mt-7 max-w-lg text-base leading-8 text-white/55">A guide confirmation is treated as operational work with context, authority, deadlines, evidence, and an explicit definition of done.</p></div>
            <ol className="grid gap-px bg-white/20 sm:grid-cols-2">
              {copy.workflow.map(([number, title, body]) => (
                <li key={number} className="min-h-52 bg-navy-950 p-6">
                  <span className="font-mono text-[12px] text-gold-300">{number}</span>
                  <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/50">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionLabel index="08">System of Action</SectionLabel>
            <h2 className="section-title mt-7">Keep your booking system.</h2>
            <p className="body-lead mt-7">Gappy does not replace your system of record. It becomes the System of Action around the operational work that spans people, channels, and tools.</p>
            <p className="mt-6 text-sm leading-7 text-ink-500">Connector classes are configured for each pilot. This list describes the operating environment, not a claim that every connector ships today.</p>
          </div>
          <div>
            <div className="grid gap-px bg-navy-900/15 sm:grid-cols-2">
              {copy.systemClasses.map((system, index) => (
                <div key={system} className="flex min-h-20 items-center gap-4 bg-white px-5"><span className="font-mono text-[11px] text-gold-700">{String(index + 1).padStart(2, '0')}</span><span className="text-sm font-medium">{system}</span></div>
              ))}
            </div>
            <div className="mt-5 border border-navy-900 bg-navy-900 p-6 text-white">
              <p className="eyebrow text-gold-300">Gappy AI Workforce</p>
              <p className="mt-4 text-xl font-semibold">Detect · Decide · Execute · Chase · Verify · Escalate</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/10 bg-white py-20 md:py-28">
        <div className="container-luxe">
          <SectionLabel index="09">Human control</SectionLabel>
          <div className="mt-7 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <h2 className="section-title">Start with control.<br />Increase autonomy with evidence.</h2>
            <ol className="grid gap-px bg-navy-900/15 sm:grid-cols-2 lg:grid-cols-5">
              {copy.autonomy.map(([title, body], index) => (
                <li key={title} className="min-h-56 bg-ivory-50 p-5">
                  <span className="font-mono text-[11px] text-gold-700">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-10 text-base font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-ink-500">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-950 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <SectionLabel index="10" inverse>Fail-closed</SectionLabel>
            <h2 className="section-title mt-7 !text-white">If Gappy cannot prove it, it does not mark it done.</h2>
            <p className="mt-7 text-xl font-semibold text-gold-300">Gappy does not guess completion.</p>
          </div>
          <div>
            <ul className="grid gap-px bg-white/20 sm:grid-cols-2">
              {copy.failClosed.map((condition) => <li key={condition} className="flex min-h-20 items-center bg-navy-900 px-5 text-sm text-white/75">{condition}</li>)}
            </ul>
            <div className="mt-4 border border-gold-300 p-5 text-center font-semibold text-gold-300">ESCALATE TO HUMAN</div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div><SectionLabel index="11">Pilot control model</SectionLabel><h2 className="section-title mt-7">Built for accountable operational work.</h2><p className="body-lead mt-7">These are product and pilot design principles—not security certifications.</p></div>
            <div className="grid border-l border-t border-navy-900/20 sm:grid-cols-2">
              {copy.trust.map(([title, body], index) => (
                <article key={title} className="min-h-52 border-b border-r border-navy-900/20 bg-white p-6">
                  <span className="font-mono text-[11px] text-gold-700">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-ink-500">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/10 bg-white py-20 md:py-28">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20">
          <div><SectionLabel index="12">First workflow</SectionLabel><h2 className="section-title mt-7">Start with one workflow.</h2></div>
          <article className="border border-navy-900 bg-gold-500 p-7 md:p-10">
            <p className="eyebrow">Primary workflow</p>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">Guide &amp; Supplier Confirmation</h3>
            <p className="mt-5 max-w-2xl text-base leading-8 text-navy-900/70">Confirmation → Chasing → Change Detection → Reconfirmation → Verification → Escalation</p>
          </article>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div><SectionLabel index="13">Shadow Pilot</SectionLabel><h2 className="section-title mt-7">You do not need to automate on day one.</h2><p className="body-lead mt-7">Shadow Mode processes real operational cases but does not send externally. Compare Gappy&apos;s decisions with how your team handles the same work.</p><TrackedAnchor eventName="pilot_cta_click" href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">Start a Shadow Pilot</TrackedAnchor></div>
            <ol className="border-t border-navy-900/20">
              {copy.pilotStages.map(([number, title, body]) => (
                <li key={number} className="grid gap-3 border-b border-navy-900/20 py-5 sm:grid-cols-[3rem_13rem_1fr] sm:items-start">
                  <span className="font-mono text-[11px] text-gold-700">{number}</span><h3 className="font-semibold">{title}</h3><p className="text-sm leading-7 text-ink-500">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div><SectionLabel index="14" inverse>Partial / Pilot-ready foundation</SectionLabel><h2 className="section-title mt-7 !text-white">Your operation. Your brand.</h2><p className="mt-7 text-base leading-8 text-white/60">Gappy adapts to your brand, operating rules, and local context—while the same AI Workforce runtime handles the work underneath.</p><p className="mt-7 inline-flex border border-gold-300 px-4 py-3 text-sm font-semibold text-gold-300">Configured with your team during pilot.</p></div>
          <div className="grid gap-px bg-white/20 sm:grid-cols-2">
            {copy.whiteLabel.map((item) => <div key={item} className="flex min-h-32 items-center justify-center bg-navy-950 p-6 text-center text-lg font-semibold">{item}</div>)}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div><SectionLabel index="15">Measurement</SectionLabel><h2 className="section-title mt-7">Measure completed work.<br />Not AI activity.</h2><p className="body-lead mt-7">Pilot baselines and success criteria are defined with your team. No benchmark result is implied.</p></div>
          <ul className="grid border-l border-t border-navy-900/20 sm:grid-cols-2">
            {copy.metrics.map((metric) => <li key={metric} className="flex min-h-20 items-center border-b border-r border-navy-900/20 bg-white px-5 text-sm font-medium">{metric}</li>)}
          </ul>
        </div>
      </section>

      <section className="border-y border-navy-900/10 bg-white py-20 md:py-28">
        <div className="container-luxe">
          <SectionLabel index="16">Expansion</SectionLabel>
          <div className="mt-7 grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div><h2 className="section-title">Start narrow. Expand from evidence.</h2><p className="body-lead mt-7">Guide and supplier confirmation is the first wedge. Adjacent workflows become candidates only after the operating model is proven.</p></div>
            <ul className="border-t border-navy-900/20">
              {copy.expansion.map((workflow, index) => <li key={workflow} className="grid min-h-16 grid-cols-[3rem_1fr] items-center border-b border-navy-900/20"><span className="font-mono text-[11px] text-gold-700">{String(index + 1).padStart(2, '0')}</span><span className="text-sm font-medium">{workflow}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gold-500 py-20 text-navy-950 md:py-28">
        <span className="axis-signal absolute left-[8%] top-0 h-14 w-1 bg-navy-950" aria-hidden="true" />
        <div className="container-luxe grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div><SectionLabel index="17">Start with control</SectionLabel><h2 className="section-title mt-7 max-w-[18ch] !text-navy-950">Let AI watch the next 100 bookings.</h2></div>
          <div><p className="text-base leading-8 text-navy-950/70">You do not have to automate immediately. Start in Shadow Mode and compare Gappy with how your team handles real post-booking operations today.</p><div className="mt-8 flex flex-wrap gap-3"><TrackedAnchor eventName="pilot_cta_click" href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">Start a Shadow Pilot</TrackedAnchor><a href="/contact" className="btn-secondary">Talk to Gappy</a></div></div>
        </div>
      </section>
    </div>
  )
}
