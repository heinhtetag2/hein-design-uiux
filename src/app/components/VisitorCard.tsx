import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check, X } from "lucide-react";
import { VisitorCardArt } from "./VisitorCardArt";
import { readVisitors, type Visitor } from "../visitorStore";

interface VisitorCardProps {
  onComplete: (visitor: Visitor) => void;
  onClose?: () => void;
  initial?: Visitor | null;
}

const ROLE_OPTIONS = [
  "Designer",
  "Engineer",
  "Product",
  "Founder",
  "Marketer",
  "Researcher",
  "Recruiter",
  "Student",
  "Just exploring",
];

const COLOR_OPTIONS = [
  { id: "brand", value: "#584dff", label: "Brand" },
  { id: "deep", value: "#2d2680", label: "Deep" },
  { id: "mist", value: "#b5b0ff", label: "Mist" },
  { id: "olive", value: "#4a5230", label: "Olive" },
  { id: "forest", value: "#1f5a3d", label: "Forest" },
  { id: "sea", value: "#1f6f7a", label: "Sea" },
  { id: "rose", value: "#c8456a", label: "Rose" },
  { id: "amber", value: "#d68a2c", label: "Amber" },
  { id: "clay", value: "#b6735c", label: "Clay" },
  { id: "bone", value: "#d6cfc2", label: "Bone" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function formatIssuedDate(d: Date) {
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
}

// Sequential pass numbers starting at 3001 so the gallery's "you're No. X" reads honestly.
const NO_BASE = 3000;
function nextNo() {
  return String(NO_BASE + readVisitors().length + 1);
}

export function VisitorCard({ onComplete, onClose, initial }: VisitorCardProps) {
  const isEditing = !!initial;
  const [name, setName] = useState(initial?.name && initial.name !== "Guest" ? initial.name : "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [color, setColor] = useState(initial?.color ?? COLOR_OPTIONS[0].value);
  const [no] = useState(() => initial?.no ?? nextNo());
  const issuedAt = useMemo(() => initial?.issuedAt ?? formatIssuedDate(new Date()), [initial]);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!onClose) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const canSubmit = name.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit || submitted) return;
    setSubmitted(true);
    onComplete({ name: name.trim(), color, no, issuedAt, role: role || undefined });
  };

  return (
    <motion.div
      key="visitor-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="fixed inset-0 z-[9000] bg-background text-foreground overflow-hidden flex flex-col"
    >
      {/* Subtle ambient dot grid for texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Header eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className="relative flex items-center justify-between px-6 sm:px-10 pt-5 sm:pt-6"
      >
        <span className="font-display text-eyebrow text-foreground/60">
          {isEditing ? "26P / Edit Visitor Pass" : "26P / Visitor Pass"}
        </span>
        <div className="flex items-center gap-5">
          <span className="font-display text-eyebrow text-foreground/60 hidden sm:inline">
            Chapter 01
          </span>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex items-center justify-center size-8 rounded-full border border-foreground/20 text-foreground/60 hover:text-foreground hover:border-foreground/60 transition-colors cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative flex-1 min-h-0 flex flex-col items-center justify-center px-6 py-4">
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="flex flex-col items-center text-center mb-5 sm:mb-7"
        >
          <h1 className="font-serif font-light text-display-sm sm:text-display-md text-foreground leading-[1.05]">
            Welcome, visitor.
          </h1>
          <p className="mt-2 font-display font-light text-body-sm sm:text-body text-foreground/60 max-w-[420px]">
            Issue your pass to step into the works. It only takes a name.
          </p>
        </motion.div>

        {/* The card */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          className="w-full max-w-[440px]"
        >
          <VisitorCardArt visitor={{ name, color, no, issuedAt, role }} />
        </motion.div>

        {/* Name + Role — side by side on tablet+, stacked on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          className="mt-6 w-full max-w-[440px] flex flex-col sm:flex-row gap-4 sm:gap-6"
        >
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <label
              htmlFor="visitor-name"
              className="font-display text-eyebrow text-foreground/60"
            >
              Your name
            </label>
            <input
              id="visitor-name"
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 24))}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit();
              }}
              placeholder="How you'd like to be greeted"
              className="w-full bg-transparent border-b border-foreground/15 focus:border-foreground py-2 text-body-lg font-display font-light text-foreground placeholder:text-foreground/30 outline-none transition-colors"
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <label className="font-display text-eyebrow text-foreground/60">
              What you do
            </label>
            <RoleSelect value={role} onChange={setRole} />
          </div>
        </motion.div>

        {/* Color swatches */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          className="mt-5 flex items-center justify-center flex-wrap gap-3 max-w-[440px]"
        >
          {COLOR_OPTIONS.map((opt) => {
            const active = opt.value === color;
            return (
              <button
                key={opt.id}
                type="button"
                aria-label={`${opt.label} card`}
                onClick={() => setColor(opt.value)}
                className="relative size-7 rounded-full transition-transform duration-200 hover:scale-110 cursor-pointer"
                style={{ backgroundColor: opt.value }}
              >
                <span
                  className={`absolute -inset-1.5 rounded-full border transition-colors ${
                    active ? "border-foreground" : "border-transparent"
                  }`}
                />
              </button>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          className="mt-6 flex flex-col items-center gap-4"
        >
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`group flex items-center gap-2 h-[34px] pl-7 pr-6 rounded-full transition-colors duration-300 ${
              canSubmit
                ? "bg-foreground text-background hover:bg-foreground/90 cursor-pointer"
                : "bg-foreground/10 text-foreground/40 cursor-not-allowed"
            }`}
          >
            <span className="font-display font-normal text-body-sm tracking-tight leading-none">
              {isEditing ? "Save" : "Enter"}
            </span>
            <span className="text-body-sm leading-none transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
          {isEditing ? (
            <button
              type="button"
              onClick={onClose}
              className="font-display text-caption text-foreground/40 hover:text-foreground/70 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onComplete({ name: "Guest", color, no, issuedAt })}
              className="font-display text-caption text-foreground/40 hover:text-foreground/70 transition-colors cursor-pointer"
            >
              Skip for now
            </button>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: EASE }}
        className="relative px-6 sm:px-10 pb-5 flex items-center justify-between font-display text-eyebrow text-foreground/40"
      >
        <span>Intentional design since 2024</span>
        <span className="hidden sm:inline">{issuedAt}</span>
      </motion.div>
    </motion.div>
  );
}

function RoleSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative group">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full flex items-center justify-between bg-transparent border-b py-2 text-left text-body-lg font-display font-light outline-none cursor-pointer transition-colors ${
          open ? "border-foreground" : "border-foreground/10 group-hover:border-foreground/40"
        } ${value ? "text-foreground" : "text-foreground/40"}`}
      >
        <span className="truncate pr-4">{value || "Pick one"}</span>
        <ChevronDown
          className={`size-4 text-foreground/40 transition-transform duration-200 ${
            open ? "rotate-180 text-foreground/70" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 left-0 right-0 top-[calc(100%+8px)] max-h-[280px] overflow-y-auto rounded-2xl border border-foreground/10 bg-background/80 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] py-1.5 [scrollbar-width:thin] [scrollbar-color:rgba(127,127,127,0.3)_transparent] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-foreground/25 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-foreground/40"
          >
            {ROLE_OPTIONS.map((opt) => {
              const selected = opt === value;
              return (
                <li key={opt}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-4 px-4 py-2.5 text-left text-body-sm font-display font-extralight transition-colors cursor-pointer ${
                      selected
                        ? "text-foreground bg-foreground/[0.04]"
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/[0.04]"
                    }`}
                  >
                    <span className="truncate">{opt}</span>
                    {selected && <Check className="size-3.5 text-brand shrink-0" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
