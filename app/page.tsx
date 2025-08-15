import { getLanguage } from '@/lib/cookies';
import { translations } from '@/lib/i18n/translations';
import { BOX_OFFICE_AMOUNT, BOX_OFFICE_AMOUNT_EN } from '@/lib/constants';
import { getTotalVotes } from '@/lib/mock-data';
import { TotalVotes } from '@/components/TotalVotes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getCardStyles, getButtonStyles, getTextPrimary } from '@/lib/colors';

export default async function Home() {
  const lang = await getLanguage();
  const t = translations[lang];
  const boxOfficeAmount = lang === 'ja' ? BOX_OFFICE_AMOUNT : BOX_OFFICE_AMOUNT_EN;
  
  //TODO: DB GET - Replace with database query to fetch total vote count with 1-minute cache
  const totalVotes = getTotalVotes();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-4xl font-bold text-center mb-4 ${getTextPrimary()}`}>
          {t.home.title.replace('200億', boxOfficeAmount).replace('20 billion', boxOfficeAmount)}
        </h1>
        
        <p className={`text-xl text-center mb-12 ${getTextPrimary()}`}>
          {t.home.catchCopy.replace('200億', boxOfficeAmount).replace('20 billion', boxOfficeAmount)}
        </p>

        <div className={`${getCardStyles()} rounded-lg shadow-lg p-8 mb-8`}>
          <p className={`text-lg mb-6 ${getTextPrimary()} leading-relaxed`}>
            {t.home.description.replace('200億', boxOfficeAmount).replace('20 billion', boxOfficeAmount)}
          </p>
          
          <TotalVotes votes={totalVotes} lang={lang} />
        </div>

        <div className="text-center">
          <Button asChild size="lg" className={`${getButtonStyles()} px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all`}>
            <Link href="/vote">
              {t.common.voteAndRanking}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
