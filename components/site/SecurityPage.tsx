import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'

export default function SecurityPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).security
  const path = localizedPath('/security', locale)
  const heroTitle = locale === 'ja' ? <><span className="whitespace-nowrap">自律化の前に、</span><br /><span className="whitespace-nowrap">統制を設計する。</span></> : page.hero.title

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name={locale === 'ja' ? 'セキュリティ' : 'Security'} path={path} locale={locale} />
      <PageHero variant="utility" eyebrow={page.hero.eyebrow} title={heroTitle} body={<p>{page.hero.body}</p>} />
      <section className="section-shell">
        <div className="container-luxe">
          <p className="max-w-4xl border-l-4 border-signal-500 bg-white p-5 text-[15px] font-medium leading-7 text-navy-900">{page.notice}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.sections.map(([title, body], index) => (
              <article key={title} className="min-h-64 border border-navy-900/20 bg-white p-6">
                <span className="font-mono text-[12px] font-medium text-signal-700">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-10 text-xl font-semibold leading-8 text-navy-900">{title}</h2>
                <p className="mt-5 text-base leading-8 text-ink-700">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection locale={locale} />
    </div>
  )
}
