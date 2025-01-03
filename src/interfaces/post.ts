import { type Author } from "./author";

export type Post = {
  URI: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
};

export type PostByCategory = {
  tech: Post[];
  business: Post[];
  philosophy: Post[];
};
