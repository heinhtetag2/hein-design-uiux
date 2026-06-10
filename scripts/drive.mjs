import { chromium } from "playwright";

const errors = [];
const failed = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message));
page.on("requestfailed", (r) => failed.push(`${r.failure()?.errorText} ${r.url().split("/").pop()}`));
page.on("response", (r) => { if (r.status() >= 400) failed.push(`${r.status()} ${r.url().split("/").pop()}`); });

console.log("→ loading home…");
await page.goto("http://localhost:5173/", { waitUntil: "domcontentloaded", timeout: 30000 });
await page.waitForTimeout(4000);
// Dismiss the first-visit visitor gate if present.
const skip = page.locator("text=Skip for now").first();
if (await skip.count()) { await skip.click(); await page.waitForTimeout(2500); }
await page.screenshot({ path: "/tmp/shot-home.png" });
const heroText = await page.locator("text=intentionally").first().count();
console.log(`  hero 'intentionally' present: ${heroText > 0}`);

// Navigate into a case study via the sidebar (tests lazy chunk + webp images)
console.log("→ navigating to a case study…");
try {
  const link = page.locator("button:visible", { hasText: "EduSync" }).first();
  await link.click({ timeout: 8000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: "/tmp/shot-edusync.png", fullPage: false });
  const impact = await page.locator("text=Immediate disruption").count();
  console.log(`  EduSync view loaded (Immediate disruption present: ${impact > 0})`);
} catch (e) {
  console.log("  nav skipped: " + e.message.split("\n")[0]);
}

// Visit Shop to exercise the glob-loaded product images under renamed folders.
try {
  await page.goto("http://localhost:5173/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);
  const sk = page.locator("text=Skip for now").first();
  if (await sk.count()) { await sk.click(); await page.waitForTimeout(1500); }
  const shopLink = page.locator("button:visible, a:visible", { hasText: /^Shop$/ }).first();
  await shopLink.click({ timeout: 8000 });
  await page.waitForTimeout(2500);
  const imgs = await page.locator("img").evaluateAll((els) =>
    els.filter((i) => i.naturalWidth === 0 && i.currentSrc).map((i) => i.currentSrc.split("/").pop())
  );
  await page.screenshot({ path: "/tmp/shot-shop.png" });
  console.log(`  Shop loaded; broken <img> (naturalWidth 0): ${imgs.length ? imgs.join(", ") : "none"}`);
} catch (e) {
  console.log("  shop nav skipped: " + e.message.split("\n")[0]);
}

console.log("\n=== console errors ===");
console.log(errors.length ? errors.slice(0, 15).join("\n") : "  none");
console.log("=== failed/4xx requests ===");
console.log(failed.length ? [...new Set(failed)].slice(0, 20).join("\n") : "  none");
await browser.close();
