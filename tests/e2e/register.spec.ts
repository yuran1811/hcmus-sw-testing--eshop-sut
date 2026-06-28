import { test, expect, Page, Locator } from '@playwright/test';
import sqlite3 from 'sqlite3';
import path from 'path';

/**
 * FR-01 — Đăng ký tài khoản (frontend-web, /register).
 */

const nameInput = (page: Page) => page.locator('label:has-text("Họ Tên") + input');
const emailInput = (page: Page) => page.locator('label:has-text("Email") + input');
const passwordInput = (page: Page) => page.locator('label:has-text("Mật khẩu") + input');
const confirmPasswordInput = (page: Page) => page.locator('label:has-text("Xác nhận mật khẩu") + input');
const submitButton = (page: Page) => page.getByRole('button', { name: 'Đăng Ký' });
const errorBanner = (page: Page) => page.locator('.bg-red-100');

async function fillRegisterForm(page: Page, data: { name?: string; email?: string; password?: string }) {
  if (data.name !== undefined) await nameInput(page).fill(data.name);
  if (data.email !== undefined) await emailInput(page).fill(data.email);
  if (data.password !== undefined) await passwordInput(page).fill(data.password);
}

/** Kiểm tra trường bắt buộc bị bỏ trống có bị chặn submit (qua trạng thái HTML5 validity) hay không. */
async function expectBlockedByRequiredField(page: Page, field: Locator) {
  const isValid = await field.evaluate((el: HTMLInputElement) => el.validity.valid);
  expect(isValid, 'Input phải ở trạng thái invalid (HTML5 required) khi để trống').toBe(false);
  await expect(page).toHaveURL(/\/register$/);
}

function getStoredPassword(email: string): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const dbPath = path.resolve(__dirname, '../../backend/database.sqlite');
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
      if (err) reject(err);
    });
    db.get(
      'SELECT password FROM users WHERE email = ? ORDER BY id DESC LIMIT 1',
      [email],
      (err, row: { password?: string } | undefined) => {
        db.close();
        if (err) return reject(err);
        resolve(row?.password);
      },
    );
  });
}

