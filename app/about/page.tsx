import type { Metadata } from 'next'
import Image from 'next/image'
import { SITE_URL, SITE_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description:
    '株式会社Gappy（ギャッピー）について。旅の余白から、街の価値をひらく。代表からのメッセージ、チーム紹介、会社情報をご覧いただけます。',
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description:
      '株式会社Gappy（ギャッピー）について。旅の余白から、街の価値をひらく。代表からのメッセージ、チーム紹介、会社情報をご覧いただけます。',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
}

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gappy-dark mb-6">About</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">株式会社Gappyについて</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-4">Mission</h2>
            <p className="text-2xl text-gappy-green font-semibold mb-6">
              旅の余白から、街の価値をひらく。
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 md:p-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              予約サイトやガイドでは拾いきれない「ちょっとした時間」と「ちょっとした場所」。私たちは、その余白にこそ街の多様性と可能性が宿ると考えます。Gappyは、訪日客一人ひとりの滞在中の意思決定を支え、ローカルな体験が選ばれるきっかけをつくる。旅ナカのインフラとして、日本から世界へ広げていきます。
            </p>
          </div>
        </div>
      </section>

      {/* Representative Message Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-4">代表メッセージ</h2>
          </div>
          <div className="bg-white rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* 顔写真 */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-40 h-52 md:w-48 md:h-64 rounded-2xl bg-gray-200 overflow-hidden border-4 border-gappy-green">
                  <Image
                    src="/CEO.jpg"
                    alt="代表取締役 浅野 充輝"
                    width={192}
                    height={256}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              {/* メッセージ */}
              <div className="flex-1">
                <p className="text-xl text-gappy-dark font-semibold leading-relaxed mb-6">口コミの次は、"いま・ここ・気分"で決める時代へ。</p>
                <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                  <p>
                    日本には世界に誇れる文化資本がありながら、それが旅先で生まれる15〜120分の"すきま時間"には十分届いていないと感じてきました。
                  </p>
                  <p>
                    Gappyは、AIとデータを活用して、訪日旅行者の「いま・ここ・誰と・気分」に合わせてコト体験を提案し、その行動データを地域や事業者に還元するプラットフォームです。旅行者には新しい発見を、街には回遊・滞在時間延長・分散観光という価値を生み出していきます。
                  </p>
                  <p>日本のタビナカを起点に、世界の旅ナカをアップデートする。</p>
                  <p>その挑戦を、Gappyは日本から本気で進めていきます。</p>
                </div>
                <div className="mt-8 text-right">
                  <p className="text-base text-gray-600">株式会社Gappy</p>
                  <p className="text-lg text-gappy-dark font-semibold">代表取締役　浅野 充輝</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we build Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-6">What we build</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold text-gappy-dark mb-4">旅ナカの「いま・ここ」に最適化したAI</h3>
              <p className="text-gray-600 leading-relaxed">
                事前計画ではなく、滞在中の瞬間瞬間で「いま実行できる体験」を提案。現在地・時間帯・営業状況・天候・移動手段などをリアルタイムに理解し、旅行者の意思決定を支援します。
              </p>
            </div>
            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold text-gappy-dark mb-4">街・事業者のための行動データ基盤</h3>
              <p className="text-gray-600 leading-relaxed">
                検索・保存・行動データを蓄積・可視化し、回遊促進・滞在延長・分散観光の施策設計と効果検証を支援。旅ナカの「見えなかった需要」を明らかにします。
              </p>
            </div>
            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold text-gappy-dark mb-4">現場導線への柔軟な組み込み</h3>
              <p className="text-gray-600 leading-relaxed">
                Web埋め込み、QR、サイネージ、APIなど、既存のタッチポイントに合わせて実装。ホテル・交通・商業施設・DMOそれぞれの導線で、旅ナカAIを活用できます。
              </p>
            </div>
            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold text-gappy-dark mb-4">共創プロジェクトによる伴走</h3>
              <p className="text-gray-600 leading-relaxed">
                データ提供だけでなく、施策設計から実行、検証までを共に進める共創スタイル。エリアやテーマに合わせた継続的な改善をサポートします。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-6">Company</h2>
          </div>
          <div className="bg-white rounded-xl p-8 md:p-12">
            <dl className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <dt className="text-sm font-semibold text-gray-500 mb-2">会社名</dt>
                <dd className="text-lg text-gappy-dark">株式会社Gappy（ギャッピー）</dd>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <dt className="text-sm font-semibold text-gray-500 mb-2">所在地</dt>
                <dd className="text-lg text-gappy-dark">
                  〒150-0043 東京都渋谷区道玄坂1丁目10番8号 渋谷道玄坂東急ビル2F
                </dd>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <dt className="text-sm font-semibold text-gray-500 mb-2">代表取締役</dt>
                <dd className="text-lg text-gappy-dark">浅野 充輝</dd>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <dt className="text-sm font-semibold text-gray-500 mb-2">設立</dt>
                <dd className="text-lg text-gappy-dark">2025年</dd>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <dt className="text-sm font-semibold text-gray-500 mb-2">資本金</dt>
                <dd className="text-lg text-gappy-dark">4,003,200円</dd>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <dt className="text-sm font-semibold text-gray-500 mb-2">メール</dt>
                <dd className="text-lg text-gappy-dark">
                  <a href="mailto:mitsuki@gappy.jp" className="text-gappy-green hover:underline">
                    mitsuki@gappy.jp
                  </a>
                </dd>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <dt className="text-sm font-semibold text-gray-500 mb-2">電話</dt>
                <dd className="text-lg text-gappy-dark">
                  <a href="tel:07011853131" className="text-gappy-green hover:underline">
                    070-1185-3131
                  </a>
                </dd>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <dt className="text-sm font-semibold text-gray-500 mb-2">リンク</dt>
                <dd className="text-lg text-gappy-dark">
                  <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="text-gappy-green hover:underline">
                    {SITE_URL}
                  </a>
                </dd>
              </div>
              <div className="pb-4">
                <dt className="text-sm font-semibold text-gray-500 mb-2">事業内容</dt>
                <dd className="text-lg text-gappy-dark">
                  インバウンド旅行者向け旅ナカAIプラットフォームの開発・運営<br/>
                  観光・宿泊・交通事業者向けソリューション提供<br/>
                  旅行者行動データ分析・コンサルティング
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-6">Team</h2>
            <p className="text-lg text-gray-600">
              AI・データサイエンス・観光・UXの専門性を持つメンバーが、
              <br className="hidden md:block" />
              旅ナカの体験とデータを設計しています。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 h-full">
              <h3 className="text-xl font-bold text-gappy-dark">浅野 充輝</h3>
              <p className="text-sm text-gappy-green font-semibold mt-2">代表取締役CEO</p>
              <div className="mt-6 space-y-2 text-gray-600">
                <p className="font-semibold text-gappy-dark">役割</p>
                <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
                  <li>全体方針決定・最終判断</li>
                  <li>マーケ戦略、ターゲット設定・キャンペーン企画・インフルエンサー連携</li>
                  <li>クライアント（観光事業者や自治体等）との最終交渉</li>
                  <li>コンサルプロジェクトの全体方針・納品クオリティ管理</li>
                  <li>プラットフォームの方向性・ビジョン・UI/UX方針などの最終意思決定</li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 h-full">
              <h3 className="text-xl font-bold text-gappy-dark">三ツ谷 寛羽</h3>
              <p className="text-sm text-gappy-green font-semibold mt-2">オペレーション責任者</p>
              <div className="mt-6 space-y-2 text-gray-600">
                <p className="font-semibold text-gappy-dark">役割</p>
                <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
                  <li>留学生コミュニティを通じたテストユーザー集客</li>
                  <li>キャンペーン実施などのオペレーション全般</li>
                  <li>留学生コミュニティへの聞き込み調査・資料化</li>
                  <li>コンサル施策の実行サポート（現地調査、SNS・ウェブ活用等）</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-6">Partners</h2>
          <p className="text-lg text-gray-600 mb-8">
            観光局・DMO、宿泊、交通、商業施設など、
            <br className="hidden md:block" />
            旅ナカの体験創出に取り組むパートナーを募集しています。
          </p>
          <div className="bg-white rounded-xl p-12">
            <p className="text-gray-500">パートナーロゴ Coming soon...</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-6">
            Gappyと共に、旅ナカの未来をつくりませんか？
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            PoC・共創プロジェクトのご相談、採用に関するお問い合わせなど、お気軽にご連絡ください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gappy-green text-gappy-dark px-10 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              お問い合わせ
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
