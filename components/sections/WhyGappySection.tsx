'use client';

import { motion } from 'framer-motion';

const strengths = [
  {
    num: '01',
    title: 'インバウンド × AI に特化した深い知見',
    desc: '訪日外国人の旅行行動データ、観光業界のオペレーション、AIモデル設計——3つの専門知識を統合したチームが開発。表面的な多言語対応ではなく、文化・文脈を理解した提案を実現。',
  },
  {
    num: '02',
    title: '日本市場に最適化された唯一の設計',
    desc: '海外製ツールとは異なり、日本のホテル現場（サイトコントローラー / PMS環境）に合わせた設計。LINEへの配信、日本語対応、税込表示など、日本向けに一から作り直したアーキテクチャ。',
  },
  {
    num: '03',
    title: 'PoC実績と国際ベンチマーク',
    desc: '国内3施設でPoC実施中。参照事例として Hard Rock Hotel New York では ROI 41x を記録。グローバルでの成功モデルを日本市場に移植・最適化する実行力を持つ。',
  },
  {
    num: '04',
    title: 'インバウンド需要・回復期という追い風',
    desc: '2024年の訪日外客数は3,687万人（過去最高）。ホテル稼働率は上昇する一方、人材不足は深刻化。テクノロジーによる収益最大化ニーズが急速に高まっているのが今。',
  },
];

export default function WhyGappySection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-16" style={{ background: '#111111' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <span
            className="text-[#00E676] text-xs tracking-[0.3em] uppercase font-bold"
            style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
          >
            WHY GAPPY
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4 mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-noto-serif-jp, serif)' }}
          >
            なぜ今、Gappyなのか。
          </h2>
          <p
            className="text-white/50 max-w-2xl leading-relaxed text-sm"
            style={{ fontFamily: 'var(--font-noto-sans-jp, sans-serif)' }}
          >
            Global × Inbound Tourism × AI という3つの軸の交差点に、Gappyは立っています。
            観光という日本最強のソフトパワーを、テクノロジーで武装する。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strengths.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="card-dark rounded-2xl p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span
                  className="text-3xl font-bold flex-shrink-0 mt-1"
                  style={{
                    fontFamily: 'var(--font-dm-mono, monospace)',
                    color: 'rgba(0,230,118,0.3)',
                  }}
                >
                  {item.num}
                </span>
                <div>
                  <h3
                    className="text-lg font-bold mb-3 leading-snug"
                    style={{ fontFamily: 'var(--font-noto-serif-jp, serif)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-white/50 text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-noto-sans-jp, sans-serif)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Keyword cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 flex flex-wrap gap-3 justify-center"
        >
          {[
            'インバウンド需要 過去最高',
            '訪日外客 3,687万人（2024年）',
            'ホテル人材不足率 71.1%',
            'RevPAR向上',
            '多言語AI',
            '行動経済学 × アップセル',
            'LINE / WhatsApp',
            '成功報酬型',
          ].map((kw) => (
            <span
              key={kw}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-white/50 text-sm"
            >
              {kw}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
