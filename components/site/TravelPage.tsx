import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'
import { GOODTIME_URL } from '@/lib/config'

export default function TravelPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).travel
  const path = localizedPath('/travel', locale)

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Travel" path={path} locale={locale} />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        body={<p>{page.hero.body}</p>}
      >
        <a
          href={GOODTIME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          {page.hero.primary}
        </a>
        <Link href={localizedPath('/contact', locale)} className="btn-secondary">
          {page.hero.secondary}
        </Link>
      </PageHero>

      <section className="section-shell">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <p className="eyebrow text-gold-700">{page.why.eyebrow}</p>
          <div>
            <h2 className="section-title">{page.why.title}</h2>
            <div className="body-lead mt-9 grid gap-7 md:grid-cols-2">
              <p>{page.why.body[0]}</p>
              <p className="text-navy-900">{page.why.body[1]}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/10 bg-white py-16 md:py-20">
        <div className="container-luxe">
          <p className="eyebrow text-gold-700">{page.target.eyebrow}</p>
          <h2 className="mt-5 max-w-4xl text-[clamp(2rem,4.5vw,3.8rem)] font-medium leading-[1.14] tracking-[-0.035em] text-navy-900">
            {page.target.title}
          </h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-6">
            {page.target.items.map((type) => (
              <li
                key={type}
                className="flex min-h-24 items-center justify-center bg-white px-4 text-center text-xs font-medium text-navy-900"
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-300">{page.example.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.12] tracking-[-0.035em]">
              {page.example.title}
            </h2>
            <p className="mt-7 max-w-lg text-base leading-8 text-white/55">
              {page.example.body}
            </p>
          </div>
          <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[21px] before:top-6 before:w-px before:bg-gold-300/25">
            {page.example.steps.map((step, index) => (
              <li
                key={step}
                className="relative flex min-h-16 items-center gap-5 rounded-xl border border-white/10 bg-navy-950/50 px-4 py-3"
              >
                <span className="z-10 grid h-9 w-9 flex-none place-items-center rounded-full border border-gold-300/40 bg-navy-900 font-mono text-[9px] text-gold-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm leading-6 text-white/75">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="workflows" className="section-shell scroll-mt-24">
        <div className="container-luxe">
          <p className="eyebrow text-gold-700">{page.workflows.eyebrow}</p>
          <h2 className="section-title mt-6 max-w-4xl">{page.workflows.title}</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-2 lg:grid-cols-3">
            {page.workflows.items.map(([title, body], index) => (
              <article key={title} className="min-h-64 bg-white p-7 md:p-9">
                <span className="font-mono text-[10px] text-gold-700">
                  WF-{String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-14 text-xl font-medium tracking-[-0.025em] text-navy-900">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-500">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell border-y border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">{page.systems.eyebrow}</p>
            <h2 className="section-title mt-6">{page.systems.title}</h2>
            <p className="mt-8 text-[clamp(1.75rem,3.8vw,3.2rem)] font-medium leading-[1.18] tracking-[-0.03em] text-gold-700">
              {page.systems.statement}
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {page.systems.items.map((system, index) => (
              <li
                key={system}
                className="flex min-h-20 items-center gap-4 rounded-xl border border-navy-900/10 bg-ivory-50 px-5"
              >
                <span className="font-mono text-[9px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm font-medium text-navy-900">{system}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe">
          <p className="eyebrow text-gold-700">{page.deployment.eyebrow}</p>
          <h2 className="section-title mt-6">{page.deployment.title}</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-4">
            {page.deployment.steps.map(([title, body], index) => (
              <article key={title} className="min-h-64 bg-white p-7">
                <span className="font-mono text-[10px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-14 text-xl font-medium leading-8 text-navy-900">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-500">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-300">{page.measurement.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.12] tracking-[-0.035em]">
              {page.measurement.title}
            </h2>
            <p className="mt-7 text-sm leading-7 text-white/50">{page.measurement.body}</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {page.measurement.items.map((concept) => (
              <li
                key={concept}
                className="flex min-h-20 items-center rounded-xl border border-white/10 bg-white/[0.04] px-5 text-sm text-white/75"
              >
                {concept}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        locale={locale}
        title={page.cta.title}
        body={page.cta.body}
        secondaryHref="/cases"
        secondaryLabel={page.cta.secondary}
      />
    </div>
  )
}
