# Gappy LP V2 — Implementation Specification

Status: SPEC READY / Phase B。2026-09-29 JST。

Approved audit baseline: `f4f574f1bbe333aeb95327156d1e4e173efbdee2`。Phase Aでremote main `bcd5821e3d25490204b365319869530e25c37704`とのfile diff = 0を確認。これは仕様書であり、実装・テスト・公開完了の証明ではない。

## 0. Scope and locked decisions

- 今回はPhase Bのみ。2つのMarkdownを作成する。application code、Production、環境変数、DB、lead/analytics設定を変更しない。
- 実装対象は日本語トップ`/ja/`。本書でENコピーも完全に定義するが、既存ENトップ`/`の置換は今回の実装範囲に含めない。EN rolloutは別途明示する。`/en/`は作らない。
- `/travel`、`/ja/travel`の承認済みLP・ROI・v3/v4 interactive demo・動画・獲得ロジックは維持。企業下層URL、会社情報、正規logoを保持。
- 11ブロック（navigation/footer含む）に固定。独立したlogo strip、KPI strip、changelog、newsletter、pricing、free trialは追加しない。
- Primary conversionは公開合成デモを見ること。Secondary conversionは既存Google Calendarで相談予約。メール入力・lead POST・persistent analyticsを追加しない。
- 製品UIはHTML/CSS/SVGで再構成する。添付PNGのベタ貼り、外部demo iframe、generic CRM/chat、架空chartを使わない。
- 「機能の存在」「公開デモの状態」「設計原則」「実績」を区別する。公開デモはProduction customer proofではない。
- 一つのsynthetic bookingを使う。Kyoto Private Tour / `KYO-181026`。生成PNGの別ツアー・別logo・別集計を混ぜない。
- Readinessはこのデモ内の状態表示。導入効果、成功率、売上、利用実績ではない。

### Story spine

Booking arrives → unresolved work → identify → execute → responses/evidence → verify → ready → change → invalidate old evidence → evaluate replacement → re-verify → ready again.

各sectionはこの物語の異なる問いに答える。同じダッシュボードと同じ説明を反復しない。

## 1. Source registry and precedence

| Source ID | Source | What it proves / limit |
|---|---|---|
| S1 | https://gappy-workforce-lab-0925.mitsuki222581.chatgpt.site/ — Phase Aの全7step実ブラウザー観察 | 公開合成デモのUI・状態・外部送信0。Production実装/実利用/統合可用性は証明しない |
| S2 | 提供`株式会社Gappy Demo動画 (AI Workforce) .mp4`、38.714秒、1920×1080 | S1の画面と体験の補助。音声全文・字幕未検証。実績根拠にしない |
| S3 | 7つの`ChatGPT Image Sep 28, 2026, ...png` | 生成された構図・密度・surfaceの参考。矛盾時はS1を優先 |
| S4 | GappyHP_2監査HEAD、`components/site/HomePage.tsx`、`content/*`、`lib/config.ts`、`lib/metadata.ts`、`Header/Footer` | 現行公開コピー、リンク、企業情報、設計原則。product implementationの証明ではない |
| S5 | `project.zip`内README、Attio LP解剖レポート、report.css、assets/ref19枚 | デザインhandoff、特に§06.1–06.4。公開LPの素材ではない |
| S6 | https://attio.com/ — Phase A live desktop/mobile audit | hierarchy、sticky、明暗、motion、mobile再構成。brand assets/claimsの使用権やGappyの証拠にはならない |
| S7 | Phase A audit `GAPPY_LP_V2_PHASE_A_AUDIT.md` | S1–S6の観察・source差分・既存アーキテクチャ |

優先順位: 実Product/公開demo S1 → demo video S2 → generated PNG S3 → marketing interpretation。正規logo/会社情報はS4を使用し、demoやPNGの異なるlogoを採用しない。実Product backendは今回調査していない。

## 2. A — Final IA

| # / Anchor | Section / purpose | Surface | Component | Claim IDs |
|---|---|---|---|---|
| 01 | Navigation: 製品体験と相談へ誘導 | Light | HomeNavigation variant | C01,C12,C13 |
| 02 `hero` | Hero / Category: 5秒で何の製品か理解 | Light | HomeHero + HeroProductWindow | C01,C02,C03,C11 |
| 03 `product-proof` | Product Proof: 一つの予約の状態を俯瞰 | Light/tint | BookingReadinessSequence | C03,C04,C11 |
| 04 `workflow` | Operational Workflow: 誰が何を進めるか | Tint | WorkflowShowcase（4 tabs） | C04,C05,C06,C07 |
| 05 `verification` | Verification: 返信≠完了の根拠 | Light | EvidenceVerification | C05 |
| 06 `recovery` | Disruption & Recovery: 以前の完了を無効にできる | Light→tint（暗転は次章） | RecoverySequence | C06,C07 |
| 07 `context` | Operational Context: 同じ予約に文脈を束ねる | Dark navy | OperationalContextDiagram | C08 |
| 08 `architecture` | Technology / Architecture: 操作の境界・検証・人の判断 | Dark navy | OperationalControls | C09 |
| 09 `proof` | Verifiable Proof: 実際に何を確認できるか | Light | DemoProofPanel | C01,C10,C11 |
| 10 `next-step` | Final CTA | Dark navy | HomeFinalCTA | C01,C02,C12 |
| 11 | Footer | Light | HomeFooter variant / existing legal data | C13 |

Verifiable ProofはProduct Proofの再掲ではない。03は製品の説明、09は証拠の範囲・制約と外部デモへのリンク。Research/顧客/記事の空欄を用意しない。

## 3. B / E — Final JP / EN Copy Matrix

以下がユーザーに見えるmarketing copyの全文。`—`は表示しない。行内の`<br>`は推奨改行で、画面幅別規則は後述。英語は翻訳の基準として固定し、無断で既存`/`へ公開しない。

