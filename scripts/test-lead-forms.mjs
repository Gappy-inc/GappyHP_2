import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { handleLeadRequest, loadLeadReceiverConfiguration } from '../lib/lead-forms-server.ts'

const secret = 's'.repeat(40)
const config = {
  destination: new URL('https://receiver.example.test/leads'), token: 't'.repeat(40),
  signingSecret: secret, timeoutMs: 500, mode: 'production',
}
const valid = {
  idempotencyKey: '12345678-1234-4234-8234-123456789012', requestType: 'demo', locale: 'en',
  fullName: 'Private Person', workEmail: 'private@example.test', company: 'Private Company',
  companyType: 'travel-agency', companySize: '11-50', workflow: 'confirmations',
  message: 'Private workflow details', privacyAccepted: true, website: '',
}
const request = (body = valid, origin = 'https://gappy.jp') => new Request('https://gappy.jp/api/lead-requests', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin }, body: JSON.stringify(body),
})
const json = async response => ({ status: response.status, body: await response.json() })

assert.equal(loadLeadReceiverConfiguration({}), null)
assert.equal(loadLeadReceiverConfiguration({
  LEAD_FORMS_CONFIGURATION_REVIEWED: 'true', LEAD_FORMS_MODE: 'production', VERCEL_ENV: 'production',
  LEAD_FORMS_RECEIVER_ENABLED: 'true', LEAD_FORMS_RECEIVER_URL: 'http://receiver.example.test',
  LEAD_FORMS_RECEIVER_HOST_ALLOWLIST: 'receiver.example.test', LEAD_FORMS_RECEIVER_TOKEN: 't'.repeat(40),
  LEAD_FORMS_SIGNING_SECRET: secret,
}), null)
assert.ok(loadLeadReceiverConfiguration({
  LEAD_FORMS_CONFIGURATION_REVIEWED: 'true', LEAD_FORMS_MODE: 'production', VERCEL_ENV: 'production',
  LEAD_FORMS_RECEIVER_ENABLED: 'true', LEAD_FORMS_RECEIVER_URL: 'https://receiver.example.test/leads',
  LEAD_FORMS_RECEIVER_HOST_ALLOWLIST: 'receiver.example.test', LEAD_FORMS_RECEIVER_TOKEN: 't'.repeat(40),
  LEAD_FORMS_SIGNING_SECRET: secret,
}))

assert.deepEqual(await json(await handleLeadRequest(request(), null)), {
  status: 503, body: { status: 'unavailable', message: 'Lead requests are not connected in this environment.' },
})
assert.equal((await handleLeadRequest(request(valid, 'https://evil.example'), config)).status, 403)
for (const body of [
  { ...valid, fullName: '' }, { ...valid, workEmail: 'not-an-email' }, { ...valid, privacyAccepted: false },
  { ...valid, requestType: 'unknown' }, { ...valid, companyType: 'unknown' }, { ...valid, website: 'bot.example' },
  { ...valid, extra: 'not accepted' }, { ...valid, message: 'x'.repeat(1001) },
]) assert.equal((await handleLeadRequest(request(body), config)).status, 400)

let outbound
const accepted = await handleLeadRequest(request(), config, async (url, init) => {
  outbound = { url: String(url), init }
  return Response.json({ status: 'accepted', recordId: 'durable-record', duplicate: false, notificationStatus: 'pending' })
})
const acceptedJson = await json(accepted)
assert.equal(acceptedJson.status, 202)
assert.deepEqual(acceptedJson.body, { status: 'accepted', duplicate: false })
assert.equal(outbound.init.headers['Idempotency-Key'], valid.idempotencyKey)
assert.match(outbound.init.headers['X-Gappy-Signature'], /^[a-f0-9]{64}$/)
const sent = JSON.parse(outbound.init.body)
assert.equal(sent.notificationRecipient, 'mitsuki@gappy.jp')
assert.equal(sent.workEmail, valid.workEmail)
assert.doesNotMatch(JSON.stringify(acceptedJson), /Private|private@|workflow details|record/)

const duplicate = await handleLeadRequest(request(), config, async () => Response.json({ status: 'accepted', recordId: 'same-record', duplicate: true, notificationStatus: 'accepted' }))
assert.deepEqual(await duplicate.json(), { status: 'accepted', duplicate: true })
const rateLimited = await handleLeadRequest(request(), config, async () => Response.json({ status: 'rate_limited' }, { status: 429, headers: { 'Retry-After': '120' } }))
assert.equal(rateLimited.status, 429)
assert.equal(rateLimited.headers.get('Retry-After'), '120')
const conflict = await handleLeadRequest(request(), config, async () => Response.json({ status: 'idempotency_conflict' }, { status: 409 }))
assert.equal(conflict.status, 409)
const falseSuccess = await handleLeadRequest(request(), config, async () => Response.json({ status: 'accepted', notificationStatus: 'pending' }))
assert.equal(falseSuccess.status, 502)
const network = await handleLeadRequest(request(), config, async () => { throw new Error('network') })
assert.equal(network.status, 504)

const client = readFileSync('components/lead-forms/LeadRequestPage.tsx', 'utf8')
assert.match(client, /crypto\.randomUUID\(\)/)
assert.match(client, /privacyAccepted/)
assert.match(client, /maxLength=\{1000\}/)
assert.match(client, /result\?\.status === 'accepted'/)
assert.match(client, /requestType === 'demo' &&/)
assert.doesNotMatch(client, /fallbackDemo|Open booking page|予約ページを開く/)
assert.doesNotMatch(client, /localStorage|sessionStorage|returnTo/)
assert.doesNotMatch(readFileSync('app/api/lead-requests/route.ts', 'utf8'), /console\.|GOODTIME_URL|mailto:/)
console.log('PASS: lead configuration gates, origin/body/enums/honeypot, durable acceptance, idempotency, rate limit/conflict, redacted responses and unavailable state')
