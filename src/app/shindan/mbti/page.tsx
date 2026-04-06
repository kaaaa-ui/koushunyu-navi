import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";

const LINE_URL = "https://line.me/R/ti/p/%40309gsalq";

export const metadata: Metadata = {
  title: "副業MBTI診断｜あなたに合う高収入のお仕事は？",
  description:
    "MBTIタイプ別であなたにぴったりの副業・夜職がわかる無料診断。16タイプ別のおすすめ職種をナビちゃんが解説。LINEで簡単30秒診断",
  alternates: { canonical: "https://koushunyu-navi.com/shindan/mbti" },
};

const MBTI_TYPES = [
  { type: "INTJ", job: "チャットレディ（在宅）", reason: "戦略的に稼ぐ在宅ワーク向き" },
  { type: "INTP", job: "チャットレディ（在宅）", reason: "分析力を活かした会話で高単価" },
  { type: "ENTJ", job: "キャバクラ", reason: "リーダーシップで指名No.1" },
  { type: "ENTP", job: "ガールズバー", reason: "トーク力で常連獲得" },
  { type: "INFJ", job: "メンズエステ", reason: "共感力で深いリピート関係" },
  { type: "INFP", job: "チャットレディ（在宅）", reason: "自分のペースで働ける" },
  { type: "ENFJ", job: "ラウンジ", reason: "人を惹きつける魅力で高収入" },
  { type: "ENFP", job: "キャバクラ", reason: "明るさと好奇心で場を盛り上げる" },
  { type: "ISTJ", job: "メンズエステ", reason: "丁寧な施術でリピート率No.1" },
  { type: "ISFJ", job: "メンズエステ", reason: "おもてなし力が最大の武器" },
  { type: "ESTJ", job: "キャバクラ", reason: "管理力でチームを牽引" },
  { type: "ESFJ", job: "キャバクラ", reason: "気配り上手で同伴率高い" },
  { type: "ISTP", job: "チャットレディ（在宅）", reason: "効率重視の短時間高収入" },
  { type: "ISFP", job: "コンカフェ", reason: "世界観を活かした接客" },
  { type: "ESTP", job: "ガールズバー", reason: "ノリの良さで客単価アップ" },
  { type: "ESFP", job: "キャバクラ", reason: "天性のエンターテイナー" },
];

export default function MbtiPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-pink-600">Top</Link>
        <span className="mx-2">/</span>
        <Link href="/shindan/mbti" className="text-gray-700">MBTI診断</Link>
      </nav>

      {/* ヒーローバナー */}
      <div className="mb-8 overflow-hidden rounded-2xl">
        <Image
          src="/mbti-banner.png"
          alt="副業MBTI診断｜診断はこちらのLINEから"
          width={1200}
          height={675}
          className="w-full"
          priority
        />
      </div>

      {/* 導入 */}
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
          副業MBTI診断
        </h1>
        <p className="text-gray-600 leading-relaxed">
          あなたのMBTIタイプから、ぴったりの高収入のお仕事がわかるよ。
          <br />
          LINEで30秒のかんたん診断、やってみない？
        </p>
      </div>

      {/* CTA */}
      <div className="mb-12 text-center">
        <Button asChild size="lg" className="bg-[#06C755] hover:bg-[#05b04c] text-white text-base px-8 py-6">
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
            LINEで無料診断する
          </a>
        </Button>
        <p className="mt-3 text-xs text-gray-400">※ 完全無料・30秒で完了</p>
      </div>

      {/* 16タイプ一覧 */}
      <section className="mb-12">
        <h2 className="mb-6 text-center text-xl font-bold text-gray-900">
          16タイプ別おすすめ職種
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {MBTI_TYPES.map(({ type, job, reason }) => (
            <div
              key={type}
              className="flex items-start gap-3 rounded-xl border border-pink-100 bg-white p-4"
            >
              <span className="shrink-0 rounded-lg bg-pink-100 px-2 py-1 text-sm font-bold text-pink-700">
                {type}
              </span>
              <div>
                <div className="text-sm font-medium text-gray-900">{job}</div>
                <div className="text-xs text-gray-500">{reason}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 最下部CTA */}
      <div className="rounded-3xl bg-gradient-to-r from-pink-100 to-yellow-50 p-8 text-center">
        <div className="mb-2 text-3xl">👧</div>
        <p className="mb-4 text-sm text-gray-700 leading-relaxed">
          自分のタイプがわからなくても大丈夫！
          <br />
          LINEで質問に答えるだけで、ナビちゃんが診断するよ
        </p>
        <Button asChild size="lg" className="bg-[#06C755] hover:bg-[#05b04c] text-white text-base px-8 py-6">
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer">
            LINEで無料診断する
          </a>
        </Button>
      </div>
    </div>
  );
}
