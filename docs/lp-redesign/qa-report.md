# 日本語LP 3案 — 実装・QAレポート

2026-10-08 / 対象: `/lp-a`, `/lp-b`, `/lp-c`

## 結果

Airレジ1種類の参考LPをもとに、3つの構成を実装。ユーザーの「これで行く」により、当初の「独立した参考LPを3種類用意する」条件を変更した。参考グループを架空に分割していない。

ローカル比較プレビュー:

- A: http://127.0.0.1:3108/lp-a
- B: http://127.0.0.1:3108/lp-b
- C: http://127.0.0.1:3108/lp-c

起動中のローカルサーバーが必要。公開URLではない。再起動はリポジトリで `node node_modules/next/dist/bin/next start -H 127.0.0.1 -p 3108`。ビルド済み成果物がない場合は先に `node node_modules/next/dist/bin/next build` を実行する。

## 実装

- 現行 Next.js / React を維持。パッケージ追加・lockfile変更なし。
- `app/(lp-preview)` に3ルートと専用Interフォントを追加。
- `components/lp-redesign` に共有コピー、正式ロゴ、CTA、説明用UI、各構成、スコープ付きCSSを配置。
- 既存ファイルの変更は `app/layout.tsx` と `middleware.ts` のみ。3つの完全一致パスにだけ専用ヘッダー/フッターと日本語localeを適用する分岐を追加。既存ページの内容・SEO・フォーム・Analytics実装は変更していない。
- Rootの同意管理とAnalyticsは維持。比較ルートは既存の公開パス許可リストに含めず、計測対象外を維持する。
- 3案共通のH1とCTA。本文の論理順はOutcome → Problem → Mechanism → Proof → CTA。
- 操作可能な説明用UIは既存デモの86 → 100 → 76 → 76 → 100を使用。説明用UI・合成データ・実送信なしを表示。顧客実績や実接続の証明として扱わない。
- FAQはネイティブdetails/summary。メニューはキーボード・Escape対応、状態変化はaria-liveで通知。
- 全3案に `lang=ja`, `noindex, nofollow`, 個別canonical/title/description、日本語OGを設定。Sitemap追加なし。

## 実行したチェック

既存のインストール済みコマンドを直接実行。自動インストールなし。

| Check / command | Result | Evidence |
|---|---|---|
| `node node_modules/next/dist/bin/next lint` | PASS | 警告・エラーなし |
| `node node_modules/typescript/bin/tsc --noEmit` | PASS | exit 0 |
| `node node_modules/next/dist/bin/next build` | PASS | 3つのルート生成、lint/typecheck成功 |
| `node --experimental-strip-types scripts/test-home-v2.mjs` | PASS | 15テスト群、既存コピー・状態・導線の保持 |
| `node --experimental-strip-types scripts/test-site-analytics.mjs` | PASS | 環境・同意・PII除外・イベント契約 |
| `node --experimental-strip-types scripts/test-site-analytics-runtime.mjs` | PASS | 実TSX効果・同意撤回・既存CTA・locale |
| `node --experimental-strip-types scripts/test-analytics-consent.mjs` | PASS | 同意状態・保存・復元・同期 |
| `node --experimental-strip-types scripts/test-travel-demo-machine.mjs` | PASS | 状態遷移・失敗経路・リセット |
| `node --experimental-strip-types scripts/test-travel-acquisition.mjs` | PASS | 入力検証・認証転送・永続化契約・障害 |
| `node --experimental-strip-types scripts/test-travel-localization.mjs` | PASS | 日英・CTA URL・非取得ガード |
| Chrome + Playwright: 3案 × 7幅 | PASS | 1440/1280/1024/768/430/390/375px |
| 画像・フォント・Console | PASS | 画像欠落0、Noto Sans JP/Interロード、pageerror 0 |
| Horizontal overflow / anchors | PASS | 横スクロール0、ページ内アンカー欠落0 |
| デモ操作 / FAQ | PASS | 回答照合・予定変更・代替評価・復旧、開閉 |
| 全相談CTA | PASS | header/hero/proof/final/mobile_header × 3案=15クリック |
| モバイルナビと副CTA | PASS | #proofへ移動、FAQへ移動後メニュー閉鎖 |
| Keyboard | PASS | Tab先頭が本文スキップ、メニューEnter、Escapeでフォーカス復帰 |
| Reduced motion | PASS | scroll-behavior:auto、transition:0s |
| 本文コントラスト | PASS（限定検査） | ブラウザの計算済み前景/祖先背景による検査で基準未達0 |
| 既存ページ非回帰 | PASS | 下記参照 |
| Safari / Firefox / 実機 / スクリーンリーダー | NOT RUN | この環境のChromeで検証。WCAG適合認証を意味しない |
| 予約送信 / 本番フォーム送信 | NOT RUN | 既存導線の表示・遷移まで検証、予約や外部送信はしない |
| 本番デプロイ / DNS / Merge | NOT RUN | 依頼どおり実施しない |

ビルド時の既存ツール由来通知: Next lintの非推奨、Browserslist/baselineデータの古さ、Node type stripping、既存Edgeルートの静的生成制約。依存更新は今回の範囲外。ビルド失敗はない。

## 検証の境界

ユーザーの流れは「比較LPを読む → デモの確認状態を操作する → 相談CTAから既存予約ページを開く」。新規APIやデータ保存はない。

- UI → React state: 操作後の86/100/76/100表示を実ブラウザで確認。
- UI → 相談リンク: 15個のクリックを独立確認済みCalendar URLで捕捉し、遷移先が一致することを確認。
- 外部予約ページ: 別の実アクセスでHTTP 200、Google CalendarのGappy 30分相談枠を確認。予約は送信していない。
- 公開デモ: HTTP 200、Gappy Interactive Product Demoを確認。LPの補助リンクは既存 `/ja/#verification` を利用。
- 前回の監査時点であったネットワーク制限は、許可されたネットワーク実行で解決。自動承認拒否なし。

