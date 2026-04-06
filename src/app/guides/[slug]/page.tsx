import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { parseMarkdown } from "@/lib/markdown";

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      tags: guide.tags,
    },
    alternates: {
      canonical: `https://koushunyu-navi.com/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const { htmlContent } = await parseMarkdown(guide.content);

  // JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: "高収入ナビ" },
    publisher: {
      "@type": "Organization",
      name: "高収入ナビ",
      logo: {
        "@type": "ImageObject",
        url: "https://koushunyu-navi.com/logo.png",
      },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Top", item: "https://koushunyu-navi.com/" },
      { "@type": "ListItem", position: 2, name: "ガイド", item: "https://koushunyu-navi.com/guides/" },
      { "@type": "ListItem", position: 3, name: guide.title, item: `https://koushunyu-navi.com/guides/${guide.slug}/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-8">
        {/* パンくず */}
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-pink-600">Top</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-pink-600">ガイド</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{guide.title}</span>
        </nav>

        {/* ヘッダー */}
        <header className="mb-8">
          <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
            <span>公開: {guide.publishedAt}</span>
            <span>・更新: {guide.updatedAt}</span>
            <span>・{guide.readingTime}分</span>
          </div>
          <h1 className="mb-4 text-2xl font-bold leading-relaxed text-gray-900 md:text-3xl">
            {guide.title}
          </h1>
          <p className="text-gray-600">{guide.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {guide.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-pink-50 px-3 py-1 text-xs text-pink-700">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* ナビちゃん導入 */}
        <div className="mb-8 rounded-2xl border border-pink-100 bg-pink-50/50 p-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="text-3xl">👧</div>
            <div className="text-sm font-bold text-pink-600">ナビちゃんより💓</div>
          </div>
          <p className="text-sm leading-relaxed text-gray-700">
            こんにちは、ナビちゃんだよ💓 この記事では「{guide.title.split("｜")[0]}」について、
            ナビちゃんが知ってることを全部まとめたよ。焦らなくて大丈夫、一緒に読んでいこうね✨
          </p>
        </div>

        {/* 本文 */}
        <div className="prose prose-pink max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>

        {/* CTA */}
        <div className="my-12 rounded-3xl bg-gradient-to-r from-pink-100 to-yellow-50 p-8 text-center">
          <p className="mb-4 text-sm text-gray-700">
            お仕事のこと、もっと詳しく聞きたい？<br />
            ナビちゃんとLINEで相談できるよ💓
          </p>
          <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600">
            <Link href="/line">LINEで無料相談する</Link>
          </Button>
        </div>
      </article>
    </>
  );
}
