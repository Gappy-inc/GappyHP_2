import type { CSSProperties } from 'react'

type OperatingLoopProps = { compact?: boolean; inverse?: boolean; items: string[][] }

export default function OperatingLoop({ compact = false, inverse = true, items }: OperatingLoopProps) {
  const borderClass = inverse ? 'border-white/20' : 'border-navy-900/20'
  const nodeBackground = inverse ? 'bg-navy-900' : 'bg-white'
  const itemBorder = inverse ? 'border-white/15' : 'border-navy-900/15'

  return (
    <ol className={`relative border-y lg:grid lg:grid-cols-7 ${borderClass}`}>
      <span className={`absolute left-[6px] top-0 h-full w-px lg:left-0 lg:top-8 lg:h-px lg:w-full ${inverse ? 'bg-white/20' : 'bg-navy-900/20'}`} aria-hidden="true" />
      <span className="workflow-line absolute left-[6px] top-0 h-full w-px bg-signal-500 lg:left-0 lg:top-8 lg:h-px lg:w-full" aria-hidden="true" />
      {items.map(([title, description], index) => (
        <li key={title} className={`relative grid grid-cols-[2rem_1fr] border-b py-5 pl-1 last:border-b-0 lg:block lg:border-b-0 lg:border-r lg:px-5 lg:pb-7 lg:pt-16 lg:last:border-r-0 ${itemBorder} ${inverse ? 'text-white' : 'text-navy-900'} ${compact ? 'lg:min-h-36' : 'lg:min-h-52'}`}>
          <span className={`workflow-node ${index === 5 ? 'workflow-node--verify' : ''} relative z-10 mt-1 h-3 w-3 rounded-full border border-signal-500 ${nodeBackground} lg:absolute lg:left-5 lg:top-[26px]`} style={{ '--step': index } as CSSProperties} aria-hidden="true" />
          <div>
            <span className="font-mono text-[12px] font-medium text-signal-700">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 text-base font-semibold lg:mt-7">{title}</h3>
            {!compact ? <p className={`mt-3 text-[13px] leading-6 ${inverse ? 'text-white/70' : 'text-ink-700'}`}>{description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
