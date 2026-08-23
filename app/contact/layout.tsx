import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/config'

export const metadata: Metadata = {
  title: `Contact | Gappy`,
  description:
    'Talk to Gappy about AI Workforce for travel operations, design partnerships, investing, engineering, media, or strategic collaboration.',
  openGraph: {
    title: `Contact | Gappy`,
    description:
      'Talk to Gappy about AI Workforce for travel operations and design partnerships.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: [`${SITE_URL}/og.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact | Gappy',
    description: 'Talk to Gappy about AI Workforce for travel operations and design partnerships.',
    images: [`${SITE_URL}/og.png`],
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