| Section | EN eyebrow | EN headline | EN body | EN CTA | JP eyebrow | JP headline | JP body | JP CTA |
|---|---|---|---|---|---|---|---|---|
| 01 Navigation | — | — | Explore the interactive product demo. | View demo | — | — | インタラクティブデモを公開中。 | デモを見る |
| 02 Hero | AI WORKFORCE FOR TRAVEL OPERATIONS | Keep every tour<br>ready to operate. | Gappy finds what remains after booking, performs the work, and verifies the operational outcome. | Start interactive demo / Talk to sales | 旅行オペレーションのためのAI Workforce | すべてのツアーを、<br>催行可能な状態へ。 | 予約後に残る業務を見つけ、実行し、その結果まで検証します。 | インタラクティブデモを見る / 相談する |
| 03 Product Proof | ONE BOOKING, THROUGH TO READINESS | From one booking<br>to verified readiness. | Follow a synthetic booking as unresolved work becomes verified readiness. | — | ひとつの予約を、催行まで | ひとつの予約から、<br>根拠のある催行準備へ。 | 未解決の業務が、証拠で裏付けられた準備完了に変わる流れを、合成データで示します。 | — |
| 04 Workflow | THE WORK AFTER BOOKING | Work moves forward.<br>Nothing is done until verified. | See how Gappy identifies the work, advances it, checks the evidence, and responds to change in this demo. | — | 予約後に残る仕事 | 業務を進める。<br>確認できるまで、完了にしない。 | 業務の特定から実行、証拠の照合、変更への対応まで。デモの中の仕事を追ってください。 | — |
| 05 Verification | RESPONSE ≠ VERIFICATION | Replies are not completion. | Gappy verifies fresh evidence before treating operational work as done. | — | 返信と検証は、別の状態 | 返信が来た。<br>それだけでは、完了ではない。 | 日時や条件に合っているか。今も有効な証拠か。業務を完了とする前に、回答を必要な条件と照合します。 | — |
| 06 Recovery | READY IS A CURRENT STATE | When reality changes,<br>readiness changes with it. | A guide cancellation invalidates the earlier confirmation. Gappy evaluates a replacement and verifies the new evidence before restoring readiness in this demo. | — | 催行準備は、変化し続ける | 予定が変われば、<br>準備完了も、見直す。 | ガイドのキャンセルで、以前の確認は無効に。代替候補を評価し、新しい証拠を照合して、催行可能な状態へ戻します。このデモで、その流れを示します。 | — |
| 07 Context | OPERATIONAL CONTEXT | The context layer<br>for travel operations. | Connect the booking, assignments, rules, and evidence around the same operation. The categories below describe operational context, not a list of available integrations. | — | 業務の文脈 | 予約と、判断の根拠を、<br>ひとつの文脈に。 | 予約、担当、ルール、やり取り、証拠。同じ業務の情報をつなぎ、次の判断に使います。図は情報の種類を示すもので、接続済みサービスの一覧ではありません。 | — |
| 08 Architecture | DESIGNED AROUND OPERATIONAL CONTROL | Set the boundaries.<br>Verify the result. | Our design principles: define permitted actions, track the work, verify outcomes, and leave decisions that need judgment with people. | Explore the technology | 業務を任せるための設計 | 任せる範囲を決める。<br>結果を確かめる。 | 許可する操作を定め、進行を追い、結果を検証する。判断が必要な場面は人へつなぐ。Gappyの設計原則です。 | 技術と設計を見る |
| 09 Verifiable Proof | SEE WHAT THE DEMO SHOWS | Inspect the workflow.<br>Know what it proves. | Explore booking readiness, evidence checks, and recovery in a public synthetic demo. It is not evidence of customer production usage or live integrations. | Explore the public demo | デモで確かめる | 動きを見て、<br>確かめられることを知る。 | 予約後の業務、証拠の照合、変更からの復旧を、公開デモで確認できます。合成データによるデモであり、顧客の本番運用や実接続の証明ではありません。 | 公開デモを体験する |
| 10 Final CTA | GAPPY AI WORKFORCE | Keep every tour<br>ready to operate. | Explore the workflow, then bring us the operation you want to work on. | Start interactive demo / Talk to sales | GAPPY AI WORKFORCE | すべてのツアーを、<br>催行可能な状態へ。 | まずは、業務が進む流れを体験。その後、取り組みたい業務をお聞かせください。 | インタラクティブデモを見る / 相談する |
| 11 Footer | — | Gappy | AI Workforce for Travel Operations | Navigation and contact links below | — | Gappy | 旅行オペレーションのためのAI Workforce | 下記の企業・連絡先リンク |

### Shared public qualifiers / microcopy

| ID | EN | JP | Placement |
|---|---|---|---|
| Q1 | Synthetic product demo · No live sends | 合成データによる製品デモ・実送信なし | Hero window上端、03–06 product frame caption、09 |
| Q2 | Readiness values illustrate this demo, not customer performance. | 準備率はデモ内の状態を示す値で、顧客の実績値ではありません。 | 03の直下。Heroの86%にも「デモ内の準備率」をaria/visible captionで付ける |
| Q3 | No signup required for this demo. | このデモは登録なしで体験できます。 | Hero主CTA下、09 |
| Q4 | Design principles, not a certification or guarantee. | 設計原則の説明であり、認証や性能保証を示すものではありません。 | 08のdiagram caption |
| Q5 | Opens the public demo site | 外部の公開デモサイトへ移動します | 外部demo linkの補足/accessible description |

Q1/Q2はhover tooltipに隠さない。JPの製品デモ内で架空の顧客名・メール・supplier logoを増やさない。canonicalの人物名は合成人物としてのみ表示。

### Navigation / Footer copy and routes

