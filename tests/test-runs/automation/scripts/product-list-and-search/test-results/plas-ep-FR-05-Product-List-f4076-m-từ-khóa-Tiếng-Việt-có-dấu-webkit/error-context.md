# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: plas-ep.spec.ts >> FR-05 Product List & Search — Equivalence Partitioning >> TC-PLAS-004: Tìm kiếm từ khóa Tiếng Việt có dấu
- Location: tests\plas-ep.spec.ts:112:7

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
          - textbox "Tìm kiếm..." [ref=e15]: Bàn phím
          - button "Tìm" [ref=e16] [cursor=pointer]
      - generic [ref=e17]: "Kết quả tìm kiếm cho: Bàn phím"
      - generic [ref=e19]:
        - heading "Bàn phím cơ Keychron Q1" [level=2] [ref=e20]
        - paragraph [ref=e21]: 4,000,000 VND
        - generic [ref=e22]:
          - link "Xem chi tiết" [ref=e23]:
            - /url: /product/5
          - button "Thêm vào giỏ" [ref=e24] [cursor=pointer]
      - heading "Hiển thị 1 sản phẩm" [level=1] [ref=e25]
  - contentinfo [ref=e26]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
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
  106 |     await expect.soft(plasPage.emptyStateText, 'Must show empty state message (BUG-PLAS-004)').toBeVisible();
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
> 123 |     expect(h1Count).toBe(UI_CONSTANTS.EXPECTED_H1_COUNT);
      |                     ^ Error: expect(received).toBe(expected) // Object.is equality
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
  207 |   test('TC-PLAS-010: Tìm kiếm từ khóa có khoảng trắng thừa ở đầu/cuối (trimmed)', async () => {
  208 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-010')!;
  209 |     await plasPage.search(tc.search_keyword!);
  210 | 
  211 |     const count = await plasPage.getProductCount();
  212 |     expect(count).toBe(tc.expected_count);
  213 | 
  214 |     const titles = await plasPage.getProductTitles();
  215 |     expect(titles[0]).toContain(tc.expected_title!);
  216 |   });
  217 | 
  218 |   // ──────────────────────────────────────────────────────────────────────────
  219 |   // TC-PLAS-011: Tìm kiếm chỉ chứa khoảng trắng
  220 |   // ──────────────────────────────────────────────────────────────────────────
  221 |   test('TC-PLAS-011: Tìm kiếm chỉ chứa khoảng trắng — trả về toàn bộ 5 sản phẩm', async () => {
  222 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-011')!;
  223 |     await plasPage.search(tc.search_keyword!);
```