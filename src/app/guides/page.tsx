import Link from "next/link";
import { Metadata } from "next";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "ガイド記事一覧｜高収入副業を始める前に読むべき完全ガイド",
  description:
    "チャトレ・キャバ・メンエスなど、高収入副業を始める前に読むべきガイド記事まとめ。ナビちゃんが優しく解説💓",
};

export default function GuidesPage() {
  const guides = getAllGuides();
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-pink-600">Top</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">ガイド記事</span>
      </nav>
      <h1 className="mb-4 text-3xl font-bold text-gray-900">ガイド記事一覧</h1>
      <p className="mb-8 text-gray-600">
        ナビちゃんが高収入副業の始め方を優しく解説した完全ガイド集💓
      </p>
      <div className="space-y-4">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block rounded-2xl border border-pink-100 bg-white p-6 transition hover:border-pink-300 hover:shadow-md"
          >
            <div className="mb-2 flex items-center gap-2 text-xs text-gray-500">
              <span>{guide.publishedAt}</span>
              <span>・{guide.readingTime}分で読める</span>
              <span>・{guide.wordCount.toLocaleString()}字</span>
            </div>
            <h2 className="mb-2 text-lg font-bold text-gray-900">{guide.title}</h2>
            <p className="text-sm text-gray-600">{guide.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {guide.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-pink-50 px-3 py-1 text-xs text-pink-700"
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
