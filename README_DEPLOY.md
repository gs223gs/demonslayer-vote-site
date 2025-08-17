# Cloudflare Workers へのデプロイ手順

## 必要なパッケージのインストール

```bash
npm install -D @cloudflare/next-on-pages wrangler
```

## 環境変数の設定

1. Cloudflare Dashboardでシークレットを設定:
```bash
wrangler secret put NEXT_PUBLIC_SUPABASE_URL
wrangler secret put NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## ビルド & デプロイ

### 開発環境でのテスト
```bash
npm run preview
```

### 本番環境へのデプロイ
```bash
npm run deploy
```

### ステージング環境へのデプロイ
```bash
wrangler deploy --env staging
```

## 注意事項

1. **Edge Runtime制限**
   - Node.js固有のAPIは使用できません
   - `fs`, `path`, `crypto`などのNode.jsモジュールは使用不可

2. **環境変数**
   - `NEXT_PUBLIC_`プレフィックスのついた変数のみクライアントで使用可能
   - シークレットは`wrangler secret`コマンドで設定

3. **画像最適化**
   - Cloudflare Workersでは`next/image`の最適化機能が無効化されます
   - 画像は事前に最適化しておくことを推奨

4. **サイズ制限**
   - Workers の最大サイズは10MB
   - 大きなファイルは外部CDNに配置することを推奨

## トラブルシューティング

### ビルドエラーが発生する場合
```bash
rm -rf .next .vercel node_modules
npm install
npm run build:worker
```

### デプロイ後にアクセスできない場合
- wrangler.tomlのroute設定を確認
- Cloudflare Dashboardでワーカーの状態を確認
- `wrangler tail`でリアルタイムログを確認

## カスタムドメインの設定

1. Cloudflare Dashboard → Workers & Pages
2. 該当のWorkerを選択
3. Triggers → Custom Domains
4. ドメインを追加