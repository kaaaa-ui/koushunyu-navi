import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type JobPage = {
  category: string;
  prefecture: string;
  title: string;
  description: string;
  content: string;
};

const JOBS_DIR = path.join(process.cwd(), "src/content/jobs");

const CATEGORY_LABELS: Record<string, string> = {
  "cabaret-club": "キャバクラ",
  chatlady: "チャットレディ",
  concafe: "コンカフェ",
  "delivery-health": "デリヘル",
  "fuzoku-esthe": "風俗エステ",
  gallardo: "ガールズバー",
  "girls-bar": "ガールズバー",
  health: "ヘルス",
  "hitozuma-delivery": "人妻デリヘル",
  "hotel-health": "ホテヘル",
  "hoteto-l": "ホテル型ヘルス",
  "image-club": "イメクラ",
  lounge: "ラウンジ",
  "m-kankan": "M性感",
  "mens-esthe": "メンズエステ",
  "ona-club": "オナクラ",
  "pink-salon": "ピンサロ",
  "seki-kyaba": "セクキャバ",
  "sm-club": "SMクラブ",
  soapland: "ソープランド",
};

const PREFECTURE_LABELS: Record<string, string> = {
  hokkaido: "北海道",
  miyagi: "宮城県",
  ibaraki: "茨城県",
  saitama: "埼玉県",
  chiba: "千葉県",
  tokyo: "東京都",
  kanagawa: "神奈川県",
  niigata: "新潟県",
  shizuoka: "静岡県",
  aichi: "愛知県",
  kyoto: "京都府",
  osaka: "大阪府",
  hyogo: "兵庫県",
  hiroshima: "広島県",
  fukuoka: "福岡県",
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category;
}

export function getPrefectureLabel(prefecture: string): string {
  return PREFECTURE_LABELS[prefecture] || prefecture;
}

export function getAllJobPages(): JobPage[] {
  const files = fs.readdirSync(JOBS_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const [category, prefWithExt] = file.split("--");
    const prefecture = prefWithExt.replace(".md", "");
    const raw = fs.readFileSync(path.join(JOBS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const titleLine = content.split("\n").find((l) => l.startsWith("# "));
    const title =
      (data.title as string) ||
      titleLine?.replace("# ", "") ||
      `${getPrefectureLabel(prefecture)}の${getCategoryLabel(category)}求人`;
    return {
      category,
      prefecture,
      title,
      description:
        (data.description as string) ||
        `${getPrefectureLabel(prefecture)}の${getCategoryLabel(category)}求人情報。未経験OK・高時給のお仕事をナビちゃんが紹介`,
      content,
    };
  });
}

export function getJobPage(category: string, prefecture: string): JobPage | undefined {
  return getAllJobPages().find(
    (j) => j.category === category && j.prefecture === prefecture
  );
}

export function getCategories(): string[] {
  const pages = getAllJobPages();
  return [...new Set(pages.map((p) => p.category))].sort();
}

export function getPrefecturesByCategory(category: string): string[] {
  const pages = getAllJobPages();
  return pages.filter((p) => p.category === category).map((p) => p.prefecture).sort();
}

export function getAllCategoryLabels(): Record<string, string> {
  return CATEGORY_LABELS;
}

export function getAllPrefectureLabels(): Record<string, string> {
  return PREFECTURE_LABELS;
}
