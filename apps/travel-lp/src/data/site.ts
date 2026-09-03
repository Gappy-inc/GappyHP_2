export type Locale = 'ja' | 'en'
export type Pair = readonly [string, string]

export interface WorkflowCopy {
  code: string
  label: string
  title: string
  intro: string
  steps: readonly string[]
}

export interface SiteCopy {
  lang: Locale
  ogLocale: string
  path: string
  alternatePath: string
  meta: { title: string; description: string }
  nav: { label: string; items: readonly Pair[]; company: string; cta: string; menu: string; close: string; language: string }
  hero: { eyebrow: string; title: string; body: string; primary: string; secondary: string; notes: readonly string[] }
  proof: readonly string[]
  definition: { title: string; body: string; flow: readonly Pair[] }
  problems: { eyebrow: string; title: string; items: readonly string[] }
  layers: { title: string; items: readonly { code: string; title: string; bullets: readonly string[] }[]; statement: string; body: string }
  product: { eyebrow: string; title: string; body: string }
  capabilities: { title: string; items: readonly { title: string; body: string }[] }
  workflows: { eyebrow: string; title: string; items: readonly WorkflowCopy[] }
  builtFor: { title: string; items: readonly string[] }
  integrations: { title: string; body: string; systems: readonly string[] }
  measurement: { eyebrow: string; title: string; body: string; metrics: readonly string[] }
  partner: { eyebrow: string; title: string; body: string; cards: readonly { title: string; body: string }[]; cta: string }
  deployment: { eyebrow: string; title: string; steps: readonly { title: string; body: string }[] }
  safety: { eyebrow: string; title: string; cards: readonly { title: string; body: string }[] }
  faq: { title: string; items: readonly Pair[] }
  final: { eyebrow: string; title: string; body: string; primary: string; secondary: string }
  footer: { line: string; product: string; company: string; privacy: string; corporate: string }
}

export const BOOKING_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video'
export const CONTACT_URL = 'https://gappy.jp/ja/contact'
export const COMPANY_URL = 'https://gappy.jp/ja/about'
export const CORPORATE_URL = 'https://gappy.jp'

