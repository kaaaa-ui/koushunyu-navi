import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

const LINE_URL = "https://line.me/R/ti/p/%40309gsalq";

export const metadata: Metadata = {
  title: "LINE無料相談｜ナビちゃんに相談してみよう",
  description:
    "高収入ナビのLINE公式アカウントで、お仕事の相談ができます。MBTI診断・条件診断・求人紹介まで、ナビちゃんが優しくサポート",
  alternates: { canonical: "https://koushunyu-navi.com/line" },
};

export default function LinePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-pink-600">
          Top
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">LINE相談</span>
      </nav>

      <div className="rounded-3xl bg-gradient-to-b from-pink-50 to-white p-8 text-center shadow-sm md:p-12">
        <div className="mb-4 text-5xl">👧</div>
        <h1 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
          ナビちゃんにLINEで相談しよう
        </h1>
        <p className="mb-8 text-gray-600 leading-relaxed">
          「どんなお仕事が自分に合うかわからない」
          <br />
          「未経験だけど大丈夫かな…」
          <br />
          <br />
          そんな不安、ナビちゃんに気軽に相談してね。
          <br />
          無料でお仕事診断もできるよ。
        </p>

        <div className="mb-8 space-y-4">
          <div className="rounded-2xl border border-pink-100 bg-white p-5">
            <h2 className="mb-3 text-lg font-bold text-pink-600">
              LINEでできること
            </h2>
            <ul className="space-y-2 text-left text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-pink-400">&#x2714;</span>
                <span>MBTI診断であなたに合うお仕事を診断</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-pink-400">&#x2714;</span>
                <span>条件（エリア・時給・働き方）に合う求人を紹介</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-pink-400">&#x2714;</span>
                <span>面接・体入の不安や疑問に回答</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-pink-400">&#x2714;</span>
                <span>お仕事ガイド・役立ち情報を配信</span>
              </li>
            </ul>
          </div>
        </div>

        <Button asChild size="lg" className="bg-[#06C755] hover:bg-[#05b04c] text-white text-base px-8 py-6">
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
            LINEで無料相談する
          </a>
        </Button>

        <p className="mt-4 text-xs text-gray-400">
          ※ 相談は完全無料です。しつこい勧誘は一切ありません。
        </p>
      </div>
    </div>
  );
}
