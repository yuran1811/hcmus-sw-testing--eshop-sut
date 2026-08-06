import { defineConfig, devices } from '@playwright/test';
import { readFileSync } from 'fs';
import path from 'path';

const { studentId } = JSON.parse(
  readFileSync(path.join(__dirname, 'student.config.json'), 'utf-8')
);

// Computed once per config load (= once per `playwright test` invocation), so
// the timestamp reflects when this run started — required by HW04 §11
// (Anti-AI-Cheat: HTML report must show "Run by: {StudentID}" + ISO timestamp).
const runStartedAt = new Date().toISOString();
const reportTitle = `Run by: ${studentId} | ${runStartedAt}`;

export default defineConfig({
  testDir: './',
  fullyParallel: false,
  retries: 0,
  // Default (30s) is too tight for FR10/FR18 cases that chain several
  // preAdvance steps (each with its own up-to-10s settle wait) end to end —
  // was causing spurious per-test timeouts under a full 3-browser run.
  timeout: 60_000,
  reporter: [
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
    // Recording video for every one of the many contexts FR10/FR18 open (2
    // per test) added enough overhead in this sandboxed environment to cause
    // spurious per-test timeouts on Chromium/WebKit; trace+screenshot is
    // still enough failure evidence without that cost.
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
