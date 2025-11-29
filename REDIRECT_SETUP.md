# リダイレクト設定ガイド

## ⚠️ 重要な前提条件

**異なるプロジェクト/アプリケーションの場合、コード内でリダイレクトを設定することはできません。**

リダイレクトが機能するのは以下の場合のみです：
- ✅ **同じプロジェクト内**で複数ドメインを扱う場合（例：Vercelで両方のドメインを同じプロジェクトに追加）
- ✅ 同一プロジェクト内でのパスリダイレクト（例：`/old-page` → `/new-page`）

**異なるプロジェクトの場合**は、以下でリダイレクトを設定する必要があります：
- DNS/CDNレベル（Cloudflare等）
- 旧ドメイン側で別のアプリケーション（リダイレクト専用）を動かす

## リダイレクトの設定方法

### 前提：どちらのケースですか？

#### ケース1: 同じプロジェクト内で複数ドメインを扱う場合

同じVercelプロジェクトに`gappy.jp`と`official.gappy.jp`の両方を追加する場合は、コードでリダイレクトを設定できます。

#### ケース2: 異なるプロジェクトの場合

旧ドメイン（`gappy.jp`）と新ドメイン（`official.gappy.jp`）が別々のプロジェクト/アプリケーションとして動いている場合は、コード内では設定できません。

### 1. 同じプロジェクト内で複数ドメインを扱う場合（Vercel）

**前提条件**: 同じVercelプロジェクトに両方のドメインを追加している場合

#### 方法A: Vercelダッシュボードで設定

1. Vercelダッシュボードにログイン
2. **同じプロジェクト**を選択
3. Settings → Domains に移動
4. 旧ドメイン（`gappy.jp`）を追加（新ドメインも追加済みであること）
5. Settings → Redirects でリダイレクトルールを設定

#### 方法B: `vercel.json`で設定

同じプロジェクトに`vercel.json`ファイルを作成：

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "gappy.jp"
        }
      ],
      "destination": "https://official.gappy.jp/:path*",
      "permanent": true
    }
  ]
}
```

**注意**: これは同じプロジェクト内で両方のドメインが設定されている場合のみ機能します。

### 2. 同一プロジェクト内でのパスリダイレクト（Next.js）

**同一プロジェクト内**でパスを変更する場合に使用します：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // パスベースのリダイレクト例
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true, // 301リダイレクト
      },
    ]
  },
}
```

**注意**: これは同じプロジェクト内でのパスリダイレクトのみです。異なるドメイン間のリダイレクトには使用できません。

### 3. 異なるプロジェクトの場合：DNS/CDNレベルで設定（推奨）

**異なるプロジェクト/アプリケーションの場合**は、これが唯一の方法です。

#### Cloudflareの場合（最も一般的）

1. Cloudflareダッシュボードにログイン
2. 旧ドメイン（`gappy.jp`）を選択
3. Rules → Redirect Rules で設定
4. Source URL: `gappy.jp/*`
5. Destination URL: `https://official.gappy.jp/$1`
6. Status Code: 301 (Permanent Redirect)

これにより、旧ドメインにアクセスした際に自動的に新ドメインにリダイレクトされます。

#### その他の方法

- **DNSレベル**: 旧ドメインを新ドメインのIPアドレスに向ける（ただし、これはリダイレクトではなく、単なるホスティングの変更）
- **旧ドメイン側でリダイレクト専用アプリを動かす**: 最小限のアプリケーションでリダイレクトのみを行う

## 推奨される設定

### Vercelを使用している場合

**推奨**: `vercel.json`で設定する方法

理由：
- サーバー側で処理されるため、パフォーマンスが良い
- 設定がシンプルで管理しやすい
- Vercelの機能を最大限に活用できる

### 設定例

プロジェクトルートに`vercel.json`を作成：

```json
{
  "redirects": [
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "gappy.jp"
        }
      ],
      "destination": "https://official.gappy.jp/:path*",
      "permanent": true
    },
    {
      "source": "/:path*",
      "has": [
        {
          "type": "host",
          "value": "www.gappy.jp"
        }
      ],
      "destination": "https://official.gappy.jp/:path*",
      "permanent": true
    }
  ]
}
```

### リダイレクトの種類

1. **301リダイレクト（Permanent）**: 恒久的なリダイレクト
   - 検索エンジンが新しいURLを優先する
   - SEOに最も適している
   - ドメイン変更時に推奨

2. **302リダイレクト（Temporary）**: 一時的なリダイレクト
   - 一時的な変更に使用
   - SEO的には推奨されない

## 現在の設定状況

- ✅ `next.config.js`にリダイレクト設定の構造を追加済み
- ⚠️ 実際のリダイレクトルールは未設定（必要に応じて追加）

## 次のステップ

1. **Vercelを使用している場合**:
   - `vercel.json`ファイルを作成してリダイレクトを設定（推奨）

2. **他のホスティングサービスを使用している場合**:
   - プラットフォームのドキュメントを参照してリダイレクトを設定
   - または`next.config.js`で設定

3. **DNS/CDNで設定する場合**:
   - Cloudflare、AWS CloudFrontなどの設定画面でリダイレクトを設定

## テスト方法

リダイレクト設定後、以下のコマンドでテストできます：

```bash
# 301リダイレクトを確認
curl -I https://gappy.jp

# レスポンスに以下が含まれることを確認:
# HTTP/1.1 301 Moved Permanently
# Location: https://official.gappy.jp/
```

## 注意事項

1. **SEOへの影響**: 301リダイレクトを使用することで、検索エンジンは新しいURLを優先します
2. **Google Search Console**: 新旧両方のドメインを登録し、リダイレクトが正しく機能しているか確認
3. **キャッシュ**: ブラウザや検索エンジンがリダイレクトをキャッシュするため、変更には時間がかかる場合があります
4. **パフォーマンス**: サーバー側（Vercel/CDN）でのリダイレクトが最も効率的です

