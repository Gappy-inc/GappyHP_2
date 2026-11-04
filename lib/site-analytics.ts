// No browser storage, identity, raw form values or arbitrary campaign values.
export const PUBLIC_PATHS = ['/', '/technology', '/travel', '/cases', '/resources', '/about', '/careers', '/contact', '/request-demo', '/request-brochure', '/product/ai-workforce', '/product/verified-work', '/product/change-monitor', '/product/evidence-approval'] as const
export type AnalyticsLocale = 'en' | 'ja'
type CareerEventName = 'careers_view' | 'career_role_view' | 'career_apply_click' | 'career_application_start' | 'career_resume_selected' | 'career_application_submit' | 'career_application_success' | 'career_application_error'
export type AnalyticsEvent = {
  name: 'cta_click' | 'language_switch' | 'lead_form_view' | 'form_start' | 'generate_lead' | 'lead_form_error' | 'booking_link_click' | 'resource_download_click' | CareerEventName
  parameters: Record<string, string>
}

export function publicPath(path: string): boolean {
  const base = path === '/ja/' ? '/' : path.replace(/^\/ja(?=\/)/, '')
  return (PUBLIC_PATHS as readonly string[]).includes(base) || /^\/careers\/[a-z0-9-]+$/.test(base)
}

export function analyticsEnabled(environment: string | undefined, id: string | undefined, reviewed: string | undefined): boolean {
  return environment === 'production' && /^G-[A-Z0-9]{4,20}$/.test(id || '') && reviewed === 'true'
}

export function eligibleBrowser(url: string, automated: boolean, optedOut: boolean): boolean {
  try {
    const u = new URL(url)
    return u.origin === 'https://gappy.jp' && publicPath(u.pathname) && !automated && !optedOut && !u.searchParams.has('analytics_qa')
  } catch {
    return false
  }
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
  } catch {
    /* direct visit */
  }
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
  if (!['header', 'hero', 'final', 'announcement', 'proof', 'use_cases', 'footer', 'mobile_header'].includes(location)) return null
  if (!['demo', 'sales', 'contact', 'request_demo', 'request_brochure'].includes(destination)) return null
  return {
    name: 'cta_click',
    parameters: {
      cta_id: `${location}_${destination}`,
      cta_location: location,
      locale,
      destination_type: destination === 'demo' ? 'demo' : destination === 'sales' ? 'booking' : destination === 'contact' ? 'email' : destination,
    },
  }
}

const leadEvents = new Set(['lead_form_view', 'form_start', 'generate_lead', 'lead_form_error', 'booking_link_click', 'resource_download_click'])
const leadErrors = new Set(['validation', 'invalid', 'forbidden', 'rate_limited', 'conflict', 'unavailable', 'error', 'network', 'server'])

export function leadAnalyticsEvent(value: unknown): AnalyticsEvent | null {
  if (!value || typeof value !== 'object') return null
  const detail = value as { name?: unknown; parameters?: unknown }
  if (typeof detail.name !== 'string' || !leadEvents.has(detail.name) || !detail.parameters || typeof detail.parameters !== 'object') return null
  const parameters = detail.parameters as Record<string, unknown>
  if (parameters.form_type !== 'demo' && parameters.form_type !== 'brochure') return null
  const safe: Record<string, string> = { form_type: parameters.form_type }
  if (detail.name === 'lead_form_error') {
    if (typeof parameters.error_code !== 'string' || !leadErrors.has(parameters.error_code)) safe.error_code = 'server'
    else safe.error_code = parameters.error_code
  }
  return { name: detail.name as AnalyticsEvent['name'], parameters: safe }
}

const careerEvents = new Set<CareerEventName>(['careers_view', 'career_role_view', 'career_apply_click', 'career_application_start', 'career_resume_selected', 'career_application_submit', 'career_application_success', 'career_application_error'])
const careerSlugs = new Set(['gtm-manager-sales-japan', 'gtm-manager-sales-south-korea', 'gtm-manager-sales-taiwan', 'gtm-manager-sales-singapore', 'gtm-manager-sales-thailand', 'development-engineer-japan', 'development-engineer-south-korea', 'development-engineer-taiwan', 'development-engineer-singapore', 'development-engineer-thailand'])
const careerTeams = new Set(['GTM Manager / Sales', 'Development Engineer'])
const careerMarkets = new Set(['Japan', 'South Korea', 'Taiwan', 'Singapore', 'Thailand'])
const careerLocations = new Set(['header', 'mobile_header', 'hero', 'final', 'positions', 'role_hero', 'application'])

export function careerAnalyticsEvent(value: unknown): AnalyticsEvent | null {
  if (!value || typeof value !== 'object') return null
  const detail = value as { name?: unknown; parameters?: unknown }
  if (typeof detail.name !== 'string' || !careerEvents.has(detail.name as CareerEventName) || !detail.parameters || typeof detail.parameters !== 'object') return null
  const input = detail.parameters as Record<string, unknown>
  if (input.page_language !== 'en' && input.page_language !== 'ja') return null
  const safe: Record<string, string> = { page_language: input.page_language }
  if (typeof input.role_slug === 'string' && careerSlugs.has(input.role_slug)) safe.role_slug = input.role_slug
  if (typeof input.team === 'string' && careerTeams.has(input.team)) safe.team = input.team
  if (typeof input.market === 'string' && careerMarkets.has(input.market)) safe.market = input.market
  if (typeof input.cta_location === 'string' && careerLocations.has(input.cta_location)) safe.cta_location = input.cta_location
  if (detail.name === 'career_role_view' && (!safe.role_slug || !safe.team || !safe.market)) return null
  return { name: detail.name as CareerEventName, parameters: safe }
}

// One delegated adapter for the frozen homepage markup. Keyboard activation emits click too.
export function trackedLink(anchor: HTMLAnchorElement, locale: AnalyticsLocale, demoUrl: string, salesUrl: string, contactUrl: string): AnalyticsEvent | null {
  const href = anchor.getAttribute('href')
  if (anchor.closest('.hv-languages') && (href === '/' || href === '/ja/')) {
    const to = href === '/ja/' ? 'ja' : 'en'
    return to === locale
      ? null
      : {
          name: 'language_switch',
          parameters: { from_locale: locale, to_locale: to },
        }
  }
  const destination = href === demoUrl ? 'demo' : href === salesUrl ? 'sales' : href === contactUrl ? 'contact' : href === '/request-demo' || href === '/ja/request-demo' ? 'request_demo' : href === '/request-brochure' || href === '/ja/request-brochure' ? 'request_brochure' : null
  if (!destination) return null
  const locations = [
    ['.hv-announcement', 'announcement'],
    ['#home-mobile-menu', 'mobile_header'],
    ['.hv-nav-actions', 'header'],
    ['.hv-cinematic-hero', 'hero'],
    ['.hv-hero', 'hero'],
    ['.hv-final', 'final'],
    ['#proof', 'proof'],
    ['#use-cases', 'use_cases'],
    ['.hv-footer', 'footer'],
  ]
  const location = locations.find(([selector]) => anchor.closest(selector))?.[1]
  return location ? ctaEvent(location, destination, locale) : null
}
