type WorkflowMetadataProps = {
  labels: string[]
  values: string[]
}

export default function WorkflowMetadata({ labels, values }: WorkflowMetadataProps) {
  return (
    <dl className="mt-6 grid gap-px bg-navy-900/15 sm:grid-cols-2">
      {labels.map((label, index) => (
        <div key={label} className="bg-ivory-50 p-4">
          <dt className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink-700">{label}</dt>
          <dd className="mt-2 text-[14px] leading-6 text-navy-900">{values[index]}</dd>
        </div>
      ))}
    </dl>
  )
}
