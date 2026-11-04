import CareersLandingPage from '@/components/careers/CareersLandingPage'
import { localizedPageMetadata } from '@/lib/metadata'

export const metadata = localizedPageMetadata('ja', 'careers')

export default function Page() {
  return <CareersLandingPage locale="ja" />
}
