import Link from "next/link";
import { Heart } from "lucide-react";

const PREFECTURES = [
  { name: "東京都", slug: "tokyo" },
  { name: "大阪府", slug: "osaka" },
  { name: "愛知県", slug: "aichi" },
  { name: "福岡県", slug: "fukuoka" },
  { name: "北海道", slug: "hokkaido" },
  { name: "神奈川県", slug: "kanagawa" },
  { name: "埼玉県", slug: "saitama" },
];

const CATEGORIES = [
  { slug: "chatlady", name: "チャットレディ" },
  { slug: "cabaret-club", name: "キャバクラ" },
  { slug: "mens-esthe", name: "メンズエステ" },
  { slug: "girls-bar", name: "ガールズバー" },
  { slug: "concafe", name: "コンカフェ" },
  { slug: "lounge", name: "ラウンジ" },
];

const CONDITIONS = [
  { slug: "zaitaku", name: "在宅OK" },
  { slug: "miken", name: "未経験OK" },
  { slug: "hibarai", name: "日払い" },
  { slug: "kaodashi-nashi", name: "顔出しなし" },
  { slug: "kokyuyo", name: "高時給" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-gradient-to-b from-pink-100 to-pink-200">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-pink-500">
            <Heart className="h-4 w-4 text-white" fill="white" />
          </div>
          <span className="font-heading text-lg font-bold text-pink-600">高収入ナビ</span>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div>
            <h3 className="mb-3 text-sm font-bold text-pink-600">職種から探す</h3>
            <ul className="space-y-2 text-sm text-pink-900/60">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/jobs/${c.slug}`} className="hover:text-pink-500">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold text-pink-600">エリアから探す</h3>
            <ul className="space-y-2 text-sm text-pink-900/60">
              {PREFECTURES.map((p) => (
                <li key={p.slug}>
                  <Link href={`/jobs/chatlady/${p.slug}`} className="hover:text-pink-500">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold text-pink-600">条件から探す</h3>
            <ul className="space-y-2 text-sm text-pink-900/60">
              {CONDITIONS.map((c) => (
                <li key={c.slug}>
                  <Link href={`/jobs/conditions/${c.slug}`} className="hover:text-pink-500">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold text-pink-600">コンテンツ</h3>
            <ul className="space-y-2 text-sm text-pink-900/60">
              <li><Link href="/guides" className="hover:text-pink-500">ガイド記事</Link></li>
              <li><Link href="/guides/chatre-home-guide" className="hover:text-pink-500">チャトレ在宅ガイド</Link></li>
              <li><Link href="/guides/mibare-manual" className="hover:text-pink-500">身バレ対策マニュアル</Link></li>
              <li><Link href="/shindan/mbti" className="hover:text-pink-500">MBTI診断</Link></li>
              <li><Link href="/line" className="hover:text-pink-500">LINE相談</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold text-pink-600">高収入ナビについて</h3>
            <ul className="space-y-2 text-sm text-pink-900/60">
              <li><Link href="/jobs" className="hover:text-pink-500">求人一覧</Link></li>
              <li><Link href="/guides" className="hover:text-pink-500">お役立ち情報</Link></li>
              <li><Link href="/line" className="hover:text-pink-500">お問い合わせ</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-pink-300/40 pt-6 text-center text-xs text-pink-400">
          &copy; {new Date().getFullYear()} 高収入ナビ All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
