# Database Implementation TODO List

このドキュメントは、モックデータから実際のデータベース（Supabase）への移行時に必要な作業をまとめたものです。

## 📊 データベーステーブル設計

### votes テーブル
```sql
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_name VARCHAR(255) NOT NULL,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### characters テーブル
```sql
CREATE TABLE characters (
  id VARCHAR(255) PRIMARY KEY,
  name_ja VARCHAR(255) NOT NULL,
  name_en VARCHAR(255) NOT NULL,
  description_ja TEXT,
  description_en TEXT,
  category VARCHAR(50) CHECK (category IN ('demon', 'corps', 'civilian')),
  display_order INTEGER NOT NULL,
  image_url VARCHAR(255) -- 画像追加時に使用
);
```

## 🔄 GET操作（データ取得）の置き換え

### 1. 総投票数の取得
**場所:**
- `app/page.tsx` (line 15)
- `app/vote/page.tsx` (line 15)
- `lib/mock-data.ts` (line 50-52)

**TODO:**
```typescript
// 現在のモック実装
const totalVotes = getTotalVotes();

// Supabase実装に置き換え
const totalVotes = await getTotalVoteCount(); // 1分キャッシュ付き
```

### 2. キャラクター一覧の取得
**場所:**
- `app/vote/page.tsx` (line 17)
- `components/vote/RankingSection.tsx` (line 16)
- `lib/mock-data.ts` (line 3-32)

**TODO:**
```typescript
// 現在のモック実装
const characters = mockCharacters;

// Supabase実装に置き換え
const characters = await getCharacters();
```

### 3. 投票数（ランキング）の取得
**場所:**
- `components/vote/RankingSection.tsx` (line 14-15)
- `lib/mock-data.ts` (line 34-48)

**TODO:**
```typescript
// 現在のモック実装
const voteCounts = mockVoteCounts;

// Supabase実装に置き換え
const voteCounts = await getVoteCounts(); // 1分キャッシュ付き
```

## 📝 POST操作（データ挿入）の置き換え

### 投票データの挿入
**場所:**
- `app/actions.ts` (line 15-19)

**TODO:**
```typescript
// 現在のモック実装（コメントアウト状態）
//TODO: DB POST - Insert vote into database

// Supabase実装に置き換え
await insertVote(characterId);
```

## 🔧 実装手順

### Step 1: Supabaseのセットアップ
1. Supabaseプロジェクトを作成
2. 環境変数を設定
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Supabaseクライアントを初期化

### Step 2: データベース関数の実装
`lib/database-queries.ts`の各関数を実装:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// 各関数を実装...
```

### Step 3: キャッシュの実装
Next.jsの`revalidate`オプションを使用:

```typescript
export async function getVoteCounts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/votes`, {
    next: { revalidate: 60 } // 1分キャッシュ
  });
  return res.json();
}
```

### Step 4: モックデータの削除
1. `lib/mock-data.ts`を削除
2. 各コンポーネントのimportを`lib/database-queries.ts`に変更

## ⚠️ 注意事項

1. **エラーハンドリング**: 各DB操作にtry-catchを追加
2. **型安全性**: Supabaseの型生成機能を使用
3. **パフォーマンス**: 
   - 適切なインデックスを設定
   - N+1問題を避ける
   - 必要に応じてページネーションを実装
4. **セキュリティ**: 
   - Row Level Security (RLS)を設定
   - 投票の重複を防ぐ（IPアドレスチェックなど）

## 📦 必要なパッケージ

```bash
npm install @supabase/supabase-js
```

## 🚀 デプロイ時の確認事項

- [ ] 環境変数が正しく設定されているか
- [ ] データベースのマイグレーションが完了しているか
- [ ] 初期データ（キャラクターマスタ）が投入されているか
- [ ] キャッシュが正しく動作しているか
- [ ] エラーログが適切に記録されているか