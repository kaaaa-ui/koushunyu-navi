import { ImageResponse } from "next/og";
import { NAVI_OGP_BASE64 } from "@/lib/navi-ogp-base64";

export const runtime = "edge";
export const alt = "高収入ナビ｜高収入バイト情報メディア";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const zenOldMincho = await fetch(
    "https://fonts.gstatic.com/s/zenoldmincho/v21/tss5ApVaYiLEpZ2cQR4C3EvZ2B-urp-bPJXGfA.woff"
  ).then((r) => r.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #fce7f3 0%, #fff0f5 50%, #fef3c7 100%)",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Zen Old Mincho, serif",
          position: "relative",
        }}
      >
        {/* ナビちゃん */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 48,
          }}
        >
          <img
            src={NAVI_OGP_BASE64}
            width={260}
            height={260}
            style={{
              borderRadius: "50%",
              border: "4px solid white",
              boxShadow: "0 8px 32px rgba(236, 72, 153, 0.3)",
            }}
          />
        </div>

        {/* テキスト */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#ec4899",
              lineHeight: 1.2,
            }}
          >
            高収入ナビ
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#9d174d",
              marginTop: 8,
              letterSpacing: "0.15em",
            }}
          >
            情報メディア
          </div>
          <div
            style={{
              display: "flex",
              width: 240,
              height: 2,
              background: "linear-gradient(to right, #ec4899, transparent)",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <div
            style={{
              fontSize: 22,
              color: "#6b2140",
              lineHeight: 1.6,
            }}
          >
            ナビちゃんが優しくナビゲート
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#9d6080",
              marginTop: 4,
            }}
          >
            業界のリアルをやさしく解説
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Zen Old Mincho",
          data: zenOldMincho,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
