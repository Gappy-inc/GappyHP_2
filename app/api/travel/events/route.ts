import { handleTravelEventRequest } from '@/lib/travel-acquisition-server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  return handleTravelEventRequest(request)
}
