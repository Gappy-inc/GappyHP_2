import Link from 'next/link'
import { AxisMark } from '@/components/GappyAxis'

type BrandMarkProps = { inverse?: boolean; href?: string }

export default function BrandMark({ inverse = false, href = '/' }: BrandMarkProps) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center gap-2" aria-label="Gappy home">
      <AxisMark inverse={inverse} />
      <span className={`text-[1.15rem] font-semibold tracking-[-0.055em] ${inverse ? 'text-white' : 'text-navy-900'}`}>Gappy</span>
    </Link>
  )
}
