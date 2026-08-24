import type { Locale } from '@/content'

const copy = {
  en: { action: 'Action', verify: 'Verify', completion: 'Completion', label: 'Action moves through verification before completion' },
  ja: { action: '実行', verify: '確認', completion: '完了', label: '実行が確認を経て完了へ進むフロー' },
}

export default function VerificationPath({ locale = 'en' }: { locale?: Locale }) {
  const labels = copy[locale]

  return (
    <figure className="case-visual overflow-hidden border border-navy-900/20 bg-white p-5 md:p-7">
      <figcaption className="flex items-center justify-between font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
        <span>VERIFICATION / GAPPY AXIS</span>
        <span className="text-gold-700">ACTION ≠ COMPLETION</span>
      </figcaption>
      <svg viewBox="0 0 640 250" className="mt-4 h-auto w-full" role="img" aria-label={labels.label}>
        <path d="M92 126H548" fill="none" stroke="#D9DDD7" strokeWidth="2" />
        <path d="M92 126H548" fill="none" stroke="#00FF7D" strokeWidth="3" className="verify-path" />
        <path d="M320 38V212" fill="none" stroke="#101210" strokeOpacity=".2" />
        <path d="M308 70l12-18 12 18z" fill="#00FF7D" />
        <path d="M308 180l12 18 12-18z" fill="#101210" />
        <g>
          <rect x="44" y="92" width="96" height="68" fill="#FAFAF7" stroke="#101210" />
          <circle cx="92" cy="126" r="6" fill="#101210" />
          <text x="92" y="182" textAnchor="middle" fontSize="12" fontWeight="650" fill="#101210">{labels.action}</text>
        </g>
        <g className="verify-node">
          <rect x="268" y="78" width="104" height="96" fill="#101210" />
          <circle cx="320" cy="126" r="17" fill="#00FF7D" />
          <path d="M312 126l6 6 12-15" fill="none" stroke="#101210" strokeWidth="3" />
          <text x="320" y="194" textAnchor="middle" fontSize="12" fontWeight="650" fill="#101210">{labels.verify}</text>
        </g>
        <g>
          <rect x="500" y="92" width="96" height="68" fill="#00FF7D" stroke="#101210" />
          <circle cx="548" cy="126" r="6" fill="#101210" />
          <text x="548" y="182" textAnchor="middle" fontSize="12" fontWeight="650" fill="#101210">{labels.completion}</text>
        </g>
      </svg>
    </figure>
  )
}
