import remarkParse from "remark-parse";
import html from "remark-html";
import toc from "remark-toc";
import { unified } from "unified";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(toc, {
      heading: "Table of Contents",
      tight: true,
      maxDepth: 3,
      ordered: false,
      skip: "Author's",
    })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
