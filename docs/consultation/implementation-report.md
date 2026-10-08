# オンライン導入相談ページ 実装・検証レポート

2026年10月8日 / ブランチ `codex/gappy-airregi-three-variants`

## URLと状態

- 実装URL：`/ja/consultation`
- プレビュー：http://127.0.0.1:3108/ja/consultation
- 指定された末尾スラッシュ付きURLも、既存ミドルウェアの正規化に従って新規ページへ到達。
- 新規ルートの重複なし。既存のNext.js 15 / React / TypeScript環境を利用。依存追加なし。
- `noindex, nofollow`。canonicalは `https://gappy.jp/ja/consultation`。サイトマップには追加していない。本番未公開。

## デザイン確認

ユーザーが添付した7枚を画像内容で確認し、以下のように対応付けた。画像内の文言ではなく、実装指示の本文を採用。

| 添付ファイルの末尾 | 確認した構成 | 採用内容 |
|---|---|---|
| 09_10_33 PM-1 | 左コピー、右ヘッドセット写真、白いフェード | Hero・パンくず・主CTA |
| 09_10_34 PM-2 | Q&A線画、右側6項目、広い余白 | 線画アイコンと相談内容一覧 |
| 09_10_35 PM-3 | 緑ヘッダー、3段の説明と右アイコン | 導入検討プロセス3段カード |
| 09_10_36 PM-4 | 横並びの円形STEP、カレンダーと会話 | 予約から相談までの2ステップ |
| 09_10_38 PM-5 | 旅行現場の4写真、緑ラベル、2×2 | 対象事業者4カード |
| 09_10_39 PM-6 | FAQ見出し、緑アクセント、白い余白 | 指示に従い6問のAccordionに再構成 |
| 09_10_40 PM-7 | 中央見出し、製品イメージ、最終CTA | 正規ロゴ・中央配置の最終CTA。架空UIは不使用 |

ブランド色はExecution Green #2FD28D、Deep Forest #0E3A2E、Warm Canvas #FBFCF9。日本語は既存Noto Sans JP、英字補助ラベルはInter。ロゴは既存のgappy-logo-official.pngを使用。

Heroと事業者の写真はユーザー提供画像の写真部分をCSS表示領域で切り出して利用。画像内本文をHTMLテキストとして重複表示しない。ユーザーがWeb利用を指定した提供素材をローカルプレビューで使用しており、第三者由来の追加写真は取得していない。権利者・商用ライセンスの独立した証明は提供されていないため、本番公開前に提供素材の利用権を確認すること。写真はイメージと明記。

## 構成と導線

Hero → 相談内容6項目 → 対象事業者4分類 → 相談の2ステップ → 導入検討3ステップ → FAQ6問 → 最終CTA。

`/lp-a`・`/lp-b`・`/lp-c`の相談CTA → `/ja/consultation` → `https://calendar.app.google/2vsJBvYS8mhb3Qnw6`。

予約先はlib/consultation.tsの定数で管理。すべての予約CTAは同一URLへ同一タブ遷移する。ヘッダー・フッターの一般問い合わせリンクは既存の/ja/contactを保持。LP内の相談カード・メインCTA・資料内の導入相談リンクは新規ページへ接続。本番/ja/の予約先は変更していない。

新規ページとLP AでButton / ReferenceHeader / ReferenceFooterを共通化。AのHeroボタン中央揃えも保持。B/Cの既存レイアウト・共通CTA属性は維持。

## 変更ファイル

新規：
- app/(lp-preview)/ja/consultation/page.tsx — 7セクション、メタデータ
- components/consultation/FAQ.tsx — キーボード操作・aria-expanded・aria-controls付きFAQ
- components/consultation/consultation.css — 相談ページに限定したレスポンシブスタイル
- components/lp-redesign/ReferenceChrome.tsx — Aと相談ページ共通のヘッダー・フッター・ボタン
- lib/consultation.ts — 相談ページパスと正式予約URL
- public/consultation/hero-reference.png — ユーザー提供Hero画像原本
- public/consultation/categories-reference.png — ユーザー提供事業者画像原本

変更：
- components/lp-redesign/ReferenceLanding.tsx — 共通コンポーネント利用、相談導線
- components/lp-redesign/LandingPage.tsx — B/Cの問い合わせ導線
- components/lp-redesign/content.ts — プレビュー相談CTAの宛先
- components/lp-redesign/reference.css — 直前のユーザー依頼で反映したHeroボタン中央揃えを保存
- public/lp-a-reference/service-overview.html — 資料から新相談ページへの導線
- middleware.ts — 新規相談ページにプレビュー用共通レイアウトを適用

検証・記録：
- artifacts/consultation/desktop.png / mobile.png
- artifacts/consultation/browser-results.json / http-results.json
- docs/consultation/implementation-report.md

## 検証

- 指定の1440 / 1280 / 768 / 390 / 375pxで横あふれなし。
- PC/スマートフォンの全体スクリーンショットを実際に目視確認。写真とコピーの重なりなし。
- 全6問をEnterで展開しSpaceで閉じ、aria-expandedとパネルの表示状態を確認。
- モバイルメニューのキーボード開閉確認。
- LP A/B/CのHero相談CTAを実際にクリックし、新ページ到達を確認。
- 新ページのHero予約CTAを実際にクリックし、Google Calendarの「【オンライン導入相談】-Gappy AI Workforce」予約画面へ到達。日時選択・予約確定は実行していない。
- 表示された予約枠とビデオ会議案内を確認したが、本文には所要時間や無料条件を新たに追加していない。
- 全予約CTAのhrefが正式URLと一致。
- 内部リンクはすべてHTTP200。末尾スラッシュの正規化も確認。
- H1・header・footerは各1個。canonical・noindex設定確認。新規ページはサイトマップに含まれない。
- /ja/、/、/ja/travel、/ja/contactのタイトル・言語・H1・全リンク・canonicalを前回の基準値と比較し一致。
- ブラウザで取得したコンソール重大エラーなし。
- Next lint・TypeScript・本番build成功。最初の単独tscは.next内の重複生成ファイルにより失敗したが、クリーン再生成を行うbuild後の再実行で解消。
- 既存analytics/consentの3テスト通過。rootのAnalyticsConsent / SiteAnalyticsは継承し、既存のプレビュー除外・同意・PII制限を維持。本番計測の許可リストは拡張していない。
- FAQアニメーションはprefers-reduced-motionで停止。

## 残課題と公開範囲

実装上のブロッカーなし。本番公開・マージは未実施。公開時には素材の利用権確認、noindex解除判断、計測対象への追加可否を別途確認する。プレビュー段階で新たなGA送信や本番SEO変更は行わない。

最終調整後の文字コントラスト確認では指摘0件。確認した範囲は、表示テキストの計算色と背景色による簡易検査（通常文字4.5:1、大きい文字3:1）であり、アクセシビリティ認証を意味しない。最終の画像読込・ページ内アンカーも異常なし。
