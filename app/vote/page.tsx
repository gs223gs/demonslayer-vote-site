import { getLanguage, getVotedCharacter } from '@/lib/cookies';
import { translations } from '@/lib/i18n/translations';
import { getTotalVotes, mockCharacters } from '@/lib/mock-data';
import { TotalVotes } from '@/components/TotalVotes';
import { VotingSection } from '@/components/vote/VotingSection';
import { RankingSection } from '@/components/vote/RankingSection';
import { getTextPrimary } from '@/lib/colors';

export default async function VotePage() {
  const lang = await getLanguage();
  const t = translations[lang];
  const votedCharacter = await getVotedCharacter();
  const hasVoted = !!votedCharacter;
  
  //TODO: Fetch from database with cache
  const totalVotes = getTotalVotes();
  const characters = mockCharacters;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* 総投票数表示 */}
        <div className="mb-8">
          <TotalVotes votes={totalVotes} lang={lang} />
        </div>

        {/* ランキング表示部分 */}
        <div className="mb-8">
          {hasVoted ? (
            <RankingSection lang={lang} />
          ) : (
            <div className="text-center py-12">
              <p className={`text-xl ${getTextPrimary()}`}>
                {t.vote.showRankingPrompt}
              </p>
            </div>
          )}
        </div>

        {/* 投票セクション */}
        <VotingSection 
          characters={characters} 
          lang={lang} 
          votedCharacter={votedCharacter}
        />
      </div>
    </div>
  );
}