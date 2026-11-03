import { createHmac } from 'node:crypto'
import { COMPANY_SIZES, COMPANY_TYPES, WORKFLOWS } from './lead-forms.ts'
import { CONTACT_EMAIL, SITE_URL } from './config.ts'

const MAX_BODY_BYTES = 16_384
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const IDEMPOTENCY_PATTERN = /^[A-Za-z0-9._:-]{16,128}$/
const NO_STORE = { 'Cache-Control': 'no-store' }
type FetchLike = typeof fetch

export type LeadReceiverConfiguration = {
  destination: URL
  token: string
  signingSecret: string
  timeoutMs: number
  mode: 'test' | 'production'
}

function allowlistedHosts(value: string | undefined) {
  return new Set((value || '').split(',').map((host) => host.trim().toLowerCase()).filter(Boolean))
}

function timeout(value: string | undefined) {
  const parsed = Number(value || 3000)
  return Number.isSafeInteger(parsed) && parsed >= 250 && parsed <= 8000 ? parsed : 3000
}

export function loadLeadReceiverConfiguration(
  env: Record<string, string | undefined> = process.env,
): LeadReceiverConfiguration | null {
  if (env.LEAD_FORMS_CONFIGURATION_REVIEWED !== 'true') return null
  const mode = env.LEAD_FORMS_MODE === 'test' && env.VERCEL_ENV !== 'production'
    ? 'test'
    : env.LEAD_FORMS_MODE === 'production'
      && env.VERCEL_ENV === 'production'
      && env.LEAD_FORMS_RECEIVER_ENABLED === 'true'
      ? 'production'
      : null
  if (!mode) return null
  const token = env.LEAD_FORMS_RECEIVER_TOKEN?.trim() || ''
  const signingSecret = env.LEAD_FORMS_SIGNING_SECRET?.trim() || ''
  if (token.length < 32 || signingSecret.length < 32) return null
  try {
    const destination = new URL(env.LEAD_FORMS_RECEIVER_URL || '')
    const local = mode === 'test' && destination.protocol === 'http:'
      && ['localhost', '127.0.0.1'].includes(destination.hostname)
    if (!local && destination.protocol !== 'https:') return null
    if (mode === 'production' && !allowlistedHosts(env.LEAD_FORMS_RECEIVER_HOST_ALLOWLIST).has(destination.hostname.toLowerCase())) return null
    return { destination, token, signingSecret, timeoutMs: timeout(env.LEAD_FORMS_RECEIVER_TIMEOUT_MS), mode }
  } catch { return null }
}

function sameOrigin(request: Request, mode: 'test' | 'production') {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    const requestOrigin = new URL(origin)
    if (mode === 'test') return ['localhost', '127.0.0.1'].includes(requestOrigin.hostname)
    return requestOrigin.origin === new URL(SITE_URL).origin
  } catch { return false }
}

async function readBody(request: Request) {
  if (request.headers.get('content-type')?.split(';', 1)[0] !== 'application/json') return null
  if (Number(request.headers.get('content-length') || 0) > MAX_BODY_BYTES) return null
  const raw = await request.text()
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return null
  try {
    const value: unknown = JSON.parse(raw)
    return value && typeof value === 'object' ? value as Record<string, unknown> : null
  } catch { return null }
}

const allowedKeys = [
  'idempotencyKey', 'requestType', 'locale', 'fullName', 'workEmail', 'company',
  'companyType', 'companySize', 'workflow', 'message', 'privacyAccepted', 'website',
] as const

function text(value: unknown, maximum: number, required = false) {
  if (typeof value !== 'string') return required ? null : ''
  const normalized = value.trim()
  if ((required && !normalized) || normalized.length > maximum) return null
  return normalized
}

function clientKey(request: Request, secret: string) {
  const address = request.headers.get('x-forwarded-for')?.split(',', 1)[0]?.trim()
    || request.headers.get('x-real-ip')?.trim() || 'unknown'
  return createHmac('sha256', secret).update(address).digest('hex')
}

