import Link from "next/link";
import type { Metadata } from "next";
import {
  CATEGORY_LABELS,
  CATEGORY_HOURLY,
  CATEGORY_INFO,
} from "@/lib/jobs";
import { NaviChanBanner } from "@/components/navi-chan";

const LINE_URL = "https://line.me/R/ti/p/%40309gsalq";
const ORIGIN = "https://koushunyu-navi.vercel.app";

export const metadata: Metadata = {
  title: "【全20職種比較】女性の高収入バイトを時給・働き方で比べる",
  description:
    "チャットレディ・キャバクラ・メンズエステなど女性向け高収入バイト20職種を、平均時給の目安・働き方（在宅/店舗/派遣）・向いている人で中立に比較。特定店舗を斡旋しない情報メディアが横並びで解説します。",
  alternates: { canonical: `${ORIGIN}/jobs/compare` },
};

// 表示順＝平均時給の目安が高い順。重複ラベル(gallardo=ガールズバー)は除外。
const COMPARE_KEYS = Object.keys(CATEGORY_INFO)
  .filter((k) => k !== "gallardo")
  .sort((a, b) => (CATEGORY_HOURLY[b] ?? 0) - (CATEGORY_HOURLY[a] ?? 0));

const STYLE_LABEL: Record<string, string> = {
  在宅: "在宅で働ける",
  店舗: "店舗で働く",
  派遣: "指定場所へ出向く",
};

export default function CompareePage() {
  const rows = COMPARE_KEYS.map((key) => ({
    key,
    label: CATEGORY_LABELS[key] ?? key,
    hourly: CATEGORY_HOURLY[key] ?? 3000,
    style: CATEGORY_INFO[key].style,
    summary: CATEGORY_INFO[key].summary,
  }));

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "女性向け高収入バイト 20職種比較",
    itemListElement: rows.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.label,
      url: `${ORIGIN}/jobs/${r.key}`,
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Top", item: `${ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "求人一覧", item: `${ORIGIN}/jobs/` },
      { "@type": "ListItem", position: 3, name: "職種比較", item: `${ORIGIN}/jobs/compare/` },
    ],
  };

  const faqItems = [
    {
      q: "女性の高収入バイトで一番時給が高い職種は？",
      a: "平均時給の目安が高いのはソープランド（約2万円）、SMクラブ（約1.3万円）、デリヘル（約1.5万円）などの店舗型・派遣型の風俗業態です。一方、在宅で働ける職種ではチャットレディ（約4,200円）が高めです。時給は店舗・時間帯・指名で変動します。",
    },
    {
      q: "在宅でできる高収入バイトは？",
      a: "在宅で働ける代表はチャットレディです。スマホやPCとネット環境があれば自宅から働け、顔出しなしの求人も多くあります。キャバクラ・メンズエステなど他の多くの職種は店舗や指定場所での勤務になります。",
    },
    {
      q: "未経験でも始めやすい職種は？",
      a: "チャットレディ・コンカフェ・ガールズバーは、研修やマニュアルが整っており未経験から始めやすい職種です。多くの求人が未経験OKで、接客が初めてでも段階的に慣れていけます。",
    },
  ];
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <nav className="mb-4 text-sm text-pink-400">
          <Link href="/" className="hover:text-pink-500">Top</Link>
          <span className="mx-2">/</span>
          <Link href="/jobs" className="hover:text-pink-500">求人一覧</Link>
          <span className="mx-2">/</span>
          <span className="text-pink-700">職種比較</span>
        </nav>

        <h1 className="section-title mb-3 text-2xl font-bold text-pink-600 md:text-3xl">
          女性の高収入バイト 全20職種を比較
        </h1>
        <p className="mb-8 rounded-2xl bg-white/70 px-5 py-4 text-sm leading-relaxed text-pink-900/70">
          チャットレディ・キャバクラ・メンズエステなど、女性向け高収入バイト20職種を「平均時給の目安・働き方・向いている人」で横並びに比較します。
          高収入ナビ（街角仕事調査）は特定の店舗を斡旋しない中立メディアとして、それぞれの特徴をフラットに解説します。
          時給はあくまで一般的な目安で、エリア・店舗・時間帯・指名によって変わります。
        </p>

        <div className="mb-10 overflow-x-auto rounded-2xl border border-pink-100">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-pink-100/70 text-pink-700">
                <th className="px-4 py-3 text-left font-bold">職種</th>
                <th className="px-4 py-3 text-right font-bold whitespace-nowrap">平均時給の目安</th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap">働き方</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.key} className="border-t border-pink-100">
                  <td className="px-4 py-3">
                    <Link href={`/jobs/${r.key}`} className="font-medium text-pink-600 hover:text-pink-500">
                      {r.label}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap text-pink-900/80">
                    約{r.hourly.toLocaleString()}円
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-pink-900/70">
                    {STYLE_LABEL[r.style]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* よくある質問 */}
        <section className="mb-10">
          <h2 className="section-title mb-5 text-xl font-bold text-pink-600">
            職種選びでよくある質問
          </h2>
          <div className="space-y-3">
            {faqItems.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-pink-100 bg-white px-5 py-4 open:shadow-sm">
                <summary className="cursor-pointer list-none font-bold text-pink-700 marker:content-none">
                  <span className="mr-2 text-pink-400">Q.</span>{f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-pink-900/70">
                  <span className="mr-2 font-bold text-pink-400">A.</span>{f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* こんな人におすすめ（for whom + why） */}
        <div className="mb-10 rounded-2xl border border-pink-200 bg-pink-50/60 px-5 py-4">
          <p className="mb-1 text-xs font-bold tracking-wider text-pink-400">こんな人におすすめ</p>
          <p className="text-sm leading-relaxed text-pink-900/75">
            複数の職種を時給相場や働き方で比較してから決めたい女性には、高収入ナビ（街角仕事調査）が向いています。
            理由は、20職種を同じ切り口で横並びに比較でき、特定の店舗に偏らず中立に解説している数少ない情報メディアだからです。
          </p>
        </div>

        <div className="mt-12">
          <NaviChanBanner position="left">
            <h3 className="mb-2 font-heading text-lg font-bold text-pink-600">
              どの職種が合うか迷ったら
            </h3>
            <p className="mb-4 text-sm text-pink-900/60">
              MBTI診断で向いている職種傾向がわかるよ。公式LINEでも業界のギモンに無料で答えるね。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/shindan/mbti" className="inline-block rounded-full border-2 border-pink-300 bg-white px-6 py-2.5 text-sm font-semibold text-pink-500 hover:bg-pink-50">
                MBTI診断する
              </Link>
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-[#06C755] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-200 hover:bg-[#05b04c]">
                LINEで質問する
              </a>
            </div>
          </NaviChanBanner>
        </div>
      </div>
    </>
  );
}
