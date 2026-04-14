'use client';

import { motion } from 'framer-motion';
import React from 'react';

const timelineSteps = [
  { num: 1, label: '予約前', player: '', highlight: false },
  { num: 2, label: '予約時', player: 'tripla等', highlight: false },
  { num: 3, label: '予約後〜\nチェックイン前', player: 'Gappy Stay', highlight: true },
  { num: 4, label: 'チェックイン', player: 'Canary等', highlight: false },
  { num: 5, label: '滞在中', player: 'Duve等', highlight: false },
];

export default function WhatIsSection() {
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
            PRODUCT 01
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 mb-4"
            style={{ fontFamily: 'var(--font-space-grotesk, sans-serif)' }}
          >
            Gappy Stay とは
          </h2>
          <p
            className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-4 leading-relaxed"
            style={{ fontFamily: 'var(--font-noto-serif-jp, serif)' }}
          >
            予約後〜チェックインまでの72時間を収益に変えるAI。
          </p>
          <p
            className="text-white/50 max-w-2xl leading-relaxed"
            style={{ fontFamily: 'var(--font-noto-sans-jp, sans-serif)' }}
          >
            宿泊ゲストが旅行への期待感で満たされているチェックイン7〜10日前。
            このタイミングを狙い撃ちし、アーリーチェックイン・部屋タイプアップグレード・朝食付きプランなどを
            ゲストのスマホへ母国語で自動提案。スタッフの作業ゼロで客室単価とRevPARを向上させます。
          </p>
        </motion.div>

        {/* Positioning Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <p className="text-white/40 text-sm text-center mb-8">
            「予約後〜チェックイン前」は競合不在の空白地帯
          </p>
          <div className="overflow-x-auto pb-4">
            <div className="flex items-start gap-0 min-w-max mx-auto justify-center">
              {timelineSteps.map((step, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center min-w-[100px]">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                        step.highlight
                          ? 'bg-[#00E676] text-black pulse-glow'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {step.num}
                    </div>
                    <p
                      className={`text-xs mt-2 text-center whitespace-pre-line leading-tight ${
                        step.highlight ? 'text-[#00E676] font-bold' : 'text-white/40'
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.player && (
                      <p
                        className={`text-[11px] mt-1.5 px-2 py-0.5 rounded-full border text-center ${
                          step.highlight
                            ? 'text-black bg-[#00E676] border-[#00E676]'
                            : 'text-white/30 border-white/10'
                        }`}
                      >
                        {step.player}
                      </p>
                    )}
                  </div>
                  {i < timelineSteps.length - 1 && (
                    <div className="w-12 lg:w-20 h-px bg-white/20 mt-6 mx-1 flex-shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 3 Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: '人手ゼロで稼働',
              desc: 'サイトコントローラーから予約データを自動取得。配信・決済・PMSへの反映まで全自動。スタッフは何もしなくていい。',
            },
            {
              num: '02',
              title: 'ゲスト体験を損なわない',
              desc: 'ゲストの旅行期待感が最高潮のタイミングで、母国語・最適チャネルで届ける。押しつけではなく、喜ばれる提案に。',
            },
            {
              num: '03',
              title: '初期費用¥0・成功報酬型',
              desc: '固定費ゼロ、PMS改修不要。最短1週間で稼働開始。収益が生まれてから費用が発生する、リスクゼロの導入モデル。',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="card-dark rounded-2xl p-6"
            >
              <span
                className="text-[#00E676]/50 text-xs font-bold tracking-widest"
                style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
              >
                {item.num}
              </span>
              <h3
                className="text-xl font-bold mt-3 mb-3"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
