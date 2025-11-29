# ドメイン設定ガイド

## 現在のドメイン設定

- **本番URL**: `https://official.gappy.jp`
- **設定ファイル**: `lib/config.ts`

## ドメインの変更方法

### 1. 環境変数での設定（推奨）

環境変数 `NEXT_PUBLIC_SITE_URL` を設定することで、ドメインを変更できます。

```bash
# .env.local ファイルを作成
NEXT_PUBLIC_SITE_URL=https://official.gappy.jp
```

### 2. コード内のデフォルト値の変更

`lib/config.ts` のデフォルト値を変更することも可能です。

```typescript
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://official.gappy.jp'
```

## ドメインの選択肢とベストプラクティス

### 1. サブドメイン（現在の選択: `official.gappy.jp`）

**メリット:**
- 他のサービス（例: `app.gappy.jp`、`blog.gappy.jp`）と分離できる
- 独立したDNS設定が可能
- SSL証明書を個別に管理できる

**デメリット:**
- サブドメイン間でのCookie共有が制限される
- 検索エンジンはサブドメインを別サイトとして扱う場合がある

**SEOへの影響:**
- サブドメインはドメインとは別のサイトとして扱われる可能性がある
- ドメインオーソリティの分散に注意

### 2. ドメインルート（`gappy.jp`）

**メリット:**
- シンプルで覚えやすい
- ドメインオーソリティが集中
- 最もSEOに有利

**デメリット:**
- 他のサービスと同一ドメインで運用する必要がある

**推奨される場合:**
- メインの企業サイトとして使用する場合
- ブランドの主要なWebサイトとして位置づける場合

### 3. wwwサブドメイン（`www.gappy.jp`）

**メリット:**
- 伝統的なWebサイトの表記
- ドメインルートとwwwの両方を運用可能

**デメリット:**
- `www` の有無で重複コンテンツになる可能性がある
- canonical URLで統一する必要がある

## 推奨設定

### 現在の状況: `official.gappy.jp` を使用

**理由:**
- 他のサービス（アプリ、API等）と明確に分離できる
- 将来的な拡張性が高い

### SEO対策

1. **Canonical URLの設定**: ✅ 完了（すべてのページに設定済み）
2. **サイトマップ**: ✅ 完了（`/sitemap.xml` に含まれる）
3. **robots.txt**: ✅ 完了（サイトマップを参照）

### 重要な注意点

1. **メールドメインとの関係**
   - メールアドレス（`mitsuki@gappy.jp`）は変更不要
   - メールドメインとWebサイトドメインは別物

2. **SSL証明書**
   - `official.gappy.jp` 用のSSL証明書を取得・設定する必要がある
   - Let's Encryptなどの無料証明書が使用可能

3. **DNS設定**
   ```
   official.gappy.jp  Aレコード  → サーバーのIPアドレス
   official.gappy.jp  CNAMEレコード → ホスティングサービスのドメイン（場合により）
   ```

4. **リダイレクト設定**
   - 旧ドメイン（`gappy.jp`）から新ドメイン（`official.gappy.jp`）へのリダイレクトを設定することを検討
   - 301リダイレクト（恒久的なリダイレクト）を使用

## 環境別の設定例

### 開発環境
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### ステージング環境
```bash
NEXT_PUBLIC_SITE_URL=https://staging.gappy.jp
```

### 本番環境
```bash
NEXT_PUBLIC_SITE_URL=https://official.gappy.jp
```

## 設定が反映される箇所

以下のファイルで `SITE_URL` が使用されています：

- ✅ `app/layout.tsx` - メタデータ、OG画像、JSON-LD
- ✅ `app/page.tsx` - ホームページのメタデータ
- ✅ `app/about/page.tsx` - Aboutページのメタデータとリンク
- ✅ `app/news/layout.tsx` - Newsページのメタデータ
- ✅ `app/cases/layout.tsx` - Casesページのメタデータ
- ✅ `app/contact/layout.tsx` - Contactページのメタデータ
- ✅ `app/solutions/page.tsx` - Solutionsページのメタデータ
- ✅ `app/solutions/platform/page.tsx` - Platformページのメタデータ
- ✅ `app/solutions/partners/page.tsx` - Partnersページのメタデータ
- ✅ `app/solutions/insight/page.tsx` - Insightページのメタデータ
- ✅ `app/sitemap.xml/route.ts` - サイトマップ
- ✅ `app/robots.txt/route.ts` - robots.txtのサイトマップURL

## 次のステップ

1. **DNS設定**: `official.gappy.jp` をサーバーに指向
2. **SSL証明書の取得**: Let's Encryptまたは商用証明書
3. **リダイレクト設定**: 旧ドメインから新ドメインへ（必要に応じて）
4. **Google Search Console**: 新ドメインを登録
5. **環境変数の設定**: 本番環境で `NEXT_PUBLIC_SITE_URL` を設定

