"use client";

import { NaviChan } from "@/components/navi-chan";

interface QuizStartProps {
  onStart: () => void;
}

export function QuizStart({ onStart }: QuizStartProps) {
  return (
    <div className="quiz-fade-in mx-auto max-w-md px-4 py-8 text-center">
      <div className="sparkle-bg rounded-3xl bg-gradient-to-br from-pink-100 via-pink-50 to-yellow-50/20 p-8 border border-pink-200">
        <div className="navi-float mb-6">
          <NaviChan size="2xl" rounded={false} className="mx-auto" />
        </div>

        <h1 className="mb-3 font-heading text-2xl font-bold text-pink-600 md:text-3xl">
          副業MBTI診断
        </h1>

        <p className="mb-2 text-sm leading-relaxed text-pink-900/60">
          あなたの性格タイプから、
          <br />
          ぴったりの高収入副業がわかる！
        </p>

        <div className="mb-6 flex items-center justify-center gap-2 text-xs text-pink-400">
          <span>全10問</span>
          <span>/</span>
          <span>約1分で完了</span>
        </div>

        <button
          onClick={onStart}
          className="btn-pink-gradient inline-block text-base tracking-wide"
        >
          診断スタート
        </button>

        <p className="mt-4 text-xs text-pink-400">
          ※ 完全無料・登録不要
        </p>
      </div>
    </div>
  );
}
