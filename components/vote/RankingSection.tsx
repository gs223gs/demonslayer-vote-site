import { Language, translations } from '@/lib/i18n/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCardStyles, getButtonStyles, getTextPrimary } from '@/lib/colors';
import { mockVoteCounts, mockCharacters } from '@/lib/mock-data';
import { TweetRankingButton } from './TweetRankingButton';

interface RankingSectionProps {
  lang: Language;
}

export function RankingSection({ lang }: RankingSectionProps) {
  const t = translations[lang];
  
  //TODO: Replace with actual database query
  const voteCounts = mockVoteCounts;
  const characters = mockCharacters;

  // ランキングデータを作成
  const ranking = voteCounts
    .map(voteCount => {
      const character = characters.find(c => c.id === voteCount.character_name);
      return {
        id: voteCount.character_name,
        name: character 
          ? (lang === 'ja' ? character.name_ja : character.name_en)
          : voteCount.character_name,
        votes: voteCount.count,
        category: character?.category || 'unknown',
      };
    })
    .sort((a, b) => b.votes - a.votes) // 降順ソート（投票数が多い順）
    .map((item, index, array) => {
      // 同率の場合の順位計算 (1,2,2,4)
      let rank = 1;
      for (let i = 0; i < index; i++) {
        if (array[i].votes !== item.votes) {
          rank = i + 2;
        }
      }
      return { ...item, rank };
    });

  return (
    <Card className={getCardStyles()}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className={`text-2xl font-bold ${getTextPrimary()}`}>
            {t.common.ranking}
          </CardTitle>
          <TweetRankingButton ranking={ranking} lang={lang} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {ranking.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200"
          >
            <div className="flex items-center gap-4">
              <div className={`text-2xl font-bold ${getTextPrimary()} min-w-[3rem]`}>
                {item.rank}位
              </div>
              <div>
                <h3 className={`text-lg font-semibold ${getTextPrimary()}`}>
                  {item.name}
                </h3>
                <p className={`text-sm ${getTextPrimary()} opacity-70`}>
                  {t.categories[item.category as keyof typeof t.categories]}
                </p>
              </div>
            </div>
            
            <div className={`text-xl font-bold ${getTextPrimary()}`}>
              {item.votes.toLocaleString(lang === 'ja' ? 'ja-JP' : 'en-US')}
              {t.common.votes}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}