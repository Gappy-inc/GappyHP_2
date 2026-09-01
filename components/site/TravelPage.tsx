import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CaseVisual, { type CaseVisualVariant } from '@/components/CaseVisual'
import CTASection from '@/components/CTASection'
import ExecutionTrace from '@/components/ExecutionTrace'
import PageHero from '@/components/PageHero'
import WorkflowMetadata from '@/components/WorkflowMetadata'
import { getContent, localizedPath, type Locale } from '@/content'
import { GOODTIME_URL } from '@/lib/config'

export default function TravelPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).travel
  const path = localizedPath('/travel', locale)
  const visualVariants: CaseVisualVariant[] = ['supplier', 'booking', 'reconciliation', 'fulfillment', 'schedule', 'communication']
  const heroTitle = locale === 'ja' ? <><span className="whitespace-nowrap">旅行業務の</span><br /><span className="whitespace-nowrap">AI Workforce</span></> : page.hero.title

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name={locale === 'ja' ? '旅行業務' : 'Travel'} path={path} locale={locale} />
      <PageHero
        variant="product"
        eyebrow={page.hero.eyebrow}
        title={heroTitle}
        body={<p>{page.hero.body}</p>}
        visual={<ExecutionTrace locale={locale} compact />}
      >
        <a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{page.hero.primary}</a>
        <Link href={localizedPath('/cases', locale)} className="btn-secondary">{page.hero.secondary}</Link>
      </PageHero>

      <section className="section-shell">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <p className="eyebrow text-signal-700">{page.why.eyebrow}</p>
          <div>
            <h2 className="section-title">{page.why.title}</h2>
            <div className="body-lead mt-8 grid gap-7 md:grid-cols-2">
              <p>{page.why.body[0]}</p>
              <p className="font-medium text-navy-900">{page.why.body[1]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/15 bg-white py-16 md:py-20">
        <div className="container-luxe">
          <p className="eyebrow text-signal-700">{page.target.eyebrow}</p>
          <h2 className="section-title mt-6 max-w-4xl">{page.target.title}</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="border border-navy-900/25 bg-ivory-50 p-6 md:p-8">
              <h3 className="text-lg font-semibold text-navy-900">{page.target.currentLabel}</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-3">
                {page.target.current.map((item) => <li key={item} className="flex min-h-20 items-center border-l-4 border-signal-500 bg-white px-4 text-[14px] font-semibold leading-6 text-navy-900">{item}</li>)}
              </ul>
            </div>
            <div className="border border-navy-900/15 bg-white p-6 md:p-8">
              <h3 className="text-lg font-semibold text-navy-900">{page.target.longerTermLabel}</h3>
              <ul className="mt-6 space-y-2">
                {page.target.longerTerm.map((item) => <li key={item} className="flex min-h-12 items-center border-b border-navy-900/15 text-[14px] font-medium text-ink-700">{item}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="workflows" className="section-shell scroll-mt-24">
        <div className="container-luxe">
          <p className="eyebrow text-signal-700">{page.workflows.eyebrow}</p>
          <h2 className="section-title mt-6 max-w-4xl">{page.workflows.title}</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {page.workflows.items.map((item, index) => (
              <article key={item.title} className="border border-navy-900/20 bg-white p-5 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[12px] font-medium text-signal-700">WF-{String(index + 1).padStart(2, '0')}</span>
                  <span className="h-px flex-1 bg-navy-900/15" aria-hidden="true" />
                </div>
                <CaseVisual variant={visualVariants[index]} locale={locale} className="mt-5" />
                <h3 className="subsection-title mt-7 text-navy-900">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-ink-700">{item.body}</p>
                <WorkflowMetadata labels={page.workflows.labels} values={[item.trigger, item.systems, item.humanControl, item.completeWhen]} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell border-y border-navy-900/15 bg-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="eyebrow text-signal-700">{page.systems.eyebrow}</p>
            <h2 className="section-title mt-6">{page.systems.title}</h2>
            <p className="subsection-title mt-7 text-signal-700">{page.systems.statement}</p>
          </div>
          <ul className="grid gap-px bg-navy-900/15 sm:grid-cols-2">
            {page.systems.items.map((system) => <li key={system} className="flex min-h-16 items-center bg-ivory-50 px-5 text-[14px] font-medium text-navy-900">{system}</li>)}
          </ul>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe">
          <p className="eyebrow text-signal-700">{page.deployment.eyebrow}</p>
          <h2 className="section-title mt-6">{page.deployment.title}</h2>
          <ol className="mt-12 grid gap-px bg-navy-900/15 md:grid-cols-4">
            {page.deployment.steps.map(([title, body], index) => (
              <li key={title} className="min-h-56 bg-white p-6">
                <span className="font-mono text-[12px] font-medium text-signal-700">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-10 text-lg font-semibold leading-7 text-navy-900">{title}</h3>
                <p className="mt-4 text-[14px] leading-7 text-ink-700">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-navy-900/15 bg-white py-16 md:py-20">
        <div className="container-luxe grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow text-signal-700">{page.measurement.eyebrow}</p>
            <h2 className="section-title mt-6">{page.measurement.title}</h2>
            <p className="mt-6 text-[15px] leading-7 text-ink-700">{page.measurement.body}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {page.measurement.items.map((item) => <li key={item} className="border border-navy-900/20 bg-ivory-50 px-4 py-3 text-[13px] font-medium text-navy-900">{item}</li>)}
          </ul>
        </div>
      </section>

      <CTASection locale={locale} title={page.cta.title} body={page.cta.body} secondaryHref="/cases" secondaryLabel={page.cta.secondary} />
    </div>
  )
}
