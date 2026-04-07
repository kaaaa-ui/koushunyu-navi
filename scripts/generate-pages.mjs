#!/usr/bin/env node
/**
 * 新規都道府県のジョブページMDファイルを一括生成するスクリプト
 * 既存15都道府県以外の32都道府県 × 20カテゴリ = 640ファイル生成
 */
import fs from "fs";
import path from "path";

const JOBS_DIR = path.join(process.cwd(), "src/content/jobs");

const EXISTING_PREFECTURES = [
  "hokkaido", "miyagi", "ibaraki", "saitama", "chiba", "tokyo", "kanagawa",
  "niigata", "shizuoka", "aichi", "kyoto", "osaka", "hyogo", "hiroshima", "fukuoka",
];

const ALL_PREFECTURES = {
  hokkaido: "北海道", aomori: "青森県", iwate: "岩手県", miyagi: "宮城県",
  akita: "秋田県", yamagata: "山形県", fukushima: "福島県", ibaraki: "茨城県",
  tochigi: "栃木県", gunma: "群馬県", saitama: "埼玉県", chiba: "千葉県",
  tokyo: "東京都", kanagawa: "神奈川県", niigata: "新潟県", toyama: "富山県",
  ishikawa: "石川県", fukui: "福井県", yamanashi: "山梨県", nagano: "長野県",
  gifu: "岐阜県", shizuoka: "静岡県", aichi: "愛知県", mie: "三重県",
  shiga: "滋賀県", kyoto: "京都府", osaka: "大阪府", hyogo: "兵庫県",
  nara: "奈良県", wakayama: "和歌山県", tottori: "鳥取県", shimane: "島根県",
  okayama: "岡山県", hiroshima: "広島県", yamaguchi: "山口県", tokushima: "徳島県",
  kagawa: "香川県", ehime: "愛媛県", kochi: "高知県", fukuoka: "福岡県",
  saga: "佐賀県", nagasaki: "長崎県", kumamoto: "熊本県", oita: "大分県",
  miyazaki: "宮崎県", kagoshima: "鹿児島県", okinawa: "沖縄県",
};

const CATEGORIES = {
  "cabaret-club": "キャバクラ", chatlady: "チャットレディ", concafe: "コンカフェ",
  "delivery-health": "デリヘル", "fuzoku-esthe": "風俗エステ", gallardo: "ガールズバー",
  "girls-bar": "ガールズバー", health: "ヘルス", "hitozuma-delivery": "人妻デリヘル",
  "hotel-health": "ホテヘル", "hoteto-l": "ホテル型ヘルス", "image-club": "イメクラ",
  lounge: "ラウンジ", "m-kankan": "M性感", "mens-esthe": "メンズエステ",
  "ona-club": "オナクラ", "pink-salon": "ピンサロ", "seki-kyaba": "セクキャバ",
  "sm-club": "SMクラブ", soapland: "ソープランド",
};

const HOURLY = {
  chatlady: 4200, "cabaret-club": 4000, "mens-esthe": 3500, "girls-bar": 2500,
  concafe: 2000, lounge: 5000, "delivery-health": 15000, health: 12000,
  "fuzoku-esthe": 10000, "hitozuma-delivery": 14000, "hotel-health": 12000,
  "hoteto-l": 11000, "image-club": 10000, "m-kankan": 12000, "ona-club": 8000,
  "pink-salon": 6000, "seki-kyaba": 4500, "sm-club": 13000, soapland: 20000,
  gallardo: 2500,
};

