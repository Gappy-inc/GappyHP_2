'use client';

import { motion } from 'framer-motion';

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video';

const executionSteps = [
  'Trigger',
  'Understand',
  'Decide',
  'Operate systems',
  'Communicate',
  'Verify completion',
];

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative min-h-[760px] pt-[140px] pb-24 md:pt-[168px] md:pb-32 overflow-hidden bg-ivory-100"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(201,169,97,0.16),transparent_28%),linear-gradient(180deg,#fdfcf8_0%,#f4f2eb_100%)]" />

      <div className="container-luxe">
        <div className="grid grid-cols-1 lg:grid-cols-[1.18fr_0.82fr] gap-14 lg:gap-20 items-center">

          {/* Left — text */}
          <div>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[11px] tracking-[0.4em] text-gold-600 uppercase mb-6"
            >
              GAPPY / AI WORKFORCE
            </motion.p>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-navy-900 text-[clamp(46px,6.4vw,88px)] leading-[0.98] font-medium tracking-[-0.055em] mb-8"
              style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
            >
              <span className="block">AI Workforce</span>
              <span className="block text-gold-600">for Travel</span>
              <span className="block">Operations</span>
            </motion.h1>

            {/* Gold line */}
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="gold-line block w-16 h-px mb-7 origin-left"
            />

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="text-[16px] md:text-[18px] leading-[1.8] text-ink-700 max-w-2xl tracking-[-0.01em] mb-10"
            >
              Gappy automates the operational work behind every trip — across booking systems,
              email, supplier portals, CRM, spreadsheets, and existing travel infrastructure.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href={GOODTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-navy"
              >
                Become a Design Partner
              </a>
              <a
                href="#workflows"
                className="btn-outline"
              >
                Explore workflows
              </a>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gold-500/40 text-[12px] font-serif-jp text-navy-900 tracking-[0.1em] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                Your systems stay. The manual work disappears.
              </div>
            </motion.div>
          </div>

          {/* Right — operating model */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-[28px] border border-navy-900/10 bg-navy-900 p-6 md:p-8 text-white shadow-[0_32px_80px_rgba(11,22,50,0.22)]">
              <div className="mb-7 flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.25em] text-gold-300">LIVE WORKFLOW</p>
                  <p className="mt-2 text-sm text-white/60">Supplier reconfirmation</p>
                </div>
                <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-[10px] tracking-[0.16em] text-emerald-300">OPERATING</span>
              </div>
              <ol className="space-y-3">
                {executionSteps.map((step, index) => (
                  <li key={step} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5">
                    <span className="grid h-7 w-7 flex-none place-items-center rounded-full border border-gold-300/40 font-mono text-[10px] text-gold-300">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm tracking-[-0.01em] text-white/90">{step}</span>
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-300" aria-hidden="true" />
                  </li>
                ))}
              </ol>
              <div className="mt-5 rounded-xl border border-gold-300/20 bg-gold-300/10 px-4 py-3 text-xs text-gold-100">
                Exceptions escalate to the right human — with context.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
