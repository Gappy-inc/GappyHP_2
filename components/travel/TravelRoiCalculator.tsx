'use client'

import { useMemo, useState } from 'react'
import type { Locale } from '@/content'
import type { TravelGlobalCopy } from '@/content/travel-global'

const currencyDefaults = { JPY: 2500, USD: 35, SGD: 45, EUR: 32 } as const
type Currency = keyof typeof currencyDefaults

function bounded(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, value))
}

export function TravelRoiCalculator({ locale, copy }: { locale: Locale; copy: TravelGlobalCopy['roi'] }) {
  const [monthlyCases, setMonthlyCases] = useState(500)
  const [manualMinutes, setManualMinutes] = useState(12)
  const [coverage, setCoverage] = useState(60)
  const [reduction, setReduction] = useState(50)
  const [currency, setCurrency] = useState<Currency>(locale === 'ja' ? 'JPY' : 'USD')
  const [hourlyCost, setHourlyCost] = useState<number>(currencyDefaults[locale === 'ja' ? 'JPY' : 'USD'])

  const results = useMemo(() => {
    const baselineHours = bounded(monthlyCases, 0, 1_000_000) * bounded(manualMinutes, 0, 1440) / 60
    const addressableHours = baselineHours * bounded(coverage, 0, 100) / 100
    const hoursReturned = addressableHours * bounded(reduction, 0, 100) / 100
    const monthlyValue = hoursReturned * bounded(hourlyCost, 0, 1_000_000)
    return { baselineHours, hoursReturned, monthlyValue, annualValue: monthlyValue * 12 }
  }, [coverage, hourlyCost, manualMinutes, monthlyCases, reduction])

  const number = new Intl.NumberFormat(locale === 'ja' ? 'ja-JP' : 'en-US', { maximumFractionDigits: 1 })
  const money = new Intl.NumberFormat(locale === 'ja' ? 'ja-JP' : 'en-US', { style: 'currency', currency, maximumFractionDigits: currency === 'JPY' ? 0 : 0 })
  const numberInput = (label: string, value: number, onChange: (value: number) => void, suffix?: string) => (
    <label>
      <span>{label}</span>
      <span className="travel-roi-input"><input type="number" min="0" value={value} onChange={(event) => onChange(Number(event.target.value))} />{suffix ? <b>{suffix}</b> : null}</span>
    </label>
  )

  return (
    <div className="travel-roi-calculator">
      <p className="travel-micro-label">{copy.panelLabel}</p>
      <div className="travel-roi-controls">
        {numberInput(copy.monthlyCases, monthlyCases, setMonthlyCases)}
        {numberInput(copy.manualMinutes, manualMinutes, setManualMinutes, locale === 'ja' ? '分' : 'min')}
        {numberInput(copy.coverage, coverage, setCoverage, '%')}
        {numberInput(copy.reduction, reduction, setReduction, '%')}
        <label><span>{copy.currency}</span><select value={currency} onChange={(event) => { const next = event.target.value as Currency; setCurrency(next); setHourlyCost(currencyDefaults[next]) }}>{Object.keys(currencyDefaults).map((item) => <option key={item}>{item}</option>)}</select></label>
        {numberInput(copy.hourlyCost, hourlyCost, setHourlyCost, currency)}
      </div>
      <div className="travel-roi-output travel-roi-output--primary">
        <span>{copy.hoursReturned}</span><strong>{number.format(results.hoursReturned)}</strong><small>{locale === 'ja' ? '時間' : 'hours'}</small>
      </div>
      <div className="travel-roi-secondary">
        <div><span>{copy.baselineHours}</span><strong>{number.format(results.baselineHours)}</strong></div>
        <div><span>{copy.monthlyValue}</span><strong>{money.format(results.monthlyValue)}</strong></div>
        <div><span>{copy.annualValue}</span><strong>{money.format(results.annualValue)}</strong></div>
      </div>
      <p className="travel-roi-disclaimer">{copy.disclaimer}</p>
    </div>
  )
}
