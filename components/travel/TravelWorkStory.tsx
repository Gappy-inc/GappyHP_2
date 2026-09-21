'use client'

import Image from 'next/image'
import {
  type Dispatch,
  type KeyboardEvent,
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react'
import { SectionLabel } from '@/components/GappyAxis'
import { trackTravelEvent } from '@/components/travel/TravelInteractions'
import {
  createInitialTravelDemoState,
  getTravelDemoReason,
  getTravelDemoStatusLabel,
  isCurrentConfirmationVerified,
  sameBooking,
  travelDemoReducer,
  type RoleView,
  type TravelDemoAction,
  type TravelDemoState,
} from '@/lib/travel-demo-machine'

type Scenario = 'initial' | 'missing-reply' | 'booking-changed'
type StepState = 'complete' | 'active' | 'pending'

const workflowSteps = [
  'Booking context',
  'Confirmation needed',
  'Operator approval',
  'Simulated request',
  'Wait / bounded follow-up',
  'Current-booking verification',
  'Verified / human handoff',
]

function getWorkflowStepState(state: TravelDemoState, index: number): StepState {
  if (isCurrentConfirmationVerified(state)) return 'complete'
  if (state.status === 'cannot' || state.status === 'help' || state.status === 'conflict') {
    if (index < 5) return 'complete'
    return index === 6 ? 'active' : 'pending'
  }

  const rank = {
    idle: 1,
    approval: 2,
    waiting: 4,
    response: 5,
    verifying: 5,
    verified: 6,
    reconfirmation: 1,
    cannot: 6,
    help: 6,
    noReply: 4,
    conflict: 6,
  }[state.status]

  if (index < rank) return 'complete'
  if (index === rank) return 'active'
  return 'pending'
}

function RoleSwitch({
  state,
  dispatch,
  idPrefix,
  guideConfirmRef,
  compact = false,
}: {
  state: TravelDemoState
  dispatch: Dispatch<TravelDemoAction>
  idPrefix: string
  guideConfirmRef?: RefObject<HTMLButtonElement>
  compact?: boolean
}) {
  const setRole = (role: RoleView) => dispatch({ type: 'SET_ROLE', role })
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const roles: RoleView[] = ['operations', 'guide']
    const currentIndex = roles.indexOf(state.role)
    let nextIndex = currentIndex
    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % roles.length
    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + roles.length) % roles.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = roles.length - 1
    if (nextIndex === currentIndex) return
    event.preventDefault()
    const nextRole = roles[nextIndex]
    setRole(nextRole)
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    tabs?.[nextIndex]?.focus()
  }
  const booking = state.currentBooking

  return (
    <div className={compact ? 'travel-inline-role' : 'travel-role-stage'}>
      <div className="travel-role-tabs grid grid-cols-2" role="tablist" aria-label="Booking role views">
        {([
          ['operations', 'For operations teams'],
          ['guide', 'For guides & suppliers'],
        ] as const).map(([role, label]) => (
          <button
            key={role}
            id={`${idPrefix}-${role}-tab`}
            type="button"
            role="tab"
            tabIndex={state.role === role ? 0 : -1}
            aria-selected={state.role === role}
            aria-controls={`${idPrefix}-${role}-panel`}
            onClick={() => setRole(role)}
            onKeyDown={onTabKeyDown}
            className={state.role === role ? 'is-selected' : undefined}
          >
            {label}
          </button>
        ))}
      </div>

      {state.role === 'operations' ? (
        <div id={`${idPrefix}-operations-panel`} role="tabpanel" aria-labelledby={`${idPrefix}-operations-tab`} className="travel-role-panel grid gap-4 md:grid-cols-[0.8fr_1.2fr]">
          <div className="travel-role-card">
            <p className="travel-micro-label">Current status</p>
            <p className="mt-4 text-lg font-semibold">{getTravelDemoStatusLabel(state)}</p>
            <p className="mt-3 text-sm leading-6 text-white/55">{getTravelDemoReason(state)}</p>
          </div>
          <div className="travel-role-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><p className="text-lg font-semibold">{booking.title}</p><p className="mt-1 text-sm text-white/50">Booking #{booking.id} · Version {booking.version}</p></div>
              <span className="travel-micro-label">{booking.startTime} JST</span>
            </div>
            <ol className="mt-5 border-t border-white/15 pt-3 text-sm text-white/55">
              <li className="py-2">Assigned guide: {booking.guide}</li>
              <li className="py-2">Meeting point: {booking.meetingPoint}</li>
              <li className="py-2">Latest evidence: {state.activity.at(-1)}</li>
            </ol>
          </div>
        </div>
      ) : (
        <div id={`${idPrefix}-guide-panel`} role="tabpanel" aria-labelledby={`${idPrefix}-guide-tab`} className="travel-role-panel">
          <div className="travel-guide-card mx-auto max-w-sm bg-white p-5 text-navy-950">
            <div className="border-b border-navy-900/15 pb-4"><p className="text-lg font-semibold">Atlas Experiences</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">Prototype · configured during pilot</p></div>
            <p className="mt-5 font-semibold">{booking.title}</p>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-ink-400">Date</dt><dd className="mt-1 font-medium">Tomorrow</dd></div><div><dt className="text-ink-400">Time</dt><dd className="mt-1 font-medium">{booking.startTime} JST</dd></div><div className="col-span-2"><dt className="text-ink-400">Meeting point</dt><dd className="mt-1 font-medium">{booking.meetingPoint}</dd></div></dl>
            <p className="mt-5 text-sm font-medium">Can you operate this tour with these details?</p>
            <div className="mt-4 grid gap-2">
              <button ref={guideConfirmRef} type="button" disabled={state.status !== 'waiting'} className="min-h-12 rounded-full bg-navy-900 px-4 text-sm font-semibold text-white disabled:opacity-35" onClick={() => dispatch({ type: 'GUIDE_CONFIRM' })}>Confirm {booking.startTime} · v{booking.version}</button>
              <button type="button" disabled={state.status !== 'waiting'} className="min-h-12 rounded-full border border-navy-900 px-4 text-sm font-medium disabled:opacity-35" onClick={() => dispatch({ type: 'GUIDE_CANNOT_OPERATE' })}>Cannot operate</button>
              <button type="button" disabled={state.status !== 'waiting'} className="min-h-12 rounded-full border border-navy-900/25 px-4 text-sm font-medium disabled:opacity-35" onClick={() => dispatch({ type: 'GUIDE_NEEDS_HELP' })}>Need help</button>
            </div>
            {state.status !== 'waiting' ? <p className="mt-4 text-xs leading-5 text-ink-500">The response controls activate after the operations team approves the simulated request.</p> : null}
          </div>
        </div>
      )}
    </div>
  )
}

