import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "高収入ナビ｜副業MAP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#f472b6",
              letterSpacing: "0.2em",
              marginBottom: 16,
            }}
          >
            YOUR BEST WORK AWAITS
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#ec4899",
              lineHeight: 1.3,
              marginBottom: 16,
            }}
          >
            高収入ナビ
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#9d174d",
              marginBottom: 24,
            }}
          >
            副業MAP
          </div>
          <div
            style={{
              fontSize: 20,
              color: "#a06080",
            }}
          >
            ナビちゃんが優しくナビゲート。未経験から始められるお仕事多数。
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
