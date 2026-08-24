import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import OperatingLoop from '@/components/OperatingLoop'
import PageHero from '@/components/PageHero'
import VerificationPath from '@/components/VerificationPath'
import { getContent, localizedPath, type Locale } from '@/content'

export default function TechnologyPage({ locale }: { locale: Locale }) {
  const copy = getContent(locale)
  const page = copy.technology
  const path = localizedPath('/technology', locale)

  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd
        name={page.hero.eyebrow}
        path={path}
        locale={locale}
      />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        body={
          <>
            <p>{page.hero.body[0]}</p>
            <p className="mt-4 text-navy-900">{page.hero.body[1]}</p>
          </>
        }
      />

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe">
          <p className="eyebrow text-gold-300">{page.loop.eyebrow}</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.68fr] lg:items-end">
            <h2 className="section-title max-w-4xl !text-white">
              {page.loop.title}
            </h2>
            <p className="text-base leading-8 text-white/55">{page.loop.body}</p>
          </div>
          <div className="mt-14">
            <OperatingLoop items={copy.operatingLoop} />
          </div>
          <div className="mt-10 max-w-4xl">
            <VerificationPath locale={locale} />
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe space-y-6">
          {page.layers.map((layer, index) => (
            <article
              key={layer.title}
              className={`grid gap-8 border-t border-navy-900/20 px-0 py-10 md:py-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 ${
                index % 2 ? 'bg-ivory-100' : 'bg-white'
              }`}
            >
              <div>
                <p className="font-mono text-[12px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <p className="eyebrow mt-8 text-gold-700">{layer.eyebrow}</p>
                <h2 className="section-title mt-5">
                  {layer.title}
                </h2>
              </div>
              <div className="self-end">
                <p className="body-lead max-w-2xl">{layer.body}</p>
                {layer.statement ? (
                  <p className="subsection-title mt-8 text-navy-900">
                    {layer.statement}
                  </p>
                ) : null}
                <ul className="mt-8 border-t border-navy-900/20 sm:grid sm:grid-cols-3">
                  {layer.detail.map((item) => (
                    <li
                      key={item}
                      className="flex min-h-16 items-center border-b border-navy-900/20 bg-transparent px-4 text-[13px] font-medium leading-6 text-navy-900 sm:border-r"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell border-t border-navy-900/10 bg-white">
        <div className="container-luxe">
          <p className="eyebrow text-gold-700">{page.principles.eyebrow}</p>
          <h2 className="section-title mt-6 max-w-4xl">{page.principles.title}</h2>
          <div className="mt-14 grid border-l border-t border-navy-900/20 sm:grid-cols-2 lg:grid-cols-5">
            {page.principles.items.map(([title, body], index) => (
              <article key={title} className="min-h-64 border-b border-r border-navy-900/20 bg-white p-6">
                <span className="font-mono text-[12px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="subsection-title mt-12 text-navy-900">
                  {title}
                </h3>
                <p className="mt-4 text-[15px] leading-7 text-ink-500">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} body={page.cta.body} />
    </div>
  )
}
