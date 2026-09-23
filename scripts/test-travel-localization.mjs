import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { GOODTIME_URL } from '../lib/config.ts'
import { TRAVEL_SECTION_IDS, travelGlobalContent } from '../content/travel-global.ts'
import { createInitialTravelDemoState, isCurrentConfirmationVerified, travelDemoReducer } from '../lib/travel-demo-machine.ts'

assert.deepEqual(TRAVEL_SECTION_IDS, ['hero', 'work-demo', 'video-walkthrough', 'role-view', 'platform', 'scenarios', 'business-impact', 'pilot', 'faq', 'final-cta'])

function shape(value) {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, shape(nested)]))
  return typeof value
}

assert.deepEqual(shape(travelGlobalContent.ja), shape(travelGlobalContent.en), 'EN and JA copy structures must remain identical')

const reduce = (state, ...actions) => actions.reduce(travelDemoReducer, state)
for (const locale of ['en', 'ja']) {
  assert.ok(travelGlobalContent[locale].demo.status.verified)
  const v3 = reduce(createInitialTravelDemoState(), { type: 'RUN_SAMPLE' }, { type: 'APPROVE_REQUEST' }, { type: 'GUIDE_CONFIRM' }, { type: 'VERIFY_BEGIN' }, { type: 'VERIFY_COMPLETE' })
  assert.equal(isCurrentConfirmationVerified(v3), true)
  assert.deepEqual([v3.currentBooking.startTime, v3.currentBooking.version], ['09:00', 3])
  const v4 = reduce(v3, { type: 'CHANGE_BOOKING_TIME' }, { type: 'PREPARE_RECONFIRMATION' }, { type: 'APPROVE_REQUEST' }, { type: 'GUIDE_CONFIRM' }, { type: 'VERIFY_BEGIN' }, { type: 'VERIFY_COMPLETE' })
  assert.equal(isCurrentConfirmationVerified(v4), true)
  assert.deepEqual([v4.currentBooking.startTime, v4.currentBooking.version], ['10:30', 4])
}

assert.equal(GOODTIME_URL, 'https://calendar.app.google/KpXGF5RTgqRpg72n6')
const acquisitionSource = await readFile(new URL('../components/travel/TravelAcquisition.tsx', import.meta.url), 'utf8')
assert.match(acquisitionSource, /href=\{GOODTIME_URL\}/)
assert.match(acquisitionSource, /availability === 'unavailable'/)
assert.match(acquisitionSource, /openVideo/)
assert.match(acquisitionSource, /if \(!analyticsConfigured\) return/)

console.log('travel-localization: section parity, dictionary shape, locale-neutral v3/v4 lifecycle, CTA URL, and no-capture guards passed')
