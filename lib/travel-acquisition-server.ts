import { createHmac } from 'node:crypto'

const MAX_BODY_BYTES = 4096
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EVENT_ID_PATTERN = /^[A-Za-z0-9._:-]{16,128}$/
const ENTRY_LOCATIONS = ['hero', 'sticky', 'video', 'final'] as const
const EVENT_NAMES = [
  'travel_lp_view',
  'sample_demo_start',
  'video_progress_25',
  'video_progress_50',
  'video_progress_75',
  'video_complete',
  'lead_capture_success',
  'booking_cta_click',
] as const
const PROGRESS_VALUES = new Set([25, 50, 75, 100])
const NO_STORE_HEADERS = { 'Cache-Control': 'no-store' }

type EntryLocation = typeof ENTRY_LOCATIONS[number]
type EventName = typeof EVENT_NAMES[number]

export type TravelLeadConfiguration = {
  destination: URL
  privacyNotice: URL
  token: string
  privacySecret: string
  timeoutMs: number
}

export type TravelEventConfiguration = {
  destination: URL
  token: string
  privacySecret: string
  timeoutMs: number
}

type FetchLike = typeof fetch

function parseTestUrl(value: string | undefined) {
  const candidate = value?.trim()
  if (!candidate) return null
  try {
    const url = new URL(candidate)
    if (
      url.protocol !== 'https:'
      && url.hostname !== 'localhost'
      && url.hostname !== '127.0.0.1'
    ) return null
    return url
  } catch {
    return null
  }
}

function boundedTimeout(value: string | undefined) {
  const parsed = Number(value || 2000)
  return Number.isSafeInteger(parsed) && parsed >= 250 && parsed <= 8000
    ? parsed
    : 2000
}

function isTestEnvironment(environment: Record<string, string | undefined>) {
  return environment.TRAVEL_ACQUISITION_MODE === 'test'
    && environment.VERCEL_ENV !== 'production'
}

export function loadTravelLeadConfiguration(
  environment: Record<string, string | undefined> = process.env,
): TravelLeadConfiguration | null {
  if (!isTestEnvironment(environment)) return null
  if (environment.TRAVEL_DEMO_LEAD_CAPTURE_ENABLED !== 'true') return null
  const destination = parseTestUrl(environment.TRAVEL_DEMO_LEAD_WEBHOOK_URL)
  const privacyNotice = parseTestUrl(environment.TRAVEL_DEMO_PRIVACY_NOTICE_URL)
  const token = environment.TRAVEL_DEMO_LEAD_WEBHOOK_TOKEN?.trim() || ''
  const privacySecret = environment.TRAVEL_DEMO_PRIVACY_SECRET?.trim() || ''
  if (
    !destination
    || !privacyNotice
    || token.length < 32
    || privacySecret.length < 32
  ) return null
  return {
    destination,
    privacyNotice,
    token,
    privacySecret,
    timeoutMs: boundedTimeout(environment.TRAVEL_RECEIVER_TIMEOUT_MS),
  }
}

export function loadTravelEventConfiguration(
  environment: Record<string, string | undefined> = process.env,
): TravelEventConfiguration | null {
  if (!isTestEnvironment(environment)) return null
  if (environment.TRAVEL_ANALYTICS_TEST_ENABLED !== 'true') return null
  const destination = parseTestUrl(environment.TRAVEL_ANALYTICS_RECEIVER_URL)
  const token = environment.TRAVEL_DEMO_LEAD_WEBHOOK_TOKEN?.trim() || ''
  const privacySecret = environment.TRAVEL_DEMO_PRIVACY_SECRET?.trim() || ''
  if (!destination || token.length < 32 || privacySecret.length < 32) return null
  return {
    destination,
    token,
    privacySecret,
    timeoutMs: boundedTimeout(environment.TRAVEL_RECEIVER_TIMEOUT_MS),
  }
}

async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  if (request.headers.get('content-type')?.split(';', 1)[0] !== 'application/json') return null
  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) return null
  const raw = await request.text()
  if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return null
  try {
    const parsed: unknown = JSON.parse(raw)
    return parsed && typeof parsed === 'object'
      ? parsed as Record<string, unknown>
      : null
  } catch {
    return null
  }
}

function hasOnlyKeys(body: Record<string, unknown>, allowed: readonly string[]) {
  return Object.keys(body).every((key) => allowed.includes(key))
}

function requestKey(request: Request, secret: string) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',', 1)[0]?.trim()
  const address = forwarded || request.headers.get('x-real-ip')?.trim() || 'unknown'
  return createHmac('sha256', secret).update(address).digest('hex')
}

function redactedMessage() {
  return 'We could not save your request. Please try again or book a demo.'
}

