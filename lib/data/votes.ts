import { createAnonClient } from '@/util/supabase/server-anon';
import { unstable_cache } from 'next/cache';

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
  const counts = (data || []).reduce((acc: Record<string, number>, vote: { character_id: string }) => {
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