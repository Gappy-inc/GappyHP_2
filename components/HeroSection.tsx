import Link from 'next/link'
import Image from 'next/image'
import { SITE_NAME } from '@/lib/config'

/**
 * 左右分割のヒーローセクション
 * 
 * 構造：
 * 1. 白背景
 * 2. 右側にカーブした楕円（波形状）
 * 3. その楕円の中に画像を入れる
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* SVGクリッピングマスク定義 - カーブした楕円形状（デスクトップのみ） */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="curvedEllipse" clipPathUnits="objectBoundingBox">
            {/* 左端から始まり、上から下へ緩やかに波打つ滑らかなカーブ形状 */}
            <path d="M0,0 L1,0 L1,1 L0.65,1 C0.68,0.95 0.7,0.85 0.69,0.75 C0.68,0.65 0.67,0.55 0.68,0.45 C0.69,0.35 0.68,0.25 0.67,0.15 C0.66,0.08 0.65,0.04 0.64,0.02 L0.63,0 L0,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* 右側: カーブした楕円の中に画像（右端に配置、画面の約1/3の幅、デスクトップのみ表示） */}
      <div className="hidden lg:block absolute top-0 bottom-0 right-0 w-2/3">
        <div 
          className="absolute inset-0"
          style={{
            clipPath: 'url(#curvedEllipse)',
          }}
        >
          <Image
            src="/a.jpg"
            alt="夜の東京の都市景観"
            fill
            className="object-cover object-right"
            priority
            sizes="33vw"
          />
        </div>
      </div>

      {/* 左側: テキスト・ロゴ・CTA（約2/3の幅） */}
      <div className="relative z-10 min-h-screen flex items-center py-12 sm:py-16 md:py-20 lg:py-0">
        <div className="w-full lg:w-2/3 px-6 sm:px-8 lg:px-12 xl:px-16">
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-4 sm:mb-6 leading-tight">
            <span className="block">日本のタビナカを起点に、</span>
            <span className="block">世界のタビナカを変えていく。</span>
          </h1>
          
          {/* Description */}
          <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed">
            Gappyは、日本のタビナカから生まれた、15〜120分の隙間時間（Gap-time）に特化したAI旅ナカツールです。
            旅行者一人ひとりにちょうどフィットする「コト(体験)」を造成/レコメンドし、日本から世界中の街へ、旅の余白を新しい価値に変えていきます。
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-center hover:bg-green-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              資料請求をする
            </Link>
            <Link
              href="/solutions"
              className="bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-center border-2 border-gray-300 hover:border-gray-400 transition-all text-sm sm:text-base"
            >
              Solutionをみる
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
