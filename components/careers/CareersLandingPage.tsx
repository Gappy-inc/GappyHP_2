import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Boxes, CheckCircle2, Compass, Flag, Layers3, Network, SearchCheck, Sparkles, Target, Workflow } from 'lucide-react'
import { careerMarkets } from '@/content/careers'
import JobExplorer from './JobExplorer'
import styles from './Careers.module.css'

const timeline = [
  ['Feb 2024 – Feb 2025', 'SOUNDRAW Inc. — Global Digital Marketing'],
  ['2025', 'GetYourGuide Japan — Sales & Data Analysis'],
  ['2025', 'Founded Gappy Inc. as CEO'],
  ['2025', 'Director, All Japan Inbound Tourism Association'],
  ['May 2026', 'Winner, OpenAI Business Hackathon 2026 — “Workspace Agents” track'],
] as const

const values = [
  [SearchCheck, 'Start with real work.', 'Begin with actual customer operations, not abstract assumptions.'],
  [Sparkles, 'Learn fast. Be precise.', 'Move quickly, test what matters, and be clear about what we know and what we still need to learn.'],
  [Target, 'Earn trust through evidence.', 'Show progress through customer outcomes and facts—not activity alone.'],
  [Network, 'Build across borders.', 'Learn from different markets, share what works, and build one product with a global perspective.'],
] as const

const responsibilities = [
  [Compass, 'Understand the work.', 'Talk to travel teams and identify recurring operational work they check, coordinate, and follow up on again and again.'],
  [Flag, 'Run the first validation.', 'Define one workflow, align on the scope and success conditions, and run the first validation with the customer.'],
  [Workflow, 'Turn value into adoption.', 'Build pipeline, run demos, progress commercial discussions, and help customers move from evaluation to paid adoption.'],
  [Layers3, 'Feed it back to the product.', 'Bring real customer needs, workflow details, and objections back to product and engineering.'],
] as const

