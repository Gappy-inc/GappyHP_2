export type DemoStatus =
  | 'idle'
  | 'approval'
  | 'waiting'
  | 'response'
  | 'verifying'
  | 'verified'
  | 'reconfirmation'
  | 'cannot'
  | 'help'
  | 'noReply'
  | 'conflict'

export type RoleView = 'operations' | 'guide'

export type BookingSnapshot = {
  id: '2871'
  title: 'Mt. Fuji Day Tour'
  version: number
  startTime: string
  guide: 'Tanaka'
  meetingPoint: 'Shinjuku West Exit'
}

export type TravelDemoState = {
  currentBooking: BookingSnapshot
  requestSnapshot: BookingSnapshot | null
  responseSnapshot: BookingSnapshot | null
  verifiedSnapshot: BookingSnapshot | null
  status: DemoStatus
  role: RoleView
  activity: string[]
}

export type TravelDemoAction =
  | { type: 'RUN_SAMPLE' }
  | { type: 'PREPARE_RECONFIRMATION' }
  | { type: 'APPROVE_REQUEST' }
  | { type: 'GUIDE_CONFIRM'; snapshot?: BookingSnapshot }
  | { type: 'GUIDE_CANNOT_OPERATE' }
  | { type: 'GUIDE_NEEDS_HELP' }
  | { type: 'VERIFY_BEGIN' }
  | { type: 'VERIFY_COMPLETE' }
  | { type: 'CHANGE_BOOKING_TIME' }
  | { type: 'OPEN_BOOKING_CHANGED' }
  | { type: 'SIMULATE_SOURCE_CONFLICT' }
  | { type: 'OPEN_MISSING_REPLY' }
  | { type: 'SIMULATE_FOLLOW_UP' }
  | { type: 'SET_ROLE'; role: RoleView }
  | { type: 'RESET' }

const initialBooking: BookingSnapshot = {
  id: '2871',
  title: 'Mt. Fuji Day Tour',
  version: 3,
  startTime: '09:00',
  guide: 'Tanaka',
  meetingPoint: 'Shinjuku West Exit',
}

const baseActivity = ['Instruction ready', 'Sample fixture isolated from production']

const cloneBooking = (booking: BookingSnapshot): BookingSnapshot => ({ ...booking })

export function createInitialTravelDemoState(): TravelDemoState {
  return {
    currentBooking: cloneBooking(initialBooking),
    requestSnapshot: null,
    responseSnapshot: null,
    verifiedSnapshot: null,
    status: 'idle',
    role: 'operations',
    activity: [...baseActivity],
  }
}

export function sameBooking(
  left: BookingSnapshot | null,
  right: BookingSnapshot | null,
) {
  return Boolean(
    left
      && right
      && left.id === right.id
      && left.version === right.version
      && left.startTime === right.startTime,
  )
}

function appendActivity(state: TravelDemoState, item: string) {
  return state.activity.includes(item) ? state.activity : [...state.activity, item]
}

