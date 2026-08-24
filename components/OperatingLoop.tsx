type OperatingLoopProps = {
  compact?: boolean
  items: string[][]
}

export default function OperatingLoop({
  compact = false,
  items,
}: OperatingLoopProps) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-7">
      {items.map(([title, description], index) => (
        <li
          key={title}
          className={`${compact ? 'min-h-36' : 'min-h-52'} bg-navy-900 p-5 text-white lg:p-6`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-gold-300">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold-300/70" aria-hidden="true" />
          </div>
          <h3 className="mt-9 text-sm font-medium">{title}</h3>
          {!compact ? (
            <p className="mt-3 text-xs leading-6 text-white/50">{description}</p>
          ) : null}
        </li>
      ))}
    </ol>
  )
}
