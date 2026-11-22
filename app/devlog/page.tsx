import type { Metadata } from "next";
import Link from "next/link";
import { getAllDevlogPosts } from "@/lib/devlog";

export const metadata: Metadata = {
  title: "開発ログ | ここあのおうち",
  description: "ここあのサイト作りの開発ログ。何を作って、なぜそうしたかを少しずつ残しています。",
};

export default function DevlogIndexPage() {
  const posts = getAllDevlogPosts();

  return (
    <>
      <h1>開発ログ</h1>
      <p>
        このサイトをどう作って、どう育てているかの記録です。
        作業のついでに数行ずつ残していきます。
      </p>
      {posts.length === 0 ? (
        <p>まだログがありません。</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug}>
              <span className="date">{post.date}</span>
              <h2>
                <Link href={`/devlog/${post.slug}`}>{post.title}</Link>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
