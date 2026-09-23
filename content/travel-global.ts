import type { Locale } from '@/content'

export const TRAVEL_SECTION_IDS = [
  'hero', 'work-demo', 'video-walkthrough', 'role-view', 'platform',
  'scenarios', 'business-impact', 'pilot', 'faq', 'final-cta',
] as const

type Pair = readonly [string, string]
type Triple = readonly [string, string, string]

export type TravelGlobalCopy = {
  hero: { eyebrow: string; title: Pair; body: string; tertiary: string; imageAlt: string; productAria: string; productBar: Pair; productLabel: string; productTitle: string; tasks: readonly Triple[]; reply: Pair; verified: Pair }
  demo: {
    label: string; title: string; body: string; disclaimer: string; instructionLabel: string; instruction: string; run: string; reset: string
    queueLabel: string; queue: readonly Pair[]; evidence: string; empty: string; currentWork: string; tomorrow: string; version: string; guide: string
    workflowAria: string; steps: readonly string[]; stepStates: Record<'complete' | 'active' | 'pending', string>
    start: string; prepared: string; approve: string; waiting: string; responseWarning: string; verify: string; conflict: string
    verifying: string; verified: string; snapshot: string; checks: readonly string[]; scope: string; changeTime: string; loopComplete: string
    bookingChanged: string; priorInvalid: string; prepareReconfirmation: string; noReply: string; followUp: string; handoff: string
    before: Pair; after: Pair; roleAria: string; roleTabs: Pair; currentStatus: string; booking: string; assignedGuide: string; meetingPoint: string; latestEvidence: string
    prototype: string; date: string; time: string; question: string; confirm: string; cannot: string; needHelp: string; controlsHelp: string
    status: Record<string, string>; roleLabel: string; roleTitle: string; roleBody: string
  }
  video: { kicker: string; title: string; body: string; playAria: string; requestAria: string; posterAlt: string; badge: string; cardTitle: string; cardBody: string; disclaimer: string; watch: string; access: string; dialogBadge: string; dialogTitle: string; close: string; unsupported: string; transcriptLabel: string; transcript: readonly string[] }
  platform: { kicker: string; title: string; body: string; link: string; aria: string; core: Pair; path: readonly Triple[]; controls: readonly Pair[]; maturity: string; brandTitle: string; brandBody: string; configured: string; yourLogo: string; booking: string; guideConfirmation: string; tomorrow: string; confirmBooking: string; swatches: readonly string[] }
  scenarios: { kicker: string; title: string; body: string; badge: string; cards: readonly { id: 'initial' | 'missing-reply' | 'booking-changed'; title: string; body: string; action: string; image: string; alt: string }[] }
  roi: { kicker: string; title: string; body: string; measures: readonly string[]; evidence: string; panelLabel: string; monthlyCases: string; manualMinutes: string; coverage: string; reduction: string; hourlyCost: string; currency: string; baselineHours: string; hoursReturned: string; monthlyValue: string; annualValue: string; disclaimer: string }
  pilot: { kicker: string; title: string; body: string; cta: string; stages: readonly Triple[]; measurementLabel: string; metrics: readonly string[] }
  faq: { kicker: string; title: string; items: readonly Pair[] }
  final: { eyebrow: string; title: string; body: string; formTitle: string }
  acquisition: {
    book: string; noRegistration: string; heroVideo: string; directVideo: string; watch: string; continueVideo: string; getAccess: string
    workEmail: string; placeholder: string; saving: string; checking: string; saved: string; continueWatching: string
    purpose: string; privacyNotice: string; privacyQuestions: string; accessMessage: string; invalidEmail: string; savingRequest: string
    accepted: string; saveError: string; unavailable: string; gateEyebrow: string; gateTitle: string; closeGate: string; dockLead: string; dismissDock: string
  }
}

