'use client'

import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { SectionLabel } from '@/components/GappyAxis'
import { trackTravelEvent } from '@/components/travel/TravelInteractions'

type DemoState =
  | 'idle'
  | 'approval'
  | 'waiting'
  | 'response'
  | 'verifying'
  | 'verified'
  | 'reconfirmation'
  | 'cannot'
  | 'help'
  | 'noReply'
  | 'conflict'

type RoleView = 'operations' | 'guide'
type Scenario = 'initial' | 'missing-reply' | 'booking-changed'

const statusLabel: Record<DemoState, string> = {
  idle: 'READY TO RUN',
  approval: 'NEEDS APPROVAL',
  waiting: 'WAITING FOR GUIDE',
  response: 'RESPONSE RECEIVED',
  verifying: 'VERIFYING',
  verified: 'VERIFIED',
  reconfirmation: 'RECONFIRMATION REQUIRED',
  cannot: 'CANNOT OPERATE',
  help: 'NEEDS HUMAN HELP',
  noReply: 'FOLLOW-UP DUE',
  conflict: 'SOURCE CONFLICT',
}

const baseActivity = ['Instruction ready', 'Sample fixture isolated from production']

export function TravelWorkStory({ between }: { between?: ReactNode }) {
  const [state, setState] = useState<DemoState>('idle')
  const [role, setRole] = useState<RoleView>('operations')
  const [activity, setActivity] = useState<string[]>(baseActivity)

  const addActivity = useCallback((item: string) => {
    setActivity((current) => current.includes(item) ? current : [...current, item])
  }, [])

  const runSample = useCallback(() => {
    setState('approval')
    setRole('operations')
    setActivity([
      '12 sample bookings loaded',
      'Unconfirmed assignment identified',
      'Confirmation request prepared',
      'Operator approval requested',
    ])
    trackTravelEvent('sample_demo_start')
  }, [])

  const openScenario = useCallback((scenario: Scenario) => {
    if (scenario === 'initial') runSample()
    if (scenario === 'missing-reply') {
      setState('noReply')
      setRole('operations')
      setActivity(['12 sample bookings loaded', 'Confirmation request simulated', 'No reply by sample follow-up time', 'Follow-up due at 15:00'])
    }
    if (scenario === 'booking-changed') {
      setState('reconfirmation')
      setRole('operations')
      setActivity(['Confirmation verified at 09:00', 'Booking start time changed to 10:30', 'Prior confirmation invalidated', 'New guide confirmation required'])
      trackTravelEvent('sample_demo_reconfirmation')
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('work-demo')?.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    })
  }, [runSample])

  useEffect(() => {
    const onScenario = (event: Event) => {
      const detail = (event as CustomEvent<{ scenario?: Scenario }>).detail
      if (detail?.scenario) openScenario(detail.scenario)
    }
    window.addEventListener('gappy:travel-scenario', onScenario)
    return () => window.removeEventListener('gappy:travel-scenario', onScenario)
  }, [openScenario])

  useEffect(() => {
    if (state !== 'verifying') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setState('verified')
      addActivity('Confirmation verified for current booking details')
      trackTravelEvent('sample_demo_verified')
      return
    }
    const timer = window.setTimeout(() => {
      setState('verified')
      addActivity('Confirmation verified for current booking details')
      trackTravelEvent('sample_demo_verified')
    }, 1000)
    return () => window.clearTimeout(timer)
  }, [addActivity, state])

  const approve = () => {
    setState('waiting')
    setRole('guide')
    addActivity('Confirmation request simulated — no message sent')
  }

  const guideReply = (nextState: 'response' | 'cannot' | 'help') => {
    setState(nextState)
    setRole('operations')
    addActivity(nextState === 'response' ? 'Guide reply received' : nextState === 'cannot' ? 'Guide cannot operate — human handoff required' : 'Guide requested help — human handoff required')
  }

  const verificationChecks = useMemo(() => [
    ['Booking active', state !== 'conflict'],
    ['Start time', state !== 'reconfirmation' && state !== 'conflict'],
    ['Assigned guide', true],
    ['Current source snapshot', state !== 'conflict'],
  ] as const, [state])

  const reset = () => {
    setState('idle')
    setRole('operations')
    setActivity(baseActivity)
  }

  return (
    <>
      <section id="work-demo" className="scroll-mt-24 bg-navy-950 py-20 text-white md:py-28">
        <div className="container-luxe">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <SectionLabel index="01" inverse>Concrete work demo</SectionLabel>
              <h2 className="section-title mt-7 !text-white">Instruction → workflow → verification.</h2>
            </div>
            <div className="lg:justify-self-end">
              <p className="max-w-xl text-base leading-8 text-white/60">One fixed, fictional workflow. No arbitrary automation builder, production booking data, AI calls, or outgoing messages.</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-gold-300">Interactive prototype · Sample data</p>
            </div>
          </div>

          <div className="mt-10 overflow-hidden border border-white/20 bg-[#0c0f0d]">
            <div className="grid border-b border-white/15 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="p-5 md:p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">Fixed sample instruction</p>
                <p className="mt-3 text-xl font-semibold">Check tomorrow&apos;s departures and follow up on unconfirmed guides.</p>
              </div>
              <div className="flex flex-wrap gap-3 border-t border-white/15 p-5 lg:border-l lg:border-t-0">
                <button type="button" className="btn-light" onClick={runSample}>Run sample</button>
                <button type="button" className="min-h-12 border border-white/30 px-5 text-sm font-medium" onClick={reset}>Reset</button>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-white/15 md:grid-cols-4">
              {[
                ['8', 'Verified'],
                ['2', 'Waiting'],
                ['1', 'Needs approval'],
                ['1', 'Blocked'],
              ].map(([value, label]) => (
                <div key={label} className="bg-navy-950 p-5">
                  <dd className="text-3xl font-semibold text-gold-300">{value}</dd>
                  <dt className="mt-1 text-xs text-white/50">{label}</dt>
                </div>
              ))}
            </dl>
            <p className="border-b border-white/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.1em] text-white/35">12 bookings · Sample data · aggregate queue status</p>

            <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
              <div className="border-b border-white/15 p-5 md:p-7 lg:border-b-0 lg:border-r">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold-300">Activity & evidence</p>
                <ol className="mt-5 space-y-1" aria-live="polite">
                  {activity.map((item, index) => (
                    <li key={item} className="grid grid-cols-[2rem_1fr] gap-3 border-l border-white/20 py-3 pl-3 text-sm leading-6 text-white/65">
                      <span className="font-mono text-[10px] text-gold-300">{String(index + 1).padStart(2, '0')}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                {state === 'idle' ? <p className="mt-5 border border-dashed border-white/20 p-4 text-sm text-white/40">Run the sample to inspect tomorrow&apos;s queue.</p> : null}
              </div>

              <div className="p-5 md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/15 pb-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">Current work item · Booking #2871</p>
                    <h3 className="mt-3 text-2xl font-semibold">Mt. Fuji Day Tour</h3>
                    <p className="mt-2 text-sm text-white/50">Tomorrow · {state === 'reconfirmation' ? '10:30' : '09:00'} JST · Guide Tanaka</p>
                  </div>
                  <span className="border border-gold-300 px-3 py-2 font-mono text-[10px] font-medium text-gold-300">{statusLabel[state]}</span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Confirmation due', state === 'approval' || state === 'idle'],
                    ['Follow-up due', state === 'noReply'],
                    ['Reconfirmation required', state === 'reconfirmation'],
                  ].map(([label, active]) => (
                    <div key={String(label)} className={`min-h-24 border p-4 ${active ? 'border-gold-300 bg-gold-500 text-navy-950' : 'border-white/15 text-white/40'}`}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.08em]">Next-action category</p>
                      <p className="mt-3 text-sm font-semibold">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 min-h-40" aria-live="polite">
                  {state === 'approval' ? (
                    <div className="border-l-4 border-gold-300 bg-white/5 p-5">
                      <p className="text-sm text-white/55">Prepared request: confirm assignment, 09:00 start time, and meeting point.</p>
                      <button type="button" className="btn-light mt-5" onClick={approve}>Approve simulated request</button>
                    </div>
                  ) : null}
                  {state === 'waiting' ? <p className="border border-white/15 p-5 text-sm leading-7 text-white/65">Request simulated. Work stays open while waiting for the guide. Sample follow-up: 15:00. Sample deadline: 17:00.</p> : null}
                  {state === 'response' ? (
                    <div className="border border-gold-300 p-5">
                      <p className="text-xl font-semibold">RESPONSE RECEIVED</p>
                      <p className="mt-3 text-sm leading-7 text-white/60">A reply is evidence. The current booking still needs to be checked.</p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <button type="button" className="btn-light" onClick={() => { setState('verifying'); addActivity('Current booking snapshot checked') }}>Verify current details</button>
                        <button type="button" className="min-h-12 border border-white/30 px-5 text-sm" onClick={() => { setState('conflict'); addActivity('Source conflict detected — verification stopped') }}>Simulate source conflict</button>
                      </div>
                    </div>
                  ) : null}
                  {state === 'verifying' || state === 'verified' ? (
                    <div className="border border-white/15 p-5">
                      <div className="flex items-center justify-between gap-3"><p className="font-semibold">{state === 'verifying' ? 'VERIFYING' : 'Confirmation verified for these booking details'}</p><span className="font-mono text-[10px] text-white/40">CURRENT SNAPSHOT</span></div>
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {verificationChecks.map(([check, passed]) => <li key={check} className="flex items-center gap-2 text-sm text-white/65"><span aria-hidden="true" className={passed ? 'text-gold-300' : 'text-red-400'}>{passed ? '✓' : '!'}</span>{check}</li>)}
                      </ul>
                      {state === 'verified' ? <div className="mt-5 border-t border-white/15 pt-5"><p className="text-xs leading-6 text-white/45">This confirms the latest booking details. It is not proof that the tour was operated.</p><button type="button" className="btn-light mt-4" onClick={() => { setState('reconfirmation'); addActivity('Booking time changed to 10:30'); addActivity('Prior confirmation invalidated'); trackTravelEvent('sample_demo_reconfirmation') }}>Change booking to 10:30</button></div> : null}
                    </div>
                  ) : null}
                  {state === 'reconfirmation' ? (
                    <div className="border border-gold-300 bg-gold-500 p-5 text-navy-950"><p className="font-mono text-[10px] uppercase tracking-[0.12em]">Booking changed</p><p className="mt-4 text-lg font-semibold"><s>09:00 · Confirmed</s> → 10:30 · New time</p><p className="mt-4 text-xl font-semibold">RECONFIRMATION REQUIRED</p><p className="mt-2 text-sm">A new guide reply is required for the changed booking.</p><button type="button" className="btn-primary mt-5" onClick={approve}>Prepare reconfirmation</button></div>
                  ) : null}
                  {state === 'noReply' ? <div className="border border-white/15 p-5"><p className="text-xl font-semibold">No reply yet.</p><p className="mt-3 text-sm leading-7 text-white/60">The job stays open. One bounded follow-up is due at 15:00; human handoff occurs at the sample 17:00 deadline.</p><button type="button" className="btn-light mt-5" onClick={() => { setState('waiting'); setRole('guide'); addActivity('Bounded follow-up simulated') }}>Simulate follow-up</button></div> : null}
                  {state === 'cannot' || state === 'help' || state === 'conflict' ? <div className="border border-red-400 p-5"><p className="text-xl font-semibold">HUMAN HANDOFF REQUIRED</p><p className="mt-3 text-sm leading-7 text-white/60">{state === 'cannot' ? 'The guide cannot operate this tour.' : state === 'help' ? 'The guide requested help.' : 'The booking source conflicts with the confirmation evidence.'} This work is not marked verified.</p></div> : null}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-5 border-y border-white/15 py-6 md:grid-cols-2">
            <div><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">Before</p><p className="mt-3 text-base text-white/60">Find task → contact → wait → check → chase → update → check again</p></div>
            <div><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold-300">With Gappy</p><p className="mt-3 text-base font-semibold">Detect → prepare → approve → follow up → verify → hand off</p></div>
          </div>
        </div>
      </section>

      {between}

      <section className="section-shell bg-white">
        <div className="container-luxe">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div><SectionLabel index="03">Two views · one booking</SectionLabel><h2 className="section-title mt-7">The operations team and the guide see the same job.</h2></div>
            <p className="body-lead max-w-xl lg:justify-self-end">The operator keeps approval, latest-booking context, exceptions, and evidence. The guide receives a simple operator-branded confirmation experience.</p>
          </div>

          <div className="mt-10 overflow-hidden border border-navy-900/20 bg-navy-950 text-white">
            <div className="grid grid-cols-2 border-b border-white/15" role="tablist" aria-label="Booking role views">
              <button id="operations-tab" type="button" role="tab" aria-selected={role === 'operations'} aria-controls="operations-panel" onClick={() => setRole('operations')} className={`min-h-14 px-4 text-sm font-semibold ${role === 'operations' ? 'bg-gold-500 text-navy-950' : 'text-white/55'}`}>For operations teams</button>
              <button id="guide-tab" type="button" role="tab" aria-selected={role === 'guide'} aria-controls="guide-panel" onClick={() => setRole('guide')} className={`min-h-14 px-4 text-sm font-semibold ${role === 'guide' ? 'bg-gold-500 text-navy-950' : 'text-white/55'}`}>For guides &amp; suppliers</button>
            </div>

            {role === 'operations' ? (
              <div id="operations-panel" role="tabpanel" aria-labelledby="operations-tab" className="grid gap-6 p-5 md:grid-cols-[0.75fr_1.25fr] md:p-8">
                <div className="border border-white/15 p-5"><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold-300">Queue reason</p><p className="mt-4 text-lg font-semibold">{statusLabel[state]}</p><p className="mt-3 text-sm leading-7 text-white/55">No valid confirmation exists for the latest booking version.</p></div>
                <div className="border border-white/15 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-lg font-semibold">Mt. Fuji Day Tour</p><p className="mt-1 text-sm text-white/50">Booking #2871 · Version {state === 'reconfirmation' ? '4' : '3'}</p></div><span className="font-mono text-[10px] text-gold-300">{state === 'reconfirmation' ? '10:30 JST' : '09:00 JST'}</span></div><ol className="mt-5 border-t border-white/15 pt-4 text-sm text-white/55"><li className="py-2">Assigned guide: Tanaka</li><li className="py-2">Meeting point: Shinjuku West Exit</li><li className="py-2">Latest evidence: {activity.at(-1)}</li></ol></div>
              </div>
            ) : (
              <div id="guide-panel" role="tabpanel" aria-labelledby="guide-tab" className="p-5 md:p-8">
                <div className="mx-auto max-w-sm border border-white bg-white p-5 text-navy-950 shadow-[10px_10px_0_#00ff7d]">
                  <div className="border-b border-navy-900/15 pb-4"><p className="text-lg font-semibold">Atlas Experiences</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">Prototype · configured during pilot</p></div>
                  <p className="mt-5 font-semibold">Mt. Fuji Day Tour</p>
                  <dl className="mt-4 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-ink-400">Date</dt><dd className="mt-1 font-medium">Tomorrow</dd></div><div><dt className="text-ink-400">Time</dt><dd className="mt-1 font-medium">{state === 'reconfirmation' ? '10:30 JST' : '09:00 JST'}</dd></div><div className="col-span-2"><dt className="text-ink-400">Meeting point</dt><dd className="mt-1 font-medium">Shinjuku West Exit</dd></div></dl>
                  <p className="mt-5 text-sm font-medium">Can you operate this tour with these details?</p>
                  <div className="mt-4 grid gap-2">
                    <button type="button" disabled={state !== 'waiting'} className="min-h-12 bg-navy-900 px-4 text-sm font-semibold text-white disabled:opacity-35" onClick={() => guideReply('response')}>Confirm</button>
                    <button type="button" disabled={state !== 'waiting'} className="min-h-12 border border-navy-900 px-4 text-sm font-medium disabled:opacity-35" onClick={() => guideReply('cannot')}>Cannot operate</button>
                    <button type="button" disabled={state !== 'waiting'} className="min-h-12 border border-navy-900/25 px-4 text-sm font-medium disabled:opacity-35" onClick={() => guideReply('help')}>Need help</button>
                  </div>
                  {state !== 'waiting' ? <p className="mt-4 text-xs leading-5 text-ink-500">The buttons activate after the operations team approves the simulated request.</p> : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export function TravelScenarioCards() {
  const scenarios: Array<{ id: Scenario; number: string; title: string; body: string; action: string }> = [
    { id: 'initial', number: '01', title: 'Initial confirmation', body: 'Surface the booking, prepare the request, and keep operator approval visible.', action: 'Run initial confirmation' },
    { id: 'missing-reply', number: '02', title: 'Missing reply', body: 'Keep the work open, follow up inside a bounded rule, and hand off at the deadline.', action: 'View follow-up state' },
    { id: 'booking-changed', number: '03', title: 'Booking changed', body: 'Invalidate the old 09:00 confirmation when the current start time becomes 10:30.', action: 'View reconfirmation' },
  ]

  return (
    <div className="grid gap-px bg-navy-900/20 lg:grid-cols-3">
      {scenarios.map((scenario) => (
        <article key={scenario.id} className="group flex min-h-80 flex-col bg-navy-950 p-6 text-white md:p-8">
          <div className="flex items-center justify-between"><span className="font-mono text-[11px] text-gold-300">{scenario.number}</span><span className="h-2 w-2 bg-gold-500" aria-hidden="true" /></div>
          <h3 className="mt-14 text-2xl font-semibold">{scenario.title}</h3>
          <p className="mt-4 text-sm leading-7 text-white/55">{scenario.body}</p>
          <button
            type="button"
            className="mt-auto min-h-12 border border-white/35 px-4 text-left text-sm font-semibold transition hover:border-gold-300 hover:text-gold-300"
            onClick={() => window.dispatchEvent(new CustomEvent('gappy:travel-scenario', { detail: { scenario: scenario.id } }))}
          >
            {scenario.action} <span aria-hidden="true">→</span>
          </button>
        </article>
      ))}
    </div>
  )
}
