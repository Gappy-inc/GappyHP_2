import Link from 'next/link'
import CTASection from '@/components/CTASection'
import OperatingLoop from '@/components/OperatingLoop'
import OperationalGraph from '@/components/OperationalGraph'
import { GOODTIME_URL } from '@/lib/config'

const travelWorkflows = [
  [
    'Supplier Operations',
    'Confirmation, reconfirmation, chasing, and exception handling across supplier channels.',
  ],
  [
    'Booking Operations',
    'Move booking work forward across inboxes, reservation systems, and internal queues.',
  ],
  [
    'Reconciliation',
    'Support supplier and payment reconciliation with traceable decisions and handoffs.',
  ],
  [
    'QA & Fulfillment',
    'Check bookings and fulfillment milestones, then surface what needs human attention.',
  ],
  [
    'Schedule Changes',
    'Coordinate downstream work when schedules, services, or plans change.',
  ],
  [
    'Customer Communication',
    'Deliver context-aware communication as part of the operating workflow — not as a disconnected chatbot.',
  ],
]

const technologyCapabilities = [
  'System Access',
  'Context & Policy',
  'Execution',
  'Communication',
  'Verification',
  'Human Control',
]

export default function Home() {
  return (
    <div className="overflow-hidden bg-ivory-50 text-ink-900">
      <section className="relative pb-20 pt-32 md:pb-28 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(201,169,97,0.16),transparent_32%),linear-gradient(180deg,#fdfcf8_0%,#f4f0e4_100%)]"
          aria-hidden="true"
        />
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <p className="eyebrow text-gold-700">Gappy / Applied AI</p>
            <h1 className="display-title mt-7 max-w-4xl">
              AI that gets business done.
            </h1>
            <p className="body-lead mt-8 max-w-2xl">
              Gappy builds AI systems that understand operational context, make
              bounded decisions, and execute work across the software businesses
              already use.
            </p>
            <p className="mt-5 text-lg font-medium text-navy-900">
              We are starting with travel.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/travel" className="btn-primary">
                Explore Travel
              </Link>
              <a
                href={GOODTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Talk to Gappy
              </a>
            </div>
            <p className="eyebrow mt-10 text-ink-400">
              AI Workforce for Business Operations
            </p>
          </div>
          <OperationalGraph />
        </div>
      </section>

      <section className="section-shell border-y border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">What we build</p>
            <h2 className="section-title mt-6">
              From software that stores work to AI that moves it forward.
            </h2>
          </div>
          <div className="space-y-6 self-end text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.8] text-ink-500">
            <p>Most business operations do not live inside a single system.</p>
            <p>
              They happen between inboxes, databases, portals, spreadsheets,
              internal software, and human judgment.
            </p>
            <p className="text-navy-900">
              Gappy builds AI Workforce that can carry context across those
              boundaries and move operational work toward a verified outcome.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="eyebrow text-gold-300">Gappy AI Workforce</p>
              <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.052em]">
                From trigger to verified outcome.
              </h2>
            </div>
            <p className="text-base leading-8 text-white/55">
              Useful AI for operations has to do more than generate an answer. It
              needs to understand what happened, take authorized action, check the
              result, and know when a person should take over.
            </p>
          </div>
          <div className="mt-14">
            <OperatingLoop />
          </div>
          <Link
            href="/technology"
            className="mt-9 inline-flex min-h-11 items-center text-sm font-medium text-gold-300 underline decoration-white/25 underline-offset-8 hover:text-white"
          >
            Explore the Technology
          </Link>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid items-start gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">Primary vertical / Travel</p>
            <h2 className="section-title mt-6">Starting with travel.</h2>
            <div className="body-lead mt-8 max-w-xl space-y-5">
              <p>
                Travel is global, fragmented, time-sensitive, and operationally
                intensive.
              </p>
              <p>
                A single trip can move through booking systems, supplier portals,
                email, CRM, spreadsheets, internal queues, and repeated human
                coordination.
              </p>
              <p>
                That makes travel a natural proving ground for AI that has to
                operate across real-world complexity.
              </p>
            </div>
            <Link href="/travel" className="btn-primary mt-9">
              Explore Travel
            </Link>
          </div>
          <div className="rounded-[30px] border border-navy-900/10 bg-white p-7 shadow-[0_28px_80px_rgba(11,22,50,0.08)] md:p-11">
            <p className="eyebrow text-gold-700">Current flagship</p>
            <p className="mt-24 text-[clamp(2.3rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.05em] text-navy-900">
              AI Workforce for Travel Operations
            </p>
            <p className="mt-8 border-t border-navy-900/10 pt-6 text-sm leading-7 text-ink-500">
              A focused application of Gappy&apos;s operating capability to the
              work behind every trip.
            </p>
          </div>
        </div>
      </section>

      <section id="travel-workflows" className="section-shell border-y border-navy-900/10 bg-white">
        <div className="container-luxe">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-gold-700">Travel workflows</p>
              <h2 className="section-title mt-6 max-w-4xl">
                Operational work behind every trip.
              </h2>
            </div>
            <Link href="/travel#workflows" className="btn-secondary">
              See Travel Operations
            </Link>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-2 lg:grid-cols-3">
            {travelWorkflows.map(([title, description], index) => (
              <article key={title} className="min-h-64 bg-white p-7 md:p-9">
                <span className="font-mono text-[10px] text-gold-700">
                  WF-{String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-14 text-xl font-medium tracking-[-0.025em] text-navy-900">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-500">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">Operate across the stack</p>
            <h2 className="section-title mt-6">
              Built around the systems businesses already use.
            </h2>
            <div className="body-lead mt-8 max-w-xl space-y-5">
              <p>Core business software contains years of operating logic.</p>
              <p>
                Gappy is not built on the assumption that companies will replace
                it.
              </p>
              <p>
                We design AI Workforce to operate across existing infrastructure
                while keeping authority, verification, and human escalation
                explicit.
              </p>
            </div>
            <Link href="/technology" className="btn-primary mt-9">
              Explore Technology
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {technologyCapabilities.map((capability, index) => (
              <li
                key={capability}
                className="flex min-h-32 items-center gap-5 rounded-xl border border-navy-900/10 bg-white px-6"
              >
                <span className="font-mono text-[10px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-medium text-navy-900">{capability}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-24">
          <div>
            <p className="eyebrow text-gold-300">Projects</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.05em]">
              Build around the operation, not the demo.
            </h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/55">
              Every deployment begins with a real workflow. We map its trigger,
              systems, decisions, actions, exceptions, and definition of done
              before deciding how much responsibility the AI should carry.
            </p>
            <Link href="/cases" className="btn-light mt-9">
              View Projects
            </Link>
          </div>
          <article className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 md:p-10">
            <p className="eyebrow text-gold-300">Travel / Active</p>
            <h3 className="mt-20 text-[clamp(2rem,4vw,3.6rem)] font-medium leading-[1.04] tracking-[-0.045em]">
              AI Workforce for Travel Operations
            </h3>
            <p className="mt-6 text-sm leading-7 text-white/55">
              AI operators for the operational work behind bookings, suppliers,
              fulfillment, reconciliation, changes, and customer communication.
            </p>
          </article>
        </div>
      </section>

      <section className="section-shell border-b border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow text-gold-700">Insights</p>
            <h2 className="section-title mt-6">Notes from the operating layer.</h2>
          </div>
          <div>
            <p className="body-lead">
              Practical thinking on AI Workforce, operational systems, and how
              autonomous work should be designed.
            </p>
            <Link href="/resources" className="btn-secondary mt-8">
              Read Insights
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">About Gappy</p>
            <h2 className="section-title mt-6">Make complex operations autonomous.</h2>
            <p className="body-lead mt-8 max-w-xl">
              We believe AI will change business software from something people
              operate into something that can increasingly operate the business
              itself. Gappy is building that future one bounded workflow at a time.
            </p>
            <Link href="/about" className="btn-primary mt-9">
              About Gappy
            </Link>
          </div>
          <div className="border-t border-navy-900/10 pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="eyebrow text-gold-700">Careers</p>
            <h2 className="section-title mt-6">Build AI that works in the real world.</h2>
            <p className="body-lead mt-8 max-w-xl">
              We are building a team across AI, software, product, and operations
              for people who want to turn frontier technology into systems that
              carry real responsibility.
            </p>
            <Link href="/careers" className="btn-secondary mt-9">
              Join Gappy
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
