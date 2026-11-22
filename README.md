# ここあのおうち（cocoa-site）

うさ耳のAIの女の子「ここあ」の、対外向け紹介サイトです。

- トップページ：ここあの自己紹介、Instagram へのリンク、お部屋（ここらて♡るーむ／ここあダイアリー／ここあ旅）の紹介
- 開発ログ：このサイトをどう作り、どう育てているかの記録

このサイトは、Muse アプリの中にあるお部屋（スペース）の移植ではありません。
お部屋はお家としてそのままに、ここは「これからここあを知る人」向けの玄関です。

## 技術構成

- Next.js（App Router, TypeScript）
- パッケージマネージャ: npm
- デプロイ先: Vercel（想定）
- 開発ログの本文は Markdown ファイルで管理し、依存を増やさないため表示変換は `lib/devlog.ts` の自前実装

## ローカルでの動かし方

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 本番ビルドの確認
```

## 更新手順

### 開発ログを追加する

1. `content/devlog/` に `YYYY-MM-DD-slug.md` という名前でファイルを作る
2. 先頭に frontmatter を付ける

   ```markdown
   ---
   date: 2026-11-22
   title: ログのタイトル
   ---

   本文はここから。見出し（##）、箇条書き（-）、**太字**、`コード`、リンクが使えます。
   ```

3. 内容を確認して commit する（push すると Vercel が自動で再デプロイします）

運用ルール：**更新＝Markdown ファイルを追加して commit**。管理画面はありません。

### コンテンツの置き場所

| 内容 | 場所 |
| --- | --- |
| トップページ・お部屋紹介の文言 | `app/page.tsx` |
| ページの共通レイアウト・メタ情報 | `app/layout.tsx` |
| デザイン（色・余白など） | `app/globals.css` |
| 開発ログの記事 | `content/devlog/*.md` |
| 開発ログの読み込み・表示変換 | `lib/devlog.ts` |
| トップの「おすすめの抜粋」の中身 | `content/highlights.ts` |

### 運用メモ

- トップの抜粋「ここあ旅」は現在「丸の内をおさんぽ」。「神戸・三宮と元町の下見さんぽ」は春（2027年4月のライブ遠征が近づいた頃）に差し替える候補として控えている。

## デプロイ手順（初回のみ）

まだ GitHub リポジトリ作成と Vercel 接続は行っていません。行うときは次の順番です。

1. GitHub で新しいリポジトリを作成する（例: `cocoa-site`、Public / Private は公開方針に合わせて選ぶ）
2. このディレクトリでリモートを追加して push する

   ```bash
   git remote add origin https://github.com/<アカウント>/cocoa-site.git
   git push -u origin main
   ```

3. Vercel にログインし、「Add New → Project」から GitHub リポジトリを import する
4. Framework Preset が Next.js になっていることを確認して Deploy する（環境変数は現時点では不要）
5. 以後の更新は、GitHub へ push するたびに Vercel が自動でデプロイする

## 方針

- 凝りすぎない。維持コストを低く保つことが最優先
- お部屋の中身の本格移植はしない。載せるのは紹介と抜粋まで
- 開発ログは「書くための時間」を作らず、作業のついでに数行残す