const en: TravelGlobalCopy = {
  hero: {
    eyebrow: 'AI workforce / Travel operations', title: ['Guide confirmations.', 'Followed through.'],
    body: 'Gappy coordinates guide and supplier confirmations, follows up on missing replies, and checks the latest booking before work is called complete.',
    tertiary: 'Try the interactive demo ↓', imageAlt: 'A travel operations team coordinating upcoming tours in a modern office',
    productAria: 'Sample confirmation workflow status', productBar: ['SAMPLE WORKFLOW / BOOKING #2871', 'INTERACTIVE PROTOTYPE'],
    productLabel: "Tomorrow's departures", productTitle: 'Guide confirmation',
    tasks: [['Booking context loaded', '12 departures · sample data', 'DONE'], ['Follow up on missing replies', 'Operator approval retained', 'ACTIVE'], ['Verify current booking', 'Close only with current evidence', 'NEXT']],
    reply: ['Guide reply received', 'Awaiting verification'], verified: ['VERIFIED', 'of 12 sample bookings'],
  },
  demo: {
    label: 'Concrete work demo', title: 'Instruction → workflow → verification.', body: 'One fixed, fictional workflow. Follow the same booking through approval, guide response, verification, a material change, and reconfirmation.', disclaimer: 'Interactive prototype · Sample data · No messages sent',
    instructionLabel: 'Fixed sample instruction', instruction: "Check tomorrow's departures and follow up on unconfirmed guides.", run: 'Run sample', reset: 'Reset',
    queueLabel: 'Illustrative queue overview · static sample snapshot', queue: [['8', 'Verified'], ['2', 'Waiting'], ['1', 'Needs approval'], ['1', 'Blocked']],
    evidence: 'Observable activity & evidence', empty: "Run the sample to inspect tomorrow's queue.", currentWork: 'Current work item', tomorrow: 'Tomorrow', version: 'Version', guide: 'Guide',
    workflowAria: 'Connected confirmation workflow', steps: ['Booking context', 'Confirmation needed', 'Operator approval', 'Simulated request', 'Wait / bounded follow-up', 'Current-booking verification', 'Verified / human handoff'],
    stepStates: { complete: 'complete', active: 'active', pending: 'pending' }, start: 'Start with booking', prepared: 'Prepared request: confirm guide assignment, start time, and meeting point.', approve: 'Approve simulated request', waiting: 'Approved request. Continue in the guide view directly below.',
    responseWarning: 'RESPONSE RECEIVED ≠ VERIFIED. Compare the reply with the current booking before closing.', verify: 'Verify current details', conflict: 'Simulate source conflict', verifying: 'VERIFYING CURRENT BOOKING', verified: 'VERIFIED', snapshot: 'CURRENT SNAPSHOT',
    checks: ['Booking active', 'Start time', 'Booking version', 'Assigned guide'], scope: 'This verifies the current guide confirmation, not that the tour was operated.', changeTime: 'Change booking to 10:30', loopComplete: 'Reconfirmation loop complete',
    bookingChanged: 'Booking changed', priorInvalid: 'PRIOR CONFIRMATION INVALID · RECONFIRMATION REQUIRED', prepareReconfirmation: 'Prepare reconfirmation', noReply: 'No reply yet. The job stays open; one bounded follow-up is due at 15:00.', followUp: 'Simulate follow-up', handoff: 'HUMAN HANDOFF REQUIRED · NOT VERIFIED',
    before: ['Before', 'Find task → contact → wait → check → chase → update → check again'], after: ['With Gappy', 'Detect → prepare → approve → follow up → verify → hand off'],
    roleAria: 'Booking role views', roleTabs: ['For operations teams', 'For guides & suppliers'], currentStatus: 'Current status', booking: 'Booking', assignedGuide: 'Assigned guide', meetingPoint: 'Meeting point', latestEvidence: 'Latest evidence',
    prototype: 'Prototype · configured during pilot', date: 'Date', time: 'Time', question: 'Can you operate this tour with these details?', confirm: 'Confirm', cannot: 'Cannot operate', needHelp: 'Need help', controlsHelp: 'The response controls activate after the operations team approves the simulated request.',
    status: { idle: 'READY TO RUN', approval: 'NEEDS APPROVAL', waiting: 'WAITING FOR GUIDE', response: 'RESPONSE RECEIVED', verifying: 'VERIFYING', verified: 'VERIFIED', reconfirmation: 'RECONFIRMATION REQUIRED', cannot: 'CANNOT OPERATE', help: 'NEEDS HUMAN HELP', noReply: 'FOLLOW-UP DUE', conflict: 'SOURCE CONFLICT' },
    roleLabel: 'Two views · one booking', roleTitle: 'The operations team and the guide see the same job.', roleBody: 'This second projection stays synchronized with the interactive stage above: one booking, one lifecycle, and one current source of truth.',
  },
  video: {
    kicker: '02 / Product walkthrough', title: 'Watch the whole loop.\nNot just the action.', body: 'The short film follows one sample booking from instruction and approval through a guide response and current-booking verification.',
    playAria: 'Play the prototype walkthrough', requestAria: 'Request access to the prototype walkthrough', posterAlt: 'Prototype workflow showing a guide confirmation moving from response received to verified', badge: 'Prototype walkthrough · Sample data', cardTitle: 'From instruction to verified confirmation',
    cardBody: 'See the operations view, guide response, current-booking verification, and shared role views for the same booking.', disclaimer: 'Interactive prototype · No real bookings or messages', watch: 'Watch walkthrough', access: 'Get video access', dialogBadge: 'Prototype walkthrough · Sample data · No messages sent', dialogTitle: 'Guide confirmation, verified against the latest booking', close: 'Close video', unsupported: 'Your browser does not support HTML video.', transcriptLabel: 'Read transcript',
    transcript: ["Tomorrow's tours are booked. But is the assigned guide confirmed for the current booking?", 'The sample instruction surfaces booking #2871 and prepares a request for 09:00, version 3.', 'The operations team explicitly approves the simulated request. The guide confirms 09:00 on a simple operator-branded page.', 'Response received does not mean verified. Gappy compares the reply with the current booking before verifying version 3.', 'The booking then changes from 09:00 to 10:30. Version 3 is invalidated, version 4 requires a new guide reply, and work stays open until the current confirmation is verified.'],
  },
  platform: {
    kicker: '04 / The operating layer', title: 'Keep your systems.\nAdd completion.', body: 'Gappy works around the operation already in place. Pilot scope, connection method, decision boundaries, and evidence requirements are agreed with each operator.', link: 'Map one workflow', aria: 'Platform operating flow', core: ['AI Workforce', 'ONE RUNTIME'],
    path: [['01', 'Booking context', 'Your existing source'], ['02', 'Workflow', 'Bounded operating rule'], ['03', 'External view', 'Guide or supplier'], ['04', 'Verification', 'Current evidence']],
    controls: [['Approval boundaries', 'Humans approve external action until the pilot evidence supports a narrower delegated boundary.'], ['Fail-closed verification', 'Unknown, stale, conflicting, or missing evidence stays open or moves to a person.'], ['Current-booking check', 'A reply is compared with the latest booking snapshot before confirmation is marked complete.']],
    maturity: 'Partial / pilot-ready foundation', brandTitle: 'Your operation.\nYour brand.', brandBody: "Gappy can be configured around each operator's brand, workflow rules, and operating context while the underlying AI Workforce runtime stays consistent.", configured: 'Configured with your team during pilot.',
    yourLogo: 'YOUR LOGO', booking: 'BOOKING #2871', guideConfirmation: 'Guide confirmation', tomorrow: 'Tomorrow · 09:00', confirmBooking: 'Confirm booking', swatches: ['Your brand', 'Your operating rules', 'Your market', 'One shared runtime'],
  },
  scenarios: {
    kicker: '05 / Workflow states', title: 'Built for the moments\nthat do not go to plan.', body: 'Three views of the same fictional booking. These are interactive workflow examples, not customer stories or deployed-results claims.', badge: 'SAMPLE SCENARIO',
    cards: [
      { id: 'initial', title: 'Initial confirmation', body: 'Surface the booking, prepare the request, and keep operator approval visible.', action: 'Run initial confirmation', image: '/travel-scenario-initial.webp', alt: 'A local guide checks booking details at a quiet morning meeting point' },
      { id: 'missing-reply', title: 'Missing reply', body: 'Keep the work open, follow up inside a bounded rule, and hand off at the deadline.', action: 'View follow-up state', image: '/travel-scenario-missing-reply.webp', alt: 'A travel operations coordinator checks a pending response near a deadline' },
      { id: 'booking-changed', title: 'Booking changed', body: 'Invalidate the old 09:00 confirmation when the current start time becomes 10:30.', action: 'Run change scenario', image: '/travel-scenario-booking-changed.webp', alt: 'A travel operator reviews an updated itinerary at a rainy pickup point' },
    ],
  },
  roi: {
    kicker: '06 / Business impact', title: 'Measure the work\nthat disappears.', body: 'Model the human work that could be returned to your team. Gappy measures completion, intervention, and elapsed time—not activity volume alone.',
    measures: ['Human minutes', 'Human touches', 'Time to verified completion', 'Exception rate', 'Cost / capacity impact'], evidence: 'No Gappy performance benchmark is shown because real operational measurement has not begun.', panelLabel: 'Illustrative capacity model',
    monthlyCases: 'Monthly workflow cases', manualMinutes: 'Current manual minutes / case', coverage: 'Addressable workflow coverage', reduction: 'Assumed human-work reduction', hourlyCost: 'Loaded hourly labor cost', currency: 'Currency',
    baselineHours: 'Baseline manual hours / month', hoursReturned: 'Potential hours returned / month', monthlyValue: 'Estimated capacity value / month', annualValue: 'Estimated capacity value / year', disclaimer: 'Illustrative estimate based on your inputs. Not a guarantee of realized savings.',
  },
  pilot: {
    kicker: '07 / Start bounded', title: 'One workflow.\nEvidence before expansion.', body: 'A workflow review can lead to offline evaluation, Shadow Mode, and human-approved execution. Scope and timing are discussed on the demo call.', cta: 'Book a demo',
    stages: [['01', 'Operations Review', 'Map the workflow, systems, deadlines, and exceptions.'], ['02', 'Offline Evaluation', 'Compare Gappy against historical operational cases.'], ['03', 'Shadow Mode', 'Process real cases without sending externally.'], ['04', 'Human-approved Execution', 'Let operators approve each external action.']],
    measurementLabel: 'MEASURES TO DEFINE TOGETHER · NO BENCHMARK IMPLIED', metrics: ['Verified Completion Rate', 'Human Touch Rate', 'Time to Verified Completion', 'Unconfirmed Bookings at Deadline', 'Escalation Rate', 'Reconfirmation Rate'],
  },
  faq: {
    kicker: '08 / Before we start', title: 'Good questions.\nStraight answers.', items: [
      ['Does Gappy replace our booking system?', 'No. The pilot is designed around the existing source of booking context. Connection method and access are agreed per operator.'],
      ['Who receives confirmation requests?', 'The first workflow is scoped to assigned guides or suppliers. The operator decides the approved recipient and communication boundary during pilot setup.'],
      ['Can a reply close the job automatically?', 'Not by itself. The current booking details and available evidence must be checked first. Unknown or conflicting state stays open or moves to a person.'],
      ['How much control does our team keep?', 'Start in offline or Shadow Mode, then use human approval. Responsibility expands only where the agreed operating evidence supports it.'],
      ['Can the external page use our brand?', 'A partial multi-tenant and white-label foundation exists. Supported brand and workflow configuration is completed with your team during pilot; it is not self-serve SaaS onboarding.'],
      ['How do we watch the full demo?', 'Choose “Watch the 60-second prototype walkthrough” on this page. If prompted, enter your work email to unlock it. Book a demo remains available without registration.'],
    ],
  },
  final: { eyebrow: 'Two ways to continue', title: 'See how this fits your operation.', body: 'Book a working session directly, or watch the prototype walkthrough first.', formTitle: 'Get access to the full walkthrough' },
  acquisition: {
    book: 'Book a demo', noRegistration: 'No registration required', heroVideo: 'Watch the 60-second prototype walkthrough', directVideo: 'Watch the 60-second prototype walkthrough', watch: 'Watch demo', continueVideo: 'Continue video', getAccess: 'Get video access', workEmail: 'Work email', placeholder: 'you@company.com', saving: 'Saving…', checking: 'Checking…', saved: 'Access saved for this page session.', continueWatching: 'Continue watching',
    purpose: 'We use your email only to provide this requested demo access. Marketing updates are not included.', privacyNotice: 'Privacy notice', privacyQuestions: 'Privacy questions', accessMessage: 'Access opens only after the request is saved.', invalidEmail: 'Enter a valid email address.', savingRequest: 'Saving your access request…', accepted: 'Your request was saved. This does not mean an email was verified or delivered.', saveError: 'We could not save your request. Please try again or book a demo.', unavailable: 'The access service is temporarily unavailable. Please try again or book a demo.', gateEyebrow: '60-second walkthrough', gateTitle: 'Watch the full prototype demo', closeGate: 'Close demo access form', dockLead: 'See Gappy handle one real-world workflow', dismissDock: 'Dismiss conversion bar',
  },
}

