'use client';

import { motion } from 'framer-motion';
import { Users, TrendingDown, BarChart3, AlertTriangle } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-[#0A0A0A] py-24 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span
            className="text-[#00E676] text-xs tracking-[0.3em] uppercase font-bold"
            style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
          >
            THE PROBLEM
          </span>
          <h2
            className="text-3xl lg:text-4xl font-bold mt-4 mb-12 leading-tight"
            style={{ fontFamily: 'var(--font-noto-serif-jp, serif)' }}
          >
            日本のホテルが毎日<br />垂れ流している3つの機会損失
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* CARD A — 人手不足 (wide) */}
          <motion.div
            className="md:col-span-2 card-dark rounded-2xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className="absolute top-0 left-0 w-48 h-48 rounded-full opacity-5 blur-3xl"
              style={{ background: 'radial-gradient(circle, #ff4d4d, transparent)' }}
            />
            <Users size={32} className="mb-4" style={{ color: 'rgba(255,100,100,0.7)' }} />
            <span
              className="text-8xl font-bold text-white block leading-none"
              style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
            >
              71.1%
            </span>
            <p
              className="text-white/60 font-medium mt-3 mb-2"
              style={{ fontFamily: 'var(--font-noto-sans-jp, sans-serif)' }}
            >
              ホテル・旅館業の人材不足率（全業種ワースト1位）
            </p>
            <p
              className="text-white/40 text-sm"
              style={{ fontFamily: 'var(--font-noto-sans-jp, sans-serif)' }}
            >
              フロントスタッフが足りず、追加提案をする余裕が物理的に存在しない。
              チェックイン対応だけで手一杯な現場では、アップセルは諦めるしかない。
            </p>
          </motion.div>

          {/* CARD B — 機会損失 */}
          <motion.div
            className="card-dark rounded-2xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <TrendingDown size={32} className="mb-4" style={{ color: 'rgba(0,230,118,0.7)' }} />
            <span
              className="text-5xl font-bold block leading-none"
              style={{ fontFamily: 'var(--font-dm-mono, monospace)', color: '#00E676' }}
            >
              ¥2,040億
            </span>
            <p className="text-white/60 font-medium mt-3 mb-2 text-sm">
              インバウンドが毎年垂れ流している機会損失
            </p>
            <p className="text-white/40 text-xs leading-relaxed">
              フロントでの口頭アップセル成功率はわずか1〜3%。
              予約後72時間が完全に放置されている。
            </p>
          </motion.div>

          {/* CARD C — 成功率格差 */}
          <motion.div
            className="card-dark rounded-2xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <BarChart3 size={32} className="mb-4" style={{ color: 'rgba(0,230,118,0.7)' }} />
            <div className="flex items-end gap-4 my-4">
              <div>
                <span
                  className="text-3xl text-white/30 font-bold"
                  style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
                >
                  1〜3%
                </span>
                <p className="text-white/30 text-xs mt-1">新規客への販売成功率</p>
              </div>
              <div className="text-white/20 text-2xl pb-5">→</div>
              <div>
                <span
                  className="text-5xl font-bold"
                  style={{ fontFamily: 'var(--font-dm-mono, monospace)', color: '#00E676' }}
                >
                  60〜70%
                </span>
                <p className="text-xs mt-1" style={{ color: 'rgba(0,230,118,0.6)' }}>
                  既存予約客への販売成功率
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm border-t border-white/10 pt-4">
              → 日本のホテルは最も買ってくれる顧客を放置している
            </p>
          </motion.div>

          {/* CARD D — 物理的限界 (wide) */}
          <motion.div
            className="md:col-span-2 card-dark rounded-2xl p-8 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <AlertTriangle size={32} className="mb-4" style={{ color: 'rgba(255,100,100,0.7)' }} />
            <div
              className="text-xl font-bold mb-2"
              style={{ fontFamily: 'var(--font-dm-mono, monospace)' }}
            >
              <span className="text-white">約80件/日</span>
              <span className="text-white/30 mx-2">×</span>
              <span className="text-white">3分/件</span>
              <span className="text-white/30 mx-2">=</span>
              <span style={{ color: '#00E676' }}>240分（4時間）の追加業務</span>
            </div>
            <p className="text-white/50 text-sm mb-6">
              ⚠️ フロントスタッフ2〜3名では対応不可能。アップセルに割けるリソースがゼロ。
            </p>
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/50 text-xs font-medium mb-1">今の選択肢①：提案をあきらめる</p>
                <p className="text-white font-bold">追加収益 ¥0</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white/50 text-xs font-medium mb-1">今の選択肢②：人を増やす</p>
                <p className="text-white font-bold">月¥25〜35万/1名</p>
                <p className="text-white/40 text-xs mt-1">+ そもそも採用できない</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
