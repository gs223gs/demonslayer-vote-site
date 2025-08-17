import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

// 開発環境でCloudflare Workersの環境をエミュレート
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Workers用の設定
  experimental: {
    runtime: 'edge', // Edge Runtime使用
  },

  // 画像最適化の設定
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Cloudflare Workersでは画像最適化を無効化
    unoptimized: true,
  },

  // 環境変数
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.CF_PAGES_URL || 'https://demonslayer-vote-site.pages.dev/',
  },

  // ESModuleとして出力
  transpilePackages: ['@supabase/ssr', '@supabase/supabase-js'],
};

export default nextConfig;