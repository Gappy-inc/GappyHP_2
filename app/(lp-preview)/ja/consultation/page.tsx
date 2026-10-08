import type { Metadata } from 'next';
import Image from 'next/image';
import { MessageCircleQuestion, CalendarDays, Video, Clock3, ListChecks, Workflow, ClipboardCheck, ChevronRight } from 'lucide-react';
import { Button, ReferenceHeader, ReferenceFooter } from '@/components/lp-redesign/ReferenceChrome';
import { CONSULTATION_BOOKING_URL, CONSULTATION_PATH } from '@/lib/consultation';
import { SITE_URL, OG_IMAGE_URL } from '@/lib/config';
import logo from '@/public/gappy-logo-official.png';
import FAQ from '@/components/consultation/FAQ';
import '@/components/lp-redesign/reference.css';
import '@/components/consultation/consultation.css';
const title = 'オンライン導入相談 | Gappy';
const description = '旅行業務に特化したAI Agent「Gappy」のオンライン導入相談。予約確認・催促・ガイド手配・変更対応などの課題を伺い、活用方法や導入の進め方をご案内します。';
export const metadata: Metadata = { title, description, robots: { index: false, follow: false }, alternates: { canonical: `${SITE_URL}${CONSULTATION_PATH}` }, openGraph: { title, description, url: `${SITE_URL}${CONSULTATION_PATH}`, locale: 'ja_JP', type: 'website', images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'Gappy オンライン導入相談' }] }, twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE_URL] } };
const topics = [
    ['Gappyの仕組み', '旅行業務特化AI Agentの基本的な仕組みと、活用できる業務をご説明します。'],
    ['対象業務の整理', '現在の予約後業務を伺い、AIによる効率化を検討しやすい業務を整理します。'],
    ['製品デモ', 'Gappyの画面を使って、業務の確認・判断・実行・完了確認の流れをご紹介します。'],
    ['既存システムとの連携', '現在利用中の予約システムやコミュニケーションツールとの連携可能性を確認します。'],
    ['導入ステップ', '検証する業務の選定から、試験導入・運用までの進め方をご説明します。'],
    ['費用・運用体制', '想定する利用範囲や必要な運用体制、費用の考え方についてご相談いただけます。'],
];
const categories = [
    ['旅行会社・ツアーオペレーター', '日帰りツアー、募集型企画旅行、手配旅行などを運営する事業者。', '旅行カウンターで相談に応じる担当者のイメージ'],
    ['DMC・インバウンド事業者', '訪日ゲストの受入、サプライヤーの手配、旅程変更などを行う事業者。', '訪日ゲストを案内するガイドのイメージ'],
    ['アクティビティ・体験事業者', 'ガイド手配、催行前確認、予約変更などの運営を行う事業者。', '自然体験ツアーで参加者を案内するガイドのイメージ'],
    ['宿泊・交通関連事業者', '送迎手配、宿泊施設との確認、関係者間の連絡が多い事業者。', 'ホテルの受付と送迎の担当者のイメージ'],
];
export default function ConsultationPage() {
    return <div className="ra co"><ReferenceHeader bookingHref={CONSULTATION_BOOKING_URL} homePath="/lp-a"/><main id="main-content" tabIndex={-1}>
 <section className="co-hero"><div className="co-container"><nav className="co-breadcrumb" aria-label="パンくず"><a href="/lp-a">ホーム</a><ChevronRight aria-hidden="true"/><a href="/lp-a#support">導入のご相談・サポート</a><ChevronRight aria-hidden="true"/><span aria-current="page">オンライン導入相談</span></nav><div className="co-hero-grid"><div className="co-hero-copy"><p className="co-eyebrow">GAPPY · ONLINE CONSULTATION</p><h1>オンライン導入相談</h1><p>旅行業務に特化したAI Agent「Gappy」の導入について、オンラインでご相談いただけます。</p><p>予約確認、サプライヤーへの催促、ガイドの手配、変更対応など、現在のオペレーション上の課題を伺い、Gappyの活用可能性をご案内します。</p><p>導入を具体的に検討している方も、まずは情報収集をしたい方も、お気軽にご相談ください。</p><Button href={CONSULTATION_BOOKING_URL}>オンライン相談を予約する</Button></div><div className="co-hero-visual"><div className="co-hero-photo"><Image src="/consultation/hero-reference.png" alt="オンラインで相談に応じるスタッフのイメージ" width={1891} height={831} sizes="(max-width: 600px) 200vw, 110vw" priority/></div><p className="co-image-note">写真はオンライン相談のイメージです。</p></div></div></div></section>
 <section id="consultation-support" className="co-section co-canvas"><div className="co-container"><div className="co-heading"><h2>オンライン導入相談の<br className="co-mobile"/>サポート内容</h2><p>旅行事業者の業務に合わせて、Gappyの活用方法と導入に向けた進め方をご説明します。</p></div><div className="co-topics"><div className="co-qa-art" aria-hidden="true"><div><MessageCircleQuestion strokeWidth={1}/></div><span>質問・相談</span></div><ol>{topics.map(([heading, body], i) => <li key={heading}><span className="co-topic-number">0{i + 1}</span><div><h3>{heading}</h3><p>{body}</p></div></li>)}</ol></div></div></section>
 <section id="businesses" className="co-section"><div className="co-container"><div className="co-heading"><h2>こんな旅行事業者の方へ</h2><p>日々の予約確認や関係者との調整に時間がかかっている事業者の方は、ぜひご相談ください。</p></div><div className="co-categories">{categories.map(([heading, body, alt], i) => <article key={heading}><div className={`co-category-photo co-category-${i}`}><Image src="/consultation/categories-reference.png" width={1916} height={821} sizes="(max-width: 600px) 1000px, 1600px" alt={alt}/></div><div className="co-category-copy"><h3>{heading}</h3><p>{body}</p></div></article>)}</div><p className="co-image-note">写真は業務のイメージです。対象業務への適用可能性は、ご相談のうえ個別に確認します。</p></div></section>
 <section id="consultation-flow" className="co-section"><div className="co-container"><div className="co-heading"><h2>オンライン導入相談の流れ</h2><p>ご予約からご相談まで、シンプルな2ステップです。</p></div><ol className="co-flow"><li><span className="co-step-label">STEP 1</span><h3>相談日時を予約する</h3><div className="co-step-icon" aria-hidden="true"><CalendarDays /><Clock3 /></div><p>予約ページからご都合のよい日時を選択し、オンライン導入相談を予約してください。</p></li><li><span className="co-step-label">STEP 2</span><h3>オンラインで相談する</h3><div className="co-step-icon" aria-hidden="true"><Video /></div><p>ご予約の日時にオンラインでお話しし、現在の業務課題やGappyの活用可能性についてご相談いただきます。</p></li></ol><div className="co-centered"><Button href={CONSULTATION_BOOKING_URL}>相談日時を予約する</Button></div></div></section>
 <section id="adoption" className="co-section co-canvas"><div className="co-container"><div className="co-heading"><h2>小さな業務から、<br />段階的に導入を検討できます。</h2><p>すべての業務を一度に変えるのではなく、まずは課題の大きい業務を確認するところから始めます。</p></div><div className="co-program"><div className="co-program-label">導入に向けた進め方</div>{[[ListChecks, '対象業務の選定', '予約確認、催促、ガイド手配などの業務から、まず検証する対象を整理します。'], [Workflow, '既存の運用に合わせた検証', '現在利用しているシステムや運用方法を確認し、適切な検証方法を検討します。'], [ClipboardCheck, '検証結果を踏まえた導入判断', '業務の進捗、完了条件、人による承認が必要なポイントを確認し、次の導入ステップを検討します。']].map(([Icon, heading, body], i) => { const I = Icon as typeof ListChecks; return <article key={String(heading)}><div><span className="co-step-label">0{i + 1}</span><h3>{String(heading)}</h3><p>{String(body)}</p></div><div className="co-program-icon"><I strokeWidth={1.3} aria-hidden="true"/></div></article>; })}<div className="co-centered"><Button href={CONSULTATION_BOOKING_URL}>導入について相談する</Button></div></div></div></section>
 <section id="consultation-faq" className="co-section"><div className="co-container co-narrow"><div className="co-heading"><h2>オンライン導入相談に関する<br />よくあるご質問</h2></div><FAQ /></div></section>
 <section className="co-section co-final"><div className="co-container"><Image className="co-final-logo" src={logo} width={170} height={78} alt="Gappy"/><h2>まずは、旅行業務の課題を<br className="co-mobile"/>お聞かせください。</h2><p>予約後の確認・催促・変更対応など、日々のオペレーションについてお気軽にご相談ください。<br className="co-desktop"/>Gappyの活用可能性を、現在の業務に合わせて一緒に整理します。</p><Button href={CONSULTATION_BOOKING_URL}>オンライン相談を予約する</Button></div></section>
 </main><ReferenceFooter /></div>;
}
