import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Compass, Flag, Layers3, Network, SearchCheck, Sparkles, Target, Workflow } from 'lucide-react'
import type { Locale } from '@/content'
import { careerMarketLabels, careerMarkets } from '@/content/careers'
import JobExplorer from './JobExplorer'
import styles from './Careers.module.css'

const valueIcons = [SearchCheck, Sparkles, Target, Network] as const
const responsibilityIcons = [Compass, Flag, Workflow, Layers3] as const

const copy = {
  en: {
    hero: {
      eyebrow: 'Gappy careers',
      title: 'Build the AI workforce for travel operations.',
      body: 'Join us to bring AI to the operational heart of travel. Work with customers across Asia, shape the product together, and build the next generation of travel infrastructure.',
      primary: 'Explore opportunities',
      secondary: 'Meet Gappy',
      imageAlt: 'Illustrative travel operations scene at an airport',
      disclosure: 'Illustrative travel operations imagery. No customer or workplace is depicted.',
    },
    why: {
      eyebrow: 'Why this work matters',
      title: 'Travel runs on a lot of confirmation work.',
      body: ['Behind every trip are changes, re-checks, supplier coordination, and operational decisions across many partners.', 'Gappy is building AI that helps travel teams move this work forward while keeping the latest conditions, unresolved items, evidence, and human judgment visible.'],
    },
    founder: {
      eyebrow: 'A note from the founder',
      title: 'AI to power the work behind travel.',
      body: ['Travel is built by many people and partners, and it still relies on a large amount of manual confirmation and coordination work.', 'At Gappy, we’re building an AI workforce that can support this work in a practical, trustworthy way—so travel teams can move faster without losing visibility or human control.', 'We want to build this from Asia with people who care about solving real operational problems and turning what we learn from customers into a global product.'],
      role: 'Founder & CEO, Gappy',
      imageAlt: 'Mitsuki Asano, Founder and CEO of Gappy',
    },
    timeline: [
      ['Feb 2024 – Feb 2025', 'SOUNDRAW Inc. — Global Digital Marketing'],
      ['2025', 'GetYourGuide Japan — Sales & Data Analysis'],
      ['2025', 'Founded Gappy Inc. as CEO'],
      ['2025', 'Director, All Japan Inbound Tourism Association'],
      ['May 2026', 'Winner, OpenAI Business Hackathon 2026 — “Workspace Agents” track'],
    ],
    vision: {
      eyebrow: 'Our vision',
      title: 'Build the AI operations layer for travel businesses in Asia.',
      body: ['Gappy is building an AI workforce that can execute, coordinate, and verify the operational work behind travel—from changes and confirmations to evidence and human review.', 'We’re starting in Asia, where travel businesses operate across fragmented suppliers, languages, systems, and markets. Our ambition is to become the trusted operations layer that connects this work and helps travel businesses scale with greater reliability.'],
      pillars: [
        ['Execute', 'Move defined operational work from request to the next action.'],
        ['Coordinate', 'Keep people, suppliers, and the latest conditions connected.'],
        ['Verify', 'Track evidence, unresolved items, and approval before work is treated as complete.'],
        ['Learn across markets', 'Turn what we learn from Asian travel businesses into reusable product infrastructure.'],
      ],
    },
    gtm: {
      eyebrow: 'The GTM role',
      title: 'Build the market. Shape the product.',
      body: 'Work with travel businesses to find the right use cases, prove value, and turn what we learn into a product customers keep using.',
      responsibilities: [
        ['Understand the work.', 'Talk to travel teams and identify recurring operational work they check, coordinate, and follow up on again and again.'],
        ['Run the first validation.', 'Define one workflow, align on the scope and success conditions, and run the first validation with the customer.'],
        ['Turn value into adoption.', 'Build pipeline, run demos, progress commercial discussions, and help customers move from evaluation to paid adoption.'],
        ['Feed it back to the product.', 'Bring real customer needs, workflow details, and objections back to product and engineering.'],
      ],
    },
    values: {
      eyebrow: 'Our values',
      title: 'How we work at Gappy.',
      body: 'Our values describe how we make decisions while the company and product are still taking shape.',
      items: [
        ['Start with real work.', 'Begin with actual customer operations, not abstract assumptions.'],
        ['Learn fast. Be precise.', 'Move quickly, test what matters, and be clear about what we know and what we still need to learn.'],
        ['Earn trust through evidence.', 'Show progress through customer outcomes and facts—not activity alone.'],
        ['Build across borders.', 'Learn from different markets, share what works, and build one product with a global perspective.'],
      ],
    },
    markets: {
      eyebrow: 'Where we’re hiring',
      title: 'Build Gappy across Asia.',
      body: 'We’re opening roles across key Asian markets as we learn from local travel businesses and expand Gappy across the region.',
      mapLabel: 'World map showing the markets where Gappy is hiring',
    },
    positions: {
      eyebrow: 'Open positions',
      title: 'Find your role at Gappy.',
      body: 'Ten initial roles across GTM and engineering in five Asian markets.',
    },
    engineering: {
      eyebrow: 'Engineering at Gappy',
      title: 'Build reliable AI for real operations.',
      body: ['Our engineers work directly with customers and real operational workflows to build AI that people can actually rely on.', 'We care about product quality, system reliability, evidence, recovery, and turning customer-specific learning into reusable infrastructure.'],
      cta: 'Explore engineering roles',
      signals: ['Evidence', 'Recovery', 'Reusable infrastructure'],
    },
    final: {
      eyebrow: 'Build with us',
      title: 'Let’s build the next chapter of travel together.',
      cta: 'Explore opportunities',
    },
  },
  ja: {
    hero: {
      eyebrow: 'Gappy 採用情報',
      title: '旅行業務を支えるAI Workforceを、一緒につくる。',
      body: '旅行オペレーションの中心にAIを届ける。アジアの顧客と向き合い、プロダクトを共につくり、次世代の旅行インフラを築く仲間を募集しています。',
      primary: '募集職種を見る',
      secondary: 'Gappyを知る',
      imageAlt: '空港で旅行オペレーションを確認するイメージ',
      disclosure: '旅行オペレーションのイメージ画像です。実在の顧客や職場ではありません。',
    },
    why: {
      eyebrow: 'この仕事が重要な理由',
      title: '旅行は、多くの確認業務で動いている。',
      body: ['一つの旅の裏側には、変更、再確認、サプライヤーとの調整、そして多くの関係者による業務判断があります。', 'Gappyは、最新条件、未解決事項、根拠、人の判断を見える状態に保ちながら、この仕事を前へ進めるAIをつくっています。'],
    },
    founder: {
      eyebrow: '代表からのメッセージ',
      title: '旅行の裏側を支える仕事に、AIの力を。',
      body: ['旅行は多くの人とパートナーによって成り立ち、今も大量の確認・調整業務に支えられています。', 'Gappyがつくるのは、この仕事を現実的かつ信頼できる形で支援するAI Workforceです。現場の可視性と人のコントロールを失わずに、旅行チームがより速く動ける状態を目指します。', '実際の業務課題に向き合い、顧客から学んだことを世界で使えるプロダクトへ変えていく仲間と、アジアから挑戦したいと考えています。'],
      role: '株式会社Gappy 代表取締役',
      imageAlt: '株式会社Gappy 代表取締役 浅野充輝',
    },
    timeline: [
      ['2024年2月 – 2025年2月', 'SOUNDRAW株式会社 — グローバルデジタルマーケティング'],
      ['2025年', 'GetYourGuide Japan — セールス・データ分析'],
      ['2025年', '株式会社Gappyを創業、代表取締役に就任'],
      ['2025年', '一般社団法人 日本インバウンド観光人材育成協会 理事'],
      ['2026年5月', 'OpenAI Business Hackathon 2026「Workspace Agents」部門 優勝'],
    ],
    vision: {
      eyebrow: 'ビジョン',
      title: 'アジアの旅行事業者を支えるAIオペレーション基盤をつくる。',
      body: ['Gappyは、変更や確認から根拠の収集、人の承認まで、旅行の裏側にある業務を実行・調整・検証できるAI Workforceをつくっています。', 'サプライヤー、言語、システム、市場が分断されやすいアジアから始め、この仕事をつなぎ、旅行事業者がより確実に成長できる信頼されたオペレーション基盤を目指します。'],
      pillars: [
        ['実行する', '定義された業務を、依頼から次のアクションへ進める。'],
        ['調整する', '人、サプライヤー、最新条件をつないだ状態に保つ。'],
        ['検証する', '完了とみなす前に、根拠、未解決事項、承認を確認する。'],
        ['市場を越えて学ぶ', 'アジアの旅行事業者から得た学びを、再利用できるプロダクト基盤へ変える。'],
      ],
    },
    gtm: {
      eyebrow: 'GTMの仕事',
      title: '市場をつくり、プロダクトを磨く。',
      body: '旅行事業者と共に解くべき業務を見つけ、価値を証明し、継続して使われるプロダクトへつなげます。',
      responsibilities: [
        ['業務を理解する。', '旅行チームと話し、繰り返し確認・調整・フォローしている業務を見つけます。'],
        ['最初の検証を動かす。', '一つの業務を定義し、対象範囲と成功条件を合わせ、顧客と最初の検証を実行します。'],
        ['価値を導入へつなげる。', '商談をつくり、デモを行い、評価から有償導入までのプロセスを前へ進めます。'],
        ['学びをプロダクトへ戻す。', '顧客のニーズ、業務の詳細、懸念点をプロダクト・エンジニアリングへ共有します。'],
      ],
    },
    values: {
      eyebrow: '私たちの価値観',
      title: 'Gappyの働き方。',
      body: '会社とプロダクトが形づくられていく途中だからこそ、判断の基準を大切にしています。',
      items: [
        ['現実の業務から始める。', '抽象的な想定ではなく、実際の顧客業務から考えます。'],
        ['速く学び、正確に伝える。', '重要なことを素早く試し、分かったことと、まだ分からないことを明確にします。'],
        ['根拠から信頼をつくる。', '活動量ではなく、顧客の成果と事実で進捗を示します。'],
        ['国境を越えてつくる。', '異なる市場から学び、機能する方法を共有し、世界で使える一つのプロダクトをつくります。'],
      ],
    },
    markets: {
      eyebrow: '採用対象地域',
      title: 'アジアから、世界へ。',
      body: '各市場の旅行事業者から学びながら、日本を含むアジア5市場で仲間を募集しています。',
      mapLabel: 'Gappyの採用対象地域を示す世界地図',
    },
    positions: {
      eyebrow: '募集職種',
      title: 'Gappyで、次の仕事を。',
      body: 'GTMとエンジニアリング、アジア5市場で計10ポジションを募集しています。職種詳細と応募フォームは英語です。',
    },
    engineering: {
      eyebrow: 'Gappyのエンジニアリング',
      title: '現実の業務で信頼されるAIをつくる。',
      body: ['Gappyのエンジニアは、顧客と実際の業務フローに直接向き合い、人が本当に頼れるAIをつくります。', 'プロダクト品質、システムの信頼性、根拠、復旧、顧客固有の学びを共通基盤へ変えることを重視しています。'],
      cta: 'エンジニア職を見る（英語）',
      signals: ['根拠', '復旧', '再利用できる基盤'],
    },
    final: {
      eyebrow: '一緒につくる',
      title: '旅行の次の章を、一緒につくりましょう。',
      cta: '募集職種を見る',
    },
  },
} as const

