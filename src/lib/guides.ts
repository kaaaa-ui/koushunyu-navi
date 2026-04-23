import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  wordCount: number;
  tags: string[];
  content: string;
};

// ピラーファイルとメタデータのマッピング
// pillar_01-07はfrontmatter無し、08-10はfrontmatterあり
const PILLAR_META: Record<
  string,
  { slug: string; title: string; description: string; category: string; tags: string[] }
> = {
  "pillar_01_chatre_home_guide.md": {
    slug: "chatre-home-guide",
    title: "チャトレ在宅完全ガイド｜未経験でも月30万稼げる始め方【2026年版】",
    description:
      "在宅チャットレディで月30万を目指すための完全ガイド。未経験の始め方、サイト選び、稼ぐコツをナビちゃんが優しく解説",
    category: "chatlady",
    tags: ["チャトレ", "在宅", "未経験", "月30万"],
  },
  "pillar_02_night_work_ranking.md": {
    slug: "night-work-ranking",
    title: "夜職デビューで選ぶべき職種ランキング｜メリット・デメリット徹底比較【2026年版】",
    description:
      "夜職デビューの職種選びに迷ったら。キャバクラ・チャトレ・メンエスなどのメリデメをランキングで比較",
    category: "general",
    tags: ["夜職", "ランキング", "職種比較"],
  },
  "pillar_03_mibare_manual.md": {
    slug: "mibare-manual",
    title: "夜職・チャトレの身バレ対策完全マニュアル【2026年版】",
    description:
      "身バレが怖いあなたへ。顔バレ・知人バレ・SNSバレを防ぐ具体的な対策をナビちゃんが解説",
    category: "general",
    tags: ["身バレ対策", "顔バレ", "セキュリティ"],
  },
  "pillar_04_kakuteishinkoku_guide.md": {
    slug: "kakuteishinkoku-guide",
    title: "チャトレ・夜職の確定申告完全ガイド｜初心者でもわかる税金の話",
    description:
      "確定申告のやり方をナビちゃんが優しく解説。チャトレ・夜職の経費・節税・バレない方法まで",
    category: "general",
    tags: ["確定申告", "税金", "経費", "節税"],
  },
  "pillar_05_industry_comparison.md": {
    slug: "industry-comparison",
    title: "業界別メリデメ完全比較｜チャトレ・キャバ・メンエス・ナイトワークの違い【2026年版】",
    description:
      "チャトレ・キャバ・メンエス・ナイトワークを徹底比較。あなたに合う業界がわかる",
    category: "general",
    tags: ["業界比較", "チャトレ", "キャバクラ", "メンエス"],
  },
  "pillar_06_menseki_taiken.md": {
    slug: "menseki-taiken",
    title: "【未経験OK】面接〜体験入店の流れ完全ガイド｜服装・持ち物・質問集【2026年版】",
    description:
      "面接・体験入店の流れをナビちゃんが解説。服装・持ち物・質問への回答例を完全網羅",
    category: "general",
    tags: ["面接", "体験入店", "未経験", "服装"],
  },
  "pillar_07_fukugyo_10man.md": {
    slug: "fukugyo-10man",
    title: "副業チャトレで月10万を達成する3つの働き方｜本業と両立する時間術【2026年版】",
    description:
      "副業チャトレで月10万を目指す方法。本業との両立・時間管理・効率的な稼ぎ方をナビちゃんが解説",
    category: "chatlady",
    tags: ["副業", "チャトレ", "月10万", "時間術"],
  },
};

const PILLARS_DIR = path.join(process.cwd(), "src/content/pillars");
const GUIDES_DIR = path.join(process.cwd(), "src/content/guides");

// pillar_01-07: H1 + メタデータ行(「**カテゴリ**:」等) + 区切り「---」を除去し本文だけ返す
function stripMetaBlock(raw: string): string {
  const lines = raw.split("\n");
  let i = 0;
  // H1行をスキップ
  if (lines[i]?.startsWith("# ")) i++;
  // 空行スキップ
  while (i < lines.length && lines[i].trim() === "") i++;
  // **Key**: Value 行をスキップ
  while (i < lines.length && /^\*\*[^*]+\*\*\s*:/.test(lines[i])) i++;
  // 空行スキップ
  while (i < lines.length && lines[i].trim() === "") i++;
  // --- 区切りをスキップ
  if (i < lines.length && lines[i].trim() === "---") i++;
  return lines.slice(i).join("\n");
}

