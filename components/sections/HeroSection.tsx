'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const CONTACT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform';

const trustBadges = [
  { top: 'PoC実施中', bottom: '3施設同時展開' },
  { top: 'ROI 41x 実績', bottom: 'Hard Rock Hotel NY' },
  { top: '25言語対応', bottom: '完全自動生成' },
  { top: '初期費用 ¥0', bottom: '成功報酬型' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-12 pt-12 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #00E676, transparent)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5 blur-[80px]"
          style={{ background: 'radial-gradient(circle, #00E676, transparent)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#00E676] text-xs font-bold tracking-[0.3em] uppercase mb-6"
            style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
          >
            Hotel Upsell AI — Gappy Stay
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-extrabold leading-tight mb-6"
            style={{
              fontFamily: 'var(--font-space-grotesk, sans-serif)',
              fontSize: 'clamp(1.75rem, 7vw, 3.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            宿泊ゲストの{' '}
            <span style={{ color: '#00E676' }}>スマホ</span>
            へ、
            <br />
            最適タイミングで
            <br />
            アップセルを{' '}
            <span style={{ color: '#00E676' }}>自動提案。</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: 'var(--font-noto-sans-jp, sans-serif)' }}
          >
            人手ゼロ・PMS改修不要。チェックイン前72時間の空白を収益に変え、
            客室単価・RevPARを継続的に向上させるホテル向けAI SaaS。
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="flex flex-wrap gap-4 mb-14"
          >
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00E676] text-black font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base hover:shadow-[0_0_30px_rgba(0,230,118,0.6)] transition-all"
            >
              無料PoCに申し込む →
            </a>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base hover:bg-white/10 transition-colors"
            >
              資料ダウンロード
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="rounded-lg bg-white/5 border border-white/10 px-4 py-2.5 text-sm flex flex-col gap-0.5"
              >
                <span className="text-white/80 font-semibold">{badge.top}</span>
                <span className="text-white/40 text-xs">{badge.bottom}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-white text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
