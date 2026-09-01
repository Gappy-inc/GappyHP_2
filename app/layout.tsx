import type { Metadata } from 'next'
import { DM_Mono, Noto_Sans_JP, Space_Grotesk } from 'next/font/google'
import { headers } from 'next/headers'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getContent, type Locale } from '@/content'
import {
  COMPANY_ADDRESS,
  CONTACT_EMAIL,
  LEGAL_NAME,
  OG_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
} from '@/lib/config'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: 'Gappy | AI Workforce for Travel Operations',
  description:
    'Gappy builds AI systems that execute complex travel operations across existing software—from trigger to verified completion.',
  keywords: [
    'AI Workforce',
    'Business Operations',
    'Applied AI',
    'Travel Operations',
    '株式会社Gappy',
  ],
  openGraph: {
    title: 'Gappy | AI Workforce for Travel Operations',
    description:
      'Gappy builds AI systems that execute complex travel operations across existing software—from trigger to verified completion.',
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    locale: 'en_US',
    alternateLocale: ['ja_JP'],
    type: 'website',
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: 'Gappy — AI Workforce for Travel Operations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gappy | AI Workforce for Travel Operations',
    description:
      'Gappy builds AI systems that execute complex travel operations across existing software—from trigger to verified completion.',
    images: [OG_IMAGE_URL],
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const requestHeaders = await headers()
  const locale: Locale =
    requestHeaders.get('x-gappy-locale') === 'ja' ? 'ja' : 'en'
  const copy = getContent(locale)

  return (
    <html
      lang={copy.htmlLang}
      className={`${spaceGrotesk.variable} ${notoSansJP.variable} ${dmMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': `${SITE_URL}/#organization`,
                  name: SITE_NAME,
                  legalName: LEGAL_NAME,
                  alternateName: 'Gappy, Inc.',
                  url: `${SITE_URL}/`,
                  logo: {
                    '@type': 'ImageObject',
                    url: `${SITE_URL}/gappy-logo-official.png`,
                  },
                  description:
                    locale === 'ja'
                      ? 'Gappyは、旅行会社の複雑な業務を既存システム横断で完了まで実行するAI Workforceを開発しています。'
                      : 'Gappy builds AI Workforce that executes complex travel operations across existing software through verified completion.',
                  inLanguage: copy.htmlLang,
                  email: CONTACT_EMAIL,
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: COMPANY_ADDRESS,
                    addressLocality: '渋谷区',
                    addressRegion: '東京都',
                    postalCode: '150-0043',
                    addressCountry: 'JP',
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  url: `${SITE_URL}/`,
                  name: SITE_NAME,
                  alternateName: LEGAL_NAME,
                  publisher: { '@id': `${SITE_URL}/#organization` },
                  inLanguage: ['en', 'ja'],
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className="min-h-screen bg-ivory-50 text-ink-900 antialiased"
        data-locale={locale}
      >
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded bg-white px-4 py-3 text-sm font-semibold text-navy-900 shadow-lg transition-transform focus:translate-y-0"
        >
          {copy.navigation.skip}
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
