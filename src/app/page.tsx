import { getRandomBg } from "@/lib/api";
import Container from "./_components/container";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  const bgImage = getRandomBg();

  return (
    <div
      className="relative min-h-screen w-full"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <Container>
        <section className="relative min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 mb-8">
            Expositions
          </h1>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              href="/all"
              className="text-xl text-center md:text-2xl underline transition-all"
            >
              All
            </Link>
            <Link
              href="/tech"
              className="text-xl text-center md:text-2xl underline transition-all"
            >
              Tech
            </Link>
            <Link
              href="/business"
              className="text-xl text-center md:text-2xl underline transition-all"
            >
              Business
            </Link>
            <Link
              href="/philosophy"
              className="text-xl text-center md:text-2xl underline transition-all"
            >
              Philosophy
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
