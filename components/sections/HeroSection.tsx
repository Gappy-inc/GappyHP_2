'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video';
const RESOURCE_URL = 'https://forms.gle/NUgbw2pFFrmoLtsv5';

export default function HeroSection() {
  return (
    <section
      id="top"
      className="relative pt-[120px] pb-24 md:pt-[140px] md:pb-32 overflow-hidden bg-ivory-100"
    >
      {/* Background blobs */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-gold-300/20 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[640px] h-[640px] rounded-full bg-gradient-to-br from-navy-700/10 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="container-luxe">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.55fr] gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <div>
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[11px] tracking-[0.4em] text-gold-600 uppercase mb-6"
            >
              Gappy Stay
            </motion.p>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="heading-jp text-[clamp(28px,3.4vw,48px)] leading-[1.45] font-medium mb-3"
            >
              <span className="block">貴館のおもてなしを、</span>
              <span className="block">AIで増幅する。</span>
            </motion.h1>

            {/* Gold line */}
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="gold-line block w-16 h-px mb-7 origin-left"
            />

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="font-serif-jp text-[15px] md:text-[16px] leading-[2.1] text-ink-700 max-w-xl tracking-[0.06em] mb-10"
            >
              多言語のお声がけ・別注ご提案・決済承認までを、
              貴館のブランドのまま自動配信いたします。
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <a
                href={GOODTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-navy"
              >
                無料相談する（30分）
              </a>
              <a
                href={RESOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                資料をダウンロードする
              </a>
            </motion.div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gold-500/40 text-[12px] font-serif-jp text-navy-900 tracking-[0.1em] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                ご予約後の沈黙時間を、ご単価向上の機会へ
              </div>
            </motion.div>
          </div>

          {/* Right — devices image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative flex items-center justify-center"
          >
            {/* Floating mini-card (booking info) */}
            <div className="hidden sm:block absolute -top-8 -left-4 lg:-left-10 w-[220px] gold-card rounded-xl p-4 backdrop-blur-sm bg-white/95 z-20 shadow-xl">
              <p className="font-mono text-[9px] tracking-[0.2em] text-navy-700 uppercase mb-2">Gappy Stay</p>
              <div className="space-y-1.5 text-[11px] font-serif-jp text-ink-700 leading-relaxed">
                <div className="flex justify-between items-center">
                  <span className="text-ink-400">予約確定</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-ink-400">7日前 配信</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-300 flex-shrink-0" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-navy-900 font-medium">自動承認完了</span>
                  <span className="text-gold-600 text-[10px]">✓</span>
                </div>
              </div>
              <div className="mt-3 w-full text-[10px] py-1.5 rounded-md bg-navy-900 text-ivory-50 tracking-[0.2em] font-serif-jp text-center">
                決済完了
              </div>
            </div>

            {/* Main device image */}
            <div className="relative drop-shadow-[0_30px_60px_rgba(11,22,50,0.25)]">
              <Image
                src="/hero-devices.png"
                alt="Gappy Stay ご予約後 自動配信プレビュー画面（PC・スマートフォン）"
                width={680}
                height={540}
                className="w-full h-auto select-none"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
