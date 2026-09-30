export type ConsentDecision = 'granted' | 'denied'
export const CONSENT_KEY = 'gappy_analytics_consent_v1'
export function consentDecision(value: unknown): ConsentDecision | null {
  return value === 'granted' || value === 'denied' ? value : null
}

// Only accessible first-party GA cookies; never unrelated cookies or remote data.
export function clearAnalyticsCookies(doc: Pick<Document, 'cookie'>, hostname: string, pathname: string) {
  try {
    const names = doc.cookie.split(';').map(c => c.trim().split('=')[0]).filter(n => /^_ga(?:_[A-Za-z0-9_]+)?$/.test(n))
    const domains = ['', hostname, `.${hostname}`]
    if (hostname.endsWith('.gappy.jp')) domains.push('gappy.jp', '.gappy.jp')
    const parts = pathname.split('/').filter(Boolean)
    const paths = new Set(['/'])
    for (let i = 1; i <= parts.length; i++) {
      const path = '/' + parts.slice(0, i).join('/')
      paths.add(path); paths.add(path + '/')
    }
    for (const name of names) for (const domain of domains) for (const path of paths) {
      try { doc.cookie = `${name}=; Max-Age=0; Path=${path};${domain ? ` Domain=${domain};` : ''} SameSite=Lax; Secure` } catch { /* best effort */ }
    }
  } catch { /* Cookie restrictions must not break the site. */ }
}
