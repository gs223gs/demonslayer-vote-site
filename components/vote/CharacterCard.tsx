'use client';

import { Character } from '@/types/database';
import { Language, translations } from '@/lib/i18n/translations';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getButtonStyles, getTextPrimary } from '@/lib/colors';
import { submitVote } from '@/app/actions/vote';
import { useState } from 'react';
import { VoteCompleteDialog } from './VoteCompleteDialog';
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
  
  const characterName = lang === 'ja' ? character.name_ja : character.name_en;
  const characterDescription = lang === 'ja' ? character.description_ja : character.description_en;

  const handleVote = async () => {
    if (hasVotedAlready) return;
    
    setIsVoting(true);
    try {
      const result = await submitVote(character.id);
      if (result.success) {
        setShowCompleteDialog(true);
      } else {
        // TODO: Show error message
        alert(t.error.voteFailed);
      }
    } catch {
      alert(t.error.networkError);
    } finally {
      setIsVoting(false);
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
          <Button
            onClick={handleVote}
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