export function travelDemoReducer(
  state: TravelDemoState,
  action: TravelDemoAction,
): TravelDemoState {
  switch (action.type) {
    case 'RUN_SAMPLE': {
      const requestSnapshot = cloneBooking(state.currentBooking)
      return {
        ...state,
        requestSnapshot,
        responseSnapshot: null,
        status: 'approval',
        role: 'operations',
        activity: [
          '12 sample bookings loaded',
          `Booking v${requestSnapshot.version} needs confirmation`,
          `${requestSnapshot.startTime} request prepared`,
          'Operator approval requested',
        ],
      }
    }
    case 'PREPARE_RECONFIRMATION': {
      const requestSnapshot = cloneBooking(state.currentBooking)
      return {
        ...state,
        requestSnapshot,
        responseSnapshot: null,
        status: 'approval',
        role: 'operations',
        activity: appendActivity(
          state,
          `Reconfirmation prepared for ${requestSnapshot.startTime} · v${requestSnapshot.version}`,
        ),
      }
    }
    case 'APPROVE_REQUEST': {
      if (state.status !== 'approval' || !state.requestSnapshot) return state
      if (!sameBooking(state.requestSnapshot, state.currentBooking)) {
        return {
          ...state,
          status: 'conflict',
          role: 'operations',
          activity: appendActivity(state, 'Prepared request is stale — approval stopped'),
        }
      }
      return {
        ...state,
        status: 'waiting',
        role: 'guide',
        activity: appendActivity(
          state,
          `Approved request simulated for ${state.requestSnapshot.startTime} · v${state.requestSnapshot.version} — no message sent`,
        ),
      }
    }
    case 'GUIDE_CONFIRM': {
      if (state.status !== 'waiting' || !state.requestSnapshot) return state
      const responseSnapshot = cloneBooking(action.snapshot || state.requestSnapshot)
      return {
        ...state,
        responseSnapshot,
        status: 'response',
        role: 'operations',
        activity: appendActivity(
          state,
          `Guide replied for ${responseSnapshot.startTime} · v${responseSnapshot.version}`,
        ),
      }
    }
    case 'GUIDE_CANNOT_OPERATE':
      if (state.status !== 'waiting') return state
      return {
        ...state,
        status: 'cannot',
        role: 'operations',
        activity: appendActivity(state, 'Guide cannot operate — human handoff required'),
      }
    case 'GUIDE_NEEDS_HELP':
      if (state.status !== 'waiting') return state
      return {
        ...state,
        status: 'help',
        role: 'operations',
        activity: appendActivity(state, 'Guide requested help — human handoff required'),
      }
    case 'VERIFY_BEGIN':
      if (state.status !== 'response' || !state.responseSnapshot) return state
      return {
        ...state,
        status: 'verifying',
        role: 'operations',
        activity: appendActivity(state, 'Current booking snapshot checked'),
      }
    case 'VERIFY_COMPLETE': {
      if (state.status !== 'verifying' || !state.responseSnapshot) return state
      if (!sameBooking(state.responseSnapshot, state.currentBooking)) {
        return {
          ...state,
          status: 'conflict',
          verifiedSnapshot: null,
          activity: appendActivity(
            state,
            `Reply for v${state.responseSnapshot.version} does not match current v${state.currentBooking.version} — verification stopped`,
          ),
        }
      }
      return {
        ...state,
        status: 'verified',
        verifiedSnapshot: cloneBooking(state.responseSnapshot),
        activity: appendActivity(
          state,
          `Confirmation verified for ${state.responseSnapshot.startTime} · v${state.responseSnapshot.version}`,
        ),
      }
    }
    case 'CHANGE_BOOKING_TIME': {
      if (state.status !== 'verified' || state.currentBooking.version !== 3) return state
      const currentBooking: BookingSnapshot = {
        ...state.currentBooking,
        version: state.currentBooking.version + 1,
        startTime: '10:30',
      }
      return {
        ...state,
        currentBooking,
        requestSnapshot: null,
        responseSnapshot: null,
        status: 'reconfirmation',
        role: 'operations',
        activity: [
          ...appendActivity(state, `Booking changed to ${currentBooking.startTime} · v${currentBooking.version}`),
          `Prior v${state.currentBooking.version} confirmation invalidated`,
        ],
      }
    }
    case 'OPEN_BOOKING_CHANGED': {
      const currentBooking: BookingSnapshot = {
        ...initialBooking,
        version: 4,
        startTime: '10:30',
      }
      return {
        ...createInitialTravelDemoState(),
        currentBooking,
        verifiedSnapshot: cloneBooking(initialBooking),
        status: 'reconfirmation',
        activity: [
          '09:00 · v3 confirmation previously verified',
          'Booking changed to 10:30 · v4',
          'Prior v3 confirmation invalidated',
          'Reconfirmation required for current booking',
        ],
      }
    }
    case 'SIMULATE_SOURCE_CONFLICT':
      if (state.status !== 'response') return state
      return {
        ...state,
        status: 'conflict',
        role: 'operations',
        verifiedSnapshot: null,
        activity: appendActivity(state, 'Source conflict detected — verification stopped'),
      }
    case 'OPEN_MISSING_REPLY': {
      const requestSnapshot = cloneBooking(state.currentBooking)
      return {
        ...state,
        requestSnapshot,
        responseSnapshot: null,
        status: 'noReply',
        role: 'operations',
        activity: [
          '12 sample bookings loaded',
          `Request for ${requestSnapshot.startTime} · v${requestSnapshot.version} simulated`,
          'No reply by sample follow-up time',
          'Follow-up due at 15:00',
        ],
      }
    }
    case 'SIMULATE_FOLLOW_UP':
      if (state.status !== 'noReply') return state
      return {
        ...state,
        status: 'waiting',
        role: 'guide',
        activity: appendActivity(state, 'Bounded follow-up simulated'),
      }
    case 'SET_ROLE':
      return { ...state, role: action.role }
    case 'RESET':
      return createInitialTravelDemoState()
    default:
      return state
  }
}

export function isCurrentConfirmationVerified(state: TravelDemoState) {
  return state.status === 'verified'
    && sameBooking(state.verifiedSnapshot, state.currentBooking)
}

export function getTravelDemoStatusLabel(state: TravelDemoState) {
  const labels: Record<DemoStatus, string> = {
    idle: 'READY TO RUN',
    approval: 'NEEDS APPROVAL',
    waiting: 'WAITING FOR GUIDE',
    response: 'RESPONSE RECEIVED',
    verifying: 'VERIFYING',
    verified: isCurrentConfirmationVerified(state) ? 'VERIFIED' : 'NOT VERIFIED',
    reconfirmation: 'RECONFIRMATION REQUIRED',
    cannot: 'CANNOT OPERATE',
    help: 'NEEDS HUMAN HELP',
    noReply: 'FOLLOW-UP DUE',
    conflict: 'SOURCE CONFLICT',
  }
  return labels[state.status]
}

export function getTravelDemoReason(state: TravelDemoState) {
  const booking = state.currentBooking
  const request = state.requestSnapshot
  const response = state.responseSnapshot

  switch (state.status) {
    case 'idle':
      return `No valid confirmation exists for ${booking.startTime} · v${booking.version}.`
    case 'approval':
      return `A request for ${request?.startTime} · v${request?.version} is prepared and waiting for operator approval.`
    case 'waiting':
      return `The approved request for ${request?.startTime} · v${request?.version} is waiting for the guide.`
    case 'response':
      return `The guide replied for ${response?.startTime} · v${response?.version}; current-booking verification is still required.`
    case 'verifying':
      return `The guide response is being compared with current booking v${booking.version}.`
    case 'verified':
      return isCurrentConfirmationVerified(state)
        ? `The current ${booking.startTime} · v${booking.version} confirmation is verified.`
        : 'The available evidence does not verify the current booking.'
    case 'reconfirmation':
      return `The booking changed to ${booking.startTime} · v${booking.version}; the prior confirmation is invalid.`
    case 'cannot':
      return 'The guide cannot operate this tour. Human handoff is required.'
    case 'help':
      return 'The guide requested help. Human handoff is required.'
    case 'noReply':
      return `No reply has been received for ${request?.startTime} · v${request?.version}; bounded follow-up is due.`
    case 'conflict':
      return 'The response and current booking do not agree. Verification is stopped.'
  }
}
