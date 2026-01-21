"use client";

import { cn } from "@/lib/utils";

export type Category = "All" | "CMO" | "Growth" | "Brand" | "Performance";

interface CategoryFilterProps {
  selected: Category;
  onChange: (category: Category) => void;
}

const categories: Category[] = ["All", "CMO", "Growth", "Brand", "Performance"];

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            selected === category
              ? "bg-white text-purple-900"
              : "bg-white/10 text-white/80 hover:bg-white/20"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
