import { Character, VoteCount } from '@/types/database';

//TODO: DB GET - Replace with database query to fetch all characters
export const mockCharacters: Character[] = [
  {
    id: '1',
    name_ja: '竈門炭治郎',
    name_en: 'Kamado Tanjiro',
    category: 'corps',
    display_order: 1,
    description_ja: '竈門炭治郎は鬼殺隊の隊士であり，鬼殺隊の隊士である。',
    description_en: 'Kamado Tanjiro is a member of the Demon Slayer Corps.',
  },
  {
    id: '2',
    name_ja: '猗窩座',
    name_en: 'Akaza',
    category: 'demon',
    display_order: 2,
    description_ja: '猗窩座は鬼殺隊の隊士であり，鬼殺隊の隊士である。',
    description_en: 'Akaza is a member of the Demon Slayer Corps.',
  },
  {
    id: '3',
    name_ja: '産屋敷耀哉',
    name_en: 'Ubuyashiki Kagaya',
    category: 'civilian',
    display_order: 3,
    description_ja: '産屋敷耀哉は鬼殺隊の隊士であり，鬼殺隊の隊士である。',
    description_en: 'Ubuyashiki Kagaya is a member of the Demon Slayer Corps.',
  },
];

//TODO: DB GET - Replace with database query to fetch vote counts with 1-minute cache
export const mockVoteCounts: VoteCount[] = [
  {
    character_name: '1', // 竈門炭治郎のID
    count: 1523,
  },
  {
    character_name: '2', // 猗窩座のID
    count: 1245,
  },
  {
    character_name: '3', // 産屋敷耀哉のID
    count: 876,
  },
];

//TODO: DB GET - Replace with database query to calculate total votes with 1-minute cache
export function getTotalVotes(): number {
  return mockVoteCounts.reduce((total, vote) => total + vote.count, 0);
}