import { defineConfig, devices } from '@playwright/test';

/**
 * HW04 - Automation Testing | SUT: EShop
 *
 * Muc 11 (Anti-AI-Cheat) yeu cau HTML report phai hien thi "Run by: {StudentID}"
 * kem ISO timestamp. Hai gia tri duoi day duoc bom vao ca `title` cua HTML
 * reporter (hien o header) va `metadata` (hien o khoi thong tin cua report).
 */
const RUN_BY = process.env.RUN_BY ?? '23127211';
const RUN_AT = new Date().toISOString();

/**
 * Moi lan chay 1 feature tren 1 browser can 1 thu muc report rieng de gom du
 * 9 report (3 feature x 3 browser). Dat qua bien moi truong REPORT_NAME.
 */
const REPORT_NAME = process.env.REPORT_NAME ?? 'latest';

export default defineConfig({
  testDir: './specs',
  outputDir: './test-results',

  // SUT dung chung 1 SQLite DB nen chay tuan tu de tranh test nay pha state
  // cua test kia.
  fullyParallel: false,
  workers: 1,

  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 5_000 },

  metadata: {
    'Run by': RUN_BY,
    'Run at (ISO)': RUN_AT,
    Homework: 'HW04 - Automation Testing',
    SUT: 'EShop (https://github.com/ttbhanh/eshop-sut)',
  },

  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: `reports/html/${REPORT_NAME}`,
        title: `EShop HW04 | Run by: ${RUN_BY} | ${RUN_AT}`,
      },
    ],
  ],

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
    actionTimeout: 10_000,
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
