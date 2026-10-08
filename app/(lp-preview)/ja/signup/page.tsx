import type { Metadata } from 'next';
import Image from 'next/image';
import { ChartNoAxesColumnIncreasing, Users, Box } from 'lucide-react';
import logo from '@/public/gappy-logo-official.png';
import { SITE_URL } from '@/lib/config';
import '@/components/signup/signup.css';

export const metadata: Metadata = {
  title: '無料登録 | Gappy',
  description: 'Gappyのアカウント作成。旅行業務特化AI Agentをはじめましょう。',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/ja/signup` },
};

export default function SignupPage() {
  return (
    <main id="main-content" className="su-page" tabIndex={-1}>
      <div className="su-container">
        <a className="su-logo" href="/lp-a" aria-label="Gappy ホームへ戻る">
          <Image src={logo} alt="Gappy" width={260} height={120} priority />
        </a>
        <h1><span>さあ、</span><span>Gappyをはじめましょう。</span></h1>
        <p className="su-intro">Gappyのご利用には、アカウントの作成が必要です。</p>

        <section className="su-existing" aria-label="すでにご利用中の方へ">
          <p>すでにご利用中のサービスがある場合は、既存のアカウントでログインしてください。</p>
          <p className="su-note">ログイン機能は準備中です。</p>
          <ul className="su-products" aria-label="Gappyのサービス">
            <li><ChartNoAxesColumnIncreasing aria-hidden="true" /><span><strong>Gappy</strong> Ops</span></li>
            <li><Users aria-hidden="true" /><span><strong>Gappy</strong> Agent</span></li>
            <li><Box aria-hidden="true" /><span><strong>Gappy</strong> Console</span></li>
          </ul>
        </section>

        <section className="su-form" aria-labelledby="signup-email-label">
          <label id="signup-email-label" htmlFor="signup-email">下記にメールアドレスを入力してください。</label>
          <p id="signup-status" className="su-note">現在、登録受付は準備中です。メールアドレスは送信・保存されません。</p>
          <input id="signup-email" type="email" autoComplete="email" inputMode="email" placeholder="メールアドレスを入力" aria-describedby="signup-status" />
          <div className="su-policies">
            <span>Gappy利用規約（準備中）</span><span>サービス共通利用約款（準備中）</span><a href="/ja/privacy">プライバシーポリシー</a>
          </div>
          <button className="su-submit" type="button" disabled aria-describedby="signup-status">上記に同意して次へ</button>
        </section>
        <p className="su-login">ログインはこちら <span>（準備中）</span></p>
        <a className="su-consultation" href="/ja/consultation">導入について相談する</a>
      </div>
    </main>
  );
}
