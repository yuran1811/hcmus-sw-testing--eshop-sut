const { test, expect, request } = require('@playwright/test');

// Helper to log in a user
async function loginUser(page, email = 'test@eshop.com', password = 'Test1234!') {
  await page.goto('/login');
  const inputs = page.locator('input');
  await inputs.nth(0).fill(email);
  await inputs.nth(1).fill(password);
  await page.click('button:has-text("Sign In")');
  await page.waitForURL('http://localhost:5173/');
}

// Helper to navigate to the cart page client-side (to preserve React state)
async function navigateToCartClientSide(page) {
  await page.click('header nav >> text=Giỏ hàng');
  await page.waitForURL('**/cart');
}

// Helper to click add-to-cart button twice with a delay to bypass React state batching bug
async function clickAddToCart(page) {
  await page.click('button:has-text("Thêm vào giỏ hàng")');
  await page.waitForTimeout(300); // Wait for React state (clickCount) to update
  await page.click('button:has-text("Thêm vào giỏ hàng")');
}

// Helper to clear the cart client-side
async function clearCart(page) {
  await navigateToCartClientSide(page);
  const deleteButtons = page.locator('button:has-text("Xóa")');
  let count = await deleteButtons.count();
  while (count > 0) {
    await deleteButtons.first().click();
    await page.waitForTimeout(200); // small delay to let state update
    count = await deleteButtons.count();
  }
}

