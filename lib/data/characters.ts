import { createAnonClient } from '@/util/supabase/server-anon';
import { Character } from '@/types/database';
import { unstable_cache } from 'next/cache';

async function fetchCharactersFromDB(): Promise<Character[]> {
  const supabase = createAnonClient();
  
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching characters:', error);
    return [];
  }

  return (data as Character[]) || [];
}

export const getCharacters = unstable_cache(
  fetchCharactersFromDB,
  ['characters'],
  {
    revalidate: 60 * 60 * 24 * 90, // 3ヶ月キャッシュ（90日）
    tags: ['characters']
  }
);