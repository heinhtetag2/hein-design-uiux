import React from "react";
import { motion } from "motion/react";
import { Download } from "lucide-react";
import { FilterPills } from "./FilterPills";
import { SizeSelector } from "./SizeSelector";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  PRODUCTS,
  getShopCategories,
  formatPrice,
  getProductCover,
  isDigital,
  type Product,
  type ProductVariant,
} from "../shop/products";
import { useCart } from "../shop/CartContext";

export function Shop({ onOpenProduct }: { onOpenProduct?: (id: string) => void }) {
  const [filters, setFilters] = React.useState<Set<string>>(new Set());
  // Pills are derived from the live product list, so a new category appears
  // automatically the moment a product uses it.
  const categories = React.useMemo(() => getShopCategories(PRODUCTS), []);

  const toggleFilter = (cat: string) => {
    if (cat === "All") {
      setFilters(new Set());
      return;
    }
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const products =
    filters.size === 0
      ? PRODUCTS
      : PRODUCTS.filter((p) => filters.has(p.category));

  return (
    <div className="relative min-h-screen bg-background text-foreground font-display pb-20 w-full">
      {/* Title */}
      <div className="pt-page">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="font-serif font-light text-[clamp(56px,8vw,88px)] leading-[1.05] tracking-[-0.02em]"
        >
          Shop
        </motion.h1>
        <p className="mt-5 max-w-[460px] font-display font-light text-body-lg text-foreground/60">
          Caps, tees, and the odd Figma script. A small run of things I make
          when I'm not designing.
        </p>
      </div>

      {/* Category filter */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mt-[48px] md:mt-[64px] flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 py-[24px]"
      >
        <span className="font-display font-normal text-body-sm text-foreground/50 shrink-0">
          Filter By:
        </span>
        <FilterPills categories={categories} selected={filters} onToggle={toggleFilter} />
      </motion.div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-[56px] pt-[24px]">
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} onOpen={onOpenProduct} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="py-[80px] text-center font-display text-body text-foreground/40">
          Nothing in that category yet.
        </p>
      )}
    </div>
  );
}

function ProductCard({
  product,
  index,
  onOpen,
}: {
  product: Product;
  index: number;
  onOpen?: (id: string) => void;
}) {
  const { addItem } = useCart();
  const digital = isDigital(product);
  // Show a selector on every card for a consistent layout; products without
  // real variants fall back to a single option (and add to the cart without a
  // variant so the cart data stays clean). Digital products show license tiers
  // instead of sizes — or an "Instant download" badge when they have none.
  const hasRealVariants = !!product.variants && product.variants.length > 0;
  const variantOptions: ProductVariant[] = hasRealVariants
    ? product.variants!
    : [{ id: "default", label: digital ? "Standard license" : "One size" }];
  const [variant, setVariant] = React.useState<ProductVariant>(variantOptions[0]);
  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price;
  const cover = getProductCover(product);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.min(index, 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
    >
      {/* Image — opens the detail page */}
      <button
        type="button"
        onClick={() => onOpen?.(product.id)}
        aria-label={`View ${product.name}`}
        className="relative block aspect-square w-full overflow-hidden rounded-[8px] bg-foreground/[0.05] cursor-pointer"
      >
        {cover ? (
          <ImageWithFallback
            src={cover}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-h3 font-light text-foreground/15">
              {product.name.split("_")[0]}
            </span>
          </div>
        )}
      </button>

      {/* Title + price */}
      <button
        type="button"
        onClick={() => onOpen?.(product.id)}
        className="mt-4 w-fit text-left cursor-pointer"
      >
        <h3 className="font-display font-normal text-h4 text-foreground transition-opacity hover:opacity-70">
          {product.name}
        </h3>
      </button>
      <div className="mt-1 flex items-center gap-2">
        <span className="font-display text-body text-foreground">
          {formatPrice(product.price, product.currency)}
        </span>
        {onSale && (
          <span className="font-display text-body-sm text-foreground/40 line-through">
            {formatPrice(product.compareAtPrice!, product.currency)}
          </span>
        )}
      </div>

      {/* Size selector + Add to cart — pinned to the bottom so they align
          across a row even when titles wrap to different heights. */}
      <div className="mt-auto flex flex-col gap-4 pt-5">
        {digital && !hasRealVariants ? (
          <div className="flex h-[40px] items-center gap-2 rounded-full border border-foreground/15 px-4 font-display font-light text-body-sm text-foreground/55">
            <Download className="size-4" strokeWidth={1.5} />
            Instant download
          </div>
        ) : (
          <SizeSelector
            variants={variantOptions}
            value={variant}
            onChange={setVariant}
            placeholder={digital ? "Select license" : "Select size"}
          />
        )}
        <button
          onClick={() => addItem(product, hasRealVariants ? variant : undefined)}
          className="group/atc relative flex h-[56px] w-full items-center justify-center overflow-hidden rounded-full border border-foreground/25 font-display font-light text-body text-foreground transition-colors hover:border-foreground cursor-pointer"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] group-hover/atc:scale-y-100"
          />
          <span className="relative transition-colors duration-500 group-hover/atc:text-background">
            Add to Cart
          </span>
        </button>
      </div>
    </motion.div>
  );
}
