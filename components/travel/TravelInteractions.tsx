'use client'

import type { MouseEventHandler, ReactNode } from 'react'
import { useEffect, useState } from 'react'

export type TravelEventName =
  | 'travel_lp_view'
  | 'demo_gate_view'
  | 'email_submit_attempt'
  | 'lead_capture_success'
  | 'lead_capture_error'
  | 'video_play'
  | 'video_progress_25'
  | 'video_progress_50'
  | 'video_progress_75'
  | 'video_complete'
  | 'booking_cta_click'
  | 'sample_demo_start'
  | 'sample_demo_verified'
  | 'sample_demo_reconfirmation'
  | 'demo_start'
  | 'demo_approve'
  | 'demo_response_received'
  | 'demo_verified'
  | 'demo_booking_change'
  | 'demo_reconfirmation'
  | 'pilot_cta_click'

const oneTimeEvents = new Set<TravelEventName>()

export function trackTravelEvent(
  name: TravelEventName,
  detail: { entryLocation?: string; progress?: number } = {},
) {
  if (name === 'travel_lp_view' || name === 'demo_start' || name === 'sample_demo_start') {
    if (oneTimeEvents.has(name)) return
    oneTimeEvents.add(name)
  }

  window.dispatchEvent(
    new CustomEvent('gappy:travel-lp-event', { detail: { name, ...detail } }),
  )
}

