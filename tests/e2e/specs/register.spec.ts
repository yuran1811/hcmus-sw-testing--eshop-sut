import { test, expect, type Page, type Locator } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';

/**
 * FR-01 - Dang ky tai khoan.
 *
 * Du lieu test nam o test-data/register.json (yeu cau data-driven cua HW04:
 * khong hardcode inline trong script). Bo du lieu phu 17/17 test case da
 * thiet ke o tests/test-cases/register/.
 *
 * Ghi chu quan trong (xem "knownIssues" trong register.json de biet chi tiet):
 * - Regex mat khau phia frontend (Register.jsx) yeu cau co khoang trang va
 *   cam moi ky tu dac biet trong tap @$!%*?& - trai voi FR-01. Cac case
 *   "redirect" (001, 015, 016) va case 017 vi vay du kien se FAIL khi chay
 *   that; day la bug that can bao cao, khong sua expected de "lam cho xanh".
 * - Form dang ky khong co truong "Xac nhan mat khau" nen case 013/014 chi
 *   con cach kiem tra field co ton tai hay khong (kind: confirmField).
 * - Case 017 (SEC-01) goi thang API thay vi qua UI, vi UI chan dang ky do
 *   bug regex noi tren.
 */

type Expected =
  | { kind: 'redirect'; redirectPath: string; accountCreated: boolean }
  | { kind: 'fieldInvalid'; field: string; accountCreated: boolean }
  | { kind: 'errorBanner'; contains: string; accountCreated: boolean }
  | { kind: 'confirmField'; accountCreated: boolean }
  | { kind: 'dbHash'; accountCreated: boolean };

type RegisterCase = {
  id: string;
  title: string;
  input: { name: string; email: string; password: string; confirmPassword?: string };
  expected: Expected;
};

const dataFile = path.join(__dirname, '..', 'test-data', 'register.json');
const cases: RegisterCase[] = JSON.parse(readFileSync(dataFile, 'utf-8')).cases;

// Case SEC-01 (dbHash) khong thao tac qua UI nen khong nam trong vong lap chinh.
const uiCases = cases.filter((c) => c.expected.kind !== 'dbHash');
const secCase = cases.find((c) => c.id === 'TC-REGISTER-017')!;

const API_BASE = 'http://localhost:3000';

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
  for (const testCase of uiCases) {
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

      if (testCase.expected.kind === 'confirmField') {
        // FR-01 yeu cau co truong "Xac nhan mat khau"; SUT hien khong co.
        // Kiem tra su ton tai truoc, chua click submit vi field can dien
        // khong co that.
        await expect(
          field(page, 'Xác nhận mật khẩu'),
          `FR-01 yeu cau form dang ky co truong "Xac nhan mat khau" nhung UI hien khong co (case ${testCase.id})`,
        ).toHaveCount(1);
        return;
      }

      if (testCase.expected.kind === 'redirect') {
        // Pattern 1 - assertion tren dieu huong. Dung expect().toHaveURL()
        // (co auto-retry theo config expect.timeout) thay vi waitForResponse
        // de tranh treo het 30s neu request /api/register khong bao gio duoc
        // goi (vi du bi chan boi validation phia client truoc do).
        await submit.click();
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

  test(`${secCase.id}: ${secCase.title}`, async ({ request }, testInfo) => {
    // Khong dung UI duoc: regex mat khau phia frontend chan moi mat khau hop
    // le theo FR-01 (xem ghi chu dau file), nen khong the dang ky thanh cong
    // qua giao dien. Goi thang API - van hop le vi SEC-01 la yeu cau ve tang
    // luu tru backend, khong phai ve UI.
    const unique = `${Date.now().toString(36)}${testInfo.project.name}`;
    const email = secCase.input.email.replace('{{unique}}', unique);

    const registerRes = await request.post(`${API_BASE}/api/register`, {
      data: { name: secCase.input.name, email, password: secCase.input.password },
    });
    expect(registerRes.ok(), 'POST /api/register phai thanh cong de co tai khoan kiem tra').toBeTruthy();

    const loginRes = await request.post(`${API_BASE}/api/login`, {
      data: { email, password: secCase.input.password },
    });
    expect(loginRes.ok(), 'Dang nhap bang tai khoan vua tao phai thanh cong').toBeTruthy();
    const { token } = await loginRes.json();

    const meRes = await request.get(`${API_BASE}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const me = await meRes.json();

    // Pattern 5 - assertion tren du lieu backend (qua API, khong qua DOM).
    expect(
      me.password,
      'SEC-01: truong mat khau tra ve tu backend khong duoc trung voi plaintext da nhap',
    ).not.toBe(secCase.input.password);
    expect(
      me.password,
      'SEC-01: mat khau phai duoc bam (vi du bcrypt co tien to $2a$/$2b$/$2y$)',
    ).toMatch(/^\$2[aby]\$/);
  });
});
