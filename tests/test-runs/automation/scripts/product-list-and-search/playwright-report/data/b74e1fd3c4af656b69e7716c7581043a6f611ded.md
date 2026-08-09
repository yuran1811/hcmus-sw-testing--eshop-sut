# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: plas-ep.spec.ts >> FR-05 Product List & Search — Equivalence Partitioning >> TC-PLAS-003: Tìm kiếm với từ khóa không tồn tại — hiển thị empty state
- Location: tests\plas-ep.spec.ts:99:7

# Error details

```
Error: Must show empty state message (BUG-PLAS-004)

expect(locator).toBeVisible() failed

Locator: locator('text=Không tìm thấy sản phẩm').or(locator('.empty-state'))
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Must show empty state message (BUG-PLAS-004) with timeout 5000ms
  - waiting for locator('text=Không tìm thấy sản phẩm').or(locator('.empty-state'))

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Danh sách sản phẩm" [level=1]
  - textbox "Tìm kiếm...": NonExistentProduct99999
  - button "Tìm"
  - text: "Kết quả tìm kiếm cho: NonExistentProduct99999"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  6   |  * Student: Mạch Quốc Tấn - 23127115
  7   |  * Assignment: HW04 - Automation Testing
  8   |  *
  9   |  * Assertion patterns used:
  10  |  *   Pattern 1 — Element visibility / state (toBeVisible, not.toBeVisible)
  11  |  *   Pattern 2 — Text / content assertion (toContain, toHaveText)
  12  |  *   Pattern 3 — Soft assertion (expect.soft)
  13  |  *   Pattern 4 — Event / Dialog assertion (XSS prevention)
  14  |  *   Pattern 5 — Count / length assertion (toBe, toBeGreaterThan)
  15  |  */
  16  | 
  17  | import { test, expect } from '@playwright/test';
  18  | import { ProductListPage } from '../pages/ProductListPage';
  19  | import testDataRaw from '../data/plas-test-data.json';
  20  | import { UI_CONSTANTS } from '../../_common/constants';
  21  | 
  22  | // Type assertion for TS safety
  23  | interface TestCase {
  24  |   tc_id: string;
  25  |   description: string;
  26  |   search_keyword?: string;
  27  |   search_keyword_length?: number;
  28  |   expected_count?: number;
  29  |   expected_title?: string;
  30  |   expect_empty_state?: boolean;
  31  |   check_h1?: boolean;
  32  |   check_alt?: boolean;
  33  |   check_price_symbol?: boolean;
  34  |   check_xss_safe?: boolean;
  35  |   check_no_crash?: boolean;
  36  |   use_enter_key?: boolean;
  37  |   then_clear?: boolean;
  38  | }
  39  | 
  40  | const testData = testDataRaw as { test_cases: TestCase[] };
  41  | 
  42  | test.describe('FR-05 Product List & Search — Equivalence Partitioning', () => {
  43  | 
  44  |   let plasPage: ProductListPage;
  45  | 
  46  |   test.beforeEach(async ({ page }) => {
  47  |     plasPage = new ProductListPage(page);
  48  |     await plasPage.goto();
  49  |   });
  50  | 
  51  |   // ──────────────────────────────────────────────────────────────────────────
  52  |   // TC-PLAS-001: Xem toàn bộ danh sách sản phẩm thành công khi search rỗng
  53  |   // ──────────────────────────────────────────────────────────────────────────
  54  |   test('TC-PLAS-001: Xem toàn bộ danh sách sản phẩm thành công khi search rỗng', async () => {
  55  |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-001')!;
  56  |     const productCount = await plasPage.getProductCount();
  57  |     expect(productCount).toBe(tc.expected_count);
  58  | 
  59  |     const h1Count = await plasPage.getH1Count();
  60  |     expect.soft(h1Count, 'FR-05 requires exactly 1 <h1> tag on page (BUG-PLAS-001)').toBe(UI_CONSTANTS.EXPECTED_H1_COUNT);
  61  | 
  62  |     const imageAlts = await plasPage.getProductImagesAlt();
  63  |     for (const alt of imageAlts) {
  64  |       expect.soft(alt && alt.trim().length > 0, 'Image must have non-empty alt text (BUG-PLAS-002)').toBeTruthy();
  65  |     }
  66  | 
  67  |     const prices = await plasPage.getProductPrices();
  68  |     for (const price of prices) {
  69  |       expect.soft(price.includes(UI_CONSTANTS.CURRENCY_SYMBOL), 'Price must display ₫ symbol (BUG-PLAS-003)').toBeTruthy();
  70  |     }
  71  |   });
  72  | 
  73  |   // ──────────────────────────────────────────────────────────────────────────
  74  |   // TC-PLAS-002: Tìm kiếm sản phẩm theo tên chính xác hợp lệ
  75  |   // ──────────────────────────────────────────────────────────────────────────
  76  |   test('TC-PLAS-002: Tìm kiếm sản phẩm theo tên chính xác hợp lệ', async () => {
  77  |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-002')!;
  78  |     await plasPage.search(tc.search_keyword!);
  79  | 
  80  |     const count = await plasPage.getProductCount();
  81  |     expect(count).toBe(tc.expected_count);
  82  | 
  83  |     const titles = await plasPage.getProductTitles();
  84  |     expect(titles[0]).toContain(tc.expected_title!);
  85  | 
  86  |     const h1Count = await plasPage.getH1Count();
  87  |     expect(h1Count).toBe(UI_CONSTANTS.EXPECTED_H1_COUNT);
  88  | 
  89  |     const alts = await plasPage.getProductImagesAlt();
  90  |     expect(alts[0]).toBeTruthy();
  91  | 
  92  |     const prices = await plasPage.getProductPrices();
  93  |     expect(prices[0]).toContain(UI_CONSTANTS.CURRENCY_SYMBOL);
  94  |   });
  95  | 
  96  |   // ──────────────────────────────────────────────────────────────────────────
  97  |   // TC-PLAS-003: Tìm kiếm với từ khóa không tồn tại
  98  |   // ──────────────────────────────────────────────────────────────────────────
  99  |   test('TC-PLAS-003: Tìm kiếm với từ khóa không tồn tại — hiển thị empty state', async () => {
  100 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-003')!;
  101 |     await plasPage.search(tc.search_keyword!);
  102 | 
  103 |     const count = await plasPage.getProductCount();
  104 |     expect(count).toBe(tc.expected_count);
  105 | 
> 106 |     await expect.soft(plasPage.emptyStateText, 'Must show empty state message (BUG-PLAS-004)').toBeVisible();
      |                                                                                                ^ Error: Must show empty state message (BUG-PLAS-004)
  107 |   });
  108 | 
  109 |   // ──────────────────────────────────────────────────────────────────────────
  110 |   // TC-PLAS-004: Tìm kiếm từ khóa Tiếng Việt có dấu
  111 |   // ──────────────────────────────────────────────────────────────────────────
  112 |   test('TC-PLAS-004: Tìm kiếm từ khóa Tiếng Việt có dấu', async () => {
  113 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-004')!;
  114 |     await plasPage.search(tc.search_keyword!);
  115 | 
  116 |     const count = await plasPage.getProductCount();
  117 |     expect(count).toBe(tc.expected_count);
  118 | 
  119 |     const titles = await plasPage.getProductTitles();
  120 |     expect(titles[0]).toContain(tc.expected_title!);
  121 | 
  122 |     const h1Count = await plasPage.getH1Count();
  123 |     expect(h1Count).toBe(UI_CONSTANTS.EXPECTED_H1_COUNT);
  124 | 
  125 |     const alts = await plasPage.getProductImagesAlt();
  126 |     expect(alts[0]).toBeTruthy();
  127 | 
  128 |     const prices = await plasPage.getProductPrices();
  129 |     expect(prices[0]).toContain(UI_CONSTANTS.CURRENCY_SYMBOL);
  130 |   });
  131 | 
  132 |   // ──────────────────────────────────────────────────────────────────────────
  133 |   // TC-PLAS-005: Tìm kiếm với mã độc XSS / script HTML
  134 |   // ──────────────────────────────────────────────────────────────────────────
  135 |   test('TC-PLAS-005: Tìm kiếm với mã độc XSS / script HTML — không thực thi script', async ({ page }) => {
  136 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-005')!;
  137 |     let dialogFired = false;
  138 |     page.on('dialog', () => { dialogFired = true; });
  139 | 
  140 |     await plasPage.search(tc.search_keyword!);
  141 | 
  142 |     expect(dialogFired).toBe(false);
  143 |     await expect(page.locator('body')).toBeVisible();
  144 | 
  145 |     const bodyText = await plasPage.getBodyText();
  146 |     for (const keyword of UI_CONSTANTS.DB_ERROR_KEYWORDS) {
  147 |       expect(bodyText).not.toContain(keyword);
  148 |     }
  149 |   });
  150 | 
  151 |   // ──────────────────────────────────────────────────────────────────────────
  152 |   // TC-PLAS-006: Tìm kiếm từ khóa cực dài 300 ký tự A
  153 |   // ──────────────────────────────────────────────────────────────────────────
  154 |   test('TC-PLAS-006: Tìm kiếm từ khóa cực dài 300 ký tự — không crash hệ thống', async ({ page }) => {
  155 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-006') as {
  156 |       tc_id: string;
  157 |       search_keyword_length?: number;
  158 |       search_delay_ms?: number;
  159 |       loading_timeout_ms?: number;
  160 |     };
  161 |     const longKeyword = 'A'.repeat(tc.search_keyword_length!);
  162 |     await page.route('**/api/products?search=*', async route => {
  163 |       await page.waitForTimeout(tc.search_delay_ms!);
  164 |       await route.continue();
  165 |     });
  166 | 
  167 |     await plasPage.searchInput.fill(longKeyword);
  168 |     const loadingPromise = expect(plasPage.loadingIndicator).toBeVisible({ timeout: tc.loading_timeout_ms! });
  169 |     await plasPage.searchButton.click();
  170 |     await loadingPromise;
  171 | 
  172 |     await expect(plasPage.errorBox).not.toBeVisible();
  173 |     await expect(page.locator('body')).toBeVisible();
  174 |   });
  175 | 
  176 |   // ──────────────────────────────────────────────────────────────────────────
  177 |   // TC-PLAS-008: Tìm kiếm không phân biệt hoa thường
  178 |   // ──────────────────────────────────────────────────────────────────────────
  179 |   test('TC-PLAS-008: Tìm kiếm không phân biệt hoa thường (case-insensitive)', async () => {
  180 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-008')!;
  181 |     await plasPage.search(tc.search_keyword!);
  182 | 
  183 |     const count = await plasPage.getProductCount();
  184 |     expect(count).toBe(tc.expected_count);
  185 | 
  186 |     const titles = await plasPage.getProductTitles();
  187 |     expect(titles[0].toLowerCase()).toContain(tc.expected_title!.toLowerCase());
  188 |   });
  189 | 
  190 |   // ──────────────────────────────────────────────────────────────────────────
  191 |   // TC-PLAS-009: Tìm kiếm một phần tên sản phẩm (partial match)
  192 |   // ──────────────────────────────────────────────────────────────────────────
  193 |   test('TC-PLAS-009: Tìm kiếm một phần tên sản phẩm (partial match)', async () => {
  194 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-009')!;
  195 |     await plasPage.search(tc.search_keyword!);
  196 | 
  197 |     const count = await plasPage.getProductCount();
  198 |     expect(count).toBe(tc.expected_count);
  199 | 
  200 |     const titles = await plasPage.getProductTitles();
  201 |     expect(titles[0]).toContain(tc.expected_title!);
  202 |   });
  203 | 
  204 |   // ──────────────────────────────────────────────────────────────────────────
  205 |   // TC-PLAS-010: Tìm kiếm từ khóa có khoảng trắng thừa ở đầu/cuối
  206 |   // ──────────────────────────────────────────────────────────────────────────
```