const PREF_DATA = {
  hokkaido: { pop: "520万人", st: "札幌・すすきの・旭川", trait: "北海道最大の繁華街すすきのを中心に求人多数" },
  aomori: { pop: "120万人", st: "青森・八戸・弘前", trait: "東北エリアの穴場、競争が少なく始めやすい" },
  iwate: { pop: "120万人", st: "盛岡・一関・花巻", trait: "盛岡を中心とした地方都市型の求人エリア" },
  miyagi: { pop: "230万人", st: "仙台・名取・石巻", trait: "東北最大の仙台を中心に豊富な求人" },
  akita: { pop: "95万人", st: "秋田・横手・大仙", trait: "在宅ワーク中心で地方からも始めやすい" },
  yamagata: { pop: "105万人", st: "山形・米沢・鶴岡", trait: "地方ならではの落ち着いた環境で働ける" },
  fukushima: { pop: "180万人", st: "郡山・いわき・福島", trait: "郡山・いわきを中心に在宅求人も充実" },
  ibaraki: { pop: "285万人", st: "水戸・つくば・土浦", trait: "つくば・水戸エリアに求人が集中" },
  tochigi: { pop: "190万人", st: "宇都宮・小山・足利", trait: "宇都宮を中心に都内通勤圏の求人も" },
  gunma: { pop: "190万人", st: "前橋・高崎・太田", trait: "高崎・前橋エリアに求人が集中" },
  saitama: { pop: "735万人", st: "大宮・川越・所沢", trait: "都心アクセス抜群、大宮を中心に求人豊富" },
  chiba: { pop: "625万人", st: "千葉・船橋・柏", trait: "都心近くでありながら家賃も抑えめ" },
  tokyo: { pop: "1390万人", st: "新宿・渋谷・六本木・池袋・銀座", trait: "全国最大級の求人数、夜職市場の中心地" },
  kanagawa: { pop: "920万人", st: "横浜・川崎・相模原", trait: "横浜を中心にハイクラス求人も多い" },
  niigata: { pop: "220万人", st: "新潟・長岡・上越", trait: "日本海側最大の都市、在宅求人も充実" },
  toyama: { pop: "103万人", st: "富山・高岡・射水", trait: "北陸エリアの穴場。在宅中心で始めやすい" },
  ishikawa: { pop: "112万人", st: "金沢・小松・白山", trait: "金沢を中心に観光客向け需要も" },
  fukui: { pop: "76万人", st: "福井・敦賀・鯖江", trait: "在宅ワークなら全国どこからでも応募可能" },
  yamanashi: { pop: "80万人", st: "甲府・富士吉田・南アルプス", trait: "都心近く在宅で都内水準の時給も" },
  nagano: { pop: "203万人", st: "長野・松本・上田", trait: "自然豊かな環境で在宅ワークに最適" },
  gifu: { pop: "197万人", st: "岐阜・大垣・各務原", trait: "名古屋圏に近く通勤・在宅どちらもOK" },
  shizuoka: { pop: "360万人", st: "浜松・静岡・沼津", trait: "東西に長いエリア、浜松・静岡に求人集中" },
  aichi: { pop: "750万人", st: "名古屋・栄・豊田", trait: "名古屋・栄エリアに高時給求人が集中" },
  mie: { pop: "175万人", st: "津・四日市・鈴鹿", trait: "名古屋圏のベッドタウン、在宅求人も" },
  shiga: { pop: "141万人", st: "大津・草津・彦根", trait: "京都・大阪へのアクセスもよく働きやすい" },
  kyoto: { pop: "258万人", st: "河原町・祇園・京都駅", trait: "観光都市ならではの独自の求人市場" },
  osaka: { pop: "880万人", st: "梅田・難波・心斎橋・天王寺", trait: "西日本最大の繁華街、求人数・時給ともにトップクラス" },
  hyogo: { pop: "546万人", st: "三宮・元町・姫路", trait: "神戸を中心にハイセンスな求人が多い" },
  nara: { pop: "132万人", st: "奈良・生駒・橿原", trait: "大阪圏のベッドタウン、在宅求人中心" },
  wakayama: { pop: "92万人", st: "和歌山・田辺・橋本", trait: "在宅ワークなら都市部と同じ条件で働ける" },
  tottori: { pop: "55万人", st: "鳥取・米子・倉吉", trait: "人口は少ないが在宅なら関係なし" },
  shimane: { pop: "66万人", st: "松江・出雲・浜田", trait: "在宅ワーク中心で全国水準の時給を狙える" },
  okayama: { pop: "188万人", st: "岡山・倉敷・津山", trait: "中国地方の交通拠点、求人も安定" },
  hiroshima: { pop: "279万人", st: "広島・福山・呉", trait: "中国地方最大の都市、繁華街の流川に求人集中" },
  yamaguchi: { pop: "133万人", st: "下関・山口・周南", trait: "下関を中心に九州圏の影響も受ける" },
  tokushima: { pop: "72万人", st: "徳島・鳴門・阿南", trait: "四国エリア、在宅で全国レベルの求人に応募可能" },
  kagawa: { pop: "95万人", st: "高松・丸亀・坂出", trait: "四国の玄関口、高松中心に求人あり" },
  ehime: { pop: "133万人", st: "松山・今治・新居浜", trait: "四国最大の松山を中心に求人が集まる" },
  kochi: { pop: "69万人", st: "高知・南国・四万十", trait: "在宅ワークなら都市部と変わらない条件で" },
  fukuoka: { pop: "510万人", st: "博多・天神・中洲・小倉", trait: "九州最大の繁華街、高時給求人が豊富" },
  saga: { pop: "81万人", st: "佐賀・鳥栖・唐津", trait: "福岡圏に近く在宅・通勤どちらも可能" },
  nagasaki: { pop: "130万人", st: "長崎・佐世保・諫早", trait: "長崎・佐世保を中心に地方都市型求人" },
  kumamoto: { pop: "173万人", st: "熊本・八代・天草", trait: "九州第3の都市、繁華街の下通に求人集中" },
  oita: { pop: "112万人", st: "大分・別府・中津", trait: "温泉都市別府を含む独自の求人市場" },
  miyazaki: { pop: "107万人", st: "宮崎・都城・延岡", trait: "在宅ワーク中心で全国水準の報酬を狙える" },
  kagoshima: { pop: "159万人", st: "鹿児島・霧島・薩摩川内", trait: "九州南部の拠点都市、天文館に求人集中" },
  okinawa: { pop: "146万人", st: "那覇・北谷・沖縄市", trait: "リゾートエリアならではの独自求人も" },
};

