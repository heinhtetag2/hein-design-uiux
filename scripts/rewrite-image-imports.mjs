// Rewrite every PNG/JPG asset import in src to its WebP twin, but only when the
// .webp sibling actually exists. Leaves any non-asset .png references untouched.
import { readdir, readFile, writeFile, access } from "node:fs/promises";
import { join, dirname, resolve, extname } from "node:path";

const SRC = new URL("../src/", import.meta.url).pathname;
const CODE = new Set([".ts", ".tsx"]);
const IMG_IMPORT = /(from\s+["'])([^"']+\.(?:png|jpe?g))(["'])/g;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}
const exists = (p) => access(p).then(() => true).catch(() => false);

let edits = 0;
for await (const file of walk(SRC)) {
  if (!CODE.has(extname(file))) continue;
  const src = await readFile(file, "utf8");
  let changed = false;
  const matches = [...src.matchAll(IMG_IMPORT)];
  let out = src;
  for (const m of matches) {
    const importPath = m[2];
    const webpPath = importPath.replace(/\.(png|jpe?g)$/i, ".webp");
    const abs = resolve(dirname(file), webpPath);
    if (await exists(abs)) {
      out = out.replace(`${m[1]}${m[2]}${m[3]}`, `${m[1]}${webpPath}${m[3]}`);
      changed = true;
      edits++;
    }
  }
  if (changed) await writeFile(file, out);
}
console.log(`Rewrote ${edits} image imports to .webp`);