export function TrackedAnchor({
  eventName,
  href,
  className,
  children,
  target,
  rel,
}: {
  eventName: TravelEventName
  href: string
  className?: string
  children: ReactNode
  target?: string
  rel?: string
}) {
  const onClick: MouseEventHandler<HTMLAnchorElement> = () => {
    trackTravelEvent(eventName)
  }

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

type DemoState =
  | 'detected'
  | 'waiting'
  | 'response'
  | 'verifying'
  | 'verified'
  | 'reconfirmation'
  | 'escalated'

const verificationChecks = [
  'Booking active',
  'Product unchanged',
  'Date unchanged',
  'Start time unchanged',
  'Guide assignment unchanged',
  'No cancellation',
  'Source state healthy',
]

export function InteractiveConfirmationDemo() {
  const [state, setState] = useState<DemoState>('detected')

  useEffect(() => {
    trackTravelEvent('travel_lp_view')
  }, [])

  useEffect(() => {
    if (state !== 'verifying') return

    const timer = window.setTimeout(() => {
      setState('verified')
      trackTravelEvent('demo_verified')
    }, 1100)

    return () => window.clearTimeout(timer)
  }, [state])

  const markStarted = () => {
    trackTravelEvent('demo_start')
  }

  const approve = () => {
    markStarted()
    trackTravelEvent('demo_approve')
    setState('waiting')
  }

  const confirm = () => {
    trackTravelEvent('demo_response_received')
    setState('response')
  }

  const changeBooking = () => {
    trackTravelEvent('demo_booking_change')
    trackTravelEvent('demo_reconfirmation')
    setState('reconfirmation')
  }

  const reset = () => {
    setState('detected')
  }

  const status = {
    detected: 'CONFIRMATION REQUIRED',
    waiting: 'WAITING RESPONSE',
    response: 'RESPONSE RECEIVED',
    verifying: 'VERIFYING',
    verified: 'VERIFIED',
    reconfirmation: 'RECONFIRMATION REQUIRED',
    escalated: 'ESCALATED',
  }[state]

  const isVerificationVisible = state === 'verifying' || state === 'verified'

  return (
    <div className="grid overflow-hidden border border-navy-900/20 bg-white lg:grid-cols-[1.2fr_0.8fr]">
      <div className="p-5 sm:p-7 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy-900/15 pb-5">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-500">Booking #2871</p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-navy-900">Mt. Fuji Day Tour</h3>
          </div>
          <span className="border border-navy-900 bg-ivory-50 px-3 py-2 font-mono text-[11px] font-medium text-navy-900">
            {status}
          </span>
        </div>

        <dl className="grid gap-px bg-navy-900/15 sm:grid-cols-3">
          {[
            ['Date', 'Tomorrow'],
            ['Time', state === 'reconfirmation' ? '10:30' : '09:00'],
            ['Guide', 'Tanaka'],
          ].map(([label, value]) => (
            <div key={label} className="bg-white px-4 py-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">{label}</dt>
              <dd className="mt-2 text-sm font-medium text-navy-900">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 min-h-56" aria-live="polite">
          {state === 'detected' ? (
            <div className="border-l-4 border-gold-500 bg-ivory-100 p-5">
              <p className="eyebrow text-gold-700">AI recommendation</p>
              <p className="mt-4 text-lg font-semibold text-navy-900">Guide confirmation required.</p>
              <p className="mt-3 text-sm leading-7 text-ink-500">No valid confirmation exists for the current booking state.</p>
              <button type="button" className="btn-primary mt-6" onClick={approve}>Approve &amp; Send</button>
            </div>
          ) : null}

          {state === 'waiting' ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-navy-900/15 p-5">
                <p className="eyebrow text-gold-700">Message sent</p>
                <p className="mt-4 text-lg font-semibold">Waiting for guide</p>
                <p className="mt-3 text-sm leading-7 text-ink-500">The work item remains open until the response is checked against the current booking.</p>
              </div>
              <div className="border border-dashed border-navy-900/25 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-400">Open work item</p>
                <p className="mt-4 text-sm leading-7 text-ink-500">Deadline: Today · 17:00</p>
                <p className="mt-1 text-sm leading-7 text-ink-500">Next chase: In 2 hours</p>
              </div>
            </div>
          ) : null}

          {state === 'response' ? (
            <div className="border border-navy-900 bg-navy-900 p-6 text-white">
              <p className="eyebrow text-gold-300">Response received</p>
              <h4 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">The guide replied. The job is still open.</h4>
              <p className="mt-4 text-sm leading-7 text-white/60">Gappy now checks whether the response still matches the latest booking state.</p>
              <button type="button" className="btn-light mt-6" onClick={() => setState('verifying')}>Verify current booking</button>
            </div>
          ) : null}

          {isVerificationVisible ? (
            <div className="border border-navy-900/15 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="eyebrow text-gold-700">{state === 'verifying' ? 'Verifying current booking…' : 'Outcome verified'}</p>
                <span className="font-mono text-[11px] text-ink-400">7 CHECKS</span>
              </div>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {verificationChecks.map((check) => (
                  <li key={check} className="flex items-center gap-3 text-sm text-navy-900">
                    <span className="grid h-5 w-5 place-items-center border border-navy-900 bg-gold-500 text-[11px]" aria-hidden="true">✓</span>
                    {check}
                  </li>
                ))}
              </ul>
              {state === 'verified' ? (
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-navy-900/15 pt-6">
                  <p className="text-2xl font-semibold tracking-[-0.035em] text-navy-900">VERIFIED</p>
                  <button type="button" className="btn-secondary" onClick={changeBooking}>Change booking time</button>
                </div>
              ) : null}
            </div>
          ) : null}

          {state === 'reconfirmation' ? (
            <div className="border border-navy-900 bg-ivory-100 p-5">
              <p className="eyebrow text-gold-700">Booking change detected</p>
              <div className="mt-5 grid gap-3 font-medium text-navy-900 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <span className="border border-navy-900/20 bg-white p-4">09:00 · Confirmed</span>
                <span aria-hidden="true">→</span>
                <span className="border border-navy-900 bg-gold-500 p-4">10:30 · New time</span>
              </div>
              <p className="mt-5 text-sm leading-7 text-ink-500">Previous confirmation invalidated.</p>
              <p className="mt-2 text-xl font-semibold text-navy-900">RECONFIRMATION REQUIRED</p>
              <p className="mt-5 border-t border-navy-900/15 pt-5 text-base font-semibold">A reply is not the same as a completed job.</p>
            </div>
          ) : null}

          {state === 'escalated' ? (
            <div className="border border-navy-900 bg-ivory-100 p-6">
              <p className="eyebrow text-gold-700">Escalated</p>
              <h4 className="mt-5 text-xl font-semibold">A person needs to take over.</h4>
              <p className="mt-3 text-sm leading-7 text-ink-500">The response, booking context, deadline, and action history stay attached to the work item.</p>
            </div>
          ) : null}
        </div>

        {state !== 'detected' ? (
          <button type="button" className="mt-6 min-h-11 text-sm font-medium underline decoration-gold-500 underline-offset-8" onClick={reset}>
            Restart demo
          </button>
        ) : null}
      </div>

      <div className="border-t border-navy-900/20 bg-ivory-100 p-5 sm:p-8 lg:border-l lg:border-t-0">
        <p className="eyebrow text-ink-500">External confirmation</p>
        <div className="mx-auto mt-6 max-w-[20rem] border border-navy-900 bg-white p-4 shadow-[8px_8px_0_#101210]">
          <div className="border-b border-navy-900/15 pb-4">
            <p className="text-sm font-semibold text-navy-900">Atlas Experiences</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">Guide confirmation</p>
          </div>
          <div className="py-5">
            <p className="font-semibold text-navy-900">Mt. Fuji Day Tour</p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-ink-400">Date</dt><dd className="mt-1 font-medium">Tomorrow</dd></div>
              <div><dt className="text-ink-400">Time</dt><dd className="mt-1 font-medium">{state === 'reconfirmation' ? '10:30' : '09:00'}</dd></div>
            </dl>
            <p className="mt-5 text-sm font-medium">Can you operate this tour?</p>
            <div className="mt-4 grid gap-2">
              <button type="button" onClick={confirm} disabled={state !== 'waiting'} className="min-h-12 border border-navy-900 bg-navy-900 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-35">Confirm</button>
              <button type="button" onClick={() => setState('escalated')} disabled={state !== 'waiting'} className="min-h-12 border border-navy-900 px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-35">Cannot operate</button>
              <button type="button" onClick={() => setState('escalated')} disabled={state !== 'waiting'} className="min-h-12 border border-navy-900/20 px-4 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-35">Need help</button>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-6 max-w-[20rem] text-xs leading-6 text-ink-500">Fictional demo data. No production booking or guide information is used.</p>
      </div>
    </div>
  )
}
