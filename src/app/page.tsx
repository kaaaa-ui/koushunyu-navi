import Link from "next/link";
import { Monitor, Wine, Sparkles, Beer, Coffee, Moon, MapPin, Heart, Briefcase, Star, Clock, Home, Shield, Baby, CalendarDays } from "lucide-react";
import { NaviChan, NaviChanBanner, NaviChanMessage } from "@/components/navi-chan";

const CATEGORIES = [
  { slug: "chatlady", name: "チャットレディ", icon: Monitor, desc: "在宅で働ける定番職種" },
  { slug: "cabaret-club", name: "キャバクラ", icon: Wine, desc: "夜職の王道・時給相場" },
  { slug: "mens-esthe", name: "メンズエステ", icon: Sparkles, desc: "業界のキホン解説" },
  { slug: "girls-bar", name: "ガールズバー", icon: Beer, desc: "カジュアルな夜職" },
  { slug: "concafe", name: "コンカフェ", icon: Coffee, desc: "昼職感覚で働ける" },
  { slug: "lounge", name: "ラウンジ", icon: Moon, desc: "落ち着いた接客業" },
];

const CONDITIONS = [
  { label: "未経験OK", icon: Star, slug: "miken" },
  { label: "日払い", icon: Briefcase, slug: "hibarai" },
  { label: "顔出しなし", icon: Shield, slug: "kaodashi-nashi" },
  { label: "在宅OK", icon: Home, slug: "zaitaku" },
  { label: "週末のみOK", icon: CalendarDays, slug: "shumatsu" },
  { label: "寮あり", icon: MapPin, slug: "ryo" },
  { label: "託児所あり", icon: Baby, slug: "takujisho" },
  { label: "短期OK", icon: Clock, slug: "tanki" },
  { label: "高時給", icon: Heart, slug: "kokyuyo" },
  { label: "体入OK", icon: Sparkles, slug: "taiin" },
];

const POPULAR_AREAS = [
  { name: "東京都", pref: "tokyo" },
  { name: "大阪府", pref: "osaka" },
  { name: "愛知県", pref: "aichi" },
  { name: "福岡県", pref: "fukuoka" },
  { name: "北海道", pref: "hokkaido" },
  { name: "神奈川県", pref: "kanagawa" },
  { name: "埼玉県", pref: "saitama" },
  { name: "千葉県", pref: "chiba" },
];

