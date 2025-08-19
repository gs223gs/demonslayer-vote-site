'use server';

import { headers } from 'next/headers';

export interface VoteMetadata {
  ip_address?: string;
  user_agent?: string;
}

/**
 * 投票のメタデータを取得
 * この関数をコメントアウトまたは空のオブジェクトを返すようにすれば無効化できる
 */
export async function getVoteMetadata(): Promise<VoteMetadata> {
  try {
    const headersList = await headers();
    
    // IPアドレスの取得
    const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     headersList.get('x-real-ip') || 
                     undefined;
    
    // User-Agentの取得
    const userAgent = headersList.get('user-agent') || undefined;
    
    return {
      ip_address: ipAddress,
      user_agent: userAgent?.substring(0, 255) // DB制限に合わせて切り詰め
    };
  } catch (error) {
    console.error('Error getting vote metadata:', error);
    return {};
  }
}

/**
 * メタデータ収集を無効化する場合はこちらを使用
 */
export async function getVoteMetadataDisabled(): Promise<VoteMetadata> {
  return {};
}