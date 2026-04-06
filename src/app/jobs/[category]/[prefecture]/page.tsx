import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import {
  getAllJobPages,
  getJobPage,
  getCategoryLabel,
  getPrefectureLabel,
} from "@/lib/jobs";
import { parseMarkdown } from "@/lib/markdown";

export function generateStaticParams() {
  return getAllJobPages().map((j) => ({
    category: j.category,
    prefecture: j.prefecture,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; prefecture: string }>;
}): Promise<Metadata> {
  const { category, prefecture } = await params;
  const job = getJobPage(category, prefecture);
  if (!job) return {};
  return {
    title: job.title,
    description: job.description,
    alternates: {
      canonical: `https://koushunyu-navi.com/jobs/${category}/${prefecture}`,
    },
  };
}

export default async function JobPrefecturePage({
  params,
}: {
  params: Promise<{ category: string; prefecture: string }>;
}) {
  const { category, prefecture } = await params;
  const job = getJobPage(category, prefecture);
  if (!job) notFound();

  const { htmlContent } = await parseMarkdown(job.content);
  const catLabel = getCategoryLabel(category);
  const prefLabel = getPrefectureLabel(prefecture);

  // JSON-LD
  const jobPostingLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: `${prefLabel}の${catLabel}`,
    description: job.description,
    datePosted: "2026-04-06",
    employmentType: "PART_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "高収入ナビ",
      sameAs: "https://koushunyu-navi.com",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: prefLabel,
        addressCountry: "JP",
      },
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${prefLabel}の${catLabel}は未経験でも大丈夫？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `はい、${prefLabel}の${catLabel}求人の多くは未経験OKです。研修やサポート体制が整った店舗を選ぶのがおすすめです。`,
        },
      },
      {
        "@type": "Question",
        name: `${prefLabel}の${catLabel}の時給相場は？`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${prefLabel}の${catLabel}の時給はエリアや店舗により異なりますが、詳しくはページ内の相場データをご確認ください。`,
        },
      },
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Top", item: "https://koushunyu-navi.com/" },
      { "@type": "ListItem", position: 2, name: "求人一覧", item: "https://koushunyu-navi.com/jobs/" },
      { "@type": "ListItem", position: 3, name: catLabel, item: `https://koushunyu-navi.com/jobs/${category}/` },
      { "@type": "ListItem", position: 4, name: prefLabel, item: `https://koushunyu-navi.com/jobs/${category}/${prefecture}/` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <article className="mx-auto max-w-3xl px-4 py-8">
        {/* パンくず */}
        <nav className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-pink-600">Top</Link>
          <span className="mx-2">/</span>
          <Link href="/jobs" className="hover:text-pink-600">求人一覧</Link>
          <span className="mx-2">/</span>
          <Link href={`/jobs/${category}`} className="hover:text-pink-600">{catLabel}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{prefLabel}</span>
        </nav>

        {/* 本文 */}
        <div className="prose prose-pink max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>

        {/* CTA */}
        <div className="my-12 rounded-3xl bg-gradient-to-r from-pink-100 to-yellow-50 p-8 text-center">
          <p className="mb-4 text-sm text-gray-700">
            {prefLabel}の{catLabel}のお仕事、もっと詳しく聞きたい？<br />
            ナビちゃんとLINEで相談できるよ
          </p>
          <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600">
            <Link href="/line">LINEで無料相談する</Link>
          </Button>
        </div>
      </article>
    </>
  );
}
