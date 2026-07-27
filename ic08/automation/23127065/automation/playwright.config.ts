import { defineConfig, devices } from "@playwright/test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const packageRoot = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(packageRoot, "../..");
const browserLabel = process.env.PW_BROWSER ?? "all-browsers";
const studentId = process.env.STUDENT_ID ?? "23127065";
const reportDirectory = process.env.PW_HTML_REPORT_DIR
  ? path.resolve(packageRoot, process.env.PW_HTML_REPORT_DIR)
  : path.join(repositoryRoot, "reports/html/product-detail", browserLabel);
const jsonReportPath = process.env.PW_JSON_REPORT_PATH
  ? path.resolve(packageRoot, process.env.PW_JSON_REPORT_PATH)
  : path.join(repositoryRoot, "reports/results/product-detail", `${browserLabel}.json`);

export default defineConfig({
  testDir: path.join(packageRoot, "specs"),
  outputDir: path.join(repositoryRoot, "reports/artifacts/product-detail", browserLabel),
  fullyParallel: false,
  workers: 1,
  retries: 1,
  timeout: 15_000,
  expect: { timeout: 2_000 },
  reporter: [
    ["list"],
    ["json", { outputFile: jsonReportPath }],
    [
      "html",
      {
        open: "never",
        outputFolder: reportDirectory,
        title: `Run by: ${studentId} | Product Detail | ${browserLabel}`,
      },
    ],
  ],
  use: {
    baseURL: process.env.WEB_BASE_URL ?? "http://127.0.0.1:5173",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "retain-on-failure",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: [
    {
      command: "npm run dev",
      cwd: path.join(repositoryRoot, "backend"),
      url: "http://127.0.0.1:3000/api/products/1",
      reuseExistingServer: true,
      timeout: 60_000,
    },
    {
      command: "npm run dev -- --host 127.0.0.1",
      cwd: path.join(repositoryRoot, "frontend-web"),
      url: "http://127.0.0.1:5173",
      reuseExistingServer: true,
      timeout: 60_000,
    },
  ],
});
