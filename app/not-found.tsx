import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getButtonStyles, getTextPrimary } from '@/lib/colors';
import { getLanguage } from '@/lib/cookies';

export const runtime = 'edge';

export default async function NotFound() {
  const lang = await getLanguage();
  
  const messages = {
    ja: {
      title: 'ページが見つかりません',
      description: 'お探しのページは存在しないか、移動した可能性があります。',
      button: 'ホームに戻る'
    },
    en: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist or may have been moved.',
      button: 'Back to Home'
    }
  };
  
  const t = messages[lang];
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-black/5">
      <div className="text-center px-4">
        <h1 className={`text-6xl font-bold mb-4 ${getTextPrimary()}`}>
          404
        </h1>
        <h2 className={`text-2xl font-semibold mb-6 ${getTextPrimary()}`}>
          {t.title}
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {t.description}
        </p>
        <Link href="/">
          <Button className={getButtonStyles()}>
            {t.button}
          </Button>
        </Link>
      </div>
    </div>
  );
}