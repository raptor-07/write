import { Post, PostByCategory } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

const techPostsDirectory = join(postsDirectory, "/tech");
const businessPostsDirectory = join(postsDirectory, "/business");
const philosophyPostsDirectory = join(postsDirectory, "/philosophy");

export function getPostsFileNamesByCategory() {
  return {
    tech: fs.readdirSync(techPostsDirectory),
    business: fs.readdirSync(businessPostsDirectory),
    philosophy: fs.readdirSync(philosophyPostsDirectory),
  };
}

export function getPostByURI(URI: string) {
  const [category, postName] = URI.split("/");

  let categoryPath;
  switch (category) {
    case "tech":
      categoryPath = techPostsDirectory;
      break;
    case "business":
      categoryPath = businessPostsDirectory;
      break;
    case "philosophy":
      categoryPath = philosophyPostsDirectory;
      break;
    default:
      throw new Error(`Invalid category: ${category}`);
  }

  const fullPath = join(categoryPath, `${postName}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, URI: `${category}/${postName}`, content } as Post;
}

export function getAllPosts(): Post[] {
  const postFileNamesByCategory = getPostsFileNamesByCategory();

  const postURIsByCategory = ((obj: Record<string, string[]>) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, files]) => [
        key,
        files.map((file: string) => file.replace(".md", "")),
      ])
    );
  })(postFileNamesByCategory);

  const posts = Object.entries(postURIsByCategory)
    .flatMap(([category, fileNames]) =>
      fileNames.map((postName) => getPostByURI(`${category}/${postName}`))
    )
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  return posts;
}

export function getAllPostsByCategory(): PostByCategory {
  const postFileNamesByCategory = getPostsFileNamesByCategory();

  const postURIsByCategory = ((obj: Record<string, string[]>) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, files]) => [
        key,
        files.map((file: string) => file.replace(".md", "")),
      ])
    );
  })(postFileNamesByCategory);

  const postsByCategory = Object.entries(postURIsByCategory).reduce(
    (acc, [category, fileNames]) => {
      acc[category as keyof PostByCategory] = fileNames
        .map((postName) => getPostByURI(`${category}/${postName}`))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
      return acc;
    },
    {} as PostByCategory
  );

  return postsByCategory;
}

export function getPostStaticParams() {
  const postFileNamesByCategory = getPostsFileNamesByCategory();

  const postURIsByCategory = ((obj: Record<string, string[]>) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, files]) => [
        key,
        files.map((file: string) => file.replace(".md", "")),
      ])
    );
  })(postFileNamesByCategory);

  const staticParams = Object.entries(postURIsByCategory).flatMap(
    ([category, posts]) =>
      posts.map((post) => ({
        category,
        post,
      }))
  );

  return staticParams;
}

export function getCategoryStaticParams() {
  return [
    { category: "all" },
    { category: "tech" },
    { category: "business" },
    { category: "philosophy" },
  ];
}

export function getRandomBg() {
  const bgDir = join(process.cwd(), "public/assets/bg");
  const bgFiles = fs.readdirSync(bgDir);
  const randomBg = bgFiles[Math.floor(Math.random() * bgFiles.length)];
  return `/assets/bg/${randomBg}`;
}
