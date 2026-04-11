import type { Metadata } from 'next'
import { Space_Grotesk, Noto_Serif_JP, Noto_Sans_JP, DM_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE_URL, SITE_NAME } from '@/lib/config'

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
  title: `Gappy Stay | ホテル向けAIアップセル自動化ツール — RevPAR・客室単価を向上`,
  description:
    '宿泊ゲストのスマホに最適タイミングで自動提案。人手ゼロで客室単価・RevPARを向上させるホテル向けAIアップセルSaaS。初期費用¥0・成功報酬型。PMS直接連携不要で最短1週間導入。',
  keywords: [
    'Gappy Stay',
    'ホテル アップセル',
    'RevPAR向上',
    '客室単価向上',
    'インバウンド ホテル',
    'ホテル AI',
    '宿泊施設 DX',
    '旅館 収益向上',
    '株式会社Gappy',
  ],
  openGraph: {
    title: `Gappy Stay | ホテル向けAIアップセル自動化ツール`,
    description:
      '宿泊ゲストのスマホに最適タイミングで自動提案。人手ゼロで客室単価・RevPARを向上。初期費用¥0・成功報酬型。',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/gappy-logo.svg`,
        width: 1200,
        height: 630,
        alt: 'Gappy Stay',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Gappy Stay | ホテル向けAIアップセル自動化ツール`,
    description:
      '宿泊ゲストのスマホに最適タイミングで自動提案。人手ゼロで客室単価・RevPARを向上。',
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
    <html
      lang="ja"
      className={`${spaceGrotesk.variable} ${notoSerifJP.variable} ${notoSansJP.variable} ${dmMono.variable}`}
    >
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
                '宿泊ゲストのスマホに最適タイミングでアップセルを自動提案。人手ゼロで客室単価・RevPARを向上させるホテル向けAI SaaS。',
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
      <body className="min-h-screen bg-[#0A0A0A] text-white antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
 