test.describe('FR-01 Đăng ký tài khoản', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('TC-REGISTER-001: Đăng ký thành công với mật khẩu chạm biên dưới 8 ký tự', async ({ page }) => {
    await fillRegisterForm(page, {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana01@gmail.com',
      password: 'Abcd123!',
    });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test('TC-REGISTER-002: Họ Tên để trống -> chặn submit, không tạo tài khoản', async ({ page }) => {
    await fillRegisterForm(page, { name: '', email: 'nguyenvana02@gmail.com', password: 'Abcd123!' });
    await submitButton(page).click();
    await expectBlockedByRequiredField(page, nameInput(page));
  });

  test('TC-REGISTER-003: Email sai định dạng -> phải bị từ chối theo spec', async ({ page }) => {
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: 'nguyenvana03@', password: 'Abcd123!' });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/register$/);
  });

  test('TC-REGISTER-004: Email đã được đăng ký (trùng) -> không tạo tài khoản trùng', async ({ page }) => {
    // test@eshop.com đã có sẵn trong dữ liệu mẫu của hệ thống.
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: 'test@eshop.com', password: 'Abcd123!' });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(errorBanner(page)).toContainText(/tồn tại/i);
  });

  test('TC-REGISTER-005: Email để trống -> chặn submit, không tạo tài khoản', async ({ page }) => {
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: '', password: 'Abcd123!' });
    await submitButton(page).click();
    await expectBlockedByRequiredField(page, emailInput(page));
  });

  test('TC-REGISTER-006: Mật khẩu ít hơn 8 ký tự -> bị chặn', async ({ page }) => {
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: 'nguyenvana06@gmail.com', password: 'Aa1!aa2' });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(errorBanner(page)).toBeVisible();
  });

  test('TC-REGISTER-007: Mật khẩu thiếu chữ hoa -> bị chặn', async ({ page }) => {
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: 'nguyenvana07@gmail.com', password: 'abcd123!' });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(errorBanner(page)).toBeVisible();
  });

  test('TC-REGISTER-008: Mật khẩu thiếu chữ thường -> bị chặn', async ({ page }) => {
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: 'nguyenvana08@gmail.com', password: 'ABCD123!' });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(errorBanner(page)).toBeVisible();
  });

  test('TC-REGISTER-009: Mật khẩu thiếu chữ số -> bị chặn', async ({ page }) => {
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: 'nguyenvana09@gmail.com', password: 'Abcdefg!' });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(errorBanner(page)).toBeVisible();
  });

  test('TC-REGISTER-010: Mật khẩu không có ký tự đặc biệt -> bị chặn', async ({ page }) => {
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: 'nguyenvana10@gmail.com', password: 'Abcd1234' });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(errorBanner(page)).toBeVisible();
  });

  test('TC-REGISTER-011: Ký tự đặc biệt ngoài tập cho phép (#) -> bị chặn', async ({ page }) => {
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: 'nguyenvana11@gmail.com', password: 'Abcd1234#' });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/register$/);
    await expect(errorBanner(page)).toBeVisible();
  });

  test('TC-REGISTER-012: Mật khẩu để trống -> chặn submit, không tạo tài khoản', async ({ page }) => {
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: 'nguyenvana12@gmail.com', password: '' });
    await submitButton(page).click();
    await expectBlockedByRequiredField(page, passwordInput(page));
  });

  test('TC-REGISTER-013: Xác nhận mật khẩu không khớp -> không tạo tài khoản', async ({ page }) => {
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: 'nguyenvana13@gmail.com', password: 'Abcd123!' });
    await confirmPasswordInput(page).fill('Abcd123@', { timeout: 5_000 });
    await submitButton(page).click();
    await expect(errorBanner(page)).toContainText(/khớp/i);
  });

  test('TC-REGISTER-014: Xác nhận mật khẩu để trống -> không tạo tài khoản', async ({ page }) => {
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email: 'nguyenvana14@gmail.com', password: 'Abcd123!' });
    const isValid = await confirmPasswordInput(page)
      .evaluate((el: HTMLInputElement) => el.validity.valid, { timeout: 5_000 })
      .catch(() => null);
    expect(isValid, 'Trường Xác nhận mật khẩu phải tồn tại và bị đánh dấu invalid khi trống').toBe(false);
  });

  test('TC-REGISTER-015 [BVA]: Mật khẩu có đúng 1 chữ thường (on-point biên dưới)', async ({ page }) => {
    await fillRegisterForm(page, {
      name: 'Nguyễn Văn A',
      email: 'bva.lower@gmail.com',
      password: 'ABCD12a!',
    });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test('TC-REGISTER-016 [BVA]: Mật khẩu có đúng 1 chữ số (on-point biên dưới)', async ({ page }) => {
    await fillRegisterForm(page, {
      name: 'Nguyễn Văn A',
      email: 'bva.digit@gmail.com',
      password: 'ABCDab1!',
    });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test('TC-REGISTER-017 [SEC-01, white-box]: Mật khẩu phải được hash, không lưu plaintext', async ({ page }) => {
    const email = 'sec01.check@gmail.com';
    const plainPassword = 'Abcd123!';
    await fillRegisterForm(page, { name: 'Nguyễn Văn A', email, password: plainPassword });
    await submitButton(page).click();
    await expect(page).toHaveURL(/\/login$/);

    const storedPassword = await getStoredPassword(email);
    expect(storedPassword, 'Phải có record user vừa đăng ký trong DB').toBeTruthy();
    expect(storedPassword, 'SEC-01: mật khẩu không được lưu plaintext trong CSDL').not.toBe(plainPassword);
    expect(storedPassword, 'Mật khẩu hash hợp lệ phải có prefix bcrypt ($2a$/$2b$/$2y$)').toMatch(/^\$2[aby]\$/);
  });
});
