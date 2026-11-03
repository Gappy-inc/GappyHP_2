import LeadRequestRoute from '@/components/lead-forms/LeadRequestRoute'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Request the Gappy overview | AI for Travel Operations',
  description: 'Request an overview of Gappy AI Workforce and its approach to confirmation, change, evidence and approval work.',
  path: '/request-brochure', locale: 'en',
})

export default function Page() { return <LeadRequestRoute locale="en" requestType="brochure" /> }
