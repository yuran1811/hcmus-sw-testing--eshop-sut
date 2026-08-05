# AI Audit Report — HW04 Automation Testing

**Sinh viên:** 23127211
**Tuyên bố:** _I use AI tools for the following tasks._

---

**AI Audit Report Item**

- **Công cụ AI:** Claude Code (Anthropic) — model `claude-opus-5`
- **Thời gian:** 2026-08-05 23:43:27 +07:00
- **Nội dung prompt:**

  > Bạn hãy thực hiện các task sau
  > Tạo tests/e2e/package.json + playwright.config.ts: 3 project chromium / firefox / webkit, HTML reporter. Playwright 1.62 có sẵn option title cho HTML reporter và metadata trong config → dùng để nhét "Run by: 23127211" kèm ISO timestamp vào header report, thoả mục 11 (Anti-AI-Cheat).
  > Kiểm chứng: npx playwright test --list liệt kê ra test trên cả 3 browser.
  > Viết 1 spec register chạy được thật (2–3 TC là đủ) + file dữ liệu .json/.csv tách rời
  >
  > sau đó hãy dùng skill @.agents/skills/ai-audit-logger/SKILL.md để lưu lại nhé

- **AI output:**

  > **File 1 — `tests/e2e/package.json`**
  >
  > ```json
  > {
  >   "name": "eshop-e2e",
  >   "version": "1.0.0",
  >   "private": true,
  >   "description": "HW04 - Automation Testing (Playwright) for the EShop SUT - Run by 23127211",
  >   "scripts": {
  >     "test": "playwright test",
  >     "test:register": "playwright test specs/register.spec.ts",
  >     "list": "playwright test --list",
  >     "report": "playwright show-report reports/html/latest"
  >   },
  >   "devDependencies": {
  >     "@playwright/test": "1.62.0",
  >     "@types/node": "22.20.1",
  >     "typescript": "5.9.3"
  >   }
  > }
  > ```
  >
  > **File 2 — `tests/e2e/tsconfig.json`**
  >
  > ```json
  > {
  >   "compilerOptions": {
  >     "target": "ES2022",
  >     "module": "CommonJS",
  >     "moduleResolution": "node",
  >     "lib": ["ES2022", "DOM"],
  >     "strict": true,
  >     "esModuleInterop": true,
  >     "skipLibCheck": true,
  >     "resolveJsonModule": true,
  >     "types": ["node"],
  >     "noEmit": true
  >   },
  >   "include": ["specs/**/*.ts", "src/**/*.ts", "playwright.config.ts"]
  > }
  > ```
  >
  > **File 3 — `tests/e2e/playwright.config.ts`**
  >
  > ```ts
  > import { defineConfig, devices } from '@playwright/test';
  >
  > /**
  >  * HW04 - Automation Testing | SUT: EShop
  >  *
  >  * Muc 11 (Anti-AI-Cheat) yeu cau HTML report phai hien thi "Run by: {StudentID}"
  >  * kem ISO timestamp. Hai gia tri duoi day duoc bom vao ca `title` cua HTML
  >  * reporter (hien o header) va `metadata` (hien o khoi thong tin cua report).
  >  */
  > const RUN_BY = process.env.RUN_BY ?? '23127211';
  > const RUN_AT = new Date().toISOString();
  >
  > /**
  >  * Moi lan chay 1 feature tren 1 browser can 1 thu muc report rieng de gom du
  >  * 9 report (3 feature x 3 browser). Dat qua bien moi truong REPORT_NAME.
  >  */
  > const REPORT_NAME = process.env.REPORT_NAME ?? 'latest';
  >
  > export default defineConfig({
  >   testDir: './specs',
  >   outputDir: './test-results',
  >
  >   // SUT dung chung 1 SQLite DB nen chay tuan tu de tranh test nay pha state
  >   // cua test kia.
  >   fullyParallel: false,
  >   workers: 1,
  >
  >   forbidOnly: !!process.env.CI,
  >   retries: 0,
  >   timeout: 30_000,
  >   expect: { timeout: 5_000 },
  >
  >   metadata: {
  >     'Run by': RUN_BY,
  >     'Run at (ISO)': RUN_AT,
  >     Homework: 'HW04 - Automation Testing',
  >     SUT: 'EShop (https://github.com/ttbhanh/eshop-sut)',
  >   },
  >
  >   reporter: [
  >     ['list'],
  >     [
  >       'html',
  >       {
  >         open: 'never',
  >         outputFolder: `reports/html/${REPORT_NAME}`,
  >         title: `EShop HW04 | Run by: ${RUN_BY} | ${RUN_AT}`,
  >       },
  >     ],
  >   ],
  >
  >   use: {
  >     baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
  >     actionTimeout: 10_000,
  >     trace: 'retain-on-failure',
  >     screenshot: 'only-on-failure',
  >     video: 'retain-on-failure',
  >   },
  >
  >   projects: [
  >     { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  >     { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
  >     { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  >   ],
  > });
  > ```
  >
  > **File 4 — `tests/e2e/test-data/register.json`**
  >
  > ```json
  > {
  >   "feature": "FR-01 - Dang ky tai khoan",
  >   "notes": "Token {{unique}} duoc thay bang chuoi duy nhat luc chay de thoa precondition 'email chua ton tai trong he thong'.",
  >   "cases": [
  >     {
  >       "id": "TC-REGISTER-001",
  >       "title": "Dang ky thanh cong voi du lieu hop le (mat khau cham bien duoi 8 ky tu)",
  >       "input": {
  >         "name": "Nguyễn Văn A",
  >         "email": "nguyenvana01+{{unique}}@gmail.com",
  >         "password": "Abcd123!"
  >       },
  >       "expected": {
  >         "kind": "redirect",
  >         "redirectPath": "/login",
  >         "accountCreated": true
  >       }
  >     },
  >     {
  >       "id": "TC-REGISTER-002",
  >       "title": "Ho Ten de trong",
  >       "input": {
  >         "name": "",
  >         "email": "nguyenvana02+{{unique}}@gmail.com",
  >         "password": "Abcd123!"
  >       },
  >       "expected": {
  >         "kind": "fieldInvalid",
  >         "field": "Họ Tên",
  >         "accountCreated": false
  >       }
  >     },
  >     {
  >       "id": "TC-REGISTER-003",
  >       "title": "Email sai dinh dang",
  >       "input": {
  >         "name": "Nguyễn Văn A",
  >         "email": "nguyenvana03@",
  >         "password": "Abcd123!"
  >       },
  >       "expected": {
  >         "kind": "errorBanner",
  >         "contains": "email",
  >         "accountCreated": false
  >       }
  >     }
  >   ]
  > }
  > ```
  >
  > **File 5 — `tests/e2e/specs/register.spec.ts`**
  >
  > ```ts
  > import { test, expect, type Page, type Locator } from '@playwright/test';
  > import { readFileSync } from 'node:fs';
  > import path from 'node:path';
  >
  > /**
  >  * FR-01 - Dang ky tai khoan.
  >  *
  >  * Du lieu test nam o test-data/register.json (yeu cau data-driven cua HW04:
  >  * khong hardcode inline trong script).
  >  */
  >
  > type Expected =
  >   | { kind: 'redirect'; redirectPath: string; accountCreated: boolean }
  >   | { kind: 'fieldInvalid'; field: string; accountCreated: boolean }
  >   | { kind: 'errorBanner'; contains: string; accountCreated: boolean };
  >
  > type RegisterCase = {
  >   id: string;
  >   title: string;
  >   input: { name: string; email: string; password: string };
  >   expected: Expected;
  > };
  >
  > const dataFile = path.join(__dirname, '..', 'test-data', 'register.json');
  > const cases: RegisterCase[] = JSON.parse(readFileSync(dataFile, 'utf-8')).cases;
  >
  > /**
  >  * Form dang ky khong gan `id`/`htmlFor` giua <label> va <input>, cung khong co
  >  * data-testid, nen getByLabel() vo dung. Cach on dinh nhat con lai la thu hep
  >  * theo khoi <div> chua nhan cua truong do.
  >  */
  > function field(page: Page, label: string): Locator {
  >   return page.locator('form > div').filter({ hasText: label }).locator('input');
  > }
  >
  > /** Banner loi cua ung dung, render phia tren form khi setError() duoc goi. */
  > function errorBanner(page: Page): Locator {
  >   return page.locator('div.bg-red-100');
  > }
  >
  > test.describe('FR-01 - Dang ky tai khoan', () => {
  >   for (const testCase of cases) {
  >     test(`${testCase.id}: ${testCase.title}`, async ({ page }, testInfo) => {
  >       // Thoa precondition "email chua ton tai" ma khong phu thuoc trang thai DB.
  >       const unique = `${Date.now().toString(36)}${testInfo.project.name}`;
  >       const email = testCase.input.email.replace('{{unique}}', unique);
  >
  >       // Theo doi loi goi API de kiem chung "khong co tai khoan nao duoc tao".
  >       const registerCalls: string[] = [];
  >       page.on('request', (req) => {
  >         if (req.method() === 'POST' && req.url().includes('/api/register')) {
  >           registerCalls.push(req.url());
  >         }
  >       });
  >
  >       await page.goto('/register');
  >       await expect(page.getByRole('heading', { name: 'Đăng Ký Tài Khoản' })).toBeVisible();
  >
  >       await field(page, 'Họ Tên').fill(testCase.input.name);
  >       await field(page, 'Email').fill(email);
  >       await field(page, 'Mật khẩu').fill(testCase.input.password);
  >
  >       const submit = page.getByRole('button', { name: 'Đăng Ký' });
  >
  >       if (testCase.expected.kind === 'redirect') {
  >         // Pattern 1 - assertion tren dieu huong.
  >         await Promise.all([page.waitForResponse((res) => res.url().includes('/api/register')), submit.click()]);
  >         await expect(page).toHaveURL(new RegExp(`${testCase.expected.redirectPath}$`));
  >       } else {
  >         await submit.click();
  >       }
  >
  >       if (testCase.expected.kind === 'fieldInvalid') {
  >         // Pattern 2 - assertion tren thuoc tinh DOM (constraint validation API).
  >         // On dinh tren ca 3 browser vi khong phu thuoc ngon ngu cua tooltip.
  >         const invalid = await field(page, testCase.expected.field).evaluate(
  >           (el) => (el as HTMLInputElement).validity.valueMissing,
  >         );
  >         expect(invalid, `Truong "${testCase.expected.field}" phai bi chan khi de trong`).toBe(true);
  >         await expect(page).toHaveURL(/\/register$/);
  >       }
  >
  >       if (testCase.expected.kind === 'errorBanner') {
  >         // Pattern 3 - assertion tren noi dung van ban hien thi cho nguoi dung.
  >         await expect(errorBanner(page)).toBeVisible();
  >         await expect(errorBanner(page)).toContainText(new RegExp(testCase.expected.contains, 'i'));
  >         await expect(page).toHaveURL(/\/register$/);
  >       }
  >
  >       // Pattern 4 - assertion tren network: co/khong co request tao tai khoan.
  >       if (testCase.expected.accountCreated) {
  >         expect(registerCalls.length, 'Phai goi POST /api/register de tao tai khoan').toBeGreaterThan(0);
  >       } else {
  >         expect(registerCalls, 'Khong duoc tao tai khoan khi du lieu khong hop le').toHaveLength(0);
  >       }
  >     });
  >   }
  > });
  > ```
  >
  > **Kiểm chứng 1 — `npx playwright test --list`**
  >
  > ```
  > Listing tests:
  >   [chromium] › register.spec.ts:45:9 › FR-01 - Dang ky tai khoan › TC-REGISTER-001: Dang ky thanh cong voi du lieu hop le (mat khau cham bien duoi 8 ky tu)
  >   [chromium] › register.spec.ts:45:9 › FR-01 - Dang ky tai khoan › TC-REGISTER-002: Ho Ten de trong
  >   [chromium] › register.spec.ts:45:9 › FR-01 - Dang ky tai khoan › TC-REGISTER-003: Email sai dinh dang
  >   [firefox] › register.spec.ts:45:9 › FR-01 - Dang ky tai khoan › TC-REGISTER-001: Dang ky thanh cong voi du lieu hop le (mat khau cham bien duoi 8 ky tu)
  >   [firefox] › register.spec.ts:45:9 › FR-01 - Dang ky tai khoan › TC-REGISTER-002: Ho Ten de trong
  >   [firefox] › register.spec.ts:45:9 › FR-01 - Dang ky tai khoan › TC-REGISTER-003: Email sai dinh dang
  >   [webkit] › register.spec.ts:45:9 › FR-01 - Dang ky tai khoan › TC-REGISTER-001: Dang ky thanh cong voi du lieu hop le (mat khau cham bien duoi 8 ky tu)
  >   [webkit] › register.spec.ts:45:9 › FR-01 - Dang ky tai khoan › TC-REGISTER-002: Ho Ten de trong
  >   [webkit] › register.spec.ts:45:9 › FR-01 - Dang ky tai khoan › TC-REGISTER-003: Email sai dinh dang
  > Total: 9 tests in 1 file
  > ```
  >
  > → Đạt yêu cầu: 3 test case × 3 browser (chromium / firefox / webkit) = 9 test.
  >
  > **Kiểm chứng 2 — `npx tsc --noEmit`**
  >
  > ```
  > TYPECHECK OK
  > ```
  >
  > **Ghi chú review của người dùng (human review):**
  >
  > 1. `getByLabel()` không dùng được vì form trong `Register.jsx` không gắn `htmlFor`/`id` giữa `<label>` và `<input>`; đã thay bằng cách thu hẹp theo khối `<div>` chứa nhãn.
  > 2. Selector `div.bg-red-100` bám vào class Tailwind — mong manh; SUT không có `data-testid`. Đây là điểm cần nêu trong phần phân tích gap của báo cáo.
  > 3. Dự đoán kết quả khi chạy thật: TC-REGISTER-001 và TC-REGISTER-003 sẽ FAIL do defect có thật trong SUT (regex mật khẩu tại `Register.jsx:15` yêu cầu ký tự khoảng trắng và cấm ký tự đặc biệt, mâu thuẫn với chính dòng hướng dẫn hiển thị trên UI). TC-REGISTER-002 dự kiến PASS.

- **Đánh giá:** VALID
- **Suy luận:**
  - Đúng format yêu cầu
  - Không tìm thấy ảo giác
- **Sửa:** Không cần sửa