| Element | EN | JP | Destination |
|---|---|---|---|
| Product | Product | プロダクト | `#product-proof` |
| Workflow | Workflow | 業務の流れ | `#workflow` |
| Technology | Technology | 技術 | EN `/technology`, JP `/ja/technology` |
| Company menu | Company | 会社情報 | button、About/Careers/Contactを展開 |
| Resources | Resources | 考え方・知見 | EN `/resources`, JP `/ja/resources` |
| Company/About | About | Gappyについて | `/about`, `/ja/about` |
| Company/Careers | Careers | 採用情報 | `/careers`, `/ja/careers` |
| Company/Contact | Contact | お問い合わせ | `/contact`, `/ja/contact` |
| Footer/Travel | Travel | 旅行業務 | `/travel`, `/ja/travel` |
| Footer/Projects | Projects | プロジェクト | `/cases`, `/ja/cases` |
| Menu control | Menu / Close | メニュー / 閉じる | button |
| Language | EN / JP | EN / JP | `/`, `/ja/`（現在言語aria-current） |
| Footer/booking | Book a demo | デモを予約 | Calendar（CTA-SALES） |

Footerは上記7企業route、現行`lib/config.ts`の会社名・住所・contact email、copyrightを保持。申請中のprivacyや存在しないlegal routeを足さない。新しい巨大mega-menuは作らない。desktop companyは小さな3link panel、mobileはaccordion。

### Line breaks and text measure

| Text | Desktop 1440 / Tablet 1024 | Mobile 390 |
|---|---|---|
| Hero/Final EN | `Keep every tour` / `ready to operate.` | 同じ2行が入るtype size、単語を分割しない |
| Hero/Final JP | `すべてのツアーを、` / `催行可能な状態へ。` | 同じ2行。overflow時は文字を縮めず自然wrapを許す |
| Hero body JP | `予約後に残る業務を見つけ、` / `実行し、その結果まで検証します。` | 同じ意味の2句、CSS自然wrap。英語の行数に合わせない |
| Product Proof EN/JP | matrixの`<br>`位置 | JP `ひとつの予約から、` / `根拠のある催行準備へ。`、EN自然wrap |
| Workflow/Recovery/Context/Architecture/Proof | matrixの`<br>`位置を推奨 | 句の境界でwrap。`nowrap`でwidthを超えさせない |
| Verification EN | 一行が入る幅、入らなければ自然wrap | `Replies are not` / `completion.` |
| Verification JP | `返信が来た。` / `それだけでは、完了ではない。` | `返信が来た。` / `それだけでは、` / `完了ではない。` |

Headline max-width EN18ch / JP20em以内、本文EN54ch / JP32em以内。禁則処理`line-break: strict`、copyはDOM text、画像化禁止。

## 4. D — Product UI map and state contract

### Common product shell

Dark navy、1px divider、正規Gappy wordmark、左nav（今日/予約/催行準備/ガイド/レポート）、booking title、readiness、requirements、activity/evidence。Desktopは細いsidebar、Mobileはsidebarを省きheader breadcrumbとreadinessを残す。shell navは装飾として非focusable（実ナビに見せたdead button禁止）。操作可能なのは実装するデモ状態controlのみ。

JP labels: 催行準備率 / 催行に必要な業務 / エージェント活動 / 未解決 / 証拠 / 照合 / 回答受信 / 確認済み / 確認失効 / 要対応 / 催行可能 / 催行可能な状態を維持。
EN labels: Tour Readiness / Operational Requirements / Agent Activity / Unresolved / Evidence / Verification / Response received / Verified / Invalidated / At risk / Tour ready / Tour remains ready。

状態色だけで伝えずicon＋text。100%以外でReadyと表示しない。製品内英語状態名はENのみ、JPでは上記対応語を表示。

### Canonical state inventory

| State | Readiness | Visible facts | Evidence constraint |
|---|---|---|---|
| B0 received | 42% | Kyoto Private Tour、09:00、6 travelers、ガイド/車両/旅程/顧客連絡の未解決4 | S1 step1、証拠12、外部送信0 |
| B1 work-progress | 57%→71% | 要件を進めている中間状態 | S1 step2の表示段階。各値から新たな完了件数やevidence数を計算しない。中間状態の未確認countは表示しない |
| B2 advanced | 86% | 車両確認済み、旅程解決済み、顧客回答受信、ガイド確認中。未解決1、証拠12 | S1 step2完了時。Heroはこの状態で固定 |
| B3 response | 86% | ガイド回答受信、照合待ち | S1 step3。業務上の回答が届いても準備完了にはしない。countは省略 |
| B4 ready | 100% | 必須条件が確認済み、未解決0、証拠18 | S1 step4。予約/日時/言語/競合/最新性を照合。100%はデモ内の結果 |
| R0 invalidated | 76% | ガイドキャンセル、以前の確認失効、未解決1 | S1 step5。以前のgreen badgeを直ちに取り消す |
| R1 candidate | 76% | Mika Sato、資格/言語/重複/報酬policy確認、回答は照合待ち | S1 step6。98%match等の付加scoreは不使用 |
| R2 recovered | 100% | 代替ガイド確認済み、5/5照合、証拠18、未解決0 | S1 step7。古い証拠の再利用だけでは到達不可 |

表示値はtyped fixtureから参照し、progress、status、count、badgeが別々のタイマーで進まないようにする。各sectionは明確にラベル付けした同一シナリオの別の場面であり、ページ全体をlive dashboardと偽装しない。HeroはB2固定、03は俯瞰、04は役割、05/06は明示的な局所操作。

### Section UI assignments

