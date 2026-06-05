import React, { createContext, useContext, useMemo, useState, useCallback } from "react";
import type { Product, ProductVariant } from "./products";

/** A single line in the cart: a product + chosen variant + quantity. */
export interface CartLine {
  /** Stable key: `${product.id}::${variant?.id ?? "default"}`. */
  key: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export type CheckoutResult =
  | { status: "stub"; message: string }
  | { status: "ok" };

interface CartContextValue {
  lines: CartLine[];
  /** Total quantity across all lines (for the nav badge). */
  count: number;
  /** Sum of price × quantity. */
  subtotal: number;
  isOpen: boolean;
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void;
  removeLine: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  /**
   * Placeholder for real checkout. Swap this for a Shopify cart→checkout
   * redirect or a Stripe Checkout Session call when a backend is chosen.
   */
  checkout: () => Promise<CheckoutResult>;
}

const CartContext = createContext<CartContextValue | null>(null);

const lineKey = (product: Product, variant?: ProductVariant) =>
  `${product.id}::${variant?.id ?? "default"}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product, variant?: ProductVariant, quantity = 1) => {
    const qty = Math.max(1, Math.floor(quantity));
    const key = lineKey(product, variant);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, quantity: l.quantity + qty } : l
        );
      }
      return [...prev, { key, product, variant, quantity: qty }];
    });
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, quantity } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const checkout = useCallback(async (): Promise<CheckoutResult> => {
    // TODO(backend): replace with Shopify checkout redirect or Stripe session.
    return {
      status: "stub",
      message: "Checkout isn't wired up yet — connect Shopify or Stripe to go live.",
    };
  }, []);

  const { count, subtotal } = useMemo(() => {
    return lines.reduce(
      (acc, l) => ({
        count: acc.count + l.quantity,
        subtotal: acc.subtotal + l.product.price * l.quantity,
      }),
      { count: 0, subtotal: 0 }
    );
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count,
      subtotal,
      isOpen,
      addItem,
      removeLine,
      setQuantity,
      clear,
      openCart,
      closeCart,
      checkout,
    }),
    [lines, count, subtotal, isOpen, addItem, removeLine, setQuantity, clear, openCart, closeCart, checkout]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
