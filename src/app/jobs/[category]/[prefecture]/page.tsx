import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllJobPages, getJobPage, getCategoryLabel, getPrefectureLabel } from "@/lib/jobs";
import { parseMarkdown } from "@/lib/markdown";
import { NaviChan, NaviChanBanner } from "@/components/navi-chan";
import { ExternalLink } from "lucide-react";

const CHOUCHOU_URL = "https://chouchou-live.com/";
const LINE_URL = "https://line.me/R/ti/p/%40309gsalq";

export function generateStaticParams() {
  return getAllJobPages().map((j) => ({ category: j.category, prefecture: j.prefecture }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; prefecture: string }> }): Promise<Metadata> {
  const { category, prefecture } = await params;
  const job = getJobPage(category, prefecture);
  if (!job) return {};
  return {
    title: job.title,
    description: job.description,
    alternates: { canonical: `https://koushunyu-navi.vercel.app/jobs/${category}/${prefecture}` },
  };
}

export default async function JobPrefecturePage({ params }: { params: Promise<{ category: string; prefecture: string }> }) {
  const { category, prefecture } = await params;
  const job = getJobPage(category, prefecture);
  if (!job) notFound();

  const { htmlContent } = await parseMarkdown(job.content);
  const catLabel = getCategoryLabel(category);
  const prefLabel = getPrefectureLabel(prefecture);

  const jobPostingLd = {
    "@context": "https://schema.org", "@type": "JobPosting",
    title: `${prefLabel}の${catLabel}`, description: job.description, datePosted: "2026-04-06",
    employmentType: "PART_TIME",
    hiringOrganization: { "@type": "Organization", name: "高収入ナビ", sameAs: "https://koushunyu-navi.vercel.app" },
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressRegion: prefLabel, addressCountry: "JP" } },
  };

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `${prefLabel}の${catLabel}は未経験でも大丈夫？`, acceptedAnswer: { "@type": "Answer", text: `はい、${prefLabel}の${catLabel}求人の多くは未経験OKです。研修やサポート体制が整った店舗を選ぶのがおすすめです。` } },
      { "@type": "Question", name: `${prefLabel}の${catLabel}の時給相場は？`, acceptedAnswer: { "@type": "Answer", text: `${prefLabel}の${catLabel}の時給はエリアや店舗により異なりますが、詳しくはページ内の相場データをご確認ください。` } },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Top", item: "https://koushunyu-navi.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "求人一覧", item: "https://koushunyu-navi.vercel.app/jobs/" },
      { "@type": "ListItem", position: 3, name: catLabel, item: `https://koushunyu-navi.vercel.app/jobs/${category}/` },
      { "@type": "ListItem", position: 4, name: prefLabel, item: `https://koushunyu-navi.vercel.app/jobs/${category}/${prefecture}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <article className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-sm text-pink-400">
          <Link href="/" className="hover:text-pink-500">Top</Link>
          <span className="mx-2">/</span>
          <Link href="/jobs" className="hover:text-pink-500">求人一覧</Link>
          <span className="mx-2">/</span>
          <Link href={`/jobs/${category}`} className="hover:text-pink-500">{catLabel}</Link>
          <span className="mx-2">/</span>
          <span className="text-pink-700">{prefLabel}</span>
        </nav>

        <div className="prose-editorial max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>

        {/* 求人応募CTA */}
        <div className="my-12 space-y-6">
          {/* チャトレのみ: chouchouリンク */}
          {category === "chatlady" && (
            <div className="rounded-2xl border border-pink-200 bg-white p-6 text-center shadow-sm">
              <p className="mb-1 text-xs font-bold text-pink-400 tracking-wider">FIND YOUR JOB</p>
              <h3 className="mb-2 font-heading text-lg font-bold text-pink-600">
                {prefLabel}のチャットレディ求人を見る
              </h3>
              <p className="mb-5 text-sm text-pink-900/60">
                chouchouで{prefLabel}エリアの最新求人をチェック！
              </p>
              <a
                href={CHOUCHOU_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pink-gradient inline-flex items-center gap-2 text-sm"
              >
                chouchouで求人を探す
                <ExternalLink className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          )}

          {/* チャトレ以外: チャトレも提案 */}
          {category !== "chatlady" && (
            <div className="sparkle-bg rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 to-yellow-50/30 p-6">
              <div className="flex items-start gap-4">
                <NaviChan size="lg" />
                <div>
                  <h3 className="mb-1 font-heading text-base font-bold text-pink-600">
                    ナビちゃんのおすすめ
                  </h3>
                  <p className="mb-3 text-sm text-pink-900/60">
                    {catLabel}もいいけど、<b>チャットレディ</b>なら在宅OK・未経験OK・顔出しなしで始められるよ！
                    自分のペースで高収入が目指せるから、副業デビューにぴったり。
                  </p>
                  <Link
                    href={`/jobs/chatlady/${prefecture}`}
                    className="btn-pink-gradient inline-block text-sm"
                  >
                    {prefLabel}のチャトレ求人を見る
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* LINE相談 + MBTI（共通） */}
          <NaviChanBanner position="right">
            <p className="mb-1 text-xs font-bold text-pink-400 tracking-wider">LINE CONSULTATION</p>
            <h3 className="mb-2 font-heading text-lg font-bold text-pink-600">
              どのお仕事が合うかわからない？
            </h3>
            <p className="mb-4 text-sm text-pink-900/60">
              ナビちゃんにLINEで相談してね！MBTI診断であなたにぴったりのお仕事もわかるよ。
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-[#06C755] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-200 hover:bg-[#05b04c]"
              >
                LINEで相談する
              </a>
              <Link
                href="/shindan/mbti"
                className="inline-block rounded-full border-2 border-pink-300 bg-white px-6 py-2.5 text-sm font-semibold text-pink-500 hover:bg-pink-50"
              >
                MBTI診断する
              </Link>
            </div>
          </NaviChanBanner>
        </div>
      </article>
    </>
  );
}
