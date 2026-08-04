# Playwright: Data-driven, đa trình duyệt, và báo cáo HTML gắn mã số sinh viên

## 1. Cấu trúc thư mục đề xuất

```
eshop-automation/
├── playwright.config.ts
├── package.json
├── pages/
│   ├── LoginPage.ts
│   ├── CartPage.ts
│   └── AdminProductPage.ts
├── tests/
│   ├── auth/login.spec.ts
│   ├── cart/cart.spec.ts
│   └── admin/product-crud.spec.ts
├── data/
│   ├── login.json
│   ├── cart.csv
│   └── product-crud.json
└── playwright-report/        (tự sinh sau khi chạy)
```

## 2. Đọc dữ liệu test từ JSON

```ts
// data/login.json
[
  { "id": "TC-01", "email": "user1@eshop.vn", "password": "Passw0rd!", "expected": "success" },
  { "id": "TC-02", "email": "user1@eshop.vn", "password": "wrong", "expected": "Sai thông tin đăng nhập" },
  { "id": "TC-03", "email": "not-an-email", "password": "x", "expected": "Email không hợp lệ" }
]
```

```ts
// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import testData from '../../data/login.json';

for (const tc of testData) {
  test(`${tc.id} - đăng nhập với ${tc.email}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(tc.email, tc.password);

    if (tc.expected === 'success') {
      await expect(page).toHaveURL(/\/home/);                 // pattern 1: URL assertion
    } else {
      await expect(loginPage.errorMessage).toHaveText(tc.expected); // pattern 2: text assertion
    }
  });
}
```

## 3. Đọc dữ liệu test từ CSV

```ts
// utils/readCsv.ts
import fs from 'fs';
import { parse } from 'csv-parse/sync';

export function readCsv<T = Record<string, string>>(path: string): T[] {
  const content = fs.readFileSync(path, 'utf-8');
  return parse(content, { columns: true, skip_empty_lines: true });
}
```

```ts
// tests/cart/cart.spec.ts
import { test, expect } from '@playwright/test';
import { readCsv } from '../../utils/readCsv';

const cartData = readCsv<{ id: string; qty: string; stock: string; expected: string }>(
  'data/cart.csv'
);

