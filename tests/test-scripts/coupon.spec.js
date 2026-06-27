const { test, expect } = require('@playwright/test');
const sqlite3 = require('../../backend/node_modules/sqlite3/lib/sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../backend/database.sqlite');

// Helper to execute DB queries directly on SQLite SUT database
function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) return reject(err);
    });
    db.run(query, params, function (err) {
      db.close();
      if (err) return reject(err);
      resolve(this);
    });
  });
}

// Helper to log in a user
async function loginUser(page, email = 'test@eshop.com', password = 'Test1234!') {
  await page.goto('/login');
  const inputs = page.locator('input');
  await inputs.nth(0).fill(email);
  await inputs.nth(1).fill(password);
  await page.click('button:has-text("Sign In")');
  await page.waitForURL('http://localhost:5173/');
}

// Helper to apply coupon at checkout
async function applyCouponAtCheckout(page, totalAmount, couponCode) {
  await page.goto('/checkout');

  // Set the total amount input
  const totalInput = page.locator('input[type="number"]');
  await totalInput.fill(String(totalAmount));

  // Set the coupon code input
  const couponInput = page.locator('input[placeholder="Nhập mã giảm giá..."]');
  await couponInput.fill(couponCode);

  // Click apply coupon button
  const applyBtn = page.locator('button:has-text("Áp dụng")');
  await applyBtn.click();

  // Wait for the button to be re-enabled (indicating API request has completed)
  await expect(applyBtn).not.toBeDisabled();
}

