const stageSets = {
  en: ['Trigger', 'Understand', 'Decide', 'Operate', 'Verify'],
  ja: ['発生', '理解', '判断', '実行', '確認'],
}

export default function OperationalGraph({ locale = 'en' }: { locale?: 'en' | 'ja' }) {
  const stages = stageSets[locale]
  return (
    <div className="relative min-h-[500px] overflow-hidden border border-white/15 bg-navy-950 p-6 text-white">
      <svg viewBox="0 0 620 500" className="absolute inset-0 h-full w-full" role="img" aria-label={locale === 'ja' ? '発生から確認まで既存システムを横断する業務実行図' : 'Operational path from trigger to verified completion across existing systems'}>
        <path d="M310 30V470M40 250H580" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1" />
        <path d="M80 110H310V250H540M80 390H310V250" fill="none" stroke="#00ff7d" strokeWidth="1.5" className="network-path" />
        <path d="M292 100L310 74L328 100Z" fill="#00ff7d" />
        <path d="M292 400L310 426L328 400Z" fill="white" />
      </svg>
      <div className="relative z-10 flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
        <span>Operational Axis</span><span>Human Control</span>
      </div>
      <ol className="absolute inset-x-6 bottom-7 z-10 grid border-t border-white/20 sm:grid-cols-5">
        {stages.map((stage, index) => (
          <li key={stage} className="flex min-h-14 items-center gap-3 border-b border-white/15 py-3 sm:min-h-24 sm:block sm:border-b-0 sm:border-r sm:px-3 sm:pt-5 sm:last:border-r-0">
            <span className="font-mono text-[11px] text-gold-300">{String(index + 1).padStart(2, '0')}</span>
            <p className="text-[13px] font-medium sm:mt-6">{stage}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
