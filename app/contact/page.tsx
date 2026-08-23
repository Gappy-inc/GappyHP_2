const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video'

const audiences = [
  'Enterprise travel companies exploring a design partnership',
  'Investors and strategic partners',
  'Engineers and builders interested in Gappy',
  'Travel industry partners and media',
]

export default function Contact() {
  return (
    <div className="bg-ivory-50 text-ink-900">
      <section className="border-b border-navy-900/10 pb-20 pt-40 md:pb-28 md:pt-48">
        <div className="container-luxe">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold-700">Contact</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <h1 className="max-w-5xl text-[clamp(48px,7vw,92px)] font-medium leading-[0.98] tracking-[-0.055em] text-navy-900">
              Let&apos;s redesign travel operations.
            </h1>
            <p className="max-w-xl text-base leading-8 text-ink-500 lg:pb-2">
              Tell us which operational workflow your team still has to carry across systems. We will start with the work, the constraints, and the outcome.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-luxe grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="rounded-[30px] bg-navy-900 p-8 text-white shadow-[0_28px_80px_rgba(11,22,50,0.18)] md:p-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-300">Design partner conversation</p>
            <h2 className="mt-6 text-[clamp(32px,4vw,50px)] font-medium leading-[1.08] tracking-[-0.04em]">
              Book a 30-minute conversation with Gappy.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
              We will discuss the workflow, systems involved, current human handoffs, exceptions, and what a useful first deployment would need to prove.
            </p>
            <a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="mt-9 inline-flex items-center justify-center rounded-md bg-gold-400 px-8 py-3 text-xs font-medium tracking-[0.16em] text-navy-950 transition-colors hover:bg-gold-300">
              Schedule a conversation
            </a>
          </div>

          <div className="self-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-700">Also for</p>
            <ul className="mt-6 divide-y divide-navy-900/10 border-y border-navy-900/10">
              {audiences.map((audience, index) => (
                <li key={audience} className="flex gap-4 py-5 text-sm leading-7 text-navy-900">
                  <span className="font-mono text-[9px] text-gold-700">{String(index + 1).padStart(2, '0')}</span>
                  {audience}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <p className="text-sm leading-7 text-ink-500">Prefer email?</p>
              <a href="mailto:mitsuki@gappy.jp" className="mt-2 inline-block text-lg font-medium text-navy-900 underline decoration-gold-500 underline-offset-8">
                mitsuki@gappy.jp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
