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
import type { Locale } from '@/content'
import { travelGlobalContent, type TravelGlobalCopy } from '@/content/travel-global'
import {
  createInitialTravelDemoState,
  isCurrentConfirmationVerified,
  sameBooking,
  travelDemoReducer,
  type RoleView,
  type TravelDemoAction,
  type TravelDemoState,
} from '@/lib/travel-demo-machine'

type Scenario = 'initial' | 'missing-reply' | 'booking-changed'
type StepState = 'complete' | 'active' | 'pending'

function demoReason(state: TravelDemoState, locale: Locale) {
  const { currentBooking: booking, requestSnapshot: request, responseSnapshot: response } = state
  if (locale === 'en') {
    const reasons = {
      idle: `No valid confirmation exists for ${booking.startTime} · v${booking.version}.`, approval: `A request for ${request?.startTime} · v${request?.version} is prepared and waiting for operator approval.`,
      waiting: `The approved request for ${request?.startTime} · v${request?.version} is waiting for the guide.`, response: `The guide replied for ${response?.startTime} · v${response?.version}; current-booking verification is still required.`,
      verifying: `The guide response is being compared with current booking v${booking.version}.`, verified: `The current ${booking.startTime} · v${booking.version} confirmation is verified.`,
      reconfirmation: `The booking changed to ${booking.startTime} · v${booking.version}; the prior confirmation is invalid.`, cannot: 'The guide cannot operate this tour. Human handoff is required.', help: 'The guide requested help. Human handoff is required.',
      noReply: `No reply has been received for ${request?.startTime} · v${request?.version}; bounded follow-up is due.`, conflict: 'The response and current booking do not agree. Verification is stopped.',
    }
    return reasons[state.status]
  }
  const reasons = {
    idle: `${booking.startTime} · v${booking.version} に有効な確認はありません。`, approval: `${request?.startTime} · v${request?.version} の依頼を準備し、運用担当者の承認を待っています。`,
    waiting: `承認済みの ${request?.startTime} · v${request?.version} の依頼について、ガイドの回答を待っています。`, response: `ガイドが ${response?.startTime} · v${response?.version} に回答しました。最新予約との照合が必要です。`,
    verifying: `ガイド回答を最新予約 v${booking.version} と照合しています。`, verified: `最新の ${booking.startTime} · v${booking.version} の確認を検証しました。`,
    reconfirmation: `予約が ${booking.startTime} · v${booking.version} に変更され、以前の確認は無効です。`, cannot: 'ガイドが対応できないため、人への引継ぎが必要です。', help: 'ガイドからサポート要請があり、人への引継ぎが必要です。',
    noReply: `${request?.startTime} · v${request?.version} の回答がなく、制限付きフォローが必要です。`, conflict: '回答と最新予約が一致しないため、検証を停止しました。',
  }
  return reasons[state.status]
}

