import Link from 'next/link'
import CaseVisual, { type CaseVisualVariant } from '@/components/CaseVisual'
import CTASection from '@/components/CTASection'
import { CapabilityRows, SectionLabel } from '@/components/GappyAxis'
import OperatingLoop from '@/components/OperatingLoop'
import OperationalGraph from '@/components/OperationalGraph'
import VerificationPath from '@/components/VerificationPath'
import { getContent, localizedPath, type Locale } from '@/content'
import { GOODTIME_URL } from '@/lib/config'

export default function HomePage({ locale }: { locale: Locale }) {
  const copy = getContent(locale)
  const page = copy.home
  const heroTitle = locale === 'ja'
    ? <><span>AIが、</span><br /><span>業務を実行する<span className="md:hidden"><br /></span>時代へ。</span></>
    : <><span>AI that gets</span><br /><span>business done.</span></>
  const visualVariants: CaseVisualVariant[] = ['supplier', 'booking', 'reconciliation', 'fulfillment', 'schedule', 'communication']

  return (
    <div className="overflow-hidden bg-ivory-50 text-ink-900">
      <section className="relative min-h-[min(980px,100svh)] border-b border-navy-900/15 pb-14 pt-28 md:pt-36">
        <div className="container-luxe relative">
          <SectionLabel index="01">{page.hero.eyebrow}</SectionLabel>
          <h1 className={`hero-title relative z-10 mt-9 ${locale === 'ja' ? 'max-w-[14em]' : 'max-w-[14ch]'}`}>{heroTitle}</h1>
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="body-lead max-w-xl">{page.hero.body}</p>
              <p className="mt-5 text-lg font-medium text-navy-900">{page.hero.emphasis}</p>
              <div className="mt-8 flex flex-wrap gap-3"><Link href={localizedPath('/travel', locale)} className="btn-primary">{page.hero.primary}</Link><a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">{page.hero.secondary}</a></div>
            </div>
            <div className="relative h-[180px] overflow-hidden border-y border-navy-900/15 lg:h-[240px]">
              <div className="absolute left-1/2 top-0 h-full w-px bg-navy-900/25" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-navy-900/25" />
              <span className="axis-signal absolute left-[calc(50%_-_4px)] top-[8%] z-10 h-2 w-2 rounded-full bg-gold-500" aria-hidden="true" />
              <span className="absolute left-[calc(50%_-_22px)] top-[18%] h-0 w-0 border-b-[28px] border-l-[22px] border-r-[22px] border-b-gold-500 border-l-transparent border-r-transparent" aria-hidden="true" />
              <span className="absolute bottom-[18%] left-[calc(50%_-_22px)] h-0 w-0 border-l-[22px] border-r-[22px] border-t-[28px] border-l-transparent border-r-transparent border-t-navy-900" aria-hidden="true" />
              <p className="absolute bottom-3 right-0 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-400">{page.hero.label}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container-luxe">
          <SectionLabel index="02">{page.shift.eyebrow}</SectionLabel>
          <div className="mt-9 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
            <h2 className="section-title max-w-5xl">{page.shift.title}</h2>
            <div className="body-lead space-y-6 self-end">{page.shift.body.map((paragraph, index) => <p key={paragraph} className={index === 2 ? 'font-medium text-navy-900' : undefined}>{paragraph}</p>)}</div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-950 text-white">
        <div className="container-luxe">
          <SectionLabel index="03" inverse>{page.workforce.eyebrow}</SectionLabel>
          <div className="mt-9 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <h2 className="section-title max-w-5xl !text-white">{page.workforce.title}</h2>
            <p className="text-base leading-8 text-white/55">{page.workforce.body}</p>
          </div>
          <div className="mt-16"><OperatingLoop items={copy.operatingLoop} /></div>
          <Link href={localizedPath('/technology', locale)} className="mt-9 inline-flex min-h-11 items-center border-b border-gold-300 text-xs font-medium uppercase tracking-[0.1em] text-gold-300">{page.workforce.cta} ↗</Link>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-24">
          <div>
            <SectionLabel index="04" inverse>{page.travel.eyebrow}</SectionLabel>
            <h2 className="section-title mt-9 !text-white">{page.travel.title}</h2>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-8 text-white/55">{page.travel.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <Link href={localizedPath('/travel', locale)} className="btn-light mt-9">{page.travel.cta}</Link>
          </div>
          <OperationalGraph locale={locale} />
        </div>
      </section>

      <section id="travel-workflows" className="section-shell border-y border-navy-900/15 bg-white">
        <div className="container-luxe">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><SectionLabel index="05">{page.workflows.eyebrow}</SectionLabel><h2 className="section-title mt-8 max-w-5xl">{page.workflows.title}</h2></div><Link href={`${localizedPath('/travel', locale)}#workflows`} className="btn-secondary">{page.workflows.cta}</Link></div>
          <div className="mt-16 border-t border-navy-900/20">
            {page.workflows.items.map(([title, description], index) => (
              <article key={title} className="case-row view-react grid gap-8 border-b border-navy-900/20 py-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-16">
                <div className="grid gap-5 md:grid-cols-[4rem_1fr]">
                  <span className="font-mono text-[12px] text-gold-700">WF-{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="subsection-title text-navy-900">{title}</h3>
                    <p className="case-copy mt-4 max-w-2xl text-base leading-7 text-ink-500">{description}</p>
                  </div>
                </div>
                <CaseVisual variant={visualVariants[index]} locale={locale} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          <div>
            <SectionLabel index="06">{page.technology.eyebrow}</SectionLabel>
            <h2 className="section-title mt-10">{page.technology.title}</h2>
            <div className="body-lead mt-8 max-w-xl space-y-5">{page.technology.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <Link href={localizedPath('/technology', locale)} className="btn-primary mt-9">{page.technology.cta}</Link>
          </div>
          <div className="self-end space-y-8"><VerificationPath locale={locale} /><CapabilityRows items={page.technology.capabilities} /></div>
        </div>
      </section>

      <section className="section-shell bg-navy-950 text-white">
        <div className="container-luxe">
          <SectionLabel index="07" inverse>{page.projects.eyebrow}</SectionLabel>
          <div className="mt-10 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div><p className="font-mono text-[clamp(6rem,18vw,15rem)] leading-[0.72] tracking-[-0.1em] text-gold-300">01</p><p className="mt-8 eyebrow text-white/40">{page.projects.cardEyebrow}</p></div>
            <div><h2 className="section-title !text-white">{page.projects.title}</h2><h3 className="subsection-title mt-12 border-t border-white/20 pt-7 text-white">{page.projects.cardTitle}</h3><p className="mt-5 max-w-2xl text-base leading-8 text-white/60">{page.projects.cardBody}</p><Link href={localizedPath('/cases', locale)} className="btn-light mt-9">{page.projects.cta}</Link></div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container-luxe grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div><SectionLabel index="08">{page.insights.eyebrow}</SectionLabel><h2 className="section-title mt-8">{page.insights.title}</h2><p className="body-lead mt-8 max-w-xl">{page.insights.body}</p><Link href={localizedPath('/resources', locale)} className="btn-secondary mt-9">{page.insights.cta}</Link></div>
          <div className="border-t border-navy-900/20 pt-10 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0"><SectionLabel index="09">{page.company.aboutEyebrow}</SectionLabel><h2 className="section-title mt-8">{page.company.aboutTitle}</h2><p className="body-lead mt-8 max-w-xl">{page.company.aboutBody}</p><Link href={localizedPath('/about', locale)} className="btn-primary mt-9">{page.company.aboutCta}</Link></div>
        </div>
      </section>

      <section className="border-t border-navy-900/15 py-20 md:py-28">
        <div className="container-luxe grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end"><div><SectionLabel index="10">{page.company.careersEyebrow}</SectionLabel><h2 className="section-title mt-8 max-w-5xl">{page.company.careersTitle}</h2></div><div><p className="body-lead">{page.company.careersBody}</p><Link href={localizedPath('/careers', locale)} className="btn-secondary mt-9">{page.company.careersCta}</Link></div></div>
      </section>

      <CTASection locale={locale} />
    </div>
  )
}