export default function CareersLandingPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="careers-title">
        <div className={styles.heroMedia}><Image src="/use-cases/01-transfer-confirmations-1122.webp" alt="Illustrative travel operations scene at an airport" fill priority sizes="100vw" /></div>
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Gappy careers</p>
          <h1 id="careers-title">Build the AI workforce for travel operations.</h1>
          <p>Join us to bring AI to the operational heart of travel. Work with customers across Asia, shape the product together, and build the next generation of travel infrastructure.</p>
          <div className={styles.heroActions}><a href="#open-positions" className={styles.primaryCta} data-career-event="career_apply_click" data-cta-location="hero">Explore opportunities <ArrowRight aria-hidden="true" size={18} /></a><a href="#founder" className={styles.secondaryCta}>Meet Gappy</a></div>
        </div>
        <p className={styles.imageDisclosure}>Illustrative travel operations imagery. No customer or workplace is depicted.</p>
      </section>

      <section className={styles.introSection} aria-labelledby="why-title">
        <div><p className={styles.eyebrow}>Why this work matters</p><h2 id="why-title">Travel runs on a lot of confirmation work.</h2></div>
        <div className={styles.introBody}><p>Behind every trip are changes, re-checks, supplier coordination, and operational decisions across many partners.</p><p>Gappy is building AI that helps travel teams move this work forward while keeping the latest conditions, unresolved items, evidence, and human judgment visible.</p></div>
      </section>

      <section className={styles.founder} id="founder" aria-labelledby="founder-title">
        <div className={styles.founderPortrait}><Image src="/CEO.jpg" alt="Mitsuki Asano, Founder and CEO of Gappy" fill sizes="(max-width: 800px) 100vw, 36vw" /></div>
        <div className={styles.founderCopy}><p className={styles.eyebrow}>A note from the founder</p><h2 id="founder-title">AI to power the work behind travel.</h2><p>Travel is built by many people and partners, and it still relies on a large amount of manual confirmation and coordination work.</p><p>At Gappy, we’re building an AI workforce that can support this work in a practical, trustworthy way—so travel teams can move faster without losing visibility or human control.</p><p>We want to build this from Asia with people who care about solving real operational problems and turning what we learn from customers into a global product.</p><p className={styles.signature}><strong>Mitsuki Asano</strong><span>Founder &amp; CEO, Gappy</span></p></div>
        <ol className={styles.timeline}>{timeline.map(([date, detail]) => <li key={`${date}-${detail}`}><time>{date}</time><span>{detail}</span></li>)}</ol>
      </section>

      <section className={styles.vision} aria-labelledby="vision-title">
        <div className={styles.visionHeader}><p className={styles.eyebrow}>Our vision</p><h2 id="vision-title">Build the AI operations layer for travel businesses in Asia.</h2><p>Gappy is building an AI workforce that can execute, coordinate, and verify the operational work behind travel—from changes and confirmations to evidence and human review.</p><p>We’re starting in Asia, where travel businesses operate across fragmented suppliers, languages, systems, and markets. Our ambition is to become the trusted operations layer that connects this work and helps travel businesses scale with greater reliability.</p></div>
        <div className={styles.pillars}>{[
          ['01', 'Execute', 'Move defined operational work from request to the next action.'],
          ['02', 'Coordinate', 'Keep people, suppliers, and the latest conditions connected.'],
          ['03', 'Verify', 'Track evidence, unresolved items, and approval before work is treated as complete.'],
          ['04', 'Learn across markets', 'Turn what we learn from Asian travel businesses into reusable product infrastructure.'],
        ].map(([index, title, body]) => <article key={title}><span>{index}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>

      <section className={styles.gtm} aria-labelledby="gtm-title">
        <div className={styles.sectionLead}><p className={styles.eyebrow}>The GTM role</p><h2 id="gtm-title">Build the market. Shape the product.</h2><p>Work with travel businesses to find the right use cases, prove value, and turn what we learn into a product customers keep using.</p></div>
        <div className={styles.responsibilities}>{responsibilities.map(([Icon, title, body]) => <article key={title}><span><Icon aria-hidden="true" size={22} /></span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
      </section>

      <section className={styles.values} aria-labelledby="values-title"><div className={styles.sectionTitleRow}><div><p className={styles.eyebrow}>Our values</p><h2 id="values-title">How we work at Gappy.</h2></div><p>Our values describe how we make decisions while the company and product are still taking shape.</p></div><div className={styles.valueGrid}>{values.map(([Icon, title, body], index) => <article key={title} data-tone={index}><Icon aria-hidden="true" size={25} /><h3>{title}</h3><p>{body}</p></article>)}</div></section>

      <section className={styles.markets} aria-labelledby="markets-title"><div className={styles.sectionLead}><p className={styles.eyebrow}>Where we’re hiring</p><h2 id="markets-title">Build Gappy across Asia.</h2><p>We’re opening roles across key Asian markets as we learn from local travel businesses and expand Gappy across the region.</p></div><div className={styles.marketMap} aria-label="Hiring markets"><div className={styles.mapMark}><Boxes aria-hidden="true" size={36} /><span>Asia</span></div><ul>{careerMarkets.map((market, index) => <li key={market}><span>{String(index + 1).padStart(2, '0')}</span>{market}</li>)}</ul></div></section>

      <section className={styles.openPositions} id="open-positions" aria-labelledby="positions-title"><div className={styles.sectionTitleRow}><div><p className={styles.eyebrow}>Open positions</p><h2 id="positions-title">Find your role at Gappy.</h2></div><p>Ten initial roles across GTM and engineering in five Asian markets.</p></div><JobExplorer /></section>

      <section className={styles.engineering} aria-labelledby="engineering-title"><div><p className={styles.eyebrow}>Engineering at Gappy</p><h2 id="engineering-title">Build reliable AI for real operations.</h2></div><div><p>Our engineers work directly with customers and real operational workflows to build AI that people can actually rely on.</p><p>We care about product quality, system reliability, evidence, recovery, and turning customer-specific learning into reusable infrastructure.</p><Link href="/careers/development-engineer-singapore" className={styles.darkCta}>Explore engineering roles <ArrowRight aria-hidden="true" size={18} /></Link></div><div className={styles.systemStrip}><span><CheckCircle2 aria-hidden="true" />Evidence</span><span><Layers3 aria-hidden="true" />Recovery</span><span><Network aria-hidden="true" />Reusable infrastructure</span></div></section>

      <section className={styles.finalCta}><p className={styles.eyebrow}>Build with us</p><h2>Let’s build the next chapter of travel together.</h2><a href="#open-positions" className={styles.primaryCta} data-career-event="career_apply_click" data-cta-location="final">Explore opportunities <ArrowRight aria-hidden="true" size={18} /></a></section>
    </div>
  )
}
