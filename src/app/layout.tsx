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
              "@type": "WebSite",
              name: "高収入ナビ",
              url: "https://koushunyu-navi.vercel.app",
              description: "女性向け高収入バイトの業界ガイド・情報メディア",
              publisher: {
                "@type": "Organization",
                name: "高収入ナビ編集部",
              },
              inLanguage: "ja",
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
