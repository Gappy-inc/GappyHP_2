import type { ReactNode } from 'react'

export function AxisMark({ inverse = false, className = '' }: { inverse?: boolean; className?: string }) {
  return (
    <span className={`relative block h-8 w-8 ${className}`} aria-hidden="true">
      <span className={`absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 ${inverse ? 'bg-white/45' : 'bg-navy-900/35'}`} />
      <span className="absolute left-[3px] top-[3px] h-0 w-0 border-b-[8px] border-l-[7px] border-r-[7px] border-b-gold-500 border-l-transparent border-r-transparent" />
      <span className={`absolute bottom-[3px] right-[3px] h-0 w-0 border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent ${inverse ? 'border-t-white' : 'border-t-navy-900'}`} />
    </span>
  )
}

export function GappyAxis({ inverse = false, label = 'Gappy Axis' }: { inverse?: boolean; label?: string }) {
  return (
    <div className={`relative min-h-[460px] overflow-hidden border ${inverse ? 'border-white/15 bg-navy-950' : 'border-navy-900/15 bg-ivory-100'}`}>
      <div className={`absolute left-1/2 top-0 h-full w-px ${inverse ? 'bg-white/20' : 'bg-navy-900/20'}`} />
      <div className={`absolute left-0 top-1/2 h-px w-full ${inverse ? 'bg-white/20' : 'bg-navy-900/20'}`} />
      <span className="axis-drift absolute left-[calc(50%_-_18px)] top-[17%] h-0 w-0 border-b-[22px] border-l-[18px] border-r-[18px] border-b-gold-500 border-l-transparent border-r-transparent" aria-hidden="true" />
      <span className={`axis-drift absolute bottom-[17%] left-[calc(50%_-_18px)] h-0 w-0 border-l-[18px] border-r-[18px] border-t-[22px] border-l-transparent border-r-transparent ${inverse ? 'border-t-white' : 'border-t-navy-900'}`} aria-hidden="true" />
      {['top-[12%] left-[14%]', 'top-[24%] right-[12%]', 'bottom-[22%] left-[10%]', 'bottom-[10%] right-[16%]'].map((position) => (
        <span key={position} className={`axis-pulse absolute h-1.5 w-1.5 rounded-full bg-gold-500 ${position}`} aria-hidden="true" />
      ))}
      <span className={`absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.2em] ${inverse ? 'text-white/45' : 'text-ink-400'}`}>{label}</span>
      <span className={`absolute bottom-5 right-5 font-mono text-[9px] uppercase tracking-[0.2em] ${inverse ? 'text-white/45' : 'text-ink-400'}`}>Trigger → Completion</span>
    </div>
  )
}

export function SectionLabel({ index, children, inverse = false }: { index: string; children: ReactNode; inverse?: boolean }) {
  return (
    <div className={`flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] ${inverse ? 'text-white/55' : 'text-ink-500'}`}>
      <span className={inverse ? 'text-gold-300' : 'text-gold-700'}>{index}</span>
      <span className={`h-px w-8 ${inverse ? 'bg-white/25' : 'bg-navy-900/25'}`} />
      <span>{children}</span>
    </div>
  )
}

export function CapabilityRows({ items, inverse = false }: { items: string[]; inverse?: boolean }) {
  return (
    <ol className={`border-t ${inverse ? 'border-white/20' : 'border-navy-900/20'}`}>
      {items.map((item, index) => (
        <li key={item} className={`grid min-h-20 grid-cols-[3rem_1fr_auto] items-center border-b ${inverse ? 'border-white/20 text-white' : 'border-navy-900/20 text-navy-900'}`}>
          <span className={`font-mono text-[9px] ${inverse ? 'text-gold-300' : 'text-gold-700'}`}>{String(index + 1).padStart(2, '0')}</span>
          <span className="text-base font-medium md:text-lg">{item}</span>
          <span className="text-gold-500" aria-hidden="true">↗</span>
        </li>
      ))}
    </ol>
  )
}
