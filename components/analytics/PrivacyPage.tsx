import { CONTACT_EMAIL, LEGAL_NAME } from '@/lib/config'
import { PrivacySettings } from './AnalyticsConsent'

export default function PrivacyPage({ locale }: { locale: 'en' | 'ja' }) {
  const ja = locale === 'ja'
  const sections = ja ? [
    ['デモ・資料のご依頼', 'デモまたは資料をご依頼いただく際は、お名前、勤務先メールアドレス、会社名と、任意で会社種別・規模・対象業務・相談内容を取得します。依頼への回答、日程調整、適切な資料のご案内にのみ利用します。入力内容をアクセス解析イベントには含めません。永続保存、通知、アクセス制御、削除・保持期間の運用が確認されるまでは、本番のオンライン受付を有効化しません。'],
    ['任意のアクセス解析', '当サイトの運営主体は株式会社Gappyです。サイトの利用状況を理解し、改善する目的でGoogle Analytics 4（GA4）を使用するための仕組みを用意しています。本番の設定が承認・有効化され、かつ利用者が明示的に許可した場合にのみ、Googleの解析スクリプトを読み込みます。広告目的の計測、Google Signals、広告のパーソナライズは有効化しません。'],
    ['解析の対象', 'ページのパス、表示言語、デモ・相談CTAのクリック、言語切替、主要セクションへの到達を計測します。参照元は許可リストにあるサイトのoriginに限定し、パスや会話IDを含めません。キャンペーン情報は許可したUTMのキーと値だけを使用します。ページURLのqueryとfragmentは送信しません。GA4は同意後に標準の端末・ブラウザ情報を処理します。'],
    ['送信しない情報', 'フォームの入力文、メールアドレスを解析イベントとして送ること、予約詳細、user_id、独自のフィンガープリント、セッションリプレイ、ヒートマップは実装しません。連絡先へのメール送信は、アクセス解析とは別の利用者の操作です。'],
    ['Cookieと選択の保存', '同意後はGA4がCookie（_ga、_ga_*）を利用します。同意の選択だけを、このブラウザのfirst-party localStorageのgappy_analytics_consent_v1にgrantedまたはdeniedとして保存します。ここには識別子、メールアドレス、履歴を保存しません。保存できない場合、選択は現在のページにのみ適用されます。'],
    ['拒否と撤回', '拒否してもサイトを利用できます。解析が有効なリリースでは、フッターの「プライバシー設定」から選択を変更できます。撤回後は以降の計測を停止し、アクセス可能なGA Cookieの削除を試みます。これはGoogleに既に送信されたデータの削除ではありません。ブラウザのサイトデータを消去すると再度選択を求める場合があります。'],
    ['本番有効化前の確認', 'この説明は実装に基づくレビュー用文書です。データ保持期間、国際移転、適用地域の法的根拠、データアクセス・削除の対応責任者は、人間による確認・承認が必要です。承認前に解析を有効化しません。法的レビュー済み・法令適合を保証する文書ではありません。'],
  ] : [
    ['Demo and overview requests', 'When you request a demo or overview, we collect your name, work email and company, plus optional company type, size, workflow and message. We use this information only to respond, coordinate a meeting and provide appropriate material. Form contents are not included in analytics events. Production online collection will remain disabled until durable storage, notification, access controls, deletion and retention operations are verified.'],
    ['Optional analytics', `This website is operated by ${LEGAL_NAME} (Gappy). We have prepared Google Analytics 4 (GA4) to understand website usage and improve the site. The Google analytics script loads only after Production configuration is approved and enabled AND you explicitly allow analytics. Advertising measurement, Google Signals and advertising personalization are not enabled.`],
    ['What analytics measures', 'We measure page paths, site language, demo and sales CTA clicks, language changes and visits to key sections. Referrers are limited to allowlisted site origins, without paths or conversation IDs. Campaign information uses only approved UTM keys and values. Page URL queries and fragments are not sent. After consent, GA4 processes its standard device and browser information.'],
    ['What we do not send', 'We do not send form text, email addresses as analytics events, booking details or user_id. We do not implement custom fingerprints, session replay or heatmaps. Sending an email to our contact address is a separate action from analytics.'],
    ['Cookies and your choice', 'After consent, GA4 uses cookies (_ga and _ga_*). We store only your consent choice in first-party localStorage under gappy_analytics_consent_v1 as granted or denied. That entry contains no visitor ID, email or browsing history. If storage is unavailable, your choice applies only to the current page.'],
    ['Declining and withdrawing', 'You can use the site when you decline. In an analytics-enabled release, use Privacy settings in the footer to change your choice. Withdrawal stops subsequent tracking and attempts to remove accessible GA cookies. It does not delete data already sent to Google. Clearing browser site data may cause the site to ask again.'],
    ['Review before activation', 'This implementation-based notice is a review draft. Retention, international transfers, applicable legal bases and regions, and ownership of data access and deletion requests require human approval. Analytics will not be activated before approval. This is not a representation of completed legal review or guaranteed legal compliance.'],
  ]
  return <article className="container-luxe max-w-3xl py-20 text-ink-900">
    <h1 className="text-4xl font-semibold tracking-tight">{ja ? 'プライバシーとアクセス解析' : 'Privacy and analytics'}</h1>
    {sections.map(([title, body]) => <section key={title} className="mt-10 border-t border-black/15 pt-6"><h2 className="text-xl font-semibold">{title}</h2><p className="mt-3 leading-8">{body}</p></section>)}
    <section className="mt-10 border-t border-black/15 pt-6"><h2 className="text-xl font-semibold">{ja ? 'お問い合わせ' : 'Contact'}</h2><a className="inline-flex min-h-11 items-center underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></section>
    <PrivacySettings locale={locale} />
  </article>
}
