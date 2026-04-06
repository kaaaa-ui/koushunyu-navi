import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { NaviChan } from "@/components/navi-chan";

const LINE_URL = "https://line.me/R/ti/p/%40309gsalq";

export const metadata: Metadata = {
  title: "LINE無料相談｜ナビちゃんに相談してみよう",
  description: "高収入ナビのLINE公式アカウントで、お仕事の相談ができます。MBTI診断・条件診断・求人紹介まで、ナビちゃんが優しくサポート。",
  alternates: { canonical: "https://koushunyu-navi.com/line" },
};

export default function LinePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 text-sm text-pink-400">
        <Link href="/" className="hover:text-pink-500">Top</Link>
        <span className="mx-2">/</span>
        <span className="text-pink-700">LINE相談</span>
      </nav>

      <div className="sparkle-bg rounded-3xl bg-gradient-to-b from-pink-50 to-white p-8 text-center shadow-lg shadow-pink-100/50 border border-pink-100 md:p-12">
        {/* 大きいナビちゃん */}
        <div className="navi-float mb-6">
          <NaviChan size="2xl" rounded={false} className="mx-auto" />
        </div>

        <h1 className="mb-3 font-heading text-2xl font-bold text-pink-600 md:text-3xl">
          ナビちゃんにLINEで相談しよう
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-pink-900/60">
          「どんなお仕事が自分に合うかわからない」
          <br />
          「未経験だけど大丈夫かな...」
          <br />
          <br />
          そんな不安、ナビちゃんに気軽に相談してね。
          <br />
          無料でお仕事診断もできるよ。
        </p>

        <div className="mb-8">
          <div className="rounded-2xl border border-pink-200 bg-white p-5 text-left">
            <h2 className="mb-4 font-heading text-base font-bold text-pink-600">
              LINEでできること
            </h2>
            <ul className="space-y-3 text-sm text-pink-900/70">
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" strokeWidth={2} />
                <span>MBTI診断であなたに合うお仕事を診断</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" strokeWidth={2} />
                <span>条件（エリア・時給・働き方）に合う求人を紹介</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" strokeWidth={2} />
                <span>面接・体入の不安や疑問に回答</span>
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
          LINEで無料相談する
        </a>

        <p className="mt-4 text-xs text-pink-400">
          ※ 相談は完全無料です。しつこい勧誘は一切ありません。
        </p>
      </div>
    </div>
  );
}
