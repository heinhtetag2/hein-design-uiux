# Shop product images

One folder per product. Drop a product's photos into its folder and they show
up automatically — no code changes needed.

```
src/assets/shop/
  Cap_001/      → Cap_001
  T-Shirt_001/  → T-Shirt_001
```

## How it works
- `src/app/shop/products.ts` maps each product to its folder via a `folder` field.
- All images inside a folder are loaded with Vite's `import.meta.glob` and shown
  in the product-detail gallery. The **cover/thumbnail** is the file named
  `main.*` if present, otherwise the first image in filename order.

## Adding images
1. Name the cover/thumbnail `main.png` (or `.jpg`/`.svg`/…). The remaining files
   show in the gallery in filename order — name them `01.jpg`, `02.jpg`, … to
   control that order.
2. Supported: `.svg`, `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`.

## Adding a new product
Create a folder here, then add the product in `products.ts` with a matching
`folder:` value.
