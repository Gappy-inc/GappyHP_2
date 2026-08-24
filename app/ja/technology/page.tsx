import TechnologyPage from '@/components/site/TechnologyPage'
import { localizedPageMetadata } from '@/lib/metadata'

export const metadata = localizedPageMetadata('ja', 'technology')

export default function Page() {
  return <TechnologyPage locale="ja" />
}
