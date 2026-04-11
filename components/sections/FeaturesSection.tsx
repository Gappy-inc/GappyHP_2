'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, MessageCircle, Globe } from 'lucide-react';

const langs = [
  '🇯🇵 日本語', '🇺🇸 English', '🇨🇳 中文', '🇰🇷 한국어', '🇫🇷 Français',
  '🇩🇪 Deutsch', '🇪🇸 Español', '🇮🇹 Italiano', '🇵🇹 Português', '🇷🇺 Русский',
  '🇹🇭 ภาษาไทย', '🇻🇳 Tiếng Việt', '🇮🇩 Bahasa', '🇲🇾 Melayu', '🇮🇳 हिंदी',
  '🇦🇪 عربي', '🇹🇷 Türkçe', '🇵🇱 Polski', '🇳🇱 Nederlands', '🇸🇪 Svenska',
  '🇩🇰 Dansk', '🇫🇮 Suomi', '🇨🇿 Čeština', '🇭🇺 Magyar', '🇦🇷 Español (AR)',
];

function FlowVisual() {
  return (
    <div className="card-dark rounded-2xl p-6">
      <div className="flex flex-col gap-3">
        {['サイトコントローラー', 'Gappy Stay AI', 'ゲストのスマホ'].map((node, i) => (
          <React.Fragment key={i}>
            <div className="rounded-xl border border-[#00E676]/20 bg-black/40 px-4 py-3 text-sm text-white/80 text-center">
              {node}
            </div>
            {i < 2 && (
              <div className="text-center text-[#00E676]/50 text-xs">↓ 自動取得 / 配信</div>
            )}
          </React.Fragment>
        ))}
        <div className="mt-4 flex gap-2 flex-wrap justify-center">
          {['初期費用 ¥0', '設定時間 1時間', '複数施設実績'].map((b) => (
            <span
              key={b}
              className="text-[10px] rounded-full border border-[#00E676]/30 bg-[#00E676]/10 text-[#00E676] px-3 py-1"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChannelsVisual() {
  return (
    <div className="card-dark rounded-2xl p-6">
      <div className="text-center mb-4">
        <div className="inline-block rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/70">
          予約データ（国籍自動判定）
        </div>
        <div className="text-white/30 text-xs my-2">↓</div>
      </div>
      <div className="flex flex-col gap-3">
        {[
          { flag: '🇯🇵', ch: 'LINE', rate: '開封率 70〜80%', note: '日本人ゲスト' },
          { flag: '🌍', ch: 'WhatsApp', rate: '開封率 98%', note: '欧米豪ゲスト' },
          { flag: '📧', ch: 'Email', rate: '開封率 35%', note: 'その他' },
        ].map((item) => (
          <div
            key={item.ch}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <div>
              <span className="text-sm text-white/80">
                {item.flag} {item.ch}
              </span>
              <p className="text-white/30 text-xs mt-0.5">{item.note}</p>
            </div>
            <span
              className="text-[#00E676] text-xs font-bold"
              style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
            >
              {item.rate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LanguagesVisual() {
  return (
    <div className="card-dark rounded-2xl p-6">
      <div className="grid grid-cols-3 gap-2">
        {langs.map((lang, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.03 }}
            viewport={{ once: true }}
            className="rounded-lg bg-white/5 border border-white/[0.05] px-2 py-1.5 text-white/60 text-[10px] text-center"
          >
            {lang}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const features = [
  {
    icon: Zap,
    title: 'PMS直接連携不要。即日導入。',
    description:
      'サイトコントローラー（TL-リンカーン・ねっぱん等）から予約データを自動取得。PMSとの直接API連携を必要とせず、複雑な改修コストをゼロに。最短1週間で稼働開始。',
    visual: 'flow' as const,
    textLeft: true,
  },
  {
    icon: MessageCircle,
    title: '電話番号で国籍を判定。最適チャネルへ自動配信。',
    description:
      '📱 日本人 → LINE（開封率 70〜80%）\n💬 欧米豪 → WhatsApp（開封率 98%）\n📧 その他 → Email\n\n国籍ごとに最もリーチする配信経路を自動選択。',
    visual: 'channels' as const,
    textLeft: false,
  },
  {
    icon: Globe,
    title: '25言語以上、母国語で自動配信。',
    description:
      '「日本語のみ」という壁を完全撤廃。ゲストの母国語でパーソナライズされたアップセルオファーを自動送信。インバウンドゲストの満足度を損なわずに収益を最大化。',
    visual: 'languages' as const,
    textLeft: true,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6 lg:px-16" style={{ background: '#111111' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-20 text-center"
        >
          <span
            className="text-[#00E676] text-xs tracking-[0.3em] uppercase font-bold"
            style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
          >
            FEATURES
          </span>
          <h2
            className="text-3xl lg:text-4xl font-bold mt-4"
            style={{ fontFamily: 'var(--font-noto-serif-jp, serif)' }}
          >
            Gappy Stayが選ばれる3つの理由
          </h2>
        </motion.div>

        <div className="flex flex-col gap-24">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            const textBlock = (
              <div className="flex flex-col justify-center">
                <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 border border-[#00E676]/20 flex items-center justify-center mb-4">
                  <IconComponent size={24} color="#00E676" />
                </div>
                <h3
                  className="text-2xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-noto-serif-jp, serif)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-white/60 leading-relaxed whitespace-pre-line text-sm"
                  style={{ fontFamily: 'var(--font-noto-sans-jp, sans-serif)' }}
                >
                  {feature.description}
                </p>
              </div>
            );

            const visualBlock =
              feature.visual === 'flow' ? (
                <FlowVisual />
              ) : feature.visual === 'channels' ? (
                <ChannelsVisual />
              ) : (
                <LanguagesVisual />
              );

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, amount: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {feature.textLeft ? (
                  <>
                    {textBlock}
                    {visualBlock}
                  </>
                ) : (
                  <>
                    <div className="order-2 lg:order-1">{visualBlock}</div>
                    <div className="order-1 lg:order-2">{textBlock}</div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
