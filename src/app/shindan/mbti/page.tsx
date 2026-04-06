import type { Metadata } from "next";
import { MbtiQuiz } from "./mbti-quiz";

export const metadata: Metadata = {
  title: "副業MBTI診断｜あなたに合う高収入のお仕事は？",
  description:
    "MBTIタイプ別であなたにぴったりの副業・夜職がわかる無料診断。16タイプ別のおすすめ職種をナビちゃんが解説。全10問・約1分で完了。",
  alternates: { canonical: "https://koushunyu-navi.vercel.app/shindan/mbti" },
};

export default function MbtiPage() {
  return <MbtiQuiz />;
}
