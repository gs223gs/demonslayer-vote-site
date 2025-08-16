import { Language, translations } from '@/lib/i18n/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getCardStyles, getTextPrimary } from '@/lib/colors';
import { getCharacterVotes } from '@/lib/data/votes';
import { TweetRankingButton } from './TweetRankingButton';

interface RankingSectionProps {
  lang: Language;
}

export async function RankingSection({ lang }: RankingSectionProps) {
  const t = translations[lang];
  
  // データベースからキャラクター別投票数を取得（60秒キャッシュ）
  const charactersWithVotes = await getCharacterVotes();

  // ランキングデータを作成
  const ranking = charactersWithVotes.map(character => ({
    id: character.id,
    name: lang === 'ja' ? character.name_ja : character.name_en,
    votes: character.voteCount,
    category: character.category,
    rank: character.rank,
  }));

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