function publicError(status: number, code: string, message: string, headers: HeadersInit = {}) {
  return Response.json({ status: code, message }, { status, headers: { ...NO_STORE, ...headers } })
}

export async function handleLeadRequest(
  request: Request,
  configuration: LeadReceiverConfiguration | null = loadLeadReceiverConfiguration(),
  fetchImpl: FetchLike = fetch,
) {
  if (!configuration) return publicError(503, 'unavailable', 'Lead requests are not connected in this environment.')
  if (!sameOrigin(request, configuration.mode)) return publicError(403, 'forbidden', 'Request origin is not allowed.')
  const body = await readBody(request)
  if (!body || Object.keys(body).some((key) => !allowedKeys.includes(key as typeof allowedKeys[number]))) {
    return publicError(400, 'invalid', 'Please review the highlighted fields.')
  }
  if (typeof body.website === 'string' && body.website.trim()) {
    return publicError(400, 'invalid', 'Please review the highlighted fields.')
  }
  const idempotencyKey = text(body.idempotencyKey, 128, true)
  const requestType = body.requestType === 'demo' || body.requestType === 'brochure' ? body.requestType : null
  const locale = body.locale === 'en' || body.locale === 'ja' ? body.locale : null
  const fullName = text(body.fullName, 120, true)
  const workEmail = text(body.workEmail, 254, true)?.toLowerCase() || null
  const company = text(body.company, 160, true)
  const companyType = body.companyType === '' || body.companyType === undefined ? ''
    : COMPANY_TYPES.includes(body.companyType as typeof COMPANY_TYPES[number]) ? body.companyType : null
  const companySize = body.companySize === '' || body.companySize === undefined ? ''
    : COMPANY_SIZES.includes(body.companySize as typeof COMPANY_SIZES[number]) ? body.companySize : null
  const workflow = body.workflow === '' || body.workflow === undefined ? ''
    : WORKFLOWS.includes(body.workflow as typeof WORKFLOWS[number]) ? body.workflow : null
  const message = text(body.message, 1000)
  if (!idempotencyKey || !IDEMPOTENCY_PATTERN.test(idempotencyKey) || !requestType || !locale || !fullName
    || !workEmail || !EMAIL_PATTERN.test(workEmail) || !company || companyType === null
    || companySize === null || workflow === null || message === null || body.privacyAccepted !== true) {
    return publicError(400, 'invalid', 'Please review the highlighted fields.')
  }
  const payload = { requestType, locale, fullName, workEmail, company, companyType, companySize, workflow, message }
  const signature = createHmac('sha256', configuration.signingSecret).update(JSON.stringify(payload)).digest('hex')
  try {
    const upstream = await fetchImpl(configuration.destination, {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(configuration.timeoutMs),
      headers: {
        'Content-Type': 'application/json', Authorization: `Bearer ${configuration.token}`,
        'Idempotency-Key': idempotencyKey, 'X-Gappy-Signature': signature,
        'X-Gappy-Request-Key': clientKey(request, configuration.signingSecret),
      },
      body: JSON.stringify({ ...payload, notificationRecipient: CONTACT_EMAIL }),
    })
    const result = await upstream.json().catch(() => null) as Record<string, unknown> | null
    if (upstream.status === 429 && result?.status === 'rate_limited') {
      return publicError(429, 'rate_limited', 'Too many requests. Please wait and try again.', { 'Retry-After': upstream.headers.get('retry-after') || '60' })
    }
    if (upstream.status === 409 && result?.status === 'idempotency_conflict') {
      return publicError(409, 'conflict', 'The request changed. Please review it and submit again.')
    }
    if (!upstream.ok || !result || result.status !== 'accepted'
      || typeof result.recordId !== 'string' || !result.recordId
      || !['pending', 'accepted', 'failed'].includes(String(result.notificationStatus))) {
      return publicError(502, 'error', 'We could not safely save your request. Please try again.')
    }
    return Response.json({ status: 'accepted', duplicate: result.duplicate === true }, { status: 202, headers: NO_STORE })
  } catch {
    return publicError(504, 'error', 'The request service is temporarily unavailable. Please try again.')
  }
}
