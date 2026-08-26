import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CurrentOpenings from '@/components/CurrentOpenings'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'
import { CONTACT_EMAIL } from '@/lib/config'

export default function CareersPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).careers
  const path = localizedPath('/careers', locale)
  const heroTitle = locale === 'ja' ? <><span className="whitespace-nowrap">現実の業務で動く</span><br /><span className="whitespace-nowrap">AIをつくる。</span></> : page.hero.title

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name={locale === 'ja' ? '採用' : 'Careers'} path={path} locale={locale} />
      <PageHero variant="utility" eyebrow={page.hero.eyebrow} title={heroTitle} body={<><p>{page.hero.body[0]}</p><p className="mt-4">{page.hero.body[1]}</p></>} />

      <section className="section-shell bg-white">
        <div className="container-luxe grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="eyebrow text-signal-700">{page.currentOpenings.eyebrow}</p>
            <h2 className="section-title mt-6">{page.currentOpenings.title}</h2>
          </div>
          <div>
            <CurrentOpenings openings={page.openings} empty={page.currentOpenings.empty} />
            <p className="body-lead mt-7 max-w-2xl">{page.currentOpenings.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${CONTACT_EMAIL}?subject=Open%20Application`} className="btn-primary">{page.application.primary}</a>
              <Link href={localizedPath('/about', locale)} className="btn-secondary">{page.application.secondary}</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-950 text-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="eyebrow text-signal-300">{page.disciplines.eyebrow}</p>
            <h2 className="section-title mt-6 !text-white">{page.disciplines.title}</h2>
            <p className="mt-7 text-[14px] leading-7 text-white/70">{page.disciplines.body}</p>
          </div>
          <ul className="grid gap-px bg-white/20 sm:grid-cols-2">
            {page.disciplines.items.map((discipline) => <li key={discipline} className="flex min-h-20 items-center bg-navy-950 px-5 text-[14px] font-medium text-white">{discipline}</li>)}
          </ul>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-6 md:grid-cols-3">
          {page.principles.map(([title, body]) => (
            <article key={title} className="min-h-60 border-t-4 border-signal-500 bg-white p-6">
              <h2 className="text-lg font-semibold leading-7 text-navy-900">{title}</h2>
              <p className="mt-5 text-base leading-8 text-ink-700">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
