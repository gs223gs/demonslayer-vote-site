-- Supabase用のデータベーススキーマ
-- 鬼滅の刃 無限城編 投票サイト

-- ================================
-- キャラクターマスタテーブル
-- ================================
CREATE TABLE characters (
  id TEXT PRIMARY KEY,
  name_ja TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_ja TEXT NOT NULL,
  description_en TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('demon', 'corps', 'civilian')),
  display_order INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス
CREATE INDEX idx_characters_category ON characters(category);
CREATE INDEX idx_characters_display_order ON characters(display_order);

-- ================================
-- 投票テーブル
-- ================================
CREATE TABLE votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  character_id TEXT NOT NULL REFERENCES characters(id),
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス（集計クエリの高速化）
CREATE INDEX idx_votes_character_id ON votes(character_id);
CREATE INDEX idx_votes_voted_at ON votes(voted_at);

-- ================================
-- 初期データ投入
-- ================================
INSERT INTO characters (id, name_ja, name_en, description_ja, description_en, category, display_order) VALUES
  ('1', '竈門炭治郎', 'Kamado Tanjiro', '鬼殺隊の隊士。妹の禰豆子を人間に戻すため戦う。', 'A member of the Demon Slayer Corps, fighting to turn his sister Nezuko back into a human.', 'corps', 1),
  ('2', '猗窩座', 'Akaza', '上弦の参。武術を極めた鬼で、強者との戦いを求める。', 'Upper Rank Three. A demon who mastered martial arts and seeks battles with the strong.', 'demon', 2),
  ('3', '産屋敷耀哉', 'Ubuyashiki Kagaya', '鬼殺隊の当主。隊士たちを導く存在。', 'The leader of the Demon Slayer Corps. He guides all the demon slayers.', 'civilian', 3);

-- ================================
-- ビュー（集計用）
-- ================================
CREATE OR REPLACE VIEW vote_counts AS
SELECT 
  c.id,
  c.name_ja,
  c.name_en,
  c.category,
  COUNT(v.id) as vote_count
FROM characters c
LEFT JOIN votes v ON c.id = v.character_id
GROUP BY c.id, c.name_ja, c.name_en, c.category
ORDER BY vote_count DESC;

-- ================================
-- RLS (Row Level Security) 設定
-- ================================

-- RLSを有効化
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- キャラクターテーブル：誰でも読み取り可能
CREATE POLICY "Characters are viewable by everyone" 
  ON characters FOR SELECT 
  USING (true);

-- 投票テーブル：誰でも投票（INSERT）可能
CREATE POLICY "Anyone can vote" 
  ON votes FOR INSERT 
  WITH CHECK (true);

-- 投票テーブル：集計のために読み取り可能
CREATE POLICY "Votes are viewable for counting" 
  ON votes FOR SELECT 
  USING (true);

-- ================================
-- 関数（便利な集計用）
-- ================================

-- 総投票数を取得
CREATE OR REPLACE FUNCTION get_total_votes()
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM votes);
END;
$$;

-- キャラクター別投票数を取得
CREATE OR REPLACE FUNCTION get_character_votes(char_id TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN (SELECT COUNT(*) FROM votes WHERE character_id = char_id);
END;
$$;

-- ================================
-- 注意事項
-- ================================
-- 1. character_idをcharacter_nameからcharacter_idに変更しました（外部キー制約のため）
-- 2. UUIDはSupabaseが自動生成します
-- 3. タイムスタンプは自動でUTCで保存されます
-- 4. RLSで基本的なセキュリティを設定していますが、本番環境では追加の制限が必要かもしれません