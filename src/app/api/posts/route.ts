import { getAllPosts, getAllPostsByCategory } from "@/lib/api";

export const dynamic = "force-dynamic";

type TransformedPost = {
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
  };
};

export async function GET(request: Request) {
  const baseUrl = new URL(request.url).origin;
  const posts = getAllPostsByCategory();

  const transformedPosts = Object.fromEntries(
    Object.entries(posts).map(([category, categoryPosts]) => [
      category,
      categoryPosts.map(
        (post): TransformedPost => ({
          title: post.title,
          excerpt: post.excerpt,
          coverImage: `${baseUrl}${post.coverImage}`,
          author: {
            name: post.author.name,
          },
        })
      ),
    ])
  );

  return Response.json(transformedPosts);
}
