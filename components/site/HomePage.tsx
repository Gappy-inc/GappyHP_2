import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/CTASection'
import ExecutionTrace from '@/components/ExecutionTrace'
import OperatingLoop from '@/components/OperatingLoop'
import StatusLabel from '@/components/StatusLabel'
import TrustStrip from '@/components/TrustStrip'
import VerificationPath from '@/components/VerificationPath'
import { getContent, localizedPath, type Locale } from '@/content'
import { GOODTIME_URL } from '@/lib/config'

export default function HomePage({ locale }: { locale: Locale }) {
  const copy = getContent(locale)
  const page = copy.home
  const heroTitle = locale === 'ja'
    ? <><span>AIが、</span><br /><span className="whitespace-nowrap">業務を実行する</span><br /><span>時代へ。</span></>
    : <><span>AI that gets</span><br /><span>business done.</span></>

  return (
    <div className="overflow-hidden bg-ivory-50 text-ink-900">
      <section className="border-b border-navy-900/15 pb-0 pt-28 md:pt-36">
        <div className="container-luxe">
          <p className="eyebrow text-signal-700">{page.hero.eyebrow}</p>
          <div className="mt-8 grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-16">
            <div className="pb-2">
              <h1 className={`hero-title ${locale === 'ja' ? 'hero-title--home max-w-[13em]' : 'max-w-[12ch]'}`}>{heroTitle}</h1>
              <p className="body-lead mt-8 max-w-xl">{page.hero.body}</p>
              <p className="mt-5 text-lg font-semibold text-navy-900">{page.hero.emphasis}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={localizedPath('/travel', locale)} className="btn-primary">{page.hero.primary}</Link>
                <a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary">{page.hero.secondary}</a>
              </div>
            </div>
            <ExecutionTrace locale={locale} />
          </div>
          <div className="mt-10">
            <TrustStrip items={page.trust} label={locale === 'ja' ? '設計上の前提' : 'Operating principles'} />
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container-luxe">
          <p className="eyebrow text-signal-700">{page.what.eyebrow}</p>
          <div className="mt-7 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <h2 className="section-title max-w-4xl">{page.what.title}</h2>
            <div className="grid gap-8">
              {page.what.items.map(([title, body], index) => (
                <article key={title} className="grid gap-3 border-t border-navy-900/20 pt-5 sm:grid-cols-[2.5rem_1fr]">
                  <span className="font-mono text-[12px] font-medium text-signal-700">0{index + 1}</span>
                  <div>
                    <h3 className="subsection-title text-navy-900">{title}</h3>
                    <p className="mt-3 text-base leading-7 text-ink-700">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-14">
            <OperatingLoop items={copy.operatingLoop} inverse={false} compact />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <div>
              <p className="eyebrow text-signal-700">{page.travel.eyebrow}</p>
              <h2 className="section-title mt-6">{page.travel.title}</h2>
            </div>
            <div className="body-lead space-y-5 self-end">
              {page.travel.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <div className="mt-12 grid gap-px bg-navy-900/15 sm:grid-cols-2 lg:grid-cols-4">
            {page.travel.workflows.map(([title, body]) => (
              <article key={title} className="min-h-48 bg-white p-6">
                <span className="block h-2 w-8 bg-signal-500" aria-hidden="true" />
                <h3 className="mt-8 text-lg font-semibold leading-7 text-navy-900">{title}</h3>
                <p className="mt-4 text-[15px] leading-7 text-ink-700">{body}</p>
              </article>
            ))}
          </div>
          <Link href={localizedPath('/travel', locale)} className="btn-secondary mt-8">{page.travel.cta}</Link>
        </div>
      </section>

      <section className="section-shell border-y border-navy-900/15 bg-white">
        <div className="container-luxe">
          <p className="eyebrow text-signal-700">{page.work.eyebrow}</p>
          <div className="mt-6 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="section-title max-w-3xl">{page.work.title}</h2>
            <Link href={localizedPath('/cases', locale)} className="btn-secondary">{page.work.cta}</Link>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {page.work.items.map((item) => (
              <article key={item.title} className="flex min-h-[310px] flex-col border border-navy-900/20 bg-ivory-50 p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="eyebrow text-ink-700">{item.subtitle}</p>
                  <StatusLabel>{item.status}</StatusLabel>
                </div>
                <h3 className="section-title mt-12 max-w-[18ch]">{item.title}</h3>
                <p className="mt-auto max-w-2xl pt-8 text-base leading-8 text-ink-700">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-950 text-white">
        <div className="container-luxe">
          <p className="eyebrow text-signal-300">{page.technology.eyebrow}</p>
          <div className="mt-7 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <h2 className="section-title max-w-4xl !text-white">{page.technology.title}</h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/75">{page.technology.body}</p>
              <Link href={localizedPath('/technology', locale)} className="btn-light mt-8">{page.technology.cta}</Link>
            </div>
            <VerificationPath locale={locale} />
          </div>
          <div className="mt-12 grid gap-px bg-white/20 sm:grid-cols-2 lg:grid-cols-4">
            {page.technology.items.map(([title, body]) => (
              <article key={title} className="min-h-48 bg-navy-950 p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-4 text-[14px] leading-7 text-white/70">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container-luxe grid gap-10 lg:grid-cols-[320px_1fr] lg:items-center lg:gap-20">
          <div className="relative aspect-[4/5] max-w-sm overflow-hidden bg-navy-900">
            <Image
              src="/mitsuki-asano.webp"
              alt={locale === 'ja' ? '株式会社Gappy 代表取締役 浅野充輝' : 'Mitsuki Asano, founder and representative director of Gappy'}
              fill
              sizes="(max-width: 1024px) 85vw, 320px"
              className="object-cover object-[50%_24%]"
            />
          </div>
          <div>
            <p className="eyebrow text-signal-700">{page.company.eyebrow}</p>
            <h2 className="section-title mt-6 max-w-4xl">{page.company.title}</h2>
            <p className="body-lead mt-7 max-w-2xl">{page.company.body}</p>
            <div className="mt-8 border-l-2 border-signal-500 pl-5">
              <p className="text-lg font-semibold text-navy-900">{page.company.name}</p>
              <p className="mt-1 text-sm leading-6 text-ink-700">{page.company.role}</p>
            </div>
            <Link href={localizedPath('/about', locale)} className="btn-primary mt-8">{page.company.cta}</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-navy-900/15 py-16 md:py-20">
        <div className="container-luxe grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end lg:gap-20">
          <div>
            <p className="eyebrow text-signal-700">{page.careers.eyebrow}</p>
            <h2 className="section-title mt-6">{page.careers.title}</h2>
          </div>
          <div>
            <p className="text-lg font-semibold leading-8 text-navy-900">{page.careers.status}</p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-ink-700">{page.careers.body}</p>
            <Link href={localizedPath('/careers', locale)} className="btn-secondary mt-7">{page.careers.cta}</Link>
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </div>
  )
}
