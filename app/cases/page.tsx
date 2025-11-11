'use client'

import Link from 'next/link'

export default function Cases() {

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gappy-dark mb-6">Cases</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">導入事例・PoC</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700">
            旅ナカAIの実装からデータ活用まで。現場での検証と成果をご紹介します。
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-2xl md:text-3xl font-semibold text-gappy-dark mb-4">導入実績は現在準備中です</p>
          <p className="text-lg text-gray-600 mb-8">公開までしばらくお待ちください。</p>
          <span className="inline-block uppercase tracking-widest text-gappy-dark bg-gappy-green/10 border border-gappy-green rounded-full px-6 py-3 font-semibold">
            Coming Soon
          </span>
        </div>
      </section>

      {/* PoC Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-4">PoCの進め方</h2>
            <p className="text-lg text-gray-600">スモールスタートから、段階的に拡大</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-12 h-12 bg-gappy-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-bold text-gappy-dark mb-3">ヒアリング・設計</h3>
              <p className="text-gray-600 text-sm">
                課題・KPI・既存導線を整理し、最適な実装方法とデータ取得設計を行います。
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-12 h-12 bg-gappy-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-bold text-gappy-dark mb-3">実装・検証準備</h3>
              <p className="text-gray-600 text-sm">
                Embed / QR / サイネージなど、現場導線に合わせて実装。データ計測環境を整備。
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-12 h-12 bg-gappy-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-bold text-gappy-dark mb-3">運用・データ蓄積</h3>
              <p className="text-gray-600 text-sm">
                一定期間の運用で、検索・保存・行動データを蓄積。定期レポートで傾向を共有。
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="w-12 h-12 bg-gappy-green rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              <h3 className="text-lg font-bold text-gappy-dark mb-3">効果検証・展開</h3>
              <p className="text-gray-600 text-sm">
                KPI達成状況を分析し、本格展開や継続施策への移行を検討。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-6">
            事例の詳細資料をご希望の方は
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            守秘義務の範囲内で、より詳細な成果データや導入プロセスをご共有いたします。
          </p>
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gappy-green text-gappy-dark px-10 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            お問い合わせ
          </Link>
        </div>
      </section>
    </div>
  )
}
