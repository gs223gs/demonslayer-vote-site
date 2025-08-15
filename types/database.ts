export type Vote = {
  id: string;
  character_id: string; // character_nameから変更（外部キー制約のため）
  voted_at: Date;
}

export type Character = {
  id: string;
  name_ja: string;
  name_en: string;
  description_ja: string;
  description_en: string;
  category: 'demon' | 'corps' | 'civilian';
  display_order: number;
}

export type VoteCount = {
  character_name: string;
  count: number;
}