import Image from 'next/image';
import { ChevronRight, Menu } from 'lucide-react';
import logo from '@/public/gappy-logo-official.png';
import { salesUrl } from './content';
export function Button({ children, href = salesUrl, outline = false }: {
    children: React.ReactNode;
    href?: string;
    outline?: boolean;
}) { return <a className={`ra-button ${outline ? 'ra-outline' : ''}`} href={href}>{children}<ChevronRight size={21}/></a>; }
export function ReferenceHeader({ bookingHref = salesUrl, homePath = "" }: {
    bookingHref?: string;
    homePath?: string;
}) { return (<header><div className="ra-utility"><div className="ra-container"><span>旅行業界の予約後業務を、AIで完了まで。</span><a href="/ja/contact">ヘルプ・お問い合わせ <ChevronRight size={13}/></a></div></div><div className="ra-nav ra-container"><a href="/ja/" aria-label="Gappy 日本語ホーム"><Image src={logo} alt="Gappy" width={150} height={69} priority/></a><nav aria-label="メインナビゲーション"><a href={`${homePath}#features`}>機能</a>{homePath ? <><a href="/lp-a#flow">導入イメージ</a><a href="#businesses">活用領域</a><a href="#consultation-support">導入のご相談</a></> : <><a href="/ja/travel">旅行業での活用</a><a href="#flow">導入の流れ</a><a href="#faq">料金・よくあるご質問</a></>}</nav><div className="ra-nav-actions"><Button href={`${homePath}#resources`} outline>資料を見る</Button><Button href={bookingHref}>Gappyに相談する</Button></div><details className="ra-menu"><summary aria-label="メニューを開く"><Menu /></summary><nav aria-label="モバイルナビゲーション"><a href={`${homePath}#features`}>機能</a><a href={`${homePath}#resources`}>資料を見る</a><a href={homePath ? "#consultation-faq" : "#faq"}>よくあるご質問</a><a href={bookingHref}>Gappyに相談する</a></nav></details></div></header>); }
export function ReferenceFooter() { return (<footer className="ra-container ra-footer"><a href="/ja/" aria-label="Gappy 日本語ホーム"><Image src={logo} alt="Gappy" width={120} height={55}/></a><div><a href="/ja/contact">お問い合わせ</a><a href="/ja/">公式サイト</a><a href="/ja/about">会社情報</a><a href="/ja/privacy">プライバシー</a><a href="/lp-b">デザインB</a><a href="/lp-c">デザインC</a></div><small>© Gappy · Design preview</small></footer>); }
