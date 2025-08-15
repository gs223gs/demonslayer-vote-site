export interface Vote {
  id: string;
  character_name: string;
  voted_at: Date;
}

export interface Character {
  id: string;
  name_ja: string;
  name_en: string;
  description_ja: string;
  description_en: string;
  category: 'demon' | 'corps' | 'civilian';
  display_order: number;
}

export interface VoteCount {
  character_name: string;
  count: number;
}