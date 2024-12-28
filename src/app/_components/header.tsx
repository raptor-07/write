import Link from "next/link";
import { ArrowLeft } from "@geist-ui/icons";

const Header = () => {
  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-8 mt-8 flex items-center">
        <Link href="/all" className="hover:underline flex items-center gap-2">
          <ArrowLeft />
          Expositions
        </Link>
        .
      </h2>
      <hr className="border-t border-zinc-700 my-4" />
    </div>
  );
};

export default Header;
