import LeadRequestRoute from '@/components/lead-forms/LeadRequestRoute'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Request a Gappy demo | AI for Travel Operations',
  description: 'Request a tailored walkthrough of Gappy AI Workforce for one recurring travel operations workflow.',
  path: '/request-demo', locale: 'en',
})

export default function Page() { return <LeadRequestRoute locale="en" requestType="demo" /> }
