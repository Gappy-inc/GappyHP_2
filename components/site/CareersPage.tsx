import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'
import { CONTACT_EMAIL } from '@/lib/config'

export default function CareersPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).careers
  const path = localizedPath('/careers', locale)

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Careers" path={path} locale={locale} />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        body={
          <>
            <p>{page.hero.body[0]}</p>
            <p className="mt-4">{page.hero.body[1]}</p>
          </>
        }
      />

      <section className="section-shell">
        <div className="container-luxe grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-2">
          {page.principles.map(([title, body], index) => (
            <article key={title} className="min-h-72 bg-white p-7 md:p-10">
              <span className="font-mono text-[10px] text-gold-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-16 text-2xl font-medium leading-[1.3] tracking-[-0.025em] text-navy-900">
                {title}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-ink-500">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-300">{page.disciplines.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[1.12] tracking-[-0.035em]">
              {page.disciplines.title}
            </h2>
            <p className="mt-7 text-sm leading-7 text-white/50">{page.disciplines.body}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {page.disciplines.items.map((discipline, index) => (
              <li
                key={discipline}
                className="flex min-h-24 items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5"
              >
                <span className="font-mono text-[9px] text-gold-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-white/75">{discipline}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell border-b border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow text-gold-700">{page.application.eyebrow}</p>
            <h2 className="section-title mt-6">{page.application.title}</h2>
          </div>
          <div>
            <p className="body-lead">{page.application.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${CONTACT_EMAIL}`} className="btn-primary">
                {page.application.primary}
              </a>
              <Link href={localizedPath('/about', locale)} className="btn-secondary">
                {page.application.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
