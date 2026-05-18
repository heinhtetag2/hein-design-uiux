import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Pencil, Shuffle, Search, X } from "lucide-react";
import { VisitorCardArt } from "./VisitorCardArt";
import { fetchVisitors, readVisitorsLocal, type Visitor } from "../visitorStore";
import { isSupabaseConfigured } from "../supabase";

interface VisitorGalleryProps {
  onEditCard: () => void;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const PAGE_SIZE = 9;

export function VisitorGallery({ onEditCard }: VisitorGalleryProps) {
  const [visitors, setVisitors] = useState<Visitor[]>(() => readVisitorsLocal());
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchVisitors().then((list) => {
      if (!cancelled) setVisitors(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const totalCount = visitors.length;
  const latestNo = visitors[0]?.no;
  const q = query.trim().toLowerCase();
  const filtered = q
    ? visitors.filter((v) =>
        [v.name, v.role, v.no].filter(Boolean).some((field) => String(field).toLowerCase().includes(q)),
      )
    : visitors;
  const display = shuffleSeed === 0 ? filtered : [...filtered].sort(() => Math.random() - 0.5);
  const matchedCount = filtered.length;
  const visible = display.slice(0, visibleCount);
  const hasMore = visibleCount < matchedCount;
  const shownCount = visible.length;
  const progress = matchedCount === 0 ? 0 : Math.min(1, shownCount / matchedCount);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query]);

  const handleShowMore = () => setVisibleCount((n) => Math.min(n + PAGE_SIZE, matchedCount));

  return (
    <div className="pt-page pb-32 px-2 sm:px-4">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-10 sm:mb-14"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-6">
          <h1 className="font-serif font-light text-display-sm sm:text-display-md text-foreground leading-[1.05]">
            Visitor Gallery
          </h1>
          <div className="flex flex-col gap-1.5 sm:pb-3">
            {totalCount > 0 && (
              <p className="font-display text-eyebrow text-foreground/60">
                {latestNo ? `You're our No. ${latestNo} guest` : `${totalCount} pass${totalCount === 1 ? "" : "es"} issued`}
              </p>
            )}
            <div className="flex items-center gap-2">
              <span
                className={`inline-block size-1.5 rounded-full ${
                  isSupabaseConfigured ? "bg-brand animate-pulse" : "bg-foreground/30"
                }`}
              />
              <span className="font-display text-eyebrow text-foreground/50">
                {isSupabaseConfigured
                  ? `Live · ${totalCount} guest${totalCount === 1 ? "" : "s"} worldwide`
                  : "Local preview"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="group flex items-center gap-2 h-[38px] pl-4 pr-2 rounded-full border border-foreground/30 focus-within:border-foreground transition-colors w-[200px] sm:w-[240px]">
            <Search className="size-3.5 text-foreground/50 group-focus-within:text-foreground shrink-0 transition-colors" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guests"
              className="flex-1 min-w-0 bg-transparent outline-none font-display font-light text-body-sm text-foreground placeholder:text-foreground/40"
              aria-label="Search visitors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="flex items-center justify-center size-6 rounded-full text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-colors cursor-pointer"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onEditCard}
            className="group flex items-center gap-2 h-[38px] pl-5 pr-4 rounded-full border border-foreground/30 hover:border-foreground hover:bg-foreground/5 transition-colors cursor-pointer"
          >
            <span className="font-display font-light text-body-sm text-foreground tracking-tight leading-none">
              Edit my card
            </span>
            <Pencil className="size-3.5 text-foreground/70 group-hover:text-foreground transition-colors" />
          </button>
          <button
            type="button"
            onClick={() => setShuffleSeed((s) => s + 1)}
            disabled={totalCount < 2}
            className="group flex items-center gap-2 h-[38px] pl-5 pr-4 rounded-full border border-foreground/30 hover:border-foreground hover:bg-foreground/5 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-foreground/30"
          >
            <span className="font-display font-light text-body-sm text-foreground tracking-tight leading-none">
              Shuffle
            </span>
            <Shuffle className="size-3.5 text-foreground/70 group-hover:text-foreground transition-colors" />
          </button>
        </div>
      </motion.header>

      {/* Divider */}
      <div className="h-px bg-foreground/10 mb-10" />

      {/* Empty state */}
      {totalCount === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="py-20 flex flex-col items-center text-center gap-4"
        >
          <p className="font-serif font-light text-h2 text-foreground">No passes yet.</p>
          <p className="font-display text-body-sm text-foreground/60 max-w-[420px]">
            Once you fill out your visitor card, it'll be archived here alongside future guests.
          </p>
          <button
            type="button"
            onClick={onEditCard}
            className="mt-4 group flex items-center gap-2 h-[44px] px-7 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer"
          >
            <span className="font-display text-caption tracking-[0.18em] uppercase">
              Issue my pass
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </motion.div>
      ) : matchedCount === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="py-20 flex flex-col items-center text-center gap-3"
        >
          <p className="font-serif font-light text-h2 text-foreground">No matches.</p>
          <p className="font-display text-body-sm text-foreground/60 max-w-[420px]">
            Nothing here for &ldquo;{query}&rdquo;. Try a different name or role.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-2 font-display text-caption text-foreground/60 hover:text-foreground transition-colors cursor-pointer"
          >
            Clear search
          </button>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 [&:has(*:hover)>*:not(:hover)]:opacity-40">
            {visible.map((v, i) => (
              <motion.div
                key={`${v.no}-${v.createdAt ?? i}-${shuffleSeed}-grid`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: Math.min(i % PAGE_SIZE, 8) * 0.05, ease: EASE }}
                className="cursor-pointer transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              >
                <VisitorCardArt visitor={v} compact />
              </motion.div>
            ))}
          </div>

          {/* Show More — same pattern as Blogs page, now interactive */}
          <div className="w-full flex flex-col items-center py-[48px] md:py-[80px] lg:py-[100px] gap-6">
            <button
              type="button"
              onClick={handleShowMore}
              disabled={!hasMore}
              className="backdrop-blur-[7px] bg-foreground/10 px-[17px] py-[4px] rounded-[50px] font-display font-light text-body text-foreground hover:opacity-80 transition-opacity cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40"
            >
              {hasMore ? "Show more" : "All shown"}
            </button>

            <div className="w-[248px] h-px bg-foreground/20 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-brand"
                initial={false}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            </div>

            <span className="font-display font-normal text-foreground/60 text-body-sm">
              {q
                ? `Showing ${shownCount} of ${matchedCount} match${matchedCount === 1 ? "" : "es"}`
                : `You've seen ${shownCount} of ${totalCount}`}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
