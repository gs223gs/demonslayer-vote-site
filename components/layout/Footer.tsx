import { getLanguage } from '@/lib/cookies';
import { translations } from '@/lib/i18n/translations';

const footerTranslations = {
  ja: {
    disclaimer: 'このサイトは鬼滅の刃の公式サイトではありません。ファンによって制作されたファンサイトです。',
    copyright: '© 吾峠呼世晴/集英社・アニプレックス・ufotable',
    fanSite: 'ファンサイト',
    notOfficial: '※非公式サイト',
    madeWithLove: 'ファンの愛で制作',
  },
  en: {
    disclaimer: 'This site is not an official Demon Slayer website. This is a fan site created by fans.',
    copyright: '© Koyoharu Gotouge/Shueisha, Aniplex, ufotable',
    fanSite: 'Fan Site',
    notOfficial: '※Unofficial Site',
    madeWithLove: 'Made with fan love',
  },
} as const;

export async function Footer() {
  const lang = await getLanguage();
  const t = footerTranslations[lang];

  return (
    <footer className="bg-green-900 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <span className="inline-block bg-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              {t.fanSite}
            </span>
            <span className="inline-block bg-red-600 px-3 py-1 rounded-full text-sm font-semibold ml-2">
              {t.notOfficial}
            </span>
          </div>
          
          <p className="text-sm mb-4 leading-relaxed max-w-2xl mx-auto">
            {t.disclaimer}
          </p>
          
          <div className="border-t border-green-700 pt-4 mt-4">
            <p className="text-xs text-green-200 mb-2">
              {t.copyright}
            </p>
            <p className="text-xs text-green-300">
              {t.madeWithLove}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}