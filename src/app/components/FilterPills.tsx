import React from "react";

interface FilterPillsProps {
  /** Category labels. The first/"All" entry clears the selection. */
  categories: string[];
  /** Currently selected categories. An empty set means "All" is active. */
  selected: Set<string>;
  /** Toggle a category (pass "All" to clear). */
  onToggle: (category: string) => void;
  className?: string;
}

/**
 * Shared filter pill row used by Blogs and About. Multi-select: active
 * tags render in the brand color with an × to remove; "All" is active
 * (solid) whenever nothing else is selected.
 */
export function FilterPills({ categories, selected, onToggle, className }: FilterPillsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
      {categories.map((cat) => {
        const isAll = cat === "All";
        const isActive = isAll ? selected.size === 0 : selected.has(cat);
        return (
          <button
            key={cat}
            onClick={() => onToggle(cat)}
            aria-pressed={isActive}
            className={`inline-flex items-center justify-center gap-1.5 h-7 leading-none rounded-full border transition-all duration-300 text-body-sm font-normal tracking-tight cursor-pointer ${
              isActive && !isAll
                ? "bg-brand text-brand-foreground border-brand pl-4 pr-2"
                : isActive && isAll
                ? "bg-foreground text-background border-foreground px-5"
                : "bg-foreground/10 text-foreground/60 border-transparent hover:border-foreground/20 hover:text-foreground backdrop-blur-md px-5"
            }`}
          >
            <span className="translate-y-px">{cat}</span>
            {isActive && !isAll && (
              <span
                aria-hidden
                className="flex items-center justify-center size-4 rounded-full bg-brand-foreground/15"
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 1L7 7M1 7L7 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
