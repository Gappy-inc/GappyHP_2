import type { Metadata } from 'next';
import { ChartNoAxesColumnIncreasing, Users, Box } from 'lucide-react';
import { SITE_URL } from '@/lib/config';
import { ReferenceHeader, ReferenceFooter } from '@/components/lp-redesign/ReferenceChrome';
import '@/components/lp-redesign/reference.css';
import '@/components/signup/signup.css';

export const metadata: Metadata = {
  title: '無料登録 | Gappy',
  description: 'Gappyのアカウント作成。旅行業務特化AI Agentをはじめましょう。',
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/ja/signup` },
};

export default function SignupPage() {
  return (
    <div className="ra"><ReferenceHeader/><main id="main-content" className="su-page" tabIndex={-1}>
      <div className="su-container">
        <h1><span>さあ、</span><span>Gappyをはじめましょう。</span></h1>
        <p className="su-intro">無料登録は現在準備中です。導入をご検討の方は、オンラインでご相談いただけます。</p>

        <section className="su-existing" aria-label="すでにご利用中の方へ">
          <p>すでにGappyをご利用の方へ</p>
          <p className="su-note">このページからのログインは準備中です。ご利用中のサービスのログインページをご利用ください。</p>
          <ul className="su-products" aria-label="Gappyのサービス">
            <li><ChartNoAxesColumnIncreasing aria-hidden="true" /><span><strong>Gappy</strong> Ops</span></li>
            <li><Users aria-hidden="true" /><span><strong>Gappy</strong> Agent</span></li>
            <li><Box aria-hidden="true" /><span><strong>Gappy</strong> Console</span></li>
          </ul>
        </section>

        <section className="su-form" aria-labelledby="signup-email-label">
          <label id="signup-email-label" htmlFor="signup-email">登録用メールアドレス</label>
          <p id="signup-status" className="su-note">現在、登録受付は準備中です。メールアドレスは送信・保存されません。</p>
          <input id="signup-email" disabled type="email" autoComplete="email" inputMode="email" placeholder="メールアドレスを入力" aria-describedby="signup-status" />
          <div className="su-policies">
            <span>Gappy利用規約（準備中）</span><span>サービス共通利用約款（準備中）</span><a href="/ja/privacy">プライバシーポリシー</a>
          </div>
          <button className="su-submit" type="button" disabled aria-describedby="signup-status">登録受付は準備中です</button>
        </section>

        <a className="su-consultation" href="/ja/consultation">導入について相談する</a>
      </div>
    </main><ReferenceFooter/></div>
  );
}
