import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategories, getCategoryLabel, getPrefecturesByCategory, getPrefectureLabel, CONDITION_LABELS, TOP_PREFECTURES } from "@/lib/jobs";
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
    title: `${label}の求人｜全国47都道府県エリア別`,
    description: `${label}の求人を全国47都道府県エリア別に探せます。未経験OK・高時給のお仕事をナビちゃんが紹介。`,
    alternates: { canonical: `https://koushunyu-navi.vercel.app/jobs/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const prefectures = getPrefecturesByCategory(category);
  if (prefectures.length === 0) notFound();
  const label = getCategoryLabel(category);

  // 地方ごとにグルーピング
  const regions: { name: string; prefs: string[] }[] = [
    { name: "北海道・東北", prefs: ["hokkaido", "aomori", "iwate", "miyagi", "akita", "yamagata", "fukushima"] },
    { name: "関東", prefs: ["ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa"] },
    { name: "中部", prefs: ["niigata", "toyama", "ishikawa", "fukui", "yamanashi", "nagano", "gifu", "shizuoka", "aichi"] },
    { name: "近畿", prefs: ["mie", "shiga", "kyoto", "osaka", "hyogo", "nara", "wakayama"] },
    { name: "中国・四国", prefs: ["tottori", "shimane", "okayama", "hiroshima", "yamaguchi", "tokushima", "kagawa", "ehime", "kochi"] },
    { name: "九州・沖縄", prefs: ["fukuoka", "saga", "nagasaki", "kumamoto", "oita", "miyazaki", "kagoshima", "okinawa"] },
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Top", item: "https://koushunyu-navi.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "求人一覧", item: "https://koushunyu-navi.vercel.app/jobs/" },
      { "@type": "ListItem", position: 3, name: label, item: `https://koushunyu-navi.vercel.app/jobs/${category}/` },
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
          {label}の求人｜全国エリアで探す
        </h1>
        <p className="mb-10 text-center text-sm text-pink-900/60">
          {label}の求人をエリアから探してみてね
        </p>

        {/* 地方別エリアグリッド */}
        {regions.map((region) => {
          const available = region.prefs.filter((p) => prefectures.includes(p));
          if (available.length === 0) return null;
          return (
            <div key={region.name} className="mb-6">
              <h2 className="mb-3 text-base font-bold text-pink-700">{region.name}</h2>
              <div className="grid gap-2 grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
                {available.map((pref) => (
                  <Link
                    key={pref}
                    href={`/jobs/${category}/${pref}`}
                    className="card-kawaii px-3 py-2 text-center text-sm font-medium text-pink-600"
                  >
                    {getPrefectureLabel(pref)}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        {/* 条件で絞り込む - 内部リンクエンジン */}
        <div className="my-10">
          <h2 className="section-title mb-4 text-xl font-bold text-pink-600">
            条件で絞り込む
          </h2>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CONDITION_LABELS).map(([slug, condLabel]) => (
              <Link
                key={slug}
                href={`/jobs/${category}/tokyo/${slug}`}
                className="rounded-full border border-pink-200 bg-white px-4 py-2 text-sm text-pink-600 hover:border-pink-400 hover:shadow-sm"
              >
                {condLabel}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 space-y-6">
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
