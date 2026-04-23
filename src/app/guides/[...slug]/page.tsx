import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { parseMarkdown } from "@/lib/markdown";
import { NaviChanMessage } from "@/components/navi-chan";

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");
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
      canonical: `https://koushunyu-navi.vercel.app/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const { htmlContent } = await parseMarkdown(guide.content);

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
      logo: { "@type": "ImageObject", url: "https://koushunyu-navi.vercel.app/logo.png" },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Top", item: "https://koushunyu-navi.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "ガイド", item: "https://koushunyu-navi.vercel.app/guides/" },
      { "@type": "ListItem", position: 3, name: guide.title, item: `https://koushunyu-navi.vercel.app/guides/${guide.slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <article className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-sm text-pink-400">
          <Link href="/" className="hover:text-pink-500">Top</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-pink-500">ガイド</Link>
          <span className="mx-2">/</span>
          <span className="text-pink-700">{guide.title}</span>
        </nav>

        <header className="mb-8 rounded-2xl bg-gradient-to-r from-pink-50 to-white p-6 border border-pink-100">
          <div className="mb-3 flex items-center gap-2 text-xs text-pink-400">
            <span>公開: {guide.publishedAt}</span>
            <span>&middot; 更新: {guide.updatedAt}</span>
            <span>&middot; {guide.readingTime}分</span>
          </div>
          <h1 className="mb-4 font-heading text-2xl font-bold leading-relaxed text-pink-700 md:text-3xl">
            {guide.title}
          </h1>
          <p className="text-pink-900/60">{guide.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {guide.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-pink-100 px-3 py-0.5 text-xs text-pink-500">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mb-10">
          <NaviChanMessage variant="quote">
            <p>
              こんにちは、ナビちゃんです。この記事では「{guide.title.split("｜")[0]}」について、
              知っていることを全部まとめました。焦らなくて大丈夫、一緒に読んでいきましょう。
            </p>
          </NaviChanMessage>
        </div>

        <div className="prose-editorial max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>

        <div className="my-12 rounded-3xl bg-gradient-to-r from-pink-100 to-yellow-50 p-8 text-center">
          <p className="mb-4 text-sm text-pink-700">
            業界のこと、もっと詳しく知りたい？
            <br />
            ナビちゃんにLINEで質問できるよ
          </p>
          <Link href="/line" className="btn-pink-gradient text-sm">
            LINEで質問する
          </Link>
          <p className="mt-3 text-xs text-pink-400">
            ※業界の一般情報をご案内しています。個別の店舗紹介・お仕事の斡旋は行っておりません。
          </p>
        </div>
      </article>
    </>
  );
}
