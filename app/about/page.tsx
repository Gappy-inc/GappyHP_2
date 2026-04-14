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
    description: 'ホテル向けAIアップセルSaaS「Gappy Stay」を開発・提供する株式会社Gappyについて。',
    url: `${SITE_URL}/about`,
    type: 'website',
  },
  alternates: { canonical: `${SITE_URL}/about` },
}

export default function About() {
  return (
    <div className="bg-[#0A0A0A] text-white">

      {/* Hero */}
      <section className="py-20 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#00E676] text-xs font-bold tracking-[0.3em] uppercase mb-4">ABOUT</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">株式会社Gappyについて</h1>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            ホテル向けAIアップセルSaaS「Gappy Stay」を開発・提供しています。
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#00E676] text-xs font-bold tracking-[0.3em] uppercase mb-4">MISSION</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              観光という日本の最強のソフトパワーを、<br className="hidden md:block" />テクノロジーで武装する。
            </h2>
          </div>
          <div className="card-dark rounded-2xl p-8 md:p-12">
            <p className="text-white/70 text-lg leading-relaxed">
              訪日外国人数が過去最高を更新し続ける一方、日本のホテル・旅館業では人材不足が深刻化しています。
              フロントスタッフが足りず、収益機会を日々取り逃がしている。私たちはその構造的な課題を、AIで解決します。
              Gappyは「Global × Inbound Tourism × AI」を軸に、ホテル・宿泊施設が人手をかけずに収益を最大化できる
              プラットフォームを開発・提供しています。
            </p>
          </div>
        </div>
      </section>

      {/* Representative Message */}
      <section className="py-20 border-t border-white/[0.06]" style={{ background: '#111111' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#00E676] text-xs font-bold tracking-[0.3em] uppercase mb-4">MESSAGE</p>
            <h2 className="text-3xl md:text-4xl font-bold">代表メッセージ</h2>
          </div>
          <div className="card-dark rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <div className="w-40 h-52 md:w-44 md:h-60 rounded-2xl overflow-hidden border-2 border-[#00E676]/40">
                  <Image
                    src="/CEO.jpg"
                    alt="代表取締役 浅野 充輝"
                    width={176}
                    height={240}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xl font-semibold leading-relaxed mb-6">
                  日本のホテルは、最も買ってくれる顧客を放置している。
                </p>
                <div className="space-y-4 text-white/70 leading-relaxed">
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
                  <p className="text-white/50 text-sm">株式会社Gappy</p>
                  <p className="font-semibold">代表取締役　浅野 充輝</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#00E676] text-xs font-bold tracking-[0.3em] uppercase mb-4">PRODUCT</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">What we build</h2>
            <p className="text-white/40">Gappy Stayが解決する、4つの課題</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'チェックイン前72時間の空白をなくす',
                desc: '予約後〜チェックインまでの間、ホテルはゲストに何も届けていません。Gappy Stayはこの空白に着目し、期待感が最高潮のタイミングでアップセルオファーを自動配信します。',
              },
              {
                title: '25言語対応・インバウンドの壁を撤廃',
                desc: '電話番号から国籍を自動判定し、ゲストの母国語でメッセージを生成。日本人にはLINE、欧米豪にはWhatsAppで配信。開封率・転換率を最大化します。',
              },
              {
                title: 'PMS改修不要・最短1週間で導入',
                desc: 'サイトコントローラーから予約データを自動取得。複雑なIT改修は不要。初期費用¥0・成功報酬型で、リスクなく始められます。',
              },
              {
                title: 'スタッフの作業ゼロで収益が積み上がる',
                desc: 'データ取得から配信・決済・PMSへの反映まで全自動。人手不足の現場でも、スタッフが何もしなくてもアップセル収益が継続的に発生します。',
              },
            ].map((item, i) => (
              <div key={i} className="card-dark rounded-2xl p-6 sm:p-8">
                <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 border-t border-white/[0.06]" style={{ background: '#111111' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#00E676] text-xs font-bold tracking-[0.3em] uppercase mb-4">COMPANY</p>
            <h2 className="text-3xl md:text-4xl font-bold">会社概要</h2>
          </div>
          <div className="card-dark rounded-2xl p-8 md:p-12">
            <dl className="space-y-6">
              {[
                { label: '会社名', value: '株式会社Gappy（ギャッピー）' },
                { label: '所在地', value: '〒150-0043 東京都渋谷区道玄坂1丁目10番8号 渋谷道玄坂東急ビル2F' },
                { label: '代表取締役', value: '浅野 充輝' },
                { label: '設立', value: '2025年' },
                { label: '資本金', value: '4,003,200円' },
              ].map((row) => (
                <div key={row.label} className="border-b border-white/[0.06] pb-4 flex flex-col sm:flex-row sm:gap-8">
                  <dt className="text-white/40 text-sm font-medium w-28 flex-shrink-0 mb-1 sm:mb-0">{row.label}</dt>
                  <dd className="text-white/80">{row.value}</dd>
                </div>
              ))}
              <div className="border-b border-white/[0.06] pb-4 flex flex-col sm:flex-row sm:gap-8">
                <dt className="text-white/40 text-sm font-medium w-28 flex-shrink-0 mb-1 sm:mb-0">メール</dt>
                <dd>
                  <a href="mailto:mitsuki@gappy.jp" className="text-[#00E676] hover:underline">
                    mitsuki@gappy.jp
                  </a>
                </dd>
              </div>
              <div className="border-b border-white/[0.06] pb-4 flex flex-col sm:flex-row sm:gap-8">
                <dt className="text-white/40 text-sm font-medium w-28 flex-shrink-0 mb-1 sm:mb-0">電話</dt>
                <dd>
                  <a href="tel:07011853131" className="text-[#00E676] hover:underline">
                    070-1185-3131
                  </a>
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-8">
                <dt className="text-white/40 text-sm font-medium w-28 flex-shrink-0 mb-1 sm:mb-0">事業内容</dt>
                <dd className="text-white/80 leading-relaxed">
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
      <section className="py-20 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#00E676] text-xs font-bold tracking-[0.3em] uppercase mb-4">TEAM</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Team</h2>
            <p className="text-white/50">
              インバウンド・AI・ホテル業界の知見を持つメンバーが、<br className="hidden md:block" />
              ホテルの収益課題を本気で解決します。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                name: '浅野 充輝',
                role: '代表取締役CEO',
                items: [
                  '全体方針決定・事業推進',
                  'ホテル・宿泊施設へのセールス・パートナーシップ',
                  'プロダクト方向性・UI/UX方針の最終意思決定',
                  'インバウンド市場・観光業界の戦略立案',
                ],
              },
              {
                name: '三ツ谷 寛羽',
                role: 'オペレーション責任者',
                items: [
                  'PoC施設との導入・運用サポート',
                  'ゲスト向けコミュニケーション設計',
                  'オペレーション全般・品質管理',
                  '現地調査・ユーザーリサーチ',
                ],
              },
            ].map((member) => (
              <div key={member.name} className="card-dark rounded-2xl p-8">
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-[#00E676] text-sm font-semibold mt-1 mb-6">{member.role}</p>
                <ul className="space-y-2 text-white/55 text-sm leading-relaxed">
                  {member.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#00E676]/50 mt-0.5">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[#00E676]/10" style={{ background: 'linear-gradient(to bottom, rgba(0,230,118,0.03), #0A0A0A)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            導入・ご相談はお気軽に
          </h2>
          <p className="text-white/50 text-lg mb-10">
            PoCのご相談、資料請求、デモのご依頼など、<br className="hidden md:block" />
            まずはお気軽にご連絡ください。3営業日以内にご返信します。
          </p>
          <Link
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#00E676] text-black px-7 sm:px-10 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] transition-all"
          >
            お問い合わせ / デモ相談
          </Link>
        </div>
      </section>

    </div>
  )
}
