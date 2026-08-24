import CareersPage from '@/components/site/CareersPage'
import { localizedPageMetadata } from '@/lib/metadata'

export const metadata = localizedPageMetadata('ja', 'careers')

export default function Page() {
  return <CareersPage locale="ja" />
}
