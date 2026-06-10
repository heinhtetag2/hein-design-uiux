// One-off build asset optimizer: convert every PNG/JPG under src/assets to a
// high-quality WebP sibling (quality 90 — perceptually lossless for these
// screenshots/photos), preserving dimensions. Originals are left in place; the
// import rewrite + cleanup happens separately so the step is reversible.
import { readdir, stat } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = new URL("../src/assets/", import.meta.url).pathname;
const RASTER = new Set([".png", ".jpg", ".jpeg"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let origTotal = 0;
let webpTotal = 0;
let count = 0;

for await (const file of walk(ROOT)) {
  if (!RASTER.has(extname(file).toLowerCase())) continue;
  const out = file.replace(/\.(png|jpe?g)$/i, ".webp");
  const orig = (await stat(file)).size;
  await sharp(file).webp({ quality: 90, effort: 6 }).toFile(out);
  const webp = (await stat(out)).size;
  origTotal += orig;
  webpTotal += webp;
  count++;
  const pct = ((1 - webp / orig) * 100).toFixed(0);
  console.log(`${(orig / 1024).toFixed(0).padStart(7)}KB -> ${(webp / 1024).toFixed(0).padStart(6)}KB  (-${pct}%)  ${file.split("/assets/")[1]}`);
}

console.log(`\n${count} images: ${(origTotal / 1048576).toFixed(1)}MB -> ${(webpTotal / 1048576).toFixed(1)}MB  (-${((1 - webpTotal / origTotal) * 100).toFixed(0)}%)`);
