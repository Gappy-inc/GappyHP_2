import Image from 'next/image'
import Link from 'next/link'
import officialLogo from '@/public/gappy-logo-official.png'

type BrandMarkProps = { inverse?: boolean; href?: string; priority?: boolean }

export default function BrandMark({ inverse = false, href = '/', priority = true }: BrandMarkProps) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center" aria-label="Gappy home">
      <Image
        src={officialLogo}
        alt=""
        priority={priority}
        className={inverse ? 'h-[42px] w-auto' : 'h-[34px] w-auto'}
      />
    </Link>
  )
}
