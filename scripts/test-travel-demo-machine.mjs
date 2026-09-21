import assert from 'node:assert/strict'
import {
  createInitialTravelDemoState,
  isCurrentConfirmationVerified,
  travelDemoReducer,
} from '../lib/travel-demo-machine.ts'

const reduce = (state, ...actions) => actions.reduce(travelDemoReducer, state)

const v3Verified = reduce(
  createInitialTravelDemoState(),
  { type: 'RUN_SAMPLE' },
  { type: 'APPROVE_REQUEST' },
  { type: 'GUIDE_CONFIRM' },
  { type: 'VERIFY_BEGIN' },
  { type: 'VERIFY_COMPLETE' },
)
assert.equal(v3Verified.status, 'verified')
assert.equal(isCurrentConfirmationVerified(v3Verified), true)
assert.deepEqual(
  [v3Verified.currentBooking.startTime, v3Verified.currentBooking.version],
  ['09:00', 3],
)

const changed = travelDemoReducer(v3Verified, { type: 'CHANGE_BOOKING_TIME' })
assert.equal(changed.status, 'reconfirmation')
assert.equal(isCurrentConfirmationVerified(changed), false)
assert.deepEqual(
  [changed.currentBooking.startTime, changed.currentBooking.version],
  ['10:30', 4],
)

const waitingV4 = reduce(
  changed,
  { type: 'PREPARE_RECONFIRMATION' },
  { type: 'APPROVE_REQUEST' },
  { type: 'SET_ROLE', role: 'operations' },
  { type: 'SET_ROLE', role: 'guide' },
)
assert.equal(waitingV4.status, 'waiting')
assert.deepEqual(
  [waitingV4.currentBooking.startTime, waitingV4.currentBooking.version],
  ['10:30', 4],
)
assert.deepEqual(
  [waitingV4.requestSnapshot.startTime, waitingV4.requestSnapshot.version],
  ['10:30', 4],
)

const verifiedV4 = reduce(
  waitingV4,
  { type: 'GUIDE_CONFIRM' },
  { type: 'VERIFY_BEGIN' },
  { type: 'VERIFY_COMPLETE' },
)
assert.equal(verifiedV4.status, 'verified')
assert.equal(isCurrentConfirmationVerified(verifiedV4), true)
assert.deepEqual(
  [verifiedV4.verifiedSnapshot.startTime, verifiedV4.verifiedSnapshot.version],
  ['10:30', 4],
)

const staleReply = reduce(
  changed,
  { type: 'PREPARE_RECONFIRMATION' },
  { type: 'APPROVE_REQUEST' },
  {
    type: 'GUIDE_CONFIRM',
    snapshot: {
      id: '2871',
      title: 'Mt. Fuji Day Tour',
      version: 3,
      startTime: '09:00',
      guide: 'Tanaka',
      meetingPoint: 'Shinjuku West Exit',
    },
  },
  { type: 'VERIFY_BEGIN' },
  { type: 'VERIFY_COMPLETE' },
)
assert.equal(staleReply.status, 'conflict')
assert.equal(isCurrentConfirmationVerified(staleReply), false)

for (const failureAction of ['GUIDE_CANNOT_OPERATE', 'GUIDE_NEEDS_HELP']) {
  const failure = reduce(
    createInitialTravelDemoState(),
    { type: 'RUN_SAMPLE' },
    { type: 'APPROVE_REQUEST' },
    { type: failureAction },
  )
  assert.equal(isCurrentConfirmationVerified(failure), false)
}

const sourceConflict = reduce(
  createInitialTravelDemoState(),
  { type: 'RUN_SAMPLE' },
  { type: 'APPROVE_REQUEST' },
  { type: 'GUIDE_CONFIRM' },
  { type: 'SIMULATE_SOURCE_CONFLICT' },
)
assert.equal(sourceConflict.status, 'conflict')

const repeatedApproval = travelDemoReducer(waitingV4, { type: 'APPROVE_REQUEST' })
assert.deepEqual(repeatedApproval, waitingV4)

const repeatedBookingChange = travelDemoReducer(verifiedV4, { type: 'CHANGE_BOOKING_TIME' })
assert.deepEqual(repeatedBookingChange, verifiedV4)

const reset = travelDemoReducer(verifiedV4, { type: 'RESET' })
assert.deepEqual(reset, createInitialTravelDemoState())

console.log('travel-demo-machine: lifecycle, persistence, failure paths, repeated actions, and reset passed')
