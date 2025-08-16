import { createAnonClient } from '@/util/supabase/server-anon';
import { unstable_cache } from 'next/cache';
import { Character } from '@/types/database';
import { getCharacters } from './characters';

async function fetchTotalVotesFromDB(): Promise<number> {
  const supabase = createAnonClient();
  
  const { count, error } = await supabase
    .from('votes')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching total votes:', error);
    return 0;
  }

  return count || 0;
}

export const getTotalVotes = unstable_cache(
  fetchTotalVotesFromDB,
  ['total-votes'],
  {
    revalidate: 60, // 60秒キャッシュ
    tags: ['votes']
  }
);

async function fetchVoteCountsFromDB(): Promise<{ character_id: string; count: number }[]> {
  const supabase = createAnonClient();
  
  const { data, error } = await supabase
    .from('votes')
    .select('character_id')
    .order('character_id');

  if (error) {
    console.error('Error fetching vote counts:', error);
    return [];
  }

  // 集計処理
  const counts = ((data as { character_id: string }[]) || []).reduce((acc: Record<string, number>, vote: { character_id: string }) => {
    acc[vote.character_id] = (acc[vote.character_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts).map(([character_id, count]) => ({
    character_id,
    count
  }));
}

export const getVoteCounts = unstable_cache(
  fetchVoteCountsFromDB,
  ['vote-counts'],
  {
    revalidate: 60, // 60秒キャッシュ
    tags: ['votes']
  }
);

export type CharacterWithVotes = Character & {
  voteCount: number;
  rank: number;
}

async function fetchCharacterVotesFromDB(): Promise<CharacterWithVotes[]> {
  // キャラクターと投票数を並行で取得
  const [characters, voteCounts] = await Promise.all([
    getCharacters(),
    getVoteCounts()
  ]);

  // キャラクターIDと投票数のマップを作成
  const voteMap = new Map(
    voteCounts.map(({ character_id, count }) => [character_id, count])
  );

  // キャラクターに投票数を追加
  const charactersWithVotes = characters.map(character => ({
    ...character,
    voteCount: voteMap.get(character.id) || 0
  }));

  // 投票数で降順ソート
  charactersWithVotes.sort((a, b) => b.voteCount - a.voteCount);

  // ランキングを追加
  let currentRank = 1;
  let previousVoteCount = -1;

  const rankedCharacters = charactersWithVotes.map((character, index) => {
    if (character.voteCount !== previousVoteCount) {
      currentRank = index + 1;
    }
    previousVoteCount = character.voteCount;

    return {
      ...character,
      rank: currentRank
    };
  });

  return rankedCharacters;
}

export const getCharacterVotes = unstable_cache(
  fetchCharacterVotesFromDB,
  ['character-votes'],
  {
    revalidate: 60, // 60秒キャッシュ
    tags: ['votes', 'characters']
  }
);