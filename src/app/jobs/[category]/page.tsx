import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategories, getCategoryLabel, getPrefecturesByCategory, getPrefectureLabel } from "@/lib/jobs";
import { NaviChan, NaviChanBanner } from "@/components/navi-chan";
import { ExternalLink } from "lucide-react";

const CHOUCHOU_URL = "https://chouchou-live.com/";
const LINE_URL = "https://line.me/R/ti/p/%40309gsalq";

export function generateStaticParams() {
  return getCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const label = getCategoryLabel(category);
  return {
    title: `${label}の求人｜エリアで探す`,
    description: `${label}の求人をエリア別に探せます。未経験OK・高時給のお仕事をナビちゃんが紹介。`,
    alternates: { canonical: `https://koushunyu-navi.com/jobs/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
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
          {label}の求人｜エリアで探す
        </h1>
        <p className="mb-10 text-center text-sm text-pink-900/60">
          {label}の求人をエリアから探してみてね
        </p>

        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-5">
          {prefectures.map((pref) => (
            <Link
              key={pref}
              href={`/jobs/${category}/${pref}`}
              className="card-kawaii px-4 py-3 text-center text-sm font-medium text-pink-600"
            >
              {getPrefectureLabel(pref)}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 space-y-6">
          {/* チャトレのみ: chouchouリンク */}
          {category === "chatlady" && (
            <div className="rounded-2xl border border-pink-200 bg-white p-6 text-center shadow-sm">
              <h3 className="mb-2 font-heading text-lg font-bold text-pink-600">
                チャットレディの最新求人をchouchouでチェック
              </h3>
              <p className="mb-4 text-sm text-pink-900/60">
                全国のチャットレディ求人が掲載中！
              </p>
              <a
                href={CHOUCHOU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pink-gradient inline-flex items-center gap-2 text-sm"
              >
                chouchouで求人を探す
                <ExternalLink className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          )}

          {/* チャトレ以外: チャトレおすすめ提案 */}
          {category !== "chatlady" && (
            <div className="sparkle-bg rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 to-yellow-50/30 p-6">
              <div className="flex items-start gap-4">
                <NaviChan size="lg" />
                <div>
                  <h3 className="mb-1 font-heading text-base font-bold text-pink-600">
                    ナビちゃんのおすすめ
                  </h3>
                  <p className="mb-3 text-sm text-pink-900/60">
                    {label}もいいけど、<b>チャットレディ</b>なら在宅OK・未経験OK・顔出しなしで始められるよ！
                    自分のペースで高収入が目指せるから、副業デビューにぴったり。
                  </p>
                  <Link
                    href="/jobs/chatlady"
                    className="btn-pink-gradient inline-block text-sm"
                  >
                    チャトレ求人を見る
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* LINE相談（共通） */}
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
