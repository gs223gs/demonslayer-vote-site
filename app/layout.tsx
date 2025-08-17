import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getLanguage } from "@/lib/cookies";
import { translations } from "@/lib/i18n/translations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLanguage();
  const t = translations[lang];
  
  const siteName = '鬼滅の刃 無限城編 投票サイト';
  const title = `${t.home.title} | ${siteName}`;
  const description = lang === 'ja' 
    ? '映画「鬼滅の刃 無限城編」の200億の人物を決める投票サイト。あなたの推しキャラに投票して、誰が最も活躍したか決めよう！竈門炭治郎、猗窩座、冨岡義勇など全48キャラクターから選べます。'
    : 'Vote for your favorite character from Demon Slayer: Infinity Castle Arc movie. Decide who deserves the title of "20 Billion Person"! Choose from 48 characters including Kamado Tanjiro, Akaza, Tomioka Giyu and more.';
  
  return {
    title,
    description,
    keywords: lang === 'ja' 
      ? ['鬼滅の刃', '無限城編', '投票', '200億の男', 'ランキング', '竈門炭治郎', '猗窩座']
      : ['Demon Slayer', 'Infinity Castle', 'voting', 'ranking', 'Kamado Tanjiro', 'Akaza'],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://demonslayer-vote-site.pages.dev/'),
    alternates: {
      canonical: '/',
      languages: {
        'ja': '/ja',
        'en': '/en',
      },
    },
    openGraph: {
      title,
      description,
      url: 'https://demonslayer-vote-site.pages.dev/',
      siteName,
      images: [
        {
          url: 'https://demonslayer-vote-site.pages.dev/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: siteName,
        }
      ],
      locale: lang === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://demonslayer-vote-site.pages.dev/opengraph-image.jpg'],
      creator: '@gs223gs_',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = await getLanguage();
  
  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
