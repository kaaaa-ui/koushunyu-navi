import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/api/", "/_next/", "/admin/"];

  // AI検索／生成AIのクローラーを明示的に許可（AEO/GEO/LLMO）。
  // 一般botは "*" で許可済みだが、AI系は独自トークンで挙動が変わるため明示する。
  const aiBots = [
    "GPTBot", // OpenAI 学習用クローラー
    "OAI-SearchBot", // ChatGPT Search のインデックス
    "ChatGPT-User", // ChatGPT がユーザー応答時にアクセス
    "PerplexityBot", // Perplexity
    "Perplexity-User",
    "Google-Extended", // Gemini / AI Overviews
    "Applebot-Extended", // Apple Intelligence
    "ClaudeBot", // Anthropic
    "anthropic-ai",
    "Claude-Web",
    "DuckAssistBot",
    "cohere-ai",
    "Amazonbot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        userAgent: aiBots,
        allow: "/",
        disallow,
      },
    ],
    sitemap: "https://koushunyu-navi.vercel.app/sitemap.xml",
    host: "https://koushunyu-navi.vercel.app",
  };
}