const ja: TravelGlobalCopy = {
  hero: {
    eyebrow: 'AI WORKFORCE / TRAVEL OPERATIONS', title: ['ガイド確認を、', '完了まで。'],
    body: 'Gappyは、ガイド・サプライヤーへの確認、未返信のフォローアップ、そして最新の予約内容との照合までを、一連の業務として完了まで進めます。',
    tertiary: '操作デモを試す ↓', imageAlt: 'モダンなオフィスで催行予定を調整する旅行オペレーションチーム', productAria: '確認ワークフローのサンプル状況',
    productBar: ['サンプル業務 / 予約 #2871', '操作できるプロトタイプ'], productLabel: '明日の催行', productTitle: 'ガイド確認',
    tasks: [['予約情報を取得', '12件の催行 · サンプルデータ', '完了'], ['未返信をフォロー', '運用担当者の承認を保持', '対応中'], ['最新予約を検証', '最新の証拠でのみ完了', '次へ']],
    reply: ['ガイド回答を受領', '検証待ち'], verified: ['確認済み', 'サンプル予約12件中'],
  },
  demo: {
    label: '実業務デモ', title: '指示 → ワークフロー → 検証。', body: '1件の架空予約を使い、承認、ガイド回答、検証、予約変更、そして再確認まで同じ業務を追います。', disclaimer: '操作できるプロトタイプ · サンプルデータ · メッセージ送信なし',
    instructionLabel: '固定サンプル指示', instruction: '明日の催行を確認し、未確認のガイドをフォローアップする。', run: 'サンプルを実行', reset: 'リセット',
    queueLabel: 'キュー概要 · 固定サンプル', queue: [['8', '確認済み'], ['2', '返信待ち'], ['1', '要承認'], ['1', 'ブロック']], evidence: '実行ログ・証拠', empty: 'サンプルを実行して、明日のキューを確認してください。', currentWork: '現在の業務', tomorrow: '明日', version: 'バージョン', guide: 'ガイド',
    workflowAria: '連続した確認ワークフロー', steps: ['予約情報', '確認の必要性', '運用担当者の承認', '模擬リクエスト', '待機 / 制限付きフォロー', '最新予約の検証', '確認済み / 人へ引継ぎ'], stepStates: { complete: '完了', active: '進行中', pending: '待機' },
    start: '予約から開始', prepared: '準備した依頼：ガイド割当、開始時刻、集合場所を確認します。', approve: '模擬リクエストを承認', waiting: '依頼を承認しました。直下のガイド画面で続けてください。', responseWarning: '回答受領 ≠ 業務完了。完了前に、回答を最新予約と照合します。', verify: '最新内容を検証', conflict: '情報不一致を再現', verifying: '最新予約を検証中', verified: '確認済み', snapshot: '最新スナップショット',
    checks: ['予約が有効', '開始時刻', '予約バージョン', '担当ガイド'], scope: 'これは最新のガイド確認を検証するもので、ツアー催行完了を示すものではありません。', changeTime: '予約を10:30に変更', loopComplete: '再確認ループ完了', bookingChanged: '予約が変更されました', priorInvalid: '以前の確認は無効 · 再確認が必要', prepareReconfirmation: '再確認を準備', noReply: 'まだ回答がありません。業務は未完了のまま、15:00に1回の制限付きフォローを行います。', followUp: 'フォローアップを再現', handoff: '人による対応が必要 · 未確認',
    before: ['従来', '業務を探す → 連絡 → 待機 → 確認 → 催促 → 更新 → 再確認'], after: ['Gappy導入後', '検知 → 準備 → 承認 → フォロー → 検証 → 引継ぎ'], roleAria: '予約に関する役割別画面', roleTabs: ['運用チーム向け', 'ガイド・サプライヤー向け'], currentStatus: '現在の状況', booking: '予約', assignedGuide: '担当ガイド', meetingPoint: '集合場所', latestEvidence: '最新の証拠',
    prototype: 'プロトタイプ · Pilotで設定', date: '日付', time: '時刻', question: 'この内容でツアーを担当できますか？', confirm: '確認する', cannot: '対応できない', needHelp: 'サポートが必要', controlsHelp: '運用チームが模擬リクエストを承認すると、回答操作が有効になります。',
    status: { idle: '実行準備', approval: '承認が必要', waiting: '回答待ち', response: '回答受領', verifying: '検証中', verified: '確認済み', reconfirmation: '再確認が必要', cannot: '対応不可', help: '人のサポートが必要', noReply: 'フォローが必要', conflict: '情報不一致' },
    roleLabel: '2つの画面・1つの予約', roleTitle: '運用チームとガイドが、同じ業務を見る。', roleBody: '上の操作デモと同期し、1件の予約、1つのライフサイクル、1つの最新情報を両者が共有します。',
  },
  video: {
    kicker: '02 / プロダクトデモ', title: 'アクションだけでなく、\n完了までを見る。', body: '1件の予約を使って、指示、承認、ガイド回答、最新予約との照合、予約変更後の再確認までを60秒で追います。',
    playAria: 'プロトタイプ動画を再生', requestAria: 'プロトタイプ動画へのアクセスをリクエスト', posterAlt: 'ガイド回答の受領から検証完了まで進む確認ワークフローのプロトタイプ', badge: 'プロトタイプ動画 · サンプルデータ', cardTitle: '指示から、確認完了まで', cardBody: '同じ予約に対する運用画面、ガイド回答、最新予約の検証、役割別画面を確認できます。', disclaimer: '操作できるプロトタイプ · 実予約・実送信なし', watch: '動画を見る', access: '動画にアクセス',
    dialogBadge: 'プロトタイプ動画 · サンプルデータ · メッセージ送信なし', dialogTitle: 'ガイド確認を、最新予約と照合して完了まで', close: '動画を閉じる', unsupported: 'お使いのブラウザは動画再生に対応していません。', transcriptLabel: '文字起こしを読む',
    transcript: ['明日のツアーは予約済みです。しかし、担当ガイドは最新の予約内容で確認できているでしょうか。', 'サンプル指示から予約 #2871 を抽出し、09:00、バージョン3の確認依頼を準備します。', '運用チームが模擬依頼を明示的に承認し、ガイドは運行会社ブランドのシンプルな画面で09:00を確認します。', '回答受領は、業務完了ではありません。Gappyは最新予約と回答を照合し、バージョン3を検証します。', 'その後、予約時刻が09:00から10:30へ変更されます。バージョン3の確認を無効化し、バージョン4について再回答を求め、最新の確認が検証されるまで業務を開いたままにします。'],
  },
  platform: {
    kicker: '04 / オペレーションレイヤー', title: '既存システムはそのまま。\n完了まで進める。', body: 'Gappyは既存の業務の周囲で動きます。Pilotの範囲、接続方法、判断境界、必要な証拠は、事業者ごとに合意します。', link: '1つの業務を整理する', aria: 'オペレーションレイヤーの流れ', core: ['AI Workforce', '共通ランタイム'],
    path: [['01', '予約情報', '既存の情報源'], ['02', 'ワークフロー', '範囲を限定した運用ルール'], ['03', '外部画面', 'ガイド・サプライヤー'], ['04', '検証', '最新の証拠']], controls: [['承認境界', 'Pilotの証拠によって委任範囲を狭められるまでは、人が外部アクションを承認します。'], ['Fail-closed検証', '不明、古い、矛盾、欠落した証拠がある場合は、業務を未完了のままにするか、人へ引き継ぎます。'], ['最新予約との照合', '確認完了にする前に、回答を最新の予約スナップショットと比較します。']],
    maturity: '部分対応 / Pilot-ready foundation', brandTitle: 'あなたの業務。\nあなたのブランド。', brandBody: '基盤となるAI Workforceランタイムを共通化しつつ、各事業者のブランド、業務ルール、運用状況に合わせて設定できます。', configured: 'Pilot期間中に、貴社チームと設定します。', yourLogo: '貴社ロゴ', booking: '予約 #2871', guideConfirmation: 'ガイド確認', tomorrow: '明日 · 09:00', confirmBooking: '予約内容を確認', swatches: ['貴社ブランド', '貴社の運用ルール', '貴社の市場', '共通ランタイム'],
  },
  scenarios: {
    kicker: '05 / ワークフロー状態', title: '想定外が起きる\n瞬間のために。', body: '同じ架空予約の3つの状態です。顧客事例や導入成果ではなく、操作できるワークフロー例です。', badge: 'サンプルシナリオ',
    cards: [
      { id: 'initial', title: '初回確認', body: '予約を抽出し、依頼を準備し、運用担当者の承認を見える状態に保ちます。', action: '初回確認を実行', image: '/travel-scenario-initial.webp', alt: '朝の集合場所で予約内容を確認するローカルガイド' },
      { id: 'missing-reply', title: '未返信', body: '業務を未完了のまま保持し、制限付きルールでフォローし、期限時に人へ引き継ぎます。', action: 'フォロー状態を見る', image: '/travel-scenario-missing-reply.webp', alt: '期限が近い未返信を確認する旅行オペレーション担当者' },
      { id: 'booking-changed', title: '予約変更', body: '開始時刻が10:30へ変わったとき、以前の09:00の確認を無効にします。', action: '変更シナリオを実行', image: '/travel-scenario-booking-changed.webp', alt: '雨の乗車地点で更新された旅程を確認する旅行担当者' },
    ],
  },
  roi: {
    kicker: '06 / 業務インパクト', title: '削減できる業務量を、\n数字で見る。', body: 'Gappyでは、単なる送信件数ではなく、完了までに必要だった人の作業時間、人の介入回数、完了までの時間を測定します。', measures: ['人の作業時間', '人の介入回数', '確認完了までの時間', '例外率', 'コスト・業務キャパシティ'], evidence: '実運用の計測を開始していないため、Gappyの実績ベンチマークは表示していません。', panelLabel: '業務キャパシティの試算',
    monthlyCases: '月間の対象業務件数', manualMinutes: '1件あたりの手作業時間（分）', coverage: '対象にできる業務の割合', reduction: '人の作業削減率（仮定）', hourlyCost: '人件費（1時間あたり）', currency: '通貨', baselineHours: '現在の手作業時間 / 月', hoursReturned: '創出可能な業務時間 / 月', monthlyValue: '削減余地・業務価値 / 月', annualValue: '削減余地・業務価値 / 年', disclaimer: '入力値にもとづく試算です。実際の削減額や成果を保証するものではありません。',
  },
  pilot: {
    kicker: '07 / 小さく始める', title: '1つの業務から。\n拡張より先に証拠を。', body: '業務レビューから、オフライン評価、Shadow Mode、人の承認付き実行へ進めます。範囲と時期はデモで相談します。', cta: 'デモを予約', stages: [['01', '業務レビュー', '業務、システム、期限、例外を整理します。'], ['02', 'オフライン評価', '過去の運用ケースとGappyの判断を比較します。'], ['03', 'Shadow Mode', '外部送信をせず、実ケースを処理します。'], ['04', '人の承認付き実行', '運用担当者が各外部アクションを承認します。']], measurementLabel: '一緒に定義する指標 · ベンチマークを示すものではありません', metrics: ['確認完了率', '人の介入率', '確認完了までの時間', '期限時の未確認予約', 'エスカレーション率', '再確認率'],
  },
  faq: {
    kicker: '08 / 始める前に', title: 'よくある質問に、\nまっすぐ答えます。', items: [
      ['既存の予約システムを置き換えますか？', 'いいえ。Pilotは既存の予約情報源を前提に設計します。接続方法とアクセス範囲は事業者ごとに合意します。'],
      ['誰に確認依頼が届きますか？', '最初の業務では、割り当て済みのガイドまたはサプライヤーに限定します。承認済みの宛先と連絡境界はPilot設定時に事業者が決定します。'],
      ['回答が届けば自動で業務を完了できますか？', '回答だけでは完了しません。まず最新の予約内容と利用可能な証拠を確認します。不明または矛盾した状態は未完了のままにするか、人へ引き継ぎます。'],
      ['運用チームはどこまで管理できますか？', 'オフラインまたはShadow Modeから始め、人の承認を利用します。合意した運用証拠が支える範囲でのみ、責任範囲を広げます。'],
      ['外部画面に自社ブランドを使えますか？', 'マルチテナント・ホワイトラベルの部分的な基盤があります。対応するブランド・業務設定はPilot中に貴社と行い、セルフサービス型SaaSのオンボーディングではありません。'],
      ['60秒デモはどう見られますか？', 'このページの「60秒のプロトタイプを見る」を選択してください。設定時は業務用メールで解除できます。デモ予約には登録は不要です。'],
    ],
  },
  final: { eyebrow: '2つの進み方', title: 'あなたの業務で、\nどう動くか見る。', body: '実際の予約後業務を1つ選び、Gappyがどこまで実行できるか一緒に整理します。', formTitle: '60秒デモを見る' },
  acquisition: {
    book: 'デモを予約', noRegistration: '登録不要', heroVideo: '60秒のプロトタイプを見る', directVideo: '60秒のプロトタイプを見る', watch: '60秒デモを見る', continueVideo: '動画を続ける', getAccess: '動画にアクセス', workEmail: '業務用メール', placeholder: 'you@company.com', saving: '保存中…', checking: '確認中…', saved: 'このページのセッションにアクセスを保存しました。', continueWatching: '動画を続ける',
    purpose: 'このメールは、リクエストされたデモへのアクセス提供と直接のフォローアップにのみ使用します。ニュースレターへの同意は含みません。', privacyNotice: 'プライバシー通知', privacyQuestions: 'プライバシーに関する質問', accessMessage: 'リクエストの保存後にアクセスが開きます。', invalidEmail: '有効なメールアドレスを入力してください。', savingRequest: 'アクセスリクエストを保存しています…', accepted: 'リクエストを保存しました。メールの確認や送信完了を意味するものではありません。', saveError: 'リクエストを保存できませんでした。再試行するか、デモをご予約ください。', unavailable: 'アクセスサービスを一時的に利用できません。再試行するか、デモをご予約ください。', gateEyebrow: '60秒のプロトタイプ', gateTitle: 'プロトタイプデモを見る', closeGate: 'デモアクセスフォームを閉じる', dockLead: 'Gappyが1つの実業務を進める様子を見る', dismissDock: '案内バーを閉じる',
  },
}

export const travelGlobalContent: Record<Locale, TravelGlobalCopy> = { en, ja }
export const globalTravelContent = en
