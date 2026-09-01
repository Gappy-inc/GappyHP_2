import type { CSSProperties } from 'react'
import type { Locale } from '@/content'

const traceCopy = {
  en: {
    label: 'Illustrative workflow',
    description: 'Example supplier reconfirmation sequence from trigger to recorded completion evidence.',
    steps: [
      ['TRIGGER', 'Supplier reconfirmation required'],
      ['UNDERSTAND', 'Booking, deadline and contact identified'],
      ['OPERATE', 'Supplier portal checked'],
      ['COMMUNICATE', 'Confirmation request sent'],
      ['VERIFY', 'Response matched against booking state'],
      ['COMPLETE', 'Evidence recorded'],
    ],
  },
  ja: {
    label: '業務フロー例',
    description: 'サプライヤー再確認の発生から完了根拠の記録までを示す例です。',
    steps: [
      ['TRIGGER', 'サプライヤー再確認が必要'],
      ['UNDERSTAND', '予約・期限・連絡先を特定'],
      ['OPERATE', 'サプライヤーポータルを確認'],
      ['COMMUNICATE', '確認依頼を送信'],
      ['VERIFY', '予約状態と回答内容を照合'],
      ['COMPLETE', '完了根拠を記録'],
    ],
  },
}

export default function ExecutionTrace({
  locale = 'en',
  compact = false,
}: {
  locale?: Locale
  compact?: boolean
}) {
  const copy = traceCopy[locale]
  const headingId = `execution-trace-${locale}-${compact ? 'compact' : 'full'}`

  return (
    <figure className={`execution-trace border border-navy-900/20 bg-white ${compact ? 'p-4 md:p-5' : 'p-5 md:p-7'}`}>
      <figcaption className="flex items-center justify-between gap-4 border-b border-navy-900/15 pb-4">
        <span id={headingId} className="font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-ink-700">
          {copy.label}
        </span>
        <span className="inline-flex items-center gap-2 text-[12px] font-medium text-ink-700">
          <span className="h-2 w-2 rounded-full bg-signal-500" aria-hidden="true" />
          {locale === 'ja' ? '説明用' : 'Illustrative'}
        </span>
      </figcaption>
      <p className="sr-only">{copy.description}</p>
      <ol aria-labelledby={headingId} className="mt-4 grid gap-px bg-navy-900/15 md:grid-cols-2">
        {copy.steps.map(([stage, detail], index) => (
          <li
            key={stage}
            className="trace-step relative min-h-[92px] bg-ivory-50 p-4 md:min-h-[104px]"
            style={{ '--trace-step': index } as CSSProperties}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[12px] font-medium text-signal-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-ink-700">
                {stage}
              </span>
            </div>
            <p className="mt-4 text-[15px] font-medium leading-6 text-navy-900 md:text-base">
              {detail}
            </p>
            {index < copy.steps.length - 1 ? (
              <span className="absolute -bottom-[7px] left-5 z-10 grid h-3.5 w-3.5 place-items-center bg-signal-500 text-[9px] text-navy-950 md:-right-[7px] md:bottom-auto md:left-auto md:top-1/2 md:-translate-y-1/2" aria-hidden="true">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  )
}
