import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import PageHero from '@/components/PageHero'
import { getContent, localizedPath, type Locale } from '@/content'

export default function InsightsPage({ locale }: { locale: Locale }) {
  const page = getContent(locale).insights
  const path = localizedPath('/resources', locale)

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="Insights" path={path} locale={locale} />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        body={<p>{page.hero.body}</p>}
      />

      <section className="section-shell">
        <div className="container-luxe">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 md:grid-cols-2 lg:grid-cols-3">
            {page.topics.map((topic, index) => (
              <article
                key={topic.title}
                className={`flex min-h-[340px] flex-col bg-white p-7 md:p-9 ${
                  index === page.topics.length - 1 ? 'lg:col-span-2' : ''
                }`}
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-gold-700">
                  {page.noteLabel} / {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-16 max-w-lg text-2xl font-medium leading-[1.3] tracking-[-0.025em] text-navy-900">
                  {topic.title}
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-ink-500">
                  {topic.body}
                </p>
                <ul
                  className="mt-auto flex flex-wrap gap-2 pt-8"
                  aria-label={page.topicsLabel}
                >
                  {topic.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-navy-900/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-ink-400"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-7 text-ink-400">
            {page.disclaimer}
          </p>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-300">{page.brief.eyebrow}</p>
            <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.5rem)] font-medium leading-[1.12] tracking-[-0.035em]">
              {page.brief.title}
            </h2>
          </div>
          <ol className="grid gap-3 sm:grid-cols-2">
            {page.brief.questions.map((question, index) => (
              <li
                key={question}
                className="flex min-h-24 items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5"
              >
                <span className="font-mono text-[9px] text-gold-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm leading-6 text-white/75">{question}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CTASection locale={locale} />
    </div>
  )
}