| Section | Unique visual | Control / behavior | Omit |
|---|---|---|---|
| Hero | 86% summary ring、4 requirement rows、activity3行、guide確認とevidence12、`Verification pending / 照合待ち`の明示 | 初回軽いwindow revealのみ。各subpanelを勝手にautoplayしない | 巨大app toolbar、実在provider logos、全ツアー集計 |
| Product Proof | compact readiness rail＋6工程。B0/B1/B2/B3/B4のselected state card | 初期42%。工程buttonで詳細更新。100%を既定値にしない。autoplayなし | 第二のfull dashboard |
| Workflow | 4種の別UI（次節） | sticky anchorでactive追従。click/keyboardでも到達可 | 5枚同じdashboardの画像差し替え |
| Verification | ガイド回答カード＋5条件checklist＋fresh evidence badge | 初期86%/回答受信。`証拠を照合 / Check evidence`→300ms検証表示→5条件✓→100%/催行可能。`もう一度 / Replay`で初期へ | chat入力、生成応答、実送信 |
| Recovery | ready summary→invalidation event→replacement comparison/checklist→recovered evidence | scrollで3章を選択、buttonsでも同一状態へ。詳細はMotion map | 根拠なし復旧時間・成功率・supplier実送信 |
| Context | category inputs→同じ予約/担当/ルール/証拠→状態/注意事項/次の判断 | 静止SVG/HTML diagram | provider logo/infinite marquee |
| Architecture | 許可された範囲→進行→検証→人の判断、4枠の短い図 | static、Technology linkのみ | 公開API/SDK console、セキュリティ認証 |
| Proof | 3行「体験できること」＋境界caption＋公開demo link | 実際の外部URLへnavigate | 数値metric、customer quote |

Product Proof工程: EN Booking received / Work identified / AI Workforce executes / Evidence received / Verification / Tour ready。JP 予約受信 / 未解決業務を特定 / 業務を実行 / 回答・証拠を受信 / 条件を照合 / 催行可能。
Readiness対応: 最初の2工程42%、実行57/71の選択可能な2段階、受信86%、照合中86%、完了100%。中間値はデモの段階として扱い、業務件数から算出したような数式は追加しない。

## 5. C — Final Workflow Tabs（4、追加しない）

元候補のConfirm suppliers / Chase responses / Coordinate guidesは製品の対象業務としては理解できるが、Phase Aの実デモでは独立した催促/サプライヤー連携画面まで確認できていない。現在証明可能なjob lifecycleを次の4つに固定する。

| Tab / anchor | Short headline EN / JP | One-line outcome EN / JP | Product UI state | CTA | Motion / Mobile | Truth |
|---|---|---|---|---|---|---|
| Identify / `workflow-identify` | Find what is unresolved. / 未解決の業務を見つける。 | Turn one booking into an explicit list of requirements. / ひとつの予約から、確認が必要な条件を明らかにします。 | B0 booking card＋未解決要件4行。42% | 外部CTAなし | active border150ms、panel300ms。mobile accordion1番を初期open | S1 steps1–2 / C04 |
| Execute / `workflow-execute` | Advance the work. / 必要な業務を進める。 | Follow vehicle checks, itinerary resolution, and a received guest response. / 車両の確認、旅程の整合、顧客からの回答まで、進行を追います。 | B2 agent activity timeline＋要件3行。86%。generic chatではない | なし | active panel300ms。mobile時系列縦stack | S1 step2 / C04 |
| Verify / `workflow-verify` | Check the evidence. / 証拠を照合する。 | A guide reply stays unverified until the required conditions are checked. / ガイドの回答は、必要な条件と照合するまで未確認です。 | B3 compact evidence drawer、回答と5条件の対比 | `How verification works / 検証の流れを見る`→`#verification` | panel300ms、auto100%へ進めない。mobile回答カード→照合項目 | S1 steps3–4 / C05 |
| Recover / `workflow-recover` | Restore readiness. / 催行可能な状態へ戻す。 | Invalidate the old confirmation and evaluate a replacement. / 以前の確認を無効にし、代替候補を評価します。 | R0→R1 invalidation badge＋candidate checklist。76%のまま | `Explore recovery / 復旧の流れを見る`→`#recovery` | panel300ms、完了演出は06に限定。mobile取消通知→候補チェック | S1 steps5–7 / C06,C07 |

Desktopで全4articleをDOMに保持し、左navのみsticky。scrollに応じ現在章を更新し、非active本文を透明にしない。手動clickは対象anchorへ通常scroll。mobileは4見出しbutton＋対応panel、少なくとも1panelが常に読める。JS無効では全4panelをstack表示。

## 6. Layout system — fixed implementation values

以下の色値はGappy向けmarketing tokensとして設計した値であり、実Product CSSから測色した値との主張ではない。S1のdark/lime言語を保持する。

| Token | Value / rule |
|---|---|
| Max container | 1440px、border-box。全Home sectionで共通 |
| Outer gutters | >=1200:32px /768–1199:24px /<768:20px |
| Grid | >=1200:12cols gap24 /768–1199:12cols gap20 /<768:1col gap24 |
| Section space | >=1200:112px /768–1199:80px /<768:64px。nav/footerとHeroのみ個別指定 |
| Light neutrals | paper #FAFAF7、white #FFFFFF、tint #F0F2ED、line #D9DED5、ink #17201B |
| Text secondary | light #536058、dark #B3C0CB。小文字を極薄grayにしない |
| Product/dark | night #08111B、panel #101D2A、raised #172635、line #30404F、text #F2F6F8 |
| Accent | lime #B6F36D、on-accent #14210D。light backgroundの小文字limeは禁止 |
| State colors | success #B6F36D / warning #F3C766 / risk #F28B82。text/icon併用、dark panel内のみ |
| Radius | marketing0–4px（CTA8px）/product frame16px（mobile12）/product card8px |
| Border/shadow | 構造は1px。shadowはHero product frameのみ`0 16px 48px rgba(8,17,27,.08)` |
| Fonts | 既存Noto Sans JP（JP）、Space Grotesk（EN）、DM Mono（code/idのみ）。追加fontなし |

### Six-level typography（font-sizeを増やさない）

