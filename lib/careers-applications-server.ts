import { createHash, createHmac } from 'node:crypto'
import { getCareerJob } from '../content/careers.ts'
import { SITE_URL } from './config.ts'

const MAX_FILE_BYTES = 10 * 1024 * 1024
const MAX_REQUEST_BYTES = 12 * 1024 * 1024
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const KEY_PATTERN = /^[A-Za-z0-9._:-]{16,128}$/
const NO_STORE = { 'Cache-Control': 'no-store' }
type FetchLike = typeof fetch

const fileTypes: Record<string, string> = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

export type CareersReceiverConfiguration = {
  destination: URL
  token: string
  signingSecret: string
  notificationTo: string
  timeoutMs: number
  mode: 'test' | 'production'
}

function approvedHosts(value: string | undefined) {
  return new Set((value || '').split(',').map((host) => host.trim().toLowerCase()).filter(Boolean))
}

function configuredTimeout(value: string | undefined) {
  const parsed = Number(value || 8000)
  return Number.isSafeInteger(parsed) && parsed >= 1000 && parsed <= 15000 ? parsed : 8000
}

export function loadCareersReceiverConfiguration(env: Record<string, string | undefined> = process.env): CareersReceiverConfiguration | null {
  if (env.CAREERS_APPLICATIONS_CONFIGURATION_REVIEWED !== 'true') return null
  const mode = env.CAREERS_APPLICATIONS_MODE === 'test' && env.VERCEL_ENV !== 'production'
    ? 'test'
    : env.CAREERS_APPLICATIONS_MODE === 'production' && env.VERCEL_ENV === 'production'
      && env.CAREERS_APPLICATIONS_RECEIVER_ENABLED === 'true' ? 'production' : null
  if (!mode) return null
  const token = env.CAREERS_APPLICATIONS_RECEIVER_TOKEN?.trim() || ''
  const signingSecret = env.CAREERS_APPLICATIONS_SIGNING_SECRET?.trim() || ''
  const notificationTo = env.CAREERS_NOTIFICATION_TO?.trim().toLowerCase() || ''
  if (token.length < 32 || signingSecret.length < 32 || !EMAIL_PATTERN.test(notificationTo)) return null
  try {
    const destination = new URL(env.CAREERS_APPLICATIONS_RECEIVER_URL || '')
    const loopback = mode === 'test' && destination.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(destination.hostname)
    if (!loopback && destination.protocol !== 'https:') return null
    if (mode === 'production' && !approvedHosts(env.CAREERS_APPLICATIONS_RECEIVER_HOST_ALLOWLIST).has(destination.hostname.toLowerCase())) return null
    return { destination, token, signingSecret, notificationTo, timeoutMs: configuredTimeout(env.CAREERS_APPLICATIONS_RECEIVER_TIMEOUT_MS), mode }
  } catch { return null }
}

function sameOrigin(request: Request, mode: CareersReceiverConfiguration['mode']) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  try {
    const parsed = new URL(origin)
    return mode === 'test' ? ['localhost', '127.0.0.1'].includes(parsed.hostname) : parsed.origin === new URL(SITE_URL).origin
  } catch { return false }
}

function cleanText(value: FormDataEntryValue | null, maximum: number, required = false) {
  if (typeof value !== 'string') return required ? null : ''
  const normalized = value.trim()
  return (required && !normalized) || normalized.length > maximum ? null : normalized
}

function safeUrl(value: string | null) {
  if (value === null || value === '') return value
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password && value.length <= 500 ? url.toString() : null
  } catch { return null }
}

function fileExtension(name: string) {
  const match = name.toLowerCase().match(/\.(pdf|docx?)$/)
  return match ? `.${match[1]}` : ''
}

export function normalizeResumeFilename(name: string, extension: string) {
  const withoutPath = name.normalize('NFKC').split(/[\\/]/).pop() || 'resume'
  const stem = withoutPath.replace(/\.[^.]+$/, '').replace(/[^A-Za-z0-9._-]+/g, '_').replace(/^[_\.]+|[_\.]+$/g, '').slice(0, 100) || 'resume'
  return `${stem}${extension}`
}

function publicError(status: number, code: string, message: string, headers: HeadersInit = {}) {
  return Response.json({ status: code, message }, { status, headers: { ...NO_STORE, ...headers } })
}

function clientKey(request: Request, secret: string) {
  const address = request.headers.get('x-forwarded-for')?.split(',', 1)[0]?.trim() || request.headers.get('x-real-ip')?.trim() || 'unknown'
  return createHmac('sha256', secret).update(address).digest('hex')
}

