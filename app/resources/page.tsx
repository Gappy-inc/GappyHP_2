import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import PageHero from '@/components/PageHero'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Insights | Gappy',
  description:
    'Practical ideas from Gappy on AI Workforce, workflow design, autonomy, verification, and the systems behind real-world operations.',
  path: '/resources',
})

const topics = [
  {
    title: 'What makes a workflow automation-ready?',
    body: 'A useful first workflow has an observable trigger, accessible context, bounded decisions, and a clear definition of done.',
    tags: ['Workflow design', 'Readiness'],
  },
  {
    title: 'From action to verified completion',
    body: 'Sending a message or updating a field is not the outcome. The operating loop closes only when the result has been checked.',
    tags: ['Verification', 'Outcomes'],
  },
  {
    title: 'Designing human escalation',
    body: 'AI should know when confidence, authority, policy, or risk requires a person — and hand over the full operational context.',
    tags: ['Human control', 'Exceptions'],
  },
  {
    title: 'Why start with travel?',
    body: 'Travel is a proving ground for AI that must work across fragmented systems, time pressure, supplier networks, and real exceptions.',
    tags: ['Travel', 'Applied AI'],
  },
  {
    title: 'Existing systems are part of the product',
    body: 'The operating layer has to respect the software, policies, permissions, and business logic already carrying the operation.',
    tags: ['Infrastructure', 'Systems'],
  },
]

export default function InsightsPage() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Insights" path="/resources" />
      <PageHero
        eyebrow="Insights"
        title="Notes from the operating layer."
        body={
          <p>
            Practical ideas on AI Workforce, workflow design, autonomy,
            verification, and the systems behind real-world operations.
          </p>
        }
      />

      <section className="section-shell">
        <div className="container-luxe">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-2 lg:grid-cols-3">
            {topics.map((topic, index) => (
              <article
                key={topic.title}
                className={`flex min-h-[340px] flex-col bg-white p-7 md:p-9 ${
                  index === topics.length - 1 ? 'lg:col-span-2' : ''
                }`}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold-700">
                  Operating note / {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-16 max-w-lg text-2xl font-medium leading-[1.15] tracking-[-0.035em] text-navy-900">
                  {topic.title}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-ink-500">
                  {topic.body}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-8" aria-label="Topics">
                  {topic.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-navy-900/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-400"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-ink-400">
            These are working topics, not dated publications. Gappy will add
            authored articles only when the underlying material is ready to publish.
          </p>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-300">Workflow brief</p>
            <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.05em]">
              Bring the operation, not a feature list.
            </h2>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {[
              'What triggers the work?',
              'Which systems hold the context?',
              'What decisions move it forward?',
              'Which actions require authority?',
              'How is completion verified?',
              'What must escalate to a person?',
            ].map((question, index) => (
              <li
                key={question}
                className="flex min-h-24 items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5"
              >
                <span className="font-mono text-[9px] text-gold-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm leading-6 text-white/75">{question}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
