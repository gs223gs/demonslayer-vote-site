'use client';

import { Character } from '@/types/database';
import { Language, translations } from '@/lib/i18n/translations';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCardStyles, getButtonStyles, getTextPrimary } from '@/lib/colors';
import { voteForCharacter } from '@/app/actions';
import { useState } from 'react';
import { VoteCompleteDialog } from './VoteCompleteDialog';

interface CharacterCardProps {
  character: Character;
  lang: Language;
  isVoted: boolean;
  hasVotedAlready: boolean;
}

export function CharacterCard({ character, lang, isVoted, hasVotedAlready }: CharacterCardProps) {
  const t = translations[lang];
  const [isVoting, setIsVoting] = useState(false);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  
  const characterName = lang === 'ja' ? character.name_ja : character.name_en;

  const handleVote = async () => {
    if (hasVotedAlready) return;
    
    setIsVoting(true);
    try {
      const result = await voteForCharacter(character.id);
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
      <Card className={`${getCardStyles()}`}>
        <CardContent className="p-6">
          {/* TODO: Add character image */}
          <div className="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <span className={`text-sm ${getTextPrimary()}`}>
              {/* TODO: Replace with image */}
              画像
            </span>
          </div>
          
          <h3 className={`text-lg font-semibold text-center ${getTextPrimary()}`}>
            {characterName}
          </h3>
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