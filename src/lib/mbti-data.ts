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
    question: "お仕事で一番大事なのは？",
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
    question: "気になるお仕事を見つけたら？",
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
    question: "お仕事に使える時間は？",
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
  /** チャトレでの稼ぎ方（タイプ別の強み） */
  chatreStrength: string;
  /** LINEで教える秘密の情報（チラ見せ用） */
  lineTeaser: string;
  goodMatch: string[];
  badMatch: string[];
}

export const mbtiTypes: Record<string, MbtiType> = {
  ESTJ: {
    code: "ESTJ",
    name: "バリキャリ収入タイプ",
    emoji: "👑",
    description:
      "リーダーシップ抜群で、目標に向かって一直線！スケジュール管理が得意で、短時間でも効率よく成果を出せるタイプ。",
    job: "チャットレディ",
    salary: "30〜80万",
    chatreStrength: "目標設定→逆算で稼ぐ力がピカイチ。配信スケジュールを自分で組み立てて、常連さんを効率よく増やせる才能の持ち主。",
    lineTeaser: "あなたのタイプが最短で月30万を超える「配信スケジュール術」",
    goodMatch: ["ESFJ", "ENTJ"],
    badMatch: ["INFP", "ISFP"],
  },
  ESTP: {
    code: "ESTP",
    name: "ノリで稼ぐエンタメタイプ",
    emoji: "🎤",
    description:
      "ノリの良さとトーク力が最大の武器！場の空気を読んで盛り上げるのが天才的。初見さんもすぐファンにできちゃう。",
    job: "チャットレディ",
    salary: "30〜60万",
    chatreStrength: "ライブ配信との相性が最強。テンポの良いトークで視聴者を釘付けにして、投げ銭を自然に引き出せる天才タイプ。",
    lineTeaser: "あなたのトーク力を活かす「初見→常連化テクニック」3選",
    goodMatch: ["ESFP", "ENTP"],
    badMatch: ["INFJ", "INTJ"],
  },
  ESFJ: {
    code: "ESFJ",
    name: "気配り女王タイプ",
    emoji: "🌸",
    description:
      "気配り上手でリピート率No.1！お客さんの気持ちを先読みできるから、「また会いたい」と思わせるのが得意。",
    job: "チャットレディ",
    salary: "30〜80万",
    chatreStrength: "常連さんの名前や好みを覚える力が段違い。「覚えてくれてたの？」の一言でリピーターが爆増するタイプ。",
    lineTeaser: "あなたの気配り力で常連率80%を超える「おもてなし配信術」",
    goodMatch: ["ESTJ", "ISFJ"],
    badMatch: ["INTP", "ISTP"],
  },
  ESFP: {
    code: "ESFP",
    name: "天性のアイドルタイプ",
    emoji: "🌟",
    description:
      "華やかさと明るさで場の主役になれるあなた！天性のエンターテイナーで、見てるだけで元気になると言われるタイプ。",
    job: "チャットレディ",
    salary: "30〜80万",
    chatreStrength: "カメラ映えと天性の明るさで、配信開始直後から視聴者を集められる。イベント配信で爆発的に稼げるポテンシャルの持ち主。",
    lineTeaser: "あなたのキャラを最大限に活かす「映える配信セッティング」",
    goodMatch: ["ESTP", "ENFP"],
    badMatch: ["INTJ", "ISTJ"],
  },
  ENTJ: {
    code: "ENTJ",
    name: "戦略家CEOタイプ",
    emoji: "📊",
    description:
      "戦略的に考えて効率よく稼ぐのが得意！データを見ながら改善を繰り返して、着実に収入を伸ばしていくタイプ。",
    job: "チャットレディ",
    salary: "50〜100万",
    chatreStrength: "配信時間帯・プロフィール・会話パターンをデータで最適化。PDCAを回して月収を右肩上がりにできる最強タイプ。",
    lineTeaser: "トップチャトレが実践する「データ分析×収入最大化」の方法",
    goodMatch: ["ESTJ", "INTJ"],
    badMatch: ["ISFP", "INFP"],
  },
  ENTP: {
    code: "ENTP",
    name: "トーク無双タイプ",
    emoji: "💬",
    description:
      "どんな話題でも対応できるトーク力が武器！頭の回転が速くて、お客さんを飽きさせない会話の達人。",
    job: "チャットレディ",
    salary: "30〜60万",
    chatreStrength: "話題の引き出しが無限大だから、長時間配信でもお客さんが離れない。知的な会話で高単価な常連がつきやすい。",
    lineTeaser: "あなたの話術で「つい長居しちゃう配信」を作る会話テンプレ",
    goodMatch: ["ESTP", "INTP"],
    badMatch: ["ISFJ", "ISTJ"],
  },
  ENFJ: {
    code: "ENFJ",
    name: "カリスマ姉御タイプ",
    emoji: "💎",
    description:
      "人を惹きつけるカリスマ性の持ち主！頼られると力を発揮するタイプで、お客さんからの信頼がとにかく厚い。",
    job: "チャットレディ",
    salary: "30〜80万",
    chatreStrength: "「この人についていきたい」と思わせるオーラがある。太客（高額常連）がつきやすく、安定して高収入を得られる。",
    lineTeaser: "カリスマタイプが太客を掴む「信頼構築3ステップ」",
    goodMatch: ["ESFJ", "INFJ"],
    badMatch: ["ISTP", "INTP"],
  },
  ENFP: {
    code: "ENFP",
    name: "好奇心爆発タイプ",
    emoji: "🦋",
    description:
      "好奇心旺盛で新しいことが大好き！独自の世界観があって、「この子おもしろい」とハマるファンが続出するタイプ。",
    job: "チャットレディ",
    salary: "20〜60万",
    chatreStrength: "配信に飽きがこないクリエイティブさが武器。企画配信やコスプレ配信など、変化をつけてファンを飽きさせない。",
    lineTeaser: "あなたの個性で差がつく「バズる企画配信アイデア」5つ",
    goodMatch: ["ESFP", "INFP"],
    badMatch: ["ISTJ", "ESTJ"],
  },
  ISTJ: {
    code: "ISTJ",
    name: "コツコツ堅実タイプ",
    emoji: "📋",
    description:
      "コツコツと信頼を積み上げるのが得意。真面目で誠実な性格がお客さんに安心感を与えて、じわじわとファンが増えるタイプ。",
    job: "チャットレディ",
    salary: "20〜50万",
    chatreStrength: "毎日決まった時間に配信する継続力が最大の強み。「いつもいてくれる安心感」で固定ファンがどんどん増える。",
    lineTeaser: "コツコツタイプが3ヶ月で月20万を安定させた「習慣化メソッド」",
    goodMatch: ["ISFJ", "ESTJ"],
    badMatch: ["ENFP", "ENTP"],
  },
  ISTP: {
    code: "ISTP",
    name: "効率マスタータイプ",
    emoji: "⚡",
    description:
      "効率重視で短時間に集中して稼ぐのが得意！ムダを省いて必要なことだけに集中できる、在宅ワークと相性抜群のタイプ。",
    job: "チャットレディ",
    salary: "20〜50万",
    chatreStrength: "短時間集中型で、1時間あたりの単価が高い。ゴールデンタイムだけ狙い撃ちで効率よく稼ぐスタイルが合う。",
    lineTeaser: "週3日・1日2時間で月20万を狙う「時短チャトレ攻略法」",
    goodMatch: ["ISTJ", "ESTP"],
    badMatch: ["ENFJ", "ESFJ"],
  },
  ISFJ: {
    code: "ISFJ",
    name: "おもてなし職人タイプ",
    emoji: "🍵",
    description:
      "おもてなし力が最大の武器！お客さんの細かい変化にも気づけて、心のこもった対応ができる。リピーターがどんどん増えるタイプ。",
    job: "チャットレディ",
    salary: "20〜60万",
    chatreStrength: "「あなただから話せる」と言われる聞き上手。お客さんの悩み相談に乗れるから、長時間の1対1チャットで高収入。",
    lineTeaser: "聞き上手が活きる「1対1チャットで単価3倍にする会話術」",
    goodMatch: ["ISTJ", "ESFJ"],
    badMatch: ["ENTP", "ESTP"],
  },
  ISFP: {
    code: "ISFP",
    name: "世界観アーティストタイプ",
    emoji: "🎨",
    description:
      "独自の世界観とセンスが光るあなた！雰囲気づくりが上手で、お客さんを自分の世界に引き込む不思議な魅力がある。",
    job: "チャットレディ",
    salary: "20〜50万",
    chatreStrength: "プロフィール写真・配信背景・衣装のセンスが抜群。「雰囲気が好き」でハマるコアなファンがつく。",
    lineTeaser: "世界観で差がつく「プロフィール&配信画面の作り込み術」",
    goodMatch: ["INFP", "ESFP"],
    badMatch: ["ENTJ", "ESTJ"],
  },
  INTJ: {
    code: "INTJ",
    name: "孤高の戦略家タイプ",
    emoji: "🧠",
    description:
      "分析力と戦略的思考で最短ルートで稼ぐ方法を見つけるのが得意！在宅で黙々と、でも確実に収入を伸ばしていく。",
    job: "チャットレディ",
    salary: "30〜80万",
    chatreStrength: "他の人が気づかない「稼げる時間帯×話題の組み合わせ」を発見できる。独自の勝ちパターンで安定高収入。",
    lineTeaser: "戦略家タイプ向け「収入を2倍にするデータ活用テクニック」",
    goodMatch: ["ENTJ", "INTP"],
    badMatch: ["ESFP", "ESTP"],
  },
  INTP: {
    code: "INTP",
    name: "分析オタクタイプ",
    emoji: "🔬",
    description:
      "データを分析して最適解を見つけるのが大好き！お客さんの傾向を分析して、効率的にアプローチできる。ハマると誰よりも深く極められる。",
    job: "チャットレディ",
    salary: "20〜50万",
    chatreStrength: "お客さんのタイプを見極めて、一人ひとりに最適な対応ができる。ニッチなジャンルで独占状態を作れるタイプ。",
    lineTeaser: "分析タイプが見つけた「ライバル不在のニッチ配信ジャンル」",
    goodMatch: ["INTJ", "ENTP"],
    badMatch: ["ESFJ", "ENFJ"],
  },
  INFJ: {
    code: "INFJ",
    name: "共感ヒーラータイプ",
    emoji: "🕊️",
    description:
      "深い共感力でお客さんの心を癒すのが得意！「あなたに会いに来た」と言われることも。深い信頼関係を築ける稀有なタイプ。",
    job: "チャットレディ",
    salary: "30〜60万",
    chatreStrength: "心を開いてもらう力がNo.1。お客さんが「ここだけの話…」と打ち明けてくれるから、替えのきかない存在になれる。",
    lineTeaser: "共感力を収入に変える「ヒーラー型チャトレの極意」",
    goodMatch: ["ENFJ", "INFP"],
    badMatch: ["ESTP", "ESFP"],
  },
  INFP: {
    code: "INFP",
    name: "マイペース癒し系タイプ",
    emoji: "🌙",
    description:
      "マイペースで穏やかな雰囲気が魅力！お客さんに安心感を与えて、自然とファンが増える。自分のペースで無理なく働けるタイプ。",
    job: "チャットレディ",
    salary: "20〜40万",
    chatreStrength: "ガツガツしない自然体が逆に刺さる。「疲れた時に会いたくなる」癒し枠として、深夜帯に強い。",
    lineTeaser: "癒し系が深夜帯で無双する「ゆるふわ配信で月20万」の秘訣",
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
