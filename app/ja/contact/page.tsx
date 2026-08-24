import ContactPage from '@/components/site/ContactPage'
import { localizedPageMetadata } from '@/lib/metadata'

export const metadata = localizedPageMetadata('ja', 'contact')

export default function Page() {
  return <ContactPage locale="ja" />
}
