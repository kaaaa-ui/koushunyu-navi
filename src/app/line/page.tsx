import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { NaviChan } from "@/components/navi-chan";

const LINE_URL = "https://line.me/R/ti/p/%40309gsalq";

export const metadata: Metadata = {
  title: "LINE質問｜ナビちゃんに業界のギモンを聞いてみよう",
  description: "高収入ナビのLINE公式アカウントで、業界に関するギモンに回答します。MBTI診断・職種解説・業界ガイドなど、情報提供の範囲でお答えします。",
  alternates: { canonical: "https://koushunyu-navi.vercel.app/line" },
};

export default function LinePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 text-sm text-pink-400">
        <Link href="/" className="hover:text-pink-500">Top</Link>
        <span className="mx-2">/</span>
        <span className="text-pink-700">LINE質問</span>
      </nav>

      <div className="sparkle-bg rounded-3xl bg-gradient-to-b from-pink-50 to-white p-8 text-center shadow-lg shadow-pink-100/50 border border-pink-100 md:p-12">
        {/* 大きいナビちゃん */}
        <div className="navi-float mb-6">
          <NaviChan size="2xl" rounded={false} className="mx-auto" />
        </div>

        <h1 className="mb-3 font-heading text-2xl font-bold text-pink-600 md:text-3xl">
          ナビちゃんにLINEで質問しよう
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-pink-900/60">
          「この業界ってどんな感じ？」
          <br />
          「未経験でもできるの？」
          <br />
          <br />
          そんなギモン、ナビちゃんに気軽に聞いてね。
          <br />
          業界の一般情報を無料でお届けするよ。
        </p>

        <div className="mb-8">
          <div className="rounded-2xl border border-pink-200 bg-white p-5 text-left">
            <h2 className="mb-4 font-heading text-base font-bold text-pink-600">
              LINEでできること
            </h2>
            <ul className="space-y-3 text-sm text-pink-900/70">
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" strokeWidth={2} />
                <span>MBTI診断であなたに向いてる傾向がある職種タイプをチェック</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" strokeWidth={2} />
                <span>業界の基礎知識・働き方に関する一般情報を提供</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" strokeWidth={2} />
                <span>業界に関する一般的なギモン・疑問に回答</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" strokeWidth={2} />
                <span>お仕事ガイド・役立ち情報を配信</span>
              </li>
            </ul>
          </div>
        </div>

        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-[#06C755] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-200 hover:bg-[#05b04c]"
        >
          LINEで質問する
        </a>

        <p className="mt-4 text-xs text-pink-400">
          ※ 業界の一般情報をご案内しています。個別の店舗紹介・お仕事の斡旋は行っておりません。
          <br />
          ご利用は完全無料です。しつこい勧誘は一切ありません。
        </p>
      </div>
    </div>
  );
}
