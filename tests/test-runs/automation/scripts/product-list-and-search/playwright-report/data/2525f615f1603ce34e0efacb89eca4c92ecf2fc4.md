# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: plas-bva.spec.ts >> FR-05 Product List & Search — BVA (Boundary Value Analysis) >> TC-PLAS-BVA-001: Tìm kiếm từ khóa ở biên dưới hợp lệ
- Location: tests\plas-bva.spec.ts:33:7

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
          - textbox "Tìm kiếm..." [ref=e15]: i
          - button "Tìm" [ref=e16] [cursor=pointer]
      - generic [ref=e17]: "Kết quả tìm kiếm cho: i"
      - generic [ref=e18]:
        - generic [ref=e19]:
          - heading "iPhone 15 Pro Max" [level=2] [ref=e20]
          - paragraph [ref=e21]: 30,000,000 VND
          - generic [ref=e22]:
            - link "Xem chi tiết" [ref=e23]:
              - /url: /product/1
            - button "Thêm vào giỏ" [ref=e24] [cursor=pointer]
        - generic [ref=e25]:
          - heading "Tai nghe AirPods Pro 2" [level=2] [ref=e26]
          - paragraph [ref=e27]: 6,000,000 VND
          - generic [ref=e28]:
            - link "Xem chi tiết" [ref=e29]:
              - /url: /product/4
            - button "Thêm vào giỏ" [ref=e30] [cursor=pointer]
      - heading "Hiển thị 2 sản phẩm" [level=1] [ref=e31]
  - contentinfo [ref=e32]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  1   | /**
  2   |  * Product List & Search BVA Test Suite (FR-05)
  3   |  * Covers: TC-PLAS-BVA-001 to TC-PLAS-BVA-010
  4   |  * Technique: Boundary Value Analysis (3-Point, Robustness Reference)
  5   |  *
  6   |  * Student: Mạch Quốc Tấn - 23127115
  7   |  * Assignment: HW04 - Automation Testing
  8   |  *
  9   |  * Assertion patterns used:
  10  |  *   Pattern 1 — Element visibility / state (not.toBeVisible, toBeVisible)
  11  |  *   Pattern 2 — Text / content matching (toContain)
  12  |  *   Pattern 3 — Soft assertion (expect.soft for characterization/BVA)
  13  |  *   Pattern 5 — Count / length assertion (toBe, toBeGreaterThan)
  14  |  */
  15  | 
  16  | import { test, expect } from '@playwright/test';
  17  | import { ProductListPage } from '../pages/ProductListPage';
  18  | import testData from '../data/plas-test-data.json';
  19  | import { UI_CONSTANTS } from '../../_common/constants';
  20  | 
  21  | test.describe('FR-05 Product List & Search — BVA (Boundary Value Analysis)', () => {
  22  | 
  23  |   let plasPage: ProductListPage;
  24  | 
  25  |   test.beforeEach(async ({ page }) => {
  26  |     plasPage = new ProductListPage(page);
  27  |     await plasPage.goto();
  28  |   });
  29  | 
  30  |   // ──────────────────────────────────────────────────────────────────────────
  31  |   // TC-PLAS-BVA-001: Tìm kiếm từ khóa ở biên dưới hợp lệ
  32  |   // ──────────────────────────────────────────────────────────────────────────
  33  |   test('TC-PLAS-BVA-001: Tìm kiếm từ khóa ở biên dưới hợp lệ', async () => {
  34  |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-001')!;
  35  |     await plasPage.search(tc.search_keyword!);
  36  | 
  37  |     // [Pattern 5] — Count matches the dataset expectation
  38  |     const count = await plasPage.getProductCount();
  39  |     expect(count).toBe(tc.expected_count);
  40  | 
  41  |     // [Pattern 3] — Soft assertion for <h1> tag count
  42  |     const h1Count = await plasPage.getH1Count();
> 43  |     expect.soft(h1Count).toBe(UI_CONSTANTS.EXPECTED_H1_COUNT);
      |                          ^ Error: expect(received).toBe(expected) // Object.is equality
  44  |   });
  45  | 
  46  |   // ──────────────────────────────────────────────────────────────────────────
  47  |   // TC-PLAS-BVA-002: Tìm kiếm từ khóa 255 ký tự (Biên trên mốc R = 255)
  48  |   // ──────────────────────────────────────────────────────────────────────────
  49  |   test('TC-PLAS-BVA-002: Tìm kiếm từ khóa 255 ký tự (Biên trên mốc R = 255)', async ({ page }) => {
  50  |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-002')!;
  51  |     const keyword255 = 'A'.repeat(tc.search_keyword_length!);
  52  |     await plasPage.search(keyword255);
  53  | 
  54  |     // [Pattern 1] — Error box must not appear; page does not crash
  55  |     await expect(plasPage.errorBox).not.toBeVisible();
  56  |     await expect(page.locator('body')).toBeVisible();
  57  |     for (const keyword of UI_CONSTANTS.DB_ERROR_KEYWORDS) {
  58  |       await expect.soft(page.locator('body')).not.toContainText(keyword);
  59  |     }
  60  |     expect(await plasPage.hasHorizontalOverflow()).toBe(false);
  61  | 
  62  |     // [Pattern 5] — Count = 0 (empty state)
  63  |     const count = await plasPage.getProductCount();
  64  |     expect(count).toBe(tc.expected_count ?? 0);
  65  |   });
  66  | 
  67  |   // ──────────────────────────────────────────────────────────────────────────
  68  |   // TC-PLAS-BVA-003: Tìm kiếm từ khóa ở biên trên hợp lệ
  69  |   // ──────────────────────────────────────────────────────────────────────────
  70  |   test('TC-PLAS-BVA-003: Tìm kiếm từ khóa ở biên trên hợp lệ', async ({ page }) => {
  71  |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-003')!;
  72  |     const keyword256 = 'A'.repeat(tc.search_keyword_length!);
  73  |     await plasPage.search(keyword256);
  74  | 
  75  |     // [Pattern 1] — Error box must not appear; page does not crash
  76  |     await expect(plasPage.errorBox).not.toBeVisible();
  77  |     await expect(page.locator('body')).toBeVisible();
  78  |     for (const keyword of UI_CONSTANTS.DB_ERROR_KEYWORDS) {
  79  |       await expect.soft(page.locator('body')).not.toContainText(keyword);
  80  |     }
  81  |     expect(await plasPage.hasHorizontalOverflow()).toBe(false);
  82  |   });
  83  | 
  84  |   // ──────────────────────────────────────────────────────────────────────────
  85  |   // TC-PLAS-BVA-004: Tìm kiếm bằng ký tự đặc biệt SQL Injection
  86  |   // ──────────────────────────────────────────────────────────────────────────
  87  |   test("TC-PLAS-BVA-004: Tìm kiếm bằng ký tự đặc biệt SQL Injection (' OR '1'='1)", async ({ page }) => {
  88  |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-004')!;
  89  |     await plasPage.search(tc.search_keyword!);
  90  | 
  91  |     // [Pattern 1] — No SQL error displayed
  92  |     await expect(plasPage.errorBox).not.toBeVisible();
  93  |     await expect(page.locator('body')).toBeVisible();
  94  |     for (const keyword of UI_CONSTANTS.DB_ERROR_KEYWORDS) {
  95  |       await expect.soft(page.locator('body')).not.toContainText(keyword);
  96  |     }
  97  | 
  98  |     // [Pattern 5] — 0 matching items for exact string payload
  99  |     const count = await plasPage.getProductCount();
  100 |     expect(count).toBe(tc.expected_count);
  101 |   });
  102 | 
  103 |   // ──────────────────────────────────────────────────────────────────────────
  104 |   // TC-PLAS-BVA-005: Kiểm tra duy trì đúng 1 thẻ h1 duy nhất
  105 |   // ──────────────────────────────────────────────────────────────────────────
  106 |   test('TC-PLAS-BVA-005: Kiểm tra duy trì đúng 1 thẻ h1 duy nhất sau khi search', async () => {
  107 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-005')!;
  108 |     await plasPage.search(tc.search_keyword!);
  109 | 
  110 |     // [Pattern 3] — Soft assertion for single <h1> tag requirement (BUG-PLAS-001)
  111 |     const h1Count = await plasPage.getH1Count();
  112 |     expect.soft(h1Count, 'FR-05 requires exactly 1 <h1> tag on page (BUG-PLAS-001)').toBe(UI_CONSTANTS.EXPECTED_H1_COUNT);
  113 |   });
  114 | 
  115 |   // ──────────────────────────────────────────────────────────────────────────
  116 |   // TC-PLAS-BVA-006: Tìm kiếm từ khóa rỗng
  117 |   // ──────────────────────────────────────────────────────────────────────────
  118 |   test('TC-PLAS-BVA-006: Tìm kiếm từ khóa rỗng', async () => {
  119 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-006')!;
  120 |     await plasPage.search(tc.search_keyword!);
  121 | 
  122 |     // [Pattern 5] — Returns all 5 products
  123 |     const count = await plasPage.getProductCount();
  124 |     expect(count).toBe(tc.expected_count);
  125 |   });
  126 | 
  127 |   // ──────────────────────────────────────────────────────────────────────────
  128 |   // TC-PLAS-BVA-007: Tìm kiếm từ khóa ngay trên biên dưới
  129 |   // ──────────────────────────────────────────────────────────────────────────
  130 |   test('TC-PLAS-BVA-007: Tìm kiếm từ khóa ngay trên biên dưới', async () => {
  131 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-007')!;
  132 |     await plasPage.search(tc.search_keyword!);
  133 | 
  134 |     // [Pattern 5] — Matches Samsung Galaxy S24 Ultra
  135 |     const count = await plasPage.getProductCount();
  136 |     expect(count).toBe(tc.expected_count);
  137 | 
  138 |     // [Pattern 2] — Title match
  139 |     const titles = await plasPage.getProductTitles();
  140 |     expect(titles[0]).toContain(tc.expected_title!);
  141 |   });
  142 | 
  143 |   // ──────────────────────────────────────────────────────────────────────────
```