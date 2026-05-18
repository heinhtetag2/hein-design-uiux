import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Pencil, Shuffle, LayoutGrid, List, Search } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    let cancelled = false;
    fetchVisitors().then((list) => {
      if (!cancelled) setVisitors(list);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const display = shuffleSeed === 0 ? visitors : [...visitors].sort(() => Math.random() - 0.5);
  const totalCount = visitors.length;
  const latestNo = visitors[0]?.no;
  const visible = display.slice(0, visibleCount);
  const hasMore = visibleCount < totalCount;
  const shownCount = visible.length;
  const progress = totalCount === 0 ? 0 : Math.min(1, shownCount / totalCount);

  const handleShowMore = () => setVisibleCount((n) => Math.min(n + PAGE_SIZE, totalCount));

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

        <div className="flex items-center gap-2.5">
          {/* View toggle */}
          <div className="flex items-center gap-1 h-[38px] p-1 rounded-full border border-foreground/30">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              aria-label="Grid view"
              className={`flex items-center justify-center size-[28px] rounded-full transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-foreground/10 text-foreground"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              <LayoutGrid className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              aria-pressed={viewMode === "list"}
              aria-label="List view"
              className={`flex items-center justify-center size-[28px] rounded-full transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-foreground/10 text-foreground"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              <List className="size-3.5" />
            </button>
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
      ) : (
        <>
          {viewMode === "grid" ? (
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
          ) : (
            <div className="flex flex-col border-t border-foreground/10 [&:has(*:hover)>*:not(:hover)]:opacity-40">
              {visible.map((v, i) => (
                <motion.div
                  key={`${v.no}-${v.createdAt ?? i}-${shuffleSeed}-list`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i % PAGE_SIZE, 8) * 0.04, ease: EASE }}
                  className="group border-b border-foreground/10 py-6 md:py-8 flex items-center justify-between gap-6 cursor-pointer transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <div className="flex items-center gap-5 flex-1 min-w-0">
                    <span
                      className="size-3 rounded-full shrink-0"
                      style={{ backgroundColor: v.color }}
                      aria-hidden
                    />
                    <p className="font-display font-light text-h2 text-foreground truncate">
                      {v.name || "Visitor"}
                      {v.role && (
                        <span className="font-display text-body-sm text-foreground/40 ml-3">{v.role}</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 md:gap-10 shrink-0">
                    <span className="font-display font-light text-body-sm text-foreground/40 hidden sm:block">
                      {v.issuedAt}
                    </span>
                    <span className="font-display text-eyebrow text-foreground/50">
                      No. {v.no}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

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
              You've seen {shownCount} of {totalCount}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
