import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guides";
import { getAllJobPages, getCategories } from "@/lib/jobs";

const BASE_URL = "https://koushunyu-navi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides();
  const jobPages = getAllJobPages();
  const categories = getCategories();
  const now = new Date();

  return [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    ...guides.map((g) => ({
      url: `${BASE_URL}/guides/${g.slug}`,
      lastModified: new Date(g.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...categories.map((cat) => ({
      url: `${BASE_URL}/jobs/${cat}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...jobPages.map((j) => ({
      url: `${BASE_URL}/jobs/${j.category}/${j.prefecture}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
