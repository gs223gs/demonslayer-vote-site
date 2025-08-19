'use client';

import { Character } from '@/types/database';
import { Language, translations } from '@/lib/i18n/translations';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getButtonStyles, getTextPrimary } from '@/lib/colors';
import { submitVote } from '@/app/actions/vote';
import { useState, useRef } from 'react';
import { VoteCompleteDialog } from './VoteCompleteDialog';
import { ReCaptcha, type ReCaptchaRef } from '@/components/ReCaptcha';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  "border-2 transition-colors",
  {
    variants: {
      category: {
        demon: "border-red-500 bg-red-50 hover:bg-red-100",
        corps: "border-green-500 bg-green-50 hover:bg-green-100",
        civilian: "border-gray-500 bg-gray-50 hover:bg-gray-100"
      }
    },
    defaultVariants: {
      category: "corps"
    }
  }
);

interface CharacterCardProps extends VariantProps<typeof cardVariants> {
  character: Character;
  lang: Language;
  isVoted: boolean;
  hasVotedAlready: boolean;
  category?: "demon" | "corps" | "civilian";
}

export function CharacterCard({ character, lang, isVoted, hasVotedAlready, category }: CharacterCardProps) {
  const t = translations[lang];
  const [isVoting, setIsVoting] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCaptchaRef>(null);
  
  const characterName = lang === 'ja' ? character.name_ja : character.name_en;
  const characterDescription = lang === 'ja' ? character.description_ja : character.description_en;

  const handleVoteClick = async () => {
    if (hasVotedAlready) return;
    
    // ReCAPTCHAが未完了の場合は表示
    if (!recaptchaToken) {
      setShowRecaptcha(true);
      return;
    }
    
    // 投票処理を実行
    await executeVote();
  };

  const executeVote = async (tokenToUse?: string | null) => {
    setIsVoting(true);
    const finalToken = tokenToUse ?? recaptchaToken;
    try {
      const result = await submitVote(character.id, finalToken);
      if (result.success) {
        setShowCompleteDialog(true);
        setShowRecaptcha(false);
        setRecaptchaToken(null);
        recaptchaRef.current?.reset();
      } else {
        alert(t.error.voteFailed);
      }
    } catch {
      alert(t.error.networkError);
    } finally {
      setIsVoting(false);
    }
  };

  const handleRecaptchaVerify = (token: string | null) => {
    setRecaptchaToken(token);
    if (token) {
      // ReCAPTCHA成功時は直接トークンを渡して投票実行
      executeVote(token);
    }
  };

  return (
    <>
      <Card className={cn(cardVariants({ category }))}>
        <CardContent className="p-6">
          <h3 className={`text-lg font-semibold text-center ${getTextPrimary()}`}>
            {characterName}
          </h3>
          <p className={`text-sm ${getTextPrimary()}`}>
            {characterDescription}
          </p>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <div className="w-full space-y-3">
            <Button
              onClick={handleVoteClick}
              disabled={hasVotedAlready || isVoting}
              className={`w-full ${hasVotedAlready ? 'bg-gray-400 hover:bg-gray-400' : getButtonStyles()}`}
            >
              {isVoting 
                ? '投票中...' 
                : isVoted 
                  ? t.vote.alreadyVoted 
                  : t.vote.voteButton
              }
            </Button>
            
            {/* ReCAPTCHA */}
            {showRecaptcha && !hasVotedAlready && (
              <div className="w-full">
                <p className="text-xs text-gray-600 text-center mb-2">
                  鬼でないことを確認してください
                </p>
                <div className="flex justify-center">
                  <div className="scale-75 origin-center">
                    <ReCaptcha
                      ref={recaptchaRef}
                      onVerify={handleRecaptchaVerify}
                      size="normal"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>

      <VoteCompleteDialog
        open={showCompleteDialog}
        onClose={() => setShowCompleteDialog(false)}
        characterName={characterName}
        lang={lang}
      />
    </>
  );
}