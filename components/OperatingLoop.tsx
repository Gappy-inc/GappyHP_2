import type { CSSProperties } from 'react'

type OperatingLoopProps = { compact?: boolean; items: string[][] }

export default function OperatingLoop({ compact = false, items }: OperatingLoopProps) {
  return (
    <ol className="relative border-y border-white/20 lg:grid lg:grid-cols-7">
      <span className="absolute left-[6px] top-0 h-full w-px bg-white/20 lg:left-0 lg:top-8 lg:h-px lg:w-full" aria-hidden="true" />
      <span className="workflow-line absolute left-[6px] top-0 h-full w-px bg-gold-500 lg:left-0 lg:top-8 lg:h-px lg:w-full" aria-hidden="true" />
      {items.map(([title, description], index) => (
        <li key={title} className={`relative grid grid-cols-[2rem_1fr] border-b border-white/15 py-5 pl-1 text-white last:border-b-0 lg:block lg:border-b-0 lg:border-r lg:px-5 lg:pb-7 lg:pt-16 lg:last:border-r-0 ${compact ? 'lg:min-h-36' : 'lg:min-h-52'}`}>
          <span className={`workflow-node ${index === 5 ? 'workflow-node--verify' : ''} relative z-10 mt-1 h-3 w-3 rounded-full border border-gold-300 bg-navy-900 lg:absolute lg:left-5 lg:top-[26px]`} style={{ '--step': index } as CSSProperties} aria-hidden="true" />
          <div>
            <span className="font-mono text-[12px] text-gold-300">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="mt-2 text-base font-semibold lg:mt-7">{title}</h3>
            {!compact ? <p className="mt-3 text-[13px] leading-6 text-white/55">{description}</p> : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
