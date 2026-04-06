import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { NaviChan, NaviChanBanner } from "@/components/navi-chan";

const LINE_URL = "https://line.me/R/ti/p/%40309gsalq";
const MBTI_FORM_URL = "https://liff.line.me/2009687184-04t9NtU8?unique_key=ZfPS7t&ts=1775445422";

export const metadata: Metadata = {
  title: "副業MBTI診断｜あなたに合う高収入のお仕事は？",
  description: "MBTIタイプ別であなたにぴったりの副業・夜職がわかる無料診断。16タイプ別のおすすめ職種をナビちゃんが解説。LINEで簡単30秒診断。",
  alternates: { canonical: "https://koushunyu-navi.vercel.app/shindan/mbti" },
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
      <nav className="mb-6 text-sm text-pink-400">
        <Link href="/" className="hover:text-pink-500">Top</Link>
        <span className="mx-2">/</span>
        <span className="text-pink-700">MBTI診断</span>
      </nav>

      {/* ヒーロー：ナビちゃん大きく */}
      <div className="mb-8 sparkle-bg rounded-3xl bg-gradient-to-br from-pink-100 via-pink-50 to-yellow-50/20 p-8 text-center border border-pink-200">
        <div className="navi-float mb-4">
          <NaviChan size="2xl" rounded={false} className="mx-auto" />
        </div>
        <h1 className="mb-3 font-heading text-2xl font-bold text-pink-600 md:text-3xl">
          副業MBTI診断
        </h1>
        <p className="text-sm leading-relaxed text-pink-900/60">
          あなたのMBTIタイプから、ぴったりの高収入のお仕事がわかるよ。
          <br />
          LINEで30秒のかんたん診断、やってみない？
        </p>
        <div className="mt-6">
          <a href={MBTI_FORM_URL} target="_blank" rel="noopener noreferrer" className="btn-pink-gradient inline-block text-sm">
            LINEで無料診断する
          </a>
          <p className="mt-3 text-xs text-pink-400">※ 完全無料・30秒で完了</p>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="section-title mb-8 text-xl font-bold text-pink-600">
          16タイプ別おすすめ職種
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {MBTI_TYPES.map(({ type, job, reason }) => (
            <div key={type} className="card-kawaii flex items-start gap-3 p-4">
              <span className="shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 px-2.5 py-1 text-xs font-bold text-white">
                {type}
              </span>
              <div>
                <div className="text-sm font-medium text-pink-700">{job}</div>
                <div className="text-xs text-pink-400">{reason}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 下部CTAバナー */}
      <NaviChanBanner position="right">
        <p className="mb-2 text-sm font-bold text-pink-600">
          自分のタイプがわからなくても大丈夫！
        </p>
        <p className="mb-4 text-sm text-pink-900/60">
          LINEで質問に答えるだけで、ナビちゃんが診断するよ
        </p>
        <a href={MBTI_FORM_URL} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-[#06C755] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-200 hover:bg-[#05b04c]">
          LINEで無料診断する
        </a>
      </NaviChanBanner>
    </div>
  );
}
