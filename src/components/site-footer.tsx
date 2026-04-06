import Link from "next/link";

const PREFECTURES = [
  "北海道", "東京都", "神奈川県", "千葉県", "埼玉県",
  "愛知県", "大阪府", "京都府", "兵庫県", "福岡県",
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
              {PREFECTURES.slice(0, 5).map((p) => (
                <li key={p}>
                  <Link href={`/area/${p}`} className="hover:text-pink-600">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold text-pink-700">コンテンツ</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/guides" className="hover:text-pink-600">ガイド記事</Link></li>
              <li><Link href="/column" className="hover:text-pink-600">コラム</Link></li>
              <li><Link href="/interview" className="hover:text-pink-600">先輩インタビュー</Link></li>
              <li><Link href="/shindan/mbti" className="hover:text-pink-600">MBTI診断</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold text-pink-700">運営情報</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-pink-600">サイトについて</Link></li>
              <li><Link href="/privacy" className="hover:text-pink-600">プライバシーポリシー</Link></li>
              <li><Link href="/terms" className="hover:text-pink-600">利用規約</Link></li>
              <li><Link href="/contact" className="hover:text-pink-600">お問い合わせ</Link></li>
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