const marketPoints = [
  { market: 'Japan', cx: 601, cy: 126 },
  { market: 'South Korea', cx: 583, cy: 129 },
  { market: 'Taiwan', cx: 586, cy: 151 },
  { market: 'Thailand', cx: 555, cy: 192 },
  { market: 'Singapore', cx: 563, cy: 221 },
] as const

function CareersWorldMap({ locale, label }: { locale: Locale; label: string }) {
  const titleId = `careers-world-map-title-${locale}`
  return (
    <svg className={styles.worldMap} viewBox="0 0 720 360" role="img" aria-labelledby={titleId}>
      <title id={titleId}>{label}</title>
      <g className={styles.worldMapGrid} aria-hidden="true">
        <path d="M30 180H690M360 30V330" />
        <ellipse cx="360" cy="180" rx="323" ry="146" />
        <ellipse cx="360" cy="180" rx="323" ry="92" />
        <ellipse cx="360" cy="180" rx="160" ry="146" />
      </g>
      <g className={styles.worldMapLand} aria-hidden="true">
        <path d="M74 105l32-31 52-12 46 10 22 28-14 20-32 7-15 19-31 6-19 28-24-10-4-26-24-13z" />
        <path d="M207 176l29 11 21 34-2 39-18 45-21-20-9-36-16-28z" />
        <path d="M324 91l25-20 39 2 10 16-15 17-35 5z" />
        <path d="M352 122l34-16 42 17 14 33-12 60-35 52-30-20-13-48-29-33z" />
        <path d="M400 105l55-28 65 4 35 20 48 2 47 31-17 18-46-9-24 16-44-6-26 15-35-9-19-25z" />
        <path d="M528 166l24 4 21 26-11 19-24-16z" />
        <path d="M600 246l34-12 35 20-12 27-42 4-25-18z" />
        <path d="M225 47l27-17 30 8-10 23-33 4z" />
        <path d="M674 174l13-5 9 13-9 11-14-6z" />
      </g>
      <g aria-hidden="true">
        {marketPoints.map(({ market, cx, cy }) => (
          <g key={market}>
            <circle className={styles.worldMapRing} cx={cx} cy={cy} r="10" />
            <circle className={styles.worldMapPoint} cx={cx} cy={cy} r="5" />
          </g>
        ))}
      </g>
    </svg>
  )
}

