'use client';

import { Language, translations } from '@/lib/i18n/translations';
import { Button } from '@/components/ui/button';
import { createTweetUrl, createRankingTweetText } from '@/lib/utils/twitter';
import { Share } from 'lucide-react';

interface TweetRankingButtonProps {
  ranking: Array<{
    name: string;
    votes: number;
    rank: number;
  }>;
  lang: Language;
}

export function TweetRankingButton({ ranking, lang }: TweetRankingButtonProps) {
  const t = translations[lang];

  const handleTweetRanking = () => {
    const tweetText = createRankingTweetText(ranking, lang);
    const tweetUrl = createTweetUrl(tweetText);
    window.open(tweetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Button
      onClick={handleTweetRanking}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      <Share className="h-4 w-4" />
      {t.share.tweetRankingButton}
    </Button>
  );
}