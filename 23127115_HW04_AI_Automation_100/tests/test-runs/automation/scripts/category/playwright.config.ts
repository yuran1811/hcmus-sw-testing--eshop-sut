import { defineConfig, devices } from '@playwright/test';
import { automationEnv } from '../_common/env';

/**
 * Playwright Test Configuration for Category Management (FR-14)
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: Homework 04 - Automation Testing
 */

process.env.PW_TEST_HTML_REPORT_TITLE = `EShop Category Automation — Run by: 23127115 (Mạch Quốc Tấn) — ${new Date().toISOString()}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,   // Category tests share server state — run sequentially
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,             // 1 worker to avoid race conditions on shared categories table
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  metadata: {
    'Student Name': 'Mạch Quốc Tấn',
    'Student ID': '23127115',
    'Run by': 'Run by: 23127115 (Mạch Quốc Tấn)',
    'Course': 'CS423 / CSC15003 - Software Testing',
    'Assignment': 'Homework 04 - Automation Testing',
    'Feature': 'FR-14 Category Management',
    'Timestamp': new Date().toISOString(),
  },
  use: {
    baseURL: automationEnv.apiBaseUrl,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
