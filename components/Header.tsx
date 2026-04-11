'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const CONTACT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeSSQ4jbQusmwcpyYt7OQbqsDSUzbJk2COF_7UYZdHXF9e5Og/viewform'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 border-b border-white/[0.08]"
      style={{ background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(12px)' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Image
              src="/gappy_icon.png"
              alt="Gappy"
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
            <span className="text-[#00E676] font-bold text-lg tracking-tight">
              Gappy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="#problem" className="text-white/60 hover:text-white text-sm transition-colors">
              課題
            </Link>
            <Link href="#how-it-works" className="text-white/60 hover:text-white text-sm transition-colors">
              仕組み
            </Link>
            <Link href="#roi" className="text-white/60 hover:text-white text-sm transition-colors">
              ROI
            </Link>
            <Link href="/cases" className="text-white/60 hover:text-white text-sm transition-colors">
              導入事例
            </Link>
            <Link href="/about" className="text-white/60 hover:text-white text-sm transition-colors">
              会社情報
            </Link>
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#00E676] text-black px-5 py-2 rounded-lg text-sm font-bold hover:shadow-[0_0_20px_rgba(0,230,118,0.5)] transition-all"
            >
              お問い合わせ
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white/70 hover:text-white"
            aria-label="メニューを開く"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/[0.08] pt-4 space-y-1">
            <Link href="#problem" onClick={() => setIsMenuOpen(false)} className="block py-2 text-white/70 hover:text-white text-sm">
              課題
            </Link>
            <Link href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="block py-2 text-white/70 hover:text-white text-sm">
              仕組み
            </Link>
            <Link href="#roi" onClick={() => setIsMenuOpen(false)} className="block py-2 text-white/70 hover:text-white text-sm">
              ROI
            </Link>
            <Link href="/cases" className="block py-2 text-white/70 hover:text-white text-sm">
              導入事例
            </Link>
            <Link href="/about" className="block py-2 text-white/70 hover:text-white text-sm">
              会社情報
            </Link>
            <Link
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-3 bg-[#00E676] text-black px-4 py-3 rounded-lg font-bold text-center text-sm"
            >
              お問い合わせ / デモ相談
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
