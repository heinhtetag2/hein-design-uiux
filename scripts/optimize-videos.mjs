// Re-encode the large background/case-study mp4s in place (same filename, so no
// import changes). All are played muted, so audio is stripped. +faststart moves
// the moov atom to the front for faster web playback start (helps LCP). CRF is
// chosen per clip: the home background is gradient-overlaid so artifacts are
// invisible (28); visible case-study videos stay conservative (24). Only files
// >1MB are touched, and the result is kept only if it is actually smaller.
import { stat, rename, unlink } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import ffmpegPath from "ffmpeg-static";

const run = promisify(execFile);
const A = (p) => new URL(`../src/assets/${p}`, import.meta.url).pathname;

const JOBS = [
  { file: "home/home-bg-video.mp4", crf: 28 },
  { file: "what-i-do/maxon-video.mp4", crf: 26 },
  { file: "edu-sync/edusync-video.mp4", crf: 24 },
];

let before = 0;
let after = 0;
for (const { file, crf } of JOBS) {
  const src = A(file);
  const tmp = src.replace(/\.mp4$/, ".opt.mp4");
  const origSize = (await stat(src)).size;
  await run(ffmpegPath, [
    "-y", "-i", src,
    "-an",                         // drop audio (videos play muted)
    "-c:v", "libx264", "-crf", String(crf), "-preset", "slow",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    tmp,
  ]);
  const newSize = (await stat(tmp)).size;
  before += origSize;
  if (newSize < origSize) {
    await rename(tmp, src);
    after += newSize;
    console.log(`${(origSize / 1048576).toFixed(1)}MB -> ${(newSize / 1048576).toFixed(1)}MB  (-${((1 - newSize / origSize) * 100).toFixed(0)}%)  ${file}`);
  } else {
    await unlink(tmp);
    after += origSize;
    console.log(`kept original (re-encode not smaller)  ${file}`);
  }
}
console.log(`\nvideos: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB  (-${((1 - after / before) * 100).toFixed(0)}%)`);
