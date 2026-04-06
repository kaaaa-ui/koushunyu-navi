import Link from "next/link";
import type { Metadata } from "next";
import { getCategories, getCategoryLabel, getPrefecturesByCategory, getPrefectureLabel } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "求人一覧｜職種×エリアで探す",
  description:
    "チャットレディ・キャバクラ・メンズエステなど、全国の高収入求人を職種×エリアで探せます。ナビちゃんがあなたにぴったりのお仕事を紹介",
  alternates: { canonical: "https://koushunyu-navi.com/jobs" },
};

export default function JobsIndexPage() {
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-pink-600">Top</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">求人一覧</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
        求人一覧｜職種×エリアで探す
      </h1>
      <p className="mb-8 text-gray-600">
        気になる職種をタップして、エリアごとの求人をチェックしてね
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const prefs = getPrefecturesByCategory(cat);
          return (
            <div
              key={cat}
              className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
            >
              <Link
                href={`/jobs/${cat}`}
                className="mb-3 block text-lg font-bold text-pink-600 hover:underline"
              >
                {getCategoryLabel(cat)}
              </Link>
              <div className="flex flex-wrap gap-1.5">
                {prefs.map((pref) => (
                  <Link
                    key={pref}
                    href={`/jobs/${cat}/${pref}`}
                    className="rounded-full bg-pink-50 px-2.5 py-1 text-xs text-pink-700 hover:bg-pink-100"
                  >
                    {getPrefectureLabel(pref)}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
