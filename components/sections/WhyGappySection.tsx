'use client';

import { motion } from 'framer-motion';

const points = [
  {
    num: '01',
    title: '施設ごとの文化を尊重する、伴走型の導入サポート',
    desc: '旅館・ホテルのおもてなし文化を理解した専任チームが、施設の世界観・言葉づかい・温度感を理解した上で導入を伴走。「ツールを押し付けられた」ではなく「一緒に作った」と感じていただける体制です。',
  },
  {
    num: '02',
    title: 'ブランドの世界観を損なわない自動化',
    desc: '貴館のブランドが表に出るように設計。ゲスト側にGappyブランドが表示されることは一切なく、貴館からの一通として機能します。専用ドメイン・ロゴ・写真・文面・配色まですべて貴館仕様。',
  },
  {
    num: '03',
    title: 'IT担当者不要 — スタッフがそのまま使える',
    desc: 'OTA予約確認メールの転送設定（1行追加）のみで稼働。PMSやサイトコントローラーの改修は不要です。現場スタッフの日常業務を一切変えずに、収益向上を実現できます。',
  },
  {
    num: '04',
    title: '月次レポートで成果を共に追う',
    desc: '配信数・開封率・返信率・成約件数・追加売上を月次レポートで共有。専任担当との定期レビューで改善施策を立案し、継続的な収益最大化をサポートします。',
  },
];

export default function WhyGappySection() {
  return (
    <section
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #fdfcf8 0%, #faf8f1 100%)' }}
    >
      <div className="container-luxe">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] tracking-[0.4em] text-gold-600 uppercase mb-5">
            Why Gappy Stay
          </p>
          <h2 className="heading-jp text-[clamp(24px,3vw,40px)] leading-[1.55] font-medium space-y-1">
            <span className="block">選ばれる理由。</span>
          </h2>
          <span className="gold-line block w-12 h-px mt-5" />
        </motion.div>

        {/* Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="gold-card rounded-2xl p-7 sm:p-8"
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-gold-500 mb-4">{p.num}</p>
              <h3 className="font-serif-jp text-[15px] font-medium text-navy-900 tracking-[0.06em] mb-3 leading-relaxed">
                {p.title}
              </h3>
              <p className="text-jp text-[13px] text-ink-500 leading-[2]">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
