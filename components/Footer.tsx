
import Link from 'next/link'
import Image from 'next/image'

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video'
const RESOURCE_URL = 'https://forms.gle/NUgbw2pFFrmoLtsv5'

const navCols = [
  {
    title: 'サービス',
    links: [
      { label: '機能',           href: '/#features' },
      { label: 'ご料金',         href: '/#pricing' },
      { label: '仕組み',         href: '/#how-it-works' },
      { label: 'お役立ち資料',   href: RESOURCE_URL, external: true },
    ],
  },
  {
    title: '導入事例・サポート',
    links: [
      { label: '導入事例インタビュー', href: '/cases' },
      { label: 'お問い合わせ',         href: GOODTIME_URL, external: true },
    ],
  },
  {
    title: '会社情報',
    links: [
      { label: 'ミッション・ビジョン',       href: '/about' },
      { label: 'プライバシーに関する方針',    href: '/about' },
    ],
  },
  {
    title: 'リソース',
    links: [
      { label: 'プロダクトアップデート', href: '/news' },
      { label: 'ホスピタリティDXレポート', href: RESOURCE_URL, external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative bg-ink-900 text-ivory-100/80 pt-16 pb-8 overflow-hidden">
      {/* Top gold line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      {/* Background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-64 rounded-full bg-gold-500/[0.04] blur-3xl pointer-events-none" />

      <div className="container-luxe relative z-10">

        {/* Top row — logo + tagline */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-ivory-100/8">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <Image
              src="/gappy_icon.png"
              alt="Gappy Stay"
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="font-serif-jp text-[15px] tracking-[0.12em] text-ivory-100">
              Gappy Stay
            </span>
          </Link>

          <p className="font-serif-jp text-[12px] text-ivory-100/50 tracking-[0.08em] max-w-xs leading-relaxed">
            高級宿泊施設のためのご予約後コミュニケーションAI。
            貴館のブランドのまま自動配信いたします。
          </p>
        </div>

        {/* Nav grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 py-12">
          {navCols.map((col) => (
            <div key={col.title}>
              <p className="font-serif-jp text-[13px] tracking-[0.2em] text-gold-400 mb-5 font-medium">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="font-serif-jp text-[12px] text-ivory-100/70 hover:text-gold-400 transition-colors tracking-[0.06em] flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gold-500/60 group-hover:bg-gold-400 transition-colors flex-shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8 text-[11px] tracking-[0.12em] text-ivory-100/50 font-serif-jp">
          <div className="space-y-1">
            <p className="text-ivory-100/60">株式会社Gappy（ギャッピー）</p>
            <p>東京都渋谷区道玄坂1丁目10番8号 ／ 代表取締役：浅野充輝</p>
            <a href="mailto:mitsuki@gappy.jp" className="hover:text-gold-400 transition-colors">
              mitsuki@gappy.jp
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* SNS placeholder */}
            <a
              href={GOODTIME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-ivory-100/15 hover:border-gold-500/60 hover:bg-gold-500/10 text-ivory-100/70 hover:text-gold-400 flex items-center justify-center transition-all duration-300"
              aria-label="お問い合わせ"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </a>
          </div>
        </div>

        <p className="text-center text-[10px] text-ivory-100/30 font-serif-jp tracking-[0.1em] mt-8">
          © 2026 Gappy, Inc. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
