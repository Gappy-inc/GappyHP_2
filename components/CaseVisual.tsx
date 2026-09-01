import type { CSSProperties, ReactNode } from 'react'
import type { Locale } from '@/content'

export type CaseVisualVariant =
  | 'supplier'
  | 'booking'
  | 'reconciliation'
  | 'fulfillment'
  | 'schedule'
  | 'communication'

const visualMeta: Record<CaseVisualVariant, { code: string; en: string; ja: string }> = {
  supplier: { code: 'SUPPLIER / 01', en: 'Supplier confirmation path', ja: 'サプライヤー確認フロー' },
  booking: { code: 'BOOKING / 02', en: 'Booking orchestration path', ja: '予約業務の実行フロー' },
  reconciliation: { code: 'RECONCILE / 03', en: 'Records comparison and resolution', ja: '記録の照合と差分解決' },
  fulfillment: { code: 'FULFILL / 04', en: 'Quality and fulfillment verification', ja: '予約品質と履行確認' },
  schedule: { code: 'CHANGE / 05', en: 'Schedule change signal propagation', ja: '変更情報の連動フロー' },
  communication: { code: 'COMMS / 06', en: 'Context-aware communication delivery', ja: '文脈に応じた連絡の配信' },
}

const stepStyle = (step: number) => ({ '--step': step } as CSSProperties)

function Frame({ children }: { children: ReactNode }) {
  return (
    <>
      <rect x="24" y="24" width="472" height="252" fill="#FAFAF7" stroke="#D9DDD7" />
      <path d="M24 58H496M58 24V276" stroke="#D9DDD7" />
      {children}
    </>
  )
}

function SupplierVisual() {
  return (
    <Frame>
      <path d="M92 158H432" fill="none" stroke="#101210" strokeOpacity=".3" />
      <path d="M92 158H432" fill="none" stroke="#00FF7D" strokeWidth="2" className="signal-path" />
      {[
        [92, 'EMAIL'],
        [205, 'CONTEXT'],
        [318, 'PORTAL'],
        [432, 'VERIFIED'],
      ].map(([x, label], index) => (
        <g key={String(label)}>
          <rect x={Number(x) - 40} y="126" width="80" height="64" fill="#FAFAF7" stroke="#101210" />
          <circle cx={Number(x)} cy="158" r="5" fill={index === 3 ? '#00FF7D' : '#101210'} className="signal-node" style={stepStyle(index)} />
          <text x={Number(x)} y="211" textAnchor="middle" fontSize="10" fontWeight="600" fill="#101210">{label}</text>
        </g>
      ))}
      <path d="M421 158l8 8 15-18" fill="none" stroke="#101210" strokeWidth="2" />
    </Frame>
  )
}

function BookingVisual() {
  return (
    <Frame>
      {[105, 151, 197].map((y, index) => (
        <g key={y}>
          <rect x="86" y={y - 17} width="142" height="34" fill={index === 1 ? '#00FF7D' : '#FAFAF7'} stroke="#101210" />
          <text x="102" y={y + 4} fontSize="10" fontWeight="600" fill="#101210">BOOKING {String(index + 1).padStart(2, '0')}</text>
          <path d={`M228 ${y}H294`} stroke="#101210" strokeOpacity=".35" />
        </g>
      ))}
      <path d="M294 105V197M294 151H348" stroke="#00FF7D" strokeWidth="2" className="signal-path" fill="none" />
      <rect x="348" y="106" width="112" height="90" fill="#101210" />
      <text x="404" y="145" textAnchor="middle" fontSize="10" fontWeight="600" fill="#FAFAF7">OPERATE</text>
      <text x="404" y="162" textAnchor="middle" fontSize="9" fill="#00FF7D">QUEUE → SYSTEM</text>
      <circle cx="294" cy="151" r="7" fill="#00FF7D" className="signal-node" style={stepStyle(2)} />
    </Frame>
  )
}

function ReconciliationVisual() {
  return (
    <Frame>
      <text x="92" y="90" fontSize="10" fontWeight="600" fill="#101210">SUPPLIER</text>
      <text x="386" y="90" fontSize="10" fontWeight="600" fill="#101210">RECORDS</text>
      {[118, 162, 206].map((y, index) => (
        <g key={y}>
          <rect x="82" y={y - 15} width="100" height="30" fill="#FAFAF7" stroke="#101210" />
          <rect x="338" y={y - 15} width="100" height="30" fill="#FAFAF7" stroke="#101210" />
          <text x="96" y={y + 4} fontSize="9" fill="#101210">{`SUP-${index + 1}`}</text>
          <text x="352" y={y + 4} fontSize="9" fill="#101210">{`REC-${index + 1}`}</text>
          <path d={`M182 ${y}H232M288 ${y}H338`} stroke={index === 1 ? '#00FF7D' : '#101210'} strokeOpacity={index === 1 ? '1' : '.28'} />
        </g>
      ))}
      <rect x="232" y="104" width="56" height="116" fill="#101210" />
      <text x="260" y="155" textAnchor="middle" fontSize="9" fontWeight="600" fill="#FAFAF7" transform="rotate(-90 260 155)">COMPARE</text>
      <circle cx="260" cy="162" r="8" fill="#00FF7D" className="verify-node" />
      <path d="M253 162l5 5 9-12" fill="none" stroke="#101210" strokeWidth="2" />
    </Frame>
  )
}