function activityLabel(item: string, locale: Locale) {
  if (locale === 'en') return item
  return item
    .replace('Instruction ready', '指示を準備')
    .replace('Sample fixture isolated from production', '本番から分離したサンプルデータ')
    .replace('12 sample bookings loaded', '12件のサンプル予約を取得')
    .replace(/Booking v(\d+) needs confirmation/, '予約 v$1 は確認が必要')
    .replace(/(\d\d:\d\d) request prepared/, '$1 の依頼を準備')
    .replace('Operator approval requested', '運用担当者の承認を依頼')
    .replace(/Reconfirmation prepared for (.+)/, '$1 の再確認を準備')
    .replace('Prepared request is stale — approval stopped', '準備済みの依頼が古いため、承認を停止')
    .replace(/Approved request simulated for (.+) — no message sent/, '$1 の承認済み依頼を再現（送信なし）')
    .replace(/Guide replied for (.+)/, 'ガイドが $1 に回答')
    .replace('Current booking snapshot checked', '最新予約のスナップショットを照合')
    .replace(/Confirmation verified for (.+)/, '$1 の確認を検証')
    .replace(/Reply for v(\d+) does not match current v(\d+) — verification stopped/, '回答 v$1 と最新予約 v$2 が一致しないため、検証を停止')
    .replace(/Booking changed to (.+)/, '予約を $1 に変更')
    .replace(/Prior v(\d+) confirmation invalidated/, '以前の v$1 確認を無効化')
    .replace('Reconfirmation required for current booking', '最新予約の再確認が必要')
    .replace('09:00 · v3 confirmation previously verified', '09:00 · v3 の確認は検証済み')
    .replace('Guide cannot operate — human handoff required', 'ガイド対応不可 — 人への引継ぎが必要')
    .replace('Guide requested help — human handoff required', 'ガイドがサポートを要請 — 人への引継ぎが必要')
    .replace('Source conflict detected — verification stopped', '情報不一致を検知 — 検証を停止')
    .replace(/Request for (.+) simulated/, '$1 の依頼を再現')
    .replace('No reply by sample follow-up time', 'サンプルのフォロー時刻まで回答なし')
    .replace('Follow-up due at 15:00', '15:00にフォロー予定')
    .replace('Bounded follow-up simulated', '制限付きフォローを再現')
}

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
  locale,
  copy,
  idPrefix,
  guideConfirmRef,
  compact = false,
}: {
  state: TravelDemoState
  dispatch: Dispatch<TravelDemoAction>
  locale: Locale
  copy: TravelGlobalCopy['demo']
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
      <div className="travel-role-tabs grid grid-cols-2" role="tablist" aria-label={copy.roleAria}>
        {([
          ['operations', copy.roleTabs[0]],
          ['guide', copy.roleTabs[1]],
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
            <p className="travel-micro-label">{copy.currentStatus}</p>
            <p className="mt-4 text-lg font-semibold">{copy.status[state.status]}</p>
            <p className="mt-3 text-sm leading-6 text-white/55">{demoReason(state, locale)}</p>
          </div>
          <div className="travel-role-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div><p className="text-lg font-semibold">{booking.title}</p><p className="mt-1 text-sm text-white/50">{copy.booking} #{booking.id} · {copy.version} {booking.version}</p></div>
              <span className="travel-micro-label">{booking.startTime} JST</span>
            </div>
            <ol className="mt-5 border-t border-white/15 pt-3 text-sm text-white/55">
              <li className="py-2">{copy.assignedGuide}: {booking.guide}</li>
              <li className="py-2">{copy.meetingPoint}: {booking.meetingPoint}</li>
              <li className="py-2">{copy.latestEvidence}: {activityLabel(state.activity.at(-1) || '', locale)}</li>
            </ol>
          </div>
        </div>
      ) : (
        <div id={`${idPrefix}-guide-panel`} role="tabpanel" aria-labelledby={`${idPrefix}-guide-tab`} className="travel-role-panel">
          <div className="travel-guide-card mx-auto max-w-sm bg-white p-5 text-navy-950">
            <div className="border-b border-navy-900/15 pb-4"><p className="text-lg font-semibold">Atlas Experiences</p><p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400">{copy.prototype}</p></div>
            <p className="mt-5 font-semibold">{booking.title}</p>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-ink-400">{copy.date}</dt><dd className="mt-1 font-medium">{copy.tomorrow}</dd></div><div><dt className="text-ink-400">{copy.time}</dt><dd className="mt-1 font-medium">{booking.startTime} JST</dd></div><div className="col-span-2"><dt className="text-ink-400">{copy.meetingPoint}</dt><dd className="mt-1 font-medium">{booking.meetingPoint}</dd></div></dl>
            <p className="mt-5 text-sm font-medium">{copy.question}</p>
            <div className="mt-4 grid gap-2">
              <button ref={guideConfirmRef} type="button" disabled={state.status !== 'waiting'} className="min-h-12 rounded-full bg-navy-900 px-4 text-sm font-semibold text-white disabled:opacity-35" onClick={() => dispatch({ type: 'GUIDE_CONFIRM' })}>{copy.confirm} {booking.startTime} · v{booking.version}</button>
              <button type="button" disabled={state.status !== 'waiting'} className="min-h-12 rounded-full border border-navy-900 px-4 text-sm font-medium disabled:opacity-35" onClick={() => dispatch({ type: 'GUIDE_CANNOT_OPERATE' })}>{copy.cannot}</button>
              <button type="button" disabled={state.status !== 'waiting'} className="min-h-12 rounded-full border border-navy-900/25 px-4 text-sm font-medium disabled:opacity-35" onClick={() => dispatch({ type: 'GUIDE_NEEDS_HELP' })}>{copy.needHelp}</button>
            </div>
            {state.status !== 'waiting' ? <p className="mt-4 text-xs leading-5 text-ink-500">{copy.controlsHelp}</p> : null}
          </div>
        </div>
      )}
    </div>
  )
}

