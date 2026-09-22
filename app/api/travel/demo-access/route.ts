import { NextResponse } from 'next/server'
import {
  handleTravelLeadRequest,
  loadTravelLeadConfiguration,
} from '@/lib/travel-acquisition-server'

export const runtime = 'nodejs'

export async function GET() {
  const configuration = loadTravelLeadConfiguration()
  return NextResponse.json(
    {
      available: configuration !== null,
      privacyNoticeUrl: configuration?.privacyNotice.toString() || null,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

export async function POST(request: Request) {
  return handleTravelLeadRequest(request)
}