function estimateReadingTime(text: string): number {
  const charCount = text.replace(/\s/g, "").length;
  return Math.max(1, Math.ceil(charCount / 600));
}

function estimateWordCount(text: string): number {
  return text.replace(/\s/g, "").length;
}

/** 再帰的にディレクトリ内の .mdx ファイルを収集 */
function collectMdxFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMdxFiles(fullPath));
    } else if (entry.name.endsWith(".mdx")) {
      results.push(fullPath);
    }
  }
  return results;
}

/** MDXファイルからGuideを生成（slugはディレクトリ構造から） */
function parseMdxGuide(filePath: string): Guide {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // slugはGUIDES_DIRからの相対パス（拡張子除去）
  const relative = path.relative(GUIDES_DIR, filePath);
  const slug = relative.replace(/\.mdx$/, "");

  return {
    slug,
    title: (data.title as string) || "",
    description: (data.description as string) || "",
    category: (data.category as string) || "general",
    publishedAt: (data.publishedAt as string) || "2026-04-22",
    updatedAt: (data.updatedAt as string) || "2026-04-22",
    readingTime: estimateReadingTime(content),
    wordCount: estimateWordCount(content),
    tags: (data.tags as string[]) || [],
    content,
  };
}

export function getAllGuides(): Guide[] {
  // 1. 既存pillar記事
  const pillarFiles = fs.readdirSync(PILLARS_DIR).filter((f) => f.endsWith(".md") && f.startsWith("pillar_"));
  const pillarGuides = pillarFiles.map((file) => parsePillarFile(file));

  // 2. 新規MDXガイド記事
  const mdxFiles = collectMdxFiles(GUIDES_DIR);
  const mdxGuides = mdxFiles.map((filePath) => parseMdxGuide(filePath));

  return [...pillarGuides, ...mdxGuides].sort((a, b) => a.slug.localeCompare(b.slug));
}

function parsePillarFile(filename: string): Guide {
  const filePath = path.join(PILLARS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  // frontmatterありの場合（pillar_08-13）
  if (data.slug) {
    return {
      slug: data.slug as string,
      title: (data.title as string) || "",
      description: (data.description as string) || "",
      category: (data.subcategory as string) || (data.category as string) || "general",
      publishedAt: (data.publishedAt as string) || "2026-04-06",
      updatedAt: (data.updatedAt as string) || "2026-04-06",
      readingTime: estimateReadingTime(content),
      wordCount: estimateWordCount(content),
      tags: (data.subKeywords as string[]) || [],
      content,
    };
  }

  // frontmatter無しの場合（pillar_01-07）- メタデータブロック除去
  const cleanContent = stripMetaBlock(content);
  const meta = PILLAR_META[filename];
  if (!meta) {
    const slug = filename.replace(/\.md$/, "").replace(/^pillar_\d+_/, "");
    return {
      slug,
      title: content.split("\n").find((l) => l.startsWith("# "))?.replace("# ", "") || slug,
      description: "",
      category: "general",
      publishedAt: "2026-04-05",
      updatedAt: "2026-04-05",
      readingTime: estimateReadingTime(cleanContent),
      wordCount: estimateWordCount(cleanContent),
      tags: [],
      content: cleanContent,
    };
  }

  return {
    ...meta,
    publishedAt: "2026-04-05",
    updatedAt: "2026-04-05",
    readingTime: estimateReadingTime(cleanContent),
    wordCount: estimateWordCount(cleanContent),
    content: cleanContent,
  };
}

export function getGuideBySlug(slug: string): Guide | undefined {
  return getAllGuides().find((g) => g.slug === slug);
}

export function getGuideSlugs(): string[] {
  return getAllGuides().map((g) => g.slug);
}
