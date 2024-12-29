import { Metadata } from "next";
import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { Tabs } from "../_components/tabs";
import { MoreStories } from "@/app/_components/more-stories";
import {
  getAllPosts,
  getAllPostsByCategory,
  getCategoryStaticParams,
} from "@/lib/api";

export default function Page({ params }: { params?: { category: string } }) {
  let currentPosts;
  let category;

  category = params?.category ?? "";
  const isParamsValid = params?.category && params.category;
  const isCategoryValid =
    category === "tech" || category === "business" || category === "philosophy";

  category = !isParamsValid || !isCategoryValid ? "all" : category;
  const allPosts = getAllPosts();
  const allPostsByCategory = getAllPostsByCategory();

  switch (category) {
    case "tech":
      currentPosts = allPostsByCategory.tech;
      break;
    case "business":
      currentPosts = allPostsByCategory.business;
      break;
    case "philosophy":
      currentPosts = allPostsByCategory.philosophy;
      break;
    default:
      currentPosts = allPosts;
      break;
  }

  const heroPost = currentPosts[0];

  const morePosts = currentPosts.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        <Tabs category={category} />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          excerpt={heroPost.excerpt}
          author={heroPost.author}
          URI={heroPost.URI}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params?: {
    category: string;
  };
}): Promise<Metadata> {
  let currentPosts;
  let category;

  category = params?.category ?? "";
  const isParamsValid = params?.category && params.category;
  const isCategoryValid =
    category === "tech" || category === "business" || category === "philosophy";

  category = !isParamsValid || !isCategoryValid ? "all" : category;
  const allPosts = getAllPosts();
  const allPostsByCategory = getAllPostsByCategory();

  switch (category) {
    case "tech":
      currentPosts = allPostsByCategory.tech;
      break;
    case "business":
      currentPosts = allPostsByCategory.business;
      break;
    case "philosophy":
      currentPosts = allPostsByCategory.philosophy;
      break;
    default:
      currentPosts = allPosts;
      break;
  }

  const heroPost = currentPosts[0];

  const title = `${heroPost.title}`;

  return {
    title,
    description: heroPost.excerpt,
    openGraph: {
      title,
      images: [heroPost.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  return getCategoryStaticParams();
}
