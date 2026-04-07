import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type JobPage = {
  category: string;
  prefecture: string;
  title: string;
  description: string;
  content: string;
};

export type ConditionPage = {
  category: string;
  prefecture: string;
  condition: string;
  title: string;
  description: string;
  content: string;
};

const JOBS_DIR = path.join(process.cwd(), "src/content/jobs");

export const CATEGORY_LABELS: Record<string, string> = {
  "cabaret-club": "キャバクラ",
  chatlady: "チャットレディ",
  concafe: "コンカフェ",
  "delivery-health": "デリヘル",
  "fuzoku-esthe": "風俗エステ",
  gallardo: "ガールズバー",
  "girls-bar": "ガールズバー",
  health: "ヘルス",
  "hitozuma-delivery": "人妻デリヘル",
  "hotel-health": "ホテヘル",
  "hoteto-l": "ホテル型ヘルス",
  "image-club": "イメクラ",
  lounge: "ラウンジ",
  "m-kankan": "M性感",
  "mens-esthe": "メンズエステ",
  "ona-club": "オナクラ",
  "pink-salon": "ピンサロ",
  "seki-kyaba": "セクキャバ",
  "sm-club": "SMクラブ",
  soapland: "ソープランド",
};

export const PREFECTURE_LABELS: Record<string, string> = {
  hokkaido: "北海道",
  aomori: "青森県",
  iwate: "岩手県",
  miyagi: "宮城県",
  akita: "秋田県",
  yamagata: "山形県",
  fukushima: "福島県",
  ibaraki: "茨城県",
  tochigi: "栃木県",
  gunma: "群馬県",
  saitama: "埼玉県",
  chiba: "千葉県",
  tokyo: "東京都",
  kanagawa: "神奈川県",
  niigata: "新潟県",
  toyama: "富山県",
  ishikawa: "石川県",
  fukui: "福井県",
  yamanashi: "山梨県",
  nagano: "長野県",
  gifu: "岐阜県",
  shizuoka: "静岡県",
  aichi: "愛知県",
  mie: "三重県",
  shiga: "滋賀県",
  kyoto: "京都府",
  osaka: "大阪府",
  hyogo: "兵庫県",
  nara: "奈良県",
  wakayama: "和歌山県",
  tottori: "鳥取県",
  shimane: "島根県",
  okayama: "岡山県",
  hiroshima: "広島県",
  yamaguchi: "山口県",
  tokushima: "徳島県",
  kagawa: "香川県",
  ehime: "愛媛県",
  kochi: "高知県",
  fukuoka: "福岡県",
  saga: "佐賀県",
  nagasaki: "長崎県",
  kumamoto: "熊本県",
  oita: "大分県",
  miyazaki: "宮崎県",
  kagoshima: "鹿児島県",
  okinawa: "沖縄県",
};

export const CONDITION_LABELS: Record<string, string> = {
  zaitaku: "在宅OK",
  miken: "未経験OK",
  hibarai: "日払い",
  "kaodashi-nashi": "顔出しなし",
  shumatsu: "週末のみOK",
  ryo: "寮あり",
  takujisho: "託児所あり",
  tanki: "短期OK",
  kokyuyo: "高時給",
  taiin: "体入OK",
};

