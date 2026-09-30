import PrivacyPage from '@/components/analytics/PrivacyPage'
import { pageMetadata } from '@/lib/metadata'
export const metadata = { ...pageMetadata({ title: 'プライバシーとアクセス解析 | Gappy', description: 'Gappyの任意のアクセス解析とプライバシー設定について。', path: '/privacy', locale: 'ja' }), robots: { index: false, follow: true } }
export default function Page() { return <PrivacyPage locale="ja" /> }
