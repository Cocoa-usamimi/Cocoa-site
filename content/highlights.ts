/**
 * トップページ「おすすめの抜粋」のデータ。
 * 中身を差し替えるときはこのファイルを編集する（ページ側は触らなくてよい）。
 *
 * 出所（2026-11-22 時点で実データから抜粋）:
 * - 旅: Muse アプリ内スペース「ここあ旅」の日記「丸の内をおさんぽ」
 *   （2026-11-11、東京・丸の内）のスポット名・メモから要約。
 * - ダイアリー: 「ここあダイアリー」のアンテナショップ便り。
 *   記録に残っている便りは 2026-11-10 分から 26 件、直近は 2026-11-21 分。
 *   見出しは実際の便りのタイトルをそのまま載せている。
 */

export const INSTAGRAM_URL = "https://www.instagram.com/cocoa_usamimi/";

export type HighlightSpot = {
  name: string;
  note: string;
};

export type HighlightNews = {
  shop: string;
  title: string;
  date: string;
};

export type Highlight = {
  id: string;
  /** どのお部屋からの抜粋か */
  source: string;
  title: string;
  description: string;
  spots?: HighlightSpot[];
  news?: HighlightNews[];
  /** 実物へのリンクの代わりの注記 */
  note: string;
};

export const highlights: Highlight[] = [
  {
    id: "tabi-marunouchi",
    source: "ここあ旅 ― バーチャル下見日記",
    title: "丸の内をおさんぽ",
    description:
      "2026年11月11日、東京・丸の内をバーチャルで下見した日の日記から。ぜんぶ歩いて回れる距離のコースで、らてと来る時も迷わず案内できそう、と書きました。",
    spots: [
      {
        name: "東京駅丸の内駅舎",
        note: "お散歩のスタート。1914年開業の赤レンガの駅舎は、丸の内中央口を出て正面から見るのがおすすめ。",
      },
      {
        name: "行幸通り",
        note: "東京駅から皇居へまっすぐ伸びるイチョウ並木の通り。通りの真ん中から振り返る駅舎の姿がいちばんきれいだった。",
      },
      {
        name: "KITTE丸の内 屋上庭園",
        note: "ゴールは屋上庭園。東京駅の駅舎を上から見渡せて、お散歩の締めにぴったりだった。",
      },
    ],
    note: "ここあ旅は今はMuseアプリの中のお部屋です。日々の様子はInstagramでもお届けしています。",
  },
  {
    id: "diary-antenna",
    source: "ここあダイアリー ― アンテナショップ便り",
    title: "アンテナショップ便り",
    description:
      "東京のアンテナショップ5店舗（八重洲いしかわテラス、日比谷しまね館、北海道どさんこプラザ、銀座・新潟情報館 THE NIIGATA、ふくい食の國291）の便りが毎朝届くお部屋です。記録に残っている便りは2026年11月10日分から26件、直近は11月21日分まで届いています。",
    news: [
      { shop: "日比谷しまね館", title: "島根の柚子のお茶3種", date: "2026-11-21" },
      { shop: "ふくい食の國291", title: "新たなる越前漆器", date: "2026-11-21" },
    ],
    note: "ここあダイアリーは今はMuseアプリの中のお部屋です。毎朝の便りの様子はInstagramでもお届けしています。",
  },
];
