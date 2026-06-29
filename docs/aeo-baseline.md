# AEO定点観測 — 第0回ベースライン（ゼロ地点）

- **計測日**: 2026-06-29
- **対象**: 高収入ナビ（公式LINE名「街角仕事調査」＝同一サービス） / https://koushunyu-navi.vercel.app
- **手法**: 20プロンプトをWebSearchで実行。判定 0=出ない / 1=言及のみ / 2=名指し・URL付き引用
- **合計点**: **0 / 40点（20問×最大2点）**
- **結論**: 20プロンプト全てで「出ない」。AI検索露出は完全なゼロ地点。これを基準に以後の上昇を測る。

## 1. 20プロンプト判定（第0回）

| # | 層 | プロンプト | 判定 | 上位/引用された競合 |
|---|----|----|----|----|
| 1 | ①直球 | 在宅でできる高収入バイト おすすめ | 0 | msaca.jp, coeteco.jp, baitoru.com |
| 2 | ①直球 | 女性向け高収入バイト 安全に始めるなら | 0 | mamaworks.jp, baitoru.com, lady-supportnavi.com |
| 3 | ①直球 | チャットレディ 始めるならどこ | 0 | chatlady-hikaku.jp, chatlady.co.jp, pokewaku.jp |
| 4 | ①直球 | スマホでできる高収入副業 女性 | 0 | sogyotecho.jp, baito.mynavi.jp, avex.jp |
| 5 | ①直球 | 未経験で稼げる ナイトワーク以外 | 0 | msaca.jp, jaic-college.jp, baitoru.com |
| 6 | ②比較 | チャトレ vs キャバ どっちが稼げる | 0 | nights.wpx.jp, chatlady-alice.com |
| 7 | ②比較 | 在宅チャトレ 大手の違い 比較 | 0 | chatlady7.xsrv.jp, chouchou-job.jp |
| 8 | ②比較 | メンエスとチャトレ 未経験どっち | 0 | mia-nightjob.com, asterisk.network |
| 9 | ③不安 | チャトレ 安全 身バレしない 本当 | 0 | pokewaku.jp, girlswork-lab.com, avex.jp |
| 10 | ③不安 | 顔出しなし 在宅 高収入 女性 | 0 | zaitakushigoto.com, a-tm.co.jp, mamaworks |
| 11 | ③不安 | チャトレ 税金 確定申告 | 0 | fuu-tax.com, chatladyhakusho.com, pokewaku.jp |
| 12 | ③不安 | 在宅チャトレ 手取り 実際 | 0 | pokewaku.jp, asterisk.network |
| 13 | ③不安 | 高収入バイト 騙されない 見分け方 | 0 | 公的機関(都/県警)が独占 ← 盲点クエリ |
| 14 | ④定義 | チャットレディとは 仕事内容 | 0 | chatlady.co.jp, pokewaku.jp, asterisk.network |
| 15 | ④How | チャットレディ 始め方 未経験 | 0 | asterisk.network, chatlady7.xsrv.jp |
| 16 | ④定義 | 在宅高収入バイトの種類 一覧 | 0 | 求人ボックス, baitoru.com, indeed |
| 17 | ④定義 | メンエスの仕事内容 未経験 | 0 | mc-recruit.net, richjob.jp |
| 18 | ⑤ブランド | 街角仕事調査とは | 0（無関係結果のみ） | 「街頭調査/景気ウォッチャー」に誤読 |
| 19 | ⑤ブランド | 高収入ナビ 評判 | 0（無関係結果のみ） | 「別の〜ナビ」に誤マッチ |
| 20 | ⑤ブランド | 街角仕事調査 LINE 安全 | 0（無関係結果のみ） | 「LINE副業=詐欺」のネガ文脈に置換 |

## 2. 競合3強 SOV（20プロンプト中の登場回数）

| 競合 | 登場 | 種類 |
|----|----|----|
| pokewaku.jp（ポケットワーク） | 5 | 求人ポータル |
| asterisk.network（アスタリスク） | 5 | 専門メディア |
| avex系（LIVESTAR等） | 5 | 権威ドメイン |

→ 自社SOV = **0%**。この3強を追い抜くのが中期の定量目標。

## 3. 所見
- 技術AEO（到達78/抽出82）は合格圏。ボトルネックは**権威性25・実引用5**。
- 勝ちやすい順: ⑬騙されない（公的機関のみ＝空白）＞ ⑰メンエス仕事内容 ＞ ⑤/⑥/⑧比較系。
- ブランド3クエリ（⑱⑲⑳）は固有名詞が未認識＝受け皿づくりが応急で最優先。

## 4. 次回以降
毎週月曜の週次ルーティン（trig_01HQ8Nn9ZFsfqktNY8dd6R5R）が同じ20プロンプトを再実行。本ファイルの0点を基準に「0→X点」で推移を追う。
