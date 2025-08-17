/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages用の設定
  output: 'standalone',
  
  // Edge Runtimeの問題を回避
  experimental: {
    runtime: 'nodejs',
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // 画像最適化の設定
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Cloudflareでは外部画像サービスを使用
    unoptimized: true,
  },

  // Cloudflare向けのWebpack設定
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // クライアントサイドのポリフィル
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    return config;
  },

  // 環境変数の設定
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.CF_PAGES_URL || 'https://demonslayer-vote-site.pages.dev/',
  },
};

module.exports = nextConfig;