import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guides";
import { getAllJobPages, getCategories, getAllConditionPages, CONDITION_LABELS } from "@/lib/jobs";

const BASE_URL = "https://koushunyu-navi.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides();
  const jobPages = getAllJobPages();
  const categories = getCategories();
  const conditionPages = getAllConditionPages();
  const conditions = Object.keys(CONDITION_LABELS);
  const now = new Date();

  return [
    // Core pages
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/shindan/mbti`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/line`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // TODO: /terms ページ作成後に追加

    // Guide pages
    ...guides.map((g) => ({
      url: `${BASE_URL}/guides/${g.slug}`,
      lastModified: new Date(g.updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),

    // Category pages
    ...categories.map((cat) => ({
      url: `${BASE_URL}/jobs/${cat}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    // Condition landing pages
    ...conditions.map((cond) => ({
      url: `${BASE_URL}/jobs/conditions/${cond}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),

    // Job prefecture pages (940)
    ...jobPages.map((j) => ({
      url: `${BASE_URL}/jobs/${j.category}/${j.prefecture}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),

    // Condition pages (3,000)
    ...conditionPages.map((cp) => ({
      url: `${BASE_URL}/jobs/${cp.category}/${cp.prefecture}/${cp.condition}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
