import { SectionLabel } from '@/components/GappyAxis'
import {
  BookDemoLink,
  FinalConversion,
  HeroConversion,
  TravelAcquisitionProvider,
  VideoWalkthrough,
} from '@/components/travel/TravelAcquisition'
import {
  TravelScenarioCards,
  TravelWorkStory,
} from '@/components/travel/TravelWorkStory'
import { globalTravelContent as copy } from '@/content/travel-global'

function HeroWorkItem() {
  return (
    <div className="border border-navy-900 bg-white shadow-[10px_10px_0_#101210]">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-navy-900/20 p-5">
        <div>
          <p className="font-semibold text-navy-900">Atlas Experiences</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">Tomorrow&apos;s confirmation queue</p>
        </div>
        <span className="border border-navy-900/20 bg-ivory-100 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em]">12 bookings · Sample data</span>
      </div>
      <dl className="grid grid-cols-2 gap-px bg-navy-900/15 sm:grid-cols-4">
        {[
          ['8', 'Verified'],
          ['2', 'Waiting'],
          ['1', 'Needs approval'],
          ['1', 'Blocked'],
        ].map(([value, label]) => (
          <div key={label} className="bg-white p-4">
            <dd className="text-2xl font-semibold tracking-[-0.04em] text-navy-900">{value}</dd>
            <dt className="mt-1 text-xs text-ink-500">{label}</dt>
          </div>
        ))}
      </dl>
      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold-700">Current work item</p>
            <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em]">Mt. Fuji Day Tour</h2>
            <p className="mt-1 text-sm text-ink-500">Tomorrow · 09:00 JST · Guide Tanaka</p>
          </div>
          <span className="border border-navy-900 bg-gold-500 px-3 py-2 font-mono text-[10px] font-medium">CONFIRMATION REQUIRED</span>
        </div>
        <div className="mt-5 grid gap-4 border-t border-navy-900/15 pt-5 sm:grid-cols-2">
          <div><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">Instruction</p><p className="mt-2 text-sm font-medium">Follow up on unconfirmed guides</p></div>
          <div><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">Next control</p><p className="mt-2 text-sm font-medium">Review prepared request</p></div>
        </div>
        <a href="#work-demo" className="btn-primary mt-5 w-full">Open interactive prototype</a>
        <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.1em] text-ink-400">No real bookings or messages</p>
      </div>
    </div>
  )
}

function VideoSection() {
  return (
    <section id="video-walkthrough" className="section-shell scroll-mt-24">
      <div className="container-luxe">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <SectionLabel index="02">60-second walkthrough</SectionLabel>
            <h2 className="section-title mt-7">Watch the whole confirmation loop.</h2>
          </div>
          <p className="body-lead max-w-xl lg:justify-self-end">The short preview is visible now. Full playback opens after a saved access request when lead infrastructure is configured.</p>
        </div>
        <div className="mt-10"><VideoWalkthrough /></div>
      </div>
    </section>
  )
}

