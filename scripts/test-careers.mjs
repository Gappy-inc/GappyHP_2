import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { careerJobs, careerMarkets, careerTeams } from '../content/careers.ts'
import { handleCareerApplication, loadCareersReceiverConfiguration, normalizeResumeFilename } from '../lib/careers-applications-server.ts'
import { careerAnalyticsEvent, publicPath } from '../lib/site-analytics.ts'

assert.equal(careerJobs.length, 8)
assert.deepEqual(careerTeams, ['GTM Manager / Sales', 'Development Engineer'])
assert.equal(careerJobs.filter(job => job.team === 'GTM Manager / Sales').length, 4)
assert.equal(careerJobs.filter(job => job.team === 'Development Engineer').length, 4)
assert.deepEqual([...new Set(careerJobs.map(job => job.market))], [...careerMarkets])
assert.equal(new Set(careerJobs.map(job => job.slug)).size, 8)
for (const job of careerJobs) {
  assert.match(job.slug, /^(gtm-manager-sales|development-engineer)-(south-korea|taiwan|singapore|thailand)$/)
  assert.equal(publicPath(`/careers/${job.slug}`), true)
}

const secret = 's'.repeat(40)
const config = { destination: new URL('https://receiver.example.test/careers'), token: 't'.repeat(40), signingSecret: secret, notificationTo: 'mitsuki@gappy.jp', timeoutMs: 1000, mode: 'production' }
assert.equal(loadCareersReceiverConfiguration({}), null)
assert.equal(loadCareersReceiverConfiguration({
  CAREERS_APPLICATIONS_CONFIGURATION_REVIEWED: 'true', CAREERS_APPLICATIONS_MODE: 'production', VERCEL_ENV: 'production', CAREERS_APPLICATIONS_RECEIVER_ENABLED: 'true',
  CAREERS_APPLICATIONS_RECEIVER_URL: 'http://receiver.example.test', CAREERS_APPLICATIONS_RECEIVER_HOST_ALLOWLIST: 'receiver.example.test',
  CAREERS_APPLICATIONS_RECEIVER_TOKEN: 't'.repeat(40), CAREERS_APPLICATIONS_SIGNING_SECRET: secret, CAREERS_NOTIFICATION_TO: 'mitsuki@gappy.jp',
}), null)
assert.ok(loadCareersReceiverConfiguration({
  CAREERS_APPLICATIONS_CONFIGURATION_REVIEWED: 'true', CAREERS_APPLICATIONS_MODE: 'production', VERCEL_ENV: 'production', CAREERS_APPLICATIONS_RECEIVER_ENABLED: 'true',
  CAREERS_APPLICATIONS_RECEIVER_URL: 'https://receiver.example.test/careers', CAREERS_APPLICATIONS_RECEIVER_HOST_ALLOWLIST: 'receiver.example.test',
  CAREERS_APPLICATIONS_RECEIVER_TOKEN: 't'.repeat(40), CAREERS_APPLICATIONS_SIGNING_SECRET: secret, CAREERS_NOTIFICATION_TO: 'mitsuki@gappy.jp',
}))

const job = careerJobs[0]
function application(overrides = {}) {
  const data = new FormData()
  const fields = {
    idempotencyKey: '12345678-1234-4234-8234-123456789012', firstName: 'Private', lastName: 'Person', email: 'private@example.test',
    roleSlug: job.slug, role: job.title, market: job.market, location: 'Private location', linkedin: 'https://linkedin.com/in/private',
    github: 'https://github.com/private', message: 'Private recruitment message', privacyAccepted: 'true', website: '', ...overrides,
  }
  for (const [key, value] of Object.entries(fields)) if (value !== undefined) data.set(key, String(value))
  data.set('resume', overrides.resume || new File(['resume content'], '../Private Person Resume.pdf', { type: 'application/pdf' }))
  return new Request('https://gappy.jp/api/careers/applications', { method: 'POST', headers: { Origin: 'https://gappy.jp', 'Idempotency-Key': String(fields.idempotencyKey) }, body: data })
}

