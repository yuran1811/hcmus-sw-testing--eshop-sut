# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: plas-ep.spec.ts >> FR-05 Product List & Search — Equivalence Partitioning >> TC-PLAS-010: Tìm kiếm từ khóa có khoảng trắng thừa ở đầu/cuối (trimmed)
- Location: tests\plas-ep.spec.ts:207:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
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
          - textbox "Tìm kiếm..." [ref=e15]: iPhone 15
          - button "Tìm" [ref=e16] [cursor=pointer]
      - generic [ref=e17]: "Kết quả tìm kiếm cho: iPhone 15"
  - contentinfo [ref=e18]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
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
  207 |   test('TC-PLAS-010: Tìm kiếm từ khóa có khoảng trắng thừa ở đầu/cuối (trimmed)', async () => {
  208 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-010')!;
  209 |     await plasPage.search(tc.search_keyword!);
  210 | 
  211 |     const count = await plasPage.getProductCount();
> 212 |     expect(count).toBe(tc.expected_count);
      |                   ^ Error: expect(received).toBe(expected) // Object.is equality
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
  224 | 
  225 |     const count = await plasPage.getProductCount();
  226 |     expect(count).toBe(tc.expected_count);
  227 |   });
  228 | 
  229 |   // ──────────────────────────────────────────────────────────────────────────
  230 |   // TC-PLAS-012: Nhấn nút Tìm kiếm mà không nhập từ khóa
  231 |   // ──────────────────────────────────────────────────────────────────────────
  232 |   test('TC-PLAS-012: Nhấn nút Tìm kiếm mà không nhập từ khóa', async () => {
  233 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-012')!;
  234 |     await plasPage.search(tc.search_keyword!);
  235 | 
  236 |     const count = await plasPage.getProductCount();
  237 |     expect(count).toBe(tc.expected_count);
  238 |   });
  239 | 
  240 |   // ──────────────────────────────────────────────────────────────────────────
  241 |   // TC-PLAS-013: Nhấn phím Enter trên ô nhập liệu để tìm kiếm
  242 |   // ──────────────────────────────────────────────────────────────────────────
  243 |   test('TC-PLAS-013: Nhấn phím Enter trên ô nhập liệu để tìm kiếm', async () => {
  244 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-013')!;
  245 |     await plasPage.searchByPressingEnter(tc.search_keyword!);
  246 | 
  247 |     const count = await plasPage.getProductCount();
  248 |     expect(count).toBe(tc.expected_count);
  249 | 
  250 |     const titles = await plasPage.getProductTitles();
  251 |     expect(titles[0]).toContain(tc.expected_title!);
  252 |   });
  253 | 
  254 |   // ──────────────────────────────────────────────────────────────────────────
  255 |   // TC-PLAS-014: Kiểm tra khi xóa từ khóa trong ô tìm kiếm và tìm lại
  256 |   // ──────────────────────────────────────────────────────────────────────────
  257 |   test('TC-PLAS-014: Kiểm tra khi xóa từ khóa trong ô tìm kiếm và tìm lại', async () => {
  258 |     const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-014')!;
  259 |     await plasPage.search(tc.search_keyword!);
  260 |     expect(await plasPage.getProductCount()).toBe(1);
  261 | 
  262 |     await plasPage.clearSearch();
  263 | 
  264 |     const count = await plasPage.getProductCount();
  265 |     expect(count).toBe(tc.expected_count);
  266 |   });
  267 | });
  268 | 
```