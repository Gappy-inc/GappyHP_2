import Link from 'next/link'
import { getContent, localizedPath, type Locale } from '@/content'
import { GOODTIME_URL } from '@/lib/config'

type CTASectionProps = {
  locale?: Locale
  title?: string
  body?: string
  secondaryHref?: string
  secondaryLabel?: string
}

export default function CTASection({
  locale = 'en',
  title,
  body,
  secondaryHref = '/travel',
  secondaryLabel,
}: CTASectionProps) {
  const copy = getContent(locale).common

  return (
    <section className="bg-navy-950 py-20 text-white md:py-28">
      <div className="container-luxe grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div>
          <p className="eyebrow text-gold-300">{copy.ctaEyebrow}</p>
          <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.055em]">
            {title ?? copy.ctaTitle}
          </h2>
        </div>
        <div>
          <p className="max-w-xl text-base leading-8 text-white/60">
            {body ?? copy.ctaBody}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={GOODTIME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light"
            >
              {copy.ctaPrimary}
            </a>
            <Link
              href={localizedPath(secondaryHref, locale)}
              className="inline-flex min-h-[46px] items-center justify-center rounded-md border border-white/25 px-6 py-3 text-xs font-semibold tracking-[0.1em] text-white transition-colors hover:border-gold-300 hover:text-gold-300"
            >
              {secondaryLabel ?? copy.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
