import Link from 'next/link'

const GOODTIME_URL = 'https://meet.goodtime.io/w/gappyjp/mitsuki/30-min-video'

const navigation = [
  { label: 'Workflows', href: '/#workflows' },
  { label: 'Cases', href: '/cases' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 pb-8 pt-16 text-white/70">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      <div className="container-luxe relative z-10">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Gappy home">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[12px] font-semibold text-navy-950" aria-hidden="true">G</span>
              <span className="text-lg font-semibold tracking-[-0.02em] text-white">Gappy</span>
            </Link>
            <p className="mt-6 max-w-xl text-[clamp(26px,3.4vw,42px)] font-medium leading-[1.08] tracking-[-0.04em] text-white">
              AI Workforce for<br />Travel Operations
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300">Navigate</p>
              <ul className="mt-5 space-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-white/65 transition-colors hover:text-gold-300">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold-300">Connect</p>
              <div className="mt-5 space-y-3 text-sm">
                <a href={GOODTIME_URL} target="_blank" rel="noopener noreferrer" className="block text-white/65 transition-colors hover:text-gold-300">
                  Talk to Gappy
                </a>
                <a href="mailto:mitsuki@gappy.jp" className="block text-white/65 transition-colors hover:text-gold-300">
                  mitsuki@gappy.jp
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 py-8 text-xs leading-6 text-white/40 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-white/60">株式会社Gappy</p>
            <p>東京都渋谷区道玄坂1丁目10番8号 渋谷道玄坂東急ビル2F</p>
          </div>
          <p>© 2026 Gappy, Inc. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
