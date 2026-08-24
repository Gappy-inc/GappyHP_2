import Image from 'next/image'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'
import {
  COMPANY_ADDRESS,
  CONTACT_EMAIL,
  LEGAL_NAME,
} from '@/lib/config'

export default function AboutPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).about
  const path = localizedPath('/about', locale)
  const companyValues = [
    `${LEGAL_NAME} / Gappy, Inc.`,
    '浅野 充輝 / Mitsuki Asano',
    '2025',
    COMPANY_ADDRESS,
    CONTACT_EMAIL,
  ]

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name={page.hero.eyebrow} path={path} locale={locale} />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        body={
          <>
            <p>{page.hero.body[0]}</p>
            <p className="mt-4 font-medium text-navy-900">{page.hero.body[1]}</p>
          </>
        }
      />

      <section className="section-shell">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">{page.mission.eyebrow}</p>
            <h2 className="section-title mt-6">{page.mission.title}</h2>
          </div>
          <div className="body-lead self-end space-y-5">
            {page.mission.body.map((paragraph, index) => (
              <p key={paragraph} className={index === 2 ? 'text-navy-900' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <p className="eyebrow text-gold-300">{page.why.eyebrow}</p>
          <div>
            <h2 className="section-title max-w-4xl !text-white">
              {page.why.title}
            </h2>
            <div className="mt-9 grid gap-7 text-base leading-8 text-white/55 md:grid-cols-2">
              <div className="space-y-5">
                <p>{page.why.body[0]}</p>
                <p>{page.why.body[1]}</p>
              </div>
              <div className="space-y-5 text-white/80">
                <p>{page.why.body[2]}</p>
                <p>{page.why.body[3]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-navy-900/10 bg-white">
        <div className="container-luxe">
          <p className="eyebrow text-gold-700">{page.principles.eyebrow}</p>
          <h2 className="section-title mt-6 max-w-4xl">{page.principles.title}</h2>
          <div className="mt-14 grid border-l border-t border-navy-900/20 sm:grid-cols-2 lg:grid-cols-5">
            {page.principles.items.map(([title, body], index) => (
              <article key={title} className="min-h-64 border-b border-r border-navy-900/20 bg-white p-6">
                <span className="font-mono text-[12px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="subsection-title mt-12 text-navy-900">
                  {title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-ink-500">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-12 border-y border-navy-900/20 bg-white py-10 md:py-14 lg:grid-cols-[280px_1fr] lg:gap-20">
          <div className="overflow-hidden bg-navy-900">
            <Image
              src="/CEO.jpg"
              alt={page.founder.imageAlt}
              width={480}
              height={600}
              sizes="(max-width: 1024px) 100vw, 240px"
              className="h-full min-h-[320px] w-full object-cover object-top"
            />
          </div>
          <div className="self-center">
            <p className="eyebrow text-gold-700">{page.founder.eyebrow}</p>
            <h2 className="section-title mt-6">
              {page.founder.title}
            </h2>
            <div className="body-lead mt-7 max-w-3xl space-y-5">
              {page.founder.body.map((paragraph, index) => (
                <p key={paragraph} className={index === 2 ? 'text-navy-900' : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 text-sm leading-6 text-ink-500">
              <p className="font-medium text-navy-900">浅野 充輝 / Mitsuki Asano</p>
              <p>{page.founder.role}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-y border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">{page.company.eyebrow}</p>
            <h2 className="mt-6 text-4xl font-medium tracking-[-0.04em] text-navy-900">
              {LEGAL_NAME}
            </h2>
          </div>
          <dl className="divide-y divide-navy-900/10 border-y border-navy-900/10">
            {page.company.labels.map((label, index) => (
              <div key={label} className="grid gap-2 py-5 sm:grid-cols-[160px_1fr]">
                <dt className="text-xs font-medium uppercase tracking-[0.12em] text-ink-400">
                  {label}
                </dt>
                <dd className="text-sm leading-7 text-navy-900">
                  {companyValues[index]}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTASection locale={locale} />
    </div>
  )
}
