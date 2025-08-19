'use server';

import { createClient } from '@/util/supabase/server';
import { setVotedCharacter } from '@/lib/cookies';
import { revalidateTag } from 'next/cache';
import { getVoteMetadata } from './vote-metadata';

export async function submitVote(characterId: string) {
  try {
    // メタデータを取得（無効化したい場合はgetVoteMetadataDisabledに変更）
    const metadata = await getVoteMetadata();
    
    // Supabaseクライアントを作成
    const supabase = await createClient();
    
    // 投票をデータベースに保存
    const { error } = await supabase
      .from('votes')
      .insert([
        {
          character_id: characterId,
          voted_at: new Date().toISOString(),
          ...metadata // メタデータを展開（空の場合は何も追加されない）
        }
      ]);

    if (error) {
      console.error('Error submitting vote:', error);
      return { success: false, error: 'Failed to submit vote' };
    }

    // クッキーに投票したキャラクターIDを保存（3ヶ月）
    await setVotedCharacter(characterId);

    // キャッシュを再検証（投票数を更新）
    revalidateTag('votes');

    return { success: true };
  } catch (error) {
    console.error('Unexpected error during vote submission:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}