import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'
import { CONTACT_EMAIL } from '@/lib/config'

// LEGAL REVIEW REQUIRED BEFORE FINAL PRODUCTION APPROVAL
export default function PrivacyPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).privacy
  const path = localizedPath('/privacy', locale)
  const sections = page.sections as Array<[string, string[]]>
  const heroTitle = locale === 'ja' ? <><span className="whitespace-nowrap">プライバシー</span><br className="sm:hidden" /><span className="whitespace-nowrap">について</span></> : page.hero.title

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name={locale === 'ja' ? 'プライバシー' : 'Privacy'} path={path} locale={locale} />
      <PageHero variant="utility" eyebrow={page.hero.eyebrow} title={heroTitle} body={<><p>{page.hero.body}</p><p className="mt-5 font-mono text-[12px] font-medium text-ink-700">{page.updated}</p></>} />
      <section className="section-shell bg-white">
        <div className="container-luxe max-w-5xl">
          <div className="divide-y divide-navy-900/20 border-y border-navy-900/20">
            {sections.map(([title, paragraphs]) => (
              <section key={title} className="grid gap-5 py-8 md:grid-cols-[0.68fr_1.32fr] md:gap-12">
                <h2 className="text-xl font-semibold leading-8 text-navy-900">{title}</h2>
                <div className="space-y-4 text-base leading-8 text-ink-700">
                  {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {title === (locale === 'ja' ? 'お問い合わせ' : 'Contact') ? <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center font-medium text-navy-900 underline decoration-signal-600 underline-offset-4">{CONTACT_EMAIL}</a> : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
