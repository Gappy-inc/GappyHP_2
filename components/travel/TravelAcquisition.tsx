'use client'

import {
  createContext,
  type FormEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import Image from 'next/image'
import { GOODTIME_URL } from '@/lib/config'
import { trackTravelEvent } from '@/components/travel/TravelInteractions'

type EntryLocation = 'hero' | 'sticky' | 'video' | 'final'
type LeadStatus = 'idle' | 'invalid' | 'submitting' | 'accepted' | 'error' | 'unavailable'
type Availability = 'checking' | 'available' | 'unavailable'

type AcquisitionContextValue = {
  email: string
  setEmail: (value: string) => void
  status: LeadStatus
  message: string
  availability: Availability
  privacyNoticeUrl: string | null
  submit: (entryLocation: EntryLocation) => Promise<void>
  openGate: (entryLocation: EntryLocation, trigger?: HTMLElement | null) => void
  openVideo: (trigger?: HTMLElement | null) => void
  setHeroNode: (node: HTMLElement | null) => void
  setFinalNode: (node: HTMLElement | null) => void
}

const AcquisitionContext = createContext<AcquisitionContextValue | null>(null)
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DELIVERABLE_EVENTS = new Set([
  'travel_lp_view',
  'sample_demo_start',
  'video_progress_25',
  'video_progress_50',
  'video_progress_75',
  'video_complete',
  'lead_capture_success',
  'booking_cta_click',
])
const TRAVEL_SESSION_KEY = 'gappy-travel-session-v1'

function getTravelSessionId() {
  const existing = window.sessionStorage.getItem(TRAVEL_SESSION_KEY)
  if (existing) return existing
  const created = window.crypto.randomUUID()
  window.sessionStorage.setItem(TRAVEL_SESSION_KEY, created)
  return created
}

function useAcquisition() {
  const value = useContext(AcquisitionContext)
  if (!value) throw new Error('Travel acquisition components require TravelAcquisitionProvider')
  return value
}

export function BookDemoLink({
  entryLocation,
  className,
  children = 'Book a demo',
}: {
  entryLocation: EntryLocation
  className?: string
  children?: ReactNode
}) {
  return (
    <a
      href={GOODTIME_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackTravelEvent('booking_cta_click', { entryLocation })}
    >
      {children}
    </a>
  )
}

function AccessPurpose() {
  const { privacyNoticeUrl } = useAcquisition()
  return (
    <p className="text-xs leading-5 text-ink-500">
      We use your email only to provide this requested demo access. Marketing updates are not included.{' '}
      <a
        href={privacyNoticeUrl || 'mailto:mitsuki@gappy.jp?subject=Privacy%20question'}
        className="underline decoration-gold-500 underline-offset-4"
      >
        {privacyNoticeUrl ? 'Privacy notice' : 'Privacy questions'}
      </a>
    </p>
  )
}

export function LeadAccessForm({
  entryLocation,
  inputId,
  dark = false,
  compact = false,
}: {
  entryLocation: EntryLocation
  inputId: string
  dark?: boolean
  compact?: boolean
}) {
  const {
    email,
    setEmail,
    status,
    message,
    availability,
    submit,
    openVideo,
  } = useAcquisition()

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submit(entryLocation)
  }

  if (status === 'accepted') {
    return (
      <div className={`flex ${compact ? 'items-center gap-3' : 'flex-col items-start gap-3'}`}>
        <p className={`text-sm font-medium ${dark ? 'text-white' : 'text-navy-900'}`}>
          Access saved for this page session.
        </p>
        <button type="button" className={dark ? 'btn-light' : 'btn-primary'} onClick={(event) => openVideo(event.currentTarget)}>
          Continue watching
        </button>
      </div>
    )
  }

  if (availability === 'unavailable' || status === 'unavailable') {
    return (
      <div className={compact ? 'flex min-w-0 flex-1 items-center gap-3' : 'space-y-3'}>
        <p className={`${compact ? 'min-w-0 flex-1 text-xs leading-5' : 'text-sm leading-6'} ${dark ? 'text-white/65' : 'text-ink-500'}`}>
          Email registration is not connected in this Preview. No email has been collected.
        </p>
        <button type="button" className={`${dark ? 'btn-light' : 'btn-secondary'} shrink-0`} onClick={(event) => openVideo(event.currentTarget)}>
          Watch prototype walkthrough
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className={compact ? 'flex min-w-0 flex-1 items-end gap-2' : 'space-y-3'} noValidate>
      <div className={compact ? 'min-w-0 flex-1' : undefined}>
        <label htmlFor={inputId} className={`mb-2 block font-mono text-[10px] uppercase tracking-[0.12em] ${dark ? 'text-white/55' : 'text-ink-500'}`}>
          Work email
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          disabled={availability === 'checking' || status === 'submitting'}
          onChange={(event) => setEmail(event.target.value)}
          aria-describedby={`${inputId}-message`}
          className={`min-h-12 w-full border px-4 text-base outline-none focus:border-gold-500 disabled:cursor-wait disabled:opacity-60 ${dark ? 'border-white/30 bg-white text-navy-900' : 'border-navy-900/30 bg-white text-navy-900'}`}
          placeholder="you@company.com"
        />
      </div>
      <button
        type="submit"
        disabled={availability === 'checking' || status === 'submitting'}
        className={`${dark ? 'btn-light' : 'btn-primary'} shrink-0 disabled:cursor-wait disabled:opacity-60`}
      >
        {status === 'submitting' ? 'Saving…' : availability === 'checking' ? 'Checking…' : 'Watch demo'}
      </button>
      {!compact ? <AccessPurpose /> : null}
      <p
        id={`${inputId}-message`}
        aria-live="polite"
        className={`text-xs ${status === 'invalid' || status === 'error' ? 'text-red-700' : dark ? 'text-white/60' : 'text-ink-500'} ${compact && !message ? 'sr-only' : ''}`}
      >
        {message || 'Access opens only after the request is saved.'}
      </p>
    </form>
  )
}

export function HeroConversion() {
  const { setHeroNode } = useAcquisition()

  return (
    <div ref={setHeroNode} className="travel-hero-conversion mt-8 grid gap-5 pt-7" data-acquisition-form="hero">
      <div className="flex flex-wrap items-center gap-3">
        <BookDemoLink entryLocation="hero" className="btn-primary">Book a demo <span aria-hidden="true">↗</span></BookDemoLink>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">No registration required</span>
      </div>
      <div className="travel-hero-access border border-white/15 bg-white/5 p-4 sm:p-5">
        <p className="mb-4 text-sm font-semibold text-white">Watch the 60-second prototype walkthrough</p>
        <LeadAccessForm entryLocation="hero" inputId="travel-demo-email-hero" dark />
      </div>
    </div>
  )
}

export function VideoWalkthrough() {
  const { status, availability, openGate, openVideo } = useAcquisition()
  const canOpen = status === 'accepted' || availability === 'unavailable'

  return (
    <div className="travel-video-card overflow-hidden border border-navy-900 bg-navy-950 text-white">
      <button
        type="button"
        className="group relative block aspect-video w-full overflow-hidden text-left"
        onClick={(event) => {
          if (canOpen) openVideo(event.currentTarget)
          else openGate('video', event.currentTarget)
        }}
        aria-label={canOpen ? 'Play the prototype walkthrough' : 'Request access to the prototype walkthrough'}
      >
        <Image
          src="/travel-demo-poster-v4.jpg"
          alt="Prototype workflow showing a guide confirmation moving from response received to verified"
          width={1600}
          height={900}
          className="h-full w-full object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" aria-hidden="true" />
        <span className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4">
          <span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold-300">Prototype walkthrough · Sample data</span>
            <span className="mt-2 block text-2xl font-semibold">From instruction to verified confirmation</span>
          </span>
          <span className="grid h-14 w-14 place-items-center border border-white bg-white text-xl text-navy-900 transition group-hover:bg-gold-500" aria-hidden="true">▶</span>
        </span>
      </button>
      <div className="travel-video-card__footer grid gap-5 border-t border-white/15 p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
        <div>
          <p className="text-sm leading-7 text-white/65">See the operations view, guide response, current-booking verification, and shared role views for the same booking.</p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-white/40">Interactive prototype · No real bookings or messages</p>
        </div>
        <button
          type="button"
          className="btn-light"
          onClick={(event) => {
            if (canOpen) openVideo(event.currentTarget)
            else openGate('video', event.currentTarget)
          }}
        >
          {canOpen ? 'Watch walkthrough' : 'Get video access'}
        </button>
      </div>
    </div>
  )
}

export function FinalConversion() {
  const { setFinalNode } = useAcquisition()

  return (
    <div ref={setFinalNode} className="travel-final-grid grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center" data-acquisition-form="final">
      <div>
        <p className="eyebrow text-gold-700">Two ways to continue</p>
        <h2 className="section-title mt-6">See how this fits your operation.</h2>
        <p className="body-lead mt-6">Book a working session directly, or watch the prototype walkthrough first.</p>
        <BookDemoLink entryLocation="final" className="btn-primary mt-8">Book a demo</BookDemoLink>
      </div>
      <div className="travel-final-form border border-navy-900/20 bg-white p-5 md:p-8">
        <p className="mb-5 text-lg font-semibold">Get access to the full walkthrough</p>
        <LeadAccessForm entryLocation="final" inputId="travel-demo-email-final" />
      </div>
    </div>
  )
}

function GateDialog({
  open,
  entryLocation,
  onClose,
}: {
  open: boolean
  entryLocation: EntryLocation
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="travel-gate-dialog m-0 mt-auto max-h-[88dvh] w-full max-w-none border-0 bg-white p-0 text-navy-900 backdrop:bg-black/65 lg:m-auto lg:max-w-xl lg:border lg:border-navy-900"
      aria-labelledby="travel-access-dialog-title"
    >
      <div className="p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:p-7">
        <div className="flex items-start justify-between gap-5 border-b border-navy-900/15 pb-5">
          <div>
            <p className="eyebrow text-gold-700">60-second walkthrough</p>
            <h2 id="travel-access-dialog-title" className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Watch the full prototype demo</h2>
          </div>
          <button type="button" className="grid h-11 w-11 shrink-0 place-items-center border border-navy-900 text-xl" onClick={() => dialogRef.current?.close()} aria-label="Close demo access form">×</button>
        </div>
        <div className="mt-6">
          <LeadAccessForm entryLocation={entryLocation} inputId="travel-demo-email-dialog" />
        </div>
      </div>
    </dialog>
  )
}

function VideoDialog({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressEvents = useRef(new Set<number>())

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const onTimeUpdate = () => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const percentage = Math.floor((video.currentTime / video.duration) * 100)
    for (const threshold of [25, 50, 75]) {
      if (percentage < threshold || progressEvents.current.has(threshold)) continue
      progressEvents.current.add(threshold)
      trackTravelEvent(`video_progress_${threshold}` as 'video_progress_25' | 'video_progress_50' | 'video_progress_75', { progress: threshold })
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => {
        videoRef.current?.pause()
        onClose()
      }}
      className="travel-video-dialog m-auto max-h-[92dvh] w-[min(96vw,72rem)] overflow-y-auto border border-navy-900 bg-navy-950 p-0 text-white backdrop:bg-black/75"
      aria-labelledby="travel-video-dialog-title"
    >
      <div className="flex items-start justify-between gap-5 border-b border-white/15 p-4 sm:p-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gold-300">Prototype walkthrough · Sample data · No messages sent</p>
          <h2 id="travel-video-dialog-title" className="mt-2 text-xl font-semibold">Guide confirmation, verified against the latest booking</h2>
        </div>
        <button type="button" className="grid h-11 w-11 shrink-0 place-items-center border border-white/40 text-xl" onClick={() => dialogRef.current?.close()} aria-label="Close video">×</button>
      </div>
      <video
        ref={videoRef}
        controls
        preload="metadata"
        poster="/travel-demo-poster-v4.jpg"
        className="aspect-video w-full bg-black"
        onPlay={() => trackTravelEvent('video_play')}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => trackTravelEvent('video_complete', { progress: 100 })}
      >
        <source src="/travel-demo-v3.mp4" type="video/mp4" />
        <track kind="captions" src="/travel-demo-en.vtt" srcLang="en" label="English" default />
        Your browser does not support HTML video.
      </video>
      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-start">
        <details>
          <summary className="cursor-pointer text-sm font-semibold">Read transcript</summary>
          <div className="mt-4 space-y-3 text-sm leading-7 text-white/65">
            <p>Tomorrow&apos;s tours are booked. But is the assigned guide confirmed for the current booking?</p>
            <p>The sample instruction surfaces booking #2871 and prepares a request for 09:00, version 3.</p>
            <p>The operations team explicitly approves the simulated request. The guide confirms 09:00 on a simple operator-branded page.</p>
            <p>Response received does not mean verified. Gappy compares the reply with the current booking before verifying version 3.</p>
            <p>The booking then changes from 09:00 to 10:30. Version 3 is invalidated, version 4 requires a new guide reply, and work stays open until the current confirmation is verified.</p>
          </div>
        </details>
        <BookDemoLink entryLocation="video" className="btn-light">Book a demo</BookDemoLink>
      </div>
    </dialog>
  )
}

