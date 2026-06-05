// Shop data layer.
//
// This is intentionally a self-contained, typed module backed by mock data so
// the Shop UI can ship now. When a real backend is chosen (Shopify Storefront
// API or Stripe + a serverless function), only this file's data source and the
// `checkout()` stub in CartContext need to change — the components consume the
// types below, not the source.

export type ProductCategory = "Merch" | "UI Kits" | "Scripts";

/**
 * How a product is fulfilled. "physical" goods ship (size, shipping address,
 * delivery option); "digital" goods (UI kits, scripts) are delivered as a
 * download — no sizing, no shipping. Defaults to "physical" when omitted.
 */
export type ProductKind = "physical" | "digital";

/** Download metadata for a digital product. */
export interface ProductDownload {
  /** Filename shown to the buyer, e.g. "Aperture-UI-Kit.fig". */
  label: string;
  /** Human format, e.g. "Figma (.fig)". */
  format: string;
  /** Human file size, e.g. "24 MB". */
  fileSize: string;
  /**
   * Real download URL. Left undefined here so the demo generates a placeholder
   * file on the fly; point this at your CDN / Gumroad / Lemon Squeezy link to
   * deliver the actual asset.
   */
  href?: string;
}

/** A selectable option for a product (e.g. an apparel size or a license tier). */
export interface ProductVariant {
  /** Stable id, unique within the product. Used to key cart lines. */
  id: string;
  /** Human label shown in the selector, e.g. "M" or "Team license". */
  label: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  /** Fulfilment type. Defaults to "physical" when omitted. */
  kind?: ProductKind;
  /** Download details — required for digital products, ignored for physical. */
  download?: ProductDownload;
  /** Price as a plain number, e.g. 35 → £35.00. */
  price: number;
  /** Original price, shown struck-through when the item is on sale. */
  compareAtPrice?: number;
  /** Currency symbol. Single source so it's easy to swap later. */
  currency: string;
  /**
   * Folder name under `src/assets/shop/`. Every image in that folder is loaded
   * automatically (see `getProductImages`) — drop photos in, no code changes.
   */
  folder?: string;
  /** Optional variants (e.g. sizes). Apparel has them; scripts don't. */
  variants?: ProductVariant[];
  /** Short blurb shown in the grid card. */
  description?: string;
  /** Detail-page body, one entry per paragraph. */
  descriptionParagraphs?: string[];
  /** Spec rows shown in the detail page's details section. */
  details?: { label: string; value: string }[];
}

const SIZES: ProductVariant[] = [
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
];

export const PRODUCTS: Product[] = [
  {
    id: "cap-001",
    name: "Cap_001",
    folder: "Cap_001",
    category: "Merch",
    price: 25,
    compareAtPrice: 35,
    currency: "£",
    variants: [
      { id: "os", label: "One size" },
    ],
    description: "Six-panel cotton cap with a low-key embroidered mark.",
    descriptionParagraphs: [
      "Six-panel construction, made from 100% certified organic cotton, offering both comfort and durability.",
      "Embroidered front mark with a mid-profile design, pre-curved peak, and an adjustable self-fabric strap to ensure a fit.",
      "One Colour (Black). One size.",
    ],
    details: [
      { label: "Composition", value: "100% Organic cotton" },
      { label: "Size", value: "One size" },
      { label: "Colour", value: "Black" },
      { label: "Weight", value: "70 GSM" },
      { label: "Gender", value: "Unisex" },
      { label: "Features", value: "Metal fastener, 6-panel design" },
    ],
  },
  {
    id: "tee-001",
    name: "T-Shirt_001",
    folder: "T-Shirt_001",
    category: "Merch",
    price: 30,
    compareAtPrice: 35,
    currency: "£",
    variants: SIZES,
    description: "Heavyweight organic-cotton tee, boxy fit.",
    descriptionParagraphs: [
      "Heavyweight 100% organic-cotton tee with a relaxed, boxy fit and a tonal embroidered mark on the chest.",
      "Pre-shrunk and garment-washed so it keeps its shape wash after wash.",
      "One Colour (Black). Sizes XS–XL.",
    ],
    details: [
      { label: "Composition", value: "100% Organic cotton" },
      { label: "Fit", value: "Boxy / relaxed" },
      { label: "Colour", value: "Black" },
      { label: "Weight", value: "220 GSM" },
      { label: "Gender", value: "Unisex" },
    ],
  },
  {
    id: "kit-aperture",
    name: "Aperture UI Kit",
    folder: "Aperture_UI_Kit",
    category: "UI Kits",
    kind: "digital",
    price: 48,
    compareAtPrice: 72,
    currency: "£",
    // Digital products reuse `variants` as license tiers.
    variants: [
      { id: "personal", label: "Personal license" },
      { id: "team", label: "Team license" },
    ],
    download: {
      label: "Aperture-UI-Kit.fig",
      format: "Figma (.fig)",
      fileSize: "24 MB",
    },
    description: "A 200+ component Figma design system — variables, variants, light & dark.",
    descriptionParagraphs: [
      "A complete Figma UI kit built on variables and auto-layout: 200+ components, every state wired with variants, and light/dark themes driven from a single set of tokens.",
      "Restyle the whole system by editing the colour, type, and spacing variables. Includes buttons, forms, navigation, data display, overlays, and 30+ prebuilt page templates.",
      "Instant download. Free lifetime updates.",
    ],
    details: [
      { label: "Format", value: "Figma (.fig)" },
      { label: "Contents", value: "200+ components, 30+ templates" },
      { label: "Theming", value: "Variable-driven, light & dark" },
      { label: "Updates", value: "Free lifetime updates" },
      { label: "File size", value: "24 MB" },
    ],
  },
];