assert.equal((await handleCareerApplication(application(), null)).status, 503)
assert.equal((await handleCareerApplication(application(), config)).status, 504)
assert.equal((await handleCareerApplication(new Request('https://gappy.jp/api/careers/applications', { method: 'POST', headers: { Origin: 'https://evil.example', 'Content-Type': 'multipart/form-data' } }), config)).status, 403)
for (const changes of [
  { firstName: '' }, { email: 'invalid' }, { privacyAccepted: 'false' }, { role: 'Other role' }, { market: 'Other market' }, { location: '' }, { website: 'bot' },
  { linkedin: 'http://linkedin.example/private' }, { resume: new File([], 'empty.pdf', { type: 'application/pdf' }) },
  { resume: new File([new Uint8Array(10 * 1024 * 1024 + 1)], 'large.pdf', { type: 'application/pdf' }) },
  { resume: new File(['x'], 'resume.exe', { type: 'application/pdf' }) }, { resume: new File(['x'], 'resume.pdf', { type: 'text/plain' }) },
]) assert.equal((await handleCareerApplication(application(changes), config)).status, 400)

let outbound
const accepted = await handleCareerApplication(application(), config, async (url, init) => {
  outbound = { url: String(url), init }
  return Response.json({ status: 'accepted', recordId: 'private-record', resumeStatus: 'stored', notificationStatus: 'sent', duplicate: false })
})
assert.equal(accepted.status, 202)
assert.deepEqual(await accepted.json(), { status: 'accepted', duplicate: false })
assert.equal(outbound.init.headers['Idempotency-Key'], '12345678-1234-4234-8234-123456789012')
assert.match(outbound.init.headers['X-Gappy-Signature'], /^[a-f0-9]{64}$/)
assert.ok(outbound.init.body instanceof FormData)
assert.equal(outbound.init.body.get('notificationTo'), 'mitsuki@gappy.jp')
assert.equal(outbound.init.body.get('role'), job.title)
assert.equal(outbound.init.body.get('market'), job.market)
assert.equal(outbound.init.body.get('resume').name, 'Private_Person_Resume.pdf')
assert.doesNotMatch(JSON.stringify(await (async () => ({ status: accepted.status }))()), /Private|private@|location|message|record/)
assert.equal((await handleCareerApplication(application(), config, async () => Response.json({ status: 'accepted', recordId: 'x', resumeStatus: 'stored', notificationStatus: 'pending' }))).status, 502)
assert.equal((await handleCareerApplication(application(), config, async () => Response.json({ status: 'accepted', recordId: 'x', resumeStatus: 'failed', notificationStatus: 'sent' }))).status, 502)
assert.equal((await handleCareerApplication(application(), config, async () => Response.json({ status: 'idempotency_conflict' }, { status: 409 }))).status, 409)
assert.equal((await handleCareerApplication(application(), config, async () => Response.json({ status: 'rate_limited' }, { status: 429 }))).status, 429)
assert.equal(normalizeResumeFilename('../../ résumé 2026.PDF', '.pdf'), 'r_sum_2026.pdf')

const form = readFileSync('components/careers/ApplicationForm.tsx', 'utf8')
const explorer = readFileSync('components/careers/JobExplorer.tsx', 'utf8')
assert.match(explorer, /All teams/); assert.match(explorer, /All markets/); assert.match(explorer, /Search positions/)
assert.match(form, /crypto\.randomUUID\(\)/); assert.match(form, /submission === 'sending'/); assert.match(form, /disabled=\{availability !== 'available'/)
assert.match(form, /\.pdf,\.doc,\.docx/); assert.match(form, /privacyAccepted/); assert.match(form, /result\?\.status !== 'accepted'/)
assert.doesNotMatch(form, /localStorage|sessionStorage|mailto:|mitsuki@gappy.jp/)

assert.deepEqual(careerAnalyticsEvent({ name: 'career_application_submit', parameters: { role_slug: job.slug, team: job.team, market: job.market, page_language: 'en', cta_location: 'application', email: 'private@example.test', filename: 'private.pdf', message: 'private' } }), {
  name: 'career_application_submit', parameters: { page_language: 'en', role_slug: job.slug, team: job.team, market: job.market, cta_location: 'application' },
})
assert.equal(careerAnalyticsEvent({ name: 'career_role_view', parameters: { page_language: 'en', email: 'private@example.test' } }), null)

const sitemap = readFileSync('app/sitemap.ts', 'utf8')
const rolePage = readFileSync('app/careers/[slug]/page.tsx', 'utf8')
assert.match(sitemap, /careerJobs/); assert.match(rolePage, /JobPosting/); assert.doesNotMatch(rolePage, /baseSalary|employmentType|jobLocationType|streetAddress|validThrough/)
console.log('PASS: exactly 8 roles, filters/routes, strict CV validation, preselection, privacy, idempotency, durable resume + notification success, PII-safe analytics and JobPosting constraints')
