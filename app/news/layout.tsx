import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: `News | ${SITE_NAME}`,
  description:
    '株式会社Gappyの最新情報・プレスリリース。旅ナカAIプラットフォームに関するお知らせやメディア情報をご覧いただけます。',
  openGraph: {
    title: `News | ${SITE_NAME}`,
    description:
      '株式会社Gappyの最新情報・プレスリリース。旅ナカAIプラットフォームに関するお知らせやメディア情報をご覧いただけます。',
    url: `${SITE_URL}/news`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/news`,
  },
}

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

