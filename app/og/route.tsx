import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const isJapanese = request.nextUrl.searchParams.get('locale') === 'ja'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: '#fdfcf8',
          color: '#0b1632',
          fontFamily: 'Arial, sans-serif',
          padding: '72px 78px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '70%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: 24,
                background: '#0b1632',
                color: '#fff',
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              G
            </div>
            <div style={{ display: 'flex', fontSize: 30, fontWeight: 700 }}>
              Gappy
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                color: '#8e6e32',
                fontSize: 18,
                letterSpacing: 5,
                marginBottom: 24,
              }}
            >
              GAPPY / APPLIED AI
            </div>
            <div
              style={{
                display: 'flex',
                fontSize: 70,
                fontWeight: 700,
                letterSpacing: -4,
                lineHeight: 1.02,
              }}
            >
              {isJapanese ? (
                <>AIが、業務を実行する時代へ。</>
              ) : (
                <>
                  AI that gets
                  <br />
                  business done.
                </>
              )}
            </div>
            <div style={{ display: 'flex', fontSize: 25, marginTop: 28 }}>
              {isJapanese
                ? '業務を実行するAI Workforce · まず旅行業界から'
                : 'AI Workforce for Business Operations · Starting with travel'}
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            right: -70,
            top: -30,
            width: 480,
            height: 690,
            border: '2px solid rgba(201,169,97,.55)',
            borderRadius: 240,
          }}
        />
        {[0, 1, 2, 3, 4].map((index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              position: 'absolute',
              right: 85 + index * 56,
              top: 150 + index * 70,
              width: 18,
              height: 18,
              borderRadius: 9,
              background: index % 2 ? '#c9a961' : '#0b1632',
              boxShadow: '0 0 0 8px rgba(255,255,255,.8)',
            }}
          />
        ))}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { 'Cache-Control': 'public, max-age=86400' },
    },
  )
}
