export default function StatusLabel({ children }: { children: string }) {
  return (
    <span className="inline-flex min-h-8 items-center gap-2 border border-navy-900/25 bg-white px-3 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-navy-900">
      <span className="h-2 w-2 border border-navy-900 bg-signal-500" aria-hidden="true" />
      {children}
    </span>
  )
}