// 条件ごとの補足説明
export const CONDITION_DETAILS: Record<string, { desc: string; merit: string; point: string }> = {
  zaitaku: {
    desc: "自宅からお仕事できるから、通勤時間ゼロ。家事や育児と両立しやすいよ",
    merit: "通勤不要・交通費ゼロ・スキマ時間活用・自分のペースで働ける",
    point: "ネット環境と静かな部屋があればOK。Webカメラ・照明は3万円以内で揃うよ",
  },
  miken: {
    desc: "研修・マニュアル完備のお店が多いから、初めてでも安心して始められるよ",
    merit: "研修あり・先輩サポート・ノルマなし・段階的にステップアップ",
    point: "未経験OKの店舗は研修制度の充実度をチェック。体験入店で雰囲気を確認しよう",
  },
  hibarai: {
    desc: "働いたその日にお給料がもらえるから、急な出費にも対応できるよ",
    merit: "即日払い・翌日振込・手渡し対応・金欠時の強い味方",
    point: "日払いの上限額や手数料は店舗ごとに違うから、事前に確認しておこう",
  },
  "kaodashi-nashi": {
    desc: "顔を出さなくても働けるお仕事だから、身バレが心配な人にもぴったり",
    merit: "プライバシー保護・身バレ防止・マスクOK・写真加工OK",
    point: "音声のみ・チャットのみなど、自分に合ったスタイルを選べるよ",
  },
  shumatsu: {
    desc: "土日祝だけの勤務でOKだから、平日は本業や学業に集中できるよ",
    merit: "Wワーク向き・学生OK・本業と両立・週1〜OK",
    point: "週末は需要が高くて稼ぎやすい時間帯。効率よく稼げるチャンスだよ",
  },
  ryo: {
    desc: "寮完備だから、地方から都市部で働きたい人も安心。家賃負担を抑えられるよ",
    merit: "即入居OK・家具家電付き・家賃補助・引っ越し費用サポート",
    point: "寮のタイプ（個室/シェア）や費用は店舗によって違うから確認しよう",
  },
  takujisho: {
    desc: "託児所完備・提携保育所ありのお店なら、お子さんがいても安心して働けるよ",
    merit: "保育費補助・送迎サポート・急な休みOK・ママ歓迎",
    point: "託児所の利用時間や対象年齢は店舗で異なるから、面接時に確認してね",
  },
  tanki: {
    desc: "1日〜短期間だけ働けるから、お試し感覚や集中的に稼ぎたい時にぴったり",
    merit: "1日だけOK・期間限定・お試し可能・長期契約なし",
    point: "短期でも高時給の求人が多いから、効率よく稼ぎたい人におすすめ",
  },
  kokyuyo: {
    desc: "時給4,000円以上の高時給求人を厳選。効率よくしっかり稼ぎたい人向け",
    merit: "時給4,000円〜・日給3万円以上可・各種手当充実・インセンティブあり",
    point: "高時給の求人は人気が高いから、気になったら早めに応募しよう",
  },
  taiin: {
    desc: "まずは体験入店で雰囲気を確認できるから、本入店前に安心して判断できるよ",
    merit: "日給保証あり・交通費支給・即日体験OK・合わなければ辞退OK",
    point: "体験入店の日給相場は1〜3万円。服装や持ち物は事前に確認しておこう",
  },
};

// 主要15都道府県（条件ページ生成対象）
export const TOP_PREFECTURES = [
  "hokkaido", "miyagi", "ibaraki", "saitama", "chiba", "tokyo", "kanagawa",
  "niigata", "shizuoka", "aichi", "kyoto", "osaka", "hyogo", "hiroshima", "fukuoka",
];

