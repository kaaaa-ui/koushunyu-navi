// 4軸: E/I, S/N, T/F, J/P
// 各質問は軸に対するスコアを持つ（正の値=前者、負の値=後者）

export type Axis = "EI" | "SN" | "TF" | "JP";

export interface Choice {
  text: string;
  scores: Partial<Record<Axis, number>>;
}

export interface Question {
  id: number;
  question: string;
  emoji: string;
  choices: Choice[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "休みの日、理想の過ごし方は？",
    emoji: "🏖️",
    choices: [
      { text: "友達とワイワイ遊ぶ！", scores: { EI: 2 } },
      { text: "おうちでまったり過ごす", scores: { EI: -2 } },
    ],
  },
  {
    id: 2,
    question: "副業で一番大事なのは？",
    emoji: "💰",
    choices: [
      { text: "とにかく稼げること！", scores: { SN: 2 } },
      { text: "自分の時間を大切にしたい", scores: { SN: -2 } },
    ],
  },
  {
    id: 3,
    question: "初めての場所に行くとき…",
    emoji: "🗺️",
    choices: [
      { text: "知らない人とも話せちゃう", scores: { EI: 2 } },
      { text: "ちょっと緊張する…", scores: { EI: -2 } },
    ],
  },
  {
    id: 4,
    question: "気になる副業を見つけたら？",
    emoji: "🚀",
    choices: [
      { text: "即行動！まずやってみる", scores: { TF: 2 } },
      { text: "じっくり調べてから決める", scores: { TF: -2 } },
    ],
  },
  {
    id: 5,
    question: "働くスタイル、どっちが好き？",
    emoji: "💻",
    choices: [
      { text: "ガッツリ集中して稼ぐ", scores: { SN: 2 } },
      { text: "マイペースにゆるく働く", scores: { SN: -2 } },
    ],
  },
  {
    id: 6,
    question: "褒められて嬉しいのは？",
    emoji: "✨",
    choices: [
      { text: "「頼りになる！」", scores: { TF: 2 } },
      { text: "「一緒にいると安心する」", scores: { TF: -2 } },
    ],
  },
  {
    id: 7,
    question: "人間関係で大事にしてるのは？",
    emoji: "💕",
    choices: [
      { text: "広く浅く、たくさんの人と", scores: { EI: 1 } },
      { text: "深く狭く、大切な人と", scores: { EI: -1 } },
    ],
  },
  {
    id: 8,
    question: "副業に使える時間は？",
    emoji: "⏰",
    choices: [
      { text: "週15時間以上いける！", scores: { JP: 2 } },
      { text: "週5時間くらいがいいな", scores: { JP: -2 } },
    ],
  },
  {
    id: 9,
    question: "お金の使い方は？",
    emoji: "👛",
    choices: [
      { text: "目標があると頑張れる！", scores: { JP: 2 } },
      { text: "今を楽しむのが大事", scores: { JP: -2 } },
    ],
  },
  {
    id: 10,
    question: "ぶっちゃけ、自分はどっち？",
    emoji: "🪞",
    choices: [
      { text: "やるからには1位を目指す", scores: { TF: 1, JP: 1 } },
      { text: "楽しくできればそれでOK", scores: { TF: -1, JP: -1 } },
    ],
  },
];

export interface MbtiType {
  code: string;
  name: string;
  emoji: string;
  description: string;
  job: string;
  salary: string;
  goodMatch: string[];
  badMatch: string[];
}

