import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/config'

const CONTACT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform'

export const metadata: Metadata = {
  title: `導入事例 | ${SITE_NAME}`,
  description: 'Gappy Stayの導入事例・PoC実績。ホテル向けAIアップセル自動化の成果をご紹介します。',
  alternates: { canonical: `${SITE_URL}/cases` },
}

const pocSteps = [
  {
    num: '1',
    title: 'ヒアリング・設計',
    desc: '施設規模・客層・既存サイトコントローラーを確認し、配信内容・タイミング・オファー設計を行います。',
  },
  {
    num: '2',
    title: '初期設定・接続',
    desc: 'サイトコントローラーとの連携設定（約1時間）。PMS改修不要。LINE/WhatsApp配信アカウントを準備。',
  },
  {
    num: '3',
    title: '配信開始・効果測定',
    desc: 'チェックイン7〜10日前に自動配信スタート。開封率・転換率・追加収益をダッシュボードでリアルタイム確認。',
  },
  {
    num: '4',
    title: '改善・本格展開',
    desc: 'オファー内容・配信タイミングをデータ基に最適化。成果確認後に複数施設・複数オファーへ拡大。',
  },
]

export default function Cases() {
  return (
    <div className="bg-[#0A0A0A] text-white">

      {/* Hero */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#00E676] text-xs font-bold tracking-[0.3em] uppercase mb-4">CASES</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">導入事例・PoC</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            現在3施設でPoC実施中。順次公開予定です。
          </p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block rounded-2xl border border-[#00E676]/30 bg-[#00E676]/5 px-8 py-6 mb-8">
            <p className="text-[#00E676] text-sm font-bold tracking-widest uppercase mb-2">PoC 実施中</p>
            <p className="text-3xl font-bold">3施設 同時展開中</p>
          </div>
          <p className="text-white/50 text-lg mb-4">
            詳細な導入事例・成果データは現在準備中です。<br />
            守秘義務の範囲内で、個別にご共有いたします。
          </p>
          <p className="text-white/30 text-sm">
            参考実績: Hard Rock Hotel New York — ROI 41x（2024年）
          </p>
        </div>
      </section>

      {/* PoC Process */}
      <section className="py-24 border-t border-white/[0.06]" style={{ background: '#111111' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#00E676] text-xs font-bold tracking-[0.3em] uppercase mb-4">PROCESS</p>
            <h2 className="text-3xl md:text-4xl font-bold">PoCの進め方</h2>
            <p className="text-white/40 mt-3">最短1週間で配信開始。スモールスタートから段階的に拡大</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pocSteps.map((step) => (
              <div key={step.num} className="card-dark rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-[#00E676] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-black font-bold text-lg">{step.num}</span>
                </div>
                <h3 className="text-base font-bold mb-3">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            事例の詳細資料をご希望の方は
          </h2>
          <p className="text-white/50 text-lg mb-10">
            守秘義務の範囲内で、成果データや導入プロセスをご共有いたします。<br />
            まずはお気軽にご連絡ください。
          </p>
          <Link
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#00E676] text-black px-10 py-4 rounded-lg font-bold text-lg hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] transition-all"
          >
            お問い合わせ / 資料請求
          </Link>
        </div>
      </section>

    </div>
  )
}
