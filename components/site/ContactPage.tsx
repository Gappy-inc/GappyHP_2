import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'
import { CONTACT_EMAIL, GOODTIME_URL } from '@/lib/config'

export default function ContactPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).contact
  const path = localizedPath('/contact', locale)
  const links = [
    GOODTIME_URL,
    `mailto:${CONTACT_EMAIL}?subject=Strategic%20inquiry`,
    `mailto:${CONTACT_EMAIL}?subject=Careers%20inquiry`,
    `mailto:${CONTACT_EMAIL}?subject=Media%20or%20industry%20inquiry`,
  ]

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Contact" path={path} locale={locale} />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        body={<p>{page.hero.body}</p>}
      />

      <section className="section-shell">
        <div className="container-luxe grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-2">
          {page.paths.map(([title, body, label], index) => {
            const href = links[index]
            const isSchedulingLink = href === GOODTIME_URL

            return (
              <article key={title} className="flex min-h-72 flex-col bg-white p-7 md:p-10">
                <span className="font-mono text-[10px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-14 text-2xl font-medium leading-[1.3] tracking-[-0.025em] text-navy-900">
                  {title}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-ink-500">{body}</p>
                <a
                  href={href}
                  target={isSchedulingLink ? '_blank' : undefined}
                  rel={isSchedulingLink ? 'noopener noreferrer' : undefined}
                  className="mt-auto inline-flex min-h-11 items-center pt-8 text-sm font-medium text-navy-900 underline decoration-gold-500 underline-offset-8"
                >
                  {label}
                </a>
              </article>
            )
          })}
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow text-gold-300">{page.conversation.eyebrow}</p>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.5rem,5.5vw,4.8rem)] font-medium leading-[1.12] tracking-[-0.035em]">
              {page.conversation.title}
            </h2>
          </div>
          <div>
            <p className="text-base leading-8 text-white/55">{page.conversation.body}</p>
            <a
              href={GOODTIME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-light mt-8"
            >
              {page.conversation.cta}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
