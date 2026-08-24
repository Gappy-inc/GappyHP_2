import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'

export default function ProjectsPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).projects
  const path = localizedPath('/cases', locale)

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Projects" path={path} locale={locale} />
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
        <div className="container-luxe">
          <article className="grid gap-12 rounded-[30px] border border-navy-900/10 bg-white p-7 shadow-[0_28px_80px_rgba(11,22,50,0.08)] md:p-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="eyebrow text-gold-700">{page.flagship.eyebrow}</p>
              <div className="mt-20 flex items-center gap-3 text-xs font-medium text-navy-900">
                <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" />
                {page.flagship.status}
              </div>
            </div>
            <div>
              <h2 className="section-title">{page.flagship.title}</h2>
              <p className="body-lead mt-8 max-w-2xl">{page.flagship.body}</p>
              <Link href={localizedPath('/travel', locale)} className="btn-primary mt-9">
                {page.flagship.cta}
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="eyebrow text-gold-300">{page.partnership.eyebrow}</p>
              <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,4.8rem)] font-medium leading-[1.12] tracking-[-0.035em]">
                {page.partnership.title}
              </h2>
            </div>
            <p className="text-base leading-8 text-white/55">{page.partnership.body}</p>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-8">
            {page.partnership.steps.map((step, index) => (
              <li key={step} className="min-h-32 bg-navy-900 p-5">
                <span className="font-mono text-[9px] text-gold-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-10 text-sm font-medium leading-6">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell border-b border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">{page.evidence.eyebrow}</p>
          </div>
          <div>
            <h2 className="section-title">{page.evidence.title}</h2>
            <div className="body-lead mt-8 max-w-3xl space-y-5">
              <p>{page.evidence.body[0]}</p>
              <p className="text-navy-900">{page.evidence.body[1]}</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        locale={locale}
        title={page.cta.title}
        body={page.cta.body}
        secondaryHref="/travel"
        secondaryLabel={page.cta.secondary}
      />
    </div>
  )
}
