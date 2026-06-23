import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const outDir = path.join(os.tmpdir(), "hound-heath-qa-debug");
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:4321", { waitUntil: "networkidle" });

const box = await page.locator(".hero-video").boundingBox();
await page.screenshot({
  path: path.join(outDir, "hero-curve-crop.png"),
  clip: { x: box.x - 80, y: 0, width: 220, height: 900 },
});

const clipPathValue = await page.evaluate(() => getComputedStyle(document.querySelector(".hero-video")).clipPath);
console.log("computed clip-path:", clipPathValue);

await browser.close();
console.log("done", outDir);
