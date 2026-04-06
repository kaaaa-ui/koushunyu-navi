import Link from "next/link";
import type { Metadata } from "next";
import { getCategories, getCategoryLabel, getPrefecturesByCategory, getPrefectureLabel } from "@/lib/jobs";
import { NaviChan, NaviChanBanner } from "@/components/navi-chan";
import { ExternalLink } from "lucide-react";

const CHOUCHOU_URL = "https://chouchou-live.com/";
const LINE_URL = "https://line.me/R/ti/p/%40309gsalq";

export const metadata: Metadata = {
  title: "求人一覧｜職種×エリアで探す",
  description: "チャットレディ・キャバクラ・メンズエステなど、全国の高収入求人を職種×エリアで探せます。",
  alternates: { canonical: "https://koushunyu-navi.com/jobs" },
};

export default function JobsIndexPage() {
  const categories = getCategories();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <nav className="mb-4 text-sm text-pink-400">
        <Link href="/" className="hover:text-pink-500">Top</Link>
        <span className="mx-2">/</span>
        <span className="text-pink-700">求人一覧</span>
      </nav>

      <div className="mb-10 flex flex-col items-center gap-4 text-center">
        <NaviChan size="xl" rounded={false} />
        <div>
          <h1 className="section-title text-2xl font-bold text-pink-600 md:text-3xl">
            求人一覧｜職種×エリアで探す
          </h1>
          <p className="mt-4 text-sm text-pink-900/60">
            気になる職種をタップして、エリアごとの求人をチェック
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const prefs = getPrefecturesByCategory(cat);
          return (
            <div key={cat} className="card-kawaii p-5">
              <Link
                href={`/jobs/${cat}`}
                className="mb-3 block font-heading text-lg font-bold text-pink-500 hover:text-pink-600"
              >
                {getCategoryLabel(cat)}
              </Link>
              <div className="flex flex-wrap gap-1.5">
                {prefs.map((pref) => (
                  <Link
                    key={pref}
                    href={`/jobs/${cat}/${pref}`}
                    className="rounded-full bg-pink-50 px-2.5 py-1 text-xs text-pink-600 hover:bg-pink-100"
                  >
                    {getPrefectureLabel(pref)}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* チャトレ推しバナー + chouchou */}
      <div className="mt-12 space-y-6">
        <div className="sparkle-bg rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 to-yellow-50/30 p-6">
          <div className="flex items-start gap-4">
            <NaviChan size="lg" />
            <div>
              <h3 className="mb-1 font-heading text-base font-bold text-pink-600">
                ナビちゃんのイチオシ
              </h3>
              <p className="mb-3 text-sm text-pink-900/60">
                迷ったらまず<b>チャットレディ</b>がおすすめ！在宅OK・未経験OK・顔出しなしで、自分のペースで高収入が目指せるよ。
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={CHOUCHOU_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pink-gradient inline-flex items-center gap-2 text-sm"
                >
                  chouchouでチャトレ求人を探す
                  <ExternalLink className="h-4 w-4" strokeWidth={2} />
                </a>
                <Link
                  href="/jobs/chatlady"
                  className="inline-block rounded-full border-2 border-pink-300 bg-white px-6 py-2.5 text-sm font-semibold text-pink-500 hover:bg-pink-50"
                >
                  チャトレ求人一覧
                </Link>
              </div>
            </div>
          </div>
        </div>

        <NaviChanBanner position="right">
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
  );
}
