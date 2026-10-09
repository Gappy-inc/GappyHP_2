import { Inter } from 'next/font/google';
import ReferenceLanding from '@/components/lp-redesign/ReferenceLanding';
import { pageMetadata } from '@/lib/metadata';

const inter = Inter({ subsets: ['latin'], variable: '--lp-font-inter', display: 'swap' });
export const metadata = pageMetadata({
  locale: 'ja',
  path: '/',
  title: 'Gappy | 旅行業務特化AI Agent',
  description: '旅行会社・ツアー運営の予約後業務を支援。予約確認・催促・変更・照合から完了確認まで、Gappyの機能と導入方法をご紹介します。',
});

export default function Page() {
  return <div className={inter.variable}><ReferenceLanding /></div>;
}
