```typescript
import { test, expect } from '@playwright/test';
import { apiRegister } from './utils/api-helpers';

/**
 * FR-LOGIN-01 — Đăng nhập (frontend-web, /login).
 * Đây là suite duy nhất tồn tại trong tests/test-cases/login/ (chỉ có TC-LOGIN-001).
 */

const TEST_USER = { name: 'User Zero One', email: 'user01@gmail.com', password: 'Abc@123456' };

const usernameInput = (page: import('@playwright/test').Page) => page.locator('label:has-text("Username") + input');
const passwordInput = (page: import('@playwright/test').Page) => page.locator('label:has-text("Mật khẩu") + input');
const submitButton = (page: import('@playwright/test').Page) => page.getByRole('button', { name: 'Sign In' });

test.describe('FR-LOGIN-01 Đăng nhập', () => {
  test.beforeAll(async ({ request }) => {
    // Đăng ký qua API để đảm bảo precondition "User đã có tài khoản hợp lệ".
    await apiRegister(request, TEST_USER);
  });

  test('TC-LOGIN-001: Đăng nhập thành công với thông tin hợp lệ', async ({ page }) => {
    await page.goto('/login');
    await usernameInput(page).fill(TEST_USER.email);
    await passwordInput(page).fill(TEST_USER.password);
    await submitButton(page).click();

    await expect(page).toHaveURL('http://localhost:5173/');
    await expect(page.locator('header')).toContainText(`Chào, ${TEST_USER.name}`);
  });
});
```
