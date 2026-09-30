// No browser storage, identity, raw form values or arbitrary campaign values.
export const PUBLIC_PATHS = ['/', '/technology', '/travel', '/cases', '/resources', '/about', '/careers', '/contact'] as const
export type AnalyticsLocale = 'en' | 'ja'
export type AnalyticsEvent = { name: 'cta_click' | 'language_switch'; parameters: Record<string, string> }

export function publicPath(path: string): boolean {
  const base = path === '/ja/' ? '/' : path.replace(/^\/ja(?=\/)/, '')
  return (PUBLIC_PATHS as readonly string[]).includes(base)
}

export function analyticsEnabled(environment: string | undefined, id: string | undefined, reviewed: string | undefined): boolean {
  return environment === 'production' && /^G-[A-Z0-9]{4,20}$/.test(id || '') && reviewed === 'true'
}

export function eligibleBrowser(url: string, automated: boolean, optedOut: boolean): boolean {
  try {
    const u = new URL(url)
    return u.origin === 'https://gappy.jp' && publicPath(u.pathname)
      && !automated && !optedOut && !u.searchParams.has('analytics_qa')
  } catch { return false }
}

// Fixed values, not just key names: even utm_campaign=email@example.test is dropped.
const campaigns: Record<string, readonly string[]> = {
  utm_source: ['chatgpt.com', 'chatgpt', 'google', 'bing', 'linkedin'],
  utm_medium: ['referral', 'organic', 'social'],
  utm_campaign: ['gappy-lp', 'lp-launch', 'travel-lp'],
}

export function pageParameters(href: string, referrer: string) {
  const url = new URL(href)
  if (url.origin !== 'https://gappy.jp' || !publicPath(url.pathname)) return null
  const locale: AnalyticsLocale = url.pathname.startsWith('/ja/') ? 'ja' : 'en'
  let source = ''
  try {
    const ref = new URL(referrer)
    // Keep only origin; never conversation IDs, query, credentials, or fragments.
    const hosts = ['gappy.jp', 'chatgpt.com', 'chat.openai.com', 'www.google.com', 'www.google.co.jp', 'www.bing.com', 'www.linkedin.com', 'linkedin.com', 'perplexity.ai', 'www.perplexity.ai']
    if (['https:', 'http:'].includes(ref.protocol) && !ref.username && !ref.password && !ref.port && hosts.includes(ref.hostname)) source = ref.origin
  } catch { /* direct visit */ }
  const parameters: Record<string, string> = {
    page_location: `${url.origin}${url.pathname}`,
    page_path: url.pathname,
    page_referrer: source,
    page_title: locale === 'ja' ? 'Gappy | AI Workforce — 日本語' : 'Gappy | AI Workforce',
    locale,
  }
  for (const [key, values] of Object.entries(campaigns)) {
    const value = url.searchParams.get(key)
    if (value && values.includes(value)) parameters[key] = value
  }
  if (!parameters.utm_source && ['https://chatgpt.com', 'https://chat.openai.com'].includes(source)) {
    parameters.utm_source = 'chatgpt.com'
  }
  // GA4 standard acquisition dimensions, in addition to explicit event parameters.
  if (parameters.utm_source) parameters.campaign_source = parameters.utm_source
  if (parameters.utm_medium) parameters.campaign_medium = parameters.utm_medium
  if (parameters.utm_campaign) parameters.campaign_name = parameters.utm_campaign
  return parameters
}

export function ctaEvent(location: string, destination: string, locale: AnalyticsLocale): AnalyticsEvent | null {
  if (!['header', 'hero', 'final', 'announcement', 'proof', 'footer', 'mobile_header'].includes(location)) return null
  if (!['demo', 'sales', 'contact'].includes(destination)) return null
  return { name: 'cta_click', parameters: {
    cta_id: `${location}_${destination}`, cta_location: location, locale,
    destination_type: destination === 'demo' ? 'demo' : destination === 'sales' ? 'booking' : 'email',
  } }
}

// One delegated adapter for the frozen homepage markup. Keyboard activation emits click too.
export function trackedLink(anchor: HTMLAnchorElement, locale: AnalyticsLocale, demoUrl: string, salesUrl: string, contactUrl: string): AnalyticsEvent | null {
  const href = anchor.getAttribute('href')
  if (anchor.closest('.home-v2 .hv-languages') && (href === '/' || href === '/ja/')) {
    const to = href === '/ja/' ? 'ja' : 'en'
    return to === locale ? null : { name: 'language_switch', parameters: { from_locale: locale, to_locale: to } }
  }
  const destination = href === demoUrl ? 'demo' : href === salesUrl ? 'sales' : href === contactUrl ? 'contact' : null
  if (!destination) return null
  const locations = [
    ['.hv-announcement', 'announcement'], ['#home-mobile-menu', 'mobile_header'],
    ['.hv-nav-actions', 'header'], ['.hv-hero', 'hero'], ['.hv-final', 'final'],
    ['#proof', 'proof'], ['.hv-footer', 'footer'],
  ]
  const location = locations.find(([selector]) => anchor.closest(selector))?.[1]
  return location ? ctaEvent(location, destination, locale) : null
}
