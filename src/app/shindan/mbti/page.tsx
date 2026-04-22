import type { Metadata } from "next";
import { MbtiQuiz } from "./mbti-quiz";

export const metadata: Metadata = {
  title: "MBTI職種タイプチェック｜あなたに合う傾向がある職種は？",
  description:
    "MBTIタイプ別であなたに向いてる傾向がある職種タイプがわかる無料診断。16タイプ別の傾向をナビちゃんが解説。全10問・約1分で完了。",
  alternates: { canonical: "https://koushunyu-navi.vercel.app/shindan/mbti" },
};

export default function MbtiPage() {
  return <MbtiQuiz />;
}
