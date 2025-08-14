import Link from 'next/link';
import { getLanguage } from '@/lib/cookies';
import { translations } from '@/lib/i18n/translations';
import { LanguageSelector } from './LanguageSelector';

export async function Header() {
  const lang = await getLanguage();
  const t = translations[lang];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-gray-900">
            {t.common.siteName}
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {t.common.home}
            </Link>
            <Link 
              href="/vote" 
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {t.common.voteAndRanking}
            </Link>
            <LanguageSelector currentLang={lang} />
          </nav>
        </div>
      </div>
    </header>
  );
}