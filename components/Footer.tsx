import Link from 'next/link'
import Image from 'next/image'

const CONTACT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08]" style={{ background: '#0A0A0A' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity w-fit">
              <Image
                src="/gappy_icon.png"
                alt="Gappy"
                width={32}
                height={32}
                className="h-8 w-8"
                priority
              />
              <span className="text-[#00E676] font-bold text-lg">
                Gappy
              </span>
            </Link>
            <p className="text-white/40 text-xs mt-3 mb-6 max-w-xs leading-relaxed">
              ホテル向けAIアップセル自動化SaaS。宿泊ゲストのスマホに最適タイミングで提案し、
              客室単価・RevPARを向上させる。
            </p>
            <div className="text-xs text-white/30 space-y-1">
              <p className="text-white/50 font-medium">株式会社Gappy（ギャッピー）</p>
              <p>東京都渋谷区道玄坂1丁目10番8号</p>
              <p>代表取締役：浅野充輝</p>
              <p>mitsuki@gappy.jp</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white/60 text-xs font-bold tracking-widest uppercase mb-4">Menu</h3>
            <ul className="space-y-2 text-sm text-white/40">
              <li>
                <Link href="/cases" className="hover:text-[#00E676] transition-colors">
                  導入事例
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00E676] transition-colors">
                  会社情報
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#00E676] transition-colors">
                  ニュース
                </Link>
              </li>
              <li>
                <Link
                  href={CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00E676] transition-colors"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div>
            <h3 className="text-white/60 text-xs font-bold tracking-widest uppercase mb-4">お問い合わせ</h3>
            <p className="text-white/40 text-xs leading-relaxed mb-4">
              導入検討・デモ相談・資料請求は<br />お気軽にご連絡ください。
            </p>
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#00E676] text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] transition-all"
            >
              無料相談する →
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 text-xs text-white/20 text-center">
          <p>© 2026 Gappy, Inc. All Rights Reserved.</p>
        </div>
      </nav>
    </footer>
  )
}  