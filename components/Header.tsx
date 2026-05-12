'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video'
const RESOURCE_URL = 'https://forms.gle/NUgbw2pFFrmoLtsv5'

const NAV_LINKS = [
  { label: '機能',     href: '/#features' },
  { label: '料金',     href: '/#pricing' },
  { label: '導入事例', href: '/cases' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ivory-50/95 backdrop-blur-md border-b border-gold-500/20 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-luxe flex items-center justify-between h-[80px] md:h-[90px]">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 hover:opacity-80 transition-opacity">
          <Image
            src="/gappy_icon.png"
            alt="Gappy Stay"
            width={26}
            height={26}
            className="h-6 w-6"
            priority
          />
          <span
            className="text-navy-900 font-medium text-[15px] tracking-[0.12em]"
            style={{ fontFamily: 'var(--font-noto-serif-jp, serif)' }}
          >
            Gappy Stay
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="relative font-serif-jp text-[11px] tracking-[0.14em] text-navy-900 hover:text-gold-600 transition-colors group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href={RESOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif-jp text-[11px] tracking-[0.14em] text-navy-900 hover:text-gold-600 transition-colors"
          >
            資料ダウンロード
          </Link>
          <Link
            href={GOODTIME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center transition-transform duration-300 hover:scale-[1.03]"
          >
            <Image
              src="/btn-download.png"
              alt="無料相談する"
              width={160}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center"
          aria-label="メニューを開く"
        >
          <span className={`block w-5 h-px bg-navy-900 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[3px]' : ''}`} />
          <span className={`block w-5 h-px bg-navy-900 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-navy-900 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[3px]' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-500 bg-ivory-50 border-b border-gold-500/20 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-luxe py-6 flex flex-col gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="font-serif-jp text-[15px] tracking-[0.18em] text-navy-900 hover:text-gold-600 transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href={RESOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif-jp text-[14px] tracking-[0.18em] text-navy-900"
            >
              資料をダウンロードする
            </Link>
            <Link
              href={GOODTIME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navy text-center"
            >
              無料相談する
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
