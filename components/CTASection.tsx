import Link from 'next/link'
import { getContent, localizedPath, type Locale } from '@/content'
import { GOODTIME_URL } from '@/lib/config'

type CTASectionProps = { locale?: Locale; title?: string; body?: string; secondaryHref?: string; secondaryLabel?: string }

export default function CTASection({ locale = 'en', title, body, secondaryHref = '/travel', secondaryLabel }: CTASectionProps) {
  const copy = getContent(locale).common
  return (
    <section className="border-y border-navy-900 bg-gold-500 py-20 text-navy-950 md:py-28">
      <div className="container-luxe grid gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div>
          <p className="eyebrow">{copy.ctaEyebrow}</p>
          <h2 className="mt-6 max-w-5xl text-[clamp(3rem,8vw,7.8rem)] font-medium leading-[0.82] tracking-[-0.075em]">{title ?? copy.ctaTitle}</h2>
        </div>
        <div>
          <p className="max-w-xl text-base leading-8 text-navy-950/70">{body ?? copy.ctaBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">{copy.ctaPrimary}</a>
            <Link href={localizedPath(secondaryHref, locale)} className="btn-secondary">{secondaryLabel ?? copy.ctaSecondary}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
