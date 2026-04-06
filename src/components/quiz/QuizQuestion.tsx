"use client";

import type { Question, Choice } from "@/lib/mbti-data";

interface QuizQuestionProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (choice: Choice) => void;
}

export function QuizQuestion({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: QuizQuestionProps) {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="quiz-slide-enter mx-auto max-w-md px-4 py-8">
      <div className="rounded-3xl bg-white/80 p-6 shadow-sm border border-pink-100">
        {/* プログレスバー */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-xs text-pink-400">
            <span>
              Q{currentIndex + 1} / {totalQuestions}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-pink-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-400 to-pink-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* 質問 */}
        <div className="mb-8 text-center">
          <span className="mb-3 block text-3xl">{question.emoji}</span>
          <h2 className="font-heading text-lg font-bold text-pink-700 md:text-xl">
            {question.question}
          </h2>
        </div>

        {/* 選択肢 */}
        <div className="space-y-3">
          {question.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => onAnswer(choice)}
              className="w-full rounded-2xl border-2 border-pink-200 bg-white px-5 py-4 text-left text-sm font-medium text-pink-700 transition-all hover:border-pink-400 hover:bg-pink-50 hover:shadow-md active:scale-[0.98]"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
