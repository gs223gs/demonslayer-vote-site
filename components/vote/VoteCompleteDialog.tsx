'use client';

import { Language, translations } from '@/lib/i18n/translations';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getButtonStyles, getTextPrimary } from '@/lib/colors';
import { createTweetUrl } from '@/lib/utils/twitter';
import { url } from '@/lib/utils/url';

interface VoteCompleteDialogProps {
  open: boolean;
  onClose: () => void;
  characterName: string;
  lang: Language;
}

export function VoteCompleteDialog({ open, onClose, characterName, lang }: VoteCompleteDialogProps) {
  const t = translations[lang];

  const handleTweet = () => {
    const tweetText = `${characterName}${t.share.tweetVote} ${t.share.hashtags} \n${url}`;
    const tweetUrl = createTweetUrl(tweetText);
    window.open(tweetUrl, '_blank');
    onClose();
  };

  const handleClose = () => {
    onClose();
    // ページをリロードしてランキングを表示
    window.location.reload();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className={getTextPrimary()}>
            {t.vote.thankYouMessage}
          </DialogTitle>
        </DialogHeader>
        
        <div className={`py-4 text-center ${getTextPrimary()}`}>
          <p className="text-lg mb-2">
            <span className="font-semibold">{characterName}</span>
            {t.share.tweetVote}
          </p>
        </div>

        <DialogFooter className="sm:justify-center gap-2">
          <Button
            onClick={handleTweet}
            className={getButtonStyles()}
          >
            {t.share.tweetButton}
          </Button>
          <Button
            variant="outline"
            onClick={handleClose}
          >
            {lang === 'ja' ? '閉じる' : 'Close'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}