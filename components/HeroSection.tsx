import Link from 'next/link'
import { SITE_NAME } from '@/lib/config'

/**
 * モダンなヒーローセクション
 * 
 * デザインコンセプト：
 * - ミニマルで洗練されたデザイン
 * - 抽象的なグラフィック要素で視覚的な興味を演出
 * - グラデーションとパターンで奥行きを表現
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-white via-green-50/30 to-white overflow-hidden">
      {/* 背景装飾 - 抽象的な円形グラフィック */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 大きな装飾円 */}
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-green-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-24 w-80 h-80 bg-green-200/30 rounded-full blur-3xl" />
        
        {/* グリッドパターン（微細） */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* 右側: 抽象的なグラフィック要素（デスクトップのみ） */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/3 pointer-events-none">
        <div className="relative h-full">
          {/* SVG装飾 - 有機的な形状 */}
          <svg
            className="absolute top-1/2 right-0 transform -translate-y-1/2"
            width="600"
            height="600"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FF7D" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#00FF7D" stopOpacity="0.05" />
                <stop offset="100%" stopColor="#00FF7D" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* 有機的な曲線パス */}
            <path
              d="M400,100 Q500,200 550,300 T600,500 Q550,550 400,550 Q200,550 100,400 T0,200 Q50,100 200,100 Q300,100 400,100 Z"
              fill="url(#heroGradient)"
              className="animate-pulse"
              style={{ animationDuration: '4s' }}
            />
            {/* 小さな装飾要素 */}
            <circle cx="500" cy="250" r="60" fill="#00FF7D" opacity="0.08" />
            <circle cx="450" cy="450" r="80" fill="#00FF7D" opacity="0.06" />
          </svg>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="relative z-10 min-h-screen flex items-center py-12 sm:py-16 md:py-20 lg:py-0">
        <div className="max-w-4xl w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium text-gray-900 mb-6 sm:mb-8 leading-tight">
            <span className="block">日本のタビナカを起点に、</span>
            <span className="block">世界のタビナカを変えていく。</span>
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 leading-relaxed max-w-3xl">
            Gappyは、日本のタビナカから生まれた、15〜120分の隙間時間（Gap-time）に特化したAI旅ナカツールです。
            旅行者一人ひとりにちょうどフィットする「コト(体験)」を造成/レコメンドし、日本から世界中の街へ、旅の余白を新しい価値に変えていきます。
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-center hover:bg-green-700 transition-all shadow-lg hover:shadow-xl text-base sm:text-lg transform hover:-translate-y-0.5"
            >
              資料請求をする
            </Link>
            <Link
              href="/solutions"
              className="bg-white text-gray-900 px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-semibold text-center border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all text-base sm:text-lg transform hover:-translate-y-0.5"
            >
              Solutionをみる
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
