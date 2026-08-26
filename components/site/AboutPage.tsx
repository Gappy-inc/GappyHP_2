import Image from 'next/image'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CompanyTimeline from '@/components/CompanyTimeline'
import CTASection from '@/components/CTASection'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'
import { COMPANY_ADDRESS, CONTACT_EMAIL, LEGAL_NAME } from '@/lib/config'

export default function AboutPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).about
  const path = localizedPath('/about', locale)
  const heroTitle = locale === 'ja' ? <><span className="whitespace-nowrap">業務責任を担える</span><br /><span className="whitespace-nowrap">AIをつくる。</span></> : page.hero.title
  const companyValues = [`${LEGAL_NAME} / Gappy, Inc.`, '浅野 充輝 / Mitsuki Asano', '2025', COMPANY_ADDRESS, CONTACT_EMAIL]

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name={locale === 'ja' ? '会社情報' : 'Company'} path={path} locale={locale} />
      <PageHero variant="company" eyebrow={page.hero.eyebrow} title={heroTitle} body={<><p>{page.hero.body[0]}</p><p className="mt-4 font-medium text-navy-900">{page.hero.body[1]}</p></>} />

      <section className="section-shell bg-white">
        <div className="container-luxe grid gap-10 lg:grid-cols-[320px_1fr] lg:items-center lg:gap-20">
          <div className="relative aspect-[4/5] max-w-sm overflow-hidden bg-navy-900">
            <Image src="/mitsuki-asano.webp" alt={page.founder.imageAlt} fill sizes="(max-width: 1024px) 85vw, 320px" className="object-cover object-[50%_24%]" />
          </div>
          <div>
            <p className="eyebrow text-signal-700">{page.founder.eyebrow}</p>
            <h2 className="section-title mt-6 max-w-4xl">{page.founder.title}</h2>
            <div className="body-lead mt-7 max-w-3xl space-y-5">
              {page.founder.body.map((paragraph, index) => <p key={paragraph} className={index === 2 ? 'font-medium text-navy-900' : undefined}>{paragraph}</p>)}
            </div>
            <div className="mt-8 border-l-2 border-signal-500 pl-5">
              <p className="text-lg font-semibold text-navy-900">{page.founder.name}</p>
              <p className="mt-1 text-sm leading-6 text-ink-700">{page.founder.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="eyebrow text-signal-700">{page.mission.eyebrow}</p>
            <h2 className="section-title mt-6">{page.mission.title}</h2>
          </div>
          <div className="body-lead self-end space-y-5">
            {page.mission.body.map((paragraph, index) => <p key={paragraph} className={index === 2 ? 'font-medium text-navy-900' : undefined}>{paragraph}</p>)}
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-950 text-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="eyebrow text-signal-300">{page.why.eyebrow}</p>
            <h2 className="section-title mt-6 !text-white">{page.why.title}</h2>
          </div>
          <div className="grid gap-7 text-base leading-8 text-white/75 md:grid-cols-2">
            <div className="space-y-5"><p>{page.why.body[0]}</p><p>{page.why.body[1]}</p></div>
            <div className="space-y-5 font-medium text-white"><p>{page.why.body[2]}</p><p>{page.why.body[3]}</p></div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container-luxe">
          <p className="eyebrow text-signal-700">{page.principles.eyebrow}</p>
          <h2 className="section-title mt-6 max-w-4xl">{page.principles.title}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {page.principles.items.map(([title, body]) => (
              <article key={title} className="min-h-52 border-t-4 border-navy-900 bg-ivory-50 p-6">
                <h3 className="text-lg font-semibold leading-7 text-navy-900">{title}</h3>
                <p className="mt-4 text-[15px] leading-7 text-ink-700">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="eyebrow text-signal-700">{page.timeline.eyebrow}</p>
            <h2 className="section-title mt-6">{page.timeline.title}</h2>
            <div className="mt-10"><CompanyTimeline items={page.timeline.items} /></div>
          </div>
          <div className="border-l-2 border-signal-500 pl-6 md:pl-8">
            <p className="eyebrow text-signal-700">{page.team.eyebrow}</p>
            <h2 className="section-title mt-6">{page.team.title}</h2>
            <p className="body-lead mt-7">{page.team.body}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/15 bg-white py-16 md:py-20">
        <div className="container-luxe grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="eyebrow text-signal-700">{page.company.eyebrow}</p>
            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.035em] text-navy-900 md:text-4xl">{LEGAL_NAME}</h2>
          </div>
          <dl className="border-t border-navy-900/20">
            {page.company.labels.map((label, index) => (
              <div key={label} className="grid gap-2 border-b border-navy-900/20 py-5 sm:grid-cols-[10rem_1fr]">
                <dt className="text-[13px] font-semibold text-ink-700">{label}</dt>
                <dd className="text-[14px] leading-7 text-navy-900">{companyValues[index]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTASection locale={locale} />
    </div>
  )
}
