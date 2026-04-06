import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategories,
  getCategoryLabel,
  getPrefecturesByCategory,
  getPrefectureLabel,
} from "@/lib/jobs";

export function generateStaticParams() {
  return getCategories().map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = getCategoryLabel(category);
  return {
    title: `${label}の求人｜エリアで探す`,
    description: `${label}の求人をエリア別に探せます。未経験OK・高時給のお仕事をナビちゃんが紹介`,
    alternates: { canonical: `https://koushunyu-navi.com/jobs/${category}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const prefectures = getPrefecturesByCategory(category);
  if (prefectures.length === 0) notFound();

  const label = getCategoryLabel(category);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Top", item: "https://koushunyu-navi.com/" },
      { "@type": "ListItem", position: 2, name: "求人一覧", item: "https://koushunyu-navi.com/jobs/" },
      { "@type": "ListItem", position: 3, name: label, item: `https://koushunyu-navi.com/jobs/${category}/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-pink-600">Top</Link>
          <span className="mx-2">/</span>
          <Link href="/jobs" className="hover:text-pink-600">求人一覧</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{label}</span>
        </nav>

        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
          {label}の求人｜エリアで探す
        </h1>
        <p className="mb-8 text-gray-600">
          {label}の求人をエリアから探してみてね
        </p>

        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-5">
          {prefectures.map((pref) => (
            <Link
              key={pref}
              href={`/jobs/${category}/${pref}`}
              className="rounded-xl border border-pink-100 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 shadow-sm hover:border-pink-300 hover:bg-pink-50"
            >
              {getPrefectureLabel(pref)}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
