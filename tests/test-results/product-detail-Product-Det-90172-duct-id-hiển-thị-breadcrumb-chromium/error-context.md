# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-detail.spec.js >> Product Detail (FR-06) E2E Tests >> TC-PRODUCT-DETAIL-013: Trang /product/:id hiển thị breadcrumb
- Location: product-detail.spec.js:230:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('nav.breadcrumb, .breadcrumb')
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 1000ms
  - waiting for locator('nav.breadcrumb, .breadcrumb')

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
    - img "iPhone 15 Pro Max"
    - heading "iPhone 15 Pro Max" [level=1]
    - paragraph: 30,000,000 ₫
    - paragraph: Điện thoại cao cấp của Apple
    - text: 'Số lượng:'
    - spinbutton: '1'
    - button "Thêm vào giỏ hàng"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  134 |
  135 |     await clickAddToCart(page);
  136 |
  137 |     await navigateToCartClientSide(page);
  138 |
  139 |     // Expect product NOT added (Expected to FAIL because app accepts it as quantity 1 instead of rejecting)
  140 |     await expect(page.locator('td:has-text("iPhone 15 Pro Max")')).not.toBeVisible({ timeout: 1000 });
  141 |   });
  142 |
  143 |   test('TC-PRODUCT-DETAIL-008: Quantity = rỗng -> bị từ chối khi bấm "Thêm vào giỏ hàng"', async ({ page }) => {
  144 |     await loginUser(page);
  145 |     await clearCart(page);
  146 |
  147 |     await page.goto('/product/1');
  148 |     const qtyInput = page.locator('input[type="number"]');
  149 |     await qtyInput.fill('');
  150 |
  151 |     await clickAddToCart(page);
  152 |
  153 |     await navigateToCartClientSide(page);
  154 |
  155 |     // Expect product NOT added (Expected to FAIL because app allows adding NaN/empty quantity)
  156 |     await expect(page.locator('td:has-text("iPhone 15 Pro Max")')).not.toBeVisible({ timeout: 1000 });
  157 |   });
  158 |
  159 |   test('TC-PRODUCT-DETAIL-009: Quantity = "abc" (chuỗi ký tự không phải số) -> bị từ chối', async ({ page }) => {
  160 |     await loginUser(page);
  161 |     await clearCart(page);
  162 |
  163 |     await page.goto('/product/1');
  164 |     const qtyInput = page.locator('input[type="number"]');
  165 |
  166 |     // Simulate keyboard typing to prevent Playwright's strict fill error on number input
  167 |     await qtyInput.focus();
  168 |     await page.keyboard.type('abc');
  169 |
  170 |     await clickAddToCart(page);
  171 |
  172 |     await navigateToCartClientSide(page);
  173 |
  174 |     // Expect product NOT added (Expected to FAIL because app allows adding NaN quantity)
  175 |     await expect(page.locator('td:has-text("iPhone 15 Pro Max")')).not.toBeVisible({ timeout: 1000 });
  176 |   });
  177 |
  178 |   test('TC-PRODUCT-DETAIL-010: Quantity = 1 (BVA ON) -> được chấp nhận; thêm vào giỏ thành công', async ({ page }) => {
  179 |     await loginUser(page);
  180 |     await clearCart(page);
  181 |
  182 |     await page.goto('/product/1');
  183 |     const qtyInput = page.locator('input[type="number"]');
  184 |     await qtyInput.fill('1');
  185 |
  186 |     await clickAddToCart(page);
  187 |
  188 |     await navigateToCartClientSide(page);
  189 |
  190 |     // Expect cart to contain product with quantity 1 (Expected to PASS)
  191 |     const row = page.locator('tr:has-text("iPhone 15 Pro Max")');
  192 |     await expect(row).toBeVisible();
  193 |     await expect(row.locator('td').nth(2)).toHaveText('1');
  194 |   });
  195 |
  196 |   test('TC-PRODUCT-DETAIL-011: Quantity = 2 (BVA IN) -> được chấp nhận', async ({ page }) => {
  197 |     await loginUser(page);
  198 |     await clearCart(page);
  199 |
  200 |     await page.goto('/product/1');
  201 |     const qtyInput = page.locator('input[type="number"]');
  202 |     await qtyInput.fill('2');
  203 |
  204 |     await clickAddToCart(page);
  205 |
  206 |     await navigateToCartClientSide(page);
  207 |
  208 |     // Expect cart to contain product with quantity 2 (Expected to PASS)
  209 |     const row = page.locator('tr:has-text("iPhone 15 Pro Max")');
  210 |     await expect(row).toBeVisible();
  211 |     await expect(row.locator('td').nth(2)).toHaveText('2');
  212 |   });
  213 |
  214 |   test('TC-PRODUCT-DETAIL-012: Chưa đăng nhập, bấm "Thêm vào giỏ hàng" -> bị từ chối (yêu cầu đăng nhập, API trả về 401)', async ({ page }) => {
  215 |     // Clear token
  216 |     await page.goto('/');
  217 |     await page.evaluate(() => localStorage.removeItem('token'));
  218 |     await page.reload();
  219 |
  220 |     await page.goto('/product/1');
  221 |     const qtyInput = page.locator('input[type="number"]');
  222 |     await qtyInput.fill('1');
  223 |
  224 |     await clickAddToCart(page);
  225 |
  226 |     // Expect redirect to login (Expected to FAIL because guests can add to cart)
  227 |     await expect(page).toHaveURL(/.*login/, { timeout: 1000 });
  228 |   });
  229 |
  230 |   test('TC-PRODUCT-DETAIL-013: Trang /product/:id hiển thị breadcrumb', async ({ page }) => {
  231 |     await page.goto('/product/1');
  232 |     // Expect breadcrumb to be visible (Expected to FAIL because it's missing)
  233 |     const breadcrumb = page.locator('nav.breadcrumb, .breadcrumb');
> 234 |     await expect(breadcrumb).toBeVisible({ timeout: 1000 });
      |                              ^ Error: expect(locator).toBeVisible() failed
  235 |   });
  236 |
  237 |   test('TC-PRODUCT-DETAIL-014: Ảnh sản phẩm trên trang chi tiết có thuộc tính alt không rỗng', async ({ page }) => {
  238 |     await page.goto('/product/1');
  239 |     const img = page.locator('img');
  240 |     await expect(img).toBeVisible();
  241 |     const alt = await img.getAttribute('alt');
  242 |     expect(alt).not.toBeNull();
  243 |     expect(alt.trim().length).toBeGreaterThan(0);
  244 |   });
  245 |
  246 |   test('TC-PRODUCT-DETAIL-015: Tên/mô tả sản phẩm chứa ký tự HTML đặc biệt được hiển thị an toàn (escaped), không render HTML', async ({ page }) => {
  247 |     await page.goto('/product/2');
  248 |
  249 |     let xssTriggered = false;
  250 |     page.on('dialog', dialog => {
  251 |       xssTriggered = true;
  252 |       dialog.dismiss();
  253 |     });
  254 |
  255 |     await page.waitForTimeout(1000);
  256 |     expect(xssTriggered).toBeFalsy();
  257 |
  258 |     // Verify name shows raw HTML script tags
  259 |     const nameLoc = page.locator('h1');
  260 |     await expect(nameLoc).toHaveText("<script>alert('xss-name')</script> Sản phẩm XSS");
  261 |
  262 |     // Verify description shows raw HTML img tags
  263 |     const descLoc = page.locator('p.text-gray-700');
  264 |     await expect(descLoc).toHaveText("<img src=\"invalid-image.jpg\" onerror=\"alert('xss-desc')\"> Mô tả sản phẩm chứa XSS");
  265 |   });
  266 |
  267 | });
  268 |
  269 | // API-based seeding for XSS product before all tests run
  270 | test.beforeAll(async () => {
  271 |   const requestContext = await request.newContext();
  272 |   const updateRes = await requestContext.put('http://localhost:3000/api/products/2', {
  273 |     data: {
  274 |       name: "<script>alert('xss-name')</script> Sản phẩm XSS",
  275 |       price: 28000000,
  276 |       description: "<img src=\"invalid-image.jpg\" onerror=\"alert('xss-desc')\"> Mô tả sản phẩm chứa XSS",
  277 |       imageUrl: "https://placehold.co/300x300/png?text=Samsung+S24",
  278 |       category_id: 1
  279 |     }
  280 |   });
  281 |   expect(updateRes.ok()).toBeTruthy();
  282 |   await requestContext.dispose();
  283 | });
  284 |
  285 | // Restore Product ID 2 after tests
  286 | test.afterAll(async () => {
  287 |   const requestContext = await request.newContext();
  288 |   const restoreRes = await requestContext.put('http://localhost:3000/api/products/2', {
  289 |     data: {
  290 |       name: "Samsung Galaxy S24 Ultra",
  291 |       price: 28000000,
  292 |       description: "Màn hình hiển thị xuất sắc, camera siêu zoom",
  293 |       imageUrl: "https://placehold.co/300x300/png?text=Samsung+S24",
  294 |       category_id: 1
  295 |     }
  296 |   });
  297 |   expect(restoreRes.ok()).toBeTruthy();
  298 |   await requestContext.dispose();
  299 | });
  300 |
```
