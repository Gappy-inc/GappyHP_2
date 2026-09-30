import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import { homeCopy, type HomeLocale } from "@/content/home-v2";
import {
  COMPANY_ADDRESS,
  CONTACT_EMAIL,
  GOODTIME_URL,
  LEGAL_NAME,
} from "@/lib/config";
import "./home-v2.css";
import { PrivacySettings } from '@/components/analytics/AnalyticsConsent';

export default function HomeFooter({ locale }: { locale: HomeLocale }) {
  const c = homeCopy[locale];
  const base = locale === "ja" ? "/ja" : "";
  return (
    <footer className="home-v2 hv-footer" data-home-chrome>
      <div className="hv-container">
        <div className="hv-footer-grid">
          <div>
            <BrandMark href={`${base}/`} />
            <p>{c.tagline}</p>
          </div>
          <nav
            aria-label={
              locale === "ja" ? "フッターナビゲーション" : "Footer navigation"
            }
          >
            {c.footer.map((label, i) => (
              <Link
                key={label}
                href={`${base}/${["technology", "travel", "cases", "resources", "about", "careers", "contact"][i]}`}
              >
                {label}
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </nav>
          <div className="hv-footer-contact">
            <a href={GOODTIME_URL}>
              {c.bookingCta}
              <ArrowUpRight size={16} />
            </a>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <p>
              {LEGAL_NAME}
              <br />
              {COMPANY_ADDRESS}
            </p>
          </div>
        </div>
        <div className="hv-footer-bottom">
          <span>© 2026 Gappy, Inc.</span>
          <PrivacySettings locale={locale} />
          <div className="hv-languages">
            <Link href="/" aria-current={locale === "en" ? "page" : undefined}>
              EN
            </Link>
            <span>/</span>
            <Link
              href="/ja/"
              aria-current={locale === "ja" ? "page" : undefined}
            >
              JP
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
