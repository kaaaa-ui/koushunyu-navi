/**
 * IndexNow一括送信スクリプト
 * 使い方: npx tsx scripts/submit-indexnow.ts
 */

const INDEXNOW_KEY = "0b7b48aab297452f97cd4aa772d01756";
const HOST = "koushunyu-navi.vercel.app";
const BASE_URL = `https://${HOST}`;

async function getAllUrls(): Promise<string[]> {
  // サイトマップXMLを取得してURLを抽出
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  const xml = await res.text();
  const urls: string[] = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function submitToIndexNow(urls: string[]) {
  console.log(`🚀 IndexNow: ${urls.length}ページを送信中...`);

  const batchSize = 10000;
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;

    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: batch,
      }),
    });

    console.log(`  Batch ${batchNum}: ${batch.length}件 → HTTP ${res.status} (${res.status === 200 || res.status === 202 ? "✅ OK" : "❌ Failed"})`);
  }
}

async function main() {
  const urls = await getAllUrls();
  console.log(`📊 サイトマップから ${urls.length} URL を検出`);

  if (urls.length === 0) {
    console.error("❌ URLが見つかりませんでした。サイトが稼働中か確認してください。");
    process.exit(1);
  }

  await submitToIndexNow(urls);
  console.log("\n✅ IndexNow送信完了！Bing/Yandexが数時間以内にクロール開始します。");
}

main().catch(console.error);
