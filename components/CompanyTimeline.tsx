export default function CompanyTimeline({ items }: { items: string[][] }) {
  return (
    <ol className="border-t border-navy-900/20">
      {items.map(([year, event]) => (
        <li key={`${year}-${event}`} className="grid gap-3 border-b border-navy-900/20 py-6 sm:grid-cols-[7rem_1fr] sm:items-start">
          <time className="font-mono text-sm font-medium text-signal-700">{year}</time>
          <p className="text-base font-medium leading-7 text-navy-900">{event}</p>
        </li>
      ))}
    </ol>
  )
}
