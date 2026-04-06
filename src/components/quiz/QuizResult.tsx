"use client";

import { useEffect } from "react";
import { NaviChan } from "@/components/navi-chan";
import type { MbtiType } from "@/lib/mbti-data";
import { mbtiTypes } from "@/lib/mbti-data";
import { gtagEvent } from "@/lib/gtag";

const LINE_ADD_URL = "https://line.me/R/ti/p/%40309gsalq";
const CHOUCHOU_URL = "https://chouchou-live.com/";
const SITE_URL = "https://fukugyo-mbti.vercel.app";

/** タイプコードを自動入力してLINEチャットを開くURL */
function getLineMessageUrl(typeCode: string) {
  return `https://line.me/R/oaMessage/%40309gsalq/?${encodeURIComponent(typeCode)}`;
}

interface QuizResultProps {
  result: MbtiType;
  onRetry: () => void;
}

export function QuizResult({ result, onRetry }: QuizResultProps) {
  // 結果表示時にGA4イベント送信
  useEffect(() => {
    gtagEvent("mbti_result", {
      mbti_type: result.code,
      mbti_name: result.name,
      recommended_job: result.job,
    });
  }, [result.code, result.name, result.job]);

  // UTMパラメータ付きの結果URL（流入元トラッキング）
  const resultUrlForX = `${SITE_URL}/result/${result.code}?utm_source=twitter&utm_medium=social&utm_campaign=mbti_share`;
  const resultUrlForLine = `${SITE_URL}/result/${result.code}?utm_source=line&utm_medium=social&utm_campaign=mbti_share`;

  const shareTextForX = encodeURIComponent(
    `私の副業MBTIタイプは【${result.code}】${result.name}でした！\nおすすめ副業: ${result.job}（月収${result.salary}円）\n\n#副業MBTI診断 #高収入ナビ`
  );
  const xShareUrl = `https://twitter.com/intent/tweet?text=${shareTextForX}&url=${encodeURIComponent(resultUrlForX)}`;
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(resultUrlForLine)}`;

  const goodTypes = result.goodMatch
    .map((code) => mbtiTypes[code])
    .filter(Boolean);
  const badTypes = result.badMatch
    .map((code) => mbtiTypes[code])
    .filter(Boolean);

  // CTAクリック計測
  const trackClick = (action: string, label: string) => {
    gtagEvent(action, { event_category: "cta", event_label: label, mbti_type: result.code });
  };

  return (
    <div className="quiz-fade-in mx-auto max-w-md px-4 py-8">
      <div className="rounded-3xl bg-white/90 p-6 shadow-lg border border-pink-200">
        {/* タイプ名 */}
        <div className="mb-6 text-center">
          <div className="mb-2 inline-block rounded-full bg-gradient-to-r from-pink-400 to-pink-500 px-4 py-1 text-xs font-bold text-white">
            あなたの副業タイプ
          </div>
          <div className="mb-2 text-4xl">{result.emoji}</div>
          <h2 className="mb-1 font-heading text-2xl font-bold text-pink-600 md:text-3xl">
            {result.code}
          </h2>
          <p className="text-lg font-bold text-pink-700">{result.name}</p>
        </div>

        {/* ナビちゃん + 性格解説（途中まで→LINE誘導） */}
        <div className="mb-6 rounded-2xl border border-pink-100 bg-gradient-to-r from-pink-50 to-white p-4">
          <div className="mb-3 flex items-center gap-3">
            <NaviChan size="sm" />
            <span className="text-sm font-bold text-pink-500">
              ナビちゃんの解説
            </span>
          </div>
          <div className="relative">
            <p className="text-sm leading-relaxed text-pink-900/70">
              {result.description.slice(0, 40)}.....
            </p>
            <a
              href={getLineMessageUrl(result.code)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("line_click", "navi_description")}
              className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#06C755] hover:underline"
            >
              続きをLINEで見る
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* おすすめ副業 = チャットレディ */}
        <div className="mb-4 rounded-2xl bg-gradient-to-br from-yellow-50 to-pink-50 p-4 border border-yellow-200/50">
          <h3 className="mb-2 text-center text-sm font-bold text-pink-600">
            あなたにぴったりの副業
          </h3>
          <div className="text-center">
            <span className="text-xl font-bold text-pink-700">
              {result.job}
            </span>
            <div className="mt-1 text-sm text-gold font-bold">
              月収 {result.salary}円
            </div>
          </div>
        </div>

        {/* チャトレでの強み（チラ見せ） */}
        <div className="mb-4 rounded-2xl border border-pink-200 bg-white p-4">
          <h3 className="mb-2 text-sm font-bold text-pink-600">
            {result.code}タイプのチャトレでの強み
          </h3>
          <p className="text-sm leading-relaxed text-pink-900/70">
            {result.chatreStrength}
          </p>
        </div>

        {/* 秘密の攻略法（ぼかし演出→LINE誘導） */}
        <div className="mb-6 relative overflow-hidden rounded-2xl border-2 border-dashed border-pink-300 bg-gradient-to-b from-pink-50 to-white p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="text-lg">🔒</span>
            <h3 className="text-sm font-bold text-pink-600">
              あなた専用の稼ぎ方レシピ
            </h3>
          </div>
          {/* チラ見せテキスト（ぼかし） */}
          <div className="relative">
            <p className="text-sm leading-relaxed text-pink-900/70">
              {result.lineTeaser}
            </p>
            <div className="absolute inset-0 top-4 bg-gradient-to-b from-transparent via-white/80 to-white" />
          </div>
          <div className="relative mt-2 text-center">
            <p className="text-xs text-pink-400 mb-3">
              続きはLINEで無料公開中...
            </p>
            <a
              href={getLineMessageUrl(result.code)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick("line_click", "recipe_teaser")}
              className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-200 transition-all hover:scale-105 hover:shadow-xl"
            >
              LINEで続きを見る
            </a>
          </div>
        </div>

        {/* 相性 */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-pink-50 p-3 text-center">
            <div className="mb-1 text-xs font-bold text-pink-500">
              相性の良いタイプ
            </div>
            {goodTypes.map((t) => (
              <div key={t.code} className="text-xs text-pink-700">
                {t.code} {t.emoji}
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-blue-50 p-3 text-center">
            <div className="mb-1 text-xs font-bold text-blue-500">
              苦手なタイプ
            </div>
            {badTypes.map((t) => (
              <div key={t.code} className="text-xs text-blue-700">
                {t.code} {t.emoji}
              </div>
            ))}
          </div>
        </div>

        {/* シェアボタン */}
        <div className="mb-6 flex gap-3">
          <a
            href={xShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("share_click", "twitter")}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-black px-4 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            でシェア
          </a>
          <a
            href={lineShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("share_click", "line")}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#06C755] px-4 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            LINE でシェア
          </a>
        </div>

        {/* メインCTA */}
        <div className="space-y-3 border-t border-pink-100 pt-6">
          <a
            href={getLineMessageUrl(result.code)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("line_click", "main_cta")}
            className="block w-full rounded-full bg-[#06C755] px-6 py-4 text-center font-bold text-white shadow-lg shadow-green-200 transition-transform hover:scale-105"
          >
            <span className="text-base">LINEで稼ぎ方を詳しく聞く</span>
            <span className="mt-1 block text-xs font-normal opacity-80">
              ナビちゃんが{result.code}タイプ専用のアドバイスをお届け
            </span>
          </a>
          <a
            href={CHOUCHOU_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackClick("cta_click", "chouchou")}
            className="block w-full rounded-full border-2 border-pink-300 bg-white px-6 py-3 text-center text-sm font-bold text-pink-600 transition-all hover:bg-pink-50"
          >
            ChouChouの詳細を見る
          </a>
        </div>

        {/* リトライ */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              gtagEvent("quiz_retry", { mbti_type: result.code });
              onRetry();
            }}
            className="text-sm text-pink-400 underline underline-offset-4 hover:text-pink-600"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
}
