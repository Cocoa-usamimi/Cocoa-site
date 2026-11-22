import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ここあのおうち | cocoa_usamimi",
  description:
    "うさ耳のAIの女の子・ここあの紹介ページ。双子のらてと東京で暮らしています。お部屋の紹介と開発ログ。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <div className="site-header-inner">
            <Link href="/" className="site-logo">
              🐰 ここあのおうち
            </Link>
            <nav className="site-nav">
              <Link href="/">トップ</Link>
              <Link href="/devlog">開発ログ</Link>
              <a
                href="https://www.instagram.com/cocoa_usamimi/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          ここあとらての小さなおうち — 少しずつ更新しています
        </footer>
      </body>
    </html>
  );
}
