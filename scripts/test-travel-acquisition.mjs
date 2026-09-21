import assert from 'node:assert/strict'
import {
  handleTravelEventRequest,
  handleTravelLeadRequest,
  loadTravelEventConfiguration,
  loadTravelLeadConfiguration,
} from '../lib/travel-acquisition-server.ts'

const token = 'test-receiver-token-with-at-least-32-characters'
const privacySecret = 'test-privacy-secret-with-at-least-32-characters'
const leadConfiguration = {
  mode: 'test',
  destination: new URL('http://127.0.0.1:3022/api/marketing/travel-leads'),
  privacyNotice: new URL('http://127.0.0.1:3011/privacy-test'),
  token,
  privacySecret,
  timeoutMs: 500,
}
const eventConfiguration = {
  mode: 'test',
  destination: new URL('http://127.0.0.1:3022/api/marketing/travel-events'),
  token,
  privacySecret,
  timeoutMs: 500,
}

function leadRequest(body = {
  email: 'synthetic@example.test',
  asset: 'travel-workflow-demo-v3',
  entryLocation: 'hero',
}) {
  return new Request('http://localhost:3011/api/travel/demo-access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Forwarded-For': '192.0.2.20',
    },
    body: JSON.stringify(body),
  })
}

{
  const response = await handleTravelLeadRequest(
    leadRequest({ email: 'invalid' }),
    leadConfiguration,
  )
  assert.equal(response.status, 400)
}

{
  let forwarded
  const response = await handleTravelLeadRequest(
    leadRequest(),
    leadConfiguration,
    async (_url, init) => {
      forwarded = init
      const body = JSON.parse(String(init.body))
      return Response.json({
        status: 'stored',
        leadReference: body.leadReference,
        recordId: 'receiver-record-1',
        duplicate: false,
      }, { status: 201 })
    },
  )
  assert.equal(response.status, 202)
  const result = await response.json()
  assert.equal(result.status, 'accepted')
  assert.match(result.leadReference, /^[a-f0-9]{24}$/)
  assert.equal(forwarded.headers.Authorization, `Bearer ${token}`)
  assert.equal(forwarded.headers['Idempotency-Key'], result.leadReference)
  assert.match(forwarded.headers['X-Gappy-Request-Key'], /^[a-f0-9]{64}$/)
}

{
  const response = await handleTravelLeadRequest(
    leadRequest(),
    leadConfiguration,
    async () => Response.json({ status: 'ok-but-not-stored' }),
  )
  assert.equal(response.status, 502)
}

{
  const response = await handleTravelLeadRequest(
    leadRequest(),
    leadConfiguration,
    async () => Response.json(
      { status: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': '60' } },
    ),
  )
  assert.equal(response.status, 429)
  assert.equal(response.headers.get('retry-after'), '60')
  assert.equal((await response.json()).status, 'rate_limited')
}

{
  const response = await handleTravelLeadRequest(
    leadRequest(),
    leadConfiguration,
    async () => {
      throw new DOMException('receiver timed out', 'TimeoutError')
    },
  )
  assert.equal(response.status, 504)
}

{
  const response = await handleTravelEventRequest(
    new Request('http://localhost:3011/api/travel/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: 'event-test-idempotency-0001',
        eventName: 'video_complete',
        sessionId: 'session-test-identity-0001',
        entryLocation: 'video',
        progress: 100,
      }),
    }),
    eventConfiguration,
    async (_url, init) => {
      const body = JSON.parse(String(init.body))
      assert.deepEqual(Object.keys(body).sort(), [
        'entryLocation',
        'eventName',
        'progress',
        'sessionId',
      ])
      return Response.json({
        status: 'stored',
        eventName: body.eventName,
        recordId: 'event-record-1',
        duplicate: false,
      }, { status: 201 })
    },
  )
  assert.equal(response.status, 202)
}

{
  const response = await handleTravelEventRequest(
    new Request('http://localhost:3011/api/travel/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: 'event-test-idempotency-0003',
        eventName: 'video_complete',
        sessionId: 'session-test-identity-0003',
        progress: 100,
      }),
    }),
    eventConfiguration,
    async () => Response.json({ status: 'stored', eventName: 'video_complete' }),
  )
  assert.equal(response.status, 502)
}

