import Link from 'next/link'

export default function Partners() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/solutions" className="text-gappy-green hover:underline mb-4 inline-block">
            ← Solutions に戻る
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gappy-dark mb-6">Gappy for Partners</h1>
          <p className="text-2xl text-gappy-green font-semibold leading-relaxed">
            旅ナカAIを、現場のタッチポイントに。
            <br className="hidden md:block" />
            Embed / QR / サイネージ / API で「どこ行こう？」を「ここ行こう！」に。
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            ホテル、交通、商業施設、DMOの既存タッチポイントに、
            <br className="hidden md:block" />
            Gappyの旅ナカAIを組み込むためのソリューションです。Web埋め込み、QR、サイネージ、APIを通じて、
            来訪者の「どこ行こう？」という迷いを、その場で「ここ行こう！」という行動に変えます。多言語対応・人手不足・接客スキルのばらつきといった現場のペインを軽減しながら、回遊・滞在時間延長・分散観光を実現します。
          </p>

          <div className="bg-white border-2 border-gappy-green rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gappy-dark mb-6">こんな課題はありませんか？</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">▶</span>
                <p>訪日客が増え、多言語での案内・問い合わせが一気に増えている</p>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">▶</span>
                <p>限られた人員で対応しており、一組あたりにかけられる時間が足りない</p>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">▶</span>
                <p>スタッフの経験やスキルによって、案内の内容や質にばらつきが出てしまう</p>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">▶</span>
                <p>同じような質問への対応が多く、行列対応で手一杯になりがち</p>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">▶</span>
                <p>紙・口頭中心で、どんな質問が何語で、どこに案内されたかのログが残らない</p>
              </li>
            </ul>
            <p className="text-gray-600 mt-8">
              Gappy for Partners は、これらの課題をまとめて解決するための日本発タビナカAIソリューションです。
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gappy-dark mb-6">提供形態</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gappy-dark mb-2">Web Embed</h3>
                <p className="text-gray-700">
                  予約確認メール、公式サイト、館内Wi-Fiポータルなどに埋め込み。
                  iframe形式で簡単に導入でき、既存の導線を活かしたオンライン案内が可能です。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gappy-dark mb-2">QRコード</h3>
                <p className="text-gray-700">
                  フロント、客室、駅構内、チラシなどに設置。
                  旅行者はスマートフォンで読み込むだけで、多言語対応の旅ナカAIにアクセスできます。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gappy-dark mb-2">サイネージ</h3>
                <p className="text-gray-700">
                  デジタルサイネージでの自動表示・タッチ操作に対応。
                  駅や商業施設の大画面展開に最適です。
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gappy-dark mb-2">API連携</h3>
                <p className="text-gray-700">
                  既存アプリ・会員システム・チャットボットとの統合。
                  独自のUI/UXはそのままに、Gappyのレコメンドエンジンだけを利用できます。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-gappy-green rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gappy-dark mb-6">導入メリット</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">✓</span>
                <div>
                  <strong>回遊・滞在時間延長・分散観光の実現</strong>
                  <p className="text-gray-600 mt-1">
                    訪問者の隙間時間を周辺体験へと転換し、エリア全体の活性化につなげます。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">✓</span>
                <div>
                  <strong>問い合わせ対応の効率化（多言語対応含む）</strong>
                  <p className="text-gray-600 mt-1">
                    定型的な質問をAIが一次対応することで、フロントスタッフの負担を軽減し、
                    より質の高い対面サービスに集中できます。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">✓</span>
                <div>
                  <strong>データに基づく施策設計</strong>
                  <p className="text-gray-600 mt-1">
                    「どの国・どの時間帯に・何が聞かれて・どこに送客したか」といったログを蓄積し、
                    商品開発・コンテンツ設計・エリアマネジメントに活かすことができます。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">✓</span>
                <div>
                  <strong>エリア・テーマ特化のカスタマイズ</strong>
                  <p className="text-gray-600 mt-1">
                    ブランドやエリアの特性に合わせて、推したいスポットやテーマ（ナイトライフ、食、文化など）を設定可能です。
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="text-center">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gappy-green text-gappy-dark px-10 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              Gappy for Partners の導入について相談する
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
