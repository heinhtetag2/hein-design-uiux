import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Minus, Plus, Download } from "lucide-react";
import { SizeSelector } from "./SizeSelector";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getProduct, getProductImages, formatPrice, isDigital, type Product, type ProductVariant } from "../shop/products";
import { useCart } from "../shop/CartContext";

interface ProductDetailProps {
  productId: string;
  /** Navigate back to the Shop grid (breadcrumb + fallback). */
  onBack: () => void;
}

export function ProductDetail({ productId, onBack }: ProductDetailProps) {
  const product = getProduct(productId);
  const { addItem } = useCart();

  const [variant, setVariant] = React.useState<ProductVariant | undefined>(
    product?.variants?.[0]
  );
  const [qty, setQty] = React.useState(1);

  if (!product) {
    return (
      <div className="relative min-h-screen bg-background text-foreground font-display w-full pt-page">
        <p className="font-display text-body text-foreground/50">
          That product doesn't exist.{" "}
          <button onClick={onBack} className="text-foreground underline underline-offset-4 cursor-pointer">
            Back to Shop
          </button>
        </p>
      </div>
    );
  }

  const onSale = product.compareAtPrice != null && product.compareAtPrice > product.price;
  const digital = isDigital(product);
  const hasVariants = !!product.variants && product.variants.length > 1;
  const paragraphs = product.descriptionParagraphs ?? (product.description ? [product.description] : []);
  const installment = product.price / 3;

  return (
    <div className="relative min-h-screen bg-background text-foreground font-display pb-24 w-full pt-page">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 font-display text-body-sm text-foreground/50">
        <button onClick={onBack} className="transition-colors hover:text-foreground cursor-pointer">
          Shop
        </button>
        <span className="text-foreground/30">›</span>
        <span className="truncate text-foreground/70">{product.name}</span>
      </nav>

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <Gallery name={product.name} images={getProductImages(product)} />

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <h1 className="font-display font-normal text-[clamp(34px,4.5vw,56px)] leading-[1.04] tracking-[-0.015em] text-foreground">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-h3 text-foreground">
              {formatPrice(product.price, product.currency)}
            </span>
            {onSale && (
              <span className="font-display text-h4 text-foreground/40 line-through">
                {formatPrice(product.compareAtPrice!, product.currency)}
              </span>
            )}
          </div>

          {/* Installments — design element; activates with a real payment provider later */}
          <p className="mt-2 font-display text-body-sm text-foreground/45">
            or 3 interest-free payments of {formatPrice(installment, product.currency)} at checkout.
          </p>

          {/* Digital delivery badge */}
          {digital && (
            <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 font-display text-body-sm text-foreground/70">
              <Download className="size-4 text-foreground/60" strokeWidth={1.5} />
              Instant download{product.download ? ` · ${product.download.format}` : ""}
            </div>
          )}

          {/* Description */}
          {paragraphs.length > 0 && (
            <div className="mt-7 max-w-[48ch] space-y-4 font-display font-light text-body text-foreground/70">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {/* Size (physical) / License (digital) */}
          {hasVariants && (
            <div className="mt-8 max-w-[240px]">
              <p className="mb-2 font-display text-caption uppercase tracking-[0.14em] text-foreground/40">
                {digital ? "License" : "Size"}
              </p>
              <SizeSelector
                variants={product.variants!}
                value={variant}
                onChange={setVariant}
                placeholder={digital ? "Select license" : "Select size"}
              />
            </div>
          )}

          {/* Quantity + Add to cart */}
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-4 border-b border-foreground/30 pb-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex size-6 items-center justify-center text-foreground/60 transition-colors hover:text-foreground cursor-pointer"
              >
                <Minus className="size-4" />
              </button>
              <span className="min-w-5 text-center font-display text-body text-foreground tabular-nums">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex size-6 items-center justify-center text-foreground/60 transition-colors hover:text-foreground cursor-pointer"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <button
              onClick={() => addItem(product, variant, qty)}
              className="group/atc relative flex h-[52px] items-center justify-center overflow-hidden rounded-full border border-foreground/25 px-10 font-display font-light text-body-sm text-foreground transition-colors hover:border-foreground cursor-pointer"
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

          {/* Details / spec — sits below Add to Cart in the info column */}
          {product.details && product.details.length > 0 && (
            <DetailsSection details={product.details} />
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Gallery({ name, images }: { name: string; images?: string[] }) {
  // Fall back to three placeholder slots so the gallery reads as complete
  // until real photography is added.
  const views: (string | null)[] = images && images.length ? images : [null, null, null];
  const [index, setIndex] = React.useState(0);
  const current = views[index];
  const prev = () => setIndex((i) => (i - 1 + views.length) % views.length);
  const next = () => setIndex((i) => (i + 1) % views.length);
  const label = name.split("_")[0];

  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      {views.length > 1 && (
        <div className="hidden shrink-0 flex-col gap-3 sm:flex">
          {views.map((v, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`View image ${i + 1}`}
              className={`size-[64px] overflow-hidden rounded-[6px] bg-foreground/[0.06] border transition-colors cursor-pointer ${
                i === index ? "border-foreground" : "border-transparent hover:border-foreground/30"
              }`}
            >
              {v ? (
                <img src={v} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="font-display text-micro text-foreground/20">{label}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative aspect-square flex-1 overflow-hidden rounded-[10px] bg-foreground/[0.05]"
      >
        {current ? (
          <ImageWithFallback src={current} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-h2 font-light text-foreground/15">{label}</span>
          </div>
        )}

        {views.length > 1 && (
          <>
            <GalleryArrow side="left" onClick={prev} />
            <GalleryArrow side="right" onClick={next} />
          </>
        )}
      </motion.div>
    </div>
  );
}

function GalleryArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={`absolute top-1/2 -translate-y-1/2 ${
        side === "left" ? "left-3" : "right-3"
      } flex size-10 items-center justify-center text-white/95 transition-transform hover:scale-110 cursor-pointer [filter:drop-shadow(0_1px_5px_rgba(0,0,0,0.65))]`}
    >
      <Icon className="size-7" strokeWidth={2} />
    </button>
  );
}

function DetailsSection({ details }: { details: NonNullable<Product["details"]> }) {
  const composition = details.find((d) => d.label.toLowerCase() === "composition");
  const rest = details.filter((d) => d !== composition);

  return (
    <div className="mt-16 max-w-[640px] border-t border-foreground/10 pt-10 md:mt-24">
      {composition && (
        <p className="font-display text-body text-foreground/80">
          {composition.label}: <span className="text-foreground">{composition.value}</span>
        </p>
      )}
      {rest.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {rest.map((d) => (
            <li
              key={d.label}
              className="flex items-baseline gap-2.5 font-display text-body text-foreground/70"
            >
              <span className="mt-[7px] size-[5px] shrink-0 rounded-[1px] bg-foreground/40" />
              <span>
                {d.label}: <span className="text-foreground/90">{d.value}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
