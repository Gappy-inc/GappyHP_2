import Image from 'next/image'
import type { Locale } from '@/content'
import { travelGlobalContent } from '@/content/travel-global'
import { BookDemoLink, FinalConversion, HeroConversion, TravelAcquisitionProvider, VideoWalkthrough } from '@/components/travel/TravelAcquisition'
import { TravelScenarioCards, TravelWorkStory } from '@/components/travel/TravelWorkStory'
import { TravelRoiCalculator } from '@/components/travel/TravelRoiCalculator'
import { loadTravelEventConfiguration, loadTravelLeadConfiguration } from '@/lib/travel-acquisition-server'

function Lines({ text }: { text: string }) {
  return <>{text.split('\n').map((line, index) => <span key={line}>{index ? <br /> : null}{line}</span>)}</>
}

function HeroProductOverlay({ locale }: { locale: Locale }) {
  const copy = travelGlobalContent[locale].hero
  return (
    <div className="travel-hero-product" aria-label={copy.productAria}>
      <div className="travel-hero-product__bar"><span>{copy.productBar[0]}</span><span className="travel-live-dot">{copy.productBar[1]}</span></div>
      <div className="travel-hero-product__body">
        <p className="travel-micro-label">{copy.productLabel}</p><h2>{copy.productTitle}</h2>
        {copy.tasks.map(([title, body, state], index) => (
          <div key={title} className={`travel-hero-task ${index === 0 ? 'is-done' : index === 1 ? 'is-live' : ''}`}>
            <span>0{index + 1}</span><div><strong>{title}</strong><small>{body}</small></div><b>{state}</b>
          </div>
        ))}
      </div>
      <div className="travel-hero-float travel-hero-float--top"><span className="travel-pulse" /><div><small>{copy.reply[0]}</small><strong>{copy.reply[1]}</strong></div></div>
      <div className="travel-hero-float travel-hero-float--bottom"><span>8</span><div><small>{copy.verified[0]}</small><strong>{copy.verified[1]}</strong></div></div>
    </div>
  )
}

function VideoSection({ locale }: { locale: Locale }) {
  const copy = travelGlobalContent[locale].video
  return (
    <section id="video-walkthrough" className="travel-video-section scroll-mt-24">
      <div className="container-luxe"><div className="travel-section-intro travel-section-intro--light"><div><p className="travel-kicker">{copy.kicker}</p><h2><Lines text={copy.title} /></h2></div><p>{copy.body}</p></div><div className="mt-10"><VideoWalkthrough /></div></div>
    </section>
  )
}

