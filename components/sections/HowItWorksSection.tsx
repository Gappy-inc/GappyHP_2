'use client';

import { motion } from 'framer-motion';
import { Database, Globe2, Send, Sparkles, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Database,
    num: '01',
    title: '予約データ自動取得',
    desc: 'サイトコントローラー（手間いらず / TL-リンカーン等）から予約データを自動取得。PMS直接連携不要で即日導入可能。複雑なIT改修コストはゼロ。',
  },
  {
    icon: Globe2,
    num: '02',
    title: 'AI国籍・言語・チャネル自動判定',
    desc: '電話番号の国番号を自動判定。ゲストの属性に応じた最適なオファー内容・チャネル・タイミングを自動決定。25言語以上に対応。',
  },
  {
    icon: Send,
    num: '03',
    title: 'マルチチャネルで最適配信',
    desc: '日本人→LINE（開封率70〜80%）、欧米豪→WhatsApp（開封率98%）で自動配信。チェックイン7〜10日前、旅行への期待感が最高潮の瞬間を狙い撃ち。',
  },
  {
    icon: Sparkles,
    num: '04',
    title: '行動経済学ベースのオファー自動生成',
    desc: 'アーリーチェックイン・部屋タイプアップグレード・朝食付きプランなど、ゲストの予約内容に応じた最適オファーをAIが自動生成。転換率10%以上を実現。',
  },
  {
    icon: TrendingUp,
    num: '05',
    title: '追加収益の自動計上',
    desc: '決済完了→PMSへの自動反映。スタッフの作業ゼロで収益が積み上がる。月次レポートで効果を可視化。',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-[#0A0A0A] py-16 sm:py-24 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <span
            className="text-[#00E676] text-xs tracking-[0.3em] uppercase font-bold"
            style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
          >
            HOW IT WORKS
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4"
            style={{ fontFamily: 'var(--font-noto-serif-jp, serif)' }}
          >
            5ステップで収益化まで全自動
          </h2>
          <p className="text-white/40 mt-3 text-sm">
            ホテルスタッフは何もしなくていい
          </p>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, amount: 0.3 }}
                className="group flex gap-6 py-8 border-b border-white/[0.06] last:border-0"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-14">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border border-[#00E676]/30 bg-[#00E676]/10 group-hover:bg-[#00E676]/20 group-hover:border-[#00E676]/60 transition-all">
                    <Icon size={20} color="#00E676" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="text-[#00E676]/50 text-xs font-bold"
                      style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
                    >
                      STEP {step.num}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-bold mb-2 group-hover:text-[#00E676] transition-colors"
                    style={{ fontFamily: 'var(--font-noto-serif-jp, serif)' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-white/50 leading-relaxed text-sm"
                    style={{ fontFamily: 'var(--font-noto-sans-jp, sans-serif)' }}
                  >
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
