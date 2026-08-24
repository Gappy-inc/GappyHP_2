import Link from 'next/link'
import CTASection from '@/components/CTASection'
import OperatingLoop from '@/components/OperatingLoop'
import OperationalGraph from '@/components/OperationalGraph'
import { getContent, localizedPath, type Locale } from '@/content'
import { GOODTIME_URL } from '@/lib/config'

export default function HomePage({ locale }: { locale: Locale }) {
  const copy = getContent(locale)
  const page = copy.home

  return (
    <div className="overflow-hidden bg-ivory-50 text-ink-900">
      <section className="relative pb-20 pt-32 md:pb-28 md:pt-40">
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_20%,rgba(201,169,97,0.16),transparent_32%),linear-gradient(180deg,#fdfcf8_0%,#f4f0e4_100%)]"
          aria-hidden="true"
        />
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div>
            <p className="eyebrow text-gold-700">{page.hero.eyebrow}</p>
            <h1 className="display-title mt-7 max-w-4xl">{page.hero.title}</h1>
            <p className="body-lead mt-8 max-w-2xl">{page.hero.body}</p>
            <p className="mt-5 text-lg font-medium text-navy-900">
              {page.hero.emphasis}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={localizedPath('/travel', locale)} className="btn-primary">
                {page.hero.primary}
              </Link>
              <a
                href={GOODTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                {page.hero.secondary}
              </a>
            </div>
            <p className="eyebrow mt-10 text-ink-400">{page.hero.label}</p>
          </div>
          <OperationalGraph locale={locale} />
        </div>
      </section>

      <section className="section-shell border-y border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">{page.shift.eyebrow}</p>
            <h2 className="section-title mt-6">{page.shift.title}</h2>
          </div>
          <div className="space-y-6 self-end text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.8] text-ink-500">
            {page.shift.body.map((paragraph, index) => (
              <p key={paragraph} className={index === 2 ? 'text-navy-900' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="eyebrow text-gold-300">{page.workforce.eyebrow}</p>
              <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.08] tracking-[-0.045em]">
                {page.workforce.title}
              </h2>
            </div>
            <p className="text-base leading-8 text-white/55">{page.workforce.body}</p>
          </div>
          <div className="mt-14">
            <OperatingLoop items={copy.operatingLoop} />
          </div>
          <Link
            href={localizedPath('/technology', locale)}
            className="mt-9 inline-flex min-h-11 items-center text-sm font-medium text-gold-300 underline decoration-white/25 underline-offset-8 hover:text-white"
          >
            {page.workforce.cta}
          </Link>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid items-start gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">{page.travel.eyebrow}</p>
            <h2 className="section-title mt-6">{page.travel.title}</h2>
            <div className="body-lead mt-8 max-w-xl space-y-5">
              {page.travel.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link href={localizedPath('/travel', locale)} className="btn-primary mt-9">
              {page.travel.cta}
            </Link>
          </div>
          <div className="rounded-[30px] border border-navy-900/10 bg-white p-7 shadow-[0_28px_80px_rgba(11,22,50,0.08)] md:p-11">
            <p className="eyebrow text-gold-700">{page.travel.cardEyebrow}</p>
            <p className="mt-24 text-[clamp(2.3rem,5vw,4.5rem)] font-medium leading-[1.08] tracking-[-0.04em] text-navy-900">
              {page.travel.cardTitle}
            </p>
            <p className="mt-8 border-t border-navy-900/10 pt-6 text-sm leading-7 text-ink-500">
              {page.travel.cardBody}
            </p>
          </div>
        </div>
      </section>

      <section id="travel-workflows" className="section-shell border-y border-navy-900/10 bg-white">
        <div className="container-luxe">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-gold-700">{page.workflows.eyebrow}</p>
              <h2 className="section-title mt-6 max-w-4xl">{page.workflows.title}</h2>
            </div>
            <Link href={`${localizedPath('/travel', locale)}#workflows`} className="btn-secondary">
              {page.workflows.cta}
            </Link>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-2 lg:grid-cols-3">
            {page.workflows.items.map(([title, description], index) => (
              <article key={title} className="min-h-64 bg-white p-7 md:p-9">
                <span className="font-mono text-[10px] text-gold-700">
                  WF-{String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-14 text-xl font-medium tracking-[-0.025em] text-navy-900">
                  {title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-ink-500">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.88fr_1.12fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">{page.technology.eyebrow}</p>
            <h2 className="section-title mt-6">{page.technology.title}</h2>
            <div className="body-lead mt-8 max-w-xl space-y-5">
              {page.technology.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link href={localizedPath('/technology', locale)} className="btn-primary mt-9">
              {page.technology.cta}
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {page.technology.capabilities.map((capability, index) => (
              <li
                key={capability}
                className="flex min-h-32 items-center gap-5 rounded-xl border border-navy-900/10 bg-white px-6"
              >
                <span className="font-mono text-[10px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-medium leading-7 text-navy-900">{capability}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-24">
          <div>
            <p className="eyebrow text-gold-300">{page.projects.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1.08] tracking-[-0.04em]">
              {page.projects.title}
            </h2>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/55">
              {page.projects.body}
            </p>
            <Link href={localizedPath('/cases', locale)} className="btn-light mt-9">
              {page.projects.cta}
            </Link>
          </div>
          <article className="rounded-[28px] border border-white/10 bg-white/[0.04] p-7 md:p-10">
            <p className="eyebrow text-gold-300">{page.projects.cardEyebrow}</p>
            <h3 className="mt-20 text-[clamp(2rem,4vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.035em]">
              {page.projects.cardTitle}
            </h3>
            <p className="mt-6 text-sm leading-7 text-white/55">{page.projects.cardBody}</p>
          </article>
        </div>
      </section>

      <section className="section-shell border-b border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow text-gold-700">{page.insights.eyebrow}</p>
            <h2 className="section-title mt-6">{page.insights.title}</h2>
          </div>
          <div>
            <p className="body-lead">{page.insights.body}</p>
            <Link href={localizedPath('/resources', locale)} className="btn-secondary mt-8">
              {page.insights.cta}
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">{page.company.aboutEyebrow}</p>
            <h2 className="section-title mt-6">{page.company.aboutTitle}</h2>
            <p className="body-lead mt-8 max-w-xl">{page.company.aboutBody}</p>
            <Link href={localizedPath('/about', locale)} className="btn-primary mt-9">
              {page.company.aboutCta}
            </Link>
          </div>
          <div className="border-t border-navy-900/10 pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
            <p className="eyebrow text-gold-700">{page.company.careersEyebrow}</p>
            <h2 className="section-title mt-6">{page.company.careersTitle}</h2>
            <p className="body-lead mt-8 max-w-xl">{page.company.careersBody}</p>
            <Link href={localizedPath('/careers', locale)} className="btn-secondary mt-9">
              {page.company.careersCta}
            </Link>
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </div>
  )
}
