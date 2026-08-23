import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Resources | Gappy',
  description:
    'Operating notes from Gappy on AI Workforce, workflow design, verification, and human escalation in travel operations.',
  alternates: { canonical: `${SITE_URL}/resources` },
  openGraph: {
    title: 'Resources | Gappy',
    description: 'Notes on building AI Workforce for real travel operations.',
    url: `${SITE_URL}/resources`,
    type: 'website',
    images: [`${SITE_URL}/og.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources | Gappy',
    description: 'Notes on building AI Workforce for real travel operations.',
    images: [`${SITE_URL}/og.png`],
  },
}

const notes = [
  {
    number: '01',
    title: 'What makes a workflow automation-ready?',
    summary: 'A useful first workflow has an observable trigger, accessible operating context, bounded decisions, and a clear definition of done.',
  },
  {
    number: '02',
    title: 'From action to verified completion',
    summary: 'Sending a message or updating a field is not the outcome. The operating loop closes only when the result has been checked.',
  },
  {
    number: '03',
    title: 'Designing human escalation',
    summary: 'The AI Workforce should know when confidence, authority, policy, or risk requires a person — and hand over the full context.',
  },
]

export default function Resources() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <section className="border-b border-navy-900/10 pb-20 pt-40 md:pb-28 md:pt-48">
        <div className="container-luxe">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Resources</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h1 className="max-w-5xl text-[clamp(48px,7vw,92px)] font-medium leading-[0.98] tracking-[-0.055em] text-navy-900">
              Notes from the operating layer.
            </h1>
            <p className="max-w-xl text-base leading-8 text-ink-500 lg:pb-2">
              Practical ideas for identifying, designing, and evaluating AI Workforce deployments in travel operations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-3">
            {notes.map((note) => (
              <article key={note.number} className="min-h-[360px] bg-white p-8 md:p-10">
                <p className="font-mono text-[10px] text-gold-700">OPERATING NOTE / {note.number}</p>
                <h2 className="mt-20 text-2xl font-medium leading-tight tracking-[-0.035em] text-navy-900">{note.title}</h2>
                <p className="mt-5 text-sm leading-7 text-ink-500">{note.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-24 text-white md:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-300">Workflow brief</p>
            <h2 className="mt-5 text-[clamp(34px,4.6vw,58px)] font-medium leading-[1.06] tracking-[-0.045em]">
              Bring the operation, not a feature list.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-8 text-white/55">
              A productive first conversation starts with the workflow as it exists today. These six questions help make that work visible.
            </p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'What triggers the work?',
                'Which systems hold the context?',
                'What decisions move it forward?',
                'Which actions require authority?',
                'How is completion verified?',
                'What must escalate to a person?',
              ].map((question, index) => (
                <li key={question} className="flex min-h-24 items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5">
                  <span className="font-mono text-[9px] text-gold-300">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-sm leading-6 text-white/75">{question}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-24 text-center md:py-32">
        <div className="container-luxe">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Continue the conversation</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(36px,5vw,64px)] font-medium leading-[1.04] tracking-[-0.045em] text-navy-900">
            Have a workflow in mind?
          </h2>
          <Link href="/contact" className="btn-navy mt-9">Talk to Gappy</Link>
        </div>
      </section>
    </div>
  )
}