export async function handleTravelLeadRequest(
  request: Request,
  configuration: TravelLeadConfiguration | null = loadTravelLeadConfiguration(),
  fetchImpl: FetchLike = fetch,
) {
  if (!configuration) {
    return Response.json(
      {
        status: 'unavailable',
        message: 'Demo access registration is not connected in this environment.',
      },
      { status: 503, headers: NO_STORE_HEADERS },
    )
  }
  const body = await readJson(request)
  if (!body || !hasOnlyKeys(body, ['email', 'asset', 'entryLocation'])) {
    return Response.json(
      { status: 'invalid', message: 'Request body is invalid.' },
      { status: 400, headers: NO_STORE_HEADERS },
    )
  }
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const asset = body.asset === 'travel-workflow-demo-v3' ? body.asset : null
  const entryLocation = typeof body.entryLocation === 'string'
    && ENTRY_LOCATIONS.includes(body.entryLocation as EntryLocation)
    ? body.entryLocation as EntryLocation
    : null
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email) || !asset || !entryLocation) {
    return Response.json(
      { status: 'invalid', message: 'Enter a valid email address.' },
      { status: 400, headers: NO_STORE_HEADERS },
    )
  }
  const normalizedEmail = email.toLocaleLowerCase('en-US')
  const leadReference = createHmac('sha256', configuration.privacySecret)
    .update(`${normalizedEmail}|${asset}`)
    .digest('hex')
    .slice(0, 24)
  try {
    const upstream = await fetchImpl(configuration.destination, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configuration.token}`,
        'Idempotency-Key': leadReference,
        'X-Gappy-Request-Key': requestKey(request, configuration.privacySecret),
      },
      body: JSON.stringify({
        leadReference,
        email: normalizedEmail,
        asset,
        entryLocation,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(configuration.timeoutMs),
    })
    const result = await upstream.json().catch(() => null) as Record<string, unknown> | null
    if (upstream.status === 429 && result?.status === 'rate_limited') {
      return Response.json(
        {
          status: 'rate_limited',
          message: 'Too many requests. Please wait before trying again.',
        },
        {
          status: 429,
          headers: {
            ...NO_STORE_HEADERS,
            'Retry-After': upstream.headers.get('retry-after') || '60',
          },
        },
      )
    }
    if (
      !upstream.ok
      || !result
      || result.status !== 'stored'
      || result.leadReference !== leadReference
      || typeof result.recordId !== 'string'
      || !result.recordId
    ) {
      return Response.json(
        { status: 'error', message: redactedMessage() },
        { status: 502, headers: NO_STORE_HEADERS },
      )
    }
    return Response.json(
      {
        status: 'accepted',
        leadReference,
        duplicate: result.duplicate === true,
      },
      { status: 202, headers: NO_STORE_HEADERS },
    )
  } catch {
    return Response.json(
      {
        status: 'error',
        message: 'The access service is temporarily unavailable. Please try again or book a demo.',
      },
      { status: 504, headers: NO_STORE_HEADERS },
    )
  }
}

export async function handleTravelEventRequest(
  request: Request,
  configuration: TravelEventConfiguration | null = loadTravelEventConfiguration(),
  fetchImpl: FetchLike = fetch,
) {
  if (!configuration) {
    return Response.json(
      { status: 'unavailable' },
      { status: 503, headers: NO_STORE_HEADERS },
    )
  }
  const body = await readJson(request)
  if (
    !body
    || !hasOnlyKeys(body, ['eventId', 'eventName', 'sessionId', 'entryLocation', 'progress'])
  ) {
    return Response.json(
      { status: 'invalid' },
      { status: 400, headers: NO_STORE_HEADERS },
    )
  }
  const eventId = typeof body.eventId === 'string' ? body.eventId : ''
  const eventName = typeof body.eventName === 'string'
    && EVENT_NAMES.includes(body.eventName as EventName)
    ? body.eventName as EventName
    : null
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : ''
  const entryLocation = body.entryLocation === undefined
    ? undefined
    : typeof body.entryLocation === 'string'
      && ENTRY_LOCATIONS.includes(body.entryLocation as EntryLocation)
      ? body.entryLocation as EntryLocation
      : null
  const progress = body.progress === undefined
    ? undefined
    : typeof body.progress === 'number' && PROGRESS_VALUES.has(body.progress)
      ? body.progress as 25 | 50 | 75 | 100
      : null
  if (
    !EVENT_ID_PATTERN.test(eventId)
    || !eventName
    || sessionId.length < 16
    || sessionId.length > 128
    || entryLocation === null
    || progress === null
  ) {
    return Response.json(
      { status: 'invalid' },
      { status: 400, headers: NO_STORE_HEADERS },
    )
  }
  try {
    const upstream = await fetchImpl(configuration.destination, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${configuration.token}`,
        'Idempotency-Key': eventId,
        'X-Gappy-Request-Key': requestKey(request, configuration.privacySecret),
      },
      body: JSON.stringify({
        eventName,
        sessionId,
        ...(entryLocation ? { entryLocation } : {}),
        ...(progress ? { progress } : {}),
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(configuration.timeoutMs),
    })
    const result = await upstream.json().catch(() => null) as Record<string, unknown> | null
    if (
      !upstream.ok
      || !result
      || result.status !== 'stored'
      || result.eventName !== eventName
      || typeof result.recordId !== 'string'
      || !result.recordId
    ) {
      return Response.json(
        { status: 'error' },
        { status: 502, headers: NO_STORE_HEADERS },
      )
    }
    return Response.json(
      { status: 'accepted', eventName, duplicate: result.duplicate === true },
      { status: 202, headers: NO_STORE_HEADERS },
    )
  } catch {
    return Response.json(
      { status: 'error' },
      { status: 504, headers: NO_STORE_HEADERS },
    )
  }
}

export { EVENT_NAMES as TRAVEL_DELIVERABLE_EVENT_NAMES }