export default function HomePage() {
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "高収入ナビ",
    alternateName: "高収入ナビ｜高収入バイト情報メディア",
    url: "https://koushunyu-navi.vercel.app",
    description: "女性向け高収入バイトの情報メディア。チャトレ・キャバ・メンエスなど業界の基礎知識をやさしく解説",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://koushunyu-navi.vercel.app/jobs?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "高収入ナビ",
    url: "https://koushunyu-navi.vercel.app",
    logo: "https://koushunyu-navi.vercel.app/navi-chan.png",
    sameAs: [
      "https://x.com/iTfoAOK2sY35984",
      "https://www.tiktok.com/@koushunyu_navi",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      {/* Hero with large ナビちゃん */}
      <section className="sparkle-bg bg-gradient-to-b from-pink-100 via-pink-50 to-[#fff0f5] py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
            {/* ナビちゃん大きく表示 */}
            <div className="shrink-0">
              <div className="navi-float">
                <NaviChan size="hero" rounded={false} />
              </div>
            </div>
            {/* テキスト */}
            <div className="text-center md:text-left">
              <p className="mb-3 text-sm font-medium text-pink-400 tracking-widest">&#10022; YOUR BEST CHOICE AWAITS &#10022;</p>
              <h1 className="font-heading text-3xl font-bold leading-snug text-pink-600 md:text-5xl md:leading-snug">
                <span className="bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">高収入バイト</span>のこと、
                <br />
                やさしく解説します
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-pink-900/60">
                気になる業界のリアル、働き方の基本、MBTIでわかる職種タイプまで。
                <br />
                ナビちゃんと一緒に情報収集しよ。
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row md:justify-start">
                <Link href="/shindan/mbti" className="btn-pink-gradient text-sm">
                  MBTI診断を始める
                </Link>
                <Link
                  href="/guides"
                  className="rounded-full border-2 border-pink-300 px-6 py-3 text-sm font-semibold text-pink-500 hover:bg-pink-50"
                >
                  業界ガイドを読む
                </Link>
              </div>
              <p className="mt-6 text-sm text-pink-400">
                全国 <span className="text-2xl font-bold text-pink-500">3,940</span> 件以上の求人情報を解説・紹介中
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* カテゴリー */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title mb-10 text-2xl font-bold text-pink-600">
            職種について知る
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              return (
                <Link key={c.slug} href={`/jobs/${c.slug}`} className="card-kawaii p-5 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-100 to-pink-50">
                    <Icon className="h-5 w-5 text-pink-400" strokeWidth={1.5} />
                  </div>
                  <div className="text-sm font-bold text-pink-700">{c.name}</div>
                  <div className="mt-1 text-xs text-pink-400">{c.desc}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ナビちゃんバナー：MBTI診断CTA */}
      <section className="py-4">
        <div className="mx-auto max-w-6xl px-4">
          <NaviChanBanner position="right">
            <p className="mb-1 text-xs font-bold text-pink-400 tracking-wider">MBTI TYPE CHECK</p>
            <h2 className="mb-2 font-heading text-xl font-bold text-pink-600 md:text-2xl">
              あなたのタイプに合う職種を知ってみない？
            </h2>
            <p className="mb-4 text-sm text-pink-900/60">
              30秒のかんたん診断で、あなたのMBTIタイプに向いてる傾向がある職種タイプがわかるよ。
              <br />
              あくまで参考情報として楽しんでね。
            </p>
            <Link href="/shindan/mbti" className="btn-pink-gradient inline-block text-sm">
              無料で診断する
            </Link>
          </NaviChanBanner>
        </div>
      </section>

      {/* 条件 */}
      <section className="bg-gradient-to-b from-white to-pink-50/50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title mb-10 text-2xl font-bold text-pink-600">
            条件別の業界ガイド
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CONDITIONS.map((c) => {
              const Icon = c.icon;
              return (
                <Link
                  key={c.label}
                  href={`/jobs/conditions/${c.slug}`}
                  className="flex items-center gap-2 rounded-full border border-pink-200 bg-white px-5 py-2.5 text-sm text-pink-600 shadow-sm hover:border-pink-400 hover:shadow-md hover:shadow-pink-100"
                >
                  <Icon className="h-4 w-4 text-pink-400" strokeWidth={1.5} />
                  {c.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 人気エリア */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-title mb-10 text-2xl font-bold text-pink-600">
            エリア別ガイド
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {POPULAR_AREAS.map((a) => (
              <Link
                key={a.pref}
                href={`/jobs/chatlady/${a.pref}`}
                className="card-kawaii flex items-center justify-between px-5 py-4"
              >
                <span className="text-sm font-medium text-pink-700">{a.name}</span>
                <span className="text-pink-400">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ナビちゃんバナー：LINE相談CTA */}
      <section className="py-4">
        <div className="mx-auto max-w-6xl px-4">
          <NaviChanBanner position="left">
            <p className="mb-1 text-xs font-bold text-pink-400 tracking-wider">LINE Q&amp;A</p>
            <h2 className="mb-2 font-heading text-xl font-bold text-pink-600 md:text-2xl">
              業界のギモン、編集部にきいてみない？
            </h2>
            <p className="mb-4 text-sm text-pink-900/60">
              「未経験だとどんな感じ？」「どの職種が人気？」
              <br />
              業界のリアルな情報をお伝えするよ。
            </p>
            <p className="mb-4 text-xs text-pink-400">
              ※個別店舗のご紹介・お仕事の斡旋はしていません。参考情報としてお届けします。
            </p>
            <Link href="/line" className="inline-block rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-green-200 hover:bg-[#05b04c]">
              LINEでギモンを聞く
            </Link>
          </NaviChanBanner>
        </div>
      </section>

      {/* ナビちゃんメッセージ */}
      <section className="sparkle-bg bg-gradient-to-b from-pink-50 to-yellow-50/30 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="section-title mb-10 text-2xl font-bold text-pink-600">
            ナビちゃんからのメッセージ
          </h2>
          <NaviChanMessage>
            <p>
              はじめまして、ナビちゃんです。
            </p>
            <p className="mt-3">
              高収入のお仕事って「気になるけど不安...」って方、多いよね。
            </p>
            <p className="mt-3">
              ナビちゃんは、あなたが<b>自分で納得して判断できる</b>ように、
              業界のリアルな情報を優しくお届けするよ。
            </p>
            <p className="mt-3">
              私たちはお仕事の紹介はしてないけど、
              「知る」ことからお手伝いできたら嬉しいな。
            </p>
            <p className="mt-3">
              まずは気軽にMBTI診断で、あなたのタイプに
              合いやすい職種を見てみない？
            </p>
          </NaviChanMessage>
        </div>
      </section>
    </>
  );
}
