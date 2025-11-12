import Link from 'next/link'

export default function Insight() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/solutions" className="text-gappy-green hover:underline mb-4 inline-block">
            ← Solutions に戻る
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gappy-dark mb-6">Gappy Insight / Studio</h1>
          <p className="text-2xl text-gappy-green font-semibold leading-relaxed">
            行動データが映す、“旅ナカの中身”とコト消費トレンド。
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            プラットフォーム上で蓄積される検索・保存・予約・行動データを活用し、
            <br className="hidden md:block" />
            エリアごとの「旅ナカの中身」とコト消費の傾向を可視化するソリューションです。回遊・滞在時間延長・分散観光のKPIを追いながら、観光局・DMO・自治体・事業者の施策設計と検証を、データ面から一気通貫で支援します。
          </p>

          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gappy-dark mb-6">アウトプット例</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">•</span>
                <div>
                  <strong>時間帯別・曜日別・天候別の検索傾向</strong>
                  <p className="text-gray-600 mt-1">
                    どのタイミングで、どんなコト体験が求められているかを把握できます。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">•</span>
                <div>
                  <strong>国・旅行動機別の関心エリア・体験カテゴリ</strong>
                  <p className="text-gray-600 mt-1">
                    国籍や旅行目的ごとに、人気のエリアやカテゴリ（グルメ、カルチャー、ナイトライフなど）を分析します。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">•</span>
                <div>
                  <strong>回遊パターン・滞在時間分析</strong>
                  <p className="text-gray-600 mt-1">
                    実際の移動データにもとづき、エリア内での巡り方や滞在時間を可視化します。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">•</span>
                <div>
                  <strong>施策前後のKPI比較レポート</strong>
                  <p className="text-gray-600 mt-1">
                    キャンペーン・イベント・新導線などの前後で、「検索→Save→実行」の行動変化を比較します。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">•</span>
                <div>
                  <strong>共創プロジェクトによる施策設計・伴走支援</strong>
                  <p className="text-gray-600 mt-1">
                    データ分析から施策立案、実行、効果検証までを、Gappy Studioとして伴走します。
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gappy-green rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gappy-dark mb-6">活用シーン</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <strong className="text-gappy-dark">観光局・DMO</strong>
                <p className="text-gray-600 mt-1">
                  エリア全体の回遊促進・分散観光施策の設計と効果測定。「どの国のどんな人が、どのエリアでどんなコトをしているか」を把握。
                </p>
              </div>
              <div>
                <strong className="text-gappy-dark">宿泊施設</strong>
                <p className="text-gray-600 mt-1">
                  ゲストの滞在中の行動パターンを理解し、周辺体験との連携を強化。館内施策や周辺店舗とのコラボにも活用可能。
                </p>
              </div>
              <div>
                <strong className="text-gappy-dark">商業施設</strong>
                <p className="text-gray-600 mt-1">
                  館内回遊の最適化や、ナイトタイムエコノミーの活性化に。館外・館内の動きをあわせて分析できます。
                </p>
              </div>
              <div>
                <strong className="text-gappy-dark">交通事業者</strong>
                <p className="text-gray-600 mt-1">
                  乗降データだけでは見えない、乗客の「その後の行動」を把握し、周辺エリアへの送客施策や乗継提案の設計に活用できます。
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gappy-green text-gappy-dark px-10 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              データ活用・共創プロジェクトについて相談する
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
