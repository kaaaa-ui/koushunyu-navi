import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type MarkdownContent = {
  frontmatter: Record<string, unknown>;
  content: string;
  htmlContent: string;
};

export async function parseMarkdown(raw: string): Promise<MarkdownContent> {
  const { data, content } = matter(raw);
  const result = await remark().use(html, { sanitize: false }).process(content);
  return {
    frontmatter: data,
    content,
    htmlContent: result.toString(),
  };
}
