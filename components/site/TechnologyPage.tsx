import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import OperatingLoop from '@/components/OperatingLoop'
import PageHero from '@/components/PageHero'
import VerificationPath from '@/components/VerificationPath'
import { getContent, localizedPath, type Locale } from '@/content'

export default function TechnologyPage({ locale }: { locale: Locale }) {
  const copy = getContent(locale)
  const page = copy.technology
  const path = localizedPath('/technology', locale)
  const heroTitle = locale === 'ja' ? <><span className="whitespace-nowrap">業務責任を、</span><br /><span className="whitespace-nowrap">明確な統制の</span><br className="sm:hidden" /><span className="whitespace-nowrap">もとで。</span></> : page.hero.title

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name={locale === 'ja' ? '技術' : 'Technology'} path={path} locale={locale} />
      <PageHero
        variant="technology"
        eyebrow={page.hero.eyebrow}
        title={heroTitle}
        body={<><p>{page.hero.body[0]}</p><p className="mt-4 font-medium !text-white">{page.hero.body[1]}</p></>}
      />

      <section className="section-shell bg-navy-950 text-white">
        <div className="container-luxe">
          <p className="eyebrow text-signal-300">{page.loop.eyebrow}</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <h2 className="section-title max-w-4xl !text-white">{page.loop.title}</h2>
            <p className="text-base leading-8 text-white/75">{page.loop.body}</p>
          </div>
          <div className="mt-12"><OperatingLoop items={copy.operatingLoop} compact /></div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe">
          <div className="grid gap-px bg-navy-900/20 lg:grid-cols-4">
            {page.layers.map((layer, index) => (
              <article key={layer.title} className="flex min-h-[380px] flex-col bg-white p-6 md:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[12px] font-medium text-signal-700">{String(index + 1).padStart(2, '0')}</span>
                  <span className="eyebrow text-ink-700">{layer.eyebrow}</span>
                </div>
                <h2 className="subsection-title mt-12 text-navy-900">{layer.title}</h2>
                <p className="mt-5 text-[15px] leading-7 text-ink-700">{layer.body}</p>
                <ul className="mt-auto space-y-2 pt-8">
                  {layer.detail.map((item) => <li key={item} className="border-t border-navy-900/15 pt-3 text-[13px] font-medium leading-6 text-navy-900">{item}</li>)}
                </ul>
                {layer.statement ? <p className="mt-6 font-mono text-sm font-medium text-signal-700">{layer.statement}</p> : null}
              </article>
            ))}
          </div>
          <aside className="border-x border-b border-navy-900/20 bg-signal-500 p-6 md:grid md:grid-cols-[0.7fr_1.3fr] md:gap-10 md:p-8">
            <div>
              <p className="eyebrow text-navy-950">{page.humanEscalation.eyebrow}</p>
              <h2 className="subsection-title mt-4 text-navy-950">{page.humanEscalation.title}</h2>
            </div>
            <p className="mt-5 text-base leading-8 text-navy-950/80 md:mt-0">{page.humanEscalation.body}</p>
          </aside>
        </div>
      </section>

      <section className="border-y border-navy-900/15 bg-white py-16 md:py-20">
        <div className="container-luxe grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <p className="eyebrow text-signal-700">Verification</p>
            <h2 className="section-title mt-6">{locale === 'ja' ? '操作と完了を分けて考える。' : 'Separate an action from its outcome.'}</h2>
          </div>
          <VerificationPath locale={locale} />
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe">
          <p className="eyebrow text-signal-700">{page.principles.eyebrow}</p>
          <h2 className="section-title mt-6 max-w-4xl">{page.principles.title}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.principles.items.map(([title, body]) => (
              <article key={title} className="min-h-56 border-t-4 border-navy-900 bg-white p-6">
                <h3 className="text-lg font-semibold leading-7 text-navy-900">{title}</h3>
                <p className="mt-4 text-[15px] leading-7 text-ink-700">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} body={page.cta.body} />
    </div>
  )
}
