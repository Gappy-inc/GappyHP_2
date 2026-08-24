import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import PageHero from '@/components/PageHero'
import { CONTACT_EMAIL } from '@/lib/config'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Careers | Gappy',
  description:
    'Build applied AI systems at Gappy that understand operational context, work across real software, and carry bounded responsibility.',
  path: '/careers',
})

const workingPrinciples = [
  [
    'Frontier technology, operational consequences',
    'The work connects rapidly changing AI capability to systems where actions, permissions, and outcomes matter.',
  ],
  [
    'Close to the problem',
    'We learn from the operation itself: the people, systems, exceptions, and decisions that keep it moving.',
  ],
  [
    'High ownership',
    'Small teams own the path from problem definition through implementation and operating evidence.',
  ],
  [
    'Global from the beginning',
    'Travel crosses languages, markets, suppliers, policies, and time zones. Our systems and team are built with that scope in mind.',
  ],
]

const disciplines = [
  'AI / Agent Engineering',
  'Full-stack Engineering',
  'Product',
  'Design',
  'Travel Operations',
  'Business Development',
]

export default function CareersPage() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Careers" path="/careers" />
      <PageHero
        eyebrow="Careers"
        title="Build AI that works in the real world."
        body={
          <>
            <p>We are building systems that do not stop at generating text.</p>
            <p className="mt-4">
              They have to understand messy operational context, work across real
              software, make constrained decisions, and be accountable for what
              happened next.
            </p>
          </>
        }
      />

      <section className="section-shell">
        <div className="container-luxe grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-2">
          {workingPrinciples.map(([title, body], index) => (
            <article key={title} className="min-h-72 bg-white p-7 md:p-10">
              <span className="font-mono text-[10px] text-gold-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-16 text-2xl font-medium tracking-[-0.035em] text-navy-900">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-ink-500">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-300">Disciplines</p>
            <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.05em]">
              The capabilities behind operational AI.
            </h2>
            <p className="mt-7 text-sm leading-7 text-white/50">
              These are areas of work at Gappy, not a claim that every category has
              a current open role.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {disciplines.map((discipline, index) => (
              <li
                key={discipline}
                className="flex min-h-24 items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5"
              >
                <span className="font-mono text-[9px] text-gold-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-white/75">{discipline}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell border-b border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow text-gold-700">Open application</p>
            <h2 className="section-title mt-6">Don&apos;t see the right role?</h2>
          </div>
          <div>
            <p className="body-lead">
              If the mission fits how you want to work, tell us what you are
              unusually good at and what you want to build.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary">
                Contact Gappy
              </a>
              <Link href="/about" className="btn-secondary">
                About Gappy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
