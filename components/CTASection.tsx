import Link from 'next/link'
import { GOODTIME_URL } from '@/lib/config'

type CTASectionProps = {
  title?: string
  body?: string
  secondaryHref?: string
  secondaryLabel?: string
}

export default function CTASection({
  title = 'Bring us the operation.',
  body = 'If important work still moves manually across systems, teams, and repeated judgment, we want to understand it.',
  secondaryHref = '/travel',
  secondaryLabel = 'Explore Travel',
}: CTASectionProps) {
  return (
    <section className="bg-navy-950 py-20 text-white md:py-28">
      <div className="container-luxe grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
        <div>
          <p className="eyebrow text-gold-300">Work with Gappy</p>
          <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.055em]">
            {title}
          </h2>
        </div>
        <div>
          <p className="max-w-xl text-base leading-8 text-white/60">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={GOODTIME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light"
            >
              Talk to Gappy
            </a>
            <Link
              href={secondaryHref}
              className="inline-flex min-h-[46px] items-center justify-center rounded-md border border-white/25 px-6 py-3 text-xs font-semibold tracking-[0.1em] text-white transition-colors hover:border-gold-300 hover:text-gold-300"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
