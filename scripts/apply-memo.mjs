// Wrap selected always-mounted leaf components in React.memo. Each takes only
// primitive/no props, so memo is safe and skips re-renders triggered by
// unrelated App state changes. Names are preserved for devtools.
import { readFile, writeFile } from "node:fs/promises";

const DIR = new URL("../src/app/components/", import.meta.url).pathname;
const TARGETS = [
  "CustomCursor",
  "VideoBackground",
  "PageTransitionOverlay",
  "CaseStudyHoverBackground",
  "CaseStudyHoverContent",
  "Hero",
];

for (const name of TARGETS) {
  const file = `${DIR}${name}.tsx`;
  let src = await readFile(file, "utf8");
  if (src.includes(`React.memo(function ${name}`)) {
    console.log(`skip ${name} (already memoized)`);
    continue;
  }
  const open = new RegExp(`export function ${name}\\(([\\s\\S]*?)\\)\\s*\\{`);
  const m = src.match(open);
  if (!m) {
    console.log(`!! could not find export for ${name}`);
    continue;
  }
  src = src.replace(open, `export const ${name} = React.memo(function ${name}(${m[1]}) {`);
  // Close the React.memo( call at the component's final brace (EOF).
  src = src.replace(/\}(\s*)$/, "});$1");
  await writeFile(file, src);
  console.log(`memoized ${name}`);
}
