'use server';

import { revalidatePath } from 'next/cache';
import { setLanguage, setVotedCharacter } from '@/lib/cookies';
import { Language } from '@/lib/i18n/translations';

export async function changeLanguage(lang: Language) {
  await setLanguage(lang);
  revalidatePath('/');
  revalidatePath('/vote');
}

export async function voteForCharacter(characterName: string) {
  try {
    //TODO: DB POST - Insert vote into database
    // Example: await supabase.from('votes').insert({
    //   character_name: characterName,
    //   voted_at: new Date()
    // });
    
    await setVotedCharacter(characterName);
    revalidatePath('/vote');
    
    return { success: true };
  } catch (error) {
    console.error('Vote failed:', error);
    return { success: false, error: 'Failed to save vote' };
  }
}