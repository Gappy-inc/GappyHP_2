import LeadRequestRoute from '@/components/lead-forms/LeadRequestRoute'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Gappyのデモを依頼｜旅行業務のためのAI Workforce',
  description: '旅行業務で繰り返し発生する一つの確認業務に合わせて、Gappy AI Workforceのデモをご案内します。',
  path: '/request-demo', locale: 'ja',
})

export default function Page() { return <LeadRequestRoute locale="ja" requestType="demo" /> }
