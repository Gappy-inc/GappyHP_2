import Link from 'next/link'

type BrandMarkProps = {
  inverse?: boolean
}

export default function BrandMark({ inverse = false }: BrandMarkProps) {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 items-center gap-3 rounded-sm"
      aria-label="Gappy home"
    >
      <span
        className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
          inverse ? 'bg-white text-navy-950' : 'bg-navy-900 text-white'
        }`}
        aria-hidden="true"
      >
        G
      </span>
      <span
        className={`text-base font-semibold tracking-[-0.02em] ${
          inverse ? 'text-white' : 'text-navy-900'
        }`}
      >
        Gappy
      </span>
    </Link>
  )
}
