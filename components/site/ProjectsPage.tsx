import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import PageHero from '@/components/PageHero'
import StatusLabel from '@/components/StatusLabel'
import { getContent, localizedPath, type Locale } from '@/content'

export default function ProjectsPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).projects
  const path = localizedPath('/cases', locale)
  const heroTitle = locale === 'ja' ? <><span className="whitespace-nowrap">現実の業務から、</span><br /><span className="whitespace-nowrap">検証を積み上げる。</span></> : page.hero.title

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name={locale === 'ja' ? '実証' : 'Work'} path={path} locale={locale} />
      <PageHero variant="utility" eyebrow={page.hero.eyebrow} title={heroTitle} body={<p>{page.hero.body}</p>} />

      <section className="section-shell">
        <div className="container-luxe space-y-10">
          {page.works.map((work, index) => (
            <article key={work.title} className="border border-navy-900/20 bg-white">
              <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[12px] font-medium text-signal-700">WORK / {String(index + 1).padStart(2, '0')}</span>
                    <StatusLabel>{work.status}</StatusLabel>
                  </div>
                  <p className="eyebrow mt-10 text-ink-700">{work.subtitle}</p>
                  <h2 className="section-title mt-5">{work.title}</h2>
                  <p className="mt-7 text-base leading-8 text-ink-700">{work.body}</p>
                </div>
                <dl className="self-end border-t border-navy-900/20">
                  {work.details.map(([label, value]) => (
                    <div key={label} className="grid gap-2 border-b border-navy-900/20 py-5 sm:grid-cols-[10rem_1fr]">
                      <dt className="text-[13px] font-semibold leading-6 text-navy-900">{label}</dt>
                      <dd className="text-[14px] leading-7 text-ink-700">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell bg-navy-950 text-white">
        <div className="container-luxe">
          <p className="eyebrow text-signal-300">{page.evaluation.eyebrow}</p>
          <h2 className="section-title mt-6 max-w-4xl !text-white">{page.evaluation.title}</h2>
          <ol className="mt-12 grid gap-px bg-white/20 md:grid-cols-4">
            {page.evaluation.steps.map((step, index) => (
              <li key={step} className="min-h-44 bg-navy-950 p-6">
                <span className="font-mono text-[12px] font-medium text-signal-300">{String(index + 1).padStart(2, '0')}</span>
                <p className="mt-10 text-base font-semibold leading-7 text-white">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-navy-900/15 bg-white py-16 md:py-20">
        <div className="container-luxe grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <p className="eyebrow text-signal-700">{page.evidence.eyebrow}</p>
          <div>
            <h2 className="section-title">{page.evidence.title}</h2>
            <p className="body-lead mt-7 max-w-3xl font-medium text-navy-900">{page.evidence.body}</p>
          </div>
        </div>
      </section>

      <CTASection locale={locale} title={page.cta.title} body={page.cta.body} secondaryHref="/travel" secondaryLabel={page.cta.secondary} />
    </div>
  )
}
