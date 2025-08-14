export interface Vote {
  id: string;
  character_name: string;
  voted_at: Date;
}

export interface Character {
  id: string;
  name_ja: string;
  name_en: string;
  category: 'demon' | 'corps' | 'civilian';
  display_order: number;
  //TODO: Add image_url when images are ready
}

export interface VoteCount {
  character_name: string;
  count: number;
}