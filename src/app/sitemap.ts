import type { MetadataRoute } from "next";

const SITE_URL = "https://konta-niki.com";

// 送信完了ページは検索結果に出す必要が無いので載せない。
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/works", "/news", "/pricing", "/contact"].map((path) => ({
    changeFrequency: path === "/news" ? "weekly" : "monthly",
    lastModified: new Date(),
    priority: path === "" ? 1 : 0.8,
    url: `${SITE_URL}${path}`,
  }));
}
