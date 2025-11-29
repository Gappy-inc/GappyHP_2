import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: `Gappy Platform | ${SITE_NAME}`,
  description:
    '旅ナカの「いま・ここ・誰と・気分」を理解し、15〜120分の隙間時間にちょうどいいコトを秒で見つけるAI旅ナカツール。',
  openGraph: {
    title: `Gappy Platform | ${SITE_NAME}`,
    description:
      '旅ナカの「いま・ここ・誰と・気分」を理解し、15〜120分の隙間時間にちょうどいいコトを秒で見つけるAI旅ナカツール。',
    url: `${SITE_URL}/solutions/platform`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/solutions/platform`,
  },
}

export default function Platform() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/solutions" className="text-gappy-green hover:underline mb-4 inline-block">
            ← Solutions に戻る
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gappy-dark mb-6">Gappy Platform</h1>
          <p className="text-2xl text-gappy-green font-semibold leading-relaxed">
            旅ナカの「いま・ここ・誰と・気分」を理解し、
            <br className="hidden md:block" />
            15〜120分の隙間時間にちょうどいいコトを秒で見つける。
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            現在地・時間帯・同行者・予算・気分をチャットで伝えるだけで、
            <br className="hidden md:block" />
            15〜120分の隙間時間（Gap-time）にぴったりなコト体験を提案するAI旅ナカツールです。
            裏側では、徒歩圏・所要時間・営業状況・天候などの条件で候補を絞り込み、
            「いま実行できる」体験にパーソナライズして提示します。多言語対応で、欧米豪FITを中心とした訪日旅行者の即時ニーズに応えます。
          </p>

          <div className="bg-gray-50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gappy-dark mb-6">主な機能</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">•</span>
                <div>
                  <strong>チャット型レコメンド（多言語対応）</strong>
                  <p className="text-gray-600 mt-1">
                    自然な会話で、旅行者の希望や制約条件をヒアリングし、最適なコト体験を導きます。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">•</span>
                <div>
                  <strong>コンテキスト理解（現在地・時間帯・天候・営業状況）</strong>
                  <p className="text-gray-600 mt-1">
                    その場の状況やオープン情報を踏まえ、「いま行ける候補」に自動で絞り込みます。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">•</span>
                <div>
                  <strong>旅行動機スコアによるパーソナライズ</strong>
                  <p className="text-gray-600 mt-1">
                    興味・関心・旅のスタイル（観光 / 食 / ナイトライフ etc.）を学習し、提案内容を最適化します。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">•</span>
                <div>
                  <strong>隙間時間・徒歩圏に合わせた自動ソート</strong>
                  <p className="text-gray-600 mt-1">
                    15〜120分、徒歩 / 電車 / バスなど、所要時間と移動手段に応じて、実行可能性の高い順に並べます。
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">•</span>
                <div>
                  <strong>Save / シェア機能</strong>
                  <p className="text-gray-600 mt-1">気になったコト体験を保存し、同行者と共有できます。</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">•</span>
                <div>
                  <strong>予約・外部サイト連携（段階的に拡張）</strong>
                  <p className="text-gray-600 mt-1">
                    予約サイトや公式ページと連携し、興味から予約までをシームレスにつなげます。
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white border-2 border-gappy-green rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-gappy-dark mb-6">想定ユースケース</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">▶</span>
                <p>チェックインまでの90分を使って、ホテル周辺のローカルエリアを散策</p>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">▶</span>
                <p>予定と予定のあいだの1時間で、駅周辺の「ちょい飲み」スポットを発見</p>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">▶</span>
                <p>雨天時に、屋内で楽しめる体験だけに絞り込んで提案</p>
              </li>
              <li className="flex items-start">
                <span className="text-gappy-green mr-3 text-xl">▶</span>
                <p>夜のイベントまでの空き時間に、歩いて行けるギャラリーやバーをレコメンド</p>
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
              PoC・連携について相談する
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