export const mbtiTypes: Record<string, MbtiType> = {
  ESTJ: {
    code: "ESTJ",
    name: "バリキャリ収入タイプ",
    emoji: "👑",
    description:
      "リーダーシップ抜群で、目標に向かって一直線！周りを巻き込みながら、しっかり稼ぐのが得意なあなた。管理力と行動力でどんな職場でもトップを狙えるタイプ。",
    job: "キャバクラ",
    salary: "50〜100万",
    goodMatch: ["ESFJ", "ENTJ"],
    badMatch: ["INFP", "ISFP"],
  },
  ESTP: {
    code: "ESTP",
    name: "ノリで稼ぐエンタメタイプ",
    emoji: "🎤",
    description:
      "ノリの良さとトーク力が最大の武器！場の空気を読んで盛り上げるのが天才的。お客さんを楽しませながら、自然と客単価アップできちゃう。",
    job: "ガールズバー",
    salary: "30〜60万",
    goodMatch: ["ESFP", "ENTP"],
    badMatch: ["INFJ", "INTJ"],
  },
  ESFJ: {
    code: "ESFJ",
    name: "気配り女王タイプ",
    emoji: "🌸",
    description:
      "気配り上手で同伴率No.1！お客さんの気持ちを先読みして、最高の接客ができるあなた。安定した関係を築けるから、リピーターも多い。",
    job: "ラウンジ",
    salary: "40〜80万",
    goodMatch: ["ESTJ", "ISFJ"],
    badMatch: ["INTP", "ISTP"],
  },
  ESFP: {
    code: "ESFP",
    name: "天性のアイドルタイプ",
    emoji: "🌟",
    description:
      "華やかさと明るさで場の主役になれるあなた！天性のエンターテイナーで、初対面のお客さんもすぐファンになっちゃう。楽しみながら稼げる才能の持ち主。",
    job: "キャバクラ",
    salary: "40〜80万",
    goodMatch: ["ESTP", "ENFP"],
    badMatch: ["INTJ", "ISTJ"],
  },
  ENTJ: {
    code: "ENTJ",
    name: "戦略家CEOタイプ",
    emoji: "📊",
    description:
      "戦略的に考えて、効率よく稼ぐのが得意！在宅でも自分でスケジュール管理して、着実に収入アップ。いずれは自分のビジネスを持ちたいタイプ。",
    job: "チャトレ（在宅）",
    salary: "30〜80万",
    goodMatch: ["ESTJ", "INTJ"],
    badMatch: ["ISFP", "INFP"],
  },
  ENTP: {
    code: "ENTP",
    name: "トーク無双タイプ",
    emoji: "💬",
    description:
      "どんな話題でも対応できるトーク力が武器！頭の回転が速くて、お客さんを飽きさせない。新しいことにもどんどんチャレンジできる。",
    job: "ガールズバー",
    salary: "30〜50万",
    goodMatch: ["ESTP", "INTP"],
    badMatch: ["ISFJ", "ISTJ"],
  },
  ENFJ: {
    code: "ENFJ",
    name: "カリスマ姉御タイプ",
    emoji: "💎",
    description:
      "人を惹きつけるカリスマ性の持ち主！後輩の面倒見もよく、チームの中心になれる。お客さんからの信頼も厚く、安定して高収入を得られる。",
    job: "ラウンジ",
    salary: "40〜80万",
    goodMatch: ["ESFJ", "INFJ"],
    badMatch: ["ISTP", "INTP"],
  },
  ENFP: {
    code: "ENFP",
    name: "好奇心爆発タイプ",
    emoji: "🦋",
    description:
      "好奇心旺盛で、新しいことが大好き！独自の世界観を持っていて、お客さんからも「面白い子」と人気。飽きっぽい面もあるけど、ハマると最強。",
    job: "コンカフェ",
    salary: "20〜50万",
    goodMatch: ["ESFP", "INFP"],
    badMatch: ["ISTJ", "ESTJ"],
  },
  ISTJ: {
    code: "ISTJ",
    name: "コツコツ堅実タイプ",
    emoji: "📋",
    description:
      "丁寧な仕事ぶりでリピート率No.1！コツコツと信頼を積み上げて、安定した収入を得るのが得意。真面目で誠実な性格がお客さんに好かれる。",
    job: "メンズエステ",
    salary: "30〜60万",
    goodMatch: ["ISFJ", "ESTJ"],
    badMatch: ["ENFP", "ENTP"],
  },
  ISTP: {
    code: "ISTP",
    name: "効率マスタータイプ",
    emoji: "⚡",
    description:
      "効率重視で短時間に集中して稼ぐのが得意！ムダを省いて、必要なことだけに集中できる。在宅ワークとの相性抜群で、自分のペースで働ける。",
    job: "チャトレ（在宅）",
    salary: "20〜50万",
    goodMatch: ["ISTJ", "ESTP"],
    badMatch: ["ENFJ", "ESFJ"],
  },
  ISFJ: {
    code: "ISFJ",
    name: "おもてなし職人タイプ",
    emoji: "🍵",
    description:
      "おもてなし力が最大の武器！お客さんの細かい変化にも気づけて、心のこもったサービスができる。リピーターがどんどん増えるタイプ。",
    job: "メンズエステ",
    salary: "30〜60万",
    goodMatch: ["ISTJ", "ESFJ"],
    badMatch: ["ENTP", "ESTP"],
  },
  ISFP: {
    code: "ISFP",
    name: "世界観アーティストタイプ",
    emoji: "🎨",
    description:
      "独自の世界観とセンスが光るあなた！見た目や空間にこだわって、お客さんを自分の世界に引き込む力がある。アーティスティックな接客が人気。",
    job: "コンカフェ",
    salary: "20〜40万",
    goodMatch: ["INFP", "ESFP"],
    badMatch: ["ENTJ", "ESTJ"],
  },
  INTJ: {
    code: "INTJ",
    name: "孤高の戦略家タイプ",
    emoji: "🧠",
    description:
      "分析力と戦略的思考で、最短ルートで稼ぐ方法を見つけるのが得意！在宅で黙々と、でも確実に収入を伸ばしていく。自分だけの勝ちパターンを作れる。",
    job: "チャトレ（在宅）",
    salary: "30〜80万",
    goodMatch: ["ENTJ", "INTP"],
    badMatch: ["ESFP", "ESTP"],
  },
  INTP: {
    code: "INTP",
    name: "分析オタクタイプ",
    emoji: "🔬",
    description:
      "データを分析して、最適解を見つけるのが大好き！お客さんの傾向を分析して、効率的にアプローチできる。ハマると誰よりも深く極められる。",
    job: "チャトレ（在宅）",
    salary: "20〜50万",
    goodMatch: ["INTJ", "ENTP"],
    badMatch: ["ESFJ", "ENFJ"],
  },
  INFJ: {
    code: "INFJ",
    name: "共感ヒーラータイプ",
    emoji: "🕊️",
    description:
      "深い共感力でお客さんの心を癒すのが得意！一人ひとりに寄り添った接客ができるから、「あなたに会いに来た」と言われることも。深い信頼関係が武器。",
    job: "メンズエステ",
    salary: "30〜60万",
    goodMatch: ["ENFJ", "INFP"],
    badMatch: ["ESTP", "ESFP"],
  },
  INFP: {
    code: "INFP",
    name: "マイペース癒し系タイプ",
    emoji: "🌙",
    description:
      "マイペースで穏やかな雰囲気が魅力！お客さんに安心感を与えて、自然とファンが増えるタイプ。自分のペースで無理なく働けるお仕事が向いている。",
    job: "チャトレ（在宅）",
    salary: "20〜40万",
    goodMatch: ["INFJ", "ENFP"],
    badMatch: ["ESTJ", "ENTJ"],
  },
};

/** スコアからMBTIコードを計算 */
export function calculateMbtiType(scores: Record<Axis, number>): string {
  const e = scores.EI >= 0 ? "E" : "I";
  const s = scores.SN >= 0 ? "S" : "N";
  const t = scores.TF >= 0 ? "T" : "F";
  const j = scores.JP >= 0 ? "J" : "P";
  return `${e}${s}${t}${j}`;
}
