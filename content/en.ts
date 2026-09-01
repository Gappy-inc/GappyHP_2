export type JobOpening = {
  slug: string
  title: string
  location: string
  workStyle: string
  employmentType: string
  language: string
  summary: string
  status: 'open' | 'closed' | 'draft'
}

const enOpenings: JobOpening[] = []

export const enContent = {
  locale: 'en',
  htmlLang: 'en',
  ogLocale: 'en_US',
  navigation: {
    primary: [
      { label: 'Travel', path: '/travel' },
      { label: 'Technology', path: '/technology' },
      { label: 'Work', path: '/cases' },
      { label: 'Company', path: '/about' },
      { label: 'Careers', path: '/careers' },
    ],
    primaryLabel: 'Primary navigation',
    mobileLabel: 'Mobile navigation',
    talk: 'Discuss a workflow',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuText: 'Menu',
    closeText: 'Close',
    skip: 'Skip to content',
  },
  footer: {
    legalName: 'Gappy, Inc.',
    links: [
      { label: 'Travel', path: '/travel' },
      { label: 'Technology', path: '/technology' },
      { label: 'Work', path: '/cases' },
      { label: 'About', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' },
      { label: 'Privacy', path: '/privacy' },
      { label: 'Security', path: '/security' },
    ],
    contact: 'Contact',
    language: 'Language',
  },
  common: {
    ctaEyebrow: 'Work with Gappy',
    ctaTitle: 'Show us the operation.',
    ctaBody:
      'If critical work still moves manually across systems, human judgment, and exceptions, we would like to understand it.',
    ctaPrimary: 'Discuss a workflow',
    ctaSecondary: 'Company information',
  },
  operatingLoop: [
    ['Trigger', 'Detect the event'],
    ['Understand', 'Assemble context'],
    ['Decide', 'Choose within bounds'],
    ['Operate', 'Act across systems'],
    ['Communicate', 'Coordinate people'],
    ['Verify', 'Check the outcome'],
    ['Escalate', 'Hand off uncertainty'],
  ],
  home: {
    seo: {
      title: 'Gappy | AI Workforce for Travel Operations',
      description:
        'Gappy builds AI systems that execute complex travel operations across existing software—from trigger to verified completion.',
    },
    hero: {
      eyebrow: 'Gappy / Applied AI',
      title: 'AI that gets business done.',
      body:
        'Gappy builds AI systems that execute complex travel operations across the software teams already use—from trigger to verified completion.',
      emphasis: 'Starting with travel.',
      primary: 'Explore travel operations',
      secondary: 'Discuss a workflow',
    },
    trust: [
      'Works with existing systems',
      'Human approval',
      'Traceable execution',
      'Verified outcomes',
    ],
    what: {
      eyebrow: 'What we build',
      title: 'From AI that suggests to AI that completes.',
      items: [
        ['Operate across systems', 'Work across email, booking systems, external portals, CRM, spreadsheets, and the real software environment.'],
        ['Verify the outcome', 'Do not treat an action as completion. Compare expected and actual state, then preserve evidence of the result.'],
        ['Escalate with context', 'Hand ambiguity, out-of-scope authority, and high-risk judgment to a person with the operating history intact.'],
      ],
    },
    travel: {
      eyebrow: 'Starting with travel',
      title: 'A proving ground for operational AI.',
      body: [
        'Travel operations are fragmented across systems and depend on coordination between suppliers, customers, guides, drivers, and internal teams.',
        'Time constraints and exceptions make travel a rigorous environment for proving whether an AI Workforce can execute responsibly.',
      ],
      workflows: [
        ['Supplier Confirmation', 'Reconfirmation, follow-up, and exception handling across supplier channels.'],
        ['Booking Operations', 'Move booking work across inboxes, reservation systems, and internal queues.'],
        ['Changes & Exceptions', 'Coordinate downstream work when schedules, services, or plans change.'],
        ['Fulfillment Verification', 'Check delivery milestones and surface unresolved exceptions.'],
      ],
      cta: 'Explore travel operations',
    },
    work: {
      eyebrow: 'Current work',
      title: 'Built from real operations.',
      items: [
        {
          title: 'Gappy Tour Operations',
          subtitle: 'Internal Deployment',
          status: 'INTERNAL / ACTIVE',
          body: 'We are structuring Gappy’s own travel operations—bookings, guide coordination, customer communication, departure checks, and completion checks—as one operating workflow.',
        },
        {
          title: 'Founding Design Partner Program',
          subtitle: 'Workflow Co-design',
          status: 'OPEN FOR CONVERSATIONS',
          body: 'We are speaking with companies willing to share a real workflow and co-design an initial scope through offline evaluation, shadowing, and human-approved execution.',
        },
      ],
      cta: 'View current work',
    },
    technology: {
      eyebrow: 'Technology & accountability',
      title: 'Authority and completion criteria are part of the system.',
      body: 'Operational responsibility requires more than a capable model. It requires explicit limits, human control, an execution trace, and a verified definition of done.',
      items: [
        ['Permission Boundaries', 'Define what the system may access, decide, and change.'],
        ['Human Approval', 'Keep consequential or ambiguous decisions under human control.'],
        ['Execution Trace', 'Preserve context, actions, handoffs, and observed state.'],
        ['Verified Completion', 'Compare expected and actual state before marking work complete.'],
      ],
      cta: 'Explore the technical design',
    },
    company: {
      eyebrow: 'Company',
      title: 'Built across AI, software, product, and travel operations.',
      body: 'Gappy develops AI systems that can carry responsibility in real operations by working across AI, software, product, and travel operations.',
      name: 'Mitsuki Asano',
      role: 'Founder & Representative Director, Gappy, Inc.',
      cta: 'About Gappy',
    },
    careers: {
      eyebrow: 'Careers',
      title: 'Open application',
      status: 'There are no publicly listed roles at this time.',
      body: 'We remain open to hearing from exceptional people who strongly align with Gappy’s mission.',
      cta: 'Careers at Gappy',
    },
  },
  technology: {
    seo: {
      title: 'Technology | Gappy AI Workforce',
      description:
        'How Gappy scopes authority, operates across existing systems, records execution, verifies completion, and escalates uncertainty.',
    },
    hero: {
      eyebrow: 'Technology',
      title: 'Operational AI with explicit control.',
      body: [
        'Gappy designs the authority, access, evidence, and completion conditions around each workflow.',
        'Human escalation crosses every layer of the system.',
      ],
    },
    loop: {
      eyebrow: 'Operating loop',
      title: 'From an event to a verified outcome.',
      body: 'Each stage carries the context and constraints needed for the next. Escalation is part of the operating model, not a hidden fallback.',
    },
    layers: [
      { eyebrow: 'Context', title: 'Know the policy and operating state.', body: 'Records, messages, policy, history, and exceptions are assembled before an action is considered.', detail: ['Policy and context', 'Workflow state', 'Records and messages'] },
      { eyebrow: 'Authority', title: 'Bound what the system may do.', body: 'Permissions, approval requirements, and risk boundaries define where the system can act and where a person must decide.', detail: ['Permission boundary', 'Human approval', 'Risk limits'] },
      { eyebrow: 'Execution', title: 'Operate through authorized access.', body: 'The workflow uses approved system access and preserves an execution history across each action and handoff.', detail: ['System access', 'Execution history', 'Contextual handoff'] },
      { eyebrow: 'Verification', title: 'Close the loop with evidence.', body: 'Expected and actual state are compared. The workflow completes only when the evidence supports the outcome.', detail: ['Expected state', 'Actual state', 'Evidence'], statement: 'Action ≠ Completion' },
    ],
    humanEscalation: {
      eyebrow: 'Across every layer',
      title: 'Human escalation preserves context.',
      body: 'Ambiguity, policy exceptions, insufficient authority, and high-risk decisions move to the right person with the workflow state and execution history intact.',
    },
    principles: {
      eyebrow: 'Control model',
      title: 'Responsibility expands only with operating evidence.',
      items: [
        ['Scoped Authority', 'Define allowed decisions and actions before execution.'],
        ['Traceability', 'Preserve context, actions, approvals, and observed outcomes.'],
        ['Human Escalation', 'Route uncertainty to a person with enough context to act.'],
        ['Progressive Autonomy', 'Expand responsibility only where evidence supports it.'],
      ],
    },
    cta: { body: 'Bring us a workflow with real systems, constraints, exceptions, and a clear outcome. We begin by making its operating truth visible.' },
  },
  travel: {
    seo: {
      title: 'AI Workforce for Travel Operations | Gappy',
      description: 'Gappy executes supplier confirmation, booking operations, changes, fulfillment checks, and customer communication across existing travel systems.',
    },
    hero: {
      eyebrow: 'Gappy / Travel',
      title: 'AI Workforce for Travel Operations',
      body: 'Operational AI for work that moves across booking systems, email, supplier portals, CRM, spreadsheets, and human decisions.',
      primary: 'Discuss a travel workflow',
      secondary: 'View current work',
    },
    why: {
      eyebrow: 'Why travel',
      title: 'Travel still runs between systems.',
      body: [
        'A booking may be recorded in one system, while delivery depends on supplier communication, schedule changes, fulfillment checks, internal queues, and customer support.',
        'Gappy is building for this coordination layer.',
      ],
    },
    target: {
      eyebrow: 'Who we are building with',
      title: 'A clear current focus, with broader applicability.',
      currentLabel: 'Current focus',
      current: ['Inbound Tour Operators', 'DMCs', 'Travel Operations Teams'],
      longerTermLabel: 'Longer-term applicability',
      longerTerm: ['TMCs', 'OTAs', 'Large Travel Groups'],
    },
    workflows: {
      eyebrow: 'Travel workflows',
      title: 'Start with the work your team still has to carry.',
      labels: ['Trigger', 'Systems', 'Human control', 'Complete when'],
      items: [
        { title: 'Supplier Operations', body: 'Confirmation, reconfirmation, follow-up, and exceptions across supplier channels.', trigger: 'Departure or service date approaching', systems: 'Booking system / Email / Supplier portal', humanControl: 'Exception approval', completeWhen: 'Supplier status is verified and recorded' },
        { title: 'Booking Operations', body: 'Move booking work across inboxes, reservation systems, and internal queues.', trigger: 'New or changed booking request', systems: 'Inbox / Booking system / Internal queue', humanControl: 'Commercial or policy exception', completeWhen: 'Required booking state is confirmed' },
        { title: 'Supplier & Payment Reconciliation', body: 'Support reconciliation with traceable checks and handoffs.', trigger: 'Invoice or payment record received', systems: 'Spreadsheet / Booking record / Accounting tool', humanControl: 'Material discrepancy approval', completeWhen: 'Difference is resolved or assigned' },
        { title: 'Booking QA & Fulfillment', body: 'Check booking records and fulfillment milestones, then surface exceptions.', trigger: 'Pre-departure or delivery checkpoint', systems: 'Booking system / Operations tracker / Email', humanControl: 'Unresolved fulfillment risk', completeWhen: 'Delivery evidence is present' },
        { title: 'Schedule Change & Disruption', body: 'Coordinate downstream work when schedules, services, or plans change.', trigger: 'Schedule or service change detected', systems: 'Supplier channel / CRM / Booking system', humanControl: 'Alternative selection and approval', completeWhen: 'Affected records and people are aligned' },
        { title: 'Customer Communication', body: 'Deliver context-aware communication as part of the operating workflow.', trigger: 'Verified update requires communication', systems: 'CRM / Email / Messaging channel', humanControl: 'Sensitive or exceptional message', completeWhen: 'Approved message and delivery state are recorded' },
      ],
    },
    systems: {
      eyebrow: 'Existing systems',
      title: 'Your systems stay.',
      statement: 'The manual coordination layer changes.',
      items: ['Email', 'CRM', 'GDS', 'Spreadsheets', 'Supplier Portals', 'Booking Systems', 'Internal Systems', 'Messaging Channels'],
    },
    deployment: {
      eyebrow: 'Start bounded',
      title: 'One workflow first.',
      steps: [
        ['Map', 'Define the trigger, systems, decisions, exceptions, and completion criteria.'],
        ['Offline evaluation', 'Test the workflow against representative historical cases.'],
        ['Shadow', 'Observe live work without taking operational authority.'],
        ['Human-approved', 'Execute approved actions while measuring evidence and exceptions.'],
      ],
    },
    measurement: {
      eyebrow: 'Measurement',
      title: 'Measure completion, not activity.',
      body: 'Baselines and success criteria are defined for each workflow. No public performance claim is implied here.',
      items: ['Verified Completion', 'Human Intervention', 'Rework', 'Cycle Time', 'Critical Errors', 'Exception Rate'],
    },
    cta: {
      title: 'Start with one travel workflow.',
      body: 'Bring the trigger, systems, exceptions, and definition of done. We will define what a useful first validation needs to prove.',
      secondary: 'View current work',
    },
  },
  projects: {
    seo: { title: 'Current Work and Validation | Gappy', description: 'How Gappy validates AI Workforce through internal travel operations and a bounded design partner path.' },
    hero: {
      eyebrow: 'Current work and validation',
      title: 'Built from real operations.',
      body: 'Gappy designs AI Workforce from work that already happens: the systems, decisions, exceptions, people, and conditions that define completion.',
    },
    works: [
      {
        title: 'Gappy Tour Operations', subtitle: 'Internal Deployment', status: 'INTERNAL / ACTIVE',
        body: 'Gappy’s own travel operations are the first environment for structuring bookings, guide coordination, customer communication, departure checks, and completion checks as one workflow.',
        details: [
          ['Scope', 'Bookings, guide coordination, customer communication, departure and completion checks'],
          ['Current validation', 'Workflow definition, operating state, handoffs, and completion evidence'],
          ['Human judgment', 'Exceptions, policy decisions, and consequential communication'],
          ['Complete when', 'Required travel state and supporting evidence are recorded'],
        ],
      },
      {
        title: 'Founding Design Partner Program', subtitle: 'Workflow Co-design', status: 'OPEN FOR CONVERSATIONS',
        body: 'A bounded path for companies willing to share a real workflow and define an initial validation scope with Gappy.',
        details: [
          ['Shared input', 'The current workflow, systems, decisions, exceptions, and completion condition'],
          ['First definition', 'One bounded workflow with explicit authority and evidence'],
          ['Validation', 'Offline evaluation, shadowing, and human-approved execution'],
          ['Expansion', 'Limited autonomy only where operating evidence supports it'],
        ],
      },
    ],
    evaluation: { eyebrow: 'Evaluation path', title: 'Autonomy follows evidence.', steps: ['Offline Evaluation', 'Shadow', 'Human-approved Execution', 'Limited Autonomy'] },
    evidence: { eyebrow: 'Evidence policy', title: 'Publish only verifiable proof.', body: 'Customer names, processing volumes, reduction rates, and outcome metrics are published only when disclosure is approved and the evidence can be verified.' },
    cta: { title: 'Define one workflow with us.', body: 'Start with the operating reality and define what the first validation needs to prove.', secondary: 'Explore travel operations' },
  },
  insights: {
    seo: { title: 'Gappy Research Notes', description: 'Future research notes from Gappy on AI Workforce, travel operations, human control, and verified completion.' },
    hero: { eyebrow: 'Research notes', title: 'Gappy Research Notes', body: 'We will publish practical notes on AI Workforce, travel operations, human control, and verified completion as the underlying work becomes ready to share.' },
    note: 'No articles are publicly listed at this time.',
  },
  about: {
    seo: { title: 'About Gappy | AI Workforce for Travel Operations', description: 'Gappy is a Japanese applied AI company building AI Workforce for real travel operations.' },
    hero: { eyebrow: 'About Gappy', title: 'Building AI that can carry operational responsibility.', body: ['Gappy builds AI systems for real operations across software and people.', 'Our current focus is travel operations.'] },
    mission: { eyebrow: 'Mission', title: 'Make complex operations autonomous.', body: ['Businesses have spent decades digitizing information.', 'The next shift is digitizing execution.', 'Gappy builds systems that can carry bounded operational responsibility while people retain control of policy, ambiguity, and risk.'] },
    why: { eyebrow: 'Why now', title: 'AI changes what software can be responsible for.', body: ['Traditional software waits for a person to operate it.', 'Modern AI can understand unstructured context, work across interfaces, communicate, and make constrained decisions.', 'The opportunity is not another assistant on every screen.', 'It is to redesign how the work itself moves.'] },
    principles: {
      eyebrow: 'Principles', title: 'Build from the operation outward.',
      items: [
        ['Start with operational truth', 'Map how work actually moves before deciding what to automate.'],
        ['Own the outcome', 'Design for verified completion, not an isolated action.'],
        ['Work around reality', 'Respect existing systems, policies, authority, and constraints.'],
        ['Expand with evidence', 'Increase responsibility only where operating results justify it.'],
      ],
    },
    founder: {
      eyebrow: 'Founder', title: 'Operations are where software meets reality.',
      body: ['The most consequential work rarely happens inside one clean interface.', 'It moves between people, systems, messages, decisions, and exceptions.', 'Gappy exists to build AI that can operate inside that reality.'],
      name: 'Mitsuki Asano', role: 'Founder & Representative Director, Gappy, Inc.', imageAlt: 'Mitsuki Asano, founder and representative director of Gappy',
    },
    timeline: { eyebrow: 'Company timeline', title: 'A focused operating history.', items: [['2025', 'Gappy, Inc. established'], ['2026', 'Development focused on AI Workforce for Travel Operations']] },
    team: { eyebrow: 'Team', title: 'A founder-led company.', body: 'Gappy is currently a small, founder-led company. Additional team members will be listed only with confirmed names, roles, and approval for publication.' },
    company: { eyebrow: 'Company information', labels: ['Company name', 'Representative', 'Established', 'Location', 'Contact'] },
  },
  careers: {
    seo: { title: 'Careers | Gappy', description: 'Careers and open applications at Gappy, building accountable AI systems for real operations.' },
    hero: { eyebrow: 'Careers', title: 'Build AI that works in the real world.', body: ['We build systems that move beyond generating text.', 'The work connects AI capability to real permissions, actions, exceptions, and outcomes.'] },
    currentOpenings: { eyebrow: 'Current openings', title: 'Open application', empty: 'There are no publicly listed roles at this time.', body: 'We remain open to hearing from exceptional people who strongly align with Gappy’s mission.' },
    openings: enOpenings,
    disciplines: { eyebrow: 'Disciplines we work across', title: 'The capabilities behind operational AI.', body: 'These are working disciplines at Gappy, not current job listings.', items: ['AI / Agent Engineering', 'Full-stack Engineering', 'Product', 'Design', 'Travel Operations', 'Business Development'] },
    principles: [
      ['Frontier technology, operational consequences', 'AI capability is connected to systems where actions, permissions, and outcomes matter.'],
      ['Close to the operation', 'We learn from the people, systems, exceptions, and decisions that keep work moving.'],
      ['High ownership', 'A small team owns the path from problem definition through operating evidence.'],
    ],
    application: { primary: 'Send an open application', secondary: 'About Gappy' },
  },
  contact: {
    seo: { title: 'Contact | Gappy', description: 'Discuss a travel operations workflow or contact Gappy about careers, investment, media, partnerships, or company inquiries.' },
    hero: { eyebrow: 'Contact', title: 'Show us the operation.', body: 'If important work still moves manually across systems, people, and exceptions, we would like to understand it.' },
    paths: [
      { title: 'Workflow / Design Partner', body: 'We will map the current workflow, systems in use, exceptions, human handoffs, and the first completion condition worth validating.', note: 'Opens an external scheduling service.', cta: 'Schedule a workflow discussion' },
      { title: 'General Contact', body: 'For careers, investment, media, partnerships, and other company inquiries, contact Gappy by email.', note: 'Email is the direct contact method for this website.', cta: 'Contact by email' },
    ],
  },
  privacy: {
    seo: { title: 'Privacy | Gappy', description: 'How Gappy handles information submitted through this corporate website and its external contact links.' },
    hero: { eyebrow: 'Privacy', title: 'Privacy notice', body: 'This notice describes the limited information flows currently present on the Gappy corporate website.' },
    updated: 'Last updated: August 26, 2026',
    sections: [
      ['Information you provide', ['This website offers contact by email and a link to an external scheduling service. Information you send through those services is provided by you directly.']],
      ['How information is used', ['Contact information may be used to respond to inquiries, arrange conversations, evaluate potential collaboration, and maintain necessary business records.']],
      ['Analytics and cookies', ['The current website code does not configure an analytics or advertising tracker. Hosting providers and external services may process technical data or use their own cookies under their respective policies.']],
      ['Third-party services', ['The scheduling link opens a third-party service. Email delivery and website hosting also involve service providers. Review the policies shown by those services before providing information.']],
      ['Sharing and retention', ['Gappy does not state a fixed retention period on this website. Information is retained only as reasonably needed for the inquiry, legal obligations, security, and business records. It may be shared with service providers or where required by law.']],
      ['Contact', ['Questions about this notice can be sent to the contact email listed below.']],
    ],
  },
  security: {
    seo: { title: 'Security Approach | Gappy', description: 'Gappy’s design approach to bounded permissions, human approval, execution logging, verification, and staged pilots.' },
    hero: { eyebrow: 'Security', title: 'Control before autonomy.', body: 'Gappy treats permission, approval, evidence, and escalation as part of the workflow design—not as a badge.' },
    notice: 'This page describes design principles and pilot methods. It does not claim a security certification.',
    sections: [
      ['Limited permission scope', 'Access and actions are bounded to the systems and workflow required for the agreed validation.'],
      ['Human approval', 'Consequential, ambiguous, or policy-sensitive actions remain subject to human review.'],
      ['Execution logging', 'Relevant context, actions, approvals, and handoffs are designed to remain traceable.'],
      ['Completion verification', 'Expected state is compared with observed state before a workflow is treated as complete.'],
      ['Escalation', 'Insufficient authority, ambiguity, policy exceptions, and risk are escalated with context.'],
      ['Staged pilot method', 'Validation progresses from offline evaluation to shadowing, human-approved execution, and only then limited autonomy where evidence supports it.'],
    ],
  },
}

export type SiteContent = typeof enContent
