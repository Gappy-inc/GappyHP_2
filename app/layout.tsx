import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Serif_Display, Space_Grotesk, Noto_Serif_JP, Noto_Sans_JP, DM_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE_URL, SITE_NAME, LEGAL_NAME } from '@/lib/config'

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: ['400'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const notoSerifJP = Noto_Serif_JP({
  variable: '--font-noto-serif-jp',
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
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
    'Gappy builds AI Workforce for travel companies, automating booking operations, supplier communications, reconciliation, and other workflows across existing systems.',
  keywords: [
    'AI Workforce',
    'Travel Operations',
    'Booking Operations',
    'Supplier Operations',
    'Travel Automation',
    '株式会社Gappy',
  ],
  openGraph: {
    title: 'Gappy | AI Workforce for Travel Operations',
    description:
      'Gappy builds AI Workforce that executes travel operations end to end across existing systems.',
    url: `${SITE_URL}/`,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og.png`,
        width: 1730,
        height: 909,
        alt: 'Gappy — AI Workforce for Travel Operations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gappy | AI Workforce for Travel Operations',
    description:
      'Gappy builds AI Workforce that executes travel operations end to end across existing systems.',
    images: [`${SITE_URL}/og.png`],
  },
  alternates: {
    canonical: `${SITE_URL}/`,
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
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSerifDisplay.variable} ${spaceGrotesk.variable} ${notoSerifJP.variable} ${notoSansJP.variable} ${dmMono.variable} scroll-smooth`}
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
                    url: `${SITE_URL}/gappy_icon.png`,
                  },
                  description:
                    'Gappy builds AI Workforce for travel companies, automating operational workflows across existing systems.',
                  email: 'mitsuki@gappy.jp',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: '道玄坂1丁目10番8号 渋谷道玄坂東急ビル2F',
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
      <body className="min-h-screen bg-[#FAFAF8] text-[#1C1C1E] antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
