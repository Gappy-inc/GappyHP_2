'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    num: '01',
    week: 'Day 1–3',
    title: 'ご予約データを自動取得',
    desc: 'OTA予約確認メールの自動転送設定（1行追加）のみで予約データを取り込み。サイトコントローラーの新規導入は不要です。',
  },
  {
    num: '02',
    week: 'Week 1',
    title: 'メッセージテンプレートをカスタマイズ',
    desc: '施設の言葉づかい・温度感・ブランドカラーに合わせてメッセージを設計。専任担当が一緒に作り込みます。',
  },
  {
    num: '03',
    week: 'Week 1–2',
    title: 'テスト配信・動作確認',
    desc: '本番前に全フローを検証。ゲストへの配信タイミング・言語切り替え・決済フローを確認してから本稼働へ。',
  },
  {
    num: '04',
    week: 'Week 2+',
    title: '本稼働 → 自動運用開始',
    desc: '以降はすべて自動。月次レポートと定期レビューで成果を確認しながら改善施策を継続します。',
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-36 bg-ivory-100 overflow-hidden"
    >
      <div className="container-luxe">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-gold-600 uppercase mb-5">
            How it works
          </p>
          <h2 className="heading-jp text-[clamp(24px,3vw,40px)] leading-[1.55] font-medium">
            最短5営業日で稼働開始。
          </h2>
        </motion.div>

        {/* Timeline steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-5 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative flex flex-col items-center text-center lg:items-start lg:text-left px-4 pb-10 lg:pb-0"
            >
              {/* Step circle */}
              <div className="w-10 h-10 rounded-full bg-navy-900 text-ivory-100 flex items-center justify-center flex-shrink-0 mb-5 font-serif-en text-[13px] font-medium relative z-10">
                {i + 1}
              </div>

              <p className="font-mono text-[10px] tracking-[0.3em] text-gold-500 mb-2">
                {step.week}
              </p>
              <h3 className="font-serif-jp text-[14px] font-medium text-navy-900 tracking-[0.06em] mb-2 leading-relaxed">
                {step.title}
              </h3>
              <p className="text-jp text-[12px] text-ink-500 leading-[1.95]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
