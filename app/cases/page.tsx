import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import PageHero from '@/components/PageHero'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Projects | Gappy',
  description:
    'Gappy projects begin with bounded operational workflows, measurable outcomes, and explicit limits on what AI is allowed to do.',
  path: '/cases',
})

const partnershipFlow = [
  'Discover',
  'Map',
  'Baseline',
  'Prototype',
  'Shadow',
  'Deploy',
  'Measure',
  'Expand',
]

export default function ProjectsPage() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Projects" path="/cases" />
      <PageHero
        eyebrow="Projects"
        title="Projects built around real operations."
        body={
          <>
            <p>We work from operational reality backward.</p>
            <p className="mt-4">
              Each project starts with a bounded workflow, a measurable outcome,
              and explicit limits on what the AI is allowed to do.
            </p>
          </>
        }
      />

      <section className="section-shell">
        <div className="container-luxe">
          <article className="grid gap-12 rounded-[30px] border border-navy-900/10 bg-white p-7 shadow-[0_28px_80px_rgba(11,22,50,0.08)] md:p-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="eyebrow text-gold-700">Primary vertical / Travel</p>
              <div className="mt-20 flex items-center gap-3 text-xs font-medium text-navy-900">
                <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />
                Active project area
              </div>
            </div>
            <div>
              <h2 className="section-title">AI Workforce for Travel Operations</h2>
              <p className="body-lead mt-8 max-w-2xl">
                Operational AI for supplier coordination, bookings,
                reconciliation, fulfillment, schedule changes, and customer
                communication.
              </p>
              <Link href="/travel" className="btn-primary mt-9">
                Explore Travel
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="eyebrow text-gold-300">Design partnership</p>
              <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,4.8rem)] font-medium leading-[1.01] tracking-[-0.052em]">
                Build one operating workflow with us.
              </h2>
            </div>
            <p className="text-base leading-8 text-white/55">
              Responsibility expands only after the workflow and its evidence are
              visible. The process is designed to make limits and learning explicit.
            </p>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-8">
            {partnershipFlow.map((step, index) => (
              <li key={step} className="min-h-32 bg-navy-900 p-5">
                <span className="font-mono text-[9px] text-gold-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-10 text-sm font-medium">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell border-b border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">Confidential work</p>
          </div>
          <div>
            <h2 className="section-title">Evidence without invented proof.</h2>
            <div className="body-lead mt-8 max-w-3xl space-y-5">
              <p>
                Some of our work is carried out with design partners or under
                confidentiality.
              </p>
              <p className="text-navy-900">
                We publish customer names, metrics, and implementation details only
                when disclosure is approved.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Build one operating workflow with us."
        body="Start with a workflow that matters, make its operating truth visible, and define what the first deployment needs to prove."
        secondaryHref="/travel"
        secondaryLabel="Explore Travel"
      />
    </div>
  )
}
