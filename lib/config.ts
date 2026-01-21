/**
 * サイトの基本設定
 * ドメインやURLを一元管理
 */

// 環境変数からドメインを取得、なければデフォルト値を使用
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://gappy.jp'

// ベースURL（プロトコルなし）
export const BASE_DOMAIN = SITE_URL.replace(/^https?:\/\//, '')

// サイト名
export const SITE_NAME = '株式会社Gappy'

