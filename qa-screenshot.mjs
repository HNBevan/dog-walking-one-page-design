import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";
import os from "node:os";

const outDir = path.join(os.tmpdir(), "hound-heath-qa");
mkdirSync(outDir, { recursive: true });

const baseUrl = "http://localhost:4321";

const viewports = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1440, height: 900 },
};

const browser = await chromium.launch();

for (const [name, viewport] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport });
  await page.goto(baseUrl, { waitUntil: "networkidle" });

  await page.screenshot({ path: path.join(outDir, `${name}-hero.png`) });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.25));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, `${name}-about.png`) });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, `${name}-services.png`) });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.65));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, `${name}-area.png`) });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, `${name}-booking.png`) });

  await page.click(".js-open-booking >> nth=0");
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, `${name}-modal.png`) });

  await page.close();
}

await browser.close();
console.log(`Screenshots saved to ${outDir}`);
