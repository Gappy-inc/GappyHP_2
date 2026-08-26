export default function TrustStrip({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="grid border-l border-t border-navy-900/15 bg-white sm:grid-cols-2 lg:grid-cols-4" aria-label={label}>
      {items.map((item) => (
        <li key={item} className="flex min-h-16 items-center gap-3 border-b border-r border-navy-900/15 px-4 text-[14px] font-medium leading-6 text-ink-700">
          <span className="h-2 w-2 flex-none border border-signal-700 bg-signal-500" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}
