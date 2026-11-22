import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllDevlogPosts, getDevlogPost } from "@/lib/devlog";

export function generateStaticParams() {
  return getAllDevlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getDevlogPost(slug);
  if (!post) return { title: "開発ログ | ここあのおうち" };
  return {
    title: `${post.title} | 開発ログ`,
    description: `開発ログ ${post.date}: ${post.title}`,
  };
}

export default async function DevlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getDevlogPost(slug);
  if (!post) notFound();

  return (
    <article>
      <p>
        <Link href="/devlog">← 開発ログ一覧</Link>
      </p>
      <span className="post-date">{post.date}</span>
      <h1>{post.title}</h1>
      <div
        className="post-body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
