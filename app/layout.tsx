import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE_URL, SITE_NAME } from '@/lib/config'

export const metadata: Metadata = {
  title: `${SITE_NAME} | 旅ナカの「いま・ここでできること」をAIで可視化する`,
  description:
    '株式会社Gappy（ギャッピー）は、インバウンド旅行者の滞在中の意思決定を支援するタビナカ特化AIプラットフォームです。15〜120分の隙間時間（Gap-time）に特化し、「いま・ここからできること」をAIで可視化します。',
  keywords: [
    '株式会社Gappy',
    'Gappy',
    'ギャッピー',
    '旅ナカ',
    'タビナカ',
    'インバウンド',
    '観光DX',
    'AIプラットフォーム',
    '訪日旅行',
  ],
  openGraph: {
    title: `${SITE_NAME} | 旅ナカの「いま・ここでできること」をAIで可視化する`,
    description:
      '株式会社Gappy（ギャッピー）は、インバウンド旅行者の滞在中の意思決定を支援するタビナカ特化AIプラットフォームです。',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/gappy-logo.svg`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | 旅ナカの「いま・ここでできること」をAIで可視化する`,
    description:
      '株式会社Gappy（ギャッピー）は、インバウンド旅行者の滞在中の意思決定を支援するタビナカ特化AIプラットフォームです。',
    images: [`${SITE_URL}/gappy-logo.svg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_NAME,
              alternateName: 'Gappy Inc.',
              url: SITE_URL,
              logo: `${SITE_URL}/gappy-logo.svg`,
              description:
                '株式会社Gappy（ギャッピー）は、インバウンド旅行者の滞在中の意思決定を支援するタビナカ特化AIプラットフォームです。',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '道玄坂1丁目10番8号 渋谷道玄坂東急ビル2F',
                addressLocality: '渋谷区',
                addressRegion: '東京都',
                postalCode: '150-0043',
                addressCountry: 'JP',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'mitsuki@gappy.jp',
                telephone: '+81-70-1185-3131',
                contactType: 'customer service',
                availableLanguage: ['ja', 'en'],
              },
              sameAs: [SITE_URL],
            }),
          }}
        />
      </head>
      <body className="bg-white text-gappy-dark">
        <Header />
        <main className="min-h-screen">
          <div className="motion-safe:animate-fade-in">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
} 
 