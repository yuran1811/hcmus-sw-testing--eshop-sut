import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Test Configuration for Product List & Search (FR-05)
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: Homework 04 - Automation Testing
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
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
    'Timestamp': new Date().toISOString(),
  },
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
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