## 非回帰

変更前にブラウザで記録したtitle/lang/H1/全リンク/canonicalと、変更後の本番ビルドを比較。

| Existing route | HTTP | Before/after |
|---|---|---|
| `/ja/` | 200 | 完全一致 |
| `/`（現行の英語ホーム） | 200 | 完全一致 |
| `/ja/travel` | 200 | 完全一致 |
| `/ja/contact` | 200 | 完全一致 |
| `/en/` → `/en` | 404 | 変更前から存在しない。新規障害ではない |

プレビューページからの内部リンク30件はすべてHTTP 200。`/ja/#verification` のIDを既存ソースで確認。Sitemapはプレビューを含まない。既存のフォーム/API/Analytics/コピー/アセットはソース変更なし。初回の非回帰スクリプトは既存404ページでnetworkidle待機がタイムアウトしたため、DOMContentLoadedと明示的な描画待ちに修正し、全件完了した。

## Visual QA と修正

1440px/390pxの全ページを撮影して実画像を確認。375px/768pxも全ページ保存し、残る画面幅は幾何・フォント・画像のチェックで検証。

1. モバイルHeroで「へ。」が孤立 → 見出しを意味単位の句に分け、モバイルでは3行に。
2. CのDesktop見出しで「旅行事業」の途中が分断 → 同じ句単位の折返しに変更。
3. Hero製品UIの高さが大きい → A/BのHeroでは概要表示、Proofでは証拠と操作を含む詳細表示に分離。
4. UI本文が小さい → 主な項目・証拠本文を12px、補助ラベルを10–11pxへ調整。主本文は13–16px。
5. 小見出し末尾の「に。」や「る。」の孤立 → 問題提起とステップ見出しを句単位で折返し。
6. プレビューの本文スキップがナビの手前に着地 → header/main/footerを正しい順序にし、フォーカス可能なmainをスキップ先に設定。

最後に本番ビルドで再撮影。画像切れ・重なり・横溢れ・ロゴ変形は観測されていない。3案のレイアウトは、色の変更ではなくHero/説明/Proof/導入の配置で異なる。

## 比較・推薦（5点満点）

スコアは実画像と検証範囲に基づく設計上の評価で、ユーザーテストやCV実績ではない。

| Dimension | A | B | C |
|---|---:|---:|---:|
| Reference layout fidelity | 4.5 | 3.5 | 3.5 |
| Gappy brand fidelity | 4 | 4 | 4 |
| Content clarity | 4.5 | 4 | 4.5 |
| Product credibility | 3.5 | 3.5 | 3.5 |
| Conversion clarity | 4 | 4 | 4 |
| Mobile usability | 4 | 4 | 4 |
| Accessibility | 4 | 4 | 4 |

**第一候補はA。** 左右分割Hero、淡色背景の交互セクション、段階的な説明、繰り返す相談CTAがAirレジ参考構造に最も近い。初見の旅行事業者が、課題から仕組み・確認・相談へ進みやすい。弱点はモバイルで縦に長いこと。

**B** は大きな製品UIとまとまりのあるカードが強み。製品を中心に比較検討しやすい。一方、Heroの製品UIが見えるまでの距離が長く、狭い画面ではカードが連続する。

**C** はDetect → Decide → Execute → Verifyの因果を追いやすく、人の判断を含む仕組み説明に向く。縦方向の工程表示は、この案の編集方針とモバイル可読性のための意図的な適応。弱点は、Heroが概念図中心で、実際のUIが後半に出ること。

共通してブランド規則は適用。ただし正式な現行PNGとPlaybookのprimary wordmarkは形状・色が異なるため4点に留めた。製品の実績を示す材料はなく、説明用の合成UIなのでcredibilityは3.5点。フォーム/予約遷移は機能するが、CV率未測定なのでconversionは4点。キーボード・コントラスト・reduced-motionは検証したが、実機/支援技術の包括検証は未実施なのでaccessibilityは4点。

## 本番採用前に必要なこと

- A/B/Cの選定後、比較バーとnoindexを本番方針に合わせて扱う。今回は維持。
- Playbook版primary wordmarkを採用する場合は正式アセットを差し替える。現状は既存公式PNGを変更せず利用。
- 対象業務と本番の対応範囲をプロダクト責任者と確定する。合成UIを本番実績に置き換える場合は根拠を用意する。
- 選定案を実機Safari/Firefoxとスクリーンリーダーでも確認する。

## 成果物

- `docs/lp-redesign/image-inventory.csv`: 21枚の寸法・内容・分類・ハッシュ
- `reference-audit.md` / `reference-selection.md`: 監査と最新の選定条件
- `design-mapping.md`: 全22ページのブランドレビューと案別の参照画像対応
- `artifacts/lp-redesign/{a,b,c}/desktop.png`, `mobile.png`: 比較用全ページ画像
- 同フォルダ内のhero画像、375px/768px画像、`comparison.jpg`
- `browser-results.json`, `detailed-results.json`, `cta-results.json`, `external-links.json`, `code-checks.json`: 生の検証結果
- `production-build.log`: ローカルの最終ビルドログ
- `scripts/qa-lp-redesign*.cjs`: 既存Playwrightで再実行可能。PLAYWRIGHT_MODULEとCHROME_EXECUTABLEを環境に合わせて指定。依存の自動インストールなし。

Git: `codex/gappy-airregi-three-variants` にローカルコミット。Push/PR/本番公開は実施しない。既存の未追跡`.DS_Store`は含めない。
