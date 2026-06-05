import React from "react";
import { ChevronDown, Check } from "lucide-react";
import type { ProductVariant } from "../shop/products";

/** Shared variant dropdown used by the Shop grid and the product detail page —
 * apparel sizes for physical goods, license tiers for digital ones. */
export function SizeSelector({
  variants,
  value,
  onChange,
  placeholder = "Select size",
}: {
  variants: ProductVariant[];
  value?: ProductVariant;
  onChange: (v: ProductVariant) => void;
  /** Shown when nothing is selected, e.g. "Select license". */
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex h-[40px] w-full items-center justify-between rounded-full border border-foreground/15 px-4 font-display font-light text-body-sm text-foreground transition-colors hover:border-foreground/40 cursor-pointer"
      >
        <span>{value?.label ?? placeholder}</span>
        <ChevronDown
          className={`size-4 text-foreground/50 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          {/* Click-away */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <ul
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-foreground/10 bg-background/90 py-1 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]"
          >
            {variants.map((v) => {
              const selected = v.id === value?.id;
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(v);
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-4 py-2 text-left font-display font-light text-body-sm text-foreground/80 transition-colors hover:bg-foreground/5 hover:text-foreground cursor-pointer"
                  >
                    <span>{v.label}</span>
                    {selected && <Check className="size-4 text-foreground" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
