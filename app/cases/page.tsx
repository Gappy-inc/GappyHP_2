import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video'

export const metadata: Metadata = {
  title: 'Cases & Design Partnerships | Gappy',
  description:
    'How Gappy works with travel companies to define, deploy, and evaluate AI Workforce for operational workflows.',
  alternates: { canonical: `${SITE_URL}/cases` },
  openGraph: {
    title: 'Cases & Design Partnerships | Gappy',
    description: 'A workflow-first approach to building AI Workforce for travel operations.',
    url: `${SITE_URL}/cases`,
    type: 'website',
    images: [`${SITE_URL}/og.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cases & Design Partnerships | Gappy',
    description: 'A workflow-first approach to building AI Workforce for travel operations.',
    images: [`${SITE_URL}/og.png`],
  },
}

const engagementSteps = [
  {
    number: '01',
    title: 'Map the operation',
    description: 'Define the trigger, systems, decision points, owners, exceptions, and current completion criteria.',
  },
  {
    number: '02',
    title: 'Bound the workforce',
    description: 'Choose one operational workflow, establish permissions, and make human escalation explicit.',
  },
  {
    number: '03',
    title: 'Run with evidence',
    description: 'Execute against real operational inputs with traceable actions and verification at every step.',
  },
  {
    number: '04',
    title: 'Measure and expand',
    description: 'Evaluate completion, cycle time, exception rate, and quality before extending the operating surface.',
  },
]

const evaluationDimensions = [
  'Workflow completion',
  'Cycle time',
  'Exception rate',
  'Operational quality',
  'Human touch time',
  'Auditability',
]

export default function Cases() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <section className="border-b border-navy-900/10 pb-20 pt-40 md:pb-28 md:pt-48">
        <div className="container-luxe">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Cases / Design partnerships</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h1 className="max-w-5xl text-[clamp(48px,7vw,92px)] font-medium leading-[0.98] tracking-[-0.055em] text-navy-900">
              Start with a workflow that matters.
            </h1>
            <p className="max-w-xl text-base leading-8 text-ink-500 lg:pb-2">
              Gappy works with travel companies to turn an operating workflow into a bounded AI Workforce deployment — with measurable outcomes and explicit human control.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Engagement model</p>
              <h2 className="mt-5 text-4xl font-medium leading-tight tracking-[-0.04em] text-navy-900">From operational truth to production evidence.</h2>
            </div>
            <ol className="divide-y divide-navy-900/10 border-y border-navy-900/10">
              {engagementSteps.map((step) => (
                <li key={step.number} className="grid gap-4 py-7 sm:grid-cols-[64px_220px_1fr] sm:items-start">
                  <span className="font-mono text-[10px] text-gold-700">{step.number}</span>
                  <h3 className="text-lg font-medium tracking-[-0.02em] text-navy-900">{step.title}</h3>
                  <p className="text-sm leading-7 text-ink-500">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-24 text-white md:py-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-300">A representative pattern</p>
            <h2 className="mt-5 text-[clamp(36px,5vw,62px)] font-medium leading-[1.05] tracking-[-0.045em]">
              Supplier reconfirmation, end to end.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/55">
              A typical design-partner workflow can begin when a booking reaches its reconfirmation window, gather the relevant reservation context, contact the supplier, interpret the response, update the system of record, and escalate only unresolved exceptions.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 md:p-9">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300">Example flow</p>
            <ol className="mt-7 space-y-3">
              {[
                'Booking enters reconfirmation window',
                'Reservation and supplier context assembled',
                'Supplier contacted through the appropriate channel',
                'Response interpreted and checked against the booking',
                'Record updated and completion verified',
                'Exception escalated with context when needed',
              ].map((item, index) => (
                <li key={item} className="flex items-center gap-4 rounded-xl border border-white/10 bg-navy-950/40 px-4 py-4">
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-gold-300/40 font-mono text-[9px] text-gold-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-6 text-white/75">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Evaluation</p>
              <h2 className="mt-5 text-[clamp(34px,4.5vw,58px)] font-medium leading-[1.06] tracking-[-0.045em] text-navy-900">
                Evidence before expansion.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-8 text-ink-500">
                We evaluate the operating outcome, not a demo. The exact success criteria are defined with each design partner.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {evaluationDimensions.map((dimension, index) => (
                <li key={dimension} className="flex min-h-28 items-center gap-4 rounded-xl border border-navy-900/10 bg-white px-5">
                  <span className="font-mono text-[10px] text-gold-700">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm font-medium text-navy-900">{dimension}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-navy-900/10 bg-white py-24 text-center md:py-32">
        <div className="container-luxe">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Design partner</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(36px,5vw,64px)] font-medium leading-[1.04] tracking-[-0.045em] text-navy-900">
            Bring us the workflow your team still has to carry.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-ink-500">
            Public case studies are shared only with customer approval. We can discuss the engagement model and applicable workflow patterns directly.
          </p>
          <a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-navy mt-9">
            Talk to Gappy
          </a>
        </div>
      </section>
    </div>
  )
}
