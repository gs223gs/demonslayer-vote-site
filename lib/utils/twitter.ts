import { url } from '@/lib/utils/url';

export function createTweetUrl(text: string, url?: string): string {
  const params = new URLSearchParams();
  params.set('text', text);
  
  if (url) {
    params.set('url', url);
  }
  
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

export function createRankingTweetText(
  ranking: Array<{ name: string; votes: number; rank: number }>,
  lang: 'ja' | 'en'
): string {
  const title = lang === 'ja' ? '現在のランキング🏆' : 'Current Ranking🏆';
  const hashtags = lang === 'ja' 
    ? '#鬼滅の刃 #無限城編 #xxx億を送るプロジェクト'
    : '#DemonSlayer #InfinityCastle #xxxBillionProject';
  const rankingText = ranking
    .slice(0, 3) // トップ3のみ
    .map(item => {
      const votes = lang === 'ja' ? `${item.votes.toLocaleString()}票` : `${item.votes.toLocaleString()} votes`;
      return `${item.rank}位: ${item.name} (${votes})`;
    })
    .join('\n');
  
  return `${title}\n${rankingText}\n${hashtags}\n${url}`;
}