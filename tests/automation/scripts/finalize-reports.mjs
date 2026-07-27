import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ensureVisibleReportLabel } from "./report-label.mjs";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(packageRoot, "../..");
const manifestPath = path.join(repositoryRoot, "reports/manifests/product-detail.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

for (const cell of manifest.cells) {
  const label = `Run by: ${manifest.studentId} | Product Detail | ${cell.browser}`;
  const indexPath = path.join(repositoryRoot, cell.reportPath, "index.html");
  cell.labelVerified = ensureVisibleReportLabel(indexPath, label);
  if (!cell.labelVerified) throw new Error(`Could not embed report label in ${indexPath}`);
  console.log(`Verified literal report label: ${cell.browser}`);
}

manifest.overallExitStatus = manifest.cells.some(
  (cell) => cell.exitStatus !== 0 || !cell.labelVerified || cell.counts.total !== 15,
)
  ? 1
  : 0;
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