/** Look up a product by id. */
export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/** Digital products skip sizing & shipping and are delivered as a download. */
export function isDigital(product: Product): boolean {
  return product.kind === "digital";
}

/**
 * Trigger a client-side download for a digital product. Uses the product's real
 * file (`download.href`) when set; otherwise generates a small placeholder so
 * the purchase → download flow is demonstrable before a backend is connected.
 */
export function downloadProduct(product: Product): void {
  const dl = product.download;
  const a = document.createElement("a");

  if (dl?.href) {
    a.href = dl.href;
    a.download = dl.label;
  } else {
    const note =
      `${product.name} — thanks for your purchase!\n\n` +
      `This is a placeholder download. Connect a file host (or Gumroad / Lemon ` +
      `Squeezy) and set download.href on this product to deliver the real ` +
      `${dl?.format ?? "file"}.\n`;
    const url = URL.createObjectURL(new Blob([note], { type: "text/plain" }));
    a.href = url;
    a.download = (dl?.label ?? product.name).replace(/\.[a-z0-9]+$/i, "") + ".txt";
    // Revoke after the click has had a tick to start the download.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  document.body.appendChild(a);
  a.click();
  a.remove();
}

// Auto-load every image inside each product folder under src/assets/shop/.
// Drop files into a folder and they appear automatically.
const SHOP_IMAGES = import.meta.glob(
  "../../assets/shop/*/*.{svg,png,jpg,jpeg,webp,avif}",
  { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

const isMain = (name: string) => /^main\.[a-z0-9]+$/i.test(name);

// Group images by folder, tracking filenames so we can pick the cover.
const imagesByFolder: Record<string, { name: string; url: string }[]> = {};
for (const path of Object.keys(SHOP_IMAGES)) {
  const match = path.match(/\/shop\/([^/]+)\/([^/]+)$/);
  if (!match) continue;
  (imagesByFolder[match[1]] ??= []).push({ name: match[2], url: SHOP_IMAGES[path] });
}
// Order each folder by filename, but float a `main.*` file to the front so it
// becomes the cover/thumbnail regardless of how the other files are named.
for (const folder of Object.keys(imagesByFolder)) {
  imagesByFolder[folder].sort((a, b) => {
    if (isMain(a.name) !== isMain(b.name)) return isMain(a.name) ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

/**
 * All images for a product's folder. A file named `main.*` is the cover;
 * otherwise the first in filename order wins (name files `01.jpg`, `02.jpg`, …).
 */
export function getProductImages(product: Product): string[] {
  return (product.folder && imagesByFolder[product.folder]?.map((i) => i.url)) || [];
}

/** The product's cover/thumbnail (first image), or undefined if none. */
export function getProductCover(product: Product): string | undefined {
  return getProductImages(product)[0];
}

/**
 * Display order for the filter pills. List a category here to fix where its
 * pill sits; any category not listed falls to the end, alphabetically.
 */
export const CATEGORY_ORDER: ProductCategory[] = ["Merch", "UI Kits", "Scripts"];

/**
 * Build the shop filter from the live product list: an "All" entry plus one
 * entry per category that actually has products, ordered by CATEGORY_ORDER.
 *
 * This is the single source of truth for the filter — add a product in a new
 * category (or a brand-new category to the type + CATEGORY_ORDER) and its pill
 * appears automatically, with no empty/dead categories.
 */
export function getShopCategories(products: Product[] = PRODUCTS): string[] {
  const present = [...new Set(products.map((p) => p.category))].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a as ProductCategory);
    const ib = CATEGORY_ORDER.indexOf(b as ProductCategory);
    if (ia !== -1 && ib !== -1) return ia - ib; // both known: by configured order
    if (ia !== -1) return -1; // known categories before unknown
    if (ib !== -1) return 1;
    return a.localeCompare(b); // unknown: alphabetical
  });

  return ["All", ...present];
}

/** Format a numeric price with its currency symbol, e.g. £35.00. */
export function formatPrice(amount: number, currency: string): string {
  return `${currency}${amount.toFixed(2)}`;
}
