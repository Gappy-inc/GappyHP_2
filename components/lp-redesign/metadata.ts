import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE_URL } from '@/lib/config';
import type { Variant } from './content';
export function previewMetadata(variant: Variant): Metadata {
    const title = `Gappy | 日本語LP デザイン案${variant.toUpperCase()}`;
    const description = '旅行会社・ツアー運営の予約後業務を、AIで前に進める。Gappy AI Workforceの仕組みと導入のご相談。';
    return { title, description, robots: { index: false, follow: false }, alternates: { canonical: `${SITE_URL}/lp-${variant}` }, openGraph: { title, description, url: `${SITE_URL}/lp-${variant}`, locale: 'ja_JP', type: 'website', images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: 'Gappy AI Workforce' }] }, twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE_URL] } };
}