function PlatformStory({ locale }: { locale: Locale }) {
  const copy = travelGlobalContent[locale].platform
  return (
    <section id="platform" className="travel-platform-section scroll-mt-24">
      <div className="container-luxe">
        <div className="travel-platform-grid">
          <div className="travel-platform-copy"><p className="travel-kicker travel-kicker--dark">{copy.kicker}</p><h2><Lines text={copy.title} /></h2><p>{copy.body}</p><BookDemoLink entryLocation="final" className="travel-text-link">{copy.link} <span aria-hidden="true">↗</span></BookDemoLink></div>
          <div className="travel-platform-map" aria-label={copy.aria}>
            <div className="travel-platform-core"><span>G</span><strong>{copy.core[0]}</strong><small>{copy.core[1]}</small></div>
            {copy.path.map(([number, title, body], index) => <div key={number} className={`travel-platform-node travel-platform-node--${index + 1}`}><span>{number}</span><strong>{title}</strong><small>{body}</small></div>)}
            <span className="travel-platform-axis travel-platform-axis--x" aria-hidden="true" /><span className="travel-platform-axis travel-platform-axis--y" aria-hidden="true" />
          </div>
        </div>
        <div className="travel-control-grid">{copy.controls.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        <div className="travel-brand-panel">
          <div><p className="travel-kicker">{copy.maturity}</p><h3><Lines text={copy.brandTitle} /></h3><p>{copy.brandBody}</p><strong>{copy.configured}</strong></div>
          <div className="travel-brand-preview"><div className="travel-brand-preview__nav"><span>{copy.yourLogo}</span><small>{copy.booking}</small></div><div className="travel-brand-preview__content"><span className="travel-brand-preview__icon">✓</span><p>{copy.guideConfirmation}</p><h4>{copy.tomorrow}</h4><button type="button" disabled>{copy.confirmBooking}</button></div><div className="travel-brand-swatches">{copy.swatches.map((item, index) => <span key={item} className={`is-${index + 1}`}>{item}</span>)}</div></div>
        </div>
      </div>
    </section>
  )
}

function BusinessImpact({ locale }: { locale: Locale }) {
  const copy = travelGlobalContent[locale].roi
  return (
    <section id="business-impact" className="travel-roi-section scroll-mt-24">
      <div className="container-luxe travel-roi-grid">
        <div className="travel-roi-copy"><p className="travel-kicker">{copy.kicker}</p><h2><Lines text={copy.title} /></h2><p>{copy.body}</p><ul>{copy.measures.map((item) => <li key={item}>{item}</li>)}</ul><p className="travel-roi-evidence">{copy.evidence}</p></div>
        <TravelRoiCalculator locale={locale} copy={copy} />
      </div>
    </section>
  )
}

function PilotAndMeasurement({ locale }: { locale: Locale }) {
  const copy = travelGlobalContent[locale].pilot
  return (
    <section id="pilot" className="travel-pilot-section scroll-mt-24"><div className="container-luxe">
      <div className="travel-section-intro travel-section-intro--dark"><div><p className="travel-kicker travel-kicker--dark">{copy.kicker}</p><h2><Lines text={copy.title} /></h2></div><div><p>{copy.body}</p><BookDemoLink entryLocation="final" className="travel-pill-link">{copy.cta} <span aria-hidden="true">↗</span></BookDemoLink></div></div>
      <ol className="travel-stage-list">{copy.stages.map(([number, title, body]) => <li key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>
      <div className="travel-measurement-strip"><p>{copy.measurementLabel}</p><ul>{copy.metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul></div>
    </div></section>
  )
}

function FrequentlyAskedQuestions({ locale }: { locale: Locale }) {
  const copy = travelGlobalContent[locale].faq
  return (
    <section id="faq" className="travel-faq-section scroll-mt-24"><div className="container-luxe travel-faq-grid"><div><p className="travel-kicker travel-kicker--dark">{copy.kicker}</p><h2><Lines text={copy.title} /></h2></div><div className="travel-faq-list">{copy.items.map(([question, answer]) => <details key={question}><summary><span>{question}</span><span aria-hidden="true">＋</span></summary><p>{answer}</p></details>)}</div></div></section>
  )
}

export default function TravelGlobalPage({ locale }: { locale: Locale }) {
  const copy = travelGlobalContent[locale]
  const leadCaptureConfigured = loadTravelLeadConfiguration() !== null
  const analyticsConfigured = loadTravelEventConfiguration() !== null
  return (
    <TravelAcquisitionProvider locale={locale} leadCaptureConfigured={leadCaptureConfigured} analyticsConfigured={analyticsConfigured}>
      <div className="travel-studio" data-travel-locale={locale}>
        <section id="hero" className="travel-hero scroll-mt-24">
          <Image src="/travel-hero-operations.webp" alt={copy.hero.imageAlt} fill priority sizes="100vw" className="travel-hero__background" /><div className="travel-hero__wash" aria-hidden="true" />
          <div className="container-luxe travel-hero__grid"><div className="travel-hero__copy"><p className="travel-kicker">{copy.hero.eyebrow}</p><h1>{copy.hero.title[0]}<br /><em>{copy.hero.title[1]}</em></h1><p className="travel-hero__lead">{copy.hero.body}</p><HeroConversion /><a href="#work-demo" className="travel-hero__demo-link">{copy.hero.tertiary}</a></div><HeroProductOverlay locale={locale} /></div>
        </section>
        <TravelWorkStory locale={locale} between={<VideoSection locale={locale} />} />
        <PlatformStory locale={locale} />
        <section id="scenarios" className="travel-scenarios-section scroll-mt-24"><div className="container-luxe"><div className="travel-section-intro travel-section-intro--light"><div><p className="travel-kicker">{copy.scenarios.kicker}</p><h2><Lines text={copy.scenarios.title} /></h2></div><p>{copy.scenarios.body}</p></div><div className="mt-10"><TravelScenarioCards locale={locale} /></div></div></section>
        <BusinessImpact locale={locale} /><PilotAndMeasurement locale={locale} /><FrequentlyAskedQuestions locale={locale} />
        <section id="final-cta" className="travel-final-section scroll-mt-24"><div className="container-luxe"><FinalConversion /></div></section>
      </div>
    </TravelAcquisitionProvider>
  )
}
