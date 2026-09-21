import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_BODY_BYTES = 4096
const ALLOWED_ENTRY_LOCATIONS = new Set([
  'hero',
  'sticky',
  'video',
  'final',
])

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function destination() {
  const value = process.env.TRAVEL_DEMO_LEAD_WEBHOOK_URL?.trim()
  if (!value) return null

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' && url.hostname !== 'localhost') return null
    return url
  } catch {
    return null
  }
}

export async function GET() {
  return NextResponse.json(
    { available: destination() !== null },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

export async function POST(request: Request) {
  const configuredDestination = destination()
  if (!configuredDestination) {
    return NextResponse.json(
      {
        status: 'unavailable',
        message: 'Demo access registration is not connected in this environment.',
      },
      { status: 503 },
    )
  }

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { status: 'error', message: 'Request is too large.' },
      { status: 413 },
    )
  }

  const rawBody = await request.text()
  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { status: 'error', message: 'Request is too large.' },
      { status: 413 },
    )
  }

  let body: unknown
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json(
      { status: 'invalid', message: 'Request body must be valid JSON.' },
      { status: 400 },
    )
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { status: 'invalid', message: 'Request body is invalid.' },
      { status: 400 },
    )
  }

  const candidate = body as Record<string, unknown>
  const email = typeof candidate.email === 'string' ? candidate.email.trim() : ''
  const asset = candidate.asset === 'travel-workflow-demo-v3'
    ? candidate.asset
    : null
  const entryLocation = typeof candidate.entryLocation === 'string'
    && ALLOWED_ENTRY_LOCATIONS.has(candidate.entryLocation)
    ? candidate.entryLocation
    : null

  if (
    !email
    || email.length > 254
    || !EMAIL_PATTERN.test(email)
    || !asset
    || !entryLocation
  ) {
    return NextResponse.json(
      { status: 'invalid', message: 'Enter a valid email address.' },
      { status: 400 },
    )
  }

  const leadReference = createHash('sha256')
    .update(`${email.toLocaleLowerCase('en-US')}|${asset}`)
    .digest('hex')
    .slice(0, 24)

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Idempotency-Key': leadReference,
  }
  const token = process.env.TRAVEL_DEMO_LEAD_WEBHOOK_TOKEN?.trim()
  if (token) headers.Authorization = `Bearer ${token}`

  try {
    const upstream = await fetch(configuredDestination, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        leadReference,
        email,
        asset,
        entryLocation,
        requestedAt: new Date().toISOString(),
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    })

    if (!upstream.ok) {
      return NextResponse.json(
        {
          status: 'error',
          message: 'We could not save your request. Please try again or book a demo.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json(
      { status: 'accepted', leadReference },
      { status: 202, headers: { 'Cache-Control': 'no-store' } },
    )
  } catch {
    return NextResponse.json(
      {
        status: 'error',
        message: 'The access service is temporarily unavailable. Please try again or book a demo.',
      },
      { status: 504 },
    )
  }
}
