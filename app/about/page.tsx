import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_URL } from '@/lib/config'

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video'

export const metadata: Metadata = {
  title: 'About Gappy | AI Workforce for Travel Operations',
  description:
    'Gappy is building AI Workforce for travel operations, helping travel companies execute operational workflows across the systems they already use.',
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: 'About Gappy | AI Workforce for Travel Operations',
    description: 'Meet Gappy and the thesis behind AI Workforce for travel operations.',
    url: `${SITE_URL}/about`,
    type: 'website',
    images: [`${SITE_URL}/og.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Gappy | AI Workforce for Travel Operations',
    description: 'Meet Gappy and the thesis behind AI Workforce for travel operations.',
    images: [`${SITE_URL}/og.png`],
  },
}

const principles = [
  {
    number: '01',
    title: 'Work across existing systems',
    body: 'Core travel infrastructure carries years of business logic. We build around it and operate across it.',
  },
  {
    number: '02',
    title: 'Own the workflow outcome',
    body: 'A useful AI operator does more than draft text. It acts, checks the result, and knows when the work is complete.',
  },
  {
    number: '03',
    title: 'Escalate with context',
    body: 'Exceptions belong with people. The system should surface the decision, history, and next action — not another opaque alert.',
  },
]

export default function About() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <section className="border-b border-navy-900/10 pb-20 pt-40 md:pb-28 md:pt-48">
        <div className="container-luxe">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">About Gappy</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h1 className="max-w-5xl text-[clamp(48px,7vw,92px)] font-medium leading-[0.98] tracking-[-0.055em] text-navy-900">
              Building the AI operating layer for travel.
            </h1>
            <p className="max-w-xl text-base leading-8 text-ink-500 lg:pb-2">
              Gappy is a technology company building AI Workforce for the human operations that still connect travel companies, suppliers, systems, and customers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Why now</p>
          </div>
          <div>
            <h2 className="text-[clamp(34px,4.8vw,62px)] font-medium leading-[1.06] tracking-[-0.045em] text-navy-900">
              Travel operations were built for human coordination. AI changes what can operate them.
            </h2>
            <div className="mt-10 grid gap-8 text-base leading-8 text-ink-500 md:grid-cols-2">
              <p>
                A single booking can move through email, reservation systems, supplier portals, CRM, spreadsheets, and internal tools. Teams bridge those systems manually because the workflow lives between them.
              </p>
              <p>
                Gappy is building an AI Workforce that can carry context across those boundaries, make bounded decisions, execute the next step, verify the result, and escalate what remains uncertain.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy-900 py-24 text-white md:py-32">
        <div className="container-luxe">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-300">How we build</p>
          <h2 className="mt-5 max-w-4xl text-[clamp(36px,5vw,64px)] font-medium leading-[1.04] tracking-[-0.045em]">
            Designed around operational truth.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3">
            {principles.map((principle) => (
              <article key={principle.number} className="min-h-72 bg-navy-900 p-8 md:p-10">
                <p className="font-mono text-[10px] text-gold-300">{principle.number}</p>
                <h3 className="mt-16 text-xl font-medium tracking-[-0.025em]">{principle.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/55">{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <div className="grid gap-12 rounded-[32px] border border-navy-900/10 bg-white p-7 shadow-[0_28px_80px_rgba(11,22,50,0.08)] md:p-12 lg:grid-cols-[240px_1fr] lg:gap-16">
            <div className="overflow-hidden rounded-2xl bg-navy-900">
              <Image
                src="/CEO.jpg"
                alt="Gappy representative director Mitsuki Asano"
                width={480}
                height={600}
                className="h-full min-h-[320px] w-full object-cover object-top"
              />
            </div>
            <div className="self-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-700">From the founder</p>
              <h2 className="mt-6 text-[clamp(28px,3.5vw,46px)] font-medium leading-[1.2] tracking-[-0.04em] text-navy-900">
                Travel runs on thousands of small, consequential operational decisions.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-ink-500">
                Gappy is focused on building AI that can take on bounded operational responsibility while keeping people in control of policy, ambiguity, and risk.
              </p>
              <div className="mt-8 text-sm leading-6 text-ink-500">
                <p className="font-medium text-navy-900">浅野 充輝 / Mitsuki Asano</p>
                <p>Representative Director, Gappy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-navy-900/10 bg-white py-24 md:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Company</p>
            <h2 className="mt-5 text-4xl font-medium tracking-[-0.04em] text-navy-900">株式会社Gappy</h2>
          </div>
          <dl className="divide-y divide-navy-900/10 border-y border-navy-900/10">
            {[
              ['Company name', '株式会社Gappy / Gappy, Inc.'],
              ['Representative', '浅野 充輝 / Mitsuki Asano'],
              ['Established', '2025'],
              ['Location', '東京都渋谷区道玄坂1丁目10番8号 渋谷道玄坂東急ビル2F'],
              ['Contact', 'mitsuki@gappy.jp'],
            ].map(([label, value]) => (
              <div key={label} className="grid gap-2 py-5 sm:grid-cols-[160px_1fr]">
                <dt className="text-xs font-medium uppercase tracking-[0.14em] text-ink-400">{label}</dt>
                <dd className="text-sm leading-7 text-navy-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-24 text-center md:py-32">
        <div className="container-luxe">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Build with Gappy</p>
          <h2 className="mx-auto mt-5 max-w-4xl text-[clamp(36px,5vw,64px)] font-medium leading-[1.04] tracking-[-0.045em] text-navy-900">
            Redesign a real travel operation with us.
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="btn-navy">Talk to Gappy</a>
            <Link href="/contact" className="btn-outline">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
