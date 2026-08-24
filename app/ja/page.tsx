import HomePage from '@/components/site/HomePage'
import { localizedPageMetadata } from '@/lib/metadata'

export const metadata = localizedPageMetadata('ja', 'home')

export default function Page() {
  return <HomePage locale="ja" />
}