function StickyDock({
  visible,
  onDismiss,
  onFocusChange,
}: {
  visible: boolean
  onDismiss: () => void
  onFocusChange: (focused: boolean) => void
}) {
  const { status, openGate, openVideo } = useAcquisition()

  if (!visible) return null

  return (
    <>
      <div data-mobile-dock className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] lg:hidden">
        <div className="travel-mobile-dock grid grid-cols-2 gap-2 border border-navy-900 bg-white p-2 shadow-[0_-8px_30px_rgba(16,18,16,0.12)]">
          <button type="button" className="travel-mobile-dock__dismiss" onClick={onDismiss} aria-label="Dismiss conversion bar">×</button>
          <BookDemoLink entryLocation="sticky" className="btn-primary min-h-12 px-3">Book a demo</BookDemoLink>
          <button
            type="button"
            className="btn-secondary min-h-12 px-3"
            onClick={(event) => status === 'accepted' ? openVideo(event.currentTarget) : openGate('sticky', event.currentTarget)}
          >
            {status === 'accepted' ? 'Continue video' : 'Watch demo'}
          </button>
        </div>
      </div>

      <div data-desktop-dock className="fixed inset-x-0 bottom-5 z-40 hidden px-5 lg:block">
        <div
          className="travel-desktop-dock mx-auto flex max-w-[82rem] items-center gap-3 border border-navy-900 bg-navy-950 px-4 py-4 text-white"
          onFocusCapture={() => onFocusChange(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onFocusChange(false)
          }}
        >
          <p className="max-w-[12rem] shrink-0 text-xs font-semibold leading-4">See Gappy handle one real-world workflow</p>
          <LeadAccessForm entryLocation="sticky" inputId="travel-demo-email-sticky" dark compact />
          <span className="h-12 w-px shrink-0 bg-white/20" aria-hidden="true" />
          <BookDemoLink entryLocation="sticky" className="btn-light shrink-0">Book a demo</BookDemoLink>
          <button type="button" className="grid h-12 w-12 shrink-0 place-items-center border border-white/25 text-lg" onClick={onDismiss} aria-label="Dismiss conversion bar">×</button>
        </div>
      </div>
    </>
  )
}

