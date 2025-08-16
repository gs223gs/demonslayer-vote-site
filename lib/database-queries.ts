// Database query functions - これらの関数をSupabaseの実装に置き換える

import { Character, VoteCount } from '@/types/database';

//TODO: DB GET - Implement with Supabase client
export async function getCharacters(): Promise<Character[]> {
  // Example implementation:
  // const { data, error } = await supabase
  //   .from('characters')
  //   .select('*')
  //   .order('display_order');
  // 
  // if (error) throw error;
  // return data;
  
  throw new Error('Not implemented yet');
}

//TODO: DB GET - Implement with Supabase client and 1-minute cache
export async function getVoteCounts(): Promise<VoteCount[]> {
  // Example implementation:
  // const { data, error } = await supabase
  //   .from('votes')
  //   .select('character_name, count(*)')
  //   .group('character_name');
  // 
  // if (error) throw error;
  // return data.map(item => ({
  //   character_name: item.character_name,
  //   count: item.count
  // }));
  
  throw new Error('Not implemented yet');
}

//TODO: DB GET - Implement with Supabase client and 1-minute cache
export async function getTotalVoteCount(): Promise<number> {
  // Example implementation:
  // const { count, error } = await supabase
  //   .from('votes')
  //   .select('*', { count: 'exact', head: true });
  // 
  // if (error) throw error;
  // return count || 0;
  
  throw new Error('Not implemented yet');
}

//TODO: DB POST - Implement with Supabase client
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function insertVote(characterId: string): Promise<void> {
  // Example implementation:
  // const { error } = await supabase
  //   .from('votes')
  //   .insert({
  //     character_name: characterId,
  //     voted_at: new Date().toISOString()
  //   });
  // 
  // if (error) throw error;
  
  throw new Error('Not implemented yet');
}