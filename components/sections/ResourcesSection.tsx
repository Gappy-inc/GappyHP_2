'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const RESOURCE_URL = 'https://forms.gle/NUgbw2pFFrmoLtsv5';

const books = [
  {
    img: '/book-1-inbound.png',
    title: 'インバウンド集客・販促戦略ガイド',
    desc: '市場動向・OTA活用・チャネル最適化まで、成果につながる集客施策を体系的に解説。',
  },
  {
    img: '/book-2-multilingual.png',
    title: '多言語×AIおもてなし実践ガイド',
    desc: 'AI翻訳・チャットボット・レビュー対応など、多言語対応の品質と効率を両立する方法を紹介。',
  },
  {
    img: '/book-3-upsell.png',
    title: '客単価を上げるアップセル戦略ガイド',
    desc: 'アップセルの設計・提案・オファー最適化まで、宿の収益力を高める実践ノウハウを公開。',
  },
];

export default function ResourcesSection() {
  return (
    <section
      id="resources"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #faf8f1 0%, #fdfcf8 50%, #faf8f1 100%)' }}
    >
      {/* Subtle pattern bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-32 -z-10 opacity-[0.06] pointer-events-none" />

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
            Resources
          </p>
          <h2 className="heading-jp text-[clamp(22px,2.8vw,40px)] leading-[1.55] font-medium mb-4">
            Gappy Stay — AIで、<br />すべてのおもてなしを進化させる
          </h2>
          <p className="text-jp text-[14px] text-ink-500 max-w-lg mx-auto leading-relaxed">
            Gappy Stayの機能や導入効果をまとめたサービス資料をご覧いただけます。
          </p>
          <div className="mt-6">
            <a
              href={RESOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy inline-flex"
            >
              資料をダウンロードする
            </a>
          </div>
        </motion.div>

        {/* Book cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {books.map((book, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group transition-transform duration-500 hover:-translate-y-1 flex flex-col"
            >
              {/* Book cover */}
              <div className="relative mb-5">
                <Image
                  src={book.img}
                  alt={book.title}
                  width={340}
                  height={240}
                  className="w-full h-auto select-none drop-shadow-[0_18px_40px_rgba(11,22,50,0.12)] group-hover:drop-shadow-[0_24px_50px_rgba(11,22,50,0.2)] transition-all duration-500 rounded-lg"
                />
              </div>

              <h3 className="heading-jp text-[15px] font-medium leading-relaxed mb-2 text-navy-900">
                {book.title}
              </h3>
              <p className="text-jp text-[12px] text-ink-500 leading-[1.95] flex-1">
                {book.desc}
              </p>

              <a
                href={RESOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-5 text-[12px] tracking-[0.18em] justify-center"
              >
                ダウンロードする
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
