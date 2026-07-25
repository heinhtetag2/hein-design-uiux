import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "../shop/CartContext";
import { formatPrice, getProductCover, isDigital } from "../shop/products";

export function CartDrawer({
  onBrowseShop,
  onCheckout,
}: {
  onBrowseShop?: () => void;
  onCheckout?: () => void;
}) {
  const { lines, subtotal, isOpen, closeCart, setQuantity, removeLine } = useCart();

  // Currency follows the items (single currency for now).
  const currency = lines[0]?.product.currency ?? "£";
  // An all-digital cart needs no shipping — surface that in the footer note.
  const allDigital = lines.length > 0 && lines.every((l) => isDigital(l.product));

  // Lock body scroll while the drawer is open.
  React.useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleCheckout = () => {
    closeCart();
    onCheckout?.();
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[200] bg-background/50 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "110%", opacity: 0 }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed right-3 top-3 bottom-3 z-[210] flex w-[calc(100%-24px)] flex-col overflow-hidden rounded-[24px] border border-foreground/10 bg-background/95 backdrop-blur-2xl sm:right-4 sm:top-4 sm:bottom-4 sm:w-[420px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-foreground/10">
              <h2 className="font-display text-h4 font-normal text-foreground">
                Cart{lines.length > 0 && <span className="text-foreground/40"> · {lines.length}</span>}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="flex size-8 items-center justify-center rounded-full border border-foreground/10 text-foreground transition-colors hover:border-foreground cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                  <span className="mb-4 flex size-16 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.03]">
                    <ShoppingBag className="size-7 text-foreground/35" strokeWidth={1.25} />
                  </span>
                  <p className="font-display text-body text-foreground/60">Your cart is empty.</p>
                  <p className="font-display text-body-sm text-foreground/35">
                    Add something from the shop to get started.
                  </p>
                  {onBrowseShop && (
                    <button
                      onClick={() => {
                        closeCart();
                        onBrowseShop();
                      }}
                      className="group/shop relative mt-5 flex h-[46px] items-center justify-center overflow-hidden rounded-full border border-foreground/25 px-8 font-display font-light text-body-sm text-foreground transition-colors hover:border-foreground cursor-pointer"
                    >
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/shop:scale-y-100"
                      />
                      <span className="relative transition-colors duration-500 group-hover/shop:text-background">
                        Browse the shop
                      </span>
                    </button>
                  )}
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-foreground/10">
                  {lines.map((line) => (
                    <li key={line.key} className="flex gap-4 py-5">
                      {/* Thumb */}
                      <div className="size-[64px] shrink-0 overflow-hidden rounded-[6px] bg-foreground/[0.06]">
                        {getProductCover(line.product) ? (
                          <img src={getProductCover(line.product)} alt={line.product.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="font-display text-caption text-foreground/20">
                              {line.product.name.split("_")[0]}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate font-display text-body-sm text-foreground">{line.product.name}</p>
                            {line.variant && (
                              <p className="font-display text-caption text-foreground/45">{line.variant.label}</p>
                            )}
                          </div>
                          <button
                            onClick={() => removeLine(line.key)}
                            aria-label={`Remove ${line.product.name}`}
                            className="shrink-0 text-foreground/40 transition-colors hover:text-foreground cursor-pointer"
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between pt-3">
                          {/* Qty stepper */}
                          <div className="flex items-center gap-3 rounded-full border border-foreground/15 px-2 py-1">
                            <button
                              onClick={() => setQuantity(line.key, line.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="flex size-5 items-center justify-center text-foreground/60 transition-colors hover:text-foreground cursor-pointer"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-4 text-center font-display text-body-sm text-foreground tabular-nums">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(line.key, line.quantity + 1)}
                              aria-label="Increase quantity"
                              className="flex size-5 items-center justify-center text-foreground/60 transition-colors hover:text-foreground cursor-pointer"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="font-display text-body-sm text-foreground tabular-nums">
                            {formatPrice(line.product.price * line.quantity, line.product.currency)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="border-t border-foreground/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-body-sm text-foreground/60">Subtotal</span>
                  <span className="font-display text-body text-foreground tabular-nums">
                    {formatPrice(subtotal, currency)}
                  </span>
                </div>
                <p className="mt-1 font-display text-caption text-foreground/40">
                  {allDigital
                    ? "Instant download — delivered to your email."
                    : "Shipping & taxes calculated at checkout."}
                </p>
                <button
                  onClick={handleCheckout}
                  className="mt-4 h-[48px] w-full rounded-full bg-foreground font-display font-light text-body-sm text-background transition-opacity hover:opacity-90 cursor-pointer"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