function SystemAndControl() {
  const path = [
    ['01', 'Booking context'],
    ['02', 'Confirmation workflow'],
    ['03', 'Guide / supplier view'],
    ['04', 'Verification evidence'],
    ['05', 'Human control'],
  ]

  return (
    <section className="section-shell">
      <div className="container-luxe">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionLabel index="04">Keep your systems · keep control</SectionLabel>
            <h2 className="section-title mt-7">Gappy works around the operation you already have.</h2>
            <p className="body-lead mt-7">Pilot scope, connection method, decision boundaries, and evidence requirements are agreed with each operator. This is not a claim that every connector ships today.</p>
          </div>
          <div>
            <ol className="grid gap-px bg-navy-900/20 sm:grid-cols-5">
              {path.map(([number, label], index) => (
                <li key={label} className="relative min-h-36 bg-white p-5">
                  <span className="font-mono text-[10px] text-gold-700">{number}</span>
                  <p className="mt-8 text-sm font-semibold leading-6">{label}</p>
                  {index < path.length - 1 ? <span className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 place-items-center bg-gold-500 text-[10px] sm:grid" aria-hidden="true">→</span> : null}
                </li>
              ))}
            </ol>
            <div className="mt-5 grid gap-px bg-navy-900/20 sm:grid-cols-2">
              {[
                ['Approval boundaries', 'Humans approve external action until the pilot evidence supports a narrower delegated boundary.'],
                ['Fail-closed verification', 'Unknown, stale, conflicting, or missing evidence stays open or moves to a person.'],
                ['Current-booking check', 'A reply is compared with the latest booking snapshot before confirmation is marked complete.'],
                ['Traceable work', 'Instruction, decision, response, current context, and observed result remain attached to the work item.'],
              ].map(([title, body]) => (
                <article key={title} className="min-h-48 bg-ivory-100 p-6">
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-ink-500">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border border-navy-900 bg-navy-950 p-6 text-white md:p-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="eyebrow text-gold-300">Partial / pilot-ready foundation</p>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">Your operation. Your brand.</h3>
            <p className="mt-5 text-base leading-8 text-white/60">Gappy adapts to your brand, operating rules, and local context while the same AI Workforce runtime handles the work underneath.</p>
            <p className="mt-6 inline-flex border border-gold-300 px-4 py-3 text-sm font-semibold text-gold-300">Configured with your team during pilot.</p>
          </div>
          <div className="grid gap-px bg-white/20 sm:grid-cols-2">
            {copy.whiteLabel.map((item) => <div key={item} className="flex min-h-28 items-center justify-center bg-navy-900 p-5 text-center font-semibold">{item}</div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

function PilotAndMeasurement() {
  return (
    <section className="section-shell bg-navy-950 text-white">
      <div className="container-luxe grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <div>
          <SectionLabel index="06" inverse>Scoped pilot & measurement</SectionLabel>
          <h2 className="section-title mt-7 !text-white">Start with one workflow. Expand from evidence.</h2>
          <p className="mt-7 text-base leading-8 text-white/60">A workflow review can lead to offline evaluation, Shadow Mode, and human-approved execution. Scope and timing are discussed on the demo call.</p>
          <BookDemoLink entryLocation="final" className="btn-light mt-8">Book a demo</BookDemoLink>
        </div>
        <div>
          <ol className="border-t border-white/20">
            {copy.pilotStages.slice(0, 4).map(([number, title, body]) => (
              <li key={number} className="grid gap-3 border-b border-white/20 py-5 sm:grid-cols-[3rem_12rem_1fr]">
                <span className="font-mono text-[10px] text-gold-300">{number}</span><h3 className="font-semibold">{title}</h3><p className="text-sm leading-7 text-white/50">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">Measures to define together · no benchmark implied</p>
            <ul className="mt-4 grid gap-px bg-white/20 sm:grid-cols-2">
              {copy.metrics.slice(0, 6).map((metric) => <li key={metric} className="bg-navy-900 p-4 text-sm text-white/70">{metric}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function FrequentlyAskedQuestions() {
  const questions = [
    ['Does Gappy replace our booking system?', 'No. The pilot is designed around the existing source of booking context. Connection method and access are agreed per operator.'],
    ['Who receives confirmation requests?', 'The first workflow is scoped to assigned guides or suppliers. The operator decides the approved recipient and communication boundary during pilot setup.'],
    ['Can a reply close the job automatically?', 'Not by itself. The current booking details and available evidence must be checked first. Unknown or conflicting state stays open or moves to a person.'],
    ['How much control does our team keep?', 'Start in offline or Shadow Mode, then use human approval. Responsibility expands only where the agreed operating evidence supports it.'],
    ['Can the external page use our brand?', 'A partial multi-tenant and white-label foundation exists. Supported brand and workflow configuration is completed with your team during pilot; it is not self-serve SaaS onboarding.'],
    ['How do we watch the full demo?', 'When a private lead destination is configured, a saved email request unlocks the in-page video. Book a demo remains available without registration.'],
  ]

  return (
    <section className="section-shell bg-white">
      <div className="container-luxe grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
        <div><SectionLabel index="07">FAQ</SectionLabel><h2 className="section-title mt-7">Before we map the first workflow.</h2></div>
        <div className="border-t border-navy-900/20">
          {questions.map(([question, answer]) => (
            <details key={question} className="group border-b border-navy-900/20">
              <summary className="flex min-h-20 cursor-pointer list-none items-center justify-between gap-4 py-5 text-lg font-semibold"><span>{question}</span><span className="text-gold-700 transition group-open:rotate-45" aria-hidden="true">＋</span></summary>
              <p className="max-w-2xl pb-7 text-sm leading-7 text-ink-500">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function TravelGlobalPage() {
  return (
    <TravelAcquisitionProvider>
      <div className="bg-ivory-50 text-ink-900">
        <section className="relative overflow-hidden border-b border-navy-900/15 pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="container-luxe">
            <SectionLabel index="00">AI workforce for tour operators &amp; DMCs</SectionLabel>
            <div className="mt-8 grid gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-16">
              <div>
                <h1 className="page-title max-w-[12ch]">Guide confirmations.<br /><span className="text-gold-700">Followed through.</span></h1>
                <p className="body-lead mt-7 max-w-xl">Gappy helps tour operators and DMCs coordinate guide and supplier confirmations, follow up on missing replies, and check the latest booking details before marking work complete.</p>
                <p className="mt-5 border-l-2 border-gold-500 pl-4 text-sm font-medium leading-6">Start with a scoped pilot. Keep approvals in your team&apos;s hands.</p>
                <HeroConversion />
              </div>
              <HeroWorkItem />
            </div>
          </div>
        </section>

        <TravelWorkStory between={<VideoSection />} />
        <SystemAndControl />

        <section className="section-shell bg-white">
          <div className="container-luxe">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div><SectionLabel index="05">Workflow examples</SectionLabel><h2 className="section-title mt-7">Three states of the same operational job.</h2></div>
              <p className="body-lead max-w-xl lg:justify-self-end">These are interactive examples using the same fictional booking—not customer stories or claims of deployed results.</p>
            </div>
            <div className="mt-10"><TravelScenarioCards /></div>
          </div>
        </section>

        <PilotAndMeasurement />
        <FrequentlyAskedQuestions />

        <section className="section-shell border-t border-navy-900/15 bg-gold-500">
          <div className="container-luxe"><FinalConversion /></div>
        </section>
      </div>
    </TravelAcquisitionProvider>
  )
}