const ja: SiteCopy = {
  lang: 'ja', ogLocale: 'ja_JP', path: '/', alternatePath: '/en/',
  meta: {
    title: 'Gappy｜旅行業務を完了まで実行するAI Workforce',
    description: 'Gappyは、予約確認、サプライヤーへの催促、ガイド・ドライバー連携、変更対応、予約QA、照合・精算などを、既存システムを横断して実行する旅行事業者向けAI Workforceです。',
  },
  nav: {
    label: 'メインナビゲーション',
    items: [['プロダクト', '#product'], ['解決する課題', '#problems'], ['対応業務', '#workflows'], ['導入方法', '#deployment'], ['安全性', '#safety'], ['FAQ', '#faq']],
    company: '会社情報', cta: '30分の業務診断', menu: 'メニュー', close: '閉じる', language: 'EN',
  },
  hero: {
    eyebrow: 'AI WORKFORCE FOR TRAVEL OPERATIONS',
    title: '旅行業務を、\nAIで完了まで。',
    body: 'Gappyは、予約確認、サプライヤーへの催促、変更対応、予約QA、照合・精算まで、既存システムを横断して実行する旅行事業者向けAI Workforceです。',
    primary: '30分の業務診断を予約', secondary: '実際のWorkflowを見る',
    notes: ['既存システムを活用', '承認から開始', '一つの業務から'],
  },
  proof: ['既存システムはそのまま', 'Human-approved execution', '操作と根拠を記録', '一つのWorkflowから開始'],
  definition: {
    title: 'Gappyは、旅行事業者向けのAI Workforceです。',
    body: '予約システム、メール、Supplier Portal、CRM、Excel、メッセージングを横断し、業務の発生を検知してから、必要な判断、操作、連絡、完了確認までを一つのWorkflowとして実行します。',
    flow: [['TRIGGER', '発生を検知'], ['UNDERSTAND', '状況を理解'], ['DECIDE', '次の操作を判断'], ['OPERATE', 'システムを操作'], ['COMMUNICATE', '関係者へ連絡'], ['VERIFY', '完了を確認'], ['ESCALATE', '例外を人へ引き継ぐ']],
  },
  problems: {
    eyebrow: 'OPERATIONAL GAP', title: 'Gappyは、こんな旅行業務の課題を解決します',
    items: ['サプライヤーの返信確認と催促に、毎日時間を取られる', '出発前の確認業務が分散し、進捗を追いにくい', 'ガイド・ドライバーのアサイン状況が見えない', '変更のたびに、複数システムの更新・連絡が煩雑', '予約QAと履行確認が、担当者の経験に依存', '請求・支払い・予約情報の差分確認が手作業'],
  },
  layers: {
    title: 'Gappyが、理解・実行・確認までをつなぐ。',
    items: [
      { code: '01 / UNDERSTAND', title: '業務を検知し、状況を理解する', bullets: ['対象予約を検知', '顧客・サプライヤー情報を取得', 'メールやメッセージを理解', '社内ルールを参照', '優先度と期限を判断'] },
      { code: '02 / OPERATE', title: '既存システムを横断して実行する', bullets: ['メールを送る', '返信を確認する', 'Supplier Portalを操作する', 'Booking Systemを更新する', '関係者へ連絡する'] },
      { code: '03 / VERIFY', title: '完了を確認し、例外だけを人に渡す', bullets: ['操作結果を検証', '必要情報が揃ったか確認', 'Evidenceを保存', '未解決案件を分類', '根拠付きで担当者へ引き継ぐ'] },
    ],
    statement: 'ACTION ≠ COMPLETION', body: 'Gappyは、操作回数ではなくVerified Completionを測定します。',
  },
  product: { eyebrow: 'OPERATIONS CONTROL', title: 'すべての旅行業務を、\n一つの実行画面から。', body: '処理中、完了、承認待ち、例外を一目で確認。担当者は全件を処理するのではなく、AI Workforceが解決できなかった案件だけに集中できます。' },
  capabilities: {
    title: '業務を前に進める、6つの実行能力。',
    items: [
      { title: 'Workflow Queue', body: '状態、期限、重要度、Workflow別に案件を整理。' },
      { title: 'Context & Policy', body: '予約情報、顧客情報、業務ルール、過去対応を統合。' },
      { title: 'Action Execution', body: 'メール、Portal、Booking System、社内システムを操作。' },
      { title: 'Communication', body: 'サプライヤー、ガイド、ドライバー、顧客、社内担当者へ連絡。' },
      { title: 'Evidence & Audit Log', body: '参照情報、判断、操作、結果、完了確認を記録。' },
      { title: 'Human Escalation', body: '判断できない案件を、理由と推奨アクション付きで人へ引き継ぐ。' },
    ],
  },
  workflows: {
    eyebrow: 'WORKFLOWS', title: '旅行業務を、発生から完了まで。',
    items: [
      { code: 'WF-01', label: 'SUPPLIER CONFIRMATION', title: '予約確認と催促を、完了まで。', intro: '予約とサプライヤー情報をつなぎ、確認結果が反映されるまでを追跡します。', steps: ['対象予約を抽出', 'サプライヤーへ確認', '返信がなければ催促', '回答を理解', '予約情報を更新', '確定を検証', '例外だけを引き継ぐ'] },
      { code: 'WF-02', label: 'PRE-DEPARTURE OPERATIONS', title: '出発前の未確認を、ゼロに近づける。', intro: '関係者と必要情報を照合し、未回答や直前変更だけを担当者へ戻します。', steps: ['ガイド・ドライバー確認', '集合時間・場所確認', '必要情報の不足検知', '直前変更の通知', '既読・返信確認', '未回答者をエスカレーション'] },
      { code: 'WF-03', label: 'CHANGE & BOOKING QA', title: '変更が起きても、関連業務を止めない。', intro: '変更の影響範囲を特定し、更新・通知・再検証を一つの流れで実行します。', steps: ['変更を検知', '影響範囲を特定', '関係システムを更新', '関係者へ通知', '予約内容を再検証', '完了結果を記録'] },
    ],
  },
  builtFor: { title: '旅行オペレーションを担うチームのために。', items: ['TMC', 'DMC', 'OTA', 'Tour Operator', 'Inbound Operator', 'Travel Group', '大手旅行会社', 'Corporate Travel'] },
  integrations: { title: '既存システムは、そのまま。\n変えるのは、人が担っている調整レイヤー。', body: 'APIや画面操作など、対象業務とシステムに合う連携方法を個別に評価します。', systems: ['EMAIL', 'BOOKING SYSTEM', 'SUPPLIER PORTAL', 'CRM', 'GDS', 'SPREADSHEET', 'MESSAGING', 'INTERNAL SYSTEM'] },
  measurement: { eyebrow: 'MEASUREMENT', title: '操作回数ではなく、\n業務完了を測る。', body: 'Workflowごとの完了条件とEvidenceを定義し、人の介入や例外も同じ基準で可視化します。', metrics: ['業務完了率', '人による介入率', '平均処理時間', '手戻り率', '例外率', '重大エラー', 'Human Minutes', 'Workflowあたりコスト'] },
  partner: {
    eyebrow: 'DESIGN PARTNER', title: '一つのWorkflowから始めます。', body: '対象業務、月間件数、連携システム、実行権限、必要な承認範囲を確認し、導入・検証プランをご提案します。',
    cards: [{ title: 'Workflow Audit', body: '30分・システムアクセス不要' }, { title: 'Design Partner Pilot', body: '対象業務と成功条件を個別設計' }, { title: 'Enterprise Deployment', body: '業務量・連携範囲・権限に応じて個別見積もり' }], cta: '導入範囲を相談する',
  },
  deployment: {
    eyebrow: 'PROGRESSIVE DEPLOYMENT', title: '安全性を確認しながら、\n実行範囲を段階的に広げます。',
    steps: [
      { title: 'Workflow Audit', body: 'Trigger、利用システム、判断、例外、完了条件を整理。' },
      { title: 'Historical Replay', body: '過去の案件を使用し、AIの判断と実行可能性を評価。' },
      { title: 'Shadow Mode', body: '実際の案件を観察し、人の対応と比較。' },
      { title: 'Human-approved Live', body: 'AIがアクションを準備し、人の承認後に実行。' },
      { title: 'Progressive Autonomy', body: '安全性と業務価値が確認された範囲から権限を拡大。' },
    ],
  },
  safety: {
    eyebrow: 'CONTROL & SAFETY', title: 'AIに任せる範囲を、\n人が決められる。',
    cards: [
      { title: 'Human Control', body: 'AIが実行できる範囲、承認が必要な操作、人へ引き継ぐ条件を明確に設定します。' },
      { title: 'Execution Trace', body: '参照した情報、判断、操作、結果、完了確認を記録し、後から追跡できるようにします。' },
      { title: 'Bounded Deployment', body: '最初から全業務を自動化せず、限定したWorkflowと権限から開始します。' },
    ],
  },
  faq: {
    title: 'よくあるご質問',
    items: [
      ['既存の予約システムを変更する必要はありますか？', '置き換えを前提とせず、現在の業務環境に接続する方針です。対象システムと業務を確認し、利用可能な連携方法を個別に評価します。'],
      ['APIがないシステムでも利用できますか？', '業務の流れ、画面、権限、セキュリティ要件を確認した上で、利用可能な連携方法を個別に評価します。'],
      ['AIが誤った判断をした場合はどうなりますか？', '実行権限と承認条件を制限し、判断根拠と操作Evidenceを記録します。不確実な案件は理由と推奨アクションを添えて人へEscalationします。'],
      ['どの業務から始めるべきですか？', '高頻度で反復的、完了条件が明確で、例外を分類できるWorkflowが有力な候補です。30分の業務診断で一緒に整理します。'],
      ['導入に必要なデータは何ですか？', '対象Workflowに応じて、過去案件、業務ルール、完了条件、例外例、利用システムなどを確認します。'],
      ['セキュリティと権限はどのように管理しますか？', '対象Workflowを限定し、最小権限、操作記録、人の承認を組み合わせて実行範囲を設計します。'],
      ['どのくらいの期間で検証できますか？', '検証期間は業務範囲、件数、連携方式、承認設計によって異なります。Workflow Audit後に個別の計画をご提案します。'],
      ['小規模な旅行事業者でも利用できますか？', '業務量、反復性、完了条件、対象システムを確認し、導入効果を見込めるか個別に判断します。'],
      ['自社固有のルールに対応できますか？', '固有ルールを定義し、過去案件やShadow Modeで評価してから実行範囲と承認条件を決めます。'],
      ['料金はどのように決まりますか？', '対象Workflow、件数、連携範囲、実行権限、運用要件に基づいて個別にご提案します。'],
    ],
  },
  final: { eyebrow: 'START WITH ONE WORKFLOW', title: 'まず、一つの旅行業務を見せてください。', body: 'Trigger、利用システム、判断、例外、完了条件を整理し、AI Workforceでどこまで実行できるかを30分で確認します。', primary: '30分の業務診断を予約', secondary: 'お問い合わせ' },
  footer: { line: 'AI Workforce for Travel Operations', product: 'プロダクト', company: '株式会社Gappy', privacy: '個人情報の取り扱い', corporate: 'Corporate site' },
}

