import Link from "next/link";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  { slug: "chatlady", name: "チャットレディ", icon: "💻", desc: "在宅OK・ノンアダOK" },
  { slug: "cabaret-club", name: "キャバクラ", icon: "🥂", desc: "時給4,000円〜" },
  { slug: "mens-esthe", name: "メンズエステ", icon: "💆‍♀️", desc: "未経験OK" },
  { slug: "girls-bar", name: "ガールズバー", icon: "🍻", desc: "私服OK" },
  { slug: "concafe", name: "コンカフェ", icon: "☕", desc: "バイト感覚" },
  { slug: "night-work", name: "ナイトワーク", icon: "🌙", desc: "高収入" },
];

const CONDITIONS = [
  "未経験OK", "日払い", "顔出しなし", "在宅", "週末のみ", "寮あり", "託児所あり", "短期OK",
];

const POPULAR_AREAS = [
  { name: "新宿", pref: "東京都" },
  { name: "渋谷", pref: "東京都" },
  { name: "池袋", pref: "東京都" },
  { name: "梅田", pref: "大阪府" },
  { name: "難波", pref: "大阪府" },
  { name: "名駅", pref: "愛知県" },
  { name: "栄", pref: "愛知県" },
  { name: "博多", pref: "福岡県" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-pink-50 to-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <div className="mb-4 text-6xl">💓</div>
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-5xl">
            あなたにぴったりの
            <br />
            高収入副業が見つかる
          </h1>
          <p className="mb-8 text-base text-gray-600 md:text-lg">
            ナビちゃんが優しくナビゲート✨ 未経験から始められるお仕事多数
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600">
              <Link href="/shindan/mbti">MBTI診断を始める</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-pink-300">
              <Link href="/jobs">お仕事を探す</Link>
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-500">
            全国 <span className="text-xl font-bold text-pink-600">3,247</span> 件の高収入求人掲載中
          </p>
        </div>
      </section>

      {/* カテゴリー */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            職種から探す
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/jobs/${c.slug}`}
                className="rounded-2xl border border-pink-100 bg-white p-4 text-center shadow-sm transition hover:border-pink-300 hover:shadow-md"
              >
                <div className="mb-2 text-3xl">{c.icon}</div>
                <div className="text-sm font-bold text-gray-900">{c.name}</div>
                <div className="mt-1 text-xs text-gray-500">{c.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 条件 */}
      <section className="bg-pink-50/50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            人気の条件で探す
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {CONDITIONS.map((c) => (
              <Link
                key={c}
                href={`/jobs?condition=${encodeURIComponent(c)}`}
                className="rounded-full border border-pink-200 bg-white px-4 py-2 text-sm text-gray-700 hover:border-pink-400 hover:text-pink-600"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 人気エリア */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            人気エリアから探す
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {POPULAR_AREAS.map((a) => (
              <Link
                key={a.name}
                href={`/area/${a.pref}`}
                className="rounded-xl border border-pink-100 bg-white p-4 transition hover:border-pink-300 hover:shadow-sm"
              >
                <div className="text-xs text-gray-500">{a.pref}</div>
                <div className="mt-1 text-base font-bold text-gray-900">{a.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ナビちゃんメッセージ */}
      <section className="bg-gradient-to-r from-pink-100 to-yellow-50 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="text-4xl">👧</div>
              <div>
                <div className="text-sm font-bold text-pink-600">ナビちゃんより💓</div>
                <div className="text-xs text-gray-500">あなたの副業ナビゲーター</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">
              はじめまして、ナビちゃんだよ💓<br />
              高収入のお仕事って「気になるけど不安...」って人が多いよね。
              ナビちゃんは、そんなあなたが<b>安心してお仕事を選べる</b>ように、
              業界のリアルな情報を優しくお届けするよ✨<br />
              まずはMBTI診断で、あなたに合ったお仕事のタイプを調べてみよう🌸
            </p>
            <div className="mt-6 text-center">
              <Button asChild className="bg-pink-500 hover:bg-pink-600">
                <Link href="/line">LINEで相談してみる</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
