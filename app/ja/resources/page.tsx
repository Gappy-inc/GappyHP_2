import InsightsPage from '@/components/site/InsightsPage'
import { localizedPageMetadata } from '@/lib/metadata'

export const metadata = localizedPageMetadata('ja', 'insights')

export default function Page() {
  return <InsightsPage locale="ja" />
}
