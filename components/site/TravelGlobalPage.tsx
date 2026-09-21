import Image from 'next/image'
import {
  BookDemoLink,
  FinalConversion,
  HeroConversion,
  TravelAcquisitionProvider,
  VideoWalkthrough,
} from '@/components/travel/TravelAcquisition'
import {
  TravelScenarioCards,
  TravelWorkStory,
} from '@/components/travel/TravelWorkStory'
import { globalTravelContent as copy } from '@/content/travel-global'

function HeroProductOverlay() {
  return (
    <div className="travel-hero-product" aria-label="Sample confirmation workflow status">
      <div className="travel-hero-product__bar">
        <span>LIVE WORK / 07:42 JST</span>
        <span className="travel-live-dot">RUNNING</span>
      </div>
      <div className="travel-hero-product__body">
        <p className="travel-micro-label">Tomorrow&apos;s departures</p>
        <h2>Guide confirmation</h2>
        <div className="travel-hero-task is-done">
          <span>01</span>
          <div><strong>Booking context loaded</strong><small>12 departures · sample data</small></div>
          <b>DONE</b>
        </div>
        <div className="travel-hero-task is-live">
          <span>02</span>
          <div><strong>Follow up on missing replies</strong><small>Operator approval retained</small></div>
          <b>ACTIVE</b>
        </div>
        <div className="travel-hero-task">
          <span>03</span>
          <div><strong>Verify current booking</strong><small>Close only with current evidence</small></div>
          <b>NEXT</b>
        </div>
      </div>
      <div className="travel-hero-float travel-hero-float--top">
        <span className="travel-pulse" />
        <div><small>Guide reply received</small><strong>Awaiting verification</strong></div>
      </div>
      <div className="travel-hero-float travel-hero-float--bottom">
        <span>8</span>
        <div><small>VERIFIED</small><strong>of 12 sample bookings</strong></div>
      </div>
    </div>
  )
}

function VideoSection() {
  return (
    <section id="video-walkthrough" className="travel-video-section scroll-mt-24">
      <div className="container-luxe">
        <div className="travel-section-intro travel-section-intro--light">
          <div>
            <p className="travel-kicker">02 / Product walkthrough</p>
            <h2>Watch the whole loop.<br />Not just the action.</h2>
          </div>
          <p>The short film follows one sample booking from instruction and approval through a guide response and current-booking verification.</p>
        </div>
        <div className="mt-10"><VideoWalkthrough /></div>
      </div>
    </section>
  )
}

