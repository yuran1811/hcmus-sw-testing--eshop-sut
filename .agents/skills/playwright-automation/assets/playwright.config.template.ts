import { defineConfig, devices } from '@playwright/test';

// Chạy: STUDENT_ID=23127xxx npx playwright test
const STUDENT_ID = process.env.STUDENT_ID ?? 'REPLACE_WITH_STUDENT_ID';
const RUN_STARTED_AT = new Date().toISOString();

export default defineConfig({
  testDir: './tests',

  // Không retry khi chạy lấy bằng chứng cuối — retry che giấu flaky test,
  // mà flaky test lại là dữ liệu cần cho phần gap analysis.
  retries: 0,

  fullyParallel: true,
  // Nếu các ca dùng chung tài khoản và sửa trạng thái, đổi thành:
  // fullyParallel: false, workers: 1,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    // Reporter tự viết để chèn banner "Run by" vào file HTML — xem
    // references/multi-browser-report.md
    ['./reporters/stamp-reporter.ts'],
  ],

  // Hiện ở phần metadata đầu report. Kiểm tra bằng mắt sau khi sinh report,
  // vị trí hiển thị thay đổi theo phiên bản Playwright.
  metadata: {
    'Run by': STUDENT_ID,
    'Started at': RUN_STARTED_AT,
  },

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
    screenshot: 'only-on-failure',   // ảnh này đính kèm thẳng GitHub Issue
    video: 'retain-on-failure',
    trace: 'retain-on-failure',      // mở bằng: npx playwright show-trace
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  // Bỏ comment nếu muốn Playwright tự khởi động SUT trước khi chạy test
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://localhost:5173',
  //   reuseExistingServer: !process.env.CI,
  // },
});
