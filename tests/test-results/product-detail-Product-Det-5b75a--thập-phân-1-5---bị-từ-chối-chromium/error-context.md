# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-detail.spec.js >> Product Detail (FR-06) E2E Tests >> TC-PRODUCT-DETAIL-007: Quantity = số thập phân (1.5) -> bị từ chối
- Location: product-detail.spec.js:127:3

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('td:has-text("iPhone 15 Pro Max")')
Expected: not visible
Received: visible
Timeout:  1000ms

Call log:
  - Expect "not toBeVisible" with timeout 1000ms
  - waiting for locator('td:has-text("iPhone 15 Pro Max")')
    11 × locator resolved to <td class="py-4">iPhone 15 Pro Max</td>
       - unexpected value "visible"

```

```yaml
- cell "iPhone 15 Pro Max"
```

# Test source

```ts
  40  |   test('TC-PRODUCT-DETAIL-001: Product ID hợp lệ -> hiển thị đầy đủ', async ({ page }) => {
  41  |     await loginUser(page);
  42  |     await page.goto('/product/1');
  43  |
  44  |     // Assert large image is visible
  45  |     const img = page.locator('img');
  46  |     await expect(img).toBeVisible();
  47  |     const imgSrc = await img.getAttribute('src');
  48  |     expect(imgSrc).not.toBeNull();
  49  |     expect(imgSrc).toContain('placehold.co');
  50  |
  51  |     // Assert name
  52  |     await expect(page.locator('h1')).toHaveText('iPhone 15 Pro Max');
  53  |
  54  |     // Assert price (formatted with dot separator as thousands separator and ₫, e.g. "30.000.000 ₫")
  55  |     const priceLoc = page.locator('p.text-red-600');
  56  |     // We expect dot separator. This will FAIL because actual app renders "30,000,000 ₫"
  57  |     await expect(priceLoc).toHaveText(/30\.000\.000\s*₫/);
  58  |
  59  |     // Assert description
  60  |     const descLoc = page.locator('p.text-gray-700');
  61  |     await expect(descLoc).toHaveText('Điện thoại cao cấp của Apple');
  62  |
  63  |     // Assert category name (EXPECTED TO FAIL due to missing category field on UI)
  64  |     await expect(page.locator('text=Điện thoại')).toBeVisible({ timeout: 1000 });
  65  |   });
  66  |
  67  |   test('TC-PRODUCT-DETAIL-002: Product ID không tồn tại (9999) -> hiển thị thông báo lỗi phù hợp', async ({ page }) => {
  68  |     await page.goto('/product/9999');
  69  |     // It returns "Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)"
  70  |     await expect(page.locator('text=Sản phẩm không tồn tại')).toBeVisible();
  71  |   });
  72  |
  73  |   test('TC-PRODUCT-DETAIL-003: Product ID không phải số ("abc") -> hiển thị lỗi phù hợp', async ({ page }) => {
  74  |     await page.goto('/product/abc');
  75  |     await expect(page.locator('text=Sản phẩm không tồn tại')).toBeVisible();
  76  |   });
  77  |
  78  |   test('TC-PRODUCT-DETAIL-004: Quantity hợp lệ (2) -> thêm vào giỏ thành công; hiển thị toast notification và/hoặc badge giỏ hàng cập nhật', async ({ page }) => {
  79  |     await loginUser(page);
  80  |     await clearCart(page);
  81  |
  82  |     await page.goto('/product/1');
  83  |     const qtyInput = page.locator('input[type="number"]');
  84  |     await qtyInput.fill('2');
  85  |
  86  |     // Single click to see if it triggers add to cart (expected to fail because of double-click bug)
  87  |     await page.click('button:has-text("Thêm vào giỏ hàng")');
  88  |
  89  |     // Expect successful add indicator. (This fails because of the double-click bug and missing badge)
  90  |     await expect(page.locator('button:has-text("Đã thêm")')).toBeVisible({ timeout: 1000 });
  91  |   });
  92  |
  93  |   test('TC-PRODUCT-DETAIL-005: Quantity = 0 -> bị từ chối (không thêm được vào giỏ)', async ({ page }) => {
  94  |     await loginUser(page);
  95  |     await clearCart(page);
  96  |
  97  |     await page.goto('/product/1');
  98  |     const qtyInput = page.locator('input[type="number"]');
  99  |     await qtyInput.fill('0');
  100 |
  101 |     // Attempt to add to cart
  102 |     await clickAddToCart(page);
  103 |
  104 |     // Navigate to cart client-side
  105 |     await navigateToCartClientSide(page);
  106 |
  107 |     // Expect the product is NOT added (Expected to FAIL because app allows adding 0 quantity)
  108 |     await expect(page.locator('td:has-text("iPhone 15 Pro Max")')).not.toBeVisible({ timeout: 1000 });
  109 |   });
  110 |
  111 |   test('TC-PRODUCT-DETAIL-006: Quantity = số âm (-1) -> bị từ chối', async ({ page }) => {
  112 |     await loginUser(page);
  113 |     await clearCart(page);
  114 |
  115 |     await page.goto('/product/1');
  116 |     const qtyInput = page.locator('input[type="number"]');
  117 |     await qtyInput.fill('-1');
  118 |
  119 |     await clickAddToCart(page);
  120 |
  121 |     await navigateToCartClientSide(page);
  122 |
  123 |     // Expect product NOT added (Expected to FAIL because app allows negative quantity)
  124 |     await expect(page.locator('td:has-text("iPhone 15 Pro Max")')).not.toBeVisible({ timeout: 1000 });
  125 |   });
  126 |
  127 |   test('TC-PRODUCT-DETAIL-007: Quantity = số thập phân (1.5) -> bị từ chối', async ({ page }) => {
  128 |     await loginUser(page);
  129 |     await clearCart(page);
  130 |
  131 |     await page.goto('/product/1');
  132 |     const qtyInput = page.locator('input[type="number"]');
  133 |     await qtyInput.fill('1.5');
  134 |
  135 |     await clickAddToCart(page);
  136 |
  137 |     await navigateToCartClientSide(page);
  138 |
  139 |     // Expect product NOT added (Expected to FAIL because app accepts it as quantity 1 instead of rejecting)
> 140 |     await expect(page.locator('td:has-text("iPhone 15 Pro Max")')).not.toBeVisible({ timeout: 1000 });
      |                                                                        ^ Error: expect(locator).not.toBeVisible() failed
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
  234 |     await expect(breadcrumb).toBeVisible({ timeout: 1000 });
  235 |   });
  236 |
  237 |   test('TC-PRODUCT-DETAIL-014: Ảnh sản phẩm trên trang chi tiết có thuộc tính alt không rỗng', async ({ page }) => {
  238 |     await page.goto('/product/1');
  239 |     const img = page.locator('img');
  240 |     await expect(img).toBeVisible();
```
