# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: plas-ui.spec.ts >> FR-05 Product List & Search — UI & Navigation >> TC-PLAS-007: Kiểm tra hiển thị chi tiết thẻ sản phẩm (ảnh, tên, giá)
- Location: tests\plas-ui.spec.ts:33:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 2
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "EShop" [ref=e5]:
      - /url: /
    - navigation [ref=e6]:
      - link "Giỏ hàng" [ref=e7]:
        - /url: /cart
      - link "Đăng nhập" [ref=e8]:
        - /url: /login
      - link "Đăng ký" [ref=e9]:
        - /url: /register
  - main [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e12]:
        - heading "Danh sách sản phẩm" [level=1] [ref=e13]
        - generic [ref=e14]:
          - textbox "Tìm kiếm..." [ref=e15]: Samsung Galaxy S24 Ultra
          - button "Tìm" [ref=e16] [cursor=pointer]
      - generic [ref=e17]: "Kết quả tìm kiếm cho: Samsung Galaxy S24 Ultra"
      - generic [ref=e19]:
        - heading "Samsung Galaxy S24 Ultra" [level=2] [ref=e20]
        - paragraph [ref=e21]: 28,000,000 VND
        - generic [ref=e22]:
          - link "Xem chi tiết" [ref=e23]:
            - /url: /product/2
          - button "Thêm vào giỏ" [ref=e24] [cursor=pointer]
      - heading "Hiển thị 1 sản phẩm" [level=1] [ref=e25]
  - contentinfo [ref=e26]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  1   | /**
  2   |  * Product List & Search UI & Navigation Test Suite (FR-05)
  3   |  * Covers: TC-PLAS-007, 015, 016, 017, 018, 019
  4   |  * Technique: Web UI Layout, Navigation & State Testing
  5   |  *
  6   |  * Student: Mạch Quốc Tấn - 23127115
  7   |  * Assignment: HW04 - Automation Testing
  8   |  *
  9   |  * Assertion patterns used:
  10  |  *   Pattern 1 — Element visibility / state (toBeVisible)
  11  |  *   Pattern 2 — URL / navigation assertion (toContain)
  12  |  *   Pattern 3 — Text / content assertion (toContainText, toBe)
  13  |  *   Pattern 5 — Count / length assertion (toBeGreaterThan)
  14  |  */
  15  | 
  16  | import { test, expect } from '@playwright/test';
  17  | import { ProductListPage } from '../pages/ProductListPage';
  18  | import testData from '../data/plas-test-data.json';
  19  | import { UI_CONSTANTS } from '../../_common/constants';
  20  | 
  21  | test.describe('FR-05 Product List & Search — UI & Navigation', () => {
  22  | 
  23  |   let plasPage: ProductListPage;
  24  | 
  25  |   test.beforeEach(async ({ page }) => {
  26  |     plasPage = new ProductListPage(page);
  27  |     await plasPage.goto();
  28  |   });
  29  | 
  30  |   // ──────────────────────────────────────────────────────────────────────────
  31  |   // TC-PLAS-007: Kiểm tra hiển thị chi tiết thẻ sản phẩm (ảnh, tên, giá)
  32  |   // ──────────────────────────────────────────────────────────────────────────
  33  |   test('TC-PLAS-007: Kiểm tra hiển thị chi tiết thẻ sản phẩm (ảnh, tên, giá)', async () => {
  34  |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-007')!;
  35  |     await plasPage.search(tc.search_keyword!);
  36  | 
  37  |     // [Pattern 5] — Count = 1
  38  |     const count = await plasPage.getProductCount();
  39  |     expect(count).toBe(tc.expected_count);
  40  |     const h1Count = await plasPage.getH1Count();
> 41  |     expect(h1Count).toBe(UI_CONSTANTS.EXPECTED_H1_COUNT);
      |                     ^ Error: expect(received).toBe(expected) // Object.is equality
  42  | 
  43  |     // [Pattern 1] — Product image is visible
  44  |     const image = plasPage.productImages.first();
  45  |     await expect(image).toBeVisible();
  46  |     await expect(image).toHaveAttribute('alt', /.+/);
  47  | 
  48  |     // [Pattern 3] — Title & price check
  49  |     const titles = await plasPage.getProductTitles();
  50  |     expect(titles[0]).toContain(tc.expected_title!);
  51  | 
  52  |     const prices = await plasPage.getProductPrices();
  53  |     expect(prices[0]).toContain(UI_CONSTANTS.CURRENCY_SYMBOL);
  54  |   });
  55  | 
  56  |   // ──────────────────────────────────────────────────────────────────────────
  57  |   // TC-PLAS-015: Kiểm tra nút Xem chi tiết sản phẩm
  58  |   // ──────────────────────────────────────────────────────────────────────────
  59  |   test('TC-PLAS-015: Kiểm tra nút Xem chi tiết sản phẩm — điều hướng đến trang detail', async ({ page }) => {
  60  |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-015')!;
  61  |     await plasPage.search(tc.search_keyword!);
  62  |     expect(await plasPage.getProductCount()).toBeGreaterThan(0);
  63  | 
  64  |     // Click "Xem chi tiết"
  65  |     await plasPage.detailButtons.first().click();
  66  |     await page.waitForLoadState('domcontentloaded');
  67  | 
  68  |     // [Pattern 2] — URL should navigate to /product/:id
  69  |     expect(page.url()).toContain('/product/');
  70  |   });
  71  | 
  72  |   // ──────────────────────────────────────────────────────────────────────────
  73  |   // TC-PLAS-016: Kiểm tra nút Thêm vào giỏ hàng sản phẩm
  74  |   // ──────────────────────────────────────────────────────────────────────────
  75  |   test('TC-PLAS-016: Kiểm tra nút Thêm vào giỏ hàng sản phẩm', async () => {
  76  |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-016')!;
  77  |     await plasPage.search(tc.search_keyword!);
  78  | 
  79  |     // [Pattern 1] — Button is visible and clickable
  80  |     await expect(plasPage.addToCartButtons.first()).toBeVisible();
  81  |     await plasPage.addToCartButtons.first().click();
  82  |   });
  83  | 
  84  |   // ──────────────────────────────────────────────────────────────────────────
  85  |   // TC-PLAS-017: Kiểm tra điều hướng logo EShop về trang chủ
  86  |   // ──────────────────────────────────────────────────────────────────────────
  87  |   test('TC-PLAS-017: Kiểm tra điều hướng logo EShop về trang chủ', async ({ page }) => {
  88  |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-017')!;
  89  |     // Perform search first
  90  |     await plasPage.search(tc.search_keyword!);
  91  | 
  92  |     // [Pattern 1] — Logo link is visible
  93  |     await expect(plasPage.logoLink).toBeVisible();
  94  |     await plasPage.logoLink.click();
  95  |     await page.waitForLoadState('domcontentloaded');
  96  | 
  97  |     // [Pattern 2] — URL back to home page
  98  |     expect(page.url()).toMatch(/\/(#.*)?$/);
  99  |   });
  100 | 
  101 |   // ──────────────────────────────────────────────────────────────────────────
  102 |   // TC-PLAS-018: Kiểm tra hiển thị tổng số sản phẩm bên dưới
  103 |   // ──────────────────────────────────────────────────────────────────────────
  104 |   test('TC-PLAS-018: Kiểm tra hiển thị tổng số sản phẩm bên dưới (Footer count)', async ({ page }) => {
  105 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-018')!;
  106 |     // [Pattern 1] — Footer product count indicator check
  107 |     const footerCount = page.locator(`text=${tc.footer_count_text}`).or(page.locator('h1.text-center.text-gray-400'));
  108 |     await expect(footerCount.first()).toBeVisible();
  109 |   });
  110 | 
  111 |   // ──────────────────────────────────────────────────────────────────────────
  112 |   // TC-PLAS-019: Kiểm tra chỉ báo trạng thái đang tải
  113 |   // ──────────────────────────────────────────────────────────────────────────
  114 |   test('TC-PLAS-019: Kiểm tra chỉ báo trạng thái đang tải — page loads cleanly', async ({ page }) => {
  115 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-019')!;
  116 |     // Reload page and check page loads completely without permanent loading spinners
  117 |     await page.reload();
  118 |     await page.waitForLoadState('domcontentloaded');
  119 | 
  120 |     // [Pattern 1] — Product cards visible after load
  121 |     await expect.poll(async () => await plasPage.getProductCount()).toBeGreaterThan(0);
  122 |   });
  123 | });
  124 | 
```