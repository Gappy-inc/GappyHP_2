import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import PageHero from '@/components/PageHero'
import { CONTACT_EMAIL, GOODTIME_URL } from '@/lib/config'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Contact | Gappy',
  description:
    'Talk to Gappy about an AI Workforce deployment, strategic collaboration, careers, or company and industry inquiries.',
  path: '/contact',
})

const contactPaths = [
  [
    'Enterprise / Design Partner',
    'Explore an AI Workforce deployment around a real operational workflow.',
    'Schedule a conversation',
    GOODTIME_URL,
  ],
  [
    'Strategic Partner / Investor',
    'Discuss Gappy, our technology, market, or strategic collaboration.',
    'Email Gappy',
    `mailto:${CONTACT_EMAIL}?subject=Strategic%20inquiry`,
  ],
  [
    'Engineering / Careers',
    'Interested in building applied AI systems with us?',
    'Introduce yourself',
    `mailto:${CONTACT_EMAIL}?subject=Careers%20inquiry`,
  ],
  [
    'Media / Industry',
    'Company, technology, or travel-industry inquiries.',
    'Contact Gappy',
    `mailto:${CONTACT_EMAIL}?subject=Media%20or%20industry%20inquiry`,
  ],
]

export default function ContactPage() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Contact" path="/contact" />
      <PageHero
        eyebrow="Contact"
        title="Bring us the operation."
        body={
          <p>
            If important work still moves manually across systems, teams, and
            repeated judgment, we want to understand it.
          </p>
        }
      />

      <section className="section-shell">
        <div className="container-luxe grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-2">
          {contactPaths.map(([title, body, label, href], index) => (
            <article key={title} className="flex min-h-72 flex-col bg-white p-7 md:p-10">
              <span className="font-mono text-[10px] text-gold-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-14 text-2xl font-medium tracking-[-0.035em] text-navy-900">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-ink-500">{body}</p>
              <a
                href={href}
                target={href === GOODTIME_URL ? '_blank' : undefined}
                rel={href === GOODTIME_URL ? 'noopener noreferrer' : undefined}
                className="mt-auto inline-flex min-h-11 items-center pt-8 text-sm font-medium text-navy-900 underline decoration-gold-500 underline-offset-8"
              >
                {label}
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow text-gold-300">Design partner conversation</p>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,4.8rem)] font-medium leading-[1.01] tracking-[-0.052em]">
              Start with the workflow as it exists today.
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-white/55">
              We will discuss the trigger, systems involved, human handoffs,
              exceptions, and what a useful first deployment needs to prove.
            </p>
            <a
              href={GOODTIME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light mt-8"
            >
              Schedule a conversation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