const en: SiteCopy = {
  ...ja,
  lang: 'en', ogLocale: 'en_US', path: '/en/', alternatePath: '/',
  meta: { title: 'Gappy | AI Workforce for Travel Operations', description: 'Gappy executes complex travel operations across the systems teams already use, from supplier confirmation and coordination to booking changes, quality checks, reconciliation, and verified completion.' },
  nav: { label: 'Primary navigation', items: [['Product', '#product'], ['Problems', '#problems'], ['Workflows', '#workflows'], ['Deployment', '#deployment'], ['Safety', '#safety'], ['FAQ', '#faq']], company: 'Company', cta: '30-minute workflow audit', menu: 'Menu', close: 'Close', language: 'JP' },
  hero: { eyebrow: 'AI WORKFORCE FOR TRAVEL OPERATIONS', title: 'Travel operations,\ncompleted by AI.', body: 'Gappy is an AI Workforce for travel operators. It works across existing systems to handle supplier follow-up, booking changes, quality checks, reconciliation, and verified completion.', primary: 'Book a 30-minute workflow audit', secondary: 'See a real workflow', notes: ['Keep existing systems', 'Start with approval', 'Begin with one workflow'] },
  proof: ['Keep your existing systems', 'Human-approved execution', 'Every action and rationale logged', 'Start with one workflow'],
  definition: { title: 'Gappy is an AI Workforce built for travel operators.', body: 'It works across booking systems, email, supplier portals, CRM, spreadsheets, and messaging—from detecting an operational event to making a bounded decision, taking action, coordinating people, and verifying completion.', flow: [['TRIGGER', 'Detect the event'], ['UNDERSTAND', 'Assemble context'], ['DECIDE', 'Choose the next step'], ['OPERATE', 'Act across systems'], ['COMMUNICATE', 'Coordinate people'], ['VERIFY', 'Check completion'], ['ESCALATE', 'Hand off exceptions']] },
  problems: { eyebrow: 'OPERATIONAL GAP', title: 'Gappy solves the work that falls between systems.', items: ['Supplier checking and follow-up takes time every day', 'Pre-departure checks are scattered across systems', 'Guide and driver assignments are hard to see', 'Every change creates repeated updates and coordination', 'Booking QA still depends on individual experience', 'Teams reconcile booking, invoice, and payment differences by hand'] },
  layers: { title: 'Connect understanding, execution, and verification.', items: [
    { code: '01 / UNDERSTAND', title: 'Detect the work and understand its context', bullets: ['Detect the target booking', 'Load customer and supplier context', 'Understand messages', 'Reference operating policy', 'Set priority and deadline'] },
    { code: '02 / OPERATE', title: 'Execute across the systems already in use', bullets: ['Send email', 'Monitor replies', 'Operate supplier portals', 'Update booking systems', 'Coordinate stakeholders'] },
    { code: '03 / VERIFY', title: 'Verify the result and escalate only exceptions', bullets: ['Validate action results', 'Check required information', 'Preserve evidence', 'Classify unresolved cases', 'Escalate with rationale'] },
  ], statement: 'ACTION ≠ COMPLETION', body: 'Gappy measures verified completion, not the number of actions taken.' },
  product: { eyebrow: 'OPERATIONS CONTROL', title: 'Run every travel operation\nfrom one execution view.', body: 'See work in progress, completed cases, approval requests, and exceptions at a glance. Your team focuses on the cases the AI Workforce could not safely resolve.' },
  capabilities: { title: 'Six capabilities that move operations forward.', items: [
    { title: 'Workflow Queue', body: 'Organize work by status, deadline, priority, and workflow.' },
    { title: 'Context & Policy', body: 'Bring together bookings, customer context, operating rules, and history.' },
    { title: 'Action Execution', body: 'Operate email, portals, booking systems, and internal tools.' },
    { title: 'Communication', body: 'Coordinate suppliers, guides, drivers, customers, and internal teams.' },
    { title: 'Evidence & Audit Log', body: 'Record context, rationale, actions, results, and completion evidence.' },
    { title: 'Human Escalation', body: 'Hand off uncertainty with a clear reason and recommended next action.' },
  ] },
  workflows: { eyebrow: 'WORKFLOWS', title: 'Travel operations, from trigger to completion.', items: [
    { code: 'WF-01', label: 'SUPPLIER CONFIRMATION', title: 'Take supplier confirmation through to completion.', intro: 'Connect booking and supplier context, then track the result until the record is verified.', steps: ['Select target bookings', 'Contact the supplier', 'Follow up when needed', 'Understand the reply', 'Update the booking', 'Verify confirmation', 'Escalate exceptions only'] },
    { code: 'WF-02', label: 'PRE-DEPARTURE OPERATIONS', title: 'Drive pre-departure uncertainty toward zero.', intro: 'Reconcile people and information, returning only non-responses and last-minute changes to the team.', steps: ['Confirm guides and drivers', 'Check time and meeting point', 'Detect missing details', 'Notify last-minute changes', 'Confirm reads and replies', 'Escalate non-responders'] },
    { code: 'WF-03', label: 'CHANGE & BOOKING QA', title: 'Keep related operations moving when plans change.', intro: 'Identify downstream impact and carry updates, notifications, and re-verification through one workflow.', steps: ['Detect the change', 'Map downstream impact', 'Update relevant systems', 'Notify stakeholders', 'Re-verify the booking', 'Record completion'] },
  ] },
  builtFor: { title: 'For teams that carry travel operations.', items: ['TMC', 'DMC', 'OTA', 'Tour Operator', 'Inbound Operator', 'Travel Group', 'Enterprise Travel', 'Corporate Travel'] },
  integrations: { title: 'Keep the systems.\nChange the manual coordination layer.', body: 'We evaluate the right connection method for each workflow and system—from APIs to bounded interface operations.', systems: ja.integrations.systems },
  measurement: { eyebrow: 'MEASUREMENT', title: 'Measure completed work,\nnot action volume.', body: 'Define completion and evidence for every workflow, then evaluate human intervention and exceptions against the same operating truth.', metrics: ['Completion rate', 'Human intervention rate', 'Average handling time', 'Rework rate', 'Exception rate', 'Critical errors', 'Human Minutes', 'Cost per workflow'] },
  partner: { eyebrow: 'DESIGN PARTNER', title: 'Start with one workflow.', body: 'We review the work, monthly volume, connected systems, execution authority, and required approvals, then propose a deployment and validation plan.', cards: [{ title: 'Workflow Audit', body: '30 minutes · no system access required' }, { title: 'Design Partner Pilot', body: 'Scope the workflow and success criteria together' }, { title: 'Enterprise Deployment', body: 'Tailored to volume, integration scope, and authority' }], cta: 'Discuss the deployment scope' },
  deployment: { eyebrow: 'PROGRESSIVE DEPLOYMENT', title: 'Expand execution authority\nas safety is demonstrated.', steps: [
    { title: 'Workflow Audit', body: 'Map the trigger, systems, decisions, exceptions, and completion criteria.' },
    { title: 'Historical Replay', body: 'Use past cases to evaluate decisions and execution feasibility.' },
    { title: 'Shadow Mode', body: 'Observe live work and compare against human decisions.' },
    { title: 'Human-approved Live', body: 'The AI prepares actions; a person approves execution.' },
    { title: 'Progressive Autonomy', body: 'Expand authority only where operating evidence supports it.' },
  ] },
  safety: { eyebrow: 'CONTROL & SAFETY', title: 'People decide what the AI\nis allowed to own.', cards: [
    { title: 'Human Control', body: 'Define the actions the AI may take, the approvals it needs, and the conditions that require escalation.' },
    { title: 'Execution Trace', body: 'Preserve the context, rationale, actions, results, and completion evidence for review.' },
    { title: 'Bounded Deployment', body: 'Begin with a narrow workflow and limited authority rather than automating everything at once.' },
  ] },
  faq: { title: 'Frequently asked questions', items: [
    ['Do we have to replace our booking system?', 'No. Gappy is designed to work with the current operating environment. We evaluate feasible connection methods for the workflow and systems in scope.'],
    ['Can Gappy work with systems that do not have an API?', 'Potential connection methods are evaluated individually after reviewing the workflow, interface, permissions, and security requirements.'],
    ['What happens if the AI makes the wrong decision?', 'Execution authority and approval conditions are bounded. The system preserves evidence and escalates uncertainty with context and a recommended next action.'],
    ['Which workflow should we start with?', 'High-frequency, repetitive work with a clear definition of done and classifiable exceptions is usually a strong candidate.'],
    ['What data is required?', 'Depending on the workflow, we review historical cases, operating policy, completion criteria, exception examples, and the systems involved.'],
    ['How are security and permissions managed?', 'We combine narrow workflow scope, least privilege, action logging, and human approval based on the operating risk.'],
    ['How long does validation take?', 'Timing depends on the workflow scope, volume, connection method, and approval design. We propose a plan after the workflow audit.'],
    ['Can smaller travel operators use Gappy?', 'We assess the operating volume, repetition, completion criteria, and systems to determine whether the workflow is a good fit.'],
    ['Can Gappy follow our company-specific rules?', 'Rules are defined and evaluated against historical cases and Shadow Mode before execution authority is set.'],
    ['How is pricing determined?', 'Pricing is proposed individually based on workflow scope, volume, integrations, execution authority, and operating requirements.'],
  ] },
  final: { eyebrow: 'START WITH ONE WORKFLOW', title: 'Show us one travel operation.', body: 'In 30 minutes, we will map the trigger, systems, decisions, exceptions, and completion criteria—and assess what an AI Workforce can safely execute.', primary: 'Book a 30-minute workflow audit', secondary: 'Contact us' },
  footer: { line: 'AI Workforce for Travel Operations', product: 'Product', company: 'Gappy, Inc.', privacy: 'Personal data handling', corporate: 'Corporate site' },
}

export const copy: Record<Locale, SiteCopy> = { ja, en }
