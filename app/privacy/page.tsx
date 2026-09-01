import PrivacyPage from '@/components/site/PrivacyPage'
import { localizedPageMetadata } from '@/lib/metadata'

export const metadata = localizedPageMetadata('en', 'privacy')

export default function Page() {
  return <PrivacyPage locale="en" />
}
