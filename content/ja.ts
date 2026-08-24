import type { SiteContent } from '@/content/en'

export const jaContent = {
  locale: 'ja',
  htmlLang: 'ja',
  ogLocale: 'ja_JP',
  navigation: {
    primary: [
      { label: 'Technology', path: '/technology' },
      { label: 'Travel', path: '/travel' },
      { label: 'Projects', path: '/cases' },
      { label: 'Insights', path: '/resources' },
    ],
    company: [
      { label: 'Gappyについて', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' },
    ],
    companyLabel: 'Company',
    primaryLabel: 'メインナビゲーション',
    mobileLabel: 'モバイルナビゲーション',
    talk: 'Gappyに相談する',
    openMenu: 'メニューを開く',
    closeMenu: 'メニューを閉じる',
    skip: '本文へ移動',
  },
  footer: {
    statement: '業務を実行するAI Workforce。',
    accent: 'まず旅行業界から。',
    explore: 'Explore',
    company: 'Company',
    connect: 'Connect',
    talk: 'Gappyに相談する',
  },
  common: {
    ctaEyebrow: 'Work with Gappy',
    ctaTitle: 'その業務を、見せてください。',
    ctaBody:
      '複数のシステムや人の判断をまたぎ、今も手作業で進めている重要な業務があれば、ぜひ一度教えてください。',
    ctaPrimary: 'Gappyに相談する',
    ctaSecondary: 'Travelを見る',
  },
  operatingLoop: [
    ['Trigger', '発生を捉える'],
    ['Understand', '状況を理解する'],
    ['Decide', '判断する'],
    ['Operate', '操作・実行する'],
    ['Communicate', '関係者と連携する'],
    ['Verify', '完了を確認する'],
    ['Escalate', '人へ引き継ぐ'],
  ],
  home: {
    seo: {
      title: 'Gappy | 業務を実行するAI Workforce',
      description:
        'Gappyは、複雑な業務を理解・判断し、既存システムを横断して実行するAI Workforceを開発しています。まず旅行業界から。',
    },
    hero: {
      eyebrow: 'Gappy / Applied AI',
      title: 'AIが、業務を実行する時代へ。',
      body:
        'Gappyは、複雑な業務を理解・判断し、企業がすでに利用しているシステムを横断して業務を実行するAI Workforceを開発しています。',
      emphasis: 'まず、旅行業界から。',
      primary: 'Travelを見る',
      secondary: 'Gappyに相談する',
      label: 'AI Workforce for Business Operations',
    },
    shift: {
      eyebrow: 'What we build',
      title: '業務を記録するソフトウェアから、業務を前に進めるAIへ。',
      body: [
        '多くの業務は、一つのシステムの中だけでは完結しません。',
        'メール、データベース、外部ポータル、スプレッドシート、社内システム、そして人の判断をまたいで進んでいます。',
        'Gappyは、それらの間にあるコンテキストを引き継ぎ、業務を完了まで進めるAI Workforceを構築します。',
      ],
    },
    workforce: {
      eyebrow: 'Gappy AI Workforce',
      title: '発生から、完了確認まで。',
      body:
        '業務に使えるAIは、回答を生成するだけでは足りません。何が起きたかを理解し、次に何をすべきかを判断し、許可された操作を実行し、その結果を確認し、必要な場合には人へ引き継ぐ必要があります。',
      cta: 'Technologyを見る',
    },
    travel: {
      eyebrow: 'Primary vertical / Travel',
      title: 'まず、旅行業界から。',
      body: [
        '旅行業界はグローバルで、関係者が多く、時間制約が強く、業務が複数システムに分断されています。',
        '一つの旅行手配でも、予約システム、Supplier Portal、メール、CRM、Excel、社内キュー、人による調整を横断します。',
        'Gappyは、この複雑性をAI Workforceが実際の業務で機能するための最初の実証領域と考えています。',
      ],
      cta: '旅行業務への取り組みを見る',
      cardEyebrow: 'Current flagship',
      cardTitle: 'AI Workforce for Travel Operations',
      cardBody:
        '旅行の裏側にある複雑な業務へ、Gappyの実行能力を適用する最初の重点領域です。',
    },
    workflows: {
      eyebrow: 'Travel workflows',
      title: '旅行を支える業務を、完了まで。',
      cta: '旅行業務を見る',
      items: [
        ['サプライヤー対応', '予約確認、再確認、催促、例外対応など、サプライヤーとのやり取りを業務フローとして実行。'],
        ['予約オペレーション', 'メール、予約システム、社内キューをまたぐ予約関連業務を前に進める。'],
        ['照合・精算', 'サプライヤーや支払い情報の照合、差分確認、必要なフォローアップを支援。'],
        ['予約QA・履行確認', '予約内容や提供状況を確認し、人が対応すべき例外を明確にする。'],
        ['変更・イレギュラー対応', '時刻やサービス内容の変更を検知し、関連業務や連絡を連動させる。'],
        ['顧客コミュニケーション', '独立したチャットボットではなく、業務フローの一部として必要な連絡を実行。'],
      ],
    },
    technology: {
      eyebrow: 'Operate across the stack',
      title: '既存システムを置き換えず、その上で動く。',
      body: [
        '企業の基幹システムには、長年積み重ねられた業務ロジックがあります。',
        'Gappyは、それらをすべて置き換えることを前提にしていません。',
        '既存の業務基盤を活かしながら、AI Workforceが必要なシステムを横断し、権限・完了確認・人へのエスカレーションを明確に設計します。',
      ],
      cta: 'Technologyを見る',
      capabilities: [
        'System Access / システム操作',
        'Context & Policy / 文脈とルール',
        'Execution / 実行',
        'Communication / 連携',
        'Verification / 完了確認',
        'Human Control / 人による統制',
      ],
    },
    projects: {
      eyebrow: 'Projects',
      title: 'デモではなく、実際の業務からつくる。',
      body:
        'Gappyのプロジェクトは、実際に発生している業務から始まります。Trigger、利用システム、判断、操作、例外、そして「何をもって完了とするか」を定義してから、AIにどこまで任せるかを設計します。',
      cta: 'Projectsを見る',
      cardEyebrow: 'Travel / Active',
      cardTitle: 'AI Workforce for Travel Operations',
      cardBody:
        '予約、サプライヤー対応、履行確認、照合、変更対応、顧客コミュニケーションなど、旅行業務を実行するAI Workforce。',
    },
    insights: {
      eyebrow: 'Insights',
      title: '現場で動くAIについて考える。',
      body:
        'AI Workforce、Workflow設計、自律化、完了確認、人との役割分担について、実務から得た知見を発信します。',
      cta: 'Insightsを見る',
    },
    company: {
      aboutEyebrow: 'About Gappy',
      aboutTitle: '複雑な業務を、自律的に。',
      aboutBody:
        'AIによって、業務ソフトウェアは「人が操作するもの」から、「一定の業務を自ら実行できるもの」へ変わっていくと私たちは考えています。Gappyは、一つひとつの明確な業務から、その未来をつくります。',
      aboutCta: 'Gappyについて',
      careersEyebrow: 'Careers',
      careersTitle: '現実の業務で動くAIをつくる。',
      careersBody:
        'Gappyでは、AI、Software、Product、Operationsを横断し、最先端技術を実際の業務責任を担えるシステムへ変えていく仲間を探しています。',
      careersCta: 'Gappyで働く',
    },
  },
  technology: {
    seo: {
      title: 'Technology | Gappy AI Workforce',
      description:
        '業務コンテキストを理解し、既存システムを操作し、結果を確認し、必要な場面で人へ引き継ぐGappyのAI Workforce設計。',
    },
    hero: {
      eyebrow: 'Technology',
      title: '業務責任を担えるAIシステムをつくる。',
      body: [
        'Gappyが設計の中心に置いている考え方はシンプルです。',
        'AIが業務で価値を持つためには、状況を理解し、許可された範囲で行動し、結果を確認し、自分で判断すべきではないケースを人へ引き継げる必要があります。',
      ],
    },
    loop: {
      eyebrow: 'Operating loop',
      title: '発生から、完了確認まで。',
      body:
        '各段階で得られた情報と制約を次の判断へ引き継ぎます。人へのエスカレーションも、例外的な退避ではなく設計の一部です。',
    },
    layers: [
      {
        eyebrow: 'Context',
        title: '操作の前に、業務を理解する。',
        body: '業務は、記録、メッセージ、ルール、過去の経緯、例外の上に成り立っています。Gappyは、操作の前に判断に必要な業務コンテキストを揃えます。',
        detail: ['記録とメッセージ', 'ルールと制約', '業務の進行状況'],
      },
      {
        eyebrow: 'System interaction',
        title: '既存ソフトウェアを横断して動く。',
        body: '重要な業務は、メール、ブラウザ、社内ツール、データベース、外部システムをまたいで進みます。その現実を前提に実行レイヤーを設計します。',
        detail: ['画面とAPI', '既存システム', '許可された操作'],
      },
      {
        eyebrow: 'Verification',
        title: '実行したことと、完了したことは違う。',
        body: 'メッセージ送信やデータ更新は、あくまで操作です。意図した業務結果が確認されて初めて、Workflowは完了します。',
        detail: ['期待する結果', '実際の結果', '完了の根拠'],
        statement: 'Action ≠ Completion',
      },
      {
        eyebrow: 'Human control',
        title: '不確実性は、人がコントロールする。',
        body: 'AIの権限範囲を明確にし、曖昧さ、ルール外、高リスクな判断は、業務コンテキストと操作履歴を保ったまま適切な人へ引き継ぎます。',
        detail: ['明確な権限範囲', '文脈を保った引き継ぎ', '例外の責任者'],
      },
    ],
    principles: {
      eyebrow: 'Design principles',
      title: '責任範囲を設計し、測定し、段階的に広げる。',
      items: [
        ['明確な権限範囲', 'AIが判断できること、実行できる操作を明確にする。'],
        ['追跡可能性', 'コンテキスト、判断、操作、確認結果を記録する。'],
        ['人へのエスカレーション', '不確実性を、判断に必要な情報とともに人へ戻す。'],
        ['段階的な自律化', '実際の業務結果を根拠に、任せる範囲を広げる。'],
        ['既存システムとの共存', 'すでにあるシステムと業務ロジックを活かす。'],
      ],
    },
    cta: {
      body: '実際のシステム、制約、例外、完了条件を持つWorkflowを見せてください。まず、業務の現実を可視化するところから始めます。',
    },
  },
  travel: {
    seo: {
      title: '旅行業務のAI Workforce | Gappy',
      description:
        'Gappyは、予約、サプライヤー対応、照合、履行確認、変更対応、顧客コミュニケーションなどの旅行業務を実行するAI Workforceを開発しています。',
    },
    hero: {
      eyebrow: 'Gappy / Travel',
      title: '旅行業務のAI Workforce',
      body:
        'Gappyは、予約システム、メール、Supplier Portal、CRM、Excel、既存の旅行業務システムを横断し、旅行の裏側にあるオペレーションを実行するAI Workforceを開発しています。',
      primary: 'Design Partnerについて相談する',
      secondary: 'Gappyに相談する',
    },
    why: {
      eyebrow: 'Why travel',
      title: '旅行業務は、システムとシステムの間に残っている。',
      body: [
        '予約システムには予約情報が記録されます。しかし旅行を実際に成立させるためには、その後もサプライヤー対応、変更処理、履行確認、社内キュー、照合、顧客対応など多くの業務が続きます。',
        '現在、そのシステム間をつないでいるのは人です。Gappyは、その業務レイヤーをAI Workforceで再設計します。',
      ],
    },
    target: {
      eyebrow: 'Built for',
      title: '複雑なオペレーションを持つ旅行事業者へ。',
      items: ['TMC', 'DMC', 'OTA', 'Tour Operator', 'Travel Group', '大手旅行会社'],
    },
    example: {
      eyebrow: 'Travel operating example',
      title: 'サプライヤー再確認',
      body:
        '実際の業務イベントから始まり、結果が確認されるか、未解決の例外が人へ引き継がれるまでを一つのWorkflowとして扱います。',
      steps: [
        '予約が再確認の対象期間に入る',
        '予約情報とサプライヤー情報を取得する',
        '必要な確認方法を判断する',
        'サプライヤーへ連絡またはPortalを操作する',
        '回答内容を理解する',
        '社内システムを更新する',
        '予約確定を確認する',
        '未解決の例外を人へ引き継ぐ',
      ],
    },
    workflows: {
      eyebrow: 'Travel workflows',
      title: 'チームが今も担っている業務から始める。',
      items: [
        ['サプライヤー対応', '予約確認、再確認、催促、例外対応など、サプライヤーとのやり取りを業務フローとして実行。'],
        ['予約オペレーション', 'メール、予約システム、社内キューをまたぐ予約関連業務を前に進める。'],
        ['照合・精算', 'サプライヤーや支払い情報の照合、差分確認、必要なフォローアップを支援。'],
        ['予約QA・履行確認', '予約内容や提供状況を確認し、人が対応すべき例外を明確にする。'],
        ['変更・イレギュラー対応', '時刻やサービス内容の変更を検知し、関連業務や連絡を連動させる。'],
        ['顧客コミュニケーション', '独立したチャットボットではなく、業務フローの一部として必要な連絡を実行。'],
      ],
    },
    systems: {
      eyebrow: 'Existing systems',
      title: '既存システムは、そのまま。',
      statement: '変えるのは、人が担っている調整レイヤー。',
      items: ['Email', 'CRM', 'GDS', 'Excel / Spreadsheet', 'Supplier Portal', 'Booking System', 'Internal System', 'Messaging'],
    },
    deployment: {
      eyebrow: 'Start bounded',
      title: 'まず、一つの業務から。',
      steps: [
        ['業務を可視化する', 'Trigger、利用システム、判断、操作、例外、完了条件を定義します。'],
        ['AIに観察させる', '過去事例や実際のケースで、判断と実行可能性を評価します。'],
        ['人の承認下で実行する', '人による確認を残しながら、精度と例外を測定します。'],
        ['根拠を持って自律範囲を広げる', '精度・安全性・事業価値が確認できた業務から権限を拡大します。'],
      ],
    },
    measurement: {
      eyebrow: 'Measurement',
      title: '操作回数ではなく、業務完了を測る。',
      body: '具体的な基準値と成功条件はDesign Partnerごとに定義します。ここでは実証されていない性能を主張しません。',
      items: ['業務完了率', '人による介入率', '手戻り', '処理時間', '重大エラー', '例外率', 'Human Minutes', 'Workflowあたりコスト'],
    },
    cta: {
      title: 'まず、一つの旅行業務から。',
      body: 'Trigger、利用システム、例外、完了条件を見せてください。現場の実態から、最初の導入で何を確かめるべきかを定義します。',
      secondary: 'Projectsを見る',
    },
  },
  projects: {
    seo: {
      title: 'Projects | Gappy',
      description: '実際の業務から設計するGappyのAI WorkforceプロジェクトとDesign Partnership。',
    },
    hero: {
      eyebrow: 'Projects',
      title: '実際の業務からつくるプロジェクト。',
      body: [
        'Gappyは、現場の業務から逆算してAIを設計します。',
        '明確なWorkflow、測定可能なOutcome、AIに任せる範囲を定義するところから始めます。',
      ],
    },
    flagship: {
      eyebrow: 'Primary vertical / Travel',
      status: '進行中のプロジェクト領域',
      title: 'AI Workforce for Travel Operations',
      body: 'サプライヤー対応、予約業務、照合、履行確認、変更対応、顧客コミュニケーションなど、旅行業務にAI Workforceを適用しています。',
      cta: 'Travelを見る',
    },
    partnership: {
      eyebrow: 'Design partnership',
      title: '一つの業務を、一緒につくる。',
      body: 'Workflowと判断根拠を可視化し、実際の業務結果を確認しながら、AIへ任せる範囲を段階的に広げます。',
      steps: ['業務を知る', '可視化する', '基準を定める', '試作する', '並行検証する', '導入する', '測定する', '拡大する'],
    },
    evidence: {
      eyebrow: 'Confidential work',
      title: '実証のない成果をつくらない。',
      body: [
        '一部の取り組みはDesign Partnerとの共同開発や守秘義務のもとで進めています。',
        '顧客名、数値、導入内容は、公開の承認が得られたものだけを掲載します。',
      ],
    },
    cta: {
      title: '一つの業務を、一緒につくる。',
      body: '重要なWorkflowから始め、その業務の実態を可視化し、最初の導入で何を証明すべきかを定義します。',
      secondary: 'Travelを見る',
    },
  },
  insights: {
    seo: {
      title: 'Insights | Gappy',
      description: 'AI Workforce、Workflow設計、自律化、完了確認、人との役割分担について、Gappyが実務から得た知見。',
    },
    hero: {
      eyebrow: 'Insights',
      title: '現場で動くAIについて考える。',
      body: 'AI Workforce、Workflow設計、自律化、完了確認、人との役割分担について、実務から得た知見を発信します。',
    },
    noteLabel: 'テーマ',
    topicsLabel: 'トピック',
    topics: [
      { title: 'AIに任せやすい業務とは何か', body: '観測できるTrigger、取得可能なコンテキスト、定められた判断範囲、明確な完了条件が、最初のWorkflow選定を支えます。', tags: ['Workflow設計', '導入準備'] },
      { title: '「実行」から「完了確認」へ', body: 'メッセージ送信や項目更新は、業務結果そのものではありません。結果を確認して初めて実行ループが閉じます。', tags: ['完了確認', 'Outcome'] },
      { title: '人へのエスカレーションをどう設計するか', body: '確信度、権限、ルール、リスクが人の判断を必要とする場面を定め、業務コンテキストを保って引き継ぎます。', tags: ['Human Control', '例外'] },
      { title: 'なぜ旅行業界から始めるのか', body: '旅行業務は、分断されたシステム、時間制約、サプライヤー網、現実の例外を横断するAIの実証領域です。', tags: ['Travel', 'Applied AI'] },
      { title: '既存システムもプロダクトの一部である', body: '実行レイヤーは、既存のソフトウェア、ルール、権限、業務ロジックを前提に設計する必要があります。', tags: ['既存基盤', 'Systems'] },
    ],
    disclaimer: '現在は発信予定のテーマを示しており、実記事として装っていません。基となる知見を公開できる段階で、著者と公開日を伴う記事を追加します。',
    brief: {
      eyebrow: 'Workflow brief',
      title: 'Feature Listではなく、業務を持ち寄る。',
      questions: [
        '何をきっかけに業務が始まるか',
        'どのシステムに情報があるか',
        'どの判断が業務を前へ進めるか',
        'どの操作に権限が必要か',
        '完了をどう確認するか',
        '何を人へ引き継ぐべきか',
      ],
    },
  },
  about: {
    seo: {
      title: 'Gappyについて | AI Workforce for Business Operations',
      description: 'Gappyは、複雑な業務オペレーションを実行するAI Workforceを開発するApplied AI Companyです。まず旅行業界から取り組んでいます。',
    },
    hero: {
      eyebrow: 'About Gappy',
      title: '業務責任を担えるAIをつくる。',
      body: ['Gappyは、複雑な業務オペレーションを実行するAI Workforceを開発するApplied AI Companyです。', 'まず、旅行業界から取り組んでいます。'],
    },
    mission: {
      eyebrow: 'Mission',
      title: '複雑な業務を、自律的に。',
      body: ['企業はこれまで何十年もかけて情報をデジタル化してきました。', '次に起きるのは、実行そのもののデジタル化です。', '人が方針・例外・リスクをコントロールしながら、AIが一定の業務責任を担えるシステムをGappyはつくります。'],
    },
    why: {
      eyebrow: 'Why now',
      title: 'AIによって、ソフトウェアが担える責任が変わる。',
      body: ['従来のソフトウェアは、人が操作することを前提としていました。', '現代のAIは、非構造化情報を理解し、複数のインターフェースを操作し、コミュニケーションし、制約の中で判断できます。', '重要なのは、すべての画面にAI Assistantを付けることではありません。', '業務そのものを再設計することです。'],
    },
    principles: {
      eyebrow: 'Principles',
      title: '現実の業務から、外側へ広げる。',
      items: [
        ['現実の業務から始める', 'Feature Listではなく、実際に業務がどう動いているかから考える。'],
        ['Outcomeまで責任を持つ', '次にやるべきことを提案するだけではなく、業務完了へ進める。'],
        ['現実のシステム環境で動く', '既存システム、ルール、例外、人のチームもすべてProduct Environmentとして扱う。'],
        ['Evidenceをもとに自律範囲を広げる', '理想ではなく、実際のPerformanceを見て権限を広げる。'],
        ['難しい判断は人に戻す', '曖昧さ、ルール外、高リスクな判断には明確なEscalationを設ける。'],
      ],
    },
    founder: {
      eyebrow: 'From the founder',
      title: 'オペレーションは、ソフトウェアと現実が交わる場所。',
      body: ['本当に重要な業務の多くは、一つのきれいな画面の中だけでは完結しません。', '人、システム、メッセージ、判断、例外の間を移動しながら進んでいきます。', 'Gappyは、その現実の中で実際に動けるAIをつくるために存在します。'],
      role: '株式会社Gappy 代表取締役',
      imageAlt: '株式会社Gappy 代表取締役 浅野充輝',
    },
    company: {
      eyebrow: 'Company information',
      labels: ['会社名', '代表者', '設立', '所在地', '連絡先'],
    },
  },
  careers: {
    seo: {
      title: 'Careers | Gappy',
      description: '複雑な業務コンテキストを理解し、実際のソフトウェアを操作し、結果に責任を持つApplied AI SystemsをGappyでつくる。',
    },
    hero: {
      eyebrow: 'Careers',
      title: '現実の業務で動くAIをつくる。',
      body: ['私たちがつくっているのは、文章を生成して終わるAIではありません。', '複雑な業務コンテキストを理解し、実際のソフトウェアを操作し、制約の中で判断し、その結果に責任を持つシステムです。'],
    },
    principles: [
      ['最先端技術を、現実の業務へ', '急速に進化するAI技術を、操作、権限、結果に責任が伴う業務システムへつなげます。'],
      ['顧客の課題に近い場所でつくる', '業務を支える人、システム、例外、判断そのものから学びます。'],
      ['高いOwnership', '少人数のチームが、課題設定から実装、業務結果の検証までを担います。'],
      ['最初からGlobal', '旅行は言語、市場、サプライヤー、ルール、タイムゾーンを横断します。システムもチームも、その広がりを前提につくります。'],
    ],
    disciplines: {
      eyebrow: 'Disciplines',
      title: '業務を実行するAIを支える専門性。',
      body: '以下はGappyで必要となる領域であり、すべてに募集中のポジションがあるという意味ではありません。',
      items: ['AI / Agent Engineering', 'Full-stack Engineering', 'Product', 'Design', 'Travel Operations', 'Business Development'],
    },
    application: {
      eyebrow: 'Open application',
      title: '合うポジションが見つかりませんか？',
      body: 'GappyのMissionに共感する方は、自分ならではの強みと、つくりたいものを教えてください。',
      primary: 'Gappyに連絡する',
      secondary: 'Gappyについて',
    },
  },
  contact: {
    seo: {
      title: 'Contact | Gappy',
      description: 'AI Workforceの導入、Design Partnership、戦略的協業、採用、会社・業界に関するお問い合わせ。',
    },
    hero: {
      eyebrow: 'Contact',
      title: 'その業務を、見せてください。',
      body: '複数のシステムやチーム、人の判断をまたぎ、今も手作業で動いている重要な業務があれば、ぜひ一度教えてください。',
    },
    paths: [
      ['Enterprise / Design Partner', '実際のWorkflowを起点に、AI Workforceの導入についてご相談いただけます。', '相談を予約する'],
      ['Strategic Partner / Investor', 'Gappy、技術、市場、戦略的な協業についてお話しします。', 'Gappyにメールする'],
      ['Engineering / Careers', 'Applied AI Systemsを一緒につくることに関心がありますか？', '自己紹介を送る'],
      ['Media / Industry', '会社、技術、旅行業界に関するお問い合わせを受け付けています。', 'Gappyに連絡する'],
    ],
    conversation: {
      eyebrow: 'Design partner conversation',
      title: '今あるWorkflowから始める。',
      body: 'Trigger、利用システム、人への引き継ぎ、例外、最初の導入で証明すべきことを一緒に整理します。',
      cta: '相談を予約する',
    },
  },
} satisfies SiteContent
