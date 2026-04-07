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
    default: "高収入ナビ｜女性の高収入バイト・副業求人3,900件以上【2026年最新】",
    template: "%s｜高収入ナビ",
  },
  description:
    "チャトレ・キャバ・メンエスなど女性向け高収入求人3,900件以上。未経験OK・在宅OK・日払いなど条件別に探せる。ナビちゃんが安全なお店選びを優しくナビゲート。",
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "高収入ナビ",
  },
  twitter: {
    card: "summary_large_image",
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
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <NaviChanFloat />
      </body>
    </html>
  );
}
