const systems = [
  ['Email', 'left-[5%] top-[14%]'],
  ['CRM', 'right-[5%] top-[10%]'],
  ['Booking system', 'left-[1%] bottom-[13%]'],
  ['Supplier portal', 'right-[1%] bottom-[14%]'],
  ['Human', 'right-[35%] bottom-[1%]'],
]

const stageSets = {
  en: ['Trigger', 'Understand', 'Decide', 'Operate', 'Verify'],
  ja: ['発生', '理解', '判断', '実行', '確認'],
}

export default function OperationalGraph({ locale = 'en' }: { locale?: 'en' | 'ja' }) {
  const stages = stageSets[locale]

  return (
    <div className="relative min-h-[470px] overflow-hidden rounded-[28px] border border-white/10 bg-navy-950 p-5 shadow-[0_32px_90px_rgba(7,14,34,0.25)] sm:p-7">
      <div className="absolute inset-0 hairline-grid opacity-60" aria-hidden="true" />
      <svg
        viewBox="0 0 620 520"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={
          locale === 'ja'
            ? '既存システムを発生、理解、判断、実行、確認のループにつなぐ業務ネットワーク'
            : 'Operational network connecting business systems to a trigger, context, decision, action, and verification loop'
        }
      >
        <path
          d="M42 92 C130 92 122 208 204 208 H500"
          fill="none"
          stroke="rgba(201,169,97,.55)"
          strokeWidth="1.5"
          className="network-path"
        />
        <path
          d="M580 94 C500 94 506 208 430 208"
          fill="none"
          stroke="rgba(255,255,255,.32)"
          strokeWidth="1.5"
          className="network-path"
        />
        <path
          d="M34 420 C140 420 112 312 214 312 H510"
          fill="none"
          stroke="rgba(255,255,255,.28)"
          strokeWidth="1.5"
          className="network-path"
        />
        <path
          d="M590 420 C498 420 516 312 448 312"
          fill="none"
          stroke="rgba(201,169,97,.55)"
          strokeWidth="1.5"
          className="network-path"
        />
        <path
          d="M390 492 C390 430 320 424 320 356"
          fill="none"
          stroke="rgba(201,169,97,.45)"
          strokeWidth="1.5"
          className="network-path"
        />
        <circle cx="204" cy="208" r="5" fill="#c9a961" className="network-pulse" />
        <circle cx="430" cy="208" r="5" fill="#fff" className="network-pulse network-delay-1" />
        <circle cx="320" cy="312" r="5" fill="#c9a961" className="network-pulse network-delay-2" />
      </svg>

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="eyebrow text-gold-300">Operational network</p>
          <p className="mt-2 text-xs text-white/45">
            {locale === 'ja'
              ? '既存システムを横断する、権限内での業務実行'
              : 'Bounded execution across existing systems'}
          </p>
        </div>
        <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 font-mono text-[9px] tracking-[0.16em] text-emerald-300">
          HUMAN CONTROL
        </span>
      </div>

      {systems.map(([label, position]) => (
        <div
          key={label}
          className={`absolute z-10 rounded-lg border border-white/15 bg-navy-900/95 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-white/65 shadow-lg ${position}`}
        >
          {label}
        </div>
      ))}

      <ol className="absolute inset-x-5 top-1/2 z-20 grid -translate-y-1/2 grid-cols-1 gap-2 sm:inset-x-7 sm:grid-cols-5">
        {stages.map((stage, index) => (
          <li
            key={stage}
            className="flex min-h-14 items-center gap-3 rounded-lg border border-white/15 bg-navy-900/95 px-3 shadow-lg sm:block sm:min-h-24 sm:px-3 sm:py-4"
          >
            <span className="font-mono text-[9px] text-gold-300">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="text-xs font-medium text-white sm:mt-7">{stage}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
