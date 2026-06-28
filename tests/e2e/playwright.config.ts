import { defineConfig, devices } from '@playwright/test';

/**
 * EShop SUT — Playwright E2E config.
 * 3 projects vì hệ thống gồm 3 app riêng: frontend-web (khách hàng, :5173),
 * frontend-admin (quản trị, :5174) và backend API (:3000, dùng cho test gọi API trực tiếp).
 * webServer tự khởi động cả 3 nếu chưa chạy sẵn (reuseExistingServer khi dev local).
 */
export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Bắt buộc: code FE gọi Number(...).toLocaleString() KHÔNG truyền locale -> phụ thuộc
    // locale mặc định của Chromium. Set cứng 'vi-VN' để format số (100.000 ₫) luôn nhất quán
    // giữa các máy chạy test, khớp với assertion trong các spec file.
    locale: 'vi-VN',
  },
  projects: [
    {
      name: 'web',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5173' },
      testMatch: ['register.spec.ts', 'login.spec.ts', 'cart.spec.ts'],
    },
    {
      name: 'admin',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:5174' },
      testMatch: ['product/product-ui.spec.ts'],
    },
    {
      name: 'api',
      use: { baseURL: 'http://localhost:3000' },
      testMatch: ['product/product-api.spec.ts'],
    },
    {
      // FR-20: frontend-mobile (Expo/React Native) chạy qua `expo start --web` (Metro web
      // bundler) để render thành web app bình thường -> Playwright thao tác được như web khác.
      name: 'mobile',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:8081' },
      testMatch: ['mobile-login.spec.ts'],
    },
  ],
  webServer: [
    {
      command: 'npm run dev',
      cwd: '../../backend',
      url: 'http://localhost:3000/api/categories',
      reuseExistingServer: true,
      timeout: 30_000,
    },
    {
      command: 'npm run dev',
      cwd: '../../frontend-web',
      url: 'http://localhost:5173',
      reuseExistingServer: true,
      timeout: 30_000,
    },
    {
      command: 'npm run dev',
      cwd: '../../frontend-admin',
      url: 'http://localhost:5174',
      reuseExistingServer: true,
      timeout: 30_000,
    },
    {
      // Metro web bundler khởi động chậm hơn Vite -> timeout dài hơn. Nếu Expo tự đổi sang
      // cổng khác (8081 đang bận), cập nhật lại url/baseURL của project 'mobile' tương ứng.
      command: 'npm run web',
      cwd: '../../frontend-mobile',
      url: 'http://localhost:8081',
      reuseExistingServer: true,
      timeout: 60_000,
    },
  ],
});
