'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function WhatIsSection() {
  return (
    <section className="relative py-24 md:py-36 bg-ivory-50 overflow-hidden">
      {/* Top gold line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container-luxe">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 lg:gap-20 items-center">

          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="font-mono text-[11px] tracking-[0.4em] text-gold-600 uppercase mb-6">
              Our Approach
            </p>
            <h2 className="heading-jp text-[clamp(28px,3.4vw,48px)] leading-[1.45] font-medium mb-5">
              <span className="block">貴館のオペレーションに</span>
              <span className="block">馴染む形で導入。</span>
            </h2>

            <span className="gold-line block w-full max-w-[440px] mb-7" />

            <p className="font-serif-jp text-[15px] md:text-[16px] leading-[2.1] text-ink-700 max-w-xl tracking-[0.06em] mb-8">
              旅館の女将・ホテルの支配人がIT操作することなく、
              貴館の言葉づかい・温度感・ブランドカラーをすべて反映した
              コミュニケーションを自動化いたします。
              専任の導入サポート担当が、業務フローを深く理解した上で
              最適な活用方法をご提案します。
            </p>

            {/* Points */}
            <div className="space-y-4">
              {[
                { num: '01', text: '貴館の言葉づかい・温度感・ブランドカラーをすべて反映' },
                { num: '02', text: '専任の導入サポート担当が業務フローを理解し伴走' },
                { num: '03', text: 'スタッフのIT操作は一切不要' },
              ].map((p) => (
                <div key={p.num} className="flex items-start gap-4">
                  <span
                    className="font-mono text-[11px] text-gold-500 tracking-widest mt-1 flex-shrink-0"
                  >
                    {p.num}
                  </span>
                  <p className="font-serif-jp text-[14px] leading-relaxed text-ink-700 tracking-[0.06em]">
                    {p.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            {/* Background blur circle */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-300/10 via-transparent to-navy-700/5 blur-3xl scale-110" />
            </div>

            <div className="relative drop-shadow-[0_30px_60px_rgba(11,22,50,0.25)]">
              <Image
                src="/support-scene.png"
                alt="旅館・ホテルの導入サポート担当とオンライン会議を行う様子（伴走型サポート）"
                width={620}
                height={480}
                className="w-full h-auto rounded-2xl select-none"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
