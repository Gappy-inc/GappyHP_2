import Image from 'next/image'
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd'
import CTASection from '@/components/CTASection'
import PageHero from '@/components/PageHero'
import {
  COMPANY_ADDRESS,
  CONTACT_EMAIL,
  LEGAL_NAME,
} from '@/lib/config'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'About Gappy | AI Workforce for Business Operations',
  description:
    'Gappy is an applied AI company building AI Workforce for complex business operations. We are starting with travel.',
  path: '/about',
})

const principles = [
  ['Start with operational truth', 'Map how the work actually moves before deciding what to automate.'],
  ['Own the outcome', 'Design for verified completion, not an isolated action or generated answer.'],
  ['Work around reality', 'Respect existing systems, policies, authority, and business constraints.'],
  ['Expand autonomy with evidence', 'Increase responsibility only where operating results justify it.'],
  ['Keep humans in control of the hard edges', 'Escalate ambiguity, policy exceptions, and risk with context.'],
]

const companyInformation = [
  ['Company name', `${LEGAL_NAME} / Gappy, Inc.`],
  ['Representative', '浅野 充輝 / Mitsuki Asano'],
  ['Established', '2025'],
  ['Location', COMPANY_ADDRESS],
  ['Contact', CONTACT_EMAIL],
]

export default function AboutPage() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <BreadcrumbJsonLd name="About" path="/about" />
      <PageHero
        eyebrow="About Gappy"
        title="Building AI that can carry operational responsibility."
        body={
          <>
            <p>
              Gappy is an applied AI company building AI Workforce for complex
              business operations.
            </p>
            <p className="mt-4 font-medium text-navy-900">
              We are starting with travel.
            </p>
          </>
        }
      />

      <section className="section-shell">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">Mission</p>
            <h2 className="section-title mt-6">Make complex operations autonomous.</h2>
          </div>
          <div className="body-lead self-end space-y-5">
            <p>Businesses have spent decades digitizing information.</p>
            <p>The next shift is digitizing execution.</p>
            <p className="text-navy-900">
              We are building systems that can increasingly carry bounded
              responsibility for operational work while people retain control of
              policy, ambiguity, and risk.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy-900 text-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <p className="eyebrow text-gold-300">Why now</p>
          <div>
            <h2 className="max-w-4xl text-[clamp(2.5rem,5.5vw,4.8rem)] font-medium leading-[1.01] tracking-[-0.052em]">
              AI changes what software can be responsible for.
            </h2>
            <div className="mt-9 grid gap-7 text-base leading-8 text-white/55 md:grid-cols-2">
              <div className="space-y-5">
                <p>Traditional software waits for a person to operate it.</p>
                <p>
                  Modern AI can understand unstructured context, work across
                  interfaces, communicate, and make constrained decisions.
                </p>
              </div>
              <div className="space-y-5 text-white/80">
                <p>
                  The opportunity is not to add another assistant to every screen.
                </p>
                <p>It is to redesign the work itself.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-b border-navy-900/10 bg-white">
        <div className="container-luxe">
          <p className="eyebrow text-gold-700">Principles</p>
          <h2 className="section-title mt-6 max-w-4xl">
            Build from the operation outward.
          </h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900/10 sm:grid-cols-2 lg:grid-cols-5">
            {principles.map(([title, body], index) => (
              <article key={title} className="min-h-64 bg-white p-6">
                <span className="font-mono text-[9px] text-gold-700">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-12 text-base font-medium leading-6 text-navy-900">
                  {title}
                </h3>
                <p className="mt-4 text-xs leading-6 text-ink-500">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-luxe grid gap-12 rounded-[30px] border border-navy-900/10 bg-white p-7 shadow-[0_28px_80px_rgba(11,22,50,0.08)] md:p-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          <div className="overflow-hidden rounded-2xl bg-navy-900">
            <Image
              src="/CEO.jpg"
              alt="Gappy representative director Mitsuki Asano"
              width={480}
              height={600}
              sizes="(max-width: 1024px) 100vw, 240px"
              className="h-full min-h-[320px] w-full object-cover object-top"
            />
          </div>
          <div className="self-center">
            <p className="eyebrow text-gold-700">From the founder</p>
            <h2 className="mt-6 text-[clamp(2.1rem,4vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.048em] text-navy-900">
              Operations are where software meets reality.
            </h2>
            <div className="body-lead mt-7 max-w-3xl space-y-5">
              <p>
                The most consequential business work rarely happens inside one
                clean interface.
              </p>
              <p>
                It moves between people, systems, messages, decisions, and
                exceptions.
              </p>
              <p className="text-navy-900">
                Gappy exists to build AI that can operate inside that reality — not
                just talk about it.
              </p>
            </div>
            <div className="mt-8 text-sm leading-6 text-ink-500">
              <p className="font-medium text-navy-900">浅野 充輝 / Mitsuki Asano</p>
              <p>Representative Director, Gappy</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell border-y border-navy-900/10 bg-white">
        <div className="container-luxe grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <div>
            <p className="eyebrow text-gold-700">Company information</p>
            <h2 className="mt-6 text-4xl font-medium tracking-[-0.04em] text-navy-900">
              {LEGAL_NAME}
            </h2>
          </div>
          <dl className="divide-y divide-navy-900/10 border-y border-navy-900/10">
            {companyInformation.map(([label, value]) => (
              <div key={label} className="grid gap-2 py-5 sm:grid-cols-[160px_1fr]">
                <dt className="text-xs font-medium uppercase tracking-[0.12em] text-ink-400">
                  {label}
                </dt>
                <dd className="text-sm leading-7 text-navy-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
