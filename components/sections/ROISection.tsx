'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const results = [
  {
    img: '/result-1-yen.png',
    value: '+22%',
    label: '平均客単価の向上',
    desc: '客単価が平均で22%向上',
  },
  {
    img: '/result-2-review.png',
    value: '4.95',
    label: '口コミ評価の向上',
    desc: '口コミスコアが0.15ポイント向上',
  },
  {
    img: '/result-3-time.png',
    value: '70%',
    label: '問い合わせ対応時間の削減',
    desc: '問い合わせ対応時間を70%削減',
  },
];

export default function ROISection() {
  return (
    <section
      id="roi"
      className="relative py-24 md:py-36 overflow-hidden bg-navy-950"
    >
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/35 via-navy-900/25 to-navy-950/55" />
      </div>

      {/* Gold border lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="container-luxe relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-gold-400 uppercase mb-5">
            Results
          </p>
          <h2 className="heading-jp text-[clamp(24px,3vw,40px)] leading-[1.5] font-medium text-ivory-100">
            ご単価・ご口コミ・業務効率の向上を<br className="hidden md:block" />実現します。
          </h2>
        </motion.div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto mb-14">
          {results.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group text-center"
            >
              {/* Image */}
              <div className="relative mb-5 transition-all duration-700 group-hover:-translate-y-2 flex justify-center">
                <Image
                  src={r.img}
                  alt={r.label}
                  width={280}
                  height={220}
                  className="w-full max-w-[280px] h-auto select-none drop-shadow-[0_24px_50px_rgba(11,22,50,0.22)] group-hover:drop-shadow-[0_32px_70px_rgba(11,22,50,0.3)] transition-all duration-700"
                />
              </div>

              {/* Value */}
              <p
                className="text-gold-300 font-medium leading-none mb-2"
                style={{
                  fontFamily: 'var(--font-cormorant, serif)',
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontStyle: 'italic',
                }}
              >
                {r.value}
              </p>
              <p className="text-ivory-100/80 font-serif-jp text-[13px] tracking-[0.1em] mb-1">{r.label}</p>
              <p className="text-ivory-100/40 text-[11px] font-serif-jp tracking-[0.06em]">— {r.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-ivory-100/30 text-[11px] font-serif-jp tracking-[0.1em]">
            ※ 導入施設の実績データ（平均値）
          </p>
        </motion.div>
      </div>
    </section>
  );
}
