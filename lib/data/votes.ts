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
  
  // RPC関数を使用してデータベース側で集計
  const { data, error } = await supabase
    .rpc('get_vote_counts_by_character');

  if (error) {
    console.error('Error fetching vote counts:', error);
    return [];
  }

  // データ型を変換（vote_count を count に）
  return (data as { character_id: string; vote_count: number }[] || []).map((item) => ({
    character_id: item.character_id,
    count: Number(item.vote_count) // BigIntからnumberに変換
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