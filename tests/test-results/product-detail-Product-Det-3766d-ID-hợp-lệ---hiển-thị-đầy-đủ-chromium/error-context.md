# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: product-detail.spec.js >> Product Detail (FR-06) E2E Tests >> TC-PRODUCT-DETAIL-001: Product ID hợp lệ -> hiển thị đầy đủ
- Location: product-detail.spec.js:40:3

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('p.text-red-600')
Expected pattern: /30\.000\.000\s*₫/
Received string:  "30,000,000 ₫"
Timeout: 3000ms

Call log:
  - Expect "toHaveText" with timeout 3000ms
  - waiting for locator('p.text-red-600')
    10 × locator resolved to <p class="text-2xl text-red-600 font-bold mb-4">30,000,000 ₫</p>
       - unexpected value "30,000,000 ₫"

```

```yaml
- paragraph: 30,000,000 ₫
```

# Test source

```ts
  1   | const { test, expect, request } = require('@playwright/test');
  2   |
  3   | // Helper to log in a user
  4   | async function loginUser(page, email = 'test@eshop.com', password = 'Test1234!') {
  5   |   await page.goto('/login');
  6   |   const inputs = page.locator('input');
  7   |   await inputs.nth(0).fill(email);
  8   |   await inputs.nth(1).fill(password);
  9   |   await page.click('button:has-text("Sign In")');
  10  |   await page.waitForURL('http://localhost:5173/');
  11  | }
  12  |
  13  | // Helper to navigate to the cart page client-side (to preserve React state)
  14  | async function navigateToCartClientSide(page) {
  15  |   await page.click('header nav >> text=Giỏ hàng');
  16  |   await page.waitForURL('**/cart');
  17  | }
  18  |
  19  | // Helper to click add-to-cart button twice with a delay to bypass React state batching bug
  20  | async function clickAddToCart(page) {
  21  |   await page.click('button:has-text("Thêm vào giỏ hàng")');
  22  |   await page.waitForTimeout(300); // Wait for React state (clickCount) to update
  23  |   await page.click('button:has-text("Thêm vào giỏ hàng")');
  24  | }
  25  |
  26  | // Helper to clear the cart client-side
  27  | async function clearCart(page) {
  28  |   await navigateToCartClientSide(page);
  29  |   const deleteButtons = page.locator('button:has-text("Xóa")');
  30  |   let count = await deleteButtons.count();
  31  |   while (count > 0) {
  32  |     await deleteButtons.first().click();
  33  |     await page.waitForTimeout(200); // small delay to let state update
  34  |     count = await deleteButtons.count();
  35  |   }
  36  | }
  37  |
  38  | test.describe('Product Detail (FR-06) E2E Tests', () => {
  39  |
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
> 57  |     await expect(priceLoc).toHaveText(/30\.000\.000\s*₫/);
      |                            ^ Error: expect(locator).toHaveText(expected) failed
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
```
