import { defineConfig, devices } from '@playwright/test';
import { automationEnv } from '../_common/env';

/**
 * Playwright Test Configuration for Checkout (FR-08)
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: Homework 04 - Automation Testing
 */

process.env.PW_TEST_HTML_REPORT_TITLE = `EShop Checkout Automation — Run by: 23127115 (Mạch Quốc Tấn) — ${new Date().toISOString()}`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false, // Checkout tests must run sequentially to avoid race conditions on shared state
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Sequential: cart & checkout state is user-scoped
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list']
  ],
  metadata: {
    'Student Name': 'Mạch Quốc Tấn',
    'Student ID': '23127115',
    'Run by': 'Run by: 23127115 (Mạch Quốc Tấn)',
    'Course': 'CS423 / CSC15003 - Software Testing',
    'Assignment': 'Homework 04 - Automation Testing',
    'Feature': 'FR-08 Checkout',
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
