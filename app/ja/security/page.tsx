import SecurityPage from '@/components/site/SecurityPage'
import { localizedPageMetadata } from '@/lib/metadata'

export const metadata = localizedPageMetadata('ja', 'security')

export default function Page() {
  return <SecurityPage locale="ja" />
}
