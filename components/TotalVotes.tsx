import { Language, translations } from '@/lib/i18n/translations';
import { getTotalVotesStyles, getTextPrimary } from '@/lib/colors';

interface TotalVotesProps {
  votes: number;
  lang: Language;
}

export function TotalVotes({ votes, lang }: TotalVotesProps) {
  const t = translations[lang];
  
  return (
    <div className={`${getTotalVotesStyles()} rounded-lg p-6 text-center`}>
      <p className={`text-sm ${getTextPrimary()} mb-2`}>{t.common.totalVotes}</p>
      <p className={`text-4xl font-bold ${getTextPrimary()}`}>
        {votes.toLocaleString(lang === 'ja' ? 'ja-JP' : 'en-US')}
        <span className="text-xl ml-2">{t.common.votes}</span>
      </p>
    </div>
  );
}