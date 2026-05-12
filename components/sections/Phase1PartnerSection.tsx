'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const conditions = [
  'ご利用データを当社と共有いただけること',
  '効果データを匿名形式で事例として活用させていただけること',
  '隔週レビューミーティング (オンライン可) にご参加いただけること',
];

const cards = [
  {
    title: '初期費用',
    highlight: '0円',
    desc: '導入時の初期費用は一切いただきません',
  },
  {
    title: '月額費用',
    highlight: '0円',
    desc: 'Phase 1パートナー期間中は月額固定費なし',
  },
  {
    title: '成功報酬',
    highlight: '売上の12%',
    desc: 'アップセル経由で発生した売上のみに対する成功報酬',
  },
];

export default function Phase1PartnerSection() {
  return (
    <section
      id="phase1-partner"
      className="relative py-24 md:py-36 bg-ivory-100 overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container-luxe">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-14"
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-gold-600 uppercase mb-5">
            Phase 1 Partner
          </p>
          <h2 className="heading-jp text-[clamp(22px,3vw,36px)] leading-[1.45] font-medium mb-4">
            Phase 1パートナー特別条件
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] font-serif-jp text-navy-900/90">
            <span className="inline-flex items-center rounded-full border border-gold-500/35 bg-white/60 px-4 py-1 text-gold-700 tracking-[0.12em]">
              先着10社限定
            </span>
            <span className="text-ink-400 hidden sm:inline">/</span>
            <span className="text-ink-500 tracking-[0.06em]">2026年6月30日まで</span>
          </div>
          <p className="text-jp text-[14px] text-ink-500 max-w-2xl mx-auto leading-relaxed mt-6">
            事例公開にご協力いただける施設様には、以下の特別条件でご導入いただけます
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12 md:mb-14">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="gold-card rounded-2xl p-7 sm:p-8 flex flex-col text-center"
            >
              <p className="font-serif-jp text-[12px] tracking-[0.2em] text-gold-600 mb-3">
                {card.title}
              </p>
              <p
                className="font-serif-en font-medium text-navy-900 mb-4 leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontStyle: 'italic' }}
              >
                {card.highlight}
              </p>
              <p className="text-jp text-[12px] text-ink-500 leading-relaxed flex-1">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-2xl mx-auto rounded-2xl border border-gold-500/25 bg-white/70 px-6 py-7 sm:px-8 sm:py-8"
        >
          <p className="text-[12px] font-serif-jp text-ink-500 tracking-[0.06em] mb-4 text-center sm:text-left">
            ※ 以下の条件にご同意いただける施設様が対象です
          </p>
          <ul className="space-y-3">
            {conditions.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-left">
                <span className="flex-shrink-0 mt-0.5 text-[12px] text-gold-600">✓</span>
                <span className="text-[12px] font-serif-jp leading-relaxed text-ink-500">{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-10 md:mt-12"
        >
          <Link
            href="/solutions/partners"
            className="btn-gold text-center shadow-gold hover:shadow-gold"
          >
            Phase 1パートナーに応募する
          </Link>
          <a href="#pricing" className="btn-outline justify-center">
            通常プランも見る
          </a>
        </motion.div>
      </div>
    </section>
  );
}