| Level | 1440 | 1024 | 390 | Usage |
|---|---|---|---|---|
| Display | EN60/1.06、JP48/1.25 | EN48/1.1、JP40/1.25 | EN36/1.12、JP32/1.3 | H1/final、readiness数値（必要時このlevelを使用） |
| Section | 40/1.2 | 34/1.25 | 28/1.35 | H2 |
| Subheading | 24/1.4 | 22/1.4 | 20/1.45 | H3/major product title |
| Lead | 18/1.7 | 18/1.7 | 17/1.8 | Hero/section intro |
| Body | 16/1.65 | 16/1.65 | 16/1.75 | prose、CTA、active product requirement |
| Meta | 13/1.5 | 13/1.5 | 13/1.6 | eyebrow/id/caption/status。これ未満にしない |

見出しweight700、本文400、UI500、status600。JP negative tracking -0.025emまで、EN -0.04emまで。14/15/72等の追加sizeを場当たり的に作らない。UIが収まらなければ情報を減らす。

### Section composition by viewport

| Section | Desktop 1440 | Tablet 1024 | Mobile 390 |
|---|---|---|---|
| 01 Navigation | announcement32h＋nav80h、scroll24px以降nav64h。logo / primary nav / language / sales / demo | announcement32＋nav64、full navをdrawerへ。demoとmenu表示 | announcement最大44h、nav64、logo＋menu。page上部に重いsticky acquisition dockを作らない |
| 02 Hero | top64/bottom96。copy5cols /product7cols、top aligned。UI約720w以上を確保、hero全体にmin-height固定なし | copy12cols max640、product12cols below、top48/bottom80 | copy→full-width primary→text secondary→UI。top32/bottom56、製品cardにreadiness＋3requirements＋activity1行。残りは03以降 |
| 03 Product Proof | intro4cols /sequence8cols、6工程は横並び、selected detail below | intro12、sequence12、工程3×2 | intro→縦6工程button、選択detailを近接表示。横carouselなし |
| 04 Workflow | nav3cols sticky top96 /4article9cols、article最小420h・最大自然高。sectionに巨大な空白scroll距離を作らない | left4/right8、top88、article最小360h | accordion4つ、44px以上の見出しbutton、active内容を全幅で縦表示。sticky解除 |
| 05 Verification | copy4 / evidence＋checks8（4+4）、resultは同じframe内 | copy12 /UI12 | 回答→条件5行→検証button→結果。subpanel横縮小なし |
| 06 Recovery | copy4 / sticky state8、右内部に3chapterを順表示。scroll track最大1600h | copy12、3stateを縦、scroll-linked無し | 100→76→100の3stateを縦stack。各stateのbadgeと根拠常時表示。必要なら「次へ」anchor、横swipeなし |
| 07 Context | heading/body5 /diagram7、inputs4×2→Gappy context→outputs3 | intro12/diagram12 | inputs2cols→context card→outputs1col。矢印も縦方向 |
| 08 Architecture | headline5 /4stage diagram7、各stage短文 | intro12/diagram2×2 | 4stage縦並び、1行title＋1行body |
| 09 Verifiable Proof | copy5 /proof3rows7、1px row divider | copy12/rows12 | copy→3行→demo CTA。数値巨大cardなし |
| 10 Final CTA | centered max720、2CTA横、padding96 | centered、padding80 | padding64、主CTA全幅・secondary text link |
| 11 Footer | logo/legal4 /route links5 /contact3 | 4＋4＋4 | logo/tagline→links2col→contact/legal、padding48、touch44 |

390は基準で375–430も破綻させない。768–1199はtablet規則、1200以上desktop。headerとanchorは`scroll-margin-top`を実header高＋16pxへ。body横overflowのclipで不具合を隠さず、overflow要素を検出して修正する。

## 7. F — Motion Map

Duration tokensは150/300/400msのみ（静止・即時切替は0ms）。Easingは全て`cubic-bezier(0,0,0,1)`。reduced motionではduration0、smooth-scrollなし。意味のある情報をopacity0のまま待機させない。連続loop、autoplay slideshow、wheel hijacking、parallax、bounceなし。

Scroll-linked対象はHero entry /Workflow active tracking /Recoveryの最大3つ。Verificationは明示操作。editorial text revealは採用しない。header/hover/focusはutility transitionで製品演出を増やさない。

| Section | Trigger | Property | Duration | Reduced motion / fallback |
|---|---|---|---|---|
| Navigation | scrollY>24、hover、menu open | border/background color、navheight80→64（desktopのみ） | 150ms color、300ms height | height変化なし64。menu即時。focus ring即時 |
| Hero | 初回in-view、1度のみ | window opacity .88→1、scale .98→1。layout寸法は確保 | 400ms | B2静止。readiness86はcount-upしない。JSなしも読める |
| Product Proof | 工程buttonを押す | selected状態とdetailを即時更新。独立した製品アニメーションは追加しない | 0ms | 即時state切替、全工程textは常時表示 |
| Workflow | articleがheader下35%位置を通過 /nav click | active border/color、panel内accent opacity（本文は隠さない） | 150ms /300ms | scroll同期不要、通常anchor＋static全article。mobile accordion即時 |
| Verification | Check evidence button | status text＋check icon color /result opacity | 300ms | 即時結果。実ネットワーク待機風の長いspinnerは禁止 |
| Recovery | desktop3chapterのin-view /対応button | status color/border、progress width、panel opacity | 300ms color /400ms progress | 全3章の結果をstack表示。mobile/tabletも同じstatic story |
| Context | なし | なし | 0 | 常に静止 |
| Architecture | なし | なし | 0 | 常に静止 |
| Verifiable Proof | link hover/focusのみ | underline/color | 150ms | 即時 |
| Final CTA | hover/focus | background/border | 150ms | 即時 |
| Footer | hover/focus | underline/color | 150ms | 即時 |

### Recovery controlled sequence

