import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // CSP は入れていない。YouTube の埋め込み・microCMS の画像・Google の favicon・
  // Google Fonts を許す一覧を保つ手間に対して、得るものが少ない
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  experimental: {
    typedEnv: true,
    // typedRoutes: true,
    useLightningcss: true,
  },
  images: {
    qualities: [100],
    unoptimized: true,
  },
  reactCompiler: true,
  reactStrictMode: false,
};

export default nextConfig;
