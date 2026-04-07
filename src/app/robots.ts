import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: [
      "https://koushunyu-navi.vercel.app/sitemap/0.xml",
      "https://koushunyu-navi.vercel.app/sitemap/1.xml",
      "https://koushunyu-navi.vercel.app/sitemap/2.xml",
      "https://koushunyu-navi.vercel.app/sitemap/3.xml",
      "https://koushunyu-navi.vercel.app/sitemap/4.xml",
      "https://koushunyu-navi.vercel.app/sitemap/5.xml",
    ],
  };
}
