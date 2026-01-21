import Link from 'next/link'
import Image from 'next/image'
import { newsItems } from '@/lib/newsData'
import ScrollAnimation from '@/components/ScrollAnimation'

export default function Home() {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section - IMA風大胆デザイン */}
      <section className="relative isolate min-h-[85vh] md:min-h-screen flex items-center">
        {/* 雫アニメーション - モバイルでは非表示 */}
        <div className="droplets-container hidden md:block">
          {/* 一つの雫 */}
          <div className="single-droplet" style={{ left: '12%', top: '22%' }} />
          {/* ゆったり広がる波紋（3重） */}
          <div className="gentle-ripple" style={{ left: '12%', top: '22%' }} />
          <div className="gentle-ripple-2" style={{ left: '12%', top: '22%' }} />
          <div className="gentle-ripple-3" style={{ left: '12%', top: '22%' }} />
        </div>

        {/* モバイル用背景画像（全面にドーンと敷く） */}
        <div className="md:hidden absolute inset-0 -z-10 overflow-hidden">
          <Image src="/1.png" alt="" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-white/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/90" />
        </div>

        {/* 背景のグリーンサークル装飾 - 右上（画像入り）デスクトップのみ */}
        <div className="pointer-events-none absolute -z-10 top-0 right-0 w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full translate-x-1/4 -translate-y-1/4 overflow-hidden hidden md:block">
          <Image src="/3.png" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-white/70" />
          <div className="absolute inset-0 bg-gappy-green/20" />
        </div>
        {/* 背景のグリーンサークル装飾 - 左下 */}
        <div className="pointer-events-none absolute -z-10 bottom-0 left-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-gappy-green rounded-full -translate-x-1/2 translate-y-1/3 opacity-10 hidden md:block" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-20 w-full">
          {/* モバイル: テキストのみ中央配置 / デスクトップ: 2カラム */}
          <div className="md:grid md:grid-cols-2 md:gap-12 md:items-center">
            {/* テキストエリア */}
            <div className="space-y-5 md:space-y-8 text-center md:text-left">
              <div className="space-y-3 md:space-y-4">
                <p className="text-gappy-green font-bold text-xs md:text-lg tracking-widest uppercase animate-fade-in-up">
                  Gap-time AI for Travelers
                </p>
                <h1 className="hero-title text-gappy-dark animate-fade-in-up animate-delay-100">
                  <span className="inline-block">旅の<span className="text-gappy-green">"隙間"</span>を、</span>
                  <br />
                  <span className="inline-block">価値に変える。</span>
                </h1>
              </div>
              
              <p className="text-base md:text-xl lg:text-2xl text-gray-600 leading-relaxed animate-fade-in-up animate-delay-200">
                15〜120分の隙間時間に特化した
                <br className="md:hidden" />
                旅ナカAIツール。
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in-up animate-delay-300 justify-center md:justify-start">
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gappy-green text-gappy-dark px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg text-center hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover-lift"
                >
                  資料請求
                </Link>
                <Link
                  href="/solutions"
                  className="bg-gappy-dark text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-bold text-base md:text-lg text-center hover:bg-opacity-90 transition-all"
                >
                  Solutionをみる
                </Link>
              </div>
            </div>

            {/* 右側：円形イメージ + 周りに画像（デスクトップのみ表示） */}
            <div className="hidden md:flex relative justify-end animate-fade-in-up animate-delay-200">
              <div className="relative">
                {/* メイン円形 - 画像入り（真円固定） */}
                <div className="relative aspect-square w-[350px] lg:w-[450px] xl:w-[500px] rounded-full bg-gappy-green flex items-center justify-center glow-green overflow-hidden">
                  <Image src="/1.png" alt="旅行イメージ" fill className="object-cover" />
                </div>

                {/* 小さな装飾円 - 画像2 */}
                <div className="absolute -top-4 -left-4 w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-xl border-4 border-gappy-dark">
                  <Image src="/2.png" alt="旅行イメージ2" fill className="object-cover" />
                  </div>

                {/* 右下の円 - 画像4 */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden shadow-xl border-4 border-gappy-green">
                  <Image src="/4.png" alt="旅行イメージ4" fill className="object-cover" />
                </div>

                {/* 左下の円 - 画像5 */}
                <div className="absolute -bottom-8 left-12 w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden shadow-xl border-4 border-white">
                  <Image src="/5.png" alt="旅行イメージ5" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* What we do Section - グリーン背景 */}
      <section className="py-16 md:py-24 lg:py-32 bg-gappy-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in">
            <div className="mb-10 md:mb-16 text-center md:text-left">
              <p className="text-gappy-dark/60 font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">What we do</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gappy-dark leading-tight">
                インバウンドの
                <br />
                「隙間時間」を、
                <br />
                価値あるコト体験に。
              </h2>
            </div>
          </ScrollAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ScrollAnimation animation="fade-in" delay={100}>
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 h-full shadow-lg
                            transform -rotate-2 hover:rotate-0 hover:scale-105 hover:shadow-2xl
                            transition-all duration-300 ease-out">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gappy-dark rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-gappy-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gappy-dark mb-3 md:mb-4">Gappy Platform</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  その場で行ける体験を、チャットで提案する旅ナカAI。現在地・時間帯・同行者・予算・気分を理解し、「いま行ける」候補をレコメンド。
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" delay={200}>
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 h-full shadow-lg
                            transform rotate-1 hover:rotate-0 hover:scale-105 hover:shadow-2xl
                            transition-all duration-300 ease-out md:translate-y-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gappy-dark rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-gappy-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gappy-dark mb-3 md:mb-4">Gappy for Partners</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  ホテル・交通・商業施設・DMO向けのAPI / ウィジェット / QRソリューション。既存タッチポイントにGappyを組み込み、行動を促進。
                </p>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" delay={300}>
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 h-full shadow-lg
                            transform -rotate-1 hover:rotate-0 hover:scale-105 hover:shadow-2xl
                            transition-all duration-300 ease-out">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gappy-dark rounded-xl md:rounded-2xl mb-4 md:mb-6 flex items-center justify-center">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-gappy-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gappy-dark mb-3 md:mb-4">Gappy Insight</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  行動データ × 旅行動機データをもとに、エリアごとの"旅ナカの中身"を可視化。回遊・滞在時間延長の施策設計を支援。
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Why Gappy Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <ScrollAnimation animation="fade-left">
              <div className="text-center lg:text-left">
                <p className="text-gappy-green font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">Why Gappy?</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gappy-dark mb-6 md:mb-8 leading-tight">
                  既存の地図・ガイド・OTAと、
                  <br />
                  何が違うのか。
                </h2>
                <ul className="space-y-4 md:space-y-6 text-left">
                  <li className="flex items-start gap-3 md:gap-4">
                    <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gappy-green rounded-full flex items-center justify-center text-gappy-dark font-bold text-lg md:text-xl">1</span>
                    <div>
                      <p className="text-lg md:text-xl font-bold text-gappy-dark mb-1 md:mb-2">場所ではなく、"コト"を示す</p>
                      <p className="text-sm md:text-base text-gray-600">地図は「場所」を示す。Gappyは、15〜120分で"いま実行できるコト（体験）"を示す。</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 md:gap-4">
                    <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gappy-green rounded-full flex items-center justify-center text-gappy-dark font-bold text-lg md:text-xl">2</span>
                    <div>
                      <p className="text-lg md:text-xl font-bold text-gappy-dark mb-1 md:mb-2">隙間時間に最適化</p>
                      <p className="text-sm md:text-base text-gray-600">事前計画や予約ではなく、滞在中の隙間時間の意思決定に最適化。</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 md:gap-4">
                    <span className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gappy-green rounded-full flex items-center justify-center text-gappy-dark font-bold text-lg md:text-xl">3</span>
                    <div>
                      <p className="text-lg md:text-xl font-bold text-gappy-dark mb-1 md:mb-2">データが循環する</p>
                      <p className="text-sm md:text-base text-gray-600">体験提案から行動データまでが循環し、回遊・滞在時間延長・分散観光の施策改善につながる。</p>
                    </div>
                  </li>
                </ul>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="scale-in">
              <div className="relative order-first lg:order-last">
                <div className="aspect-square max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] mx-auto">
                  <div className="absolute inset-0 bg-gappy-green rounded-full opacity-20" />
                  <div className="absolute inset-6 md:inset-8 bg-gappy-green rounded-full opacity-40" />
                  <div className="absolute inset-12 md:inset-16 bg-gappy-green rounded-full flex items-center justify-center">
                    <div className="text-center text-gappy-dark">
                      <p className="text-3xl sm:text-4xl md:text-5xl font-black">Gap</p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold">↓</p>
                      <p className="text-3xl sm:text-4xl md:text-5xl font-black">Value</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Products Section - 斜めデザイン */}
      <section className="relative bg-white overflow-hidden">
        {/* 斜めの黒背景 */}
        <div 
          className="absolute inset-0 bg-gappy-dark origin-center"
          style={{ 
            clipPath: 'polygon(0 8%, 100% 0%, 100% 92%, 0% 100%)',
          }}
        />

        {/* 右上の余白に装飾文字 */}
        <div className="hidden md:block absolute right-8 lg:right-16 top-24 lg:top-32 pointer-events-none">
          <span className="text-5xl lg:text-6xl xl:text-7xl font-black text-gappy-green/20 tracking-widest select-none">
            PRODUCTS
          </span>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 lg:py-28 text-white">
          <ScrollAnimation animation="fade-in">
            <div className="mb-8 md:mb-12 text-center md:text-left">
              <p className="text-gappy-green font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">Products</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Gappyが提供する
                <br />
                プロダクト。
              </h2>
            </div>
          </ScrollAnimation>
          
          {/* デスクトップ: 右肩上がり配置 - 左から順番にスライドイン */}
          <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 items-start">
            <ScrollAnimation animation="fade-right" delay={0}>
              <div className="group transform translate-y-12">
                <div className="bg-white/5 backdrop-blur p-6 lg:p-8 border border-white/10 hover:border-gappy-green transition-all hover:-translate-y-2 duration-300"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gappy-green mb-6 lg:mb-8 flex items-center justify-center"
                       style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <span className="text-gappy-dark font-black text-xl lg:text-2xl">toC</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Gappy Platform</h3>
                  <p className="text-sm lg:text-base text-gray-300 leading-relaxed mb-4 lg:mb-6">
                    訪日旅行者向けの旅ナカAIアプリ / Web。チャットで条件を伝えるだけで、「いま・ここから」15〜120分で楽しめるローカルなコト体験が見つかります。
                  </p>
                  <Link href="/solutions/platform" className="inline-flex items-center text-gappy-green font-bold text-sm lg:text-base group-hover:underline">
                    詳しく見る
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-right" delay={200}>
              <div className="group transform translate-y-6">
                <div className="bg-white/5 backdrop-blur p-6 lg:p-8 border border-white/10 hover:border-gappy-green transition-all hover:-translate-y-2 duration-300"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gappy-green mb-6 lg:mb-8 flex items-center justify-center"
                       style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <span className="text-gappy-dark font-black text-xl lg:text-2xl">toB</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Gappy for Partners</h3>
                  <p className="text-sm lg:text-base text-gray-300 leading-relaxed mb-4 lg:mb-6">
                    宿泊、交通、商業施設、DMO向けのEmbed / QR / サイネージ / APIパッケージ。旅ナカの回遊・滞在延長と、多言語対応の負担軽減を同時に実現。
                  </p>
                  <Link href="/solutions/partners" className="inline-flex items-center text-gappy-green font-bold text-sm lg:text-base group-hover:underline">
                    詳しく見る
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-right" delay={400}>
              <div className="group">
                <div className="bg-white/5 backdrop-blur p-6 lg:p-8 border border-white/10 hover:border-gappy-green transition-all hover:-translate-y-2 duration-300"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}>
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gappy-green mb-6 lg:mb-8 flex items-center justify-center"
                       style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <span className="text-gappy-dark font-black text-lg lg:text-xl">Data</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4">Gappy Insight / Studio</h3>
                  <p className="text-sm lg:text-base text-gray-300 leading-relaxed mb-4 lg:mb-6">
                    検索・保存・予約・行動データに基づくダッシュボードとレポートで、訪日客のコト消費トレンドや来訪パターンを可視化。
                  </p>
                  <Link href="/solutions/insight" className="inline-flex items-center text-gappy-green font-bold text-sm lg:text-base group-hover:underline">
                    詳しく見る
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* モバイル: 縦並び */}
          <div className="md:hidden space-y-4">
            <ScrollAnimation animation="fade-in" delay={100}>
              <div className="group">
                <div className="bg-white/5 backdrop-blur p-6 border border-white/10"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)' }}>
                  <div className="w-14 h-14 bg-gappy-green mb-5 flex items-center justify-center"
                       style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <span className="text-gappy-dark font-black text-lg">toC</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Gappy Platform</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    訪日旅行者向けの旅ナカAIアプリ / Web。チャットで条件を伝えるだけで、「いま・ここから」15〜120分で楽しめるローカルなコト体験が見つかります。
                  </p>
                  <Link href="/solutions/platform" className="inline-flex items-center text-gappy-green font-bold text-sm">
                    詳しく見る
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" delay={200}>
              <div className="group">
                <div className="bg-white/5 backdrop-blur p-6 border border-white/10"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)' }}>
                  <div className="w-14 h-14 bg-gappy-green mb-5 flex items-center justify-center"
                       style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <span className="text-gappy-dark font-black text-lg">toB</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Gappy for Partners</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    宿泊、交通、商業施設、DMO向けのEmbed / QR / サイネージ / APIパッケージ。旅ナカの回遊・滞在延長と、多言語対応の負担軽減を同時に実現。
                  </p>
                  <Link href="/solutions/partners" className="inline-flex items-center text-gappy-green font-bold text-sm">
                    詳しく見る
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="fade-in" delay={300}>
              <div className="group">
                <div className="bg-white/5 backdrop-blur p-6 border border-white/10"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)' }}>
                  <div className="w-14 h-14 bg-gappy-green mb-5 flex items-center justify-center"
                       style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <span className="text-gappy-dark font-black text-base">Data</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Gappy Insight / Studio</h3>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    検索・保存・予約・行動データに基づくダッシュボードとレポートで、訪日客のコト消費トレンドや来訪パターンを可視化。
                  </p>
                  <Link href="/solutions/insight" className="inline-flex items-center text-gappy-green font-bold text-sm">
                    詳しく見る
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Projects / PoC Section - 中央集約型デザイン */}
      <section className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in">
            <div className="text-center mb-10 md:mb-16">
              <p className="text-gappy-green font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">Projects / PoC</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gappy-dark leading-tight">
                共創パートナーとの
                <br />
                実証・プロジェクト
              </h2>
            </div>
          </ScrollAnimation>
          
          {/* デスクトップ: 中央ハブ + 三角配置 */}
          <div className="hidden lg:flex flex-col items-center gap-8">
            {/* 上段: 中央ハブ */}
            <ScrollAnimation animation="scale-in">
              <div className="w-28 h-28 bg-gappy-dark rounded-full flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <p className="text-gappy-green font-black text-lg">Gappy</p>
                  <p className="text-white/60 text-xs">共創</p>
                </div>
              </div>
            </ScrollAnimation>

            {/* 接続線 */}
            <div className="flex items-center justify-center gap-32 -mt-4">
              <div className="w-px h-12 bg-gradient-to-b from-gappy-green/50 to-transparent rotate-[30deg]" />
              <div className="w-px h-16 bg-gradient-to-b from-gappy-green/50 to-transparent" />
              <div className="w-px h-12 bg-gradient-to-b from-gappy-green/50 to-transparent -rotate-[30deg]" />
            </div>

            {/* 下段: 3つのパートナーカード */}
            <div className="grid grid-cols-3 gap-8 w-full max-w-5xl -mt-4">
              <ScrollAnimation animation="fade-in" delay={100}>
                <div className="group">
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-gappy-green hover:shadow-xl transition-all duration-300 text-center h-full">
                    <div className="w-16 h-16 bg-gappy-green rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-gappy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gappy-dark mb-2">観光局・DMO</h3>
                    <p className="text-sm text-gray-600">旅ナカAIと行動データで、回遊・滞在時間延長・分散観光を検証。</p>
                  </div>
                </div>
              </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={200}>
                <div className="group">
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-gappy-green hover:shadow-xl transition-all duration-300 text-center h-full">
                    <div className="w-16 h-16 bg-gappy-green rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-gappy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gappy-dark mb-2">ホテル・ホステル</h3>
                    <p className="text-sm text-gray-600">フロント・客室・予約導線にGappyを組み込み、周辺体験へ転換。</p>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in" delay={300}>
                <div className="group">
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-gappy-green hover:shadow-xl transition-all duration-300 text-center h-full">
                    <div className="w-16 h-16 bg-gappy-green rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-gappy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gappy-dark mb-2">交通・商業施設</h3>
                    <p className="text-sm text-gray-600">駅・館内・メディアを活用したテーマ特化の共同企画を実施。</p>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>

          {/* タブレット・モバイル: タイムライン風レイアウト */}
          <div className="lg:hidden">
            {/* 中央のGappyハブ */}
            <ScrollAnimation animation="scale-in">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-gappy-dark rounded-full flex items-center justify-center shadow-xl">
                  <div className="text-center">
                    <p className="text-gappy-green font-black text-sm">Gappy</p>
                    <p className="text-white/60 text-[10px]">共創</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <div className="space-y-4">
              <ScrollAnimation animation="fade-in" delay={100}>
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 hover:border-gappy-green transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gappy-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gappy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gappy-dark">観光局・DMO</h3>
                      <p className="text-sm text-gray-600">旅ナカAIと行動データで、回遊・滞在時間延長・分散観光を検証。</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

              <ScrollAnimation animation="fade-in" delay={200}>
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 hover:border-gappy-green transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gappy-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gappy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gappy-dark">ホテル・ホステル</h3>
                      <p className="text-sm text-gray-600">フロント・客室・予約導線にGappyを組み込み、周辺体験へ転換。</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={300}>
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 hover:border-gappy-green transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gappy-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gappy-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gappy-dark">交通・商業施設</h3>
                      <p className="text-sm text-gray-600">駅・館内・メディアを活用したテーマ特化の共同企画を実施。</p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
              </div>
          </div>
        </div>
      </section>

      {/* Mission Section - グリーン背景 */}
      <section className="py-16 md:py-24 lg:py-32 bg-gappy-green">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation animation="scale-in">
            <p className="text-gappy-dark/60 font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">Our Mission</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gappy-dark mb-6 md:mb-8 leading-tight">
              旅の"隙間時間"から、
              <br />
              街の価値をひらく。
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gappy-dark/80 leading-relaxed">
              予約サイトやガイドでは拾いきれない「ちょっとした時間」と「ちょっとした場所」。
              私たちは、その余白にこそ街の多様性と可能性が宿ると考えます。
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-in">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 md:mb-12">
              <div className="text-center md:text-left">
                <p className="text-gappy-green font-bold text-xs md:text-sm tracking-widest uppercase mb-3 md:mb-4">News</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gappy-dark">最新情報</h2>
              </div>
              <Link href="/news" className="mt-4 md:mt-0 inline-flex items-center justify-center md:justify-start text-gappy-dark font-bold hover:text-gappy-green transition-colors text-sm md:text-base">
                すべて見る
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </ScrollAnimation>
          
          <div className="space-y-3 md:space-y-4">
            {newsItems.slice(0, 3).map((item, index) => (
              <ScrollAnimation key={index} animation="fade-in" delay={(index + 1) * 100 as 100 | 200 | 300}>
                <Link 
                  href="/news" 
                  className="block bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 hover:bg-gappy-green/5 transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <p className="text-xs md:text-sm text-gray-500 font-medium md:w-32 flex-shrink-0">{item.date}</p>
                    <span className="inline-block px-3 md:px-4 py-1 bg-gappy-green/10 text-gappy-green text-xs md:text-sm font-bold rounded-full w-fit">
                      {item.category}
                    </span>
                    <p className="text-base md:text-lg lg:text-xl text-gappy-dark font-medium group-hover:text-gappy-green transition-colors flex-1 mt-1 md:mt-0">
                      {item.title}
                    </p>
                    <svg className="w-6 h-6 text-gray-300 group-hover:text-gappy-green group-hover:translate-x-1 transition-all hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-gappy-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation animation="fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 leading-tight">
              PoC・共創プロジェクトの
              <br />
              ご相談
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12">
              観光局・DMO、宿泊、交通、商業施設の担当者の方へ。
              <br className="hidden md:block" />
              まずはお気軽にお問い合わせください。
            </p>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gappy-green text-gappy-dark px-8 md:px-12 py-4 md:py-6 rounded-full font-bold text-base md:text-xl hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl hover-lift"
            >
              お問い合わせ
            </Link>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}
