import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-9 w-9 overflow-hidden rounded-full shadow-sm shadow-pink-200">
            <Image src="/navi-chan.png" alt="ナビちゃん" width={36} height={36} className="h-full w-full object-cover" />
          </div>
          <span className="font-heading text-lg font-bold text-pink-500">高収入ナビ</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <Link href="/jobs" className="text-pink-900/60 hover:text-pink-500">
            お仕事を探す
          </Link>
          <Link href="/shindan/mbti" className="text-pink-900/60 hover:text-pink-500">
            診断
          </Link>
          <Link href="/guides" className="text-pink-900/60 hover:text-pink-500">
            ガイド
          </Link>
        </nav>
        <Link
          href="/line"
          className="btn-pink-gradient !rounded-full !px-5 !py-2 text-xs"
        >
          LINE相談
        </Link>
      </div>
    </header>
  );
}
