import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { productFamily, productFamilyCopy } from "@/content/product-family";
import type { HomeLocale } from "@/content/home-v2";
import ProductFamilyReveal from "./ProductFamilyReveal";
import styles from "./ProductFamily.module.css";

const japaneseDescriptions = [
  "予約後の確認・変更対応を、一つの流れに。最新条件、合意状況、未確定事項を整理します。",
  "最新条件に基づいて、確認・再確認を進める。回答のない項目は、未完了のまま残します。",
  "変わった条件と、再確認が必要な合意を把握。見直すべき項目を明確にします。",
  "判断の根拠と必要な承認を確認。未回答や未承認が残る業務を、完了扱いにしません。",
] as const;

export default function ProductFamilyCards({ locale }: { locale: HomeLocale }) {
  const copy = locale === "ja" ? {
    eyebrow: "GAPPY AI WORKFORCEの製品",
    headline: "変更から、根拠付きの完了確認まで。",
    cardLink: "詳しく見る（英語）",
    conceptCaption: "製品コンセプトのイメージです。最終的な機能と対応する連携範囲は、業務ごとに確認します。",
  } : productFamilyCopy;
  return (
    <section
      id="product-family"
      className={styles.cardsSection}
      data-locale={locale}
      aria-labelledby="product-family-title"
    >
      <ProductFamilyReveal className={styles.cardsContainer}>
        <header className={styles.cardsHeading} data-reveal-copy>
          <p>{copy.eyebrow}</p>
          <h2 id="product-family-title">{copy.headline}</h2>
        </header>

        <div className={styles.cardsGrid}>
          {productFamily.map((product, index) => (
            <Link
              key={product.id}
              href={product.path}
              hrefLang={locale === "ja" ? "en" : undefined}
              className={styles.productCard}
              data-reveal-item
              style={{ "--reveal-index": index } as React.CSSProperties}
            >
              <span className={styles.cardArt}>
                <Image
                  src={product.artwork}
                  alt=""
                  width={product.artworkWidth}
                  height={product.artworkHeight}
                  sizes="(max-width: 767px) 86vw, (max-width: 1199px) 42vw, 22vw"
                />
              </span>
              <span className={styles.cardCopy}>
                <strong>{product.displayName}</strong>
                <span>{locale === "ja" ? japaneseDescriptions[index] : product.cardDescription}</span>
                <span className={styles.cardLink}>
                  {copy.cardLink}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <p className={styles.conceptCaption}>{copy.conceptCaption}</p>
      </ProductFamilyReveal>
    </section>
  );
}
