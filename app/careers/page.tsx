import CareersLandingPage from '@/components/careers/CareersLandingPage'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Careers at Gappy | Build the AI Workforce for Travel Operations',
  description: 'Join Gappy as we build the AI workforce for travel operations across Asia. Explore GTM and Development Engineer opportunities.',
  path: '/careers',
  includeJapaneseAlternate: false,
})

export default function Page() {
  return <CareersLandingPage />
}
