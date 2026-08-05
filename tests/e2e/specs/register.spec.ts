import { test, expect, type Page, type Locator } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * FR-01 - Dang ky tai khoan.
 *
 * Du lieu test nam o test-data/register.json (yeu cau data-driven cua HW04:
 * khong hardcode inline trong script).
 */

type Expected =
  | { kind: 'redirect'; redirectPath: string; accountCreated: boolean }
  | { kind: 'fieldInvalid'; field: string; accountCreated: boolean }
  | { kind: 'errorBanner'; contains: string; accountCreated: boolean };

type RegisterCase = {
  id: string;
  title: string;
  input: { name: string; email: string; password: string };
  expected: Expected;
};

const dataFile = path.join(__dirname, '..', 'test-data', 'register.json');
const cases: RegisterCase[] = JSON.parse(readFileSync(dataFile, 'utf-8')).cases;

/**
 * Form dang ky khong gan `id`/`htmlFor` giua <label> va <input>, cung khong co
 * data-testid, nen getByLabel() vo dung. Cach on dinh nhat con lai la thu hep
 * theo khoi <div> chua nhan cua truong do.
 */
function field(page: Page, label: string): Locator {
  return page.locator('form > div').filter({ hasText: label }).locator('input');
}

/** Banner loi cua ung dung, render phia tren form khi setError() duoc goi. */
function errorBanner(page: Page): Locator {
  return page.locator('div.bg-red-100');
}

test.describe('FR-01 - Dang ky tai khoan', () => {
  for (const testCase of cases) {
    test(`${testCase.id}: ${testCase.title}`, async ({ page }, testInfo) => {
      // Thoa precondition "email chua ton tai" ma khong phu thuoc trang thai DB.
      const unique = `${Date.now().toString(36)}${testInfo.project.name}`;
      const email = testCase.input.email.replace('{{unique}}', unique);

      // Theo doi loi goi API de kiem chung "khong co tai khoan nao duoc tao".
      const registerCalls: string[] = [];
      page.on('request', (req) => {
        if (req.method() === 'POST' && req.url().includes('/api/register')) {
          registerCalls.push(req.url());
        }
      });

      await page.goto('/register');
      await expect(page.getByRole('heading', { name: 'Đăng Ký Tài Khoản' })).toBeVisible();

      await field(page, 'Họ Tên').fill(testCase.input.name);
      await field(page, 'Email').fill(email);
      await field(page, 'Mật khẩu').fill(testCase.input.password);

      const submit = page.getByRole('button', { name: 'Đăng Ký' });

      if (testCase.expected.kind === 'redirect') {
        // Pattern 1 - assertion tren dieu huong.
        await Promise.all([
          page.waitForResponse((res) => res.url().includes('/api/register')),
          submit.click(),
        ]);
        await expect(page).toHaveURL(new RegExp(`${testCase.expected.redirectPath}$`));
      } else {
        await submit.click();
      }

      if (testCase.expected.kind === 'fieldInvalid') {
        // Pattern 2 - assertion tren thuoc tinh DOM (constraint validation API).
        // On dinh tren ca 3 browser vi khong phu thuoc ngon ngu cua tooltip.
        const invalid = await field(page, testCase.expected.field).evaluate(
          (el) => (el as HTMLInputElement).validity.valueMissing,
        );
        expect(invalid, `Truong "${testCase.expected.field}" phai bi chan khi de trong`).toBe(true);
        await expect(page).toHaveURL(/\/register$/);
      }

      if (testCase.expected.kind === 'errorBanner') {
        // Pattern 3 - assertion tren noi dung van ban hien thi cho nguoi dung.
        await expect(errorBanner(page)).toBeVisible();
        await expect(errorBanner(page)).toContainText(
          new RegExp(testCase.expected.contains, 'i'),
        );
        await expect(page).toHaveURL(/\/register$/);
      }

      // Pattern 4 - assertion tren network: co/khong co request tao tai khoan.
      if (testCase.expected.accountCreated) {
        expect(registerCalls.length, 'Phai goi POST /api/register de tao tai khoan').toBeGreaterThan(0);
      } else {
        expect(registerCalls, 'Khong duoc tao tai khoan khi du lieu khong hop le').toHaveLength(0);
      }
    });
  }
});
