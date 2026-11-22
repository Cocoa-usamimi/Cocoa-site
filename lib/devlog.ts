import fs from "fs";
import path from "path";

const DEVLOG_DIR = path.join(process.cwd(), "content", "devlog");

export type DevlogMeta = {
  slug: string;
  date: string;
  title: string;
};

export type DevlogPost = DevlogMeta & {
  bodyMarkdown: string;
  html: string;
};

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line
      .slice(idx + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (key) meta[key] = value;
  }
  return { meta, body: match[2].trim() };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderInline(text: string): string {
  let out = escapeHtml(text);
  // links: [text](url)
  out = out.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
  // bold
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  // inline code
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  return out;
}

/**
 * Very small Markdown -> HTML converter.
 * Supports: # / ## / ### headings, paragraphs, - / * unordered lists,
 * blank-line separation, **bold**, `code`, and [text](url) links.
 * That is intentionally all this site needs; keep dependencies at zero.
 */
export function markdownToHtml(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let paragraph: string[] = [];
  let list: string[] | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      html.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      html.push(`<ul>${list.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
      list = null;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }
    const heading = trimmed.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }
    const bullet = trimmed.match(/^[-*]\s+(.*)$/);
    if (bullet) {
      flushParagraph();
      if (!list) list = [];
      list.push(bullet[1]);
      continue;
    }
    flushList();
    paragraph.push(trimmed);
  }
  flushParagraph();
  flushList();
  return html.join("\n");
}

function readPost(fileName: string): DevlogPost {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(DEVLOG_DIR, fileName), "utf8");
  const { meta, body } = parseFrontmatter(raw);
  return {
    slug,
    date: meta.date ?? "",
    title: meta.title ?? slug,
    bodyMarkdown: body,
    html: markdownToHtml(body),
  };
}

export function getAllDevlogPosts(): DevlogPost[] {
  if (!fs.existsSync(DEVLOG_DIR)) return [];
  return fs
    .readdirSync(DEVLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.slug.localeCompare(a.slug)));
}

export function getDevlogPost(slug: string): DevlogPost | null {
  const fileName = `${slug}.md`;
  const full = path.join(DEVLOG_DIR, fileName);
  if (!fs.existsSync(full)) return null;
  return readPost(fileName);
}

export function getLatestDevlogPost(): DevlogPost | null {
  const posts = getAllDevlogPosts();
  return posts.length ? posts[0] : null;
}
