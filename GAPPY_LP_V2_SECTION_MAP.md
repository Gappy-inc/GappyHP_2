# Gappy LP V2 — Attio → Gappy Section Map

Phase B / 2026-09-29 / audit HEAD `f4f574f`。

Normative specification: [GAPPY_LP_V2_SPEC.md](./GAPPY_LP_V2_SPEC.md)。この表はデザイン原則の対応であり、Attioの資産・コピー・実績を転用する指示ではない。S1–S7/C01–C13はSPECのsource registry/claims ledgerを参照。

## Translation table

| Attio Principle | Observed Attio Pattern | Why it works | Gappy Translation | Gappy Component | Asset Reference | What NOT to copy |
|---|---|---|---|---|---|---|
| Clear entry point | 薄いannouncement、sticky navigation、desktop menu、mobile drawer | 最初とscroll中の次行動が分かる | 01: 公開合成demoへの主導線、相談はsecondary、会社情報は小menu | HomeNavigation | S5 01_hero/m1、S6 live nav、S4 existing routes | Start free trial、巨大な空mega-menu、競合のnavigation文言一式 |
| Product-first hero | category promiseの直後に大きな動作する製品window | コピーをUIで裏付け、商品が分かる | 02: 86%のGappy readiness、未解決1、requirements/activity/evidence。合成表示を隣接 | HomeHero / HeroProductWindow | S1 step2、S2実demo部分、S3 PNG1/2/7 | 白いCRM、terminal/chat、Attio blue、人物映像、複数浮遊windowの丸写し |
| A concrete product journey | introからproduct状態へ、短い説明と画面 | 読むだけでなく変化を理解できる | 03: 一予約の42→57→71→86→100、6工程。改善率ではなくdemo状態 | BookingReadinessSequence | S1 steps1–4、S3 PNG2/3/6、S5 03_platform_intro | 営業pipeline、CRM数値、架空growth chart |
| Sticky jobs, not a feature catalog | 左stickyのBuild/Convert/Run/Forecast/Retain＋右の異なるarticle | 読者の位置を保ち、仕事ごとに理解できる | 04: Identify/Execute/Verify/Recoverの4章。各章booking/activity/evidence/replacementで別UI | WorkflowShowcase | S1全flow、S5 03/04/05/05b、S3 PNG3/4/7 | 5個の動詞、同じUI画像を5回、空白だらけのscroll track |
| Demonstrate the differentiator | 見出し直後に具体的な処理UI、短いcaption | 抽象的なAI主張を減らす | 05: 回答→条件→最新証拠→完了。Response received ≠ Verified | EvidenceVerification | S1 steps3–4、S3 PNG1/5、S2 | generic AI chat、SQL、実行不能な入力欄、返信を即完了にする演出 |
| Meaningful state transition | panelの色・border・statusの抑えた変化 | 動きそのものではなく意味を伝える | 06: 100→76→100。古い確認失効・代替候補評価・再検証を見せる | RecoverySequence | S1 steps5–7、S2、S3 PNG1/6 | 根拠なしのリアルタイム処理/速度、parallax、3D、wheel hijack |
| A dark conceptual chapter | Contextでdarkへ移行、同じ情報がどう働くかを整理 | 長いページに章の境界を作る | 07: 予約・担当・ルール・証拠を同じ業務に紐付ける。generic入力category | OperationalContextDiagram | S1 booking/evidence、S4 stack原則、S5 07/07b/08 | Universal Context™、丘陵arc/縦縞、provider-logo marquee、接続済みという虚偽 |
| Progressive technical depth | customer valueを先に示し、後半にdeveloper/architectureの短い図 | 購買検討の順序に合う | 08: 操作の許可→進行→検証→人の判断。Technology詳細へ | OperationalControls | S4 technology、S5 09_sdk/10_nav_platform | Attio SDK/API/MCPの可用性、等角投影logo、certification/安全保証 |
| Evidence follows the product | customer stories/metricsで主張の裏付け | 説明を信頼へつなぐ | 09: 公開demoで実際に確かめられる3つの流れと限界。customer metricsは不採用 | DemoProofPanel | S1実観察、S7、S5 11/12は構造参考のみ | Trusted by、顧客logo/quotes/写真、10.9M等の数値、架空研究提携 |
| A clear close | dark final CTA、次にすることを絞る | 長いstoryを行動で締める | 10: 同じ約束へ戻り、demo primary /相談secondary | HomeFinalCTA | S4 Calendar、S5 14_footer_cta | competitor copy、free trial、newsletter/email gate |
| Findability without homepage overload | 整理されたfooterリンクとlegal | 会社・採用・技術を失わず主storyを軽くする | 11: 実在7route＋会社情報。Products/Insights表示名と実URLの違いに対応 | HomeFooter variant | S4 Footer/config、S5 footer | 未実装footerページ、6列の無意味な空分類、競合legal copy |
| Grid discipline | 一貫した罫線、共通gutter、sectionごとに構図を変える | 変化と統一が両立する | max1440/12cols、5:7/4:8/3:9を目的別に使用 | SectionShell / ProductMockFrame | S5 §06.1–06.4 | report.cssのsidebar/錆色/1240レポートlayout、そのままのHTML |
| Restrained typography | 強い見出し＋短い本文、書体階層が少ない | 読む順序が明確 | 既存3font、6size-level、自然なJP改行 | DisplayHeading / SectionEyebrow | S4 fonts、S5 typography | licensed competitor fonts、無理な英日同一行数、読めない小文字 |
| State motion over decoration | color/border/opacity、in-view reveal、sticky追従 | UIの因果を邪魔しない | Hero/Workflow/Recoveryのみscroll、Verificationは操作。150/300/400ms | 上記interactive components | S5 motion、S6 observed300ms | 無限loop、透明のままの本文、全section入口animation、長いscroll-lock |
| Mobile is a recomposition | 縦積み、menu drawer、mobileでCTA自体を再構成 | 小画面でも同じ目的を達成する | copy→demo CTA→readiness、workflow accordion、recovery3state stack | 各component mobile variant | S5 m1–m4、S6 live390、S3 PNG1 mobile | Attioのemail form、横overflowのfull desktop UI、tiny文字 |

