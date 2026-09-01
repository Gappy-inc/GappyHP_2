import type { JobOpening } from '@/content/en'

export default function CurrentOpenings({
  openings,
  empty,
}: {
  openings: JobOpening[]
  empty: string
}) {
  const publicOpenings = openings.filter((opening) => opening.status === 'open')

  if (publicOpenings.length === 0) {
    return (
      <p className="border-y border-navy-900/20 py-6 text-lg font-semibold leading-8 text-navy-900">
        {empty}
      </p>
    )
  }

  return (
    <ul className="border-t border-navy-900/20">
      {publicOpenings.map((opening) => (
        <li key={opening.slug} className="border-b border-navy-900/20 py-7">
          <h3 className="subsection-title text-navy-900">{opening.title}</h3>
          <p className="mt-3 text-sm leading-7 text-ink-700">{opening.summary}</p>
          <p className="mt-4 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink-700">
            {opening.location} / {opening.workStyle} / {opening.employmentType}
          </p>
        </li>
      ))}
    </ul>
  )
}
