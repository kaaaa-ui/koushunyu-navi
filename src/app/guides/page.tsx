import Link from "next/link";
import { Metadata } from "next";
import { getAllGuides } from "@/lib/guides";
import { NaviChan } from "@/components/navi-chan";

export const metadata: Metadata = {
  title: "ガイド記事一覧｜高収入副業を始める前に読むべき完全ガイド",
  description:
    "チャトレ・キャバ・メンエスなど、高収入副業を始める前に読むべきガイド記事まとめ。ナビちゃんが優しく解説。",
};

export default function GuidesPage() {
  const guides = getAllGuides();
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-pink-400">
        <Link href="/" className="hover:text-pink-500">Top</Link>
        <span className="mx-2">/</span>
        <span className="text-pink-700">ガイド記事</span>
      </nav>

      {/* ヘッダー with ナビちゃん */}
      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <NaviChan size="xl" rounded={false} />
        <div>
          <h1 className="section-title text-2xl font-bold text-pink-600">ガイド記事一覧</h1>
          <p className="mt-4 text-sm text-pink-900/60">
            ナビちゃんが高収入副業の始め方を優しく解説した完全ガイド集。
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="card-kawaii block p-6"
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-pink-400">
              <span>{guide.publishedAt}</span>
              <span>&middot; {guide.readingTime}分で読める</span>
              <span>&middot; {guide.wordCount.toLocaleString()}字</span>
            </div>
            <h2 className="mb-2 font-heading text-lg font-bold text-pink-700">{guide.title}</h2>
            <p className="text-sm text-pink-900/60">{guide.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {guide.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-pink-50 px-3 py-0.5 text-xs text-pink-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
