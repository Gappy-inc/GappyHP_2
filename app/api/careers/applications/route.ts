import { handleCareerApplication, loadCareersReceiverConfiguration } from '@/lib/careers-applications-server'

export const runtime = 'nodejs'

export function GET() {
  return Response.json({ available: Boolean(loadCareersReceiverConfiguration()) }, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(request: Request) {
  return handleCareerApplication(request)
}