// 都道府県の人口・主要駅データ
export const PREFECTURE_DATA: Record<string, { population: string; stations: string; trait: string }> = {
  hokkaido: { population: "約520万人", stations: "札幌・すすきの・旭川", trait: "北海道最大の繁華街すすきのを中心に求人多数" },
  aomori: { population: "約120万人", stations: "青森・八戸・弘前", trait: "東北エリアの穴場。競争が少なく始めやすい" },
  iwate: { population: "約120万人", stations: "盛岡・一関・花巻", trait: "盛岡を中心とした地方都市型の求人エリア" },
  miyagi: { population: "約230万人", stations: "仙台・名取・石巻", trait: "東北最大の仙台を中心に豊富な求人" },
  akita: { population: "約95万人", stations: "秋田・横手・大仙", trait: "在宅ワーク中心で地方からも始めやすい" },
  yamagata: { population: "約105万人", stations: "山形・米沢・鶴岡", trait: "地方ならではの落ち着いた環境で働ける" },
  fukushima: { population: "約180万人", stations: "郡山・いわき・福島", trait: "郡山・いわきを中心に在宅求人も充実" },
  ibaraki: { population: "約285万人", stations: "水戸・つくば・土浦", trait: "つくば・水戸エリアに求人が集中" },
  tochigi: { population: "約190万人", stations: "宇都宮・小山・足利", trait: "宇都宮を中心に都内通勤圏の求人も" },
  gunma: { population: "約190万人", stations: "前橋・高崎・太田", trait: "高崎・前橋エリアに求人が集中" },
  saitama: { population: "約735万人", stations: "大宮・川越・所沢", trait: "都心アクセス抜群、大宮を中心に求人豊富" },
  chiba: { population: "約625万人", stations: "千葉・船橋・柏", trait: "都心近くでありながら家賃も抑えめ" },
  tokyo: { population: "約1390万人", stations: "新宿・渋谷・六本木・池袋・銀座", trait: "全国最大級の求人数、夜職市場の中心地" },
  kanagawa: { population: "約920万人", stations: "横浜・川崎・相模原", trait: "横浜を中心にハイクラス求人も多い" },
  niigata: { population: "約220万人", stations: "新潟・長岡・上越", trait: "日本海側最大の都市、在宅求人も充実" },
  toyama: { population: "約103万人", stations: "富山・高岡・射水", trait: "北陸エリアの穴場。在宅中心で始めやすい" },
  ishikawa: { population: "約112万人", stations: "金沢・小松・白山", trait: "金沢を中心に観光客向け需要も" },
  fukui: { population: "約76万人", stations: "福井・敦賀・鯖江", trait: "在宅ワークなら全国どこからでも応募可能" },
  yamanashi: { population: "約80万人", stations: "甲府・富士吉田・南アルプス", trait: "都心近く在宅で都内水準の時給も" },
  nagano: { population: "約203万人", stations: "長野・松本・上田", trait: "自然豊かな環境で在宅ワークに最適" },
  gifu: { population: "約197万人", stations: "岐阜・大垣・各務原", trait: "名古屋圏に近く通勤・在宅どちらもOK" },
  shizuoka: { population: "約360万人", stations: "浜松・静岡・沼津", trait: "東西に長いエリア、浜松・静岡に求人集中" },
  aichi: { population: "約750万人", stations: "名古屋・栄・豊田", trait: "名古屋・栄エリアに高時給求人が集中" },
  mie: { population: "約175万人", stations: "津・四日市・鈴鹿", trait: "名古屋圏のベッドタウン、在宅求人も" },
  shiga: { population: "約141万人", stations: "大津・草津・彦根", trait: "京都・大阪へのアクセスもよく働きやすい" },
  kyoto: { population: "約258万人", stations: "河原町・祇園・京都駅", trait: "観光都市ならではの独自の求人市場" },
  osaka: { population: "約880万人", stations: "梅田・難波・心斎橋・天王寺", trait: "西日本最大の繁華街、求人数・時給ともにトップクラス" },
  hyogo: { population: "約546万人", stations: "三宮・元町・姫路", trait: "神戸を中心にハイセンスな求人が多い" },
  nara: { population: "約132万人", stations: "奈良・生駒・橿原", trait: "大阪圏のベッドタウン、在宅求人中心" },
  wakayama: { population: "約92万人", stations: "和歌山・田辺・橋本", trait: "在宅ワークなら都市部と同じ条件で働ける" },
  tottori: { population: "約55万人", stations: "鳥取・米子・倉吉", trait: "人口は少ないが在宅なら関係なし" },
  shimane: { population: "約66万人", stations: "松江・出雲・浜田", trait: "在宅ワーク中心で全国水準の時給を狙える" },
  okayama: { population: "約188万人", stations: "岡山・倉敷・津山", trait: "中国地方の交通拠点、求人も安定" },
  hiroshima: { population: "約279万人", stations: "広島・福山・呉", trait: "中国地方最大の都市、繁華街の流川に求人集中" },
  yamaguchi: { population: "約133万人", stations: "下関・山口・周南", trait: "下関を中心に九州圏の影響も受ける" },
  tokushima: { population: "約72万人", stations: "徳島・鳴門・阿南", trait: "四国エリア、在宅で全国レベルの求人に応募可能" },
  kagawa: { population: "約95万人", stations: "高松・丸亀・坂出", trait: "四国の玄関口、高松中心に求人あり" },
  ehime: { population: "約133万人", stations: "松山・今治・新居浜", trait: "四国最大の松山を中心に求人が集まる" },
  kochi: { population: "約69万人", stations: "高知・南国・四万十", trait: "在宅ワークなら都市部と変わらない条件で" },
  fukuoka: { population: "約510万人", stations: "博多・天神・中洲・小倉", trait: "九州最大の繁華街、高時給求人が豊富" },
  saga: { population: "約81万人", stations: "佐賀・鳥栖・唐津", trait: "福岡圏に近く在宅・通勤どちらも可能" },
  nagasaki: { population: "約130万人", stations: "長崎・佐世保・諫早", trait: "長崎・佐世保を中心に地方都市型求人" },
  kumamoto: { population: "約173万人", stations: "熊本・八代・天草", trait: "九州第3の都市、繁華街の下通に求人集中" },
  oita: { population: "約112万人", stations: "大分・別府・中津", trait: "温泉都市別府を含む独自の求人市場" },
  miyazaki: { population: "約107万人", stations: "宮崎・都城・延岡", trait: "在宅ワーク中心で全国水準の報酬を狙える" },
  kagoshima: { population: "約159万人", stations: "鹿児島・霧島・薩摩川内", trait: "九州南部の拠点都市、天文館に求人集中" },
  okinawa: { population: "約146万人", stations: "那覇・北谷・沖縄市", trait: "リゾートエリアならではの独自求人も" },
};

