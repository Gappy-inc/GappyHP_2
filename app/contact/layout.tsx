import type { Metadata } from 'next'
import { SITE_URL, SITE_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description:
    'PoC・共創プロジェクトのご相談や、サービスに関するお問い合わせはこちらからお気軽にご連絡ください。',
  openGraph: {
    title: `Contact | ${SITE_NAME}`,
    description:
      'PoC・共創プロジェクトのご相談や、サービスに関するお問い合わせはこちらからお気軽にご連絡ください。',
    url: `${SITE_URL}/contact`,
    type: 'website',
  },
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

