'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DEMO_URL } from '@/content/home-v2'
import { CONTACT_EMAIL, GOODTIME_URL } from '@/lib/config'
import { eligibleBrowser, pageParameters, trackedLink } from '@/lib/site-analytics'

type Consent = 'granted' | 'denied'
const denied = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }
declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    // Integration point for an approved CMP. No banner or implicit consent here.
    gappyAnalyticsConsent?: Consent
  }
}

export default function SiteAnalytics({ enabled, measurementId }: { enabled: boolean; measurementId: string }) {
  const pathname = usePathname()
  const [consented, setConsented] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const initialized = useRef(false)
  const lastPage = useRef('')
  const originalReferrer = useRef('')
  const seenSections = useRef(new Set<string>())

  useEffect(() => {
    if (!enabled) return
    // QA opt-out survives hard locale navigation; no visitor ID is stored.
    try {
      if (new URL(window.location.href).searchParams.has('analytics_qa')) sessionStorage.setItem('gappy-analytics-qa', '1')
    } catch { return }
    originalReferrer.current = document.referrer
    const update = () => {
      const allowed = window.gappyAnalyticsConsent === 'granted'
      ;(window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = !allowed
      // Revocation must stop the already-loaded library, not merely unmount React.
      if (!allowed) {
        try { window.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }) } catch { /* navigation unaffected */ }
      }
      setConsented(allowed)
    }
    update()
    window.addEventListener('gappy:analytics-consent', update)
    return () => window.removeEventListener('gappy:analytics-consent', update)
  }, [enabled, measurementId])

  const permitted = useCallback(() => {
    try {
      return enabled && window.gappyAnalyticsConsent === 'granted' && eligibleBrowser(
        window.location.href, navigator.webdriver,
        sessionStorage.getItem('gappy-analytics-qa') === '1' || navigator.doNotTrack === '1',
      )
    } catch { return false }
  }, [enabled])

  useEffect(() => {
    if (enabled) (window as unknown as Record<string, unknown>)[`ga-disable-${measurementId}`] = !permitted()
    if (!consented || !permitted()) return
    const parameters = pageParameters(window.location.href, originalReferrer.current)
    if (!parameters) return
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || ((...args: unknown[]) => { window.dataLayer?.push(args) })
    try {
      if (!initialized.current) {
        window.gtag('consent', 'default', denied)
        window.gtag('js', new Date())
        initialized.current = true
      }
      window.gtag('consent', 'update', { ...denied, analytics_storage: 'granted' })
      window.gtag('set', { ...parameters, allow_google_signals: false, allow_ad_personalization_signals: false, ads_data_redaction: true, url_passthrough: false })
      window.gtag('config', measurementId, { ...parameters, send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false })
      if (lastPage.current !== pathname) {
        window.gtag('event', 'page_view', { ...parameters, send_to: measurementId })
        lastPage.current = pathname
      }
      setLoaded(true)
    } catch { /* analytics never affects the page */ }
  }, [consented, pathname, measurementId, permitted, enabled])

  useEffect(() => {
    if (!loaded) return
    const click = (event: MouseEvent) => {
      if (event.type === 'auxclick' && event.button !== 1) return
      try {
        if (!permitted()) return
        const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null
        if (!anchor) return
        const parameters = pageParameters(window.location.href, originalReferrer.current)
        if (!parameters) return
        const tracked = trackedLink(anchor, parameters.locale === 'ja' ? 'ja' : 'en', DEMO_URL, GOODTIME_URL, `mailto:${CONTACT_EMAIL}`)
        if (tracked) window.gtag?.('event', tracked.name, { ...parameters, ...tracked.parameters, send_to: measurementId })
      } catch { /* Never preventDefault, await delivery, or change the destination. */ }
    }
    document.addEventListener('click', click, true)
    document.addEventListener('auxclick', click, true)
    return () => {
      document.removeEventListener('click', click, true)
      document.removeEventListener('auxclick', click, true)
    }
  }, [loaded, measurementId, permitted])

  useEffect(() => {
    if (!loaded || !consented || !permitted() || typeof IntersectionObserver === 'undefined') return
    // Observe chapter headings, not tall sticky sections that can never be 50% visible.
    const targets = new Map<Element, string>()
    for (const [selector, id] of [
      ['#product-proof h2', 'product_proof'], ['#workflow h2', 'workflow'],
      ['#verification h2', 'verification'], ['#recovery h2', 'recovery'],
      ['#context h2', 'context'], ['.hv-final h2', 'final_cta'],
    ]) {
      const element = document.querySelector(selector)
      if (element) targets.set(element, id)
    }
    const observer = new IntersectionObserver(entries => {
      if (!permitted()) return
      const parameters = pageParameters(window.location.href, originalReferrer.current)
      if (!parameters) return
      for (const entry of entries) {
        const id = targets.get(entry.target)
        if (!id || !entry.isIntersecting || entry.intersectionRatio < 0.5 || seenSections.current.has(id)) continue
        seenSections.current.add(id)
        try { window.gtag?.('event', 'section_view', { ...parameters, section_id: id, send_to: measurementId }) } catch { /* non-blocking */ }
      }
    }, { threshold: 0.5 })
    targets.forEach((_, target) => observer.observe(target))
    return () => observer.disconnect()
  }, [loaded, consented, pathname, permitted, measurementId])

  if (!enabled || !loaded || !consented || !permitted()) return null
  return <Script id="gappy-ga4" src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" onError={() => setLoaded(false)} />
}
