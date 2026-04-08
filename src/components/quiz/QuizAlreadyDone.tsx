"use client";

import { NaviChan } from "@/components/navi-chan";
import type { MbtiType } from "@/lib/mbti-data";

function getLineMessageUrl(typeCode: string) {
  return `https://line.me/R/oaMessage/%40309gsalq/?${encodeURIComponent(typeCode + "診断結果")}`;
}

interface QuizAlreadyDoneProps {
  result: MbtiType;
}

export function QuizAlreadyDone({ result }: QuizAlreadyDoneProps) {
  return (
    <div className="quiz-fade-in mx-auto max-w-md px-4 py-8">
      <div className="rounded-3xl bg-white/90 p-6 shadow-lg border border-pink-200 text-center">
        <NaviChan size="lg" />
        <h2 className="mt-4 font-heading text-xl font-bold text-pink-600">
          診断済みです
        </h2>
        <p className="mt-3 text-sm text-pink-900/70">
          あなたの診断結果は
        </p>
        <div className="mt-2 text-3xl">{result.emoji}</div>
        <div className="mt-1 font-heading text-2xl font-bold text-pink-600">
          {result.code}
        </div>
        <p className="text-base font-bold text-pink-700">{result.name}</p>

        <div className="mt-6 space-y-3">
          <a
            href={getLineMessageUrl(result.code)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-full bg-[#06C755] px-6 py-4 font-bold text-white shadow-lg shadow-green-200 transition-transform hover:scale-105"
          >
            <span className="text-base">LINEで詳しい結果を見る</span>
            <span className="mt-1 block text-xs font-normal opacity-80">
              ナビちゃんが{result.code}タイプ専用のアドバイスをお届け
            </span>
          </a>
        </div>

        <p className="mt-4 text-xs text-pink-400">
          診断は1人1回までです
        </p>
      </div>
    </div>
  );
}