export async function handleCareerApplication(request: Request, configuration: CareersReceiverConfiguration | null = loadCareersReceiverConfiguration(), fetchImpl: FetchLike = fetch) {
  if (!configuration) return publicError(503, 'unavailable', 'Applications are not connected in this environment.')
  if (!sameOrigin(request, configuration.mode)) return publicError(403, 'forbidden', 'Request origin is not allowed.')
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data')) return publicError(400, 'invalid', 'Please review the highlighted fields.')
  if (Number(request.headers.get('content-length') || 0) > MAX_REQUEST_BYTES) return publicError(413, 'invalid_file', 'Resume files must be no larger than 10 MB.')

  let body: FormData
  try { body = await request.formData() } catch { return publicError(400, 'invalid', 'Please review the highlighted fields.') }
  const allowed = new Set(['idempotencyKey', 'firstName', 'lastName', 'email', 'roleSlug', 'role', 'market', 'location', 'linkedin', 'github', 'message', 'privacyAccepted', 'resume', 'website'])
  if ([...body.keys()].some((key) => !allowed.has(key)) || cleanText(body.get('website'), 200)) return publicError(400, 'invalid', 'Please review the highlighted fields.')

  const idempotencyKey = cleanText(body.get('idempotencyKey'), 128, true)
  const idempotencyHeader = request.headers.get('idempotency-key')
  const firstName = cleanText(body.get('firstName'), 80, true)
  const lastName = cleanText(body.get('lastName'), 80, true)
  const email = cleanText(body.get('email'), 254, true)?.toLowerCase() || null
  const roleSlug = cleanText(body.get('roleSlug'), 100, true)
  const role = cleanText(body.get('role'), 100, true)
  const market = cleanText(body.get('market'), 80, true)
  const location = cleanText(body.get('location'), 160, true)
  const linkedin = safeUrl(cleanText(body.get('linkedin'), 500))
  const github = safeUrl(cleanText(body.get('github'), 500))
  const message = cleanText(body.get('message'), 2000)
  const job = roleSlug ? getCareerJob(roleSlug) : undefined
  if (!idempotencyKey || !KEY_PATTERN.test(idempotencyKey) || idempotencyHeader !== idempotencyKey || !firstName || !lastName || !email || !EMAIL_PATTERN.test(email)
    || !job || role !== job.title || market !== job.market || !location || linkedin === null || github === null || message === null
    || body.get('privacyAccepted') !== 'true') return publicError(400, 'invalid', 'Please review the highlighted fields.')

  const resume = body.get('resume')
  if (!(resume instanceof File) || resume.size < 1 || resume.size > MAX_FILE_BYTES) return publicError(400, 'invalid_file', 'Choose a PDF, DOC, or DOCX file no larger than 10 MB.')
  const extension = fileExtension(resume.name)
  if (!extension || fileTypes[extension] !== resume.type) return publicError(400, 'invalid_file', 'Choose a PDF, DOC, or DOCX file no larger than 10 MB.')
  const normalizedFilename = normalizeResumeFilename(resume.name, extension)
  const resumeBytes = await resume.arrayBuffer()
  const resumeDigest = createHash('sha256').update(new Uint8Array(resumeBytes)).digest('hex')
  const submittedAt = new Date().toISOString()
  const metadata = { idempotencyKey, roleSlug, role: job.title, team: job.team, market: job.market, firstName, lastName, email, location, linkedin: linkedin || '', github: github || '', message: message || '', submittedAt, resumeDigest, notificationTo: configuration.notificationTo }
  const signature = createHmac('sha256', configuration.signingSecret).update(JSON.stringify(metadata)).digest('hex')
  const forwarded = new FormData()
  for (const [key, value] of Object.entries(metadata)) forwarded.set(key, String(value))
  forwarded.set('notificationSubject', `[Gappy Careers] ${job.title} — ${firstName} ${lastName} — ${job.market}`)
  forwarded.set('resume', new File([resumeBytes], normalizedFilename, { type: resume.type }))

  try {
    const upstream = await fetchImpl(configuration.destination, {
      method: 'POST', cache: 'no-store', signal: AbortSignal.timeout(configuration.timeoutMs), body: forwarded,
      headers: { Authorization: `Bearer ${configuration.token}`, 'Idempotency-Key': idempotencyKey, 'X-Gappy-Signature': signature, 'X-Gappy-Request-Key': clientKey(request, configuration.signingSecret) },
    })
    const result = await upstream.json().catch(() => null) as Record<string, unknown> | null
    if (upstream.status === 429 && result?.status === 'rate_limited') return publicError(429, 'rate_limited', 'Too many attempts. Please wait and try again.', { 'Retry-After': upstream.headers.get('retry-after') || '60' })
    if (upstream.status === 409 && result?.status === 'idempotency_conflict') return publicError(409, 'conflict', 'The application changed. Please review it and submit again.')
    if (!upstream.ok || result?.status !== 'accepted' || typeof result.recordId !== 'string' || !result.recordId
      || result.resumeStatus !== 'stored' || result.notificationStatus !== 'sent') return publicError(502, 'notification_failed', 'We could not safely receive your application. Please try again.')
    return Response.json({ status: 'accepted', duplicate: result.duplicate === true }, { status: 202, headers: NO_STORE })
  } catch { return publicError(504, 'timeout', 'The application service is temporarily unavailable. Please try again.') }
}
