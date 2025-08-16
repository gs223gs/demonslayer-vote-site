# このプロジェクトについて

このプロジェクトは映画 鬼滅の刃 無限城編 の人気投票ページです．

前回の映画 鬼滅の刃 無限列車編では 興行収入が200億を超え，主要キャラである煉獄が活躍したため「200億の男」と呼ばれていました．

今回の映画でも早くも200億を突破したため，今回の200億の男/女を決める討論がTwitter で盛んに起こっています

それに決着をつけるための投票サイトです

# 要件

## 言語
- 日本語
- 英語

## ページ
- ホームページ
- 投票ページ / ランキングページ
  - 投票済だったらボタン非活性 ランキングのみを表示
  - 未投票だったら ランキングを非表示


## 機能
- 無限城に登場したキャラクターを投票する機能(1人1投票)
- ランキングを確認する機能
- 誰に投票したかツイートできる機能
- 現在のランキング上位3名をつーとできる機能

# 設計
## コンポーネント設計
共通化できるコンポーネントは必ず分けてください
例
- 現在の投票数

shadcn を使用してください
```bash
npx shadcn@latest add コンポーネント名
```

shadcn コンポーネント
Accordion
Alert
Alert Dialog
Aspect Ratio
Avatar
Badge
Breadcrumb
Button
Calendar
Card
Carousel
Chart
Checkbox
Collapsible
Combobox
Command
Context Menu
Data Table
Date Picker
Dialog
Drawer
Dropdown Menu
React Hook Form
Hover Card
Input
Input OTP
Label
Menubar
Navigation Menu
Pagination
Popover
Progress
Radio Group
Resizable
Scroll-area
Select
Separator
Sheet
Sidebar
Skeleton
Slider
Sonner
Switch
Table
Tabs
Textarea
Toast
Toggle
Toggle Group
Tooltip
Typography
## 関数設計
- 現在の投票数をgetするコンポーネント
  - クッキーは1分にしてください

## ヘッダー & フッター
Layout.tsx を必ず使用してください

## デザイン
### カラースキーム
- 基本色：緑と黒を使用
- 竈門炭治郎のイメージカラーを採用

### 背景
背景画面は竈門炭治郎の服である市松模様にする
- 画像の連続でもいいかも(私が作った画像)

## home page
- SSR
- ページの説明文
- 現在の投票数を表示
  - await

### ホームページに載せる言葉
> この言葉は専用のファイルにして，コンポーネントでそれを呼び出す形にしてください 多言語対応のためです

キャッチコピー
- 鬼滅の刃 無限城編 投票サイト ~200億の人物は誰だ?~
- 君の一票で活躍した人を200億の人物にしよう!
> この200億という数字は映画が見られれば見られるほど増えていくので別箇所で一元管理にしてください

## 投票機能
- SSR
- 各種人物の横に投票ボタンを配置
  - 投票ボタン押下でonClick発火
    - クッキーに投票した人の名前を入れる
    - server actions 発火
      - DBに誰に入れたかをinsert

## ランキング機能
- SSR

## 多言語対応
- 文字を直接コンポーネントに書かずtypeで別ファイルに定義する
- 日本語英語切り替えボタンを押したらクッキーに入れる
  - 初期値は日本語
- コンポーネントでクッキーを読み込んで言語を表示



## ツイート機能
- OGP を使用
  - xxxに投票しました!
  - 現在のランキング

# 技術スタック
Next.js Latest
shadcn
tailwind
supabase
cloudflare workers

# データベース設計
## 投票テーブル (votes)
- id
- character_name
- voted_at

## キャラクターマスタ (characters)
- id
- name_ja
- name_en
- display_order

## 投票制限
- クッキーベースで1人1投票制限

## 初期キャラクターリスト
- 竈門炭治郎 (Kamado Tanjiro)
- 猗窩座 (Akaza)
- 産屋敷耀哉 (Ubuyashiki Kagaya)
※後ほど追加予定

# 実装詳細
## 200億の数字管理
- 手動更新（ニュース公開後に更新）
- 一元管理ファイルで管理

## 背景画像
- 市松模様の画像ファイルを使用（実装時に指示）

## OGP
- 動的生成

## キャッシュ設定
- server functionのfetchで自動キャッシュ
- revalidate: 60（1分）

## ヘッダー構成
- ロゴ（鬼滅の刃 投票サイト）
- 言語選択ボタン（ドロップダウンメニュー）
- 投票/ランキングへのリンク

## 投票数表示
### ホーム画面
- 全キャラクターの合計投票数を表示
- 表示形式：「総投票数: xxxx」

### 投票/ランキング画面
- 一番上に全キャラクターの合計投票数
- その下にランキング（キャラクター名と個別投票数）

## 投票/ランキングページUI
### 投票前
- ランキング部分：「投票して現在のランキングをみよう!」を表示
- その下に投票コンポーネント

### 投票後
- ランキングを表示
- 投票ボタンは非活性のまま表示

## クッキー設定
- 投票情報：有効期限3ヶ月
- 言語設定：有効期限3ヶ月

## エラー処理
- 投票失敗時：「投票に失敗しました」
- ネットワークエラー時：再試行ボタンを表示

# 推奨事項
- client components ではなく server components を使用
