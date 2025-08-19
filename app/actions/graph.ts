'use server';

import { createAnonClient } from '@/util/supabase/server-anon';
import { unstable_cache } from 'next/cache';

export type VoteDataByDate = {
  date: string;
  [characterId: string]: number | string;
};

async function fetchVoteDataFromDB() {
  const supabase = createAnonClient();
  
  // 並列でデータを取得
  const [voteResult, charResult] = await Promise.all([
    supabase.rpc('get_daily_vote_counts'),
    supabase
      .from('characters')
      .select('id, name_ja, name_en, display_order')
      .order('display_order', { ascending: true })
  ]);

  if (voteResult.error) {
    console.error('Error fetching vote data:', voteResult.error);
    return { success: false, error: 'Failed to fetch vote data', data: [], characters: [] };
  }

  if (charResult.error) {
    console.error('Error fetching characters:', charResult.error);
    return { success: false, error: 'Failed to fetch characters', data: [], characters: [] };
  }

  const voteData = voteResult.data as Array<{
    vote_date: string;
    character_id: string;
    daily_count: number;
  }>;

  const characters = charResult.data || [];

  // 日付の範囲を取得
  const dates = [...new Set(voteData.map(v => v.vote_date))].sort();
  
  if (dates.length === 0) {
    return { success: true, data: [], characters };
  }

  // 最初の日から今日までの全日付を生成
  const startDate = new Date(dates[0]);
  const endDate = new Date();
  const allDates: string[] = [];
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    allDates.push(d.toISOString().split('T')[0]);
  }

  // 累積カウントを管理
  const cumulativeCounts: { [characterId: string]: number } = {};
  characters.forEach(char => {
    cumulativeCounts[char.id] = 0;
  });

  // 日別データを構築
  const chartData: VoteDataByDate[] = allDates.map(dateStr => {
    const dayData: VoteDataByDate = { 
      date: new Date(dateStr).toLocaleDateString('ja-JP') 
    };

    // その日の投票を累積カウントに追加
    voteData
      .filter(v => v.vote_date === dateStr)
      .forEach(v => {
        cumulativeCounts[v.character_id] = (cumulativeCounts[v.character_id] || 0) + Number(v.daily_count);
      });

    // 全キャラクターの現在の累積値を設定
    characters.forEach(char => {
      dayData[char.id] = cumulativeCounts[char.id];
    });

    return dayData;
  });

  console.log(`Processed ${chartData.length} days of data for ${characters.length} characters`);

  return { 
    success: true, 
    data: chartData,
    characters
  };
}

// キャッシュ付きのデータ取得関数
export const getVoteDataByDate = unstable_cache(
  fetchVoteDataFromDB,
  ['vote-graph-data'],
  {
    revalidate: 60, // 60秒キャッシュ
    tags: ['votes']
  }
);