// カテゴリごとの平均時給データ
export const CATEGORY_HOURLY: Record<string, number> = {
  chatlady: 4200, "cabaret-club": 4000, "mens-esthe": 3500, "girls-bar": 2500,
  concafe: 2000, lounge: 5000, "delivery-health": 15000, health: 12000,
  "fuzoku-esthe": 10000, "hitozuma-delivery": 14000, "hotel-health": 12000,
  "hoteto-l": 11000, "image-club": 10000, "m-kankan": 12000, "ona-club": 8000,
  "pink-salon": 6000, "seki-kyaba": 4500, "sm-club": 13000, soapland: 20000,
  gallardo: 2500,
};

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category;
}

export function getPrefectureLabel(prefecture: string): string {
  return PREFECTURE_LABELS[prefecture] || prefecture;
}

export function getConditionLabel(condition: string): string {
  return CONDITION_LABELS[condition] || condition;
}

export function getAllJobPages(): JobPage[] {
  const files = fs.readdirSync(JOBS_DIR).filter((f) => f.endsWith(".md"));
  return files.map((file) => {
    const [category, prefWithExt] = file.split("--");
    const prefecture = prefWithExt.replace(".md", "");
    const raw = fs.readFileSync(path.join(JOBS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const titleLine = content.split("\n").find((l) => l.startsWith("# "));
    const title =
      (data.title as string) ||
      titleLine?.replace("# ", "") ||
      `${getPrefectureLabel(prefecture)}の${getCategoryLabel(category)}求人`;
    return {
      category,
      prefecture,
      title,
      description:
        (data.description as string) ||
        `${getPrefectureLabel(prefecture)}の${getCategoryLabel(category)}求人情報。未経験OK・高時給のお仕事をナビちゃんが紹介`,
      content,
    };
  });
}

export function getJobPage(category: string, prefecture: string): JobPage | undefined {
  return getAllJobPages().find(
    (j) => j.category === category && j.prefecture === prefecture
  );
}

export function getCategories(): string[] {
  const pages = getAllJobPages();
  return [...new Set(pages.map((p) => p.category))].sort();
}

export function getPrefecturesByCategory(category: string): string[] {
  const pages = getAllJobPages();
  return pages.filter((p) => p.category === category).map((p) => p.prefecture).sort();
}

export function getAllCategoryLabels(): Record<string, string> {
  return CATEGORY_LABELS;
}

export function getAllPrefectureLabels(): Record<string, string> {
  return PREFECTURE_LABELS;
}

export function getAllConditionLabels(): Record<string, string> {
  return CONDITION_LABELS;
}

// 条件ページのコンテンツを動的生成
export function generateConditionContent(
  category: string,
  prefecture: string,
  condition: string,
): ConditionPage | undefined {
  const catLabel = getCategoryLabel(category);
  const prefLabel = getPrefectureLabel(prefecture);
  const condLabel = getConditionLabel(condition);
  const condDetail = CONDITION_DETAILS[condition];
  const prefData = PREFECTURE_DATA[prefecture];
  const hourly = CATEGORY_HOURLY[category] || 3000;

  if (!catLabel || !prefLabel || !condLabel || !condDetail || !prefData) return undefined;

  const title = `${prefLabel}の${catLabel}求人【${condLabel}】｜2026年最新`;
  const description = `${prefLabel}で${condLabel}の${catLabel}求人を探すならナビちゃんにおまかせ。${condDetail.desc}`;

  const content = `# ${prefLabel}の${catLabel}求人【${condLabel}】

こんにちは、ナビちゃんだよ💓
${prefLabel}で「${condLabel}」の${catLabel}求人を探してるんだね。
${condDetail.desc}。ナビちゃんが詳しく紹介するね💡

---

## ${prefLabel}×${condLabel}の${catLabel}求人の特徴

${prefLabel}は${prefData.trait}。
「${condLabel}」の条件で絞ると、あなたにぴったりの求人が見つかりやすいよ✨

**${condLabel}のメリット**
${condDetail.merit.split("・").map(m => `- ${m}`).join("\n")}

**選ぶときのポイント**
${condDetail.point}

---

## ${prefLabel}の${catLabel}【${condLabel}】基本データ

| 項目 | データ |
|---|---|
| 平均時給 | ${hourly.toLocaleString()}円 |
| ${condLabel}対応率 | 70%以上 |
| 主要エリア | ${prefData.stations} |
| 人口 | ${prefData.population} |

---

## ${condLabel}の${catLabel}求人を選ぶコツ

### 1. 条件の詳細を必ず確認しよう
「${condLabel}」と書いてあっても、細かい条件は店舗ごとに異なるよ。面接や問い合わせで具体的に確認しておこう。

### 2. 口コミ・評判をチェック
実際に働いた人の声は参考になるよ。SNSや口コミサイトで「${prefLabel} ${catLabel} ${condLabel}」で検索してみてね。

### 3. 複数の店舗を比較しよう
1つの店舗だけで決めないで、最低3つは比較するのがおすすめ。条件・雰囲気・スタッフの対応を見比べよう。

---

## まとめ

${prefLabel}で${condLabel}の${catLabel}求人は選択肢が豊富だよ。
焦らず自分に合ったお店を見つけてね。迷ったらナビちゃんにLINEで相談してね💓
`;

  return { category, prefecture, condition, title, description, content };
}

// 全条件ページの組み合わせを生成（静的パス用）
export function getAllConditionPages(): { category: string; prefecture: string; condition: string }[] {
  const results: { category: string; prefecture: string; condition: string }[] = [];
  const categories = Object.keys(CATEGORY_LABELS);
  const conditions = Object.keys(CONDITION_LABELS);

  for (const category of categories) {
    for (const prefecture of TOP_PREFECTURES) {
      for (const condition of conditions) {
        results.push({ category, prefecture, condition });
      }
    }
  }
  return results;
}
