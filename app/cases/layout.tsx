import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: `Cases | ${SITE_NAME}`,
  description:
    'Gappyの導入事例・PoC実績。旅ナカAIの実装からデータ活用まで、現場での検証と成果をご紹介します。',
  openGraph: {
    title: `Cases | ${SITE_NAME}`,
    description:
      'Gappyの導入事例・PoC実績。旅ナカAIの実装からデータ活用まで、現場での検証と成果をご紹介します。',
    url: `${SITE_URL}/cases`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/cases`,
  },
}

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

