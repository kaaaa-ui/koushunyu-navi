/**
 * Google Indexing API送信スクリプト（JobPostingページ用）
 *
 * 事前準備:
 * 1. Google Cloud Console → APIとサービス → Indexing API有効化
 * 2. サービスアカウント作成 → JSONキーダウンロード
 * 3. GSCでサービスアカウントのメールをオーナーとして追加
 * 4. JSONキーを scripts/google-service-account.json に配置
 *
 * 使い方: npx tsx scripts/submit-google-indexing.ts
 *
 * 制限: 1日200リクエスト（無料）
 */

import * as fs from "fs";
import * as path from "path";

const BASE_URL = "https://koushunyu-navi.vercel.app";
const KEY_PATH = path.join(__dirname, "google-service-account.json");
const DAILY_LIMIT = 200;

async function getAccessToken(): Promise<string> {
  if (!fs.existsSync(KEY_PATH)) {
    console.error("❌ サービスアカウントキーが見つかりません");
    console.error("   scripts/google-service-account.json を配置してください");
    console.error("   詳細: https://developers.google.com/search/apis/indexing-api/v3/prereqs");
    process.exit(1);
  }

  // google-auth-library が必要
  // npm install google-auth-library
  const { GoogleAuth } = await import("google-auth-library");
  const auth = new GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  return token.token!;
}

async function getJobUrls(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/sitemap.xml`);
  const xml = await res.text();
  const urls: string[] = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    // JobPostingページのみ（/jobs/ 配下）
    if (match[1].includes("/jobs/")) {
      urls.push(match[1]);
    }
  }
  return urls;
}

async function submitToGoogle(urls: string[], token: string) {
  const batch = urls.slice(0, DAILY_LIMIT);
  console.log(`🚀 Google Indexing API: ${batch.length}/${urls.length}ページを送信中...`);

  let success = 0;
  let failed = 0;

  for (const url of batch) {
    const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url,
        type: "URL_UPDATED",
      }),
    });

    if (res.ok) {
      success++;
    } else {
      failed++;
      if (failed <= 3) {
        const err = await res.text();
        console.error(`  ❌ ${url}: ${err}`);
      }
    }
  }

  console.log(`\n📊 結果: ✅ ${success}件成功 / ❌ ${failed}件失敗`);
  if (urls.length > DAILY_LIMIT) {
    console.log(`⏳ 残り${urls.length - DAILY_LIMIT}件は明日以降に送信してください（1日200件制限）`);
  }
}

async function main() {
  const urls = await getJobUrls();
  console.log(`📊 JobPostingページ: ${urls.length}件検出`);

  const token = await getAccessToken();
  await submitToGoogle(urls, token);

  console.log("\n✅ 完了！Googleが優先的にクロール・インデックスします。");
}

main().catch(console.error);
