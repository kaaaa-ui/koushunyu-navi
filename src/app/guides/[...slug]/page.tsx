import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { parseMarkdown } from "@/lib/markdown";
import { NaviChanMessage } from "@/components/navi-chan";

// 勝ち筋ガイド（不安・How・比較＝AIに引用されやすいクエリ）の自己完結FAQ。
// 監査で「騙されない」は公的機関しかいない盲点クエリ＝最優先で取りに行く。
const GUIDE_FAQ: Record<string, { q: string; a: string }[]> = {
  "nightwork-safety-checklist": [
    { q: "高収入バイトで騙されないための見分け方は？", a: "運営会社名・所在地が明記され、報酬体系や罰金の有無が事前に説明される求人を選びましょう。「即日大金」「ノーリスク」を過度に強調する、会社情報が無い、面接前に保証金や登録料・個人情報を要求する求人は危険です。契約内容を書面やメッセージで確認できることが安全の最低条件です。" },
    { q: "危険な求人によくある特徴は？", a: "①運営者情報が不明 ②報酬が相場より極端に高い ③罰金・ノルマの説明を避ける ④面接前に保証金や登録料を求める ⑤連絡がLINEのみで会社の実体を確認できない、などです。1つでも当てはまれば応募を控えるのが安全です。" },
    { q: "トラブルを避けるため面接時に確認すべきことは？", a: "報酬の計算方法と支払日、罰金やノルマの有無、身分証の取り扱い、辞めたいときの手続きを必ず確認しましょう。口頭だけでなく書面で残すこと、少しでも不安なら即決しないことが大切です。" },
  ],
  "mibare-manual": [
    { q: "チャットレディは身バレしますか？", a: "対策をすればリスクは大きく下げられます。顔出しなしで働く、配信エリアを地元から除外する、本名やSNS・勤務先につながる情報を出さない、録画対策のある事務所を選ぶ、の4点が基本です。" },
    { q: "顔出しなしでも働けますか？", a: "はい。マスク・ウィッグ・首から下のみの配信や、音声・チャット中心の働き方など、顔を出さずに働ける求人が多くあります。身バレが不安なら顔出し不要の条件で探しましょう。" },
    { q: "副業が住民税でバレないようにするには？", a: "確定申告で住民税を「自分で納付（普通徴収）」にすると、本業の給与天引きに上乗せされにくくなります。自治体により扱いが異なるため、申告時に確認するのが確実です。" },
  ],
  "kakuteishinkoku-guide": [
    { q: "チャットレディは確定申告が必要ですか？", a: "専業で年48万円超の所得、または給与所得がある副業で年20万円超の所得がある場合、確定申告が必要です。報酬は事業所得または雑所得として扱われます。" },
    { q: "経費にできるものは？", a: "通信費、衣装・コスメ、照明やWebカメラなどの機材、家賃や光熱費の一部（仕事に使う割合）などが経費にできます。レシートや明細を保管しておきましょう。" },
    { q: "確定申告をしないとどうなりますか？", a: "無申告加算税や延滞税が課されることがあります。所得が基準を超えたら必ず申告しましょう。不明な点は税務署や税理士に相談するのが安全です。" },
  ],
  "chatre-home-guide": [
    { q: "チャットレディの始め方は？", a: "①スマホかPCとネット環境を用意 ②顔出し有無や在宅/通勤など希望条件を決める ③運営会社が明記された求人に応募 ④身分証で年齢確認・登録 ⑤研修を受けて配信開始、という流れです。未経験でも始められます。" },
    { q: "未経験でも稼げますか？", a: "未経験から始める人が大半です。最初から大きく稼げるわけではありませんが、配信時間帯の工夫や常連づくりで収入を伸ばせます。平均時給の目安は4,000円前後です。" },
    { q: "在宅と通勤どちらがいいですか？", a: "在宅は通勤不要でプライバシーを守りやすい一方、機材を自分で用意します。通勤は機材・個室が整う反面、通う必要があります。身バレ重視なら在宅、設備重視なら通勤が向いています。" },
  ],
  "industry-comparison": [
    { q: "チャトレ・キャバ・メンエスの違いは？", a: "チャットレディは在宅・顔出しなしで働ける画面越しの接客、キャバクラは来店客と会話で接客する店舗型、メンズエステは男性向けにマッサージを提供する店舗型です。在宅希望ならチャトレ、会話が得意ならキャバ、技術を身につけたいならメンエスが向いています。" },
    { q: "一番稼ぎやすいのは？", a: "平均時給の目安はチャットレディ約4,200円、キャバクラ約4,000円、メンズエステ約3,500円ですが、指名やインセンティブで変わります。在宅で効率を重視するならチャトレ、接客で伸ばすならキャバが狙えます。" },
    { q: "未経験はどれから始めるべき？", a: "未経験なら、在宅で始められて顔出しなしも選べるチャットレディが最もハードルが低い選択肢です。対面接客に抵抗がなければガールズバーやコンカフェもカジュアルで始めやすいです。" },
  ],
};