export function TravelWorkStory({ between }: { between?: ReactNode }) {
  const [state, dispatch] = useReducer(travelDemoReducer, undefined, createInitialTravelDemoState)
  const guideConfirmRef = useRef<HTMLButtonElement>(null)
  const focusGuideActionRef = useRef(false)
  const currentConfirmationVerified = isCurrentConfirmationVerified(state)

  useEffect(() => {
    if (state.status !== 'verifying') return
    const complete = () => dispatch({ type: 'VERIFY_COMPLETE' })
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      complete()
      return
    }
    const timer = window.setTimeout(complete, 850)
    return () => window.clearTimeout(timer)
  }, [state.status])

  useEffect(() => {
    if (!focusGuideActionRef.current || state.status !== 'waiting' || state.role !== 'guide') return
    focusGuideActionRef.current = false
    window.requestAnimationFrame(() => guideConfirmRef.current?.focus())
  }, [state.role, state.status])

  useEffect(() => {
    if (currentConfirmationVerified) trackTravelEvent('sample_demo_verified')
  }, [currentConfirmationVerified])

  const runSample = useCallback(() => {
    dispatch({ type: 'RUN_SAMPLE' })
    trackTravelEvent('sample_demo_start')
  }, [])

  const approve = () => {
    focusGuideActionRef.current = true
    dispatch({ type: 'APPROVE_REQUEST' })
  }

  const openScenario = useCallback((scenario: Scenario) => {
    if (scenario === 'initial') runSample()
    if (scenario === 'missing-reply') dispatch({ type: 'OPEN_MISSING_REPLY' })
    if (scenario === 'booking-changed') dispatch({ type: 'OPEN_BOOKING_CHANGED' })
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('work-demo')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  }, [runSample])

  useEffect(() => {
    const onScenario = (event: Event) => {
      const detail = (event as CustomEvent<{ scenario?: Scenario }>).detail
      if (detail?.scenario) openScenario(detail.scenario)
    }
    window.addEventListener('gappy:travel-scenario', onScenario)
    return () => window.removeEventListener('gappy:travel-scenario', onScenario)
  }, [openScenario])

  const booking = state.currentBooking
  const responseMatches = sameBooking(state.responseSnapshot, booking)
  const verificationChecks = [
    ['Booking active', true],
    ['Start time', responseMatches],
    ['Booking version', responseMatches],
    ['Assigned guide', true],
  ] as const

  return (
    <>
      <section id="work-demo" className="travel-work-section scroll-mt-24 text-white">
        <div className="container-luxe">
          <div className="travel-work-intro grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div><SectionLabel index="01" inverse>Concrete work demo</SectionLabel><h2 className="section-title mt-7 !text-white">Instruction → workflow → verification.</h2></div>
            <div className="lg:justify-self-end"><p className="max-w-xl text-base leading-8 text-white/60">One fixed, fictional workflow. Follow the same booking through approval, guide response, verification, a material change, and reconfirmation.</p><p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-gold-300">Interactive prototype · Sample data · No messages sent</p></div>
          </div>

          <div className="travel-work-shell mt-10 overflow-hidden">
            <div className="travel-work-command grid lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="p-5 md:p-7"><p className="travel-micro-label">Fixed sample instruction</p><p className="mt-3 text-xl font-semibold">Check tomorrow&apos;s departures and follow up on unconfirmed guides.</p></div>
              <div className="flex flex-wrap gap-3 border-t border-white/10 p-5 lg:border-l lg:border-t-0"><button type="button" className="btn-light" onClick={runSample}>Run sample</button><button type="button" className="min-h-12 rounded-full border border-white/30 px-5 text-sm font-medium" onClick={() => dispatch({ type: 'RESET' })}>Reset</button></div>
            </div>

            <div className="travel-queue-snapshot">
              <p>Illustrative queue overview · static sample snapshot</p>
              <dl>{[['8', 'Verified'], ['2', 'Waiting'], ['1', 'Needs approval'], ['1', 'Blocked']].map(([value, label]) => <div key={label}><dd>{value}</dd><dt>{label}</dt></div>)}</dl>
            </div>

            <div className="travel-work-panes grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="travel-evidence-pane">
                <p className="travel-micro-label">Observable activity &amp; evidence</p>
                <ol className="mt-5" aria-live="polite">{state.activity.map((item, index) => <li key={`${index}-${item}`}><span>{String(index + 1).padStart(2, '0')}</span><span>{item}</span></li>)}</ol>
                {state.status === 'idle' ? <p className="travel-empty-state">Run the sample to inspect tomorrow&apos;s queue.</p> : null}
              </div>

              <div className="travel-workflow-pane">
                <div className="travel-workflow-header">
                  <div><p className="travel-micro-label">Current work item · Booking #{booking.id}</p><h3>{booking.title}</h3><p>Tomorrow · {booking.startTime} JST · Version {booking.version} · Guide {booking.guide}</p></div>
                  <span>{getTravelDemoStatusLabel(state)}</span>
                </div>

                <ol className="travel-workflow-steps" aria-label="Connected confirmation workflow">
                  {workflowSteps.map((step, index) => {
                    const stepState = getWorkflowStepState(state, index)
                    return <li key={step} className={`is-${stepState}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><b>{stepState}</b></li>
                  })}
                </ol>

                <div className="travel-workflow-action" aria-live="polite">
                  {state.status === 'idle' ? <button type="button" className="btn-light" onClick={runSample}>Start with booking v{booking.version}</button> : null}
                  {state.status === 'approval' ? <div><p>Prepared request: confirm guide assignment, {state.requestSnapshot?.startTime} start time, and meeting point for v{state.requestSnapshot?.version}.</p><button type="button" className="btn-light mt-4" onClick={approve}>Approve simulated request</button></div> : null}
                  {state.status === 'waiting' ? <p>Approved request for {state.requestSnapshot?.startTime} · v{state.requestSnapshot?.version}. Continue in the guide view directly below.</p> : null}
                  {state.status === 'response' ? <div><p><strong>RESPONSE RECEIVED ≠ VERIFIED.</strong> Compare the reply with the current booking before closing.</p><div className="mt-4 flex flex-wrap gap-3"><button type="button" className="btn-light" onClick={() => dispatch({ type: 'VERIFY_BEGIN' })}>Verify current details</button><button type="button" className="min-h-12 rounded-full border border-white/30 px-5 text-sm" onClick={() => dispatch({ type: 'SIMULATE_SOURCE_CONFLICT' })}>Simulate source conflict</button></div></div> : null}
                  {state.status === 'verifying' || state.status === 'verified' ? <div><div className="flex items-center justify-between gap-3"><p className="font-semibold">{state.status === 'verifying' ? 'VERIFYING CURRENT BOOKING' : `VERIFIED · ${booking.startTime} · v${booking.version}`}</p><span className="font-mono text-[10px] text-white/40">CURRENT SNAPSHOT</span></div><ul className="mt-4 grid gap-2 sm:grid-cols-2">{verificationChecks.map(([check, passed]) => <li key={check} className="flex items-center gap-2 text-sm text-white/65"><span className={passed ? 'text-gold-300' : 'text-red-400'}>{passed ? '✓' : '!'}</span>{check}</li>)}</ul>{state.status === 'verified' ? <div className="mt-5 border-t border-white/15 pt-5"><p className="text-xs leading-6 text-white/45">This verifies the current guide confirmation, not that the tour was operated.</p>{booking.version === 3 ? <button type="button" className="btn-light mt-4" onClick={() => { dispatch({ type: 'CHANGE_BOOKING_TIME' }); trackTravelEvent('sample_demo_reconfirmation') }}>Change booking to 10:30</button> : <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-gold-300">Reconfirmation loop complete</p>}</div> : null}</div> : null}
                  {state.status === 'reconfirmation' ? <div className="travel-reconfirmation-card"><p className="travel-micro-label !text-navy-950">Booking changed</p><p className="mt-3 text-lg font-semibold"><s>09:00 · v3 confirmed</s> → 10:30 · v4</p><p className="mt-3 font-semibold">PRIOR CONFIRMATION INVALID · RECONFIRMATION REQUIRED</p><button type="button" className="btn-primary mt-4" onClick={() => dispatch({ type: 'PREPARE_RECONFIRMATION' })}>Prepare reconfirmation</button></div> : null}
                  {state.status === 'noReply' ? <div><p>No reply yet. The v{booking.version} job stays open; one bounded follow-up is due at 15:00.</p><button type="button" className="btn-light mt-4" onClick={() => { focusGuideActionRef.current = true; dispatch({ type: 'SIMULATE_FOLLOW_UP' }) }}>Simulate follow-up</button></div> : null}
                  {state.status === 'cannot' || state.status === 'help' || state.status === 'conflict' ? <div className="travel-handoff-card"><p className="font-semibold">HUMAN HANDOFF REQUIRED · NOT VERIFIED</p><p className="mt-3 text-sm text-white/60">{getTravelDemoReason(state)}</p></div> : null}
                </div>

                <RoleSwitch state={state} dispatch={dispatch} idPrefix="demo-role" guideConfirmRef={guideConfirmRef} compact />
              </div>
            </div>
          </div>

          <div className="travel-before-after mt-7 grid gap-5 md:grid-cols-2"><div><p>Before</p><strong>Find task → contact → wait → check → chase → update → check again</strong></div><div><p>With Gappy</p><strong>Detect → prepare → approve → follow up → verify → hand off</strong></div></div>
        </div>
      </section>

      {between}

      <section className="travel-role-section">
        <div className="container-luxe">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"><div><SectionLabel index="03" inverse>Two views · one booking</SectionLabel><h2 className="section-title mt-7 !text-white">The operations team and the guide see the same job.</h2></div><p className="body-lead max-w-xl !text-white/55 lg:justify-self-end">This second projection stays synchronized with the interactive stage above: one booking, one lifecycle, and one current source of truth.</p></div>
          <div className="mt-10"><RoleSwitch state={state} dispatch={dispatch} idPrefix="explainer-role" /></div>
        </div>
      </section>
    </>
  )
}

export function TravelScenarioCards() {
  const scenarios: Array<{ id: Scenario; number: string; title: string; body: string; action: string; image: string; alt: string }> = [
    { id: 'initial', number: '01', title: 'Initial confirmation', body: 'Surface the booking, prepare the request, and keep operator approval visible.', action: 'Run initial confirmation', image: '/travel-scenario-initial.webp', alt: 'A local guide checks booking details at a quiet morning meeting point' },
    { id: 'missing-reply', number: '02', title: 'Missing reply', body: 'Keep the work open, follow up inside a bounded rule, and hand off at the deadline.', action: 'View follow-up state', image: '/travel-scenario-missing-reply.webp', alt: 'A travel operations coordinator checks a pending response near a deadline' },
    { id: 'booking-changed', number: '03', title: 'Booking changed', body: 'Invalidate the old 09:00 confirmation when the current start time becomes 10:30.', action: 'Run change scenario', image: '/travel-scenario-booking-changed.webp', alt: 'A travel operator reviews an updated itinerary at a rainy pickup point' },
  ]

  return (
    <div className="travel-scenario-grid grid lg:grid-cols-3">
      {scenarios.map((scenario) => (
        <article key={scenario.id} className="travel-scenario-card group flex min-h-80 flex-col text-white">
          <Image src={scenario.image} alt={scenario.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="travel-scenario-card__image" />
          <div className="travel-scenario-card__content">
            <div className="flex items-center justify-between"><span className="font-mono text-[11px] text-gold-300">SAMPLE SCENARIO · {scenario.number}</span><span className="h-2 w-2 rounded-full bg-gold-500" aria-hidden="true" /></div>
            <h3>{scenario.title}</h3>
            <p>{scenario.body}</p>
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('gappy:travel-scenario', { detail: { scenario: scenario.id } }))}>{scenario.action} <span aria-hidden="true">→</span></button>
          </div>
        </article>
      ))}
    </div>
  )
}