test.describe('Coupon (FR-09) E2E Tests', () => {
  test.beforeAll(async () => {
    // Seed the INACTIVE coupon into DB for TC-COUPON-004
    await runQuery(
      `INSERT OR REPLACE INTO coupons (id, code, type, discount_value, min_order_amount, expired_at, is_active, max_uses_per_user) 
       VALUES (5, 'INACTIVE', 'percent', 5, 100000, '2099-12-31', 0, 1)`,
    );
  });

  test.afterAll(async () => {
    // Clean up mock coupons
    await runQuery('DELETE FROM coupons WHERE id = 5');
    // Clean up mock usages
    await runQuery('DELETE FROM coupon_usage WHERE id IN (100, 101, 102, 103)');
  });

  test.beforeEach(async () => {
    // Make sure we clear mock usages before each test
    await runQuery('DELETE FROM coupon_usage WHERE id IN (100, 101, 102, 103)');
  });

  test('TC-COUPON-001: Áp dụng mã SAVE10 (percent) hợp lệ', async ({ page }) => {
    await loginUser(page);
    await applyCouponAtCheckout(page, 400000, 'SAVE10');

    // Expected discount is 40.000 ₫ and final amount 360.000 ₫.
    // This will FAIL because of the backend formula bug (1 - 10 = -9) which yields negative discount (-3.6M) and 4M final payment.
    const successMsg = page.locator('text=Áp dụng thành công! Giảm 10%');
    await expect(successMsg).toBeVisible();

    const resultDiv = page.locator('div.text-green-700');
    // We assert dot separators according to spec.
    await expect(resultDiv).toContainText('Tiết kiệm: 40.000 ₫');
    await expect(resultDiv).toContainText('Thành tiền: 360.000 ₫');

    const finalTotal = page.locator('text=Tổng thanh toán: 360.000 ₫');
    await expect(finalTotal).toBeVisible();
  });

  test('TC-COUPON-002: Áp dụng mã BIGBUY (fixed) hợp lệ', async ({ page }) => {
    await loginUser(page);
    // 500,000 is exactly equal to min_order_amount (500k)
    await applyCouponAtCheckout(page, 500000, 'BIGBUY');

    // Expected to PASS, but will FAIL because backend uses strictly greater than check (total > min)
    const successMsg = page.locator('text=Áp dụng thành công! Giảm 50.000 ₫');
    await expect(successMsg).toBeVisible();

    const resultDiv = page.locator('div.text-green-700');
    await expect(resultDiv).toContainText('Tiết kiệm: 50.000 ₫');
    await expect(resultDiv).toContainText('Thành tiền: 450.000 ₫');
  });

  test('TC-COUPON-003: Mã không tồn tại trong DB -> trả về lỗi phù hợp', async ({ page }) => {
    await loginUser(page);
    await applyCouponAtCheckout(page, 400000, 'NOTEXIST');

    // Expected to show not found error (Expected to PASS)
    const errMsg = page.locator('text=Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa');
    await expect(errMsg).toBeVisible();
  });

  test('TC-COUPON-004: Mã bị vô hiệu hóa (INACTIVE, is_active=0) -> trả về lỗi', async ({
    page,
  }) => {
    await loginUser(page);
    await applyCouponAtCheckout(page, 400000, 'INACTIVE');

    // Expected to show not found / inactive error (Expected to PASS)
    const errMsg = page.locator('text=Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa');
    await expect(errMsg).toBeVisible();
  });

  test('TC-COUPON-005: Mã đã hết hạn (EXPIRED) -> trả về lỗi', async ({ page }) => {
    await loginUser(page);
    await applyCouponAtCheckout(page, 400000, 'EXPIRED');

    // Expected to show expired error (Expected to PASS)
    const errMsg = page.locator('text=Mã giảm giá đã hết hạn');
    await expect(errMsg).toBeVisible();
  });

  test('TC-COUPON-006: SAVE10, total_amount = 299,999 < min_order_amount (300,000) -> bị từ chối', async ({
    page,
  }) => {
    await loginUser(page);
    await applyCouponAtCheckout(page, 299999, 'SAVE10');

    // Expected to show under threshold error. This will FAIL because actual app renders with comma: "300,000 ₫"
    const errMsg = page.locator(
      'text=Đơn hàng chưa đủ giá trị tối thiểu 300.000 ₫ để áp dụng mã này',
    );
    await expect(errMsg).toBeVisible();
  });

  test('TC-COUPON-007: SAVE10, total_amount = 0 -> bị từ chối', async ({ page }) => {
    await loginUser(page);
    await applyCouponAtCheckout(page, 0, 'SAVE10');

    // Expected to show under threshold error. This will FAIL because actual app renders with comma: "300,000 ₫"
    const errMsg = page.locator(
      'text=Đơn hàng chưa đủ giá trị tối thiểu 300.000 ₫ để áp dụng mã này',
    );
    await expect(errMsg).toBeVisible();
  });

  test('TC-COUPON-008: Chưa đăng nhập hệ thống -> trả về lỗi xác thực', async ({ page }) => {
    // Clear user token
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('token'));
    await page.reload();

    await applyCouponAtCheckout(page, 400000, 'SAVE10');

    // Expected: coupon is rejected for guests.
    // This will FAIL because the unauthenticated guest successfully applies the coupon and resultDiv becomes visible.
    const resultDiv = page.locator('div.text-green-700');
    await expect(resultDiv).not.toBeVisible({ timeout: 1000 });
  });

  test('TC-COUPON-009: SAVE10 dùng lần thứ 2 (vượt max_uses_per_user = 1) -> bị từ chối', async ({
    page,
  }) => {
    // Seed 1 usage of SAVE10 (coupon id = 1) for user id = 2
    await runQuery('INSERT INTO coupon_usage (id, coupon_id, user_id) VALUES (100, 1, 2)');

    await loginUser(page);
    await applyCouponAtCheckout(page, 400000, 'SAVE10');

    // Expected: limit reached error (Expected to PASS)
    const errMsg = page.locator('text=Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)');
    await expect(errMsg).toBeVisible();
  });

  test('TC-COUPON-010: VIP100 lần dùng thứ 2 (max_uses=2, usage=1) -> vẫn được chấp nhận', async ({
    page,
  }) => {
    // Seed 1 usage of VIP100 (coupon id = 3) for user id = 2
    await runQuery('INSERT INTO coupon_usage (id, coupon_id, user_id) VALUES (101, 3, 2)');

    await loginUser(page);
    await applyCouponAtCheckout(page, 400000, 'VIP100');

    // Expected: accepted. This will FAIL because actual app renders with comma: "100,000 ₫" and "300,000 ₫"
    const successMsg = page.locator('text=Áp dụng thành công! Giảm 100.000 ₫');
    await expect(successMsg).toBeVisible();

    const resultDiv = page.locator('div.text-green-700');
    await expect(resultDiv).toContainText('Tiết kiệm: 100.000 ₫');
    await expect(resultDiv).toContainText('Thành tiền: 300.000 ₫');
  });

  test('TC-COUPON-011: VIP100 lần dùng thứ 3 (đã đạt max_uses=2) -> bị từ chối', async ({
    page,
  }) => {
    // Seed 2 usages of VIP100 (coupon id = 3) for user id = 2
    await runQuery(
      'INSERT INTO coupon_usage (id, coupon_id, user_id) VALUES (102, 3, 2), (103, 3, 2)',
    );

    await loginUser(page);
    await applyCouponAtCheckout(page, 400000, 'VIP100');

    // Expected: limit reached error (Expected to PASS)
    const errMsg = page.locator('text=Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn)');
    await expect(errMsg).toBeVisible();
  });

  test('TC-COUPON-012: SAVE10, total = 300,000 (ON, đúng ngưỡng min = 300,000) -> được chấp nhận', async ({
    page,
  }) => {
    await loginUser(page);
    await applyCouponAtCheckout(page, 300000, 'SAVE10');

    // Expected: accepted.
    // Will FAIL because of strictly greater than check (300k is not > 300k)
    const successMsg = page.locator('text=Áp dụng thành công! Giảm 10%');
    await expect(successMsg).toBeVisible();
  });

  test('TC-COUPON-013: SAVE10, total = 300,001 (IN, vừa trên ngưỡng SAVE10) -> được chấp nhận', async ({
    page,
  }) => {
    await loginUser(page);
    await applyCouponAtCheckout(page, 300001, 'SAVE10');

    // Expected: accepted and math displays correctly.
    // This will FAIL because of the backend formula bug (1 - 10 = -9)
    const successMsg = page.locator('text=Áp dụng thành công! Giảm 10%');
    await expect(successMsg).toBeVisible();

    const resultDiv = page.locator('div.text-green-700');
    await expect(resultDiv).toContainText('Tiết kiệm: 30.000 ₫');
    await expect(resultDiv).toContainText('Thành tiền: 270.001 ₫');
  });

  test('TC-COUPON-014: BIGBUY, total = 499,999 (OFF, dưới ngưỡng min = 500,000) -> bị từ chối', async ({
    page,
  }) => {
    await loginUser(page);
    await applyCouponAtCheckout(page, 499999, 'BIGBUY');

    // Expected: rejected. This will FAIL because actual app renders with comma: "500,000 ₫"
    const errMsg = page.locator(
      'text=Đơn hàng chưa đủ giá trị tối thiểu 500.000 ₫ để áp dụng mã này',
    );
    await expect(errMsg).toBeVisible();
  });

  test('TC-COUPON-015: BIGBUY, total = 500,001 (IN, vừa trên ngưỡng BIGBUY) -> được chấp nhận', async ({
    page,
  }) => {
    await loginUser(page);
    await applyCouponAtCheckout(page, 500001, 'BIGBUY');

    // Expected: accepted. This will FAIL because actual app renders with comma: "50.000 ₫" and "450.001 ₫"
    const successMsg = page.locator('text=Áp dụng thành công! Giảm 50.000 ₫');
    await expect(successMsg).toBeVisible();

    const resultDiv = page.locator('div.text-green-700');
    await expect(resultDiv).toContainText('Tiết kiệm: 50.000 ₫');
    await expect(resultDiv).toContainText('Thành tiền: 450.001 ₫');
  });

  test('TC-COUPON-016: Nhất quán đơn vị tiền: hiển thị số tiền giảm và tổng tiền có ký hiệu ₫ và phân cách hàng nghìn', async ({
    page,
  }) => {
    await loginUser(page);
    await applyCouponAtCheckout(page, 400000, 'VIP100');

    // Assert currency symbol ₫ and thousands separator.
    // This will FAIL because actual app renders comma separators: "100,000 ₫"
    const resultDiv = page.locator('div.text-green-700');
    await expect(resultDiv).toContainText('100.000 ₫');
    await expect(resultDiv).toContainText('300.000 ₫');

    const totalText = page.locator('text=Tổng thanh toán: 300.000 ₫');
    await expect(totalText).toBeVisible();
  });

  test('TC-COUPON-017: Nhất quán ngôn ngữ: thông báo thành công/lỗi hiển thị bằng tiếng Việt rõ ràng', async ({
    page,
  }) => {
    await loginUser(page);

    // Test success msg language
    await applyCouponAtCheckout(page, 400000, 'VIP100');
    const successMsg = page.locator('text=Áp dụng thành công!');
    await expect(successMsg).toBeVisible();

    // Test error msg language
    await applyCouponAtCheckout(page, 400000, 'NOTEXIST');
    const errMsg = page.locator('text=Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa');
    await expect(errMsg).toBeVisible();
  });

  test('TC-COUPON-018: Bảo mật hiển thị: mã giảm giá nhập vào được hiển thị an toàn, không render HTML', async ({
    page,
  }) => {
    await loginUser(page);

    // Register XSS dialog listener to fail immediately if triggered
    let xssTriggered = false;
    page.on('dialog', (dialog) => {
      xssTriggered = true;
      dialog.dismiss();
    });

    const xssPayload = "<script>alert('XSS')</script>";
    await applyCouponAtCheckout(page, 400000, xssPayload);

    await page.waitForTimeout(1000);
    expect(xssTriggered).toBeFalsy();

    // Verify input displays the raw XSS string without executing it.
    // The visual CSS text-transform does not modify the underlying input value.
    const couponInput = page.locator('input[placeholder="Nhập mã giảm giá..."]');
    await expect(couponInput).toHaveValue(xssPayload);
  });
});