test.describe('Product Detail (FR-06) E2E Tests', () => {
  test('TC-PRODUCT-DETAIL-001: Product ID hợp lệ -> hiển thị đầy đủ', async ({ page }) => {
    await loginUser(page);
    await page.goto('/product/1');

    // Assert large image is visible
    const img = page.locator('img');
    await expect(img).toBeVisible();
    const imgSrc = await img.getAttribute('src');
    expect(imgSrc).not.toBeNull();
    expect(imgSrc).toContain('placehold.co');

    // Assert name
    await expect(page.locator('h1')).toHaveText('iPhone 15 Pro Max');

    // Assert price (formatted with dot separator as thousands separator and ₫, e.g. "30.000.000 ₫")
    const priceLoc = page.locator('p.text-red-600');
    // We expect dot separator. This will FAIL because actual app renders "30,000,000 ₫"
    await expect(priceLoc).toHaveText(/30\.000\.000\s*₫/);

    // Assert description
    const descLoc = page.locator('p.text-gray-700');
    await expect(descLoc).toHaveText('Điện thoại cao cấp của Apple');

    // Assert category name (EXPECTED TO FAIL due to missing category field on UI)
    await expect(page.locator('text=Điện thoại')).toBeVisible({ timeout: 1000 });
  });

  test('TC-PRODUCT-DETAIL-002: Product ID không tồn tại (9999) -> hiển thị thông báo lỗi phù hợp', async ({
    page,
  }) => {
    await page.goto('/product/9999');
    // It returns "Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)"
    await expect(page.locator('text=Sản phẩm không tồn tại')).toBeVisible();
  });

  test('TC-PRODUCT-DETAIL-003: Product ID không phải số ("abc") -> hiển thị lỗi phù hợp', async ({
    page,
  }) => {
    await page.goto('/product/abc');
    await expect(page.locator('text=Sản phẩm không tồn tại')).toBeVisible();
  });

  test('TC-PRODUCT-DETAIL-004: Quantity hợp lệ (2) -> thêm vào giỏ thành công; hiển thị toast notification và/hoặc badge giỏ hàng cập nhật', async ({
    page,
  }) => {
    await loginUser(page);
    await clearCart(page);

    await page.goto('/product/1');
    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('2');

    // Single click to see if it triggers add to cart (expected to fail because of double-click bug)
    await page.click('button:has-text("Thêm vào giỏ hàng")');

    // Expect successful add indicator. (This fails because of the double-click bug and missing badge)
    await expect(page.locator('button:has-text("Đã thêm")')).toBeVisible({ timeout: 1000 });
  });

  test('TC-PRODUCT-DETAIL-005: Quantity = 0 -> bị từ chối (không thêm được vào giỏ)', async ({
    page,
  }) => {
    await loginUser(page);
    await clearCart(page);

    await page.goto('/product/1');
    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('0');

    // Attempt to add to cart
    await clickAddToCart(page);

    // Navigate to cart client-side
    await navigateToCartClientSide(page);

    // Expect the product is NOT added (Expected to FAIL because app allows adding 0 quantity)
    await expect(page.locator('td:has-text("iPhone 15 Pro Max")')).not.toBeVisible({
      timeout: 1000,
    });
  });

  test('TC-PRODUCT-DETAIL-006: Quantity = số âm (-1) -> bị từ chối', async ({ page }) => {
    await loginUser(page);
    await clearCart(page);

    await page.goto('/product/1');
    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('-1');

    await clickAddToCart(page);

    await navigateToCartClientSide(page);

    // Expect product NOT added (Expected to FAIL because app allows negative quantity)
    await expect(page.locator('td:has-text("iPhone 15 Pro Max")')).not.toBeVisible({
      timeout: 1000,
    });
  });

  test('TC-PRODUCT-DETAIL-007: Quantity = số thập phân (1.5) -> bị từ chối', async ({ page }) => {
    await loginUser(page);
    await clearCart(page);

    await page.goto('/product/1');
    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('1.5');

    await clickAddToCart(page);

    await navigateToCartClientSide(page);

    // Expect product NOT added (Expected to FAIL because app accepts it as quantity 1 instead of rejecting)
    await expect(page.locator('td:has-text("iPhone 15 Pro Max")')).not.toBeVisible({
      timeout: 1000,
    });
  });

  test('TC-PRODUCT-DETAIL-008: Quantity = rỗng -> bị từ chối khi bấm "Thêm vào giỏ hàng"', async ({
    page,
  }) => {
    await loginUser(page);
    await clearCart(page);

    await page.goto('/product/1');
    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('');

    await clickAddToCart(page);

    await navigateToCartClientSide(page);

    // Expect product NOT added (Expected to FAIL because app allows adding NaN/empty quantity)
    await expect(page.locator('td:has-text("iPhone 15 Pro Max")')).not.toBeVisible({
      timeout: 1000,
    });
  });

  test('TC-PRODUCT-DETAIL-009: Quantity = "abc" (chuỗi ký tự không phải số) -> bị từ chối', async ({
    page,
  }) => {
    await loginUser(page);
    await clearCart(page);

    await page.goto('/product/1');
    const qtyInput = page.locator('input[type="number"]');

    // Simulate keyboard typing to prevent Playwright's strict fill error on number input
    await qtyInput.focus();
    await page.keyboard.type('abc');

    await clickAddToCart(page);

    await navigateToCartClientSide(page);

    // Expect product NOT added (Expected to FAIL because app allows adding NaN quantity)
    await expect(page.locator('td:has-text("iPhone 15 Pro Max")')).not.toBeVisible({
      timeout: 1000,
    });
  });

  test('TC-PRODUCT-DETAIL-010: Quantity = 1 (BVA ON) -> được chấp nhận; thêm vào giỏ thành công', async ({
    page,
  }) => {
    await loginUser(page);
    await clearCart(page);

    await page.goto('/product/1');
    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('1');

    await clickAddToCart(page);

    await navigateToCartClientSide(page);

    // Expect cart to contain product with quantity 1 (Expected to PASS)
    const row = page.locator('tr:has-text("iPhone 15 Pro Max")');
    await expect(row).toBeVisible();
    await expect(row.locator('td').nth(2)).toHaveText('1');
  });

  test('TC-PRODUCT-DETAIL-011: Quantity = 2 (BVA IN) -> được chấp nhận', async ({ page }) => {
    await loginUser(page);
    await clearCart(page);

    await page.goto('/product/1');
    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('2');

    await clickAddToCart(page);

    await navigateToCartClientSide(page);

    // Expect cart to contain product with quantity 2 (Expected to PASS)
    const row = page.locator('tr:has-text("iPhone 15 Pro Max")');
    await expect(row).toBeVisible();
    await expect(row.locator('td').nth(2)).toHaveText('2');
  });

  test('TC-PRODUCT-DETAIL-012: Chưa đăng nhập, bấm "Thêm vào giỏ hàng" -> bị từ chối (yêu cầu đăng nhập, API trả về 401)', async ({
    page,
  }) => {
    // Clear token
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('token'));
    await page.reload();

    await page.goto('/product/1');
    const qtyInput = page.locator('input[type="number"]');
    await qtyInput.fill('1');

    await clickAddToCart(page);

    // Expect redirect to login (Expected to FAIL because guests can add to cart)
    await expect(page).toHaveURL(/.*login/, { timeout: 1000 });
  });

  test('TC-PRODUCT-DETAIL-013: Trang /product/:id hiển thị breadcrumb', async ({ page }) => {
    await page.goto('/product/1');
    // Expect breadcrumb to be visible (Expected to FAIL because it's missing)
    const breadcrumb = page.locator('nav.breadcrumb, .breadcrumb');
    await expect(breadcrumb).toBeVisible({ timeout: 1000 });
  });

  test('TC-PRODUCT-DETAIL-014: Ảnh sản phẩm trên trang chi tiết có thuộc tính alt không rỗng', async ({
    page,
  }) => {
    await page.goto('/product/1');
    const img = page.locator('img');
    await expect(img).toBeVisible();
    const alt = await img.getAttribute('alt');
    expect(alt).not.toBeNull();
    expect(alt.trim().length).toBeGreaterThan(0);
  });

  test('TC-PRODUCT-DETAIL-015: Tên/mô tả sản phẩm chứa ký tự HTML đặc biệt được hiển thị an toàn (escaped), không render HTML', async ({
    page,
  }) => {
    await page.goto('/product/2');

    let xssTriggered = false;
    page.on('dialog', (dialog) => {
      xssTriggered = true;
      dialog.dismiss();
    });

    await page.waitForTimeout(1000);
    expect(xssTriggered).toBeFalsy();

    // Verify name shows raw HTML script tags
    const nameLoc = page.locator('h1');
    await expect(nameLoc).toHaveText("<script>alert('xss-name')</script> Sản phẩm XSS");

    // Verify description shows raw HTML img tags
    const descLoc = page.locator('p.text-gray-700');
    await expect(descLoc).toHaveText(
      '<img src="invalid-image.jpg" onerror="alert(\'xss-desc\')"> Mô tả sản phẩm chứa XSS',
    );
  });
});

// API-based seeding for XSS product before all tests run
test.beforeAll(async () => {
  const requestContext = await request.newContext();
  const updateRes = await requestContext.put('http://localhost:3000/api/products/2', {
    data: {
      name: "<script>alert('xss-name')</script> Sản phẩm XSS",
      price: 28000000,
      description:
        '<img src="invalid-image.jpg" onerror="alert(\'xss-desc\')"> Mô tả sản phẩm chứa XSS',
      imageUrl: 'https://placehold.co/300x300/png?text=Samsung+S24',
      category_id: 1,
    },
  });
  expect(updateRes.ok()).toBeTruthy();
  await requestContext.dispose();
});

// Restore Product ID 2 after tests
test.afterAll(async () => {
  const requestContext = await request.newContext();
  const restoreRes = await requestContext.put('http://localhost:3000/api/products/2', {
    data: {
      name: 'Samsung Galaxy S24 Ultra',
      price: 28000000,
      description: 'Màn hình hiển thị xuất sắc, camera siêu zoom',
      imageUrl: 'https://placehold.co/300x300/png?text=Samsung+S24',
      category_id: 1,
    },
  });
  expect(restoreRes.ok()).toBeTruthy();
  await requestContext.dispose();
});
