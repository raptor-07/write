import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostByURI, getPostStaticParams } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export default async function Page({
  params,
}: {
  params?: {
    category: string;
    post: string;
  };
}) {
  const post = getPostByURI(`${params?.category}/${params?.post}`);

  if (!post) {
    return notFound();
  }

  const content = await markdownToHtml(post.content || "");

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            URI={post.URI}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params?: {
    category: string;
    post: string;
  };
}): Promise<Metadata> {
  const post = getPostByURI(`${params?.category}/${params?.post}`);

  if (!post) {
    return notFound();
  }

  const title = `${post.title}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  return getPostStaticParams();
}
