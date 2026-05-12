'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video';

const ctas = [
  {
    icon: '/cta-icon-hotel.png',
    title: '高級宿泊施設に\n特化した設計',
    desc: '旅館・ホテルのおもてなし文化を理解した専任チームが、貴館の世界観に合わせた導入を伴走します。',
  },
  {
    icon: '/cta-icon-doc.png',
    title: '貴館ブランドの\nまま自動化',
    desc: 'トーン・文体・ロゴ・カラーをすべてカスタマイズ。ゲストには貴館からの一通として届きます。',
  },
  {
    icon: '/cta-icon-chart.png',
    title: '成約数レポートで\n効果を可視化',
    desc: '配信数・開封率・返信率・成約件数・追加売上をダッシュボードとレポートで毎月お届けします。',
  },
];

const features = [
  { num: '01', title: 'ご予約後 自動配信',        desc: '予約確定後、最適なタイミングでゲストへ自動配信。スタッフの操作は一切不要です。' },
  { num: '02', title: 'おもてなしご提案',          desc: 'スパ・特別メニュー・送迎など、施設の付帯サービスをパーソナライズして提案。' },
  { num: '03', title: '多言語対応（主要5言語）',   desc: '日英中韓仏の5言語に自動対応。母国語で届けるから返信率が高い。' },
  { num: '04', title: '仮押さえ・承認フロー',      desc: 'ゲストが希望したプランを仮押さえし、施設が確認・承認するまでを自動管理。' },
  { num: '05', title: '貴館ブランド準拠',          desc: 'ロゴ・カラー・文体を完全カスタマイズ。Gappyブランドは一切表示されません。' },
  { num: '06', title: 'ご成約数レポート',          desc: '成約件数・追加売上・返信率を月次レポートで提供。改善施策も一緒に検討します。' },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-24 md:py-36 bg-ivory-100 overflow-hidden"
    >
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
            Features
          </p>
          <h2 className="heading-jp text-[clamp(24px,3vw,40px)] leading-[1.55] font-medium">
            貴館のブランドのまま自動配信。
          </h2>
        </motion.div>

        {/* 3 main CTA cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16">
          {ctas.map((cta, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group flex flex-col items-center text-center transition-transform duration-500 hover:-translate-y-1"
            >
              {/* Icon image */}
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={cta.icon}
                  alt={cta.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(11,22,50,0.15)]"
                />
              </div>
              <h3 className="heading-jp text-[16px] mb-3 font-medium leading-relaxed whitespace-pre-line">
                {cta.title}
              </h3>
              <p className="text-jp text-[12.5px] text-ink-500 leading-[1.95] max-w-[260px]">
                {cta.desc}
              </p>
              <a
                href={GOODTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-[12.5px] tracking-[0.18em] mt-6 w-full justify-center"
              >
                詳しく相談する
              </a>
            </motion.div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="gold-divider mb-16" />

        {/* Feature list 2×3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <p className="font-mono text-[10px] tracking-[0.3em] text-gold-500 mb-3">{f.num}</p>
              <h3 className="font-serif-jp text-[14px] font-medium text-navy-900 tracking-[0.08em] mb-2 leading-relaxed">
                {f.title}
              </h3>
              <p className="text-jp text-[13px] text-ink-500 leading-[1.9]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
