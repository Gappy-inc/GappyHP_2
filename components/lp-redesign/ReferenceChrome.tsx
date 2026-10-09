import Image from 'next/image';
import { ChevronRight, Menu } from 'lucide-react';
import logo from '@/public/gappy-logo-official.png';
import { salesUrl } from './content';
import { PrivacySettings } from '@/components/analytics/AnalyticsConsent';
export function Button({ children, href = salesUrl, outline = false }: {
    children: React.ReactNode;
    href?: string;
    outline?: boolean;
}) { return <a className={`ra-button ${outline ? 'ra-outline' : ''}`} href={href}>{children}<ChevronRight size={21}/></a>; }
const navigation = [
    ['機能', '/ja/#features'],
    ['導入の比較ポイント', '/ja/#evaluation'],
    ['資料', '/ja/#resources'],
    ['よくあるご質問', '/ja/#faq'],
];
export function ReferenceHeader() {
    return <header className="ra-site-header">
        <div className="ra-utility"><div className="ra-container"><span>旅行業の予約確認・手配・変更対応を支援</span><a href="/ja/contact">お問い合わせ <ChevronRight size={16}/></a></div></div>
        <div className="ra-nav ra-container">
            <a href="/ja/" aria-label="Gappy ホーム"><Image src={logo} alt="Gappy" width={150} height={69} priority/></a>
            <nav aria-label="メインナビゲーション">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
            <div className="ra-nav-actions"><Button>導入相談</Button></div>
            <details className="ra-menu"><summary aria-label="メニューを開く"><Menu /></summary><nav aria-label="モバイルナビゲーション">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}<a href="/ja/signup">無料登録（準備中）</a><a href={salesUrl}>導入相談</a></nav></details>
        </div>
    </header>;
}
export function ReferenceFooter() {
    return <footer className="ra-container ra-footer"><a href="/ja/" aria-label="Gappy ホーム"><Image src={logo} alt="Gappy" width={120} height={55}/></a><div><a href="/ja/contact">お問い合わせ</a><a href="/ja/about">会社情報</a><PrivacySettings locale="ja"/></div><small>© Gappy</small></footer>;
}
