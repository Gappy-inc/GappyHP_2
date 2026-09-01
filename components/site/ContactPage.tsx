import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'
import { CONTACT_EMAIL, GOODTIME_URL } from '@/lib/config'

export default function ContactPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).contact
  const path = localizedPath('/contact', locale)
  const links = [GOODTIME_URL, `mailto:${CONTACT_EMAIL}`]
  const heroTitle = locale === 'ja' ? <><span className="whitespace-nowrap">その業務を、</span><br /><span className="whitespace-nowrap">見せてください。</span></> : page.hero.title

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name={locale === 'ja' ? 'お問い合わせ' : 'Contact'} path={path} locale={locale} />
      <PageHero variant="utility" eyebrow={page.hero.eyebrow} title={heroTitle} body={<p>{page.hero.body}</p>} />

      <section className="section-shell">
        <div className="container-luxe grid gap-6 lg:grid-cols-2">
          {page.paths.map((contactPath, index) => {
            const isExternal = index === 0
            return (
              <article key={contactPath.title} className="flex min-h-[340px] flex-col border border-navy-900/20 bg-white p-6 md:p-9">
                <span className="font-mono text-[12px] font-medium text-signal-700">0{index + 1}</span>
                <h2 className="section-title mt-12 max-w-[18ch]">{contactPath.title}</h2>
                <p className="mt-6 max-w-2xl text-base leading-8 text-ink-700">{contactPath.body}</p>
                {!isExternal ? <p className="mt-4 text-base font-semibold text-navy-900">{CONTACT_EMAIL}</p> : null}
                <p className="mt-4 text-[13px] leading-6 text-ink-700">{contactPath.note}</p>
                <a href={links[index]} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} className={`${index === 0 ? 'btn-primary' : 'btn-secondary'} mt-auto self-start`}>{contactPath.cta}</a>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
