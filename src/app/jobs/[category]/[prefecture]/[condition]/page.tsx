import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllConditionPages,
  generateConditionContent,
  getCategoryLabel,
  getPrefectureLabel,
  getConditionLabel,
  CONDITION_LABELS,
  CATEGORY_LABELS,
  TOP_PREFECTURES,
} from "@/lib/jobs";
import { parseMarkdown } from "@/lib/markdown";
import { NaviChan, NaviChanBanner } from "@/components/navi-chan";

const LINE_URL = "https://line.me/R/ti/p/%40309gsalq";

export function generateStaticParams() {
  return getAllConditionPages();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; prefecture: string; condition: string }>;
}): Promise<Metadata> {
  const { category, prefecture, condition } = await params;
  const page = generateConditionContent(category, prefecture, condition);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: `https://koushunyu-navi.vercel.app/jobs/${category}/${prefecture}/${condition}`,
    },
  };
}

export default async function ConditionPage({
  params,
}: {
  params: Promise<{ category: string; prefecture: string; condition: string }>;
}) {
  const { category, prefecture, condition } = await params;
  const page = generateConditionContent(category, prefecture, condition);
  if (!page) notFound();

  const { htmlContent } = await parseMarkdown(page.content);
  const catLabel = getCategoryLabel(category);
  const prefLabel = getPrefectureLabel(prefecture);
  const condLabel = getConditionLabel(condition);

  const jobPostingLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `${prefLabel}の${catLabel}【${condLabel}】`,
    description: page.description,
    datePosted: "2026-04-06",
    employmentType: "PART_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "高収入ナビ",
      sameAs: "https://koushunyu-navi.vercel.app",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: prefLabel,
        addressCountry: "JP",
      },
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Top", item: "https://koushunyu-navi.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "求人一覧", item: "https://koushunyu-navi.vercel.app/jobs/" },
      { "@type": "ListItem", position: 3, name: catLabel, item: `https://koushunyu-navi.vercel.app/jobs/${category}/` },
      { "@type": "ListItem", position: 4, name: prefLabel, item: `https://koushunyu-navi.vercel.app/jobs/${category}/${prefecture}/` },
      { "@type": "ListItem", position: 5, name: condLabel, item: `https://koushunyu-navi.vercel.app/jobs/${category}/${prefecture}/${condition}/` },
    ],
  };

  // 他の条件へのリンク
  const otherConditions = Object.entries(CONDITION_LABELS).filter(([k]) => k !== condition);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <article className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-sm text-pink-400">
          <Link href="/" className="hover:text-pink-500">Top</Link>
          <span className="mx-2">/</span>
          <Link href="/jobs" className="hover:text-pink-500">求人一覧</Link>
          <span className="mx-2">/</span>
          <Link href={`/jobs/${category}`} className="hover:text-pink-500">{catLabel}</Link>
          <span className="mx-2">/</span>
          <Link href={`/jobs/${category}/${prefecture}`} className="hover:text-pink-500">{prefLabel}</Link>
          <span className="mx-2">/</span>
          <span className="text-pink-700">{condLabel}</span>
        </nav>

        <div className="prose-editorial max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>

        {/* 他の条件で探す */}
        <div className="my-8">
          <h3 className="mb-4 font-heading text-lg font-bold text-pink-600">
            {prefLabel}の{catLabel}を他の条件で探す
          </h3>
          <div className="flex flex-wrap gap-2">
            {otherConditions.map(([slug, label]) => (
              <Link
                key={slug}
                href={`/jobs/${category}/${prefecture}/${slug}`}
                className="rounded-full border border-pink-200 bg-white px-4 py-2 text-sm text-pink-600 hover:border-pink-400 hover:shadow-sm"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* 同じ条件で他のエリアを探す */}
        <div className="my-8">
          <h3 className="mb-4 font-heading text-lg font-bold text-pink-600">
            {condLabel}の{catLabel}を他のエリアで探す
          </h3>
          <div className="flex flex-wrap gap-2">
            {TOP_PREFECTURES.filter((p) => p !== prefecture).map((p) => (
              <Link
                key={p}
                href={`/jobs/${category}/${p}/${condition}`}
                className="rounded-full border border-pink-200 bg-white px-4 py-2 text-sm text-pink-600 hover:border-pink-400 hover:shadow-sm"
              >
                {getPrefectureLabel(p)}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="my-12 space-y-6">
          {category !== "chatlady" && (
            <div className="sparkle-bg rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 to-yellow-50/30 p-6">
              <div className="flex items-start gap-4">
                <NaviChan size="lg" />
                <div>
                  <h3 className="mb-1 font-heading text-base font-bold text-pink-600">
                    ナビちゃんのおすすめ
                  </h3>
                  <p className="mb-3 text-sm text-pink-900/60">
                    {catLabel}もいいけど、<b>チャットレディ</b>なら在宅OK・未経験OK・顔出しなしで始められるよ！
                  </p>
                  <Link
                    href={`/jobs/chatlady/${prefecture}/${condition}`}
                    className="btn-pink-gradient inline-block text-sm"
                  >
                    {prefLabel}の{condLabel}チャトレ求人を見る
                  </Link>
                </div>
              </div>
            </div>
          )}

          <NaviChanBanner position="right">
            <p className="mb-1 text-xs font-bold text-pink-400 tracking-wider">LINE CONSULTATION</p>
            <h3 className="mb-2 font-heading text-lg font-bold text-pink-600">
              どのお仕事が合うかわからない？
            </h3>
            <p className="mb-4 text-sm text-pink-900/60">
              ナビちゃんにLINEで相談してね！MBTI診断であなたにぴったりのお仕事もわかるよ。
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
      </article>
    </>
  );
}
