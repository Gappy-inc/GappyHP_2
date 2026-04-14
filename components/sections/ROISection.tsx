'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(target: number, duration: number = 2, trigger: boolean = false): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [trigger, target, duration]);

  return count;
}

const bars = [
  { label: 'Gappy Stay ROI', value: 41, note: '参考: Hard Rock Hotel NY 2024年実績', color: '#00E676', pct: 100 },
  { label: '業界平均（口頭営業）', value: 3, note: '', color: 'rgba(255,255,255,0.2)', pct: 7 },
  { label: '人員追加', value: 8, note: 'コスト込み', color: 'rgba(255,255,255,0.2)', pct: 20 },
];

const competitors = ['Canary', 'Duve', 'Oaky（海外）'];
const featureRows = [
  { name: '日本語サイトコントローラー連携', gappy: '○', others: ['×', '×', '×'] },
  { name: 'LINE配信', gappy: '○', others: ['×', '×', '×'] },
  { name: '初期費用¥0', gappy: '○', others: ['×', '×', '×'] },
  { name: '日本語サポート', gappy: '○', others: ['△', '×', '×'] },
  { name: '25言語AI生成', gappy: '○', others: ['△', '△', '○'] },
];

function cellClass(val: string) {
  if (val === '○') return 'text-[#00E676]';
  if (val === '×') return 'text-red-400/70';
  if (val === '△') return 'text-yellow-400/70';
  return 'text-white/50';
}

export default function ROISection() {
  const roiRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(roiRef, { once: true, amount: 0.3 });
  const roiCount = useCountUp(1101600, 2, isInView);

  return (
    <section
      id="roi"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-16 relative overflow-hidden"
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(0,230,118,0.1)',
      }}
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-[600px] h-[600px] rounded-full opacity-5 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #00E676, transparent)' }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span
            className="text-[#00E676] tracking-widest text-xs uppercase font-bold"
            style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
          >
            ROI SIMULATION
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-5xl font-bold mt-4"
            style={{ fontFamily: 'var(--font-noto-serif-jp, serif)' }}
          >
            圧倒的な投資対効果（ROI）
          </h2>
          <p className="text-white/50 mt-2 text-sm">100室規模ホテル / 月間シミュレーション</p>
        </motion.div>

        {/* Main ROI Card */}
        <motion.div
          ref={roiRef}
          className="rounded-3xl border-2 border-[#00E676]/30 bg-[#141414] p-6 sm:p-8 lg:p-12 mt-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-white/50 text-sm mb-2">月間追加収益（試算）</p>
          <span
            className="text-5xl sm:text-6xl lg:text-8xl font-bold text-glow-green"
            style={{
              fontFamily: 'var(--font-dm-mono, monospace)',
              color: '#00E676',
              textShadow: '0 0 30px rgba(0,230,118,0.5)',
            }}
          >
            ¥{roiCount.toLocaleString()}
          </span>
          <p
            className="text-white/30 text-[10px] sm:text-xs mt-4 break-all"
            style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
          >
            100室 × 稼働率70% × アップセル転換率10% × 平均追加単価¥15,737/件 = 月間 ¥1,101,600
          </p>

          {/* Cost row */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            {[
              { label: '初期費用', value: '¥0', sub: 'PMS改修不要' },
              { label: '月額固定費', value: '¥0', sub: '成功報酬型' },
              { label: '導入期間', value: '1週間', sub: '最短' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex-1 rounded-xl border border-[#00E676]/30 bg-[#00E676]/10 p-4 text-center"
              >
                <p className="text-white/50 text-xs mb-1">{item.label}</p>
                <p
                  className="text-[#00E676] text-2xl font-bold"
                  style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
                >
                  {item.value}
                </p>
                <p className="text-white/30 text-xs mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ROI Bars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-xl font-bold mb-6">業界ベンチマーク比較</h3>
          {bars.map((bar, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/70">{bar.label}</span>
                <span
                  style={{
                    fontFamily: 'var(--font-dm-mono, monospace)',
                    color: bar.color === '#00E676' ? '#00E676' : 'white',
                  }}
                >
                  {bar.value}x{' '}
                  {bar.note && (
                    <span className="text-white/30 text-xs">({bar.note})</span>
                  )}
                </span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: bar.color }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${bar.pct}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-xl font-bold mb-6">競合比較</h3>
          <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="py-3 px-4 text-left text-white/50 font-medium">機能</th>
                  <th className="py-3 px-4 text-center font-bold" style={{ color: '#00E676' }}>
                    Gappy Stay
                  </th>
                  {competitors.map((c, i) => (
                    <th key={i} className="py-3 px-4 text-center text-white/50 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/[0.06] hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-3 px-4 text-white/70">{row.name}</td>
                    <td className={`py-3 px-4 text-center font-medium ${cellClass(row.gappy)}`}>
                      {row.gappy}
                    </td>
                    {row.others.map((val, j) => (
                      <td key={j} className={`py-3 px-4 text-center ${cellClass(val)}`}>
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
