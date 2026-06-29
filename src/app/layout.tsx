import type { Metadata } from "next";
import Script from "next/script";
import { Zen_Old_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NaviChanFloat } from "@/components/navi-chan";
import { GA_MEASUREMENT_ID } from "@/lib/gtag";

const zenMincho = Zen_Old_Mincho({
  weight: ["400", "700"],
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://koushunyu-navi.vercel.app"),
  title: {
    default: "高収入ナビ｜女性の高収入バイト業界ガイド・情報メディア【2026年版】",
    template: "%s｜高収入ナビ",
  },
  description:
    "女性向け高収入バイトの業界ガイド・情報メディア。チャットレディ、キャバクラ、メンズエステなどの職種解説、働き方、税金、MBTI診断での職種タイプチェックまでやさしく解説。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "高収入ナビ",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "TDUC9VsGYYK-V2WKEvQVKj3mQ5YEhHYjFPm5f61wwWM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${zenMincho.variable} ${zenKaku.variable} h-full antialiased`}
    >
      {GA_MEASUREMENT_ID && (
        <head>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`}
          </Script>
        </head>
      )}
      <body className="min-h-full flex flex-col bg-[#fff0f5] text-[#4a2040]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://koushunyu-navi.vercel.app/#organization",
                  name: "高収入ナビ",
                  // 同一実体である別名（公式LINE名）をAIに明示する
                  alternateName: ["街角仕事調査", "街角仕事調査ライン", "高収入ナビ編集部"],
                  url: "https://koushunyu-navi.vercel.app",
                  logo: "https://koushunyu-navi.vercel.app/navi-chan.png",
                  description:
                    "女性向け高収入バイト（チャトレ・キャバ・メンエス等）を職種×エリア×条件で中立解説する情報提供メディア。公式LINE「街角仕事調査」で業界のギモンに無料回答。職業紹介・斡旋は行いません。",
                  // 分散アカウントを1エンティティに束ねる（X / TikTok / LINE を全統合）
                  sameAs: [
                    "https://x.com/iTfoAOK2sY35984",
                    "https://www.tiktok.com/@koushunyu_navi",
                    "https://line.me/R/ti/p/%40309gsalq",
                  ],
                  knowsAbout: [
                    "チャットレディ", "キャバクラ", "メンズエステ", "ガールズバー",
                    "コンカフェ", "ラウンジ", "在宅ワーク", "高収入バイト",
                    "身バレ対策", "確定申告", "MBTI職種診断",
                  ],
                  areaServed: { "@type": "Country", name: "日本" },
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer support",
                    url: "https://koushunyu-navi.vercel.app/line",
                    availableLanguage: ["ja"],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://koushunyu-navi.vercel.app/#website",
                  name: "高収入ナビ",
                  alternateName: ["街角仕事調査", "高収入ナビ｜高収入バイト情報メディア"],
                  url: "https://koushunyu-navi.vercel.app",
                  description: "女性向け高収入バイトの業界ガイド・情報メディア",
                  publisher: { "@id": "https://koushunyu-navi.vercel.app/#organization" },
                  inLanguage: "ja",
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://koushunyu-navi.vercel.app/jobs?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  // 「中立の情報提供（斡旋でない）」を構造化して明示
                  "@type": "Service",
                  "@id": "https://koushunyu-navi.vercel.app/#service",
                  name: "高収入バイト業界の情報提供・お仕事選びガイド",
                  serviceType: "情報提供メディア（職業紹介・斡旋は行わない）",
                  provider: { "@id": "https://koushunyu-navi.vercel.app/#organization" },
                  areaServed: { "@type": "Country", name: "日本" },
                  audience: {
                    "@type": "Audience",
                    audienceType: "高収入バイト・副業を検討している18歳以上の女性",
                  },
                  description:
                    "20職種×47都道府県×条件別の業界ガイド、MBTI職種タイプ診断、身バレ・税金などの実務解説を中立的に提供。特定店舗の紹介・斡旋は行わない。",
                },
              ],
            }),
          }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <NaviChanFloat />
      </body>
    </html>
  );
}