export default function CareersLandingPage({ locale = 'en' }: { locale?: Locale }) {
  const page = copy[locale]
  const marketLabels = careerMarketLabels[locale]

  return (
    <div className={styles.page} data-locale={locale}>
      <section className={styles.hero} aria-labelledby="careers-title">
        <div className={styles.heroMedia}>
          <Image src="/use-cases/01-transfer-confirmations-1122.webp" alt={page.hero.imageAlt} fill priority sizes="100vw" />
        </div>
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{page.hero.eyebrow}</p>
          <h1 id="careers-title">{page.hero.title}</h1>
          <p>{page.hero.body}</p>
          <div className={styles.heroActions}>
            <a href="#open-positions" className={styles.primaryCta} data-career-event="career_apply_click" data-cta-location="hero">
              {page.hero.primary} <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a href="#founder" className={styles.secondaryCta}>
              {page.hero.secondary}
            </a>
          </div>
        </div>
        <p className={styles.imageDisclosure}>{page.hero.disclosure}</p>
      </section>

      <section className={styles.introSection} aria-labelledby="why-title">
        <div>
          <p className={styles.eyebrow}>{page.why.eyebrow}</p>
          <h2 id="why-title">{page.why.title}</h2>
        </div>
        <div className={styles.introBody}>
          {page.why.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className={styles.founder} id="founder" aria-labelledby="founder-title">
        <div className={styles.founderPortrait}>
          <Image src="/CEO.jpg" alt={page.founder.imageAlt} fill sizes="(max-width: 800px) 100vw, 36vw" />
        </div>
        <div className={styles.founderCopy}>
          <p className={styles.eyebrow}>{page.founder.eyebrow}</p>
          <h2 id="founder-title">{page.founder.title}</h2>
          {page.founder.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className={styles.signature}>
            <strong>Mitsuki Asano</strong>
            <span>{page.founder.role}</span>
          </p>
        </div>
        <ol className={styles.timeline}>
          {page.timeline.map(([date, detail]) => (
            <li key={`${date}-${detail}`}>
              <time>{date}</time>
              <span>{detail}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.vision} aria-labelledby="vision-title">
        <div className={styles.visionHeader}>
          <p className={styles.eyebrow}>{page.vision.eyebrow}</p>
          <h2 id="vision-title">{page.vision.title}</h2>
          {page.vision.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className={styles.pillars}>
          {page.vision.pillars.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.gtm} aria-labelledby="gtm-title">
        <div className={styles.sectionLead}>
          <p className={styles.eyebrow}>{page.gtm.eyebrow}</p>
          <h2 id="gtm-title">{page.gtm.title}</h2>
          <p>{page.gtm.body}</p>
        </div>
        <div className={styles.responsibilities}>
          {page.gtm.responsibilities.map(([title, body], index) => {
            const Icon = responsibilityIcons[index]
            return (
              <article key={title}>
                <span>
                  <Icon aria-hidden="true" size={22} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className={styles.values} aria-labelledby="values-title">
        <div className={styles.sectionTitleRow}>
          <div>
            <p className={styles.eyebrow}>{page.values.eyebrow}</p>
            <h2 id="values-title">{page.values.title}</h2>
          </div>
          <p>{page.values.body}</p>
        </div>
        <div className={styles.valueGrid}>
          {page.values.items.map(([title, body], index) => {
            const Icon = valueIcons[index]
            return (
              <article key={title} data-tone={index}>
                <Icon aria-hidden="true" size={25} />
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className={styles.markets} aria-labelledby="markets-title">
        <div className={styles.sectionLead}>
          <p className={styles.eyebrow}>{page.markets.eyebrow}</p>
          <h2 id="markets-title">{page.markets.title}</h2>
          <p>{page.markets.body}</p>
        </div>
        <div className={styles.marketMap}>
          <CareersWorldMap locale={locale} label={page.markets.mapLabel} />
          <ol aria-label={page.markets.eyebrow}>
            {careerMarkets.map((market, index) => (
              <li key={market}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {marketLabels[market]}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.openPositions} id="open-positions" aria-labelledby="positions-title">
        <div className={styles.sectionTitleRow}>
          <div>
            <p className={styles.eyebrow}>{page.positions.eyebrow}</p>
            <h2 id="positions-title">{page.positions.title}</h2>
          </div>
          <p>{page.positions.body}</p>
        </div>
        <JobExplorer locale={locale} />
      </section>

      <section className={styles.engineering} aria-labelledby="engineering-title">
        <div>
          <p className={styles.eyebrow}>{page.engineering.eyebrow}</p>
          <h2 id="engineering-title">{page.engineering.title}</h2>
        </div>
        <div>
          {page.engineering.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <Link href={locale === 'ja' ? '/careers/development-engineer-japan' : '/careers/development-engineer-singapore'} hrefLang="en" className={styles.darkCta}>
            {page.engineering.cta} <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
        <div className={styles.systemStrip}>
          <span>
            <CheckCircle2 aria-hidden="true" />
            {page.engineering.signals[0]}
          </span>
          <span>
            <Layers3 aria-hidden="true" />
            {page.engineering.signals[1]}
          </span>
          <span>
            <Network aria-hidden="true" />
            {page.engineering.signals[2]}
          </span>
        </div>
      </section>

      <section className={styles.finalCta}>
        <p className={styles.eyebrow}>{page.final.eyebrow}</p>
        <h2>{page.final.title}</h2>
        <a href="#open-positions" className={styles.primaryCta} data-career-event="career_apply_click" data-cta-location="final">
          {page.final.cta} <ArrowRight aria-hidden="true" size={18} />
        </a>
      </section>
    </div>
  )
}
