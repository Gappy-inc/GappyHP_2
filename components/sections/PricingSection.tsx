'use client';

import { motion } from 'framer-motion';

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video';

const plans = [
  {
    name: 'スターター',
    price: '¥30,000',
    priceSub: '/月（税別）',
    desc: '小規模旅館・ゲストハウス向け',
    features: [
      '自動配信メッセージ（月100件まで）',
      '多言語対応（3言語）',
      'メール配信',
      'おもてなしご提案（基本）',
      '月次レポート',
      'メールサポート',
    ],
    featured: false,
    badge: null,
  },
  {
    name: 'スタンダード',
    price: '¥98,000',
    priceSub: '/月（税別）',
    desc: '中規模ホテル・旅館向け',
    features: [
      '自動配信メッセージ（月300件まで）',
      '多言語対応（主要5言語）',
      'メール + WhatsApp配信',
      'おもてなしご提案（カスタム）',
      '仮押さえ・承認フロー',
      'ブランドカスタマイズ',
      '詳細レポート・ダッシュボード',
      'チャットサポート',
    ],
    featured: true,
    badge: '人気',
  },
  {
    name: 'プレミアム',
    price: '¥220,000',
    priceSub: '/月（税別）',
    desc: '高級旅館・ラグジュアリーホテル向け',
    features: [
      '自動配信メッセージ（無制限）',
      '多言語対応（全言語）',
      '全チャネル配信対応',
      'ブランドデザイン完全カスタマイズ',
      '専任CSマネージャー',
      '月次戦略レビュー',
      'API連携・拡張対応',
      '24時間優先サポート',
    ],
    featured: false,
    badge: null,
  },
];

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-24 md:py-36 bg-ivory-50 overflow-hidden"
    >
      {/* Top gold line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container-luxe">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-gold-600 uppercase mb-5">
            Pricing
          </p>
          <h2 className="heading-jp text-[clamp(24px,3vw,40px)] leading-[1.5] font-medium mb-3">
            シンプルな月額料金
          </h2>
          <p className="text-jp text-[14px] text-ink-500 max-w-md mx-auto leading-relaxed">
            初期費用・解約料は一切不要。<br />まずは無料相談でご状況をお聞かせください。
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`relative rounded-2xl p-7 sm:p-8 flex flex-col ${
                plan.featured
                  ? 'bg-navy-900 border border-gold-500/30'
                  : 'gold-card'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-white text-[10px] font-serif-jp tracking-[0.15em] px-4 py-1 rounded-full">
                  {plan.badge}
                </span>
              )}

              {/* Name */}
              <p
                className={`font-serif-jp text-[12px] tracking-[0.2em] mb-4 ${
                  plan.featured ? 'text-gold-400' : 'text-gold-600'
                }`}
              >
                {plan.name}
              </p>

              {/* Price */}
              <div className="mb-2">
                <span
                  className={`font-serif-en font-medium leading-none ${
                    plan.featured ? 'text-ivory-100' : 'text-navy-900'
                  }`}
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontStyle: 'italic' }}
                >
                  {plan.price}
                </span>
                <span className={`text-[12px] ml-1 ${plan.featured ? 'text-ivory-100/50' : 'text-ink-400'}`}>
                  {plan.priceSub}
                </span>
              </div>

              <p className={`text-[12px] font-serif-jp mb-5 ${plan.featured ? 'text-ivory-100/50' : 'text-ink-400'}`}>
                {plan.desc}
              </p>

              {/* Divider */}
              <div className={`h-px mb-5 ${plan.featured ? 'bg-ivory-100/10' : 'bg-gold-500/20'}`} />

              {/* Features */}
              <ul className="space-y-2.5 flex-1 mb-7">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <span className={`flex-shrink-0 mt-0.5 text-[12px] ${plan.featured ? 'text-gold-400' : 'text-gold-600'}`}>
                      ✓
                    </span>
                    <span className={`text-[12px] font-serif-jp leading-relaxed ${plan.featured ? 'text-ivory-100/70' : 'text-ink-500'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={GOODTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 rounded-lg text-[12px] font-serif-jp tracking-[0.2em] transition-all ${
                  plan.featured
                    ? 'bg-gold-gradient text-white hover:shadow-gold'
                    : 'btn-outline justify-center'
                }`}
              >
                無料相談する
              </a>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center text-ink-400 text-[11px] font-serif-jp tracking-[0.1em] mt-10"
        >
          初期費用・解約料は一切不要。規模・ご要望に応じてカスタムプランもご用意しています。
        </motion.p>
      </div>
    </section>
  );
}