## Deliberately not mapped to standalone sections

| Reference pattern | Decision | Reason |
|---|---|---|
| Customer logo strip | Omit | 実顧客/公表許可未確認。demoの信頼境界は09で説明 |
| Scale metrics/chart | Omit | customer/traffic/ROI裏付けなし。synthetic readinessを実績に転用しない |
| Changelog 3–4 cards | Omit | 日付つき実記事が未確認。Resources linkはnav/footerで維持 |
| Newsletter/mobile email CTA | Omit | no-captureを維持。メール送信/保存/analytics追加なし |
| Self-building onboarding | Omit | self-service product onboardingの証拠なし |
| SDK/API/MCP showcase | Replace with design-principle diagram | 公開機能の根拠不足。developer風装飾を作らない |
| Word-by-word editorial reveal | Omit | story上の価値が薄い。scroll演出を3種類に抑える |

## Asset-to-component index

- S1 step1 → BookingReadinessSequence /Workflow Identify。
- S1 step2 → HeroProductWindow /Workflow Execute。
- S1 step3–4 → EvidenceVerification /Workflow Verify。
- S1 step5–7 → RecoverySequence /Workflow Recover。
- S3 PNG1 → verification/recovery/mobile密度、PNG2 → readiness ring/rail、PNG3 → requirements表。
- S3 PNG4 → activity構図のみ（global metrics除外）、PNG5 → evidence配置のみ（provider/PDF/Production除外）。
- S3 PNG6 → ready summary、PNG7 → requirements/activityの分割。
- 動画S2 → 状態順序とproduct languageの参照のみ。Home動画掲載なし。
- 正規logoは既存BrandMark。PNG内の別logoを採用しない。

全filename/状態差分/直接利用可否はSPEC「Product Asset Map」で固定。添付PNGをpublicへコピーしない。競合画像は内部参照のみで公開repositoryにも含めない。

## Implementation boundary checklist

- [x] 11blocks、4workflow、copy/state/CTAはSPECと一致。
- [x] 実Productの意味をS1、marketing layoutをS5/S6から分離。
- [x] JP/EN copyを定義、JP実装対象とEN既存route保持を分離。
- [x] raw画像貼り付け・競合asset・fake proof・new captureを排除。
- [x] reduced-motion /JSなし /mobileの代替をSPECに定義。
- [ ] Phase C実装、ブラウザー比較、2回のvisual correction loops（本Phase対象外）。
- [ ] Human visual acceptance /Production authorization（別gate）。

**GAPPY LP V2 — SPEC READY**
