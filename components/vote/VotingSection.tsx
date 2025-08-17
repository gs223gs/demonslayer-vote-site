import { Character } from '@/types/database';
import { Language } from '@/lib/i18n/translations';
import { CharacterCard } from './CharacterCard';

interface VotingSectionProps {
  characters: Character[];
  lang: Language;
  votedCharacter: string | null;
}

export function VotingSection({ characters, lang, votedCharacter }: VotingSectionProps) {
  
  // キャラクターをカテゴリ別にグループ化
  const groupedCharacters = characters.reduce((acc, character) => {
    if (!acc[character.category]) {
      acc[character.category] = [];
    }
    acc[character.category].push(character);
    return acc;
  }, {} as Record<string, Character[]>);

  const categories = [
    { key: 'demon', characters: groupedCharacters.demon || [] },
    { key: 'corps', characters: groupedCharacters.corps || [] },
    { key: 'civilian', characters: groupedCharacters.civilian || [] },
  ] as const;

  return (
    <div className="space-y-8">
      {categories.map(({ key, characters: categoryCharacters }) => (
        <div key={key} className="space-y-4">
          
          {/* キャラクターカード */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                lang={lang}
                isVoted={votedCharacter === character.id}
                hasVotedAlready={!!votedCharacter}
                category={key}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}