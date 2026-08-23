import Link from 'next/link'
import HeroSection from '@/components/sections/HeroSection'

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video'

const operatingSteps = [
  'Trigger',
  'Understand',
  'Decide',
  'Operate systems',
  'Communicate',
  'Verify completion',
  'Escalate exceptions',
]

const workflows = [
  {
    title: 'Supplier Operations',
    description: 'Confirmation, reconfirmation, chasing, and exception handling across supplier channels.',
  },
  {
    title: 'Booking Operations',
    description: 'Move booking work forward across inboxes, reservation systems, and internal queues.',
  },
  {
    title: 'Reconciliation',
    description: 'Support supplier and payment reconciliation with traceable decisions and handoffs.',
  },
  {
    title: 'QA & Fulfillment',
    description: 'Check bookings and fulfillment milestones, then surface what needs human attention.',
  },
  {
    title: 'Schedule Changes',
    description: 'Coordinate downstream operational work when schedules, services, or plans change.',
  },
  {
    title: 'Customer Communication',
    description: 'Prepare and deliver context-aware communication as part of the operating workflow.',
  },
]

const systemSurfaces = [
  'Email',
  'CRM',
  'GDS',
  'Spreadsheets',
  'Supplier portals',
  'Booking systems',
  'Internal systems',
]

export default function Home() {
  return (
    <div className="overflow-hidden bg-ivory-50 text-ink-900">
      <HeroSection />

      <section className="border-y border-navy-900/10 bg-white" aria-label="Who Gappy is built for">
        <div className="container-luxe py-7">
          <p className="text-center text-[11px] font-medium uppercase tracking-[0.24em] text-ink-400">
            Built with enterprise travel operators — TMCs · DMCs · OTAs · Tour operators · Travel groups
          </p>
        </div>
      </section>

      <section id="approach" className="py-24 md:py-32">
        <div className="container-luxe">
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">The product thesis</p>
              <h2 className="mt-5 text-[clamp(36px,5vw,64px)] font-medium leading-[1.04] tracking-[-0.045em] text-navy-900">
                The work is the product.
              </h2>
            </div>
            <div className="space-y-6 text-[17px] leading-[1.9] text-ink-500 md:text-[19px]">
              <p>
                Travel companies already run on deeply embedded systems. Gappy is not building another core system to replace them.
              </p>
              <p className="text-navy-900">
                We are building an AI Workforce that can understand operational context, act across existing tools, verify completion, and escalate exceptions with a clear audit trail.
              </p>
            </div>
          </div>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-7">
            {operatingSteps.map((step, index) => (
              <li key={step} className="min-h-36 bg-white p-5">
                <span className="font-mono text-[10px] text-gold-700">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-10 text-sm font-medium leading-snug text-navy-900">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="workflows" className="bg-navy-900 py-24 text-white md:py-32">
        <div className="container-luxe">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-300">Workflow by workflow</p>
            <h2 className="mt-5 text-[clamp(36px,5vw,64px)] font-medium leading-[1.04] tracking-[-0.045em]">
              AI operators for the work behind every trip.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/60">
              Gappy is developed around bounded, measurable workflows. Each deployment starts with the operational reality of the travel company — not a generic chatbot.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {workflows.map((workflow, index) => (
              <article key={workflow.title} className="group min-h-64 bg-navy-900 p-7 transition-colors hover:bg-navy-800 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-gold-300">WF-{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-2 w-2 rounded-full border border-gold-300/50 transition-colors group-hover:bg-gold-300" aria-hidden="true" />
                </div>
                <h3 className="mt-16 text-xl font-medium tracking-[-0.02em]">{workflow.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/55">{workflow.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <div className="grid items-start gap-16 lg:grid-cols-2 lg:gap-24">
            <div className="lg:sticky lg:top-32">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Operate across the stack</p>
              <h2 className="mt-5 text-[clamp(36px,5vw,64px)] font-medium leading-[1.04] tracking-[-0.045em] text-navy-900">
                Your systems stay.<br />The manual work disappears.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-ink-500">
                The AI Workforce works across the tools teams already use, carries context between them, and keeps people in control of exceptions.
              </p>
            </div>

            <div className="rounded-[28px] border border-navy-900/10 bg-white p-6 shadow-[0_24px_70px_rgba(11,22,50,0.08)] md:p-9">
              <div className="flex items-center justify-between border-b border-navy-900/10 pb-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold-700">Execution environment</p>
                  <p className="mt-2 text-sm text-ink-400">Existing travel infrastructure</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-medium tracking-[0.12em] text-emerald-700">CONNECTED</span>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {systemSurfaces.map((surface, index) => (
                  <li key={surface} className="flex min-h-20 items-center gap-4 rounded-xl border border-navy-900/10 bg-ivory-50 px-4">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-navy-900 font-mono text-[9px] text-gold-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm font-medium text-navy-900">{surface}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-navy-900/10 pt-6">
                <p className="text-sm leading-7 text-ink-500">
                  Human review remains available where policy, ambiguity, or risk requires it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/10 bg-white py-24 md:py-32">
        <div className="container-luxe">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Design partnerships</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(36px,5vw,64px)] font-medium leading-[1.04] tracking-[-0.045em] text-navy-900">
                Start with one workflow. Build the operating layer together.
              </h2>
            </div>
            <div>
              <p className="text-base leading-8 text-ink-500">
                We work with travel companies that want to redesign a real operational workflow, define its guardrails, and measure what changed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-navy">
                  Become a Design Partner
                </a>
                <Link href="/cases" className="btn-outline">See our approach</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container-luxe flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-700">Gappy / 株式会社Gappy</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.035em] text-navy-900">Building the AI operating layer for travel.</h2>
          </div>
          <Link href="/about" className="text-sm font-medium text-navy-900 underline decoration-gold-500 underline-offset-8">
            About Gappy
          </Link>
        </div>
      </section>
    </div>
  )
}
