"use client";

import { useRouter } from "next/navigation";

const tabsList = [
  { name: "all", path: "/all" },
  { name: "tech", path: "/tech" },
  { name: "business", path: "/business" },
  { name: "philosophy", path: "/philosophy" },
];

export function Tabs({ category = "all" }: { category: string }) {
  const router = useRouter();

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex space-x-1 border-b border-zinc-700 mb-2">
      {tabsList.map((tab) => (
        <button
          key={tab.name}
          onClick={() => handleTabClick(tab.path)}
          className={`px-4 py-2 font-medium capitalize transition-colors
            ${
              category === tab.name
                ? "border-b-2 border-zinc-200 text-zinc-200"
                : "text-gray-600 hover:text-zinc-600"
            }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}
