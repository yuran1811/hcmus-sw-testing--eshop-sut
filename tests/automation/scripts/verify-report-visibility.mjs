import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(packageRoot, "../..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(repositoryRoot, "reports/manifests/product-detail.json"), "utf8"),
);
const browser = await chromium.launch();
try {
  for (const cell of manifest.cells) {
    const page = await browser.newPage();
    const indexPath = path.join(repositoryRoot, cell.reportPath, "index.html");
    const label = `Run by: ${manifest.studentId} | Product Detail | ${cell.browser}`;
    await page.goto(pathToFileURL(indexPath).href);
    const banner = page.locator("#student-run-label");
    const visible = await banner.isVisible();
    const exactText = await banner.textContent();
    if (!visible || exactText !== label) {
      throw new Error(`Report label is not visible with exact text in ${indexPath}`);
    }
    console.log(`Verified visible report label: ${cell.browser}`);
    await page.close();
  }
} finally {
  await browser.close();
}
