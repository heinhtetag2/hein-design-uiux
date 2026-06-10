// One-off: rename/regroup src/assets into a clear, grouped structure and rewrite
// every import path to match. Only file PATHS change — JS variable names are left
// untouched, so component logic (e.g. EduSync drag cards keyed by var name) is
// unaffected. Shop uses import.meta.glob, so its folder names are also updated in
// products.ts and its files renamed so `main.*` stays the cover.
import { readdir, readFile, writeFile, rename, mkdir, rm, access } from "node:fs/promises";
import { join, dirname, extname } from "node:path";

const SRC = new URL("../src/", import.meta.url).pathname;
const A = (p) => join(SRC, "assets", p);
const exists = (p) => access(p).then(() => true).catch(() => false);

// old assets-relative path  →  new assets-relative path
const MOVES = {
  "logo/heinlogodark.svg": "brand/logo-dark.svg",
  "logo/heinlogolight.svg": "brand/logo-light.svg",
  "home/home-bg-video.mp4": "home/hero-background.mp4",

  "edu-sync/hero.webp": "work/edusync/hero.webp",
  "edu-sync/edusync-video.mp4": "work/edusync/overview-video.mp4",
  "edu-sync/Gy4KIgdXUAAwR1D.mp4": "work/edusync/system-video.mp4",
  "edu-sync/HIC0e5wXIAAxd49.mp4": "work/edusync/think-different-video.mp4",
  "edu-sync/frame79.webp": "work/edusync/gallery-01.webp",
  "edu-sync/frame80.webp": "work/edusync/gallery-02.webp",
  "edu-sync/image1.webp": "work/edusync/gallery-03.webp",
  "edu-sync/video.webp": "work/edusync/gallery-04.webp",
  "edu-sync/frame81.webp": "work/edusync/gallery-05.webp",
  "edu-sync/image3.webp": "work/edusync/gallery-06.webp",
  "edu-sync/frame82.webp": "work/edusync/gallery-07.webp",
  "edu-sync/frame83.webp": "work/edusync/gallery-08.webp",
  "edu-sync/image9.webp": "work/edusync/gallery-09.webp",
  "edu-sync/image2.webp": "work/edusync/gallery-10.webp",
  "edu-sync/image6.webp": "work/edusync/gallery-11.webp",
  "edu-sync/app1.webp": "work/edusync/music-card-1.webp",
  "edu-sync/app2.webp": "work/edusync/music-card-2.webp",
  "edu-sync/app3.webp": "work/edusync/music-card-3.webp",
  "edu-sync/edusync-hover-mock.webp": "work/edusync/hover-cover.webp",
  "edu-sync/edusync-hover-bg.webp": "work/edusync/hover-background.webp",

  "suno/suno-app-mockup.webp": "work/suno/app-mockup.webp",
  "midjourney/chrome-abstract.webp": "work/midjourney/chrome-abstract.webp",
  "uber/a-laptop.webp": "work/uber/laptop.webp",
  "upwork/fearless-girl.webp": "work/upwork/fearless-girl.webp",
  "nike/nike-app-showcase.webp": "work/nike/app-showcase.webp",
  "modular/modular.webp": "work/modular/cover.webp",
  "headspace/headspace-hero.webp": "work/headspace/cover.webp",
  "headspace/headspace.webp": "work/headspace/full.webp",

  "feed/techcrunch-logo.webp": "feed/logo-techcrunch.webp",
  "feed/fast-company-logo.webp": "feed/logo-fast-company.webp",

  // Shop — files renamed so main.* stays the cover; folders renamed (see PRODUCTS_FOLDERS).
  "shop/Cap_001/imgi_28_BIM008_BrandsInMotion_Merch_02_2025Drop_JQ_01-04.webp": "shop/cap-001/main.webp",
  "shop/Cap_001/imgi_29_BIM_Cap_ETL_Back_1080x1080.webp": "shop/cap-001/02.webp",
  "shop/Cap_001/imgi_30_BIM008_BrandsInMotion_Merch_02_2025Drop_JQ_01-07.webp": "shop/cap-001/03.webp",
  "shop/T-Shirt_001/imgi_4_BIM008_BrandsInMotion_Merch_02_2025Drop_JQ_01-06.webp": "shop/tee-001/main.webp",
  "shop/T-Shirt_001/imgi_6_BIM008_BrandsInMotion_Merch_02_2025Drop_JQ_01-09.webp": "shop/tee-001/02.webp",
  "shop/Aperture_UI_Kit/main.webp": "shop/aperture-ui-kit/main.webp",
  "shop/Aperture_UI_Kit/HIC6tgWXwAAzOoF.mp4": "shop/aperture-ui-kit/02-demo.mp4",
  "shop/Aperture_UI_Kit/imgi_119_dRSyl0sPemgnsISlMtAhHorIA.webp": "shop/aperture-ui-kit/03.webp",
  "shop/Aperture_UI_Kit/imgi_155_KgOypCdRLCCFT3L5RYk8iCeGg.webp": "shop/aperture-ui-kit/04.webp",
};

// Dead files (imported but unused) — delete instead of moving.
const DELETE = ["edu-sync/image7.webp", "edu-sync/map-image.webp"];

const PRODUCTS_FOLDERS = {
  '"Cap_001"': '"cap-001"',
  '"T-Shirt_001"': '"tee-001"',
  '"Aperture_UI_Kit"': '"aperture-ui-kit"',
};

// 1) Move files
for (const [from, to] of Object.entries(MOVES)) {
  const src = A(from), dst = A(to);
  if (!(await exists(src))) { console.log(`!! missing source: ${from}`); continue; }
  await mkdir(dirname(dst), { recursive: true });
  await rename(src, dst);
}
console.log(`moved ${Object.keys(MOVES).length} files`);

// 2) Delete dead files
for (const d of DELETE) { if (await exists(A(d))) await rm(A(d)); }
console.log(`deleted ${DELETE.length} dead files`);

// 3) Rewrite import paths across all source files
async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}
let rewrites = 0;
for await (const file of walk(SRC)) {
  if (![".ts", ".tsx"].includes(extname(file))) continue;
  let src = await readFile(file, "utf8");
  let changed = false;
  for (const [from, to] of Object.entries(MOVES)) {
    const a = `assets/${from}`, b = `assets/${to}`;
    if (src.includes(a)) { src = src.split(a).join(b); changed = true; rewrites++; }
  }
  // products.ts folder fields
  if (file.endsWith("products.ts")) {
    for (const [from, to] of Object.entries(PRODUCTS_FOLDERS)) {
      if (src.includes(from)) { src = src.split(from).join(to); changed = true; }
    }
  }
  if (changed) await writeFile(file, src);
}
console.log(`rewrote ${rewrites} import paths`);

// 4) Remove now-empty old dirs
for (const d of ["logo", "edu-sync", "suno", "midjourney", "uber", "upwork", "nike", "modular", "headspace", "shop/Cap_001", "shop/T-Shirt_001", "shop/Aperture_UI_Kit"]) {
  try { await rm(A(d), { recursive: false }); } catch { /* not empty / gone */ }
}
console.log("done");
