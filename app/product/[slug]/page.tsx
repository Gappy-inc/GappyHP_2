import { notFound } from "next/navigation";
import ProductFamilyPage from "@/components/product-family/ProductFamilyPage";
import { getProductBySlug, productFamily } from "@/content/product-family";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return productFamily.map((product) => ({
    slug: product.path.split("/").at(-1) as string,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return pageMetadata({
    locale: "en",
    path: product.path,
    title: `${product.displayName} | Gappy`,
    description: product.description,
    includeJapaneseAlternate: false,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return <ProductFamilyPage product={product} />;
}
