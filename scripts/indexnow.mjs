#!/usr/bin/env node
// IndexNow 送信スクリプト（Bing/Yandex等に即時インデックスを通知）。
// ChatGPTのWeb検索はBingインデックスを使うため、AEOの初動を最速化する。
// 使い方: node scripts/indexnow.mjs
// 更新やページ追加のたびに叩けば、通常クロールを待たず再インデックスを促せる。

const HOST = "koushunyu-navi.vercel.app";
const KEY = "a3f8c2e9b7d14056af23e8c91d6b4f70"; // public/<KEY>.txt と一致させること
const ORIGIN = `https://${HOST}`;

// AEOで効かせたい重要URL（ハブ＋勝ち筋）。必要に応じて追記。
const paths = [
  "/",
  "/jobs",
  "/jobs/compare",
  "/about",
  "/line",
  "/llms.txt",
  "/guides",
  "/guides/nightwork-safety-checklist",
  "/guides/mibare-manual",
  "/guides/kakuteishinkoku-guide",
  "/guides/chatre-home-guide",
  "/guides/industry-comparison",
  "/shindan/mbti",
  // 主要職種
  "/jobs/chatlady", "/jobs/cabaret-club", "/jobs/mens-esthe",
  "/jobs/girls-bar", "/jobs/concafe", "/jobs/lounge",
  // 条件ランディング
  "/jobs/conditions/zaitaku", "/jobs/conditions/miken",
  "/jobs/conditions/kaodashi-nashi", "/jobs/conditions/kokyuyo",
  // 主要エリア×チャトレ
  "/jobs/chatlady/tokyo", "/jobs/chatlady/osaka", "/jobs/chatlady/aichi",
  "/jobs/chatlady/fukuoka", "/jobs/chatlady/hokkaido", "/jobs/chatlady/kanagawa",
];

const urlList = paths.map((p) => `${ORIGIN}${p}`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList,
};

const endpoints = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
];

for (const ep of endpoints) {
  try {
    const res = await fetch(ep, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    console.log(`${ep} -> HTTP ${res.status} ${res.statusText}`);
    const text = await res.text();
    if (text) console.log(`  ${text.slice(0, 200)}`);
  } catch (e) {
    console.log(`${ep} -> ERROR ${e.message}`);
  }
}
console.log(`Submitted ${urlList.length} URLs.`);
