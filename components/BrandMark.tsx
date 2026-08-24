import Image from 'next/image'
import Link from 'next/link'
import officialLogo from '@/public/gappy-logo-official.png'

type BrandMarkProps = { inverse?: boolean; href?: string }

export default function BrandMark({ inverse = false, href = '/' }: BrandMarkProps) {
  return (
    <Link href={href} className="inline-flex min-h-11 items-center" aria-label="Gappy home">
      <Image
        src={officialLogo}
        alt=""
        priority
        className={inverse ? 'h-[42px] w-auto' : 'h-[34px] w-auto'}
      />
    </Link>
  )
}
