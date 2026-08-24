import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import PageHero from '@/components/PageHero'
import { GOODTIME_URL } from '@/lib/config'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'AI Workforce for Travel Operations | Gappy',
  description:
    'Gappy builds AI Workforce for travel companies across booking operations, supplier coordination, reconciliation, fulfillment, changes, and customer communication.',
  path: '/travel',
})

const operatorTypes = [
  'TMCs',
  'DMCs',
  'OTAs',
  'Tour Operators',
  'Travel Groups',
  'Enterprise Travel Companies',
]

const reconfirmationFlow = [
  'Booking enters reconfirmation window',
  'Retrieve reservation and supplier context',
  'Determine required confirmation path',
  'Contact or operate supplier channel',
  'Interpret response',
  'Update internal state',
  'Verify confirmed outcome',
  'Escalate exception if unresolved',
]

const workflows = [
  ['Supplier Operations', 'Confirmation, reconfirmation, chasing, and exception handling across supplier channels.'],
  ['Booking Operations', 'Move booking work across inboxes, reservation systems, and internal queues.'],
  ['Supplier & Payment Reconciliation', 'Support reconciliation with traceable decisions, checks, and handoffs.'],
  ['Booking QA & Fulfillment', 'Check booking records and fulfillment milestones, then surface exceptions.'],
  ['Schedule Change & Disruption', 'Coordinate downstream work when schedules, services, or plans change.'],
  ['Customer Communication', 'Deliver context-aware communication as part of the operating workflow.'],
]

const systems = [
  'Email',
  'CRM',
  'GDS',
  'Spreadsheets',
  'Supplier Portals',
  'Booking Systems',
  'Internal Systems',
  'Messaging Channels',
]

const deploymentSteps = [
  ['Map', 'Define the trigger, systems, decisions, actions, exceptions, and completion criteria.'],
  ['Observe', 'Evaluate against historical or live operational cases.'],
  ['Assist', 'Use human approval while measuring performance.'],
  ['Expand', 'Increase autonomy only where evidence justifies it.'],
]

const measurementConcepts = [
  'Verified Completion',
  'Human Intervention',
  'Rework',
  'Cycle Time',
  'Critical Errors',
  'Exception Rate',
  'Human Minutes',
  'Cost per Workflow',
]

export default function TravelPage() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Travel" path="/travel" />
      <PageHero
        eyebrow="Gappy / Travel"
        title="AI Workforce for Travel Operations"
        body={
          <p>
            Gappy automates the operational work behind every trip — across
            booking systems, email, supplier portals, CRM, spreadsheets, and
            existing travel infrastructure.
          </p>
        }
      >
        <a
          href={GOODTIME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Become a Design Partner
        </a>
        <Link href="/contact" className="btn-secondary">
          Talk to Gappy
        </Link>
      </PageHero>

      <section className="section-shell">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <p className="eyebrow text-gold-700">Why travel</p>
          <div>
            <h2 className="section-title">Travel still runs between systems.</h2>
            <div className="body-lead mt-9 grid gap-7 md:grid-cols-2">
              <p>
                Booking platforms record the reservation. But the work required to
                deliver the trip often continues across supplier communication,
                schedule changes, fulfillment checks, internal queues,
                reconciliation, and customer support.
              </p>
              <p className="text-navy-900">
                Humans remain the coordination layer between those systems. Gappy
                is built for that layer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/10 bg-white py-16 md:py-20">
        <div className="container-luxe">
          <p className="eyebrow text-gold-700">Built for</p>
          <h2 className="mt-5 max-w-4xl text-[clamp(2rem,4.5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.048em] text-navy-900">
            Travel operators with real operational complexity.
          </h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-6">
            {operatorTypes.map((type) => (
              <li
                key={type}
                className="flex min-h-24 items-center justify-center bg-white px-4 text-center text-xs font-medium text-navy-900"
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-300">Travel operating example</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.05em]">
              Supplier Reconfirmation
            </h2>
            <p className="mt-7 max-w-lg text-base leading-8 text-white/55">
              A bounded workflow that begins with a real operational event and ends
              only when the result is verified or an exception has been handed over.
            </p>
          </div>
          <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[21px] before:top-6 before:w-px before:bg-gold-300/25">
            {reconfirmationFlow.map((step, index) => (
              <li
                key={step}
                className="relative flex min-h-16 items-center gap-5 rounded-xl border border-white/10 bg-navy-950/50 px-4 py-3"
              >
                <span className="z-10 grid h-9 w-9 flex-none place-items-center rounded-full border border-gold-300/40 bg-navy-900 font-mono text-[9px] text-gold-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm leading-6 text-white/75">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="workflows" className="section-shell scroll-mt-24">
        <div className="container-luxe">
          <p className="eyebrow text-gold-700">Travel workflows</p>
          <h2 className="section-title mt-6 max-w-4xl">
            Start with the work your team still has to carry.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-2 lg:grid-cols-3">
            {workflows.map(([title, body], index) => (
              <article key={title} className="min-h-64 bg-white p-7 md:p-9">
                <span className="font-mono text-[10px] text-gold-700">
                  WF-{String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-14 text-xl font-medium tracking-[-0.025em] text-navy-900">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-500">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell border-y border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">Existing systems</p>
            <h2 className="section-title mt-6">Your systems stay.</h2>
            <p className="mt-8 text-[clamp(1.75rem,3.8vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.04em] text-gold-700">
              The manual coordination layer changes.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {systems.map((system, index) => (
              <li
                key={system}
                className="flex min-h-20 items-center gap-4 rounded-xl border border-navy-900/10 bg-ivory-50 px-5"
              >
                <span className="font-mono text-[9px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium text-navy-900">{system}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe">
          <p className="eyebrow text-gold-700">Start bounded</p>
          <h2 className="section-title mt-6">One workflow first.</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-4">
            {deploymentSteps.map(([title, body], index) => (
              <article key={title} className="min-h-64 bg-white p-7">
                <span className="font-mono text-[10px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-14 text-xl font-medium text-navy-900">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-ink-500">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-300">Measurement</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.05em]">
              Measure completion, not activity.
            </h2>
            <p className="mt-7 text-sm leading-7 text-white/50">
              Exact baselines and success criteria are defined with each design
              partner. No public performance claim is implied here.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {measurementConcepts.map((concept) => (
              <li
                key={concept}
                className="flex min-h-20 items-center rounded-xl border border-white/10 bg-white/[0.04] px-5 text-sm text-white/75"
              >
                {concept}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Start with one travel workflow."
        body="Bring the trigger, systems, exceptions, and definition of done. We will begin with the operating reality and define what a useful first deployment needs to prove."
        secondaryHref="/cases"
        secondaryLabel="View Projects"
      />
    </div>
  )
}