3 chapter: (a) B4 ready100、(b) R0 invalidated76＋R1 candidate76（同章、下部checklist）、(c) R2 recovered100。
desktopは自然scrollの観測のみで状態を選択。進捗数値をscroll位置から連続算出せず、100/76/100の離散値に固定。戻りscrollは「デモの前の場面を見る」でありproduction state rollbackではない。status captionに場面番号を表示。
明示control labels: `Ready / Change & re-check / Recovered`、JP`準備完了 / 変更と再確認 / 復旧完了`。Arrow keys/Home/Endでselection、focus自動移動はしない。manual selection中は次に自然scrollするまで自動追従を止める。全状態がDOM textとして利用可能。

## 8. CTA contract

| ID | Destination | Placement | Rules |
|---|---|---|---|
| CTA-DEMO | `https://gappy-workforce-lab-0925.mitsuki222581.chatgpt.site/` | announcement/nav/Hero/Proof/Final | 同一tab。外部移動を明示。URL hashで未確認localeを推測しない。demo入口にはJP/EN switchあり。両言語ともこの安定rootを使用 |
| CTA-SALES | `https://calendar.app.google/KpXGF5RTgqRpg72n6`（既存GOODTIME_URL） | desktop nav/Hero/Final/Footer | 既存config単一参照。同一tab。clickをmeeting bookedとしない |
| CTA-TECH | `/ja/technology`（将来ENなら`/technology`） | 08/nav/footer | 現行route。新しいarchitectureページを作らない |
| CTA-VERIFY | `#verification` | Workflow Verify | 同ページanchor |
| CTA-RECOVER | `#recovery` | Workflow Recover | 同ページanchor |

全リンクは実href、clickだけのdiv禁止。新しいvideo gate、email field、newsletterはなし。MP4は本版Homeへ直接掲載しない（仕様上の決定）。公開デモを主体にし、未検証字幕と14MB初期負荷を回避する。既存Travel動画はそのまま。

## 9. Context / architecture / proof detail copy

### Context diagram（category iconのみ）

| Inputs EN / JP | Center | Outputs EN / JP |
|---|---|---|
| Booking systems /予約システム、OTA /OTA、Email /メール、Chat /チャット、Calendar /カレンダー、Policies /業務ルール、Assignments /担当・割当、Traveler details /旅行者情報 | Gappy / Booking · assignments · rules · evidence /予約・担当・ルール・証拠 | Operational readiness /催行準備の状態、Items requiring attention /対応が必要な事項、Context for the next decision /次の判断に必要な情報 |

候補のProactive alerts/Smarter decisionsは、独立した通知機能や比較優位が未確認のため上記に変更。情報カテゴリーの図であり、接続connectorの可用性を示さない。実メール、PII、実予定表は掲載しない。

### Architecture diagram（design principles）

| EN title / body | JP title / body |
|---|---|
| Permissioned context / Define what may be accessed and changed. | 許可の範囲 / 参照・操作してよい範囲を定める。 |
| Workflow runtime / Track the operation through its states. | 業務の進行 / 状態を追い、次の処理につなぐ。 |
| Outcome verification / Check the evidence before completion. | 結果の検証 / 完了にする前に証拠を照合する。 |
| Human control / Escalate decisions that need judgment. | 人による判断 / 判断が必要な場面を人へつなぐ。 |

API/MCP、Risk-based Autonomyの独立機能名、enterprise-ready、certified、secure-by-default等は採用しない。S4の設計思想へのリンクで説明し、実装保証へ変えない。

### Proof panel three rows

| EN | JP | Source |
|---|---|---|
| Booking readiness — follow unresolved work to a ready state. | 催行準備 — 未解決の業務が準備完了に至る流れ。 | S1 steps1–4 |
| Evidence checks — distinguish a received reply from verification. | 証拠の照合 — 回答受信と確認済みを区別する流れ。 | S1 steps3–4 |
| Recovery — invalidate the old confirmation and verify the replacement. | 変更からの復旧 — 以前の確認を無効にし、代替を再検証する流れ。 | S1 steps5–7 |

### A/B/C Proof classification

| Class | Allowed content / decision |
|---|---|
| A 使用可能 | S1公開demoへの実リンク、そこで観察したworkflow/evidence/recovery、synthetic/実送信なし/登録不要というデモの境界 |
| B 要確認（本版では掲載しない） | own operational usage、実予約件数、研究/技術協力、design partner名称、実顧客評価、live integration、SLA、公開可能な更新記事 |
| C 使用禁止 | fabricated顧客/数値/quote、UNKNOWNをverified化、Trusted by XX、競合logo/写真/コピー、demo%を業務改善率とすること、free trial、実接続未確認provider logo |

## 10. Product Asset Map

全PNGは`/Users/asanomitsuruakira/Downloads/`内。direct image採用は0。原画像/競合参照はpublic assetへ置かない。HTML再構成はS1の意味を優先し、画面の装飾だけをS3から参考にする。

