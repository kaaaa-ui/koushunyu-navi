import Link from "next/link";

const PREFECTURES = [
  { name: "東京都", slug: "tokyo" },
  { name: "大阪府", slug: "osaka" },
  { name: "愛知県", slug: "aichi" },
  { name: "福岡県", slug: "fukuoka" },
  { name: "北海道", slug: "hokkaido" },
];

const CATEGORIES = [
  { slug: "chatlady", name: "チャットレディ" },
  { slug: "cabaret-club", name: "キャバクラ" },
  { slug: "mens-esthe", name: "メンズエステ" },
  { slug: "girls-bar", name: "ガールズバー" },
  { slug: "concafe", name: "コンカフェ" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-pink-100 bg-pink-50/50 mt-16">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-bold text-pink-700">職種から探す</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/jobs/${c.slug}`} className="hover:text-pink-600">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold text-pink-700">エリアから探す</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              {PREFECTURES.map((p) => (
                <li key={p.slug}>
                  <Link href={`/jobs/chatlady/${p.slug}`} className="hover:text-pink-600">
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold text-pink-700">コンテンツ</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/guides" className="hover:text-pink-600">ガイド記事</Link></li>
              <li><Link href="/shindan/mbti" className="hover:text-pink-600">MBTI診断</Link></li>
              <li><Link href="/line" className="hover:text-pink-600">LINE相談</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold text-pink-700">高収入ナビについて</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/jobs" className="hover:text-pink-600">求人一覧</Link></li>
              <li><Link href="/line" className="hover:text-pink-600">お問い合わせ</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-pink-100 pt-6 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} 高収入ナビ All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
