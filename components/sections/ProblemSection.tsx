'use client';

import { motion } from 'framer-motion';

const pains = [
  {
    num: '01',
    title: 'ご予約後の「沈黙期間」が\n収益機会を奪っている',
    desc: '予約確定からチェックインまで、ゲストへ能動的にアプローチできていない。旅行への期待が最高潮のこの期間に、施設側から何も届かない状態が続いています。',
  },
  {
    num: '02',
    title: '多言語ゲストへの丁寧な対応が\nスタッフを圧迫する',
    desc: '英語・中国語・韓国語など多言語での丁寧なコミュニケーションは工数がかかる。言語の壁がおもてなしの質を下げ、スタッフの疲弊につながっています。',
  },
  {
    num: '03',
    title: 'ブランドの品位を保ちながらの\n追加提案が難しい',
    desc: '高級施設らしい世界観を損なわずに、スパ・特別プラン・送迎などを提案するのは難しい。ツール任せにすると「安売り感」が出てしまうリスクがあります。',
  },
];

export default function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative py-24 md:py-36 overflow-hidden bg-ivory-50"
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
          className="text-center mb-16"
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-gold-600 uppercase mb-5">
            The Problem
          </p>
          <h2 className="heading-jp text-[clamp(24px,3.4vw,40px)] leading-[1.45] mb-6 font-medium">
            フロントスタッフへの負担なく、<br />収益を伸ばせていますか？
          </h2>
        </motion.div>

        {/* Pain cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="gold-card rounded-2xl p-7"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-gold-500 mb-5">{pain.num}</p>
              <h3 className="font-serif-jp text-[15px] font-medium text-navy-900 tracking-[0.06em] mb-4 leading-relaxed whitespace-pre-line">
                {pain.title}
              </h3>
              <p className="text-jp text-[13px] text-ink-500 leading-[2]">{pain.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          <div className="gold-card rounded-2xl p-6 flex items-start gap-5">
            <span
              className="font-serif-en font-medium text-gold-600 leading-none flex-shrink-0"
              style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontStyle: 'italic' }}
            >
              64%
            </span>
            <div>
              <p className="font-serif-jp text-[14px] font-medium text-navy-900 tracking-[0.06em] mb-1.5">メッセージ返信率</p>
              <p className="text-jp text-[12px] text-ink-400 leading-relaxed">チェックイン前に届いたGappy Stay経由のメッセージへの平均返信率。ゲストの期待が最高潮のタイミングに届くから反応が高い。</p>
            </div>
          </div>
          <div className="gold-card rounded-2xl p-6 flex items-start gap-5">
            <span
              className="font-serif-en font-medium text-navy-900 leading-none flex-shrink-0"
              style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontStyle: 'italic' }}
            >
              ¥4,200
            </span>
            <div>
              <p className="font-serif-jp text-[14px] font-medium text-navy-900 tracking-[0.06em] mb-1.5">一人あたり追加売上</p>
              <p className="text-jp text-[12px] text-ink-400 leading-relaxed">スパ・特別メニュー・送迎など付帯サービスの自動提案による一人あたりの平均追加収益。スタッフ作業はゼロ。</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
