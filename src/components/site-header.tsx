import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">💓</span>
          <span className="text-lg font-bold text-pink-600">高収入ナビ</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium md:flex">
          <Link href="/jobs" className="text-gray-700 hover:text-pink-600">
            お仕事を探す
          </Link>
          <Link href="/shindan/mbti" className="text-gray-700 hover:text-pink-600">
            診断
          </Link>
          <Link href="/guides" className="text-gray-700 hover:text-pink-600">
            ガイド
          </Link>
        </nav>
        <Button asChild size="sm" className="bg-pink-500 hover:bg-pink-600">
          <Link href="/line">LINE相談</Link>
        </Button>
      </div>
    </header>
  );
}
