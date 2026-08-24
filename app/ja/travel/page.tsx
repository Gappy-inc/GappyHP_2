import TravelPage from '@/components/site/TravelPage'
import { localizedPageMetadata } from '@/lib/metadata'

export const metadata = localizedPageMetadata('ja', 'travel')

export default function Page() {
  return <TravelPage locale="ja" />
}
