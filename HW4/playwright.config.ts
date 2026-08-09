import { defineConfig, devices } from '@playwright/test';

const feature = process.env.TEST_FEATURE || 'all';
const browserName = process.env.TEST_BROWSER || 'all';
const reportTitle = `Run by: 23127148 | ${feature} | ${browserName}`;
const reportDir = process.env.REPORT_DIR || 'playwright-report';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1, // Sequential execution by default to avoid database race conditions
  reporter: [
    ['html', { 
      outputFolder: reportDir,
      open: 'never',
      title: reportTitle
    }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  testMatch: feature !== 'all' ? `**/${feature}*.spec.ts` : '**/*.spec.ts',
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
