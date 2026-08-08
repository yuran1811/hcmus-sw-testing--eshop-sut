// Copy to 23127152-hw4/e2e/playwright.config.ts and adjust baseURL if needed.
//
// Report output is controlled per-run via the REPORT_DIR env var so each
// feature x browser combination gets its own report folder, e.g.:
//   REPORT_DIR=../reports/fr02-login/chromium npx playwright test fr02-login/fr02-login.spec.ts --project=chromium

import { defineConfig, devices } from '@playwright/test';
import { readFileSync } from 'fs';
import path from 'path';

const { studentId } = JSON.parse(
  readFileSync(path.join(__dirname, 'student.config.json'), 'utf-8')
);
const reportTitle = `Run by: ${studentId} | ${new Date().toISOString()}`;

export default defineConfig({
  testDir: './',
  fullyParallel: false,
  retries: 0,
  reporter: [
    // `title` IS a real HtmlReporterOptions field (playwright/lib/runner: HtmlBuilder
    // options.title), but it only surfaces client-side (React sets document.title from
    // a base64-zip blob embedded in index.html) — a plain grep of the file won't find it.
    // Still run scripts/inject-report-banner.js after each report is built so the same
    // "Run by: {studentId} | {ISO timestamp}" also exists as literal text in the file.
    ['html', {
      outputFolder: process.env.REPORT_DIR || 'playwright-report',
      open: 'never',
      title: reportTitle,
    }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
