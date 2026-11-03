import LeadRequestRoute from '@/components/lead-forms/LeadRequestRoute'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Gappyの概要資料をリクエスト｜旅行業務のためのAI Workforce',
  description: 'Gappy AI Workforceの考え方と、確認・変更・根拠・承認を支援する4つの機能について概要資料をご案内します。',
  path: '/request-brochure', locale: 'ja',
})

export default function Page() { return <LeadRequestRoute locale="ja" requestType="brochure" /> }
