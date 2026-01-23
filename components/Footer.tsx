import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-white text-gappy-dark motion-safe:animate-fade-up">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center transition-transform duration-200 hover:scale-105 w-fit">
              <Image
                src="/gappy_icon.png"
                alt="Gappy"
                width={40}
                height={40}
                className="h-10 w-10"
                priority
              />
              <span className="text-[#00FF7D] font-bold text-lg -ml-1">
                Gappy
              </span>
            </Link>
            <div className="text-sm text-gray-600 space-y-1 mt-6">
              <p className="font-semibold text-gappy-dark">株式会社Gappy（ギャッピー）</p>
              <p>東京都渋谷区</p>
              <p>代表取締役：浅野充輝</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4 text-gappy-dark">ナビゲーション</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/solutions" className="hover:text-gappy-green transition-colors">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-gappy-green transition-colors">
                  Cases
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gappy-green transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-gappy-green transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gappy-green transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4 text-gappy-dark">プロダクト</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/solutions/platform" className="hover:text-gappy-green transition-colors">
                  Gappy Platform
                </Link>
              </li>
              <li>
                <Link href="/solutions/partners" className="hover:text-gappy-green transition-colors">
                  Gappy for Partners
                </Link>
              </li>
              <li>
                <Link href="/solutions/insight" className="hover:text-gappy-green transition-colors">
                  Gappy Insight / Studio
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-sm text-gray-500 text-center">
          <p>© 2026 Gappy, Inc. All Rights Reserved.</p>
        </div>
      </nav>
    </footer>
  )
} 