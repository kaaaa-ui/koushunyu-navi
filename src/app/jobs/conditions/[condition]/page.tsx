import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  CONDITION_LABELS,
  CONDITION_DETAILS,
  CATEGORY_LABELS,
  TOP_PREFECTURES,
  getCategoryLabel,
  getPrefectureLabel,
  getConditionLabel,
} from "@/lib/jobs";
import { NaviChan, NaviChanBanner } from "@/components/navi-chan";

const LINE_URL = "https://line.me/R/ti/p/%40309gsalq";

// 条件ランディングで表示する主要カテゴリ6つ
const FEATURED_CATEGORIES = [
  "chatlady", "cabaret-club", "mens-esthe", "girls-bar", "concafe", "lounge",
];

export function generateStaticParams() {
  return Object.keys(CONDITION_LABELS).map((condition) => ({ condition }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ condition: string }>;
}): Promise<Metadata> {
  const { condition } = await params;
  const label = getConditionLabel(condition);
  if (!label) return {};
  return {
    title: `【${label}】の高収入求人一覧｜エリア×職種で探す`,
    description: `${label}の高収入求人をエリア・職種別に探せます。${CONDITION_DETAILS[condition]?.desc || ""}`,
    alternates: { canonical: `https://koushunyu-navi.vercel.app/jobs/conditions/${condition}` },
  };
}

export default async function ConditionLandingPage({
  params,
}: {
  params: Promise<{ condition: string }>;
}) {
  const { condition } = await params;
  const label = getConditionLabel(condition);
  const detail = CONDITION_DETAILS[condition];
  if (!label || !detail) notFound();

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Top", item: "https://koushunyu-navi.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "求人一覧", item: "https://koushunyu-navi.vercel.app/jobs/" },
      { "@type": "ListItem", position: 3, name: label, item: `https://koushunyu-navi.vercel.app/jobs/conditions/${condition}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <nav className="mb-4 text-sm text-pink-400">
          <Link href="/" className="hover:text-pink-500">Top</Link>
          <span className="mx-2">/</span>
          <Link href="/jobs" className="hover:text-pink-500">求人一覧</Link>
          <span className="mx-2">/</span>
          <span className="text-pink-700">{label}</span>
        </nav>

        <h1 className="section-title mb-2 text-2xl font-bold text-pink-600 md:text-3xl">
          【{label}】の高収入求人
        </h1>
        <p className="mb-4 text-center text-sm text-pink-900/60">
          {detail.desc}
        </p>

        <div className="mb-8 rounded-2xl border border-pink-200 bg-white p-6">
          <div className="flex items-start gap-4">
            <NaviChan size="md" />
            <div>
              <p className="text-sm text-pink-900/70">
                <b>「{label}」のメリット：</b>{detail.merit}
              </p>
              <p className="mt-2 text-sm text-pink-900/60">
                <b>選ぶポイント：</b>{detail.point}
              </p>
            </div>
          </div>
        </div>

        {/* 職種 × エリア マトリクス */}
        <h2 className="section-title mb-6 text-xl font-bold text-pink-600">
          職種から探す
        </h2>
        {FEATURED_CATEGORIES.map((cat) => (
          <div key={cat} className="mb-8">
            <h3 className="mb-3 text-base font-bold text-pink-700">
              <Link href={`/jobs/${cat}`} className="hover:text-pink-500">
                {getCategoryLabel(cat)}
              </Link>
              <span className="ml-2 text-sm font-normal text-pink-400">× {label}</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {TOP_PREFECTURES.map((pref) => (
                <Link
                  key={pref}
                  href={`/jobs/${cat}/${pref}/${condition}`}
                  className="rounded-full border border-pink-200 bg-white px-4 py-2 text-sm text-pink-600 hover:border-pink-400 hover:shadow-sm"
                >
                  {getPrefectureLabel(pref)}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* 他の条件 */}
        <h2 className="section-title mb-6 mt-12 text-xl font-bold text-pink-600">
          他の条件で探す
        </h2>
        <div className="flex flex-wrap gap-3">
          {Object.entries(CONDITION_LABELS)
            .filter(([k]) => k !== condition)
            .map(([slug, lbl]) => (
              <Link
                key={slug}
                href={`/jobs/conditions/${slug}`}
                className="rounded-full border border-pink-200 bg-white px-5 py-2.5 text-sm text-pink-600 hover:border-pink-400 hover:shadow-md hover:shadow-pink-100"
              >
                {lbl}
              </Link>
            ))}
        </div>

        {/* CTA */}
        <div className="mt-12">
          <NaviChanBanner position="left">
            <h3 className="mb-2 font-heading text-lg font-bold text-pink-600">
              自分に合うお仕事がわからない？
            </h3>
            <p className="mb-4 text-sm text-pink-900/60">
              ナビちゃんにLINEで相談してね！MBTI診断もできるよ。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-[#06C755] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-200 hover:bg-[#05b04c]"
              >
                LINEで相談する
              </a>
              <Link
                href="/shindan/mbti"
                className="inline-block rounded-full border-2 border-pink-300 bg-white px-6 py-2.5 text-sm font-semibold text-pink-500 hover:bg-pink-50"
              >
                MBTI診断する
              </Link>
            </div>
          </NaviChanBanner>
        </div>
      </div>
    </>
  );
}