for (const tc of cartData) {
  test(`${tc.id} - thêm ${tc.qty} sản phẩm vào giỏ`, async ({ page, request }) => {
    // ... thao tác UI thêm vào giỏ ...

    // pattern 3: assertion trên phản hồi mạng / API
    const response = await request.get('/api/cart');
    expect(response.status()).toBe(200);

    if (tc.expected === 'ok') {
      await expect(page.getByTestId('cart-count')).toHaveText(tc.qty); // pattern 2
    } else {
      await expect(page.getByRole('alert')).toBeVisible();             // pattern 1
    }
  });
}
```

Cài `csv-parse`: `npm install csv-parse --save-dev`.

## 4. Ba+ kiểu assertion pattern để phối hợp trong toàn bộ suite

| # | Loại | Ví dụ API | Dùng khi |
|---|---|---|---|
| 1 | Trạng thái/thuộc tính phần tử | `toBeVisible()`, `toBeDisabled()`, `toBeChecked()` | Kiểm tra UI hiện/ẩn, khóa nút, checkbox |
| 2 | Nội dung/giá trị | `toHaveText()`, `toHaveValue()`, `toContainText()` | Kiểm tra thông báo lỗi, số lượng giỏ hàng |
| 3 | Điều hướng/URL | `toHaveURL()` | Kiểm tra redirect sau login/checkout |
| 4 | Mạng/API | `expect(response.status()).toBe(200)`, `expect(await response.json()).toMatchObject(...)` | Kiểm tra phản hồi backend thực sự đổi trạng thái |
| 5 | Số lượng/đếm phần tử | `toHaveCount()` | Kiểm tra số dòng trong bảng admin sau CRUD |
| 6 | Soft assertion | `expect.soft(locator).toHaveText(...)` | Khi muốn tiếp tục kiểm tra nhiều điều kiện dù 1 cái fail |

Chỉ cần dùng **ít nhất 3 loại khác nhau** trong toàn bộ script của 1 tính năng (không bắt
buộc mỗi test phải đủ 3 loại).

## 5. Cấu hình đa trình duyệt (playwright.config.ts)

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  // Metadata này sẽ được Playwright HTML reporter hiển thị ở phần header/report info
  metadata: {
    'Run by': '25127001',                 // <-- thay bằng MSSV thật của bạn
    'Run at': new Date().toISOString(),   // ISO timestamp bắt buộc theo đề bài
    'SUT': 'EShop e-commerce demo',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

Chạy `npx playwright test` sẽ tự động chạy toàn bộ test trên cả 3 project (3 trình
duyệt). Với 3 tính năng × 3 trình duyệt = tối thiểu 9 lượt chạy, đúng yêu cầu đề bài.
Chạy riêng 1 trình duyệt: `npx playwright test --project=firefox`.

> Playwright ghi báo cáo mặc định vào thư mục `playwright-report/`; có thể đổi bằng biến
> môi trường `PLAYWRIGHT_HTML_OUTPUT_DIR` hoặc option `outputFolder` của reporter `html`.

## 6. Đảm bảo "Run by: {StudentID}" hiển thị TRONG report

Cách đơn giản nhất (dùng field `metadata` ở trên) sẽ hiển thị ở khu vực thông tin report
khi mở `playwright-report/index.html`. Nếu muốn chắc chắn dòng chữ xuất hiện y nguyên dạng
`"Run by: {StudentID}"`, thêm annotation vào từng test hoặc dùng title tùy biến:

```ts
// Thêm vào đầu playwright.config.ts hoặc 1 global-setup.ts
process.env.PW_TEST_HTML_REPORT_TITLE = `EShop Automation — Run by: 25127001 — ${new Date().toISOString()}`;
```

Nếu dùng **Allure** thay vì Playwright HTML reporter:

```bash
npm install -D allure-playwright
```

```ts
// playwright.config.ts
reporter: [
  ['list'],
  ['allure-playwright', {
    detail: true,
    environmentInfo: {
      run_by: '25127001',
      run_at: new Date().toISOString(),
      framework: 'Playwright',
    },
  }],
],
```

```bash
npx allure generate ./allure-results --clean -o ./allure-report
npx allure open ./allure-report
```

Allure hiển thị `environmentInfo` ở tab "Environment" của report — đưa `run_by` +
`run_at` vào đó để thỏa yêu cầu "Run by: {StudentID}" + ISO timestamp hiển thị trong
report/metadata.

## 7. Selenium 4+ (nếu chọn Selenium thay vì Playwright)

Selenium không có sẵn multi-browser runner/HTML reporter mạnh như Playwright — cần thêm:
- **Grid/parallel:** dùng `pytest` + `pytest-xdist` (Python) hoặc TestNG parallel (Java) để chạy cùng lúc trên `ChromeDriver`, `GeckoDriver` (Firefox), `EdgeDriver`.
- **Data-driven:** Python `pytest.mark.parametrize` đọc từ JSON/CSV bằng `json.load`/`csv.DictReader`; Java dùng TestNG `@DataProvider`.
- **Report:** `pytest-html` hoặc Allure (`allure-pytest` / `allure-testng`) để có báo cáo HTML tương tự, cũng gắn `run_by` qua `environment.properties`.

## 8. Chạy suite và thu output cho báo cáo

```bash
npx playwright test                                  # chạy toàn bộ 3 trình duyệt
npx playwright show-report                            # mở HTML report
npx playwright test --reporter=html,list --project=chromium --project=firefox --project=webkit
```

Sao chép toàn bộ thư mục `playwright-report/` (hoặc `allure-report/`) vào nộp bài — đây
chính là bằng chứng "9 browser runs" theo đề bài.