export function TravelWorkStory({ locale, between }: { locale: Locale; between?: ReactNode }) {
  const copy = travelGlobalContent[locale].demo
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
    [copy.checks[0], true],
    [copy.checks[1], responseMatches],
    [copy.checks[2], responseMatches],
    [copy.checks[3], true],
  ] as const

  return (
    <>
      <section id="work-demo" className="travel-work-section scroll-mt-24 text-white">
        <div className="container-luxe">
          <div className="travel-work-intro grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div><SectionLabel index="01" inverse>{copy.label}</SectionLabel><h2 className="section-title mt-7 !text-white">{copy.title}</h2></div>
            <div className="lg:justify-self-end"><p className="max-w-xl text-base leading-8 text-white/60">{copy.body}</p><p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-gold-300">{copy.disclaimer}</p></div>
          </div>

          <div className="travel-work-shell mt-10 overflow-hidden">
            <div className="travel-work-command grid lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="p-5 md:p-7"><p className="travel-micro-label">{copy.instructionLabel}</p><p className="mt-3 text-xl font-semibold">{copy.instruction}</p></div>
              <div className="flex flex-wrap gap-3 border-t border-white/10 p-5 lg:border-l lg:border-t-0"><button type="button" className="btn-light" onClick={runSample}>{copy.run}</button><button type="button" className="min-h-12 rounded-full border border-white/30 px-5 text-sm font-medium" onClick={() => dispatch({ type: 'RESET' })}>{copy.reset}</button></div>
            </div>

            <div className="travel-queue-snapshot">
              <p>{copy.queueLabel}</p>
              <dl>{copy.queue.map(([value, label]) => <div key={label}><dd>{value}</dd><dt>{label}</dt></div>)}</dl>
            </div>

            <div className="travel-work-panes grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="travel-evidence-pane">
                <p className="travel-micro-label">{copy.evidence}</p>
                <ol className="mt-5" aria-live="polite">{state.activity.map((item, index) => <li key={`${index}-${item}`}><span>{String(index + 1).padStart(2, '0')}</span><span>{activityLabel(item, locale)}</span></li>)}</ol>
                {state.status === 'idle' ? <p className="travel-empty-state">{copy.empty}</p> : null}
              </div>

              <div className="travel-workflow-pane">
                <div className="travel-workflow-header">
                  <div><p className="travel-micro-label">{copy.currentWork} · {copy.booking} #{booking.id}</p><h3>{booking.title}</h3><p>{copy.tomorrow} · {booking.startTime} JST · {copy.version} {booking.version} · {copy.guide} {booking.guide}</p></div>
                  <span>{copy.status[state.status]}</span>
                </div>

                <ol className="travel-workflow-steps" aria-label={copy.workflowAria}>
                  {copy.steps.map((step, index) => {
                    const stepState = getWorkflowStepState(state, index)
                    return <li key={step} className={`is-${stepState}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong><b>{copy.stepStates[stepState]}</b></li>
                  })}
                </ol>

                <div className="travel-workflow-action" aria-live="polite">
                  {state.status === 'idle' ? <button type="button" className="btn-light" onClick={runSample}>{copy.start} v{booking.version}</button> : null}
                  {state.status === 'approval' ? <div><p>{copy.prepared} {state.requestSnapshot?.startTime} · v{state.requestSnapshot?.version}</p><button type="button" className="btn-light mt-4" onClick={approve}>{copy.approve}</button></div> : null}
                  {state.status === 'waiting' ? <p>{copy.waiting} {state.requestSnapshot?.startTime} · v{state.requestSnapshot?.version}</p> : null}
                  {state.status === 'response' ? <div><p><strong>{copy.responseWarning}</strong></p><div className="mt-4 flex flex-wrap gap-3"><button type="button" className="btn-light" onClick={() => dispatch({ type: 'VERIFY_BEGIN' })}>{copy.verify}</button><button type="button" className="min-h-12 rounded-full border border-white/30 px-5 text-sm" onClick={() => dispatch({ type: 'SIMULATE_SOURCE_CONFLICT' })}>{copy.conflict}</button></div></div> : null}
                  {state.status === 'verifying' || state.status === 'verified' ? <div><div className="flex items-center justify-between gap-3"><p className="font-semibold">{state.status === 'verifying' ? copy.verifying : `${copy.verified} · ${booking.startTime} · v${booking.version}`}</p><span className="font-mono text-[10px] text-white/40">{copy.snapshot}</span></div><ul className="mt-4 grid gap-2 sm:grid-cols-2">{verificationChecks.map(([check, passed]) => <li key={check} className="flex items-center gap-2 text-sm text-white/65"><span className={passed ? 'text-gold-300' : 'text-red-400'}>{passed ? '✓' : '!'}</span>{check}</li>)}</ul>{state.status === 'verified' ? <div className="mt-5 border-t border-white/15 pt-5"><p className="text-xs leading-6 text-white/45">{copy.scope}</p>{booking.version === 3 ? <button type="button" className="btn-light mt-4" onClick={() => { dispatch({ type: 'CHANGE_BOOKING_TIME' }); trackTravelEvent('sample_demo_reconfirmation') }}>{copy.changeTime}</button> : <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-gold-300">{copy.loopComplete}</p>}</div> : null}</div> : null}
                  {state.status === 'reconfirmation' ? <div className="travel-reconfirmation-card"><p className="travel-micro-label !text-navy-950">{copy.bookingChanged}</p><p className="mt-3 text-lg font-semibold"><s>09:00 · v3</s> → 10:30 · v4</p><p className="mt-3 font-semibold">{copy.priorInvalid}</p><button type="button" className="btn-primary mt-4" onClick={() => dispatch({ type: 'PREPARE_RECONFIRMATION' })}>{copy.prepareReconfirmation}</button></div> : null}
                  {state.status === 'noReply' ? <div><p>{copy.noReply}</p><button type="button" className="btn-light mt-4" onClick={() => { focusGuideActionRef.current = true; dispatch({ type: 'SIMULATE_FOLLOW_UP' }) }}>{copy.followUp}</button></div> : null}
                  {state.status === 'cannot' || state.status === 'help' || state.status === 'conflict' ? <div className="travel-handoff-card"><p className="font-semibold">{copy.handoff}</p><p className="mt-3 text-sm text-white/60">{demoReason(state, locale)}</p></div> : null}
                </div>

                <RoleSwitch state={state} dispatch={dispatch} locale={locale} copy={copy} idPrefix="demo-role" guideConfirmRef={guideConfirmRef} compact />
              </div>
            </div>
          </div>

          <div className="travel-before-after mt-7 grid gap-5 md:grid-cols-2"><div><p>{copy.before[0]}</p><strong>{copy.before[1]}</strong></div><div><p>{copy.after[0]}</p><strong>{copy.after[1]}</strong></div></div>
        </div>
      </section>

      {between}

      <section id="role-view" className="travel-role-section scroll-mt-24">
        <div className="container-luxe">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"><div><SectionLabel index="03" inverse>{copy.roleLabel}</SectionLabel><h2 className="section-title mt-7 !text-white">{copy.roleTitle}</h2></div><p className="body-lead max-w-xl !text-white/55 lg:justify-self-end">{copy.roleBody}</p></div>
          <div className="mt-10"><RoleSwitch state={state} dispatch={dispatch} locale={locale} copy={copy} idPrefix="explainer-role" /></div>
        </div>
      </section>
    </>
  )
}

export function TravelScenarioCards({ locale }: { locale: Locale }) {
  const copy = travelGlobalContent[locale].scenarios

  return (
    <div className="travel-scenario-grid grid lg:grid-cols-3">
      {copy.cards.map((scenario, index) => (
        <article key={scenario.id} className="travel-scenario-card group flex min-h-80 flex-col text-white">
          <Image src={scenario.image} alt={scenario.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="travel-scenario-card__image" />
          <div className="travel-scenario-card__content">
            <div className="flex items-center justify-between"><span className="font-mono text-[11px] text-gold-300">{copy.badge} · {String(index + 1).padStart(2, '0')}</span><span className="h-2 w-2 rounded-full bg-gold-500" aria-hidden="true" /></div>
            <h3>{scenario.title}</h3>
            <p>{scenario.body}</p>
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent('gappy:travel-scenario', { detail: { scenario: scenario.id } }))}>{scenario.action} <span aria-hidden="true">→</span></button>
          </div>
        </article>
      ))}
    </div>
  )
}
