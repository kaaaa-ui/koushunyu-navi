"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { QuizStart } from "@/components/quiz/QuizStart";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizResult } from "@/components/quiz/QuizResult";
import { QuizAlreadyDone } from "@/components/quiz/QuizAlreadyDone";
import {
  questions,
  mbtiTypes,
  calculateMbtiType,
  type Axis,
  type Choice,
} from "@/lib/mbti-data";

const STORAGE_KEY = "mbti_completed";

type Phase = "loading" | "already_done" | "start" | "quiz" | "result";

export function MbtiQuiz() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<Axis, number>>({
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
  });
  const [resultCode, setResultCode] = useState<string>("");

  // 初回ロード時に診断済みチェック
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setResultCode(saved);
      setPhase("already_done");
    } else {
      setPhase("start");
    }
  }, []);

  const handleStart = useCallback(() => {
    setPhase("quiz");
    setQuestionIndex(0);
    setScores({ EI: 0, SN: 0, TF: 0, JP: 0 });
  }, []);

  const handleAnswer = useCallback(
    (choice: Choice) => {
      const newScores = { ...scores };
      for (const [axis, value] of Object.entries(choice.scores)) {
        newScores[axis as Axis] += value;
      }
      setScores(newScores);

      if (questionIndex < questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        const code = calculateMbtiType(newScores);
        setResultCode(code);
        localStorage.setItem(STORAGE_KEY, code);
        setPhase("result");
      }
    },
    [scores, questionIndex]
  );

  const handleRetry = useCallback(() => {
    setPhase("start");
    setQuestionIndex(0);
    setScores({ EI: 0, SN: 0, TF: 0, JP: 0 });
    setResultCode("");
  }, []);

  if (phase === "loading") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="text-center text-pink-400 text-sm">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="mb-6 text-sm text-pink-400">
        <Link href="/" className="hover:text-pink-500">
          Top
        </Link>
        <span className="mx-2">/</span>
        <span className="text-pink-700">MBTI診断</span>
      </nav>

      {phase === "already_done" && resultCode && mbtiTypes[resultCode] && (
        <QuizAlreadyDone result={mbtiTypes[resultCode]} />
      )}
      {phase === "start" && <QuizStart onStart={handleStart} />}
      {phase === "quiz" && (
        <QuizQuestion
          question={questions[questionIndex]}
          currentIndex={questionIndex}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      )}
      {phase === "result" && resultCode && mbtiTypes[resultCode] && (
        <QuizResult result={mbtiTypes[resultCode]} onRetry={handleRetry} />
      )}
    </div>
  );
}
