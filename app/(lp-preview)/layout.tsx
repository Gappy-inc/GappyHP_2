import { Inter } from 'next/font/google'
import '@/components/lp-redesign/lp.css'
const inter = Inter({ subsets: ['latin'], variable: '--lp-font-inter', display: 'swap' })
export default function PreviewLayout({children}:{children:React.ReactNode}) {return <div className={inter.variable}>{children}</div>}
