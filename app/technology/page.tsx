import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import OperatingLoop from '@/components/OperatingLoop'
import PageHero from '@/components/PageHero'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Technology | Gappy AI Workforce',
  description:
    'Explore how Gappy AI Workforce understands operational context, works across existing systems, verifies outcomes, and escalates uncertainty.',
  path: '/technology',
})

const technologyLayers = [
  {
    number: '01',
    eyebrow: 'Context',
    title: 'Context before action.',
    body: 'Operational work depends on records, messages, policies, history, and exceptions. Gappy assembles the context required for a bounded decision before an action is taken.',
    detail: ['Records & messages', 'Policy & constraints', 'Workflow state'],
  },
  {
    number: '02',
    eyebrow: 'System interaction',
    title: 'Work across existing software.',
    body: 'Important operations span inboxes, browsers, internal tools, databases, and third-party systems. The operating layer is designed around that reality.',
    detail: ['Interfaces & APIs', 'Existing systems', 'Authorized actions'],
  },
  {
    number: '03',
    eyebrow: 'Verification',
    title: 'Verification closes the loop.',
    body: 'Sending a message or updating a record is an action. The workflow is complete only when the intended operational outcome has been checked.',
    detail: ['Expected outcome', 'Observed result', 'Completion evidence'],
  },
  {
    number: '04',
    eyebrow: 'Human control',
    title: 'Humans remain in control of uncertainty.',
    body: 'Authority is scoped. Ambiguity, policy exceptions, or risk are escalated to the right person with the operational context and action history intact.',
    detail: ['Scoped authority', 'Contextual handoff', 'Exception ownership'],
  },
]

const principles = [
  ['Scoped Authority', 'Define what the system may decide and which actions it may take.'],
  ['Traceability', 'Preserve the context, decisions, actions, and observed result.'],
  ['Human Escalation', 'Route uncertainty to a person with enough context to act.'],
  ['Progressive Autonomy', 'Expand responsibility only where operating evidence supports it.'],
  ['Existing Infrastructure', 'Work with the systems and business logic already in place.'],
]

export default function TechnologyPage() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Technology" path="/technology" />
      <PageHero
        eyebrow="Technology"
        title="AI systems for bounded operational responsibility."
        body={
          <>
            <p>Gappy is designed around a simple idea:</p>
            <p className="mt-4 text-navy-900">
              AI becomes operationally useful when it can understand context, act
              within authority, verify what happened, and escalate what it should
              not decide alone.
            </p>
          </>
        }
      />

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe">
          <p className="eyebrow text-gold-300">Operating loop</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.68fr] lg:items-end">
            <h2 className="max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1] tracking-[-0.052em]">
              From an event to a verified outcome.
            </h2>
            <p className="text-base leading-8 text-white/55">
              Each stage creates the evidence and constraints required for the
              next. Escalation is part of the operating model, not a fallback hidden
              at the edge.
            </p>
          </div>
          <div className="mt-14">
            <OperatingLoop />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe space-y-6">
          {technologyLayers.map((layer, index) => (
            <article
              key={layer.title}
              className={`grid gap-8 rounded-[26px] border border-navy-900/10 p-7 md:p-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 ${
                index % 2 ? 'bg-ivory-100' : 'bg-white'
              }`}
            >
              <div>
                <p className="font-mono text-[10px] text-gold-700">{layer.number}</p>
                <p className="eyebrow mt-8 text-gold-700">{layer.eyebrow}</p>
                <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.048em] text-navy-900">
                  {layer.title}
                </h2>
              </div>
              <div className="self-end">
                <p className="body-lead max-w-2xl">{layer.body}</p>
                {layer.eyebrow === 'Verification' ? (
                  <p className="mt-8 text-[clamp(2rem,5vw,4.25rem)] font-medium tracking-[-0.05em] text-navy-900">
                    Action ≠ Completion
                  </p>
                ) : null}
                <ul className="mt-8 grid gap-2 sm:grid-cols-3">
                  {layer.detail.map((item) => (
                    <li
                      key={item}
                      className="flex min-h-16 items-center rounded-lg border border-navy-900/10 bg-white px-4 text-xs font-medium text-navy-900"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-t border-navy-900/10 bg-white">
        <div className="container-luxe">
          <p className="eyebrow text-gold-700">Design principles</p>
          <h2 className="section-title mt-6 max-w-4xl">
            Responsibility is designed, measured, and expanded.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map(([title, body], index) => (
              <article key={title} className="min-h-64 bg-white p-6">
                <span className="font-mono text-[9px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-12 text-base font-medium text-navy-900">{title}</h3>
                <p className="mt-4 text-xs leading-6 text-ink-500">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        body="Bring us a workflow with real systems, constraints, exceptions, and a clear outcome. We will start by making the operating truth visible."
      />
    </div>
  )
}
