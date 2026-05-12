'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video';
const RESOURCE_URL = 'https://forms.gle/NUgbw2pFFrmoLtsv5';

export default function CTASection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden bg-navy-950"
    >
      {/* Background image */}
      <Image
        src="/final-cta-bg.png"
        alt=""
        fill
        className="object-cover object-center select-none pointer-events-none opacity-40"
        aria-hidden
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/55 via-navy-900/40 to-navy-950/65 pointer-events-none" />

      {/* Gold border lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="container-luxe relative z-10">
        <div className="relative bg-ivory-50 rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.5)] px-6 md:px-12 py-12 md:py-16 max-w-5xl mx-auto">
          {/* Inner gold border */}
          <div className="absolute top-3 left-3 right-3 bottom-3 rounded-xl border border-gold-500/20 pointer-events-none" />

          <div className="relative z-10 text-center">
            {/* Brand image */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <Image
                src="/final-cta-brand.png"
                alt="Gappy Stay"
                width={160}
                height={60}
                className="h-12 w-auto object-contain opacity-80"
              />
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              viewport={{ once: true }}
              className="text-center heading-jp text-[clamp(22px,2.6vw,36px)] leading-[1.5] mb-5 font-medium"
            >
              まずは30分の無料相談から。<br />
              貴館のおもてなしを、<br className="md:hidden" />
              <span className="hidden md:inline">AIでどう増幅できるかを</span>お話しします。
              <span className="md:hidden">AIでどう増幅できるかをお話しします。</span>
            </motion.h2>

            {/* Gold line */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="gold-divider max-w-xs mx-auto mb-8"
            />

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href={GOODTIME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-navy w-full sm:w-auto text-[13px] py-3.5 px-8 tracking-[0.2em]"
              >
                無料相談を予約する（30分）
              </a>
              <a
                href={RESOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline w-full sm:w-auto text-[13px] py-3.5 px-8 tracking-[0.2em]"
              >
                資料をダウンロードする
              </a>
            </motion.div>

            {/* Sub note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              viewport={{ once: true }}
              className="text-ink-400 text-[11px] font-serif-jp tracking-[0.1em] mt-6"
            >
              3営業日以内にご返信いたします。まずはお気軽にどうぞ。
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
