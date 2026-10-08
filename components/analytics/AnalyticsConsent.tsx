'use client'

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { clearAnalyticsCookies, CONSENT_KEY, consentDecision, type ConsentDecision } from '@/lib/analytics-consent'
import './analytics-consent.css'

const ConsentContext = createContext({ available: false, open: () => {} })

export function PrivacySettings({ locale }: { locale: 'en' | 'ja' }) {
  const { available, open } = useContext(ConsentContext)
  return <span className="gappy-privacy-links">
    <a href={locale === 'ja' ? '/ja/privacy' : '/privacy'}>{locale === 'ja' ? 'プライバシーについて' : 'Privacy'}</a>
    {available && <button type="button" onClick={open}>{locale === 'ja' ? 'プライバシー設定' : 'Privacy settings'}</button>}
  </span>
}

export default function AnalyticsConsent({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const pathname = usePathname()
  const ja = pathname.startsWith('/ja/')
  const [visible, setVisible] = useState(false)
  const [decision, setDecision] = useState<ConsentDecision | null>(null)
  const [storageFailed, setStorageFailed] = useState(false)
  const panel = useRef<HTMLElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const focusRequested = useRef(false)

  useEffect(() => {
    if (!enabled) return
    const restore = () => {
      let saved: ConsentDecision | null = null
      try { saved = consentDecision(localStorage.getItem(CONSENT_KEY)) } catch { /* no implicit grant */ }
      window.gappyAnalyticsConsent = saved || 'denied'
      window.dispatchEvent(new Event('gappy:analytics-consent'))
      if (saved !== 'granted') clearAnalyticsCookies(document, location.hostname, location.pathname)
      setDecision(saved)
      setVisible(saved === null)
    }
    restore()
    const sync = (event: StorageEvent) => { if (event.key === CONSENT_KEY || event.key === null) restore() }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [enabled])

  useEffect(() => {
    if (visible && focusRequested.current) { panel.current?.focus(); focusRequested.current = false }
  }, [visible])

  const choose = (value: ConsentDecision) => {
    // Synchronous signal first: even an immediate following click must be denied.
    window.gappyAnalyticsConsent = value
    window.dispatchEvent(new Event('gappy:analytics-consent'))
    if (value === 'denied') clearAnalyticsCookies(document, location.hostname, location.pathname)
    let failed = false
    try { localStorage.setItem(CONSENT_KEY, value) } catch { failed = true }
    setStorageFailed(failed)
    setDecision(value)
    setVisible(false)
    returnFocus.current?.focus()
    returnFocus.current = null
  }

  return <ConsentContext.Provider value={{ available: enabled, open: () => {
    returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    focusRequested.current = true
    setVisible(true)
  } }}>
    {children}
    {enabled && visible && <section ref={panel} tabIndex={-1} className="gappy-consent" aria-label={ja ? 'アクセス解析のプライバシー設定' : 'Analytics privacy settings'}>
      <div>
        <p>{ja ? 'サイト改善のため、同意いただいた場合のみアクセス解析を使用します。広告目的の計測は行いません。' : 'We use optional analytics to understand site usage and improve Gappy. Analytics loads only after you agree. We do not use advertising measurement.'}</p>
        {decision && <p className="gappy-consent-current">{ja ? '現在の選択：' : 'Current choice: '}{decision === 'granted' ? (ja ? '許可' : 'Allowed') : (ja ? '拒否' : 'Declined')}</p>}
        <a href={ja ? '/ja/privacy' : '/privacy'}>{ja ? 'プライバシーについて' : 'Privacy'}</a>
      </div>
      <div className="gappy-consent-actions">
        <button type="button" onClick={() => choose('granted')}>{ja ? '許可する' : 'Allow analytics'}</button>
        <button type="button" onClick={() => choose('denied')}>{ja ? '拒否する' : 'Decline'}</button>
      </div>
    </section>}
    {enabled && storageFailed && <p className="gappy-consent-storage" role="status">{ja ? '選択を保存できませんでした。このページでのみ適用されます。' : 'Your choice could not be saved. It applies to this page only.'}</p>}
  </ConsentContext.Provider>
}
