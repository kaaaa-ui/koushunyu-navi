import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guides";
import { getAllJobPages, getCategories, getAllConditionPages, CONDITION_LABELS } from "@/lib/jobs";

const BASE_URL = "https://koushunyu-navi.vercel.app";

// Next.js will auto-generate /sitemap/0.xml, /sitemap/1.xml, etc.
// and a sitemap index at /sitemap.xml
export async function generateSitemaps() {
  // Split into chunks: 0=core+guides+categories, 1=job pages, 2-5=condition pages
  return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Sitemap 0: Core pages + guides + categories + condition landings
  if (id === 0) {
    const guides = getAllGuides();
    const categories = getCategories();
    const conditions = Object.keys(CONDITION_LABELS);
    return [
      { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
      { url: `${BASE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
      { url: `${BASE_URL}/jobs`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
      { url: `${BASE_URL}/shindan/mbti`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
      { url: `${BASE_URL}/line`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
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
      ...conditions.map((cond) => ({
        url: `${BASE_URL}/jobs/conditions/${cond}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ];
  }

  // Sitemap 1: Job prefecture pages (940)
  if (id === 1) {
    const jobPages = getAllJobPages();
    return jobPages.map((j) => ({
      url: `${BASE_URL}/jobs/${j.category}/${j.prefecture}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  }

  // Sitemaps 2-5: Condition pages (3,000 split into 4 chunks of ~750)
  const allConditions = getAllConditionPages();
  const chunkSize = Math.ceil(allConditions.length / 4);
  const chunkIndex = id - 2; // 0, 1, 2, 3
  const chunk = allConditions.slice(chunkIndex * chunkSize, (chunkIndex + 1) * chunkSize);

  return chunk.map((cp) => ({
    url: `${BASE_URL}/jobs/${cp.category}/${cp.prefecture}/${cp.condition}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
}