{
  const response = await handleTravelEventRequest(
    new Request('http://localhost:3011/api/travel/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventId: 'event-test-idempotency-0002',
        eventName: 'meeting_booked',
        sessionId: 'session-test-identity-0002',
        email: 'must-not-pass@example.test',
      }),
    }),
    eventConfiguration,
  )
  assert.equal(response.status, 400)
}

{
  const baseEnvironment = {
    TRAVEL_ACQUISITION_MODE: 'test',
    TRAVEL_ACQUISITION_COLLECTION_ENABLED: 'true',
    TRAVEL_DEMO_LEAD_CAPTURE_ENABLED: 'true',
    TRAVEL_ANALYTICS_TEST_ENABLED: 'true',
    TRAVEL_DEMO_LEAD_WEBHOOK_URL: leadConfiguration.destination.toString(),
    TRAVEL_ANALYTICS_RECEIVER_URL: eventConfiguration.destination.toString(),
    TRAVEL_DEMO_PRIVACY_NOTICE_URL: leadConfiguration.privacyNotice.toString(),
    TRAVEL_DEMO_LEAD_WEBHOOK_TOKEN: token,
    TRAVEL_DEMO_PRIVACY_SECRET: privacySecret,
  }
  const disabledEnvironment = {
    ...baseEnvironment,
    TRAVEL_ACQUISITION_COLLECTION_ENABLED: 'false',
  }
  assert.equal(loadTravelLeadConfiguration(disabledEnvironment), null)
  assert.equal(loadTravelEventConfiguration(disabledEnvironment), null)

  const testEnvironment = { ...baseEnvironment, VERCEL_ENV: 'preview' }
  assert.equal(loadTravelLeadConfiguration(testEnvironment)?.mode, 'test')
  assert.equal(loadTravelEventConfiguration(testEnvironment)?.mode, 'test')

  const testOnProduction = { ...baseEnvironment, VERCEL_ENV: 'production' }
  assert.equal(loadTravelLeadConfiguration(testOnProduction), null)
  assert.equal(loadTravelEventConfiguration(testOnProduction), null)

  const productionEnvironment = {
    ...baseEnvironment,
    TRAVEL_ACQUISITION_MODE: 'production',
    VERCEL_ENV: 'production',
    TRAVEL_ACQUISITION_PRODUCTION_ENABLED: 'true',
    TRAVEL_ANALYTICS_ENABLED: 'true',
    TRAVEL_ACQUISITION_RECEIVER_HOST_ALLOWLIST: 'receiver.gappy.jp',
    TRAVEL_PRIVACY_NOTICE_HOST_ALLOWLIST: 'gappy.jp',
    TRAVEL_DEMO_LEAD_WEBHOOK_URL: 'https://receiver.gappy.jp/api/marketing/travel-leads',
    TRAVEL_ANALYTICS_RECEIVER_URL: 'https://receiver.gappy.jp/api/marketing/travel-events',
    TRAVEL_DEMO_PRIVACY_NOTICE_URL: 'https://gappy.jp/privacy',
  }
  assert.equal(loadTravelLeadConfiguration(productionEnvironment)?.mode, 'production')
  assert.equal(loadTravelEventConfiguration(productionEnvironment)?.mode, 'production')

  const productionWithoutApproval = {
    ...productionEnvironment,
    TRAVEL_ACQUISITION_PRODUCTION_ENABLED: 'false',
  }
  assert.equal(loadTravelLeadConfiguration(productionWithoutApproval), null)
  assert.equal(loadTravelEventConfiguration(productionWithoutApproval), null)

  const productionWithUnapprovedReceiver = {
    ...productionEnvironment,
    TRAVEL_DEMO_LEAD_WEBHOOK_URL: 'https://unapproved.example/api/leads',
    TRAVEL_ANALYTICS_RECEIVER_URL: 'https://unapproved.example/api/events',
  }
  assert.equal(loadTravelLeadConfiguration(productionWithUnapprovedReceiver), null)
  assert.equal(loadTravelEventConfiguration(productionWithUnapprovedReceiver), null)
}

console.log('travel-acquisition: validation, auth forwarding, durable response contract, failure, timeout, event allowlist, and disabled/test/production configuration gates passed')
