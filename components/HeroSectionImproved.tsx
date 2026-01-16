import Image from 'next/image'

/**
 * 左右分割のヒーローセクション実装例
 * 
 * この実装では、以下の技術を使用しています：
 * 1. SVGパスで有機的な波形状を作成
 * 2. グラデーション背景
 * 3. レスポンシブレイアウト（モバイル: 縦並び、デスクトップ: 横並び）
 */

export default function HeroSectionImproved() {
  return (
    <section className="relative min-h-screen flex flex-col lg:flex-row items-stretch overflow-hidden">
      {/* Left Side - Gradient Background with Content */}
      <div className="relative z-10 w-full lg:w-2/3 bg-gradient-to-br from-teal-600 via-teal-400 to-green-100 flex items-center justify-center py-20 lg:py-0 min-h-[600px] lg:min-h-screen">
        <div className="max-w-2xl px-8 lg:px-16 relative z-10">
          {/* Logo */}
          <div className="mb-8">
            <div className="text-white/90 text-sm mb-4 font-medium">
              CAIRN インフラエンジニア特化のSES
            </div>
            {/* ロゴ画像をここに配置 */}
            <div className="text-white text-5xl font-bold mb-12">CAIRN</div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            インフラエンジニアの<br />
            これからを照らす。
          </h1>
          
          {/* Subtitle */}
          <p className="text-white/90 text-lg md:text-xl mb-12 font-light">
            FOR EVERY ENGINEER SHAPING THE UNSEEN FOUNDATIONS OF TOMORROW.
          </p>
          
          {/* Announcement Bar */}
          <div className="bg-gray-800/90 text-white px-6 py-4 rounded-lg flex items-center justify-between max-w-md backdrop-blur-sm">
            <span className="text-sm">2025.08.21</span>
            <span className="text-sm">サイトをリニューアルしました!</span>
            <span className="text-xl">+</span>
          </div>
        </div>
        
        {/* Wave SVG Divider - 右端に配置して境界線として機能 */}
        <div className="absolute right-0 top-0 bottom-0 w-40 lg:w-64 pointer-events-none">
          <svg
            className="absolute right-0 top-0 h-full w-full"
            viewBox="0 0 400 1200"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="waveGradientLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d9488" stopOpacity="1" />
                <stop offset="100%" stopColor="#86efac" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* 有機的な波形状 - 複数の曲線を組み合わせ */}
            <path
              d="M0,0 
                 C80,80 120,200 150,350 
                 C180,500 140,650 170,800 
                 C200,950 160,1100 200,1200 
                 L0,1200 Z"
              fill="url(#waveGradientLeft)"
            />
            {/* 追加の波レイヤーで深みを出す */}
            <path
              d="M0,0 
                 C60,100 100,250 130,400 
                 C160,550 120,700 150,850 
                 C180,1000 140,1150 180,1200 
                 L0,1200 Z"
              fill="url(#waveGradientLeft)"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/3 relative">
        <div className="absolute inset-0">
          {/* 画像を配置 - 実際の画像パスに置き換えてください */}
          <Image
            src="/hero-image.jpg" // 実際の画像パスに変更してください
            alt="Infrastructure Engineer working with server racks"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 0vw, 33vw"
          />
        </div>
        
        {/* 画像の左側にグラデーションオーバーレイ（波とのなじみを良くする） */}
        <div className="absolute inset-0 bg-gradient-to-l from-green-100/30 via-transparent to-transparent" />
      </div>
    </section>
  )
}

/**
 * 使用例：
 * 
 * import HeroSectionImproved from '@/components/HeroSectionImproved'
 * 
 * export default function Home() {
 *   return (
 *     <div>
 *       <HeroSectionImproved />
 *       {/* 他のセクション */}
 *     </div>
 *   )
 * }
 */

