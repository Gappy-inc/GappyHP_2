import type { Locale } from '@/content'

const copy = {
  en: { action: 'Action', expected: 'Expected state', actual: 'Actual state', complete: 'Verified complete', escalate: 'Escalate', label: 'An action is checked against expected and actual state before verified completion or escalation.' },
  ja: { action: '実行', expected: '期待する状態', actual: '実際の状態', complete: '確認済みの完了', escalate: '人へ引き継ぐ', label: '実行後に期待する状態と実際の状態を照合し、確認済みの完了または人への引き継ぎへ進む流れ。' },
}

export default function VerificationPath({ locale = 'en' }: { locale?: Locale }) {
  const labels = copy[locale]

  return (
    <figure className="overflow-hidden border border-navy-900/20 bg-white p-5 md:p-7">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-900/15 pb-4 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-ink-700">
        <span>VERIFICATION / GAPPY AXIS</span>
        <span className="text-signal-700">ACTION ≠ COMPLETION</span>
      </figcaption>
      <p className="sr-only">{labels.label}</p>
      <ol className="mt-4 grid gap-px bg-navy-900/15 sm:grid-cols-4">
        {[labels.action, labels.expected, labels.actual, labels.complete].map((label, index) => (
          <li key={label} className={`relative min-h-20 bg-ivory-50 p-4 text-sm font-semibold leading-6 text-navy-900 ${index === 3 ? 'border-t-4 border-signal-500' : ''}`}>
            <span className="font-mono text-[12px] font-medium text-signal-700">{String(index + 1).padStart(2, '0')}</span>
            <span className="mt-3 block">{label}</span>
            {index < 3 ? <span className="absolute -bottom-2 left-5 z-10 text-signal-700 sm:-right-2 sm:bottom-auto sm:left-auto sm:top-1/2 sm:-translate-y-1/2" aria-hidden="true">→</span> : null}
          </li>
        ))}
      </ol>
      <div className="mt-3 flex items-center gap-3 border border-navy-900/20 bg-ivory-100 px-4 py-3 text-sm font-medium text-navy-900">
        <span className="font-mono text-[12px] text-signal-700">OR</span>
        <span>{labels.escalate}</span>
      </div>
    </figure>
  )
}
