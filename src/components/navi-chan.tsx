import Image from "next/image";
import Link from "next/link";

interface NaviChanProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "hero";
  className?: string;
  rounded?: boolean;
}

const pxSizes = {
  sm: 32,
  md: 40,
  lg: 64,
  xl: 120,
  "2xl": 180,
  hero: 280,
};

const cssSizes = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-16 w-16",
  xl: "h-[120px] w-[120px]",
  "2xl": "h-[180px] w-[180px]",
  hero: "h-[280px] w-[280px]",
};

export function NaviChan({ size = "md", className = "", rounded = true }: NaviChanProps) {
  const isLarge = size === "xl" || size === "2xl" || size === "hero";
  return (
    <div className={`inline-block shrink-0 overflow-hidden ${rounded ? "rounded-full" : ""} ${isLarge ? "" : "shadow-lg shadow-pink-200"} ${cssSizes[size]} ${className}`}>
      <Image
        src="/navi-chan.png"
        alt="ナビちゃん"
        width={pxSizes[size]}
        height={pxSizes[size]}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

interface NaviChanMessageProps {
  children: React.ReactNode;
  label?: string;
  variant?: "default" | "quote";
}

export function NaviChanMessage({
  children,
  label = "ナビちゃんより",
  variant = "default",
}: NaviChanMessageProps) {
  if (variant === "quote") {
    return (
      <div className="rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 to-white p-5">
        <div className="mb-3 flex items-center gap-3">
          <NaviChan size="sm" />
          <span className="text-sm font-bold text-pink-500">
            {label} <span className="text-gold">&#10022;</span>
          </span>
        </div>
        <div className="text-sm leading-relaxed text-pink-900/70">{children}</div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-gradient-to-br from-pink-50 via-white to-yellow-50/30 p-6 shadow-sm border border-pink-100">
      <div className="mb-4 flex items-center gap-3">
        <NaviChan size="lg" />
        <div>
          <div className="text-sm font-bold text-pink-500">
            {label} <span className="text-gold">&#10022;</span>
          </div>
          <div className="text-xs text-pink-400">あなたの副業ナビゲーター</div>
        </div>
      </div>
      <div className="text-sm leading-relaxed text-pink-900/70">{children}</div>
    </div>
  );
}

/** バニラ風：セクション横にナビちゃんが登場する帯 */
interface NaviChanBannerProps {
  children: React.ReactNode;
  position?: "left" | "right";
  className?: string;
}

export function NaviChanBanner({ children, position = "right", className = "" }: NaviChanBannerProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-100 via-pink-50 to-yellow-50/30 border border-pink-200 ${className}`}>
      <div className={`flex items-center gap-6 p-6 md:p-8 ${position === "right" ? "flex-row" : "flex-row-reverse"}`}>
        <div className="flex-1">{children}</div>
        <div className="hidden shrink-0 md:block">
          <NaviChan size="2xl" rounded={false} />
        </div>
        <div className="block shrink-0 md:hidden">
          <NaviChan size="xl" rounded={false} />
        </div>
      </div>
    </div>
  );
}

/** 固定フローティングナビちゃん（右下） */
export function NaviChanFloat() {
  return (
    <div className="fixed bottom-4 right-4 z-50 group">
      <Link href="/line" className="block">
        <div className="relative">
          {/* 吹き出し */}
          <div className="absolute -top-14 right-0 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-bold text-pink-500 shadow-lg border border-pink-200 opacity-0 group-hover:opacity-100 transition-opacity">
            気軽に相談してね！
            <div className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 bg-white border-b border-r border-pink-200" />
          </div>
          <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-xl shadow-pink-200/50 transition-transform group-hover:scale-110">
            <Image
              src="/navi-chan.png"
              alt="ナビちゃんに相談"
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          {/* LINEバッジ */}
          <div className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#06C755] text-[10px] font-bold text-white shadow">
            LINE
          </div>
        </div>
      </Link>
    </div>
  );
}
