# Build-time asset & optimization scripts

One-off Node scripts (not part of the app build). They were used to optimize
assets and apply a few code transforms. The heavy tooling they need is **not**
kept in `devDependencies` (to keep installs lean) — install it only when you
need to reprocess assets, then remove it again.

## Reprocessing raster images → WebP

Whenever you add new PNG/JPG files under `src/assets/`:

```bash
npm i -D sharp
node scripts/convert-images.mjs          # writes .webp siblings (q90)
node scripts/rewrite-image-imports.mjs   # repoints .png/.jpg imports to .webp
# then delete the originals that now have a .webp twin, and:
npm uninstall sharp
```

## Re-encoding videos

```bash
npm i -D ffmpeg-static ffprobe-static
node scripts/optimize-videos.mjs         # strips audio, +faststart, per-clip CRF
npm uninstall ffmpeg-static ffprobe-static
```

Edit the `JOBS` array in `optimize-videos.mjs` to add clips / tune CRF
(lower = higher quality + larger file).

## Smoke-testing the app in a real browser

```bash
npm i -D playwright && npx playwright install chromium
node scripts/drive.mjs                   # loads home, navigates, screenshots to /tmp
npm uninstall playwright
```

## reorganize-assets.mjs

Already applied — moved `src/assets/` into a grouped, clearly-named structure
(`brand/`, `home/`, `work/<project>/`, `feed/`, `what-i-do/`, `shop/<product>/`)
and rewrote every import path + `products.ts` folder name to match. JS variable
names were left unchanged, so component logic is untouched. Kept for reference;
no tooling needed. If you move assets again, follow the same map-then-rewrite
pattern so imports stay in sync.

## apply-memo.mjs

Already applied — wraps the always-mounted leaf components in `React.memo`.
Kept for reference; no tooling needed.