function generateContent(cat, catLabel, pref, prefLabel) {
  const d = PREF_DATA[pref];
  const h = HOURLY[cat] || 3000;
  const monthly = Math.round(h * 4 * 20);

  const isChatlady = cat === "chatlady";
  const workStyle = isChatlady
    ? "在宅・顔出しなし選択可・シフト自由"
    : "シフト制・週1日〜OK";
  const beginnerStars = isChatlady ? "★★★★★" : "★★★★☆";
  const charm = isChatlady
    ? "通勤ゼロ、機材3万円以内、顔出しなしOK、主婦・OLの副業に最適"
    : "未経験OK、研修充実、高時給、働きやすい環境";

  return `# ${prefLabel}の${catLabel}求人｜未経験OK・時給${h.toLocaleString()}円〜【2026年最新】

こんにちは、ナビちゃんだよ💓
${prefLabel}で${catLabel}の求人を探してるんだね。
${prefLabel}は人口${d.pop}、${d.trait}。ナビちゃんが${prefLabel}のお仕事事情を一緒に見ていくね💡
このページでは${prefLabel}エリアの${catLabel}求人の特徴と、安全に働ける店舗選びのコツを紹介するよ✨

---

## ${prefLabel}の${catLabel}求人の特徴

${prefLabel}は${d.trait}。
${isChatlady ? "在宅チャットレディとして働くのに十分な条件が揃っているよ。自宅がそのまま職場になるから通勤しなくてもOK" : `${catLabel}のお店は主要駅周辺に集中しているから通いやすい`}。

**${prefLabel}のエリア概要**
- 人口: 約${d.pop}
- 主要駅・エリア: ${d.st}
- エリア特性: ${d.trait}

**${catLabel}の基本情報**
- 働き方: ${workStyle}
- 初心者向け度: ${beginnerStars}
- 魅力: ${charm}
- 注意点: 最初は慣れるまで時間がかかることも。焦らず自分のペースで大丈夫だよ

| 項目 | データ |
|---|---|
| 平均時給 | ${h.toLocaleString()}円 |
| 平均月収（4h×20日）| ${monthly.toLocaleString()}円 |
| 未経験OK率 | 85%+ |
| ${isChatlady ? "在宅対応" : "体験入店"} | ◯ |

---

## ${prefLabel}で人気のエリア

${prefLabel}の${catLabel}求人は、以下の主要エリアに集中しているよ💡

${d.st.split("・").map((s, i) => `### ${i + 1}. ${s}
${s}は${prefLabel}の中でも${catLabel}求人が見つかりやすいエリア。アクセスも良くて通いやすいよ。
`).join("\n")}

---

## ${prefLabel}の${catLabel}で働くメリット

1. **未経験でも始めやすい** - 研修やサポート体制が整ったお店が多いから安心
2. **高時給で効率よく稼げる** - 時給${h.toLocaleString()}円〜だから短時間でもしっかり収入になる
3. **自分のペースで働ける** - シフトの融通が利くお店が多いから、本業や学業との両立も可能

---

## お店選びのチェックポイント

ナビちゃんのおすすめチェックリストだよ✅

- [ ] 体験入店はできる？
- [ ] 研修やサポート体制は？
- [ ] 給与の支払いサイクルは？（日払い/週払い/月払い）
- [ ] ペナルティやノルマはない？
- [ ] 口コミや評判はどう？
- [ ] 面接時の雰囲気は良かった？

---

## よくある質問

### ${prefLabel}の${catLabel}は未経験でも大丈夫？
はい、${prefLabel}の${catLabel}求人の多くは未経験OKです。研修やサポート体制が整った店舗を選ぶのがおすすめだよ。

### ${prefLabel}の${catLabel}の時給相場は？
${prefLabel}の${catLabel}の時給は平均${h.toLocaleString()}円前後。エリアや店舗により異なるけど、未経験でもこの水準でスタートできるところが多いよ。

### 身バレが心配...
${isChatlady ? "顔出しなし・音声のみ・チャットのみなど、身バレを防ぐ方法はたくさんあるよ。" : "源氏名の使用やプライバシー保護に力を入れているお店を選ぼう。"}詳しくは[身バレ対策マニュアル](/guides/mibare-manual)を見てね。

---

## まとめ

${prefLabel}には${catLabel}の求人がたくさんあるよ。
未経験からでも始められるお店が多いから、まずは気軽に情報収集から始めてみてね。
迷ったらナビちゃんにLINEで相談してね💓
`;
}

// 実行
let created = 0;
const NEW_PREFECTURES = Object.keys(ALL_PREFECTURES).filter(p => !EXISTING_PREFECTURES.includes(p));

for (const cat of Object.keys(CATEGORIES)) {
  for (const pref of NEW_PREFECTURES) {
    const filename = `${cat}--${pref}.md`;
    const filepath = path.join(JOBS_DIR, filename);
    if (fs.existsSync(filepath)) continue;

    const content = generateContent(cat, CATEGORIES[cat], pref, ALL_PREFECTURES[pref]);
    fs.writeFileSync(filepath, content, "utf-8");
    created++;
  }
}

console.log(`✅ ${created} new job pages created (${NEW_PREFECTURES.length} prefectures × ${Object.keys(CATEGORIES).length} categories)`);
console.log(`Total files in jobs dir: ${fs.readdirSync(JOBS_DIR).filter(f => f.endsWith('.md')).length}`);
