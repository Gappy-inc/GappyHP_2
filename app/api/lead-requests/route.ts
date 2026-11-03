import { handleLeadRequest, loadLeadReceiverConfiguration } from '@/lib/lead-forms-server'

export const runtime = 'nodejs'

export async function GET() {
  return Response.json(
    { available: loadLeadReceiverConfiguration() !== null },
    { headers: { 'Cache-Control': 'no-store' } },
  )
}

export async function POST(request: Request) {
  return handleLeadRequest(request)
}
