'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const CONTACT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform'

const NAV_LINKS = [
  { label: '仕組み', href: '/#how-it-works' },
  { label: '導入事例', href: '/cases' },
  { label: '会社情報', href: '/about' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.06]"
      style={{ background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(16px)' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src="/gappy_icon.png"
              alt="Gappy"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="text-[#00E676] font-bold text-base tracking-tight">Gappy</span>
          </Link>

          {/* Desktop nav + CTAs — right aligned */}
          <div className="hidden md:flex items-center gap-1 ml-auto">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 text-sm text-white/55 hover:text-white rounded-md hover:bg-white/[0.05] transition-all"
              >
                {label}
              </Link>
            ))}
            <div className="w-px h-4 bg-white/10 mx-2" />
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm text-white/70 border border-white/20 rounded-lg hover:border-white/40 hover:text-white transition-all"
            >
              資料請求
            </Link>
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-sm font-bold text-black bg-[#00E676] rounded-lg hover:shadow-[0_0_16px_rgba(0,230,118,0.5)] transition-all"
            >
              デモ相談 →
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex-shrink-0 text-white/60 hover:text-white transition-colors p-1"
            aria-label="メニューを開く"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/[0.06] py-4 space-y-1">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-2 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.04] rounded-md transition-all"
              >
                {label}
              </Link>
            ))}
            <div className="pt-3 space-y-2">
              <Link
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-3 text-sm text-white/70 border border-white/20 rounded-lg"
              >
                資料請求
              </Link>
              <Link
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-3 text-sm font-bold text-black bg-[#00E676] rounded-lg"
              >
                デモ相談 →
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