export async function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: "article",
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      tags: guide.tags,
    },
    alternates: {
      canonical: `https://koushunyu-navi.vercel.app/guides/${guide.slug}`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug: slugParts } = await params;
  const slug = slugParts.join("/");
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const { htmlContent } = await parseMarkdown(guide.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt,
    inLanguage: "ja",
    author: { "@id": "https://koushunyu-navi.vercel.app/#organization" },
    publisher: { "@id": "https://koushunyu-navi.vercel.app/#organization" },
    mainEntityOfPage: `https://koushunyu-navi.vercel.app/guides/${guide.slug}`,
  };

  const faqItems = GUIDE_FAQ[guide.slug] ?? [];
  const faqLd = faqItems.length
    ? {
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: faqItems.map((f) => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Top", item: "https://koushunyu-navi.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "ガイド", item: "https://koushunyu-navi.vercel.app/guides/" },
      { "@type": "ListItem", position: 3, name: guide.title, item: `https://koushunyu-navi.vercel.app/guides/${guide.slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <article className="mx-auto max-w-3xl px-4 py-8">
        <nav className="mb-4 text-sm text-pink-400">
          <Link href="/" className="hover:text-pink-500">Top</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-pink-500">ガイド</Link>
          <span className="mx-2">/</span>
          <span className="text-pink-700">{guide.title}</span>
        </nav>

        <header className="mb-8 rounded-2xl bg-gradient-to-r from-pink-50 to-white p-6 border border-pink-100">
          <div className="mb-3 flex items-center gap-2 text-xs text-pink-400">
            <span>公開: {guide.publishedAt}</span>
            <span>&middot; 更新: {guide.updatedAt}</span>
            <span>&middot; {guide.readingTime}分</span>
          </div>
          <h1 className="mb-4 font-heading text-2xl font-bold leading-relaxed text-pink-700 md:text-3xl">
            {guide.title}
          </h1>
          <p className="text-pink-900/60">{guide.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {guide.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-pink-100 px-3 py-0.5 text-xs text-pink-500">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mb-10">
          <NaviChanMessage variant="quote">
            <p>
              こんにちは、ナビちゃんです。この記事では「{guide.title.split("｜")[0]}」について、
              知っていることを全部まとめました。焦らなくて大丈夫、一緒に読んでいきましょう。
            </p>
          </NaviChanMessage>
        </div>

        <div className="prose-editorial max-w-none">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>

        {faqItems.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-5 font-heading text-xl font-bold text-pink-600">よくある質問</h2>
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
        )}

        <div className="my-12 rounded-3xl bg-gradient-to-r from-pink-100 to-yellow-50 p-8 text-center">
          <p className="mb-4 text-sm text-pink-700">
            業界のこと、もっと詳しく知りたい？
            <br />
            ナビちゃんにLINEで質問できるよ
          </p>
          <Link href="/line" className="btn-pink-gradient text-sm">
            LINEで質問する
          </Link>
          <p className="mt-3 text-xs text-pink-400">
            ※業界の一般情報をご案内しています。個別の店舗紹介・お仕事の斡旋は行っておりません。
          </p>
        </div>
      </article>
    </>
  );
}
