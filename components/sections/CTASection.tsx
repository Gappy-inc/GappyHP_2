'use client';

import { motion } from 'framer-motion';

const CONTACT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform';

const badges = ['初期費用¥0', '月額固定費¥0（成功報酬型）', '最短1週間で稼働開始', 'PMS改修不要'];

export default function CTASection() {
  return (
    <section
      className="relative py-32 px-6 text-center overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,230,118,0.03), #0A0A0A)',
        borderTop: '1px solid rgba(0,230,118,0.15)',
      }}
    >
      {/* Center radial glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,230,118,0.06), transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-5xl font-bold leading-tight mb-8"
          style={{ fontFamily: 'var(--font-noto-serif-jp, serif)' }}
        >
          まずは無料シミュレーションで、
          <br />
          あなたのホテルの
          <br />
          <span style={{ color: '#00E676' }}>隠れた収益</span>を発見しませんか？
        </motion.h2>

        {/* Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white/70 text-sm"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-5 px-10 rounded-full bg-[#00E676] text-black font-extrabold text-lg hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(0,230,118,0.5)] transition-all duration-300"
          >
            お問い合わせ / 無料PoC申し込み
          </a>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block py-5 px-10 rounded-full border border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-colors"
          >
            資料ダウンロード
          </a>
        </motion.div>

        {/* Sub copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-white/30 text-sm mt-8"
        >
          まずはお気軽にご相談ください。3営業日以内にご返信いたします。
          <br />
          <span className="text-white/20 text-xs">mitsuki@gappy.jp</span>
        </motion.p>
      </div>
    </section>
  );
}
