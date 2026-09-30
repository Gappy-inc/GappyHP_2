import PrivacyPage from '@/components/analytics/PrivacyPage'
import { pageMetadata } from '@/lib/metadata'
export const metadata = { ...pageMetadata({ title: 'Privacy and analytics | Gappy', description: 'How optional analytics and privacy choices work on Gappy.', path: '/privacy' }), robots: { index: false, follow: true } }
export default function Page() { return <PrivacyPage locale="en" /> }