function PlatformStory() {
  const path = [
    ['01', 'Booking context', 'Your existing source'],
    ['02', 'Workflow', 'Bounded operating rule'],
    ['03', 'External view', 'Guide or supplier'],
    ['04', 'Verification', 'Current evidence'],
  ]

  return (
    <section className="travel-platform-section">
      <div className="container-luxe">
        <div className="travel-platform-grid">
          <div className="travel-platform-copy">
            <p className="travel-kicker travel-kicker--dark">04 / The operating layer</p>
            <h2>Keep your systems.<br />Add completion.</h2>
            <p>Gappy works around the operation already in place. Pilot scope, connection method, decision boundaries, and evidence requirements are agreed with each operator.</p>
            <BookDemoLink entryLocation="final" className="travel-text-link">Map one workflow <span aria-hidden="true">↗</span></BookDemoLink>
          </div>

          <div className="travel-platform-map" aria-label="Platform operating flow">
            <div className="travel-platform-core">
              <span>G</span>
              <strong>AI Workforce</strong>
              <small>ONE RUNTIME</small>
            </div>
            {path.map(([number, title, body], index) => (
              <div key={title} className={`travel-platform-node travel-platform-node--${index + 1}`}>
                <span>{number}</span><strong>{title}</strong><small>{body}</small>
              </div>
            ))}
            <span className="travel-platform-axis travel-platform-axis--x" aria-hidden="true" />
            <span className="travel-platform-axis travel-platform-axis--y" aria-hidden="true" />
          </div>
        </div>

        <div className="travel-control-grid">
          {[
            ['Approval boundaries', 'Humans approve external action until the pilot evidence supports a narrower delegated boundary.'],
            ['Fail-closed verification', 'Unknown, stale, conflicting, or missing evidence stays open or moves to a person.'],
            ['Current-booking check', 'A reply is compared with the latest booking snapshot before confirmation is marked complete.'],
          ].map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span><h3>{title}</h3><p>{body}</p>
            </article>
          ))}
        </div>

        <div className="travel-brand-panel">
          <div>
            <p className="travel-kicker">Partial / pilot-ready foundation</p>
            <h3>Your operation.<br />Your brand.</h3>
            <p>Gappy can be configured around each operator&apos;s brand, workflow rules, and operating context while the underlying AI Workforce runtime stays consistent.</p>
            <strong>Configured with your team during pilot.</strong>
          </div>
          <div className="travel-brand-preview">
            <div className="travel-brand-preview__nav"><span>YOUR LOGO</span><small>BOOKING #2871</small></div>
            <div className="travel-brand-preview__content">
              <span className="travel-brand-preview__icon">✓</span>
              <p>Guide confirmation</p>
              <h4>Tomorrow · 09:00</h4>
              <button type="button" disabled>Confirm booking</button>
            </div>
            <div className="travel-brand-swatches">
              {copy.whiteLabel.slice(0, 4).map((item, index) => <span key={item} className={`is-${index + 1}`}>{item}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PilotAndMeasurement() {
  return (
    <section className="travel-pilot-section">
      <div className="container-luxe">
        <div className="travel-section-intro travel-section-intro--dark">
          <div><p className="travel-kicker travel-kicker--dark">06 / Start bounded</p><h2>One workflow.<br />Evidence before expansion.</h2></div>
          <div><p>A workflow review can lead to offline evaluation, Shadow Mode, and human-approved execution. Scope and timing are discussed on the demo call.</p><BookDemoLink entryLocation="final" className="travel-pill-link">Book a demo <span aria-hidden="true">↗</span></BookDemoLink></div>
        </div>
        <ol className="travel-stage-list">
          {copy.pilotStages.slice(0, 4).map(([number, title, body]) => (
            <li key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></li>
          ))}
        </ol>
        <div className="travel-measurement-strip">
          <p>MEASURES TO DEFINE TOGETHER · NO BENCHMARK IMPLIED</p>
          <ul>{copy.metrics.slice(0, 6).map((metric) => <li key={metric}>{metric}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}

function FrequentlyAskedQuestions() {
  const questions = [
    ['Does Gappy replace our booking system?', 'No. The pilot is designed around the existing source of booking context. Connection method and access are agreed per operator.'],
    ['Who receives confirmation requests?', 'The first workflow is scoped to assigned guides or suppliers. The operator decides the approved recipient and communication boundary during pilot setup.'],
    ['Can a reply close the job automatically?', 'Not by itself. The current booking details and available evidence must be checked first. Unknown or conflicting state stays open or moves to a person.'],
    ['How much control does our team keep?', 'Start in offline or Shadow Mode, then use human approval. Responsibility expands only where the agreed operating evidence supports it.'],
    ['Can the external page use our brand?', 'A partial multi-tenant and white-label foundation exists. Supported brand and workflow configuration is completed with your team during pilot; it is not self-serve SaaS onboarding.'],
    ['How do we watch the full demo?', 'When a private lead destination is configured, a saved email request unlocks the in-page video. Book a demo remains available without registration.'],
  ]

  return (
    <section className="travel-faq-section">
      <div className="container-luxe travel-faq-grid">
        <div><p className="travel-kicker travel-kicker--dark">07 / Before we start</p><h2>Good questions.<br />Straight answers.</h2></div>
        <div className="travel-faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary><span>{question}</span><span aria-hidden="true">＋</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function TravelGlobalPage() {
  return (
    <TravelAcquisitionProvider>
      <div className="travel-studio">
        <section className="travel-hero">
          <Image
            src="/travel-demo-poster.svg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="travel-hero__background"
          />
          <div className="travel-hero__wash" aria-hidden="true" />
          <div className="container-luxe travel-hero__grid">
            <div className="travel-hero__copy">
              <p className="travel-kicker">AI workforce / Travel operations</p>
              <h1>Guide confirmations.<br /><em>Followed through.</em></h1>
              <p className="travel-hero__lead">Gappy coordinates guide and supplier confirmations, follows up on missing replies, and checks the latest booking before work is called complete.</p>
              <HeroConversion />
            </div>
            <HeroProductOverlay />
          </div>
          <a href="#work-demo" className="travel-hero__scroll">SCROLL TO LIVE WORK <span aria-hidden="true">↓</span></a>
        </section>

        <TravelWorkStory between={<VideoSection />} />
        <PlatformStory />

        <section className="travel-scenarios-section">
          <div className="container-luxe">
            <div className="travel-section-intro travel-section-intro--light">
              <div><p className="travel-kicker">05 / Workflow states</p><h2>Built for the moments<br />that do not go to plan.</h2></div>
              <p>Three views of the same fictional booking. These are interactive workflow examples, not customer stories or deployed-results claims.</p>
            </div>
            <div className="mt-10"><TravelScenarioCards /></div>
          </div>
        </section>

        <PilotAndMeasurement />
        <FrequentlyAskedQuestions />

        <section className="travel-final-section">
          <div className="container-luxe"><FinalConversion /></div>
        </section>
      </div>
    </TravelAcquisitionProvider>
  )
}