| Filename | Intended section | Use as | Canonical source priority | Differences vs actual demo |
|---|---|---|---|---|
| ChatGPT Image Sep 28, 2026, 11_52_01 PM-1.png | Hero/Verification/Recovery/mobile | visual reference＋HTML reconstructionの構図参考 | S1>S2>S3 | JPコラージュ、複数tour集計・ロゴ・人物・100→76→86→100はS1と一致しない部分あり。86中間復旧は追加しない |
| ChatGPT Image Sep 28, 2026, 11_52_03 PM-2.png | Hero readiness＋Product Proof rail | visual reference、ring/railをHTML/SVG再構成 | S1>S2>S3 | Japan Highlights/複数カテゴリ/件数がcanonicalと異なる。「全確認済み」と86%を併記しない |
| ChatGPT Image Sep 28, 2026, 11_52_04 PM-3.png | Workflow Identify/Execute | visual reference、requirements/activityのHTML構図 | S1>S2>S3 | Tokyo Highlights、8要件/実provider名/日時が異なる。canonical4要件へ置換 |
| ChatGPT Image Sep 28, 2026, 11_52_05 PM-4.png | Workflow Execute、Recoveryのactivity | visual referenceのみ | S1>S2>S3 | 全社home、複数tour集計、週次+12%は今回の根拠なし。metric/ツアー一覧は使わない |
| ChatGPT Image Sep 28, 2026, 11_52_06 PM-5.png | Verification evidence、Hero subpanel | visual reference＋HTML evidence構図 | S1>S2>S3 | provider logos/PDF/Production表示はS1根拠なし。evidenceは合成回答と照合項目だけ |
| ChatGPT Image Sep 28, 2026, 11_52_08 PM-6.png | Product Proof ready /Recovery final | visual reference＋HTML readiness summary | S1>S2>S3 | Kyoto100%は意味が近いがtour/date/要件/旅人数・evidenceが異なる。背景写真・logoも採用しない |
| ChatGPT Image Sep 28, 2026, 11_52_09 PM-7.png | Hero /Workflow Execute | visual reference＋HTML split requirements/activity | S1>S2>S3 | 集計24/3/18/21、task比率、別ツアー・messagesはcanonicalと異なる。global metricsと＋New Tourを持ち込まない |
| 株式会社Gappy Demo動画 (AI Workforce) .mp4 | 状態順序・UI照合 | visual reference only | S1>S2>S3 | 前後のconcept画面と実demo映像を区別。38.714秒、音声全文未検証。本版に直接embedしない |
| project.zip /assets/ref/* | 全体IA/spacing/mobile | internal design reference only | S5は外側の設計のみ | Attioブランド/CRM/顧客/ライセンス資産は使用しない |
| repository BrandMark/logo | Header/Footer/product frame | existing official asset | S4がブランド正規ソース | PNG毎の異なるロゴを新ブランドとして採用しない |

## 11. H — CLAIMS_LEDGER

公開コピー・diagram labels・UI fixtureの主張はこのledgerに紐づくものに限定する。CTA/section titleの非事実的な呼びかけも該当IDの範囲で管理する。新しい主張を追加する場合はsourceとstatusを先に追加し、UNKNOWNは非表示。

| ID / Claim | Source | Status | Where used / boundary |
|---|---|---|---|
| C01 公開interactive demoが利用でき、登録なしで体験できる | S1入口と全7step | VERIFIED | 01/02/09/10、Q3、CTA-DEMO。Phase C公開直前に到達性を再確認 |
| C02 Gappy AI Workforce for Travel Operations / Keep every tour ready /仕事を進め結果を検証するという製品の約束 | S1の実演、S4のpositioning | SYNTHETIC DEMO | Hero/Final。全ツアーの完了保証・実運用実績とはしない、隣接Q1 |
| C03 Hero86%、未解決1、証拠12、guide確認中 | S1 step2完了 | SYNTHETIC DEMO | Hero、B2。ready badge禁止 |
| C04 42→57→71→86→100、予約/4業務/agent activity | S1 steps1–4 | SYNTHETIC DEMO | 03/04。中間値の新しい算出式・実績換算をしない |
| C05 回答受信≠検証、条件とfreshness照合後にready | S1 steps3–4 | SYNTHETIC DEMO | 04/05/09、検証操作。Productionの保証ではない |
| C06 guide cancellationで以前の確認失効、100→76 | S1 step5 | SYNTHETIC DEMO | 04/06/09 |
| C07 代替の資格/言語/重複/報酬policy/回答照合、再検証後100、5/5、証拠18 | S1 steps6–7 | SYNTHETIC DEMO | 04/06/09。実人材選定・自動実発注とはしない |
| C08 予約/担当/ルール/証拠の文脈を扱う | S1表示項目、S4 existing systems原則 | SYNTHETIC DEMO | 07。入力8カテゴリは概念図。OTA/chat/calendar live connectorの証明ではない |
| C09 許可範囲・runtime・verification・human controlという設計原則 | S4公開technology/homeコピー | VERIFIED | 08。確認済みなのは「公開されている設計原則」。実装安全性・認証は主張しない。Q4明示 |
| C10 公開demoでready/evidence/recoveryを確認できる | S1で実際に操作 | VERIFIED | 09のproof3行。見せている内容はsynthetic |
| C11 このデモのdataは合成、外部送信0 | S1全状態の表示・デモ表記 | SYNTHETIC DEMO | Q1/Q2。プラットフォーム全体の外部通信ゼロの監査主張ではない |
| C12 相談予約リンク | S4 GOODTIME_URL | VERIFIED | CTA-SALES。確定meetingは主張しない |
| C13 正規会社名/住所/email、企業route、言語route | S4 config/content/routes | VERIFIED | 01/11。既存データを参照し、新しい会社情報を発明しない |
| U01 実顧客数/売上/実予約件数/稼働率/工数削減 | 根拠未提供 | UNKNOWN | 不掲載 |
| U02 own operational usage、公表可能なresearch/design partners | Phase A未確認 | UNKNOWN | 不掲載。名称/許可/一次資料が揃ってから別改訂 |
| U03 supplier催促の独立機能、精算、個別provider統合、公開API/MCP、self-service onboarding | 実装根拠未確認 | UNKNOWN | workflow tabs/architectureへ追加しない |
| U04 新規MP4音声全文・字幕適合、公開更新記事3–4件 | 未検証/未提供 | UNKNOWN | MP4直接公開・changelog不採用 |
| X01 Trusted by XX、架空quote、demo率を顧客改善率化、競合実績の転用 | 存在しない/別会社 | DO NOT USE | 全面禁止 |
| X02 certified、Production proven、free trial、fully self-serve white-label | 今回根拠なし・既存方針と不整合 | DO NOT USE | 全面禁止。本版にwhite-labelセクションなし |
| X03 生成PNG内のProduction/実provider logo/全ツアー集計/98%matchingを無注記で転用 | S3またはデモ補助値 | DO NOT USE | 本版非採用 |

証拠不足のproofを削っても11block storyは成立する。UNKNOWNを解消するための調査を実装完了の無限待ち条件にしない。

## 12. G — Mobile / a11y / performance invariants

- Mobileはcopy→CTA→readiness→重要要件→activity。sidebar/全tableを縮小しない。13px未満の製品文字を作らない。
- target最小44×44px、focus-visible、contrast AA（本文4.5:1、大文字3:1）を実測。色だけのstatus禁止。
- Tab操作はrole/ariaで対応。scroll-showcaseはanchor navであり、click tabのふりをしない。mobile accordionはaria-expanded/controls。state buttonはaria-pressed。
- Mobile menuはEscape close、focus trap、triggerへfocus復帰、背景inert、スクロールlock解除を実装。幅変更でlockを残さない。
- H1は1つ、section H2、UI titleは階層に応じH3またはlabel。sticky内容とDOM順を一致させる。
- aria-liveは利用者が押したstateの短い結果のみpolite。scrollするだけで全段階を読み上げない。
- Textと初期stateはSSR。JS無効でもbody、evidence原則、CTA、全storyを読める。
- Heroにvideo/iframeなし。layout寸法を予約してCLSを抑える。必要ない写真/14MB動画をpreloadしない。新しいanimation libraryを入れない。
- 大きなCSS/JSをcorporate全routeへ広げずHome単位に分離。Lighthouseの数値目標だけで合格にせず、LCP要素・network・fonts・CLSを記録する。

## 13. J — Phase C implementation plan and release boundaries

1. 最新remote main/HEAD/worktreeを確認。既存変更をresetしない。Home用branchで本書2ファイルを引き継ぐ。既存Travel PRを改変して別目的のPRにしない。
2. `content/home-v2.ts`相当のtyped bilingual copy＋fixtureを定義。上記matrix/ledger ID/状態を一元化。ENは定義するがrouteへは未公開。
3. `components/home-v2/`相当へSectionShell、HeroProductWindow、BookingReadinessSequence、WorkflowShowcase、EvidenceVerification、RecoverySequence、OperationalContextDiagram、OperationalControls、DemoProofPanel、HomeFinalCTAを実装。
4. `app/ja/page.tsx`のみ新Homeへ接続。rootをclient化しない。Header/Footerには明示Home variantだけを追加し、他routeは従来仕様。
5. Home専用tokens/styleと少数client island。scoped CSSを使用し、既存`.travel-theme`/global typographyを書き換えない。
6. JP metadataは `Gappy | 旅行オペレーションのためのAI Workforce`、descriptionはHero body＋「公開デモで、証拠の照合と変更からの復旧を体験できます。」。canonical `/ja/`、hreflang `/`・`/ja/`・x-default `/`維持。Organization/WebSite JSON-LD保持、架空ratings/offers追加なし。
7. fixture invariants単体テスト: response-onlyは86、guide cancellationで旧verified失効、replacement responseだけで100禁止、新証拠検証で100、replay初期化、全localeに同じ状態意味。
8. 既存CI全実行: `npm ci`、`npm run lint`、`npx tsc --noEmit`、`npm run test:travel-demo`、`npm run test:travel-acquisition`、`npm run test:travel-localization`、`npm run build`。新Home testもvalidate jobへ。既存assertionを弱めない。
9. Browser functional: CTA/anchors/locale/nav、menu keyboard、reduced-motion、console/hydration、no lead POST/no persistent analytics POST。外部calendarで実予約を作成しない。
10. Visual loop1: 1440×1000/1440×1800/390×844/430×932、768/1024幅。可読性・密度・product fidelity・overflowを修正。Loop2: 同寸法再capture、全主stateを再確認。修正がなければ比較結果と理由を記録する。
11. EN `/`、EN/JP Travel、Technology/Cases/Resources/About/Careers/Contactの代表route回帰。shared style波及ゼロを確認。
12. Preview review packageを作成、human acceptanceを待つ。Production deploy/mergeには新しい明示承認が必要。本書完成はその承認ではない。

### No-capture preservation

`TRAVEL_ACQUISITION_COLLECTION_ENABLED=false` / `TRAVEL_ACQUISITION_PRODUCTION_ENABLED=false` / `TRAVEL_DEMO_LEAD_CAPTURE_ENABLED=false` / `TRAVEL_ANALYTICS_ENABLED=false`を維持。今回環境変数を操作せず、APIのfail-closedも変更しない。Ops/marketing DBは範囲外。新Homeにreceiver/analytics beaconを追加しない。

## 14. I — Remaining unknowns and closed fallbacks

| Unknown | Fixed decision for this version | Blocks implementation? |
|---|---|---|
| customer/research/own-operations一次証拠 | 不掲載、公開demo proofに限定 | No |
| provider/API/MCP可用性 | generic category diagram、設計原則のみ | No |
| 添付MP4字幕/音声の整合 | Homeにembedしない。visual referenceのみ | No |
| EN全面redesignの公開範囲 | コピーは完成、既存EN route維持 | No |
| public demoの将来availability | Phase Cと公開前にURL再確認。到達不可なら公開gateを停止し、嘘のlive announcementを出さない | Launch gate only |

## 15. Phase B acceptance / change control

- 11sections、4workflow、全JP/EN copy、product states、3viewports、motion、CTA、asset priority、claims ledgerを固定。
- 架空のproofを必要としない。画像直接利用0、公開動画追加0、獲得機能追加0。
- 仕様外feature/claim/section/route/capture追加は黙って行わない。変更理由・影響・sourceを明記して仕様差分を提示。
- Phase Bチェックは文書整合性のみ。実装test/visual approval/Production readinessとは区別する。

**GAPPY LP V2 — SPEC READY**
