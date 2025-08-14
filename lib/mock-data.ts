import { Character, VoteCount } from '@/types/database';

//TODO: Replace with actual database data
export const mockCharacters: Character[] = [
  {
    id: '1',
    name_ja: '竈門炭治郎',
    name_en: 'Kamado Tanjiro',
    category: 'corps',
    display_order: 1,
  },
  {
    id: '2',
    name_ja: '猗窩座',
    name_en: 'Akaza',
    category: 'demon',
    display_order: 2,
  },
  {
    id: '3',
    name_ja: '産屋敷耀哉',
    name_en: 'Ubuyashiki Kagaya',
    category: 'civilian',
    display_order: 3,
  },
];

//TODO: Replace with actual database query
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

//TODO: Replace with actual database query
export function getTotalVotes(): number {
  return mockVoteCounts.reduce((total, vote) => total + vote.count, 0);
}