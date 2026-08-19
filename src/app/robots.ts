import type { MetadataRoute } from "next";

const SITE_URL = "https://konta-niki.com";

export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE_URL,
    rules: { allow: "/", disallow: ["/contact/success"], userAgent: "*" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
