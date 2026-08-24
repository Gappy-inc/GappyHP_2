import AboutPage from '@/components/site/AboutPage'
import { localizedPageMetadata } from '@/lib/metadata'

export const metadata = localizedPageMetadata('ja', 'about')

export default function Page() {
  return <AboutPage locale="ja" />
}