export function TravelAcquisitionProvider({ children }: { children: ReactNode }) {
  const [email, setEmailValue] = useState('')
  const [status, setStatus] = useState<LeadStatus>('idle')
  const [message, setMessage] = useState('')
  const [availability, setAvailability] = useState<Availability>('checking')
  const [heroNode, setHeroNode] = useState<HTMLElement | null>(null)
  const [finalNode, setFinalNode] = useState<HTMLElement | null>(null)
  const [heroPassed, setHeroPassed] = useState(false)
  const [finalVisible, setFinalVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [dockFocused, setDockFocused] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)
  const [gateEntryLocation, setGateEntryLocation] = useState<EntryLocation>('sticky')
  const [videoOpen, setVideoOpen] = useState(false)
  const [privacyNoticeUrl, setPrivacyNoticeUrl] = useState<string | null>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const deliver = (event: Event) => {
      const detail = (event as CustomEvent<{
        name?: string
        entryLocation?: string
        progress?: number
      }>).detail
      if (!detail?.name || !DELIVERABLE_EVENTS.has(detail.name)) return
      const payload = {
        eventId: window.crypto.randomUUID(),
        eventName: detail.name,
        sessionId: getTravelSessionId(),
        ...(detail.entryLocation ? { entryLocation: detail.entryLocation } : {}),
        ...(detail.progress ? { progress: detail.progress } : {}),
      }
      void fetch('/api/travel/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // Measurement is isolated from the conversion UI and fails closed.
      })
    }
    window.addEventListener('gappy:travel-lp-event', deliver)
    return () => window.removeEventListener('gappy:travel-lp-event', deliver)
  }, [])

  useEffect(() => {
    trackTravelEvent('travel_lp_view')
    let active = true
    fetch('/api/travel/demo-access', { cache: 'no-store' })
      .then((response) => response.json())
      .then((result: { available?: boolean; privacyNoticeUrl?: string | null }) => {
        if (!active) return
        setAvailability(result.available ? 'available' : 'unavailable')
        setPrivacyNoticeUrl(result.available ? result.privacyNoticeUrl || null : null)
        if (!result.available) setStatus('unavailable')
      })
      .catch(() => {
        if (!active) return
        setAvailability('unavailable')
        setStatus('unavailable')
      })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!heroNode || !finalNode) return

    let frame = 0
    const updateDockVisibility = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const heroRect = heroNode.getBoundingClientRect()
        const finalRect = finalNode.getBoundingClientRect()
        setHeroPassed(heroRect.bottom < 0)
        setFinalVisible(finalRect.top < window.innerHeight * 0.85 && finalRect.bottom > 0)
      })
    }

    updateDockVisibility()
    window.addEventListener('scroll', updateDockVisibility, { passive: true })
    window.addEventListener('resize', updateDockVisibility)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', updateDockVisibility)
      window.removeEventListener('resize', updateDockVisibility)
    }
  }, [heroNode, finalNode])

  const restoreFocus = useCallback(() => {
    const element = returnFocusRef.current
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => element?.focus())
    })
  }, [])

  const openVideo = useCallback((trigger?: HTMLElement | null) => {
    returnFocusRef.current = trigger || document.activeElement as HTMLElement | null
    setGateOpen(false)
    setVideoOpen(true)
  }, [])

  const openGate = useCallback((entryLocation: EntryLocation, trigger?: HTMLElement | null) => {
    returnFocusRef.current = trigger || document.activeElement as HTMLElement | null
    setGateEntryLocation(entryLocation)
    trackTravelEvent('demo_gate_view', { entryLocation })
    if (status === 'accepted') {
      setVideoOpen(true)
      return
    }
    setGateOpen(true)
  }, [status])

  const submit = useCallback(async (entryLocation: EntryLocation) => {
    if (availability !== 'available') {
      setStatus('unavailable')
      setMessage('Email registration is not connected in this Preview. No email was collected.')
      return
    }

    const candidate = email.trim()
    if (!candidate || candidate.length > 254 || !EMAIL_PATTERN.test(candidate)) {
      setStatus('invalid')
      setMessage('Enter a valid email address.')
      return
    }

    setStatus('submitting')
    setMessage('Saving your access request…')
    trackTravelEvent('email_submit_attempt', { entryLocation })

    try {
      const response = await fetch('/api/travel/demo-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: candidate,
          asset: 'travel-workflow-demo-v3',
          entryLocation,
        }),
      })
      const result = await response.json() as { status?: string; message?: string }

      if (response.status === 202 && result.status === 'accepted') {
        setStatus('accepted')
        setMessage('Your request was saved. This does not mean an email was verified or delivered.')
        trackTravelEvent('lead_capture_success', { entryLocation })
        setGateOpen(false)
        setVideoOpen(true)
        return
      }

      if (response.status === 503 || result.status === 'unavailable') {
        setAvailability('unavailable')
        setStatus('unavailable')
      } else {
        setStatus(response.status === 400 ? 'invalid' : 'error')
      }
      setMessage(result.message || 'We could not save your request. Please try again or book a demo.')
      trackTravelEvent('lead_capture_error', { entryLocation })
    } catch {
      setStatus('error')
      setMessage('The access service is temporarily unavailable. Please try again or book a demo.')
      trackTravelEvent('lead_capture_error', { entryLocation })
    }
  }, [availability, email])

  const setEmail = useCallback((value: string) => {
    setEmailValue(value)
    if (status === 'invalid' || status === 'error') {
      setStatus('idle')
      setMessage('')
    }
  }, [status])

  const value = useMemo<AcquisitionContextValue>(() => ({
    email,
    setEmail,
    status,
    message,
    availability,
    privacyNoticeUrl,
    submit,
    openGate,
    openVideo,
    setHeroNode,
    setFinalNode,
  }), [email, setEmail, status, message, availability, privacyNoticeUrl, submit, openGate, openVideo])

  const dockVisible = heroPassed
    && !dismissed
    && !gateOpen
    && !videoOpen
    && (!finalVisible || dockFocused)

  return (
    <AcquisitionContext.Provider value={value}>
      <div className="travel-theme">
        {children}
        {dockVisible ? <div className="h-24 lg:h-0" aria-hidden="true" /> : null}
        <StickyDock visible={dockVisible} onDismiss={() => setDismissed(true)} onFocusChange={setDockFocused} />
        <GateDialog
          open={gateOpen}
          entryLocation={gateEntryLocation}
          onClose={() => {
            setGateOpen(false)
            restoreFocus()
          }}
        />
        <VideoDialog
          open={videoOpen}
          onClose={() => {
            setVideoOpen(false)
            restoreFocus()
          }}
        />
      </div>
    </AcquisitionContext.Provider>
  )
}