function FulfillmentVisual() {
  return (
    <Frame>
      <path d="M100 102V218H430" fill="none" stroke="#101210" strokeOpacity=".3" />
      {[112, 162, 212].map((y, index) => (
        <g key={y}>
          <rect x="82" y={y - 12} width="24" height="24" fill={index < 2 ? '#00FF7D' : '#FAFAF7'} stroke="#101210" />
          {index < 2 ? <path d={`M88 ${y}l5 5 9-12`} fill="none" stroke="#101210" strokeWidth="2" /> : <circle cx="94" cy={y} r="4" fill="#101210" />}
          <path d={`M122 ${y}H264`} stroke="#101210" strokeOpacity=".45" />
          <text x="122" y={y - 7} fontSize="9" fontWeight="600" fill="#101210">{['BOOKING INTEGRITY', 'MILESTONE CHECK', 'EXCEPTION REVIEW'][index]}</text>
        </g>
      ))}
      <path d="M288 112H418V218" fill="none" stroke="#00FF7D" strokeWidth="2" className="signal-path" />
      <rect x="336" y="126" width="96" height="54" fill="#101210" />
      <text x="384" y="157" textAnchor="middle" fontSize="10" fontWeight="600" fill="#00FF7D">COMPLETE</text>
      <circle cx="418" cy="218" r="7" fill="#00FF7D" className="verify-node" />
    </Frame>
  )
}

function ScheduleVisual() {
  return (
    <Frame>
      <rect x="82" y="126" width="94" height="64" fill="#101210" />
      <text x="129" y="151" textAnchor="middle" fontSize="9" fill="#FAFAF7">TIME SHIFT</text>
      <text x="129" y="170" textAnchor="middle" fontSize="15" fontWeight="700" fill="#00FF7D">+ 02:30</text>
      <path d="M176 158H258M258 158V96H354M258 158H354M258 158V220H354" fill="none" stroke="#00FF7D" strokeWidth="2" className="signal-path" />
      {([
        [258, 158, 0],
        [354, 96, 1],
        [354, 158, 2],
        [354, 220, 3],
      ] as const).map(([x, y, step]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="7" fill="#00FF7D" className="signal-node" style={stepStyle(step)} />)}
      {[
        [354, 75, 'SUPPLIER'],
        [354, 137, 'BOOKING'],
        [354, 199, 'CUSTOMER'],
      ].map(([x, y, label]) => (
        <g key={String(label)}>
          <rect x={Number(x)} y={Number(y)} width="100" height="42" fill="#FAFAF7" stroke="#101210" />
          <text x={Number(x) + 50} y={Number(y) + 25} textAnchor="middle" fontSize="9" fontWeight="600" fill="#101210">{label}</text>
        </g>
      ))}
    </Frame>
  )
}

function CommunicationVisual() {
  return (
    <Frame>
      <circle cx="260" cy="158" r="54" fill="#101210" />
      <circle cx="260" cy="158" r="34" fill="none" stroke="#00FF7D" className="verify-node" />
      <text x="260" y="155" textAnchor="middle" fontSize="10" fontWeight="600" fill="#FAFAF7">CONTEXT</text>
      <text x="260" y="172" textAnchor="middle" fontSize="9" fill="#00FF7D">POLICY + STATE</text>
      {[
        [92, 98, 'EMAIL'],
        [92, 198, 'MESSAGE'],
        [378, 98, 'NOTICE'],
        [378, 198, 'UPDATE'],
      ].map(([x, y, label], index) => {
        const left = Number(x) < 260
        const startX = left ? Number(x) + 82 : 314
        const endX = left ? 206 : Number(x)
        const cy = Number(y) + 18
        return (
          <g key={String(label)}>
            <path d={`M${startX} ${cy}H${endX}`} stroke="#00FF7D" strokeWidth="2" className="signal-path" />
            <rect x={Number(x)} y={Number(y)} width="82" height="36" fill="#FAFAF7" stroke="#101210" />
            <text x={Number(x) + 41} y={Number(y) + 22} textAnchor="middle" fontSize="9" fontWeight="600" fill="#101210">{label}</text>
            <circle cx={left ? 206 : 314} cy={cy} r="5" fill="#00FF7D" className="signal-node" style={stepStyle(index)} />
          </g>
        )
      })}
    </Frame>
  )
}

const visuals: Record<CaseVisualVariant, () => ReactNode> = {
  supplier: SupplierVisual,
  booking: BookingVisual,
  reconciliation: ReconciliationVisual,
  fulfillment: FulfillmentVisual,
  schedule: ScheduleVisual,
  communication: CommunicationVisual,
}

export default function CaseVisual({ variant, locale = 'en', className = '' }: { variant: CaseVisualVariant; locale?: Locale; className?: string }) {
  const meta = visualMeta[variant]
  const Visual = visuals[variant]

  return (
    <figure className={`case-visual relative overflow-hidden border border-navy-900/20 bg-white ${className}`}>
      <figcaption className="absolute inset-x-5 top-4 z-10 flex items-center justify-between font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-ink-500">
        <span>{meta.code}</span>
        <span className="case-arrow text-signal-700" aria-hidden="true">→</span>
      </figcaption>
      <svg viewBox="0 0 520 300" className="block h-auto w-full" role="img" aria-label={meta[locale]}>
        <Visual />
      </svg>
    </figure>
  )
}
