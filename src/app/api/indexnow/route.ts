import { NextResponse } from "next/server";
import sitemap from "@/app/sitemap";

const INDEXNOW_KEY = "0b7b48aab297452f97cd4aa772d01756";
const HOST = "koushunyu-navi.vercel.app";

export async function POST() {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  // IndexNow allows max 10,000 URLs per request
  const batchSize = 10000;
  const results: { batch: number; status: number; urls: number }[] = [];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: batch,
      }),
    });
    results.push({
      batch: Math.floor(i / batchSize) + 1,
      status: res.status,
      urls: batch.length,
    });
  }

  return NextResponse.json({
    success: true,
    totalUrls: urls.length,
    results,
  });
}
