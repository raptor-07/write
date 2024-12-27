import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Expositions by Hurmaan`,
  description: `Editorials, Journals and Articles on software, business, and thoughts.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={cn(inter.className, "bg-zinc-900 text-slate-200")}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
