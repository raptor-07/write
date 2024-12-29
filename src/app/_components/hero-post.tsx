import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  URI: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  URI,
}: Props) {
  const [category, postName] = URI.split("/");

  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} URI={URI} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20 md:mb-28">
        <h3 className="text-4xl lg:text-5xl leading-tight">
          <Link
            href={`${category}/posts/${postName}`}
            className="hover:underline"
          >
            {title}
          </Link>
        </h3>
        <p className="text-lg leading-relaxed">{excerpt}</p>
        <div className="flex items-center justify-start">
          <Avatar name={author.name} />
        </div>
        <div className="flex items-center justify-end">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </section>
  );
}
