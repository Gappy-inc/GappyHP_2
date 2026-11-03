import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { PrivacySettings } from "@/components/analytics/AnalyticsConsent";
import { productFamily } from "@/content/product-family";
import type { HomeLocale } from "@/content/home-v2";
import {
  COMPANY_ADDRESS,
  CONTACT_EMAIL,
  LEGAL_NAME,
} from "@/lib/config";
import styles from "./EnglishHomeEnd.module.css";

const footerCopy = {
  en: {
    tagline: "The AI workforce for travel operations.",
    groups: ["Product", "Explore", "Company"],
    explore: ["Use cases", "Technology", "Resources", "Travel", "Projects"],
    company: ["About", "Careers", "Contact"],
  },
  ja: {
    tagline: "旅行業務のためのAI Workforce。",
    groups: ["製品", "関連情報", "会社情報"],
    explore: ["活用シーン", "テクノロジー", "資料・記事", "旅行サービス", "プロジェクト"],
    company: ["会社概要", "採用情報", "お問い合わせ"],
  },
} as const;

function FooterLinks({
  title,
  titleId,
  links,
  className,
}: {
  title: string;
  titleId: string;
  links: readonly { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav
      className={`${styles.footerNav} ${className ?? ""}`}
      aria-labelledby={titleId}
    >
      <h2 id={titleId}>{title}</h2>
      <ul>
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function EnglishHomeFooter({ locale }: { locale: HomeLocale }) {
  const copy = footerCopy[locale];
  const base = locale === "ja" ? "/ja" : "";
  const productLinks = productFamily.map(({ displayName, path }) => ({
    label: locale === "ja" ? `${displayName}（英語）` : displayName,
    href: path,
  }));
  const exploreLinks = [
    { label: copy.explore[0], href: `${base || ""}/#use-cases` },
    { label: copy.explore[1], href: `${base}/technology` },
    { label: copy.explore[2], href: `${base}/resources` },
    { label: copy.explore[3], href: `${base}/travel` },
    { label: copy.explore[4], href: `${base}/cases` },
  ];
  const companyLinks = [
    { label: copy.company[0], href: `${base}/about` },
    { label: copy.company[1], href: `${base}/careers` },
    { label: copy.company[2], href: `${base}/contact` },
  ];

  return (
    <footer className={`hv-footer ${styles.footer}`} data-home-chrome data-locale={locale}>
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div className={styles.brand}>
            <BrandMark href={locale === "ja" ? "/ja/" : "/"} />
            <p className={styles.tagline}>{copy.tagline}</p>
            <a className={styles.email} href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
          <FooterLinks title={copy.groups[0]} titleId="footer-product-title" links={productLinks} />
          <FooterLinks title={copy.groups[1]} titleId="footer-explore-title" links={exploreLinks} />
          <FooterLinks
            title={copy.groups[2]}
            titleId="footer-company-title"
            links={companyLinks}
            className={styles.company}
          />
        </div>

        <div className={styles.utility}>
          <div className={`${styles.language} hv-languages`}>
            <LanguageSwitcher />
          </div>
          <p className={styles.legal}>
            {LEGAL_NAME} · {COMPANY_ADDRESS}
          </p>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 Gappy, Inc.</span>
          <PrivacySettings locale={locale} />
        </div>
      </div>
    </footer>
  );
}
