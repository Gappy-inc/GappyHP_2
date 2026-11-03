import HomePage from '@/components/home-v2/HomePageV2';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  locale: 'ja',
  path: '/',
  title: 'Gappy AI Workforce｜旅行業務のためのAI Workforce',
  description: '旅行会社の予約後業務を支援するGappy AI Workforce。条件変更後の最新合意・未確定事項・根拠を整理し、人の承認のもとで確認・再確認を進めます。',
});

export default function Page() {
  return <HomePage locale="ja" />;
}
