import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SITE_URL, SITE_NAME } from '@/lib/config'

const CONTACT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform'

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description:
    '株式会社Gappy（ギャッピー）について。ホテル向けAIアップセルSaaS「Gappy Stay」を開発・提供。代表メッセージ、チーム紹介、会社概要をご覧いただけます。',
  openGraph: {
    title: `About | ${SITE_NAME}`,
    description:
      '株式会社Gappy（ギャッピー）について。ホテル向けAIアップセルSaaS「Gappy Stay」を開発・提供。',
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gappy-dark mb-4">About</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">株式会社Gappyについて</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-4">Mission</h2>
            <p className="text-2xl text-gappy-green font-semibold mb-6">
              観光という日本の最強のソフトパワーを、テクノロジーで武装する。
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8 md:p-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              訪日外国人数が過去最高を更新し続ける一方、日本のホテル・旅館業では人材不足が深刻化しています。
              フロントスタッフが足りず、収益機会を日々取り逃がしている。私たちはその構造的な課題を、AIで解決します。
              Gappyは「Global × Inbound Tourism × AI」を軸に、ホテル・宿泊施設が人手をかけずに収益を最大化できる
              プラットフォームを開発・提供しています。
            </p>
          </div>
        </div>
      </section>

      {/* Representative Message */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-4">代表メッセージ</h2>
          </div>
          <div className="bg-white rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
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
              <div className="flex-1">
                <p className="text-xl text-gappy-dark font-semibold leading-relaxed mb-6">
                  日本のホテルは、最も買ってくれる顧客を放置している。
                </p>
                <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                  <p>
                    既存の予約客へのアップセル成功率は60〜70%と言われています。一方、フロントでの口頭提案の成功率はわずか1〜3%。
                    この差は、「タイミング」と「言語」の問題です。
                  </p>
                  <p>
                    チェックイン前の7〜10日間、ゲストは旅行への期待感が最高潮に達しています。この瞬間に、ゲストの母国語で、
                    最適なオファーを届けること。それだけで、ホテルの収益は大きく変わります。
                  </p>
                  <p>
                    Gappy Stayは、その仕組みを完全自動化します。スタッフは何もしなくていい。
                    人手不足の現場でも、インバウンドゲストとの言語の壁があっても、収益は積み上がり続けます。
                  </p>
                  <p>
                    日本の観光産業が持つポテンシャルを、テクノロジーで最大化する。それがGappyの使命です。
                  </p>
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

      {/* What we build */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-4">What we build</h2>
            <p className="text-gray-600 text-lg">Gappy Stayが解決する、4つの課題</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gappy-dark mb-4">チェックイン前72時間の空白をなくす</h3>
              <p className="text-gray-600 leading-relaxed">
                予約後〜チェックインまでの間、ホテルはゲストに何も届けていません。
                Gappy Stayはこの空白に着目し、期待感が最高潮のタイミングでアップセルオファーを自動配信します。
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gappy-dark mb-4">25言語対応・インバウンドの壁を撤廃</h3>
              <p className="text-gray-600 leading-relaxed">
                電話番号から国籍を自動判定し、ゲストの母国語でメッセージを生成。
                日本人にはLINE、欧米豪にはWhatsAppで配信するマルチチャネル対応により、開封率・転換率を最大化します。
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gappy-dark mb-4">PMS改修不要・最短1週間で導入</h3>
              <p className="text-gray-600 leading-relaxed">
                サイトコントローラー（手間いらず / TL-リンカーン等）から予約データを自動取得。
                PMSとの直接連携や複雑なIT改修は不要。初期費用¥0・成功報酬型で、リスクなく始められます。
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gappy-dark mb-4">スタッフの作業ゼロで収益が積み上がる</h3>
              <p className="text-gray-600 leading-relaxed">
                データ取得から配信・決済・PMSへの反映まで全自動。
                人手不足の現場でも、フロントスタッフが何もしなくてもアップセル収益が継続的に発生し続けます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Info */}
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
                <dd className="text-lg text-gappy-dark leading-relaxed">
                  ホテル・宿泊施設向けAIアップセル自動化SaaS「Gappy Stay」の開発・提供<br />
                  インバウンド旅行者向け多言語コミュニケーション支援<br />
                  宿泊施設の収益最適化コンサルティング
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-4">Team</h2>
            <p className="text-lg text-gray-600">
              インバウンド・AI・ホテル業界の知見を持つメンバーが、<br className="hidden md:block" />
              ホテルの収益課題を本気で解決します。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-8 h-full">
              <h3 className="text-xl font-bold text-gappy-dark">浅野 充輝</h3>
              <p className="text-sm text-gappy-green font-semibold mt-2">代表取締役CEO</p>
              <div className="mt-6 space-y-2 text-gray-600">
                <p className="font-semibold text-gappy-dark">役割</p>
                <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
                  <li>全体方針決定・事業推進</li>
                  <li>ホテル・宿泊施設へのセールス・パートナーシップ</li>
                  <li>プロダクト方向性・UI/UX方針の最終意思決定</li>
                  <li>インバウンド市場・観光業界の戦略立案</li>
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 h-full">
              <h3 className="text-xl font-bold text-gappy-dark">三ツ谷 寛羽</h3>
              <p className="text-sm text-gappy-green font-semibold mt-2">オペレーション責任者</p>
              <div className="mt-6 space-y-2 text-gray-600">
                <p className="font-semibold text-gappy-dark">役割</p>
                <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
                  <li>PoC施設との導入・運用サポート</li>
                  <li>ゲスト向けコミュニケーション設計</li>
                  <li>オペレーション全般・品質管理</li>
                  <li>現地調査・ユーザーリサーチ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gappy-dark mb-6">
            導入・ご相談はお気軽に
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            PoCのご相談、資料請求、デモのご依頼など、<br className="hidden md:block" />
            まずはお気軽にご連絡ください。3営業日以内にご返信します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gappy-green text-gappy-dark px-10 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
            >
              お問い合わせ / デモ相談
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
