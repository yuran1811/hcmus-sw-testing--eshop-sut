const { test, expect } = require('@playwright/test');
const sqlite3 = require('../backend/node_modules/sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../backend/database.sqlite');

const MOBILE_URL = 'http://localhost:8081';

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

// Helper to log in a user in mobile view
async function loginMobileAdmin(page, email = 'test@eshop.com', password = 'Test1234!') {
  await page.goto(MOBILE_URL);

  // Wait for the Metro web app to load and display the main header
  await page.locator('text="EShop Mobile"').waitFor({ state: 'visible', timeout: 25000 });

  const loginBtn = page.locator('text="Đăng nhập"');
  const loggedInIndicator = page.locator('div:has-text("Chào, ")').first();

  if (await loggedInIndicator.isVisible()) {
    // Already logged in from previous test, let's log out first to ensure clean state
    await loggedInIndicator.click();
    await page.locator('text="Thoát"').click();
    await page.locator('text="EShop Mobile"').waitFor({ state: 'visible', timeout: 5000 });
  }

  // Click login and sign in
  await loginBtn.click();
  await page.locator('input[placeholder="Email"]').fill(email);
  await page.locator('input[placeholder="Mật khẩu"]').fill(password);
  await page.locator('text="Sign In"').click();

  // Wait for view to return to home screen and ensure products are loaded
  await page.locator('text="Danh sách sản phẩm"').waitFor({ state: 'visible', timeout: 5000 });
  await page.locator('text=/Hiển thị \\d+ sản phẩm/').waitFor({ state: 'visible', timeout: 10000 });
}

// Helper to search and filter products down to 1 item to avoid Playwright strict mode violations
async function targetProduct(page, productName) {
  await page.locator('text="EShop Mobile"').click();
  await page.locator('input[placeholder="Tìm kiếm..."]').fill(productName);
  await page.locator('text="Tìm"').click();
  await page.locator(`text="Hiển thị 1 sản phẩm"`).waitFor({ state: 'visible', timeout: 5000 });
}

test.describe('Mobile Cart (FR-20) E2E Tests', () => {
  test.beforeAll(async () => {
    // Seed products specifically for the tests
    await runQuery(
      `INSERT OR REPLACE INTO products (id, name, price, description, imageUrl, category_id) 
       VALUES (991, 'Sản phẩm A', 100000, 'Mô tả Sản phẩm A', 'https://placehold.co/300', 1)`,
    );
    await runQuery(
      `INSERT OR REPLACE INTO products (id, name, price, description, imageUrl, category_id) 
       VALUES (992, 'Sản phẩm B', 200000, 'Mô tả Sản phẩm B', 'https://placehold.co/300', 1)`,
    );
  });

  test.afterAll(async () => {
    // Clean up test products
    await runQuery('DELETE FROM products WHERE id IN (991, 992)');
  });

  test('TC-CART-MOBILE-001: Thêm sản phẩm từ Home screen (mặc định = 1) -> thành công', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    // Click "Thêm vào giỏ"
    await page.locator('text="Thêm vào giỏ"').click();

    // Verify badge updates on navbar
    await expect(page.locator('text=/^Giỏ \\(1\\)/')).toBeVisible();

    // Navigate to cart
    await page.locator('text=/^Giỏ \\(1\\)/').click();
    await expect(page.locator('text="Giỏ Hàng"')).toBeVisible();

    // Verify quantity input value
    const qtyInput = page.locator('input');
    await expect(qtyInput).toHaveValue('1');
  });

  test('TC-CART-MOBILE-002: Thêm sản phẩm từ trang chi tiết với số lượng hợp lệ (2) -> giỏ hàng tăng 2', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Xem chi tiết"').click();
    await expect(page.locator('text="Mô tả Sản phẩm A"')).toBeVisible();

    const qtyInput = page.locator('input');
    await qtyInput.fill('2');

    await page.locator('text="Thêm vào giỏ hàng"').click();

    // Go to cart
    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await expect(cartQtyInput).toHaveValue('2');
  });

  test('TC-CART-MOBILE-003: Thêm sản phẩm từ trang chi tiết với số lượng = 0 -> tự chuẩn hóa về 1', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Xem chi tiết"').click();

    const qtyInput = page.locator('input');
    await qtyInput.fill('0');

    await page.locator('text="Thêm vào giỏ hàng"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await expect(cartQtyInput).toHaveValue('1');
  });

  test('TC-CART-MOBILE-004: Thêm sản phẩm từ trang chi tiết với số lượng âm (-1) -> tự chuẩn hóa về 1', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Xem chi tiết"').click();

    const qtyInput = page.locator('input');
    await qtyInput.fill('-1');

    await page.locator('text="Thêm vào giỏ hàng"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await expect(cartQtyInput).toHaveValue('1');
  });

  test('TC-CART-MOBILE-005: Thêm sản phẩm từ trang chi tiết với số lượng thập phân (1.5) -> tự chuẩn hóa về 1', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Xem chi tiết"').click();

    const qtyInput = page.locator('input');
    await qtyInput.fill('1.5');

    await page.locator('text="Thêm vào giỏ hàng"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await expect(cartQtyInput).toHaveValue('1');
  });

  test('TC-CART-MOBILE-006: Thêm sản phẩm từ trang chi tiết với số lượng rỗng ("") -> tự chuẩn hóa về 1', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Xem chi tiết"').click();

    const qtyInput = page.locator('input');
    await qtyInput.fill('');

    await page.locator('text="Thêm vào giỏ hàng"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await expect(cartQtyInput).toHaveValue('1');
  });

  test('TC-CART-MOBILE-007: Thêm sản phẩm từ trang chi tiết với số lượng không phải số ("abc") -> tự chuẩn hóa về 1', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Xem chi tiết"').click();

    const qtyInput = page.locator('input');
    await qtyInput.fill('abc');

    await page.locator('text="Thêm vào giỏ hàng"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await expect(cartQtyInput).toHaveValue('1');
  });

  test('TC-CART-MOBILE-008: Sửa số lượng trong giỏ thành số hợp lệ (2) -> tăng lên 3 (Do bug parsed + 1)', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await cartQtyInput.fill('2');

    // Expected value = 2. But actual value will be 3 (BUG)
    await expect(cartQtyInput).toHaveValue('3');
  });

  test('TC-CART-MOBILE-009: Sửa số lượng trong giỏ thành 0 -> tự chuẩn hóa về 1', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await cartQtyInput.fill('0');

    await expect(cartQtyInput).toHaveValue('1');
  });

  test('TC-CART-MOBILE-010: Sửa số lượng trong giỏ thành số âm (-1) -> tự chuẩn hóa về 1', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await cartQtyInput.fill('-1');

    await expect(cartQtyInput).toHaveValue('1');
  });

  test('TC-CART-MOBILE-011: Sửa số lượng trong giỏ thành số thập phân (1.5) -> tự chuẩn hóa về 2 (parsed = 1 + 1 = 2)', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await cartQtyInput.fill('1.5');

    // Expected value = 1 (if normalized) or 1.5. Actual will be 2 (due to parseInt("1.5") = 1, then parsed + 1 = 2)
    await expect(cartQtyInput).toHaveValue('2');
  });

  test('TC-CART-MOBILE-012: Sửa số lượng trong giỏ thành rỗng ("") -> tự chuẩn hóa về 1', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await cartQtyInput.fill('');

    await expect(cartQtyInput).toHaveValue('1');
  });

  test('TC-CART-MOBILE-013: Sửa số lượng trong giỏ thành không phải số ("abc") -> tự chuẩn hóa về 1', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await cartQtyInput.fill('abc');

    await expect(cartQtyInput).toHaveValue('1');
  });

  test('TC-CART-MOBILE-014: Xóa sản phẩm khỏi giỏ hàng -> bị xóa ngay lập tức không có Dialog xác nhận (Bug)', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    await expect(page.locator('text="Sản phẩm A"')).toBeVisible();

    // Click "Xóa"
    let dialogTriggered = false;
    page.on('dialog', (dialog) => {
      dialogTriggered = true;
      dialog.dismiss();
    });

    await page.click('text="Xóa"');
    await page.waitForTimeout(500);

    // Verify it is removed immediately without triggering confirm dialog (BUG)
    expect(dialogTriggered).toBeFalsy();
    await expect(page.locator('text="Giỏ hàng của bạn đang trống"')).toBeVisible();
  });

  test('TC-CART-MOBILE-015: Bấm "Tiếp tục mua sắm" hoặc "← Mua tiếp" -> quay lại màn hình Home', async ({
    page,
  }) => {
    await loginMobileAdmin(page);

    await page.locator('text=/^Giỏ \\(0\\)/').click();
    await expect(page.locator('text="Giỏ hàng của bạn đang trống"')).toBeVisible();

    // Click "Tiếp tục mua sắm"
    await page.click('text="Tiếp tục mua sắm"');
    await expect(page.locator('text="Danh sách sản phẩm"')).toBeVisible();

    // Add an item to test the cart page "← Mua tiếp" button
    await targetProduct(page, 'Sản phẩm A');
    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    await page.click('text="← Mua tiếp"');
    await expect(page.locator('text="Danh sách sản phẩm"')).toBeVisible();
  });

  test('TC-CART-MOBILE-016: Chưa đăng nhập bấm "Tiến hành thanh toán" -> hiển thị thông báo yêu cầu đăng nhập, chuyển tới Đăng nhập', async ({
    page,
  }) => {
    await page.goto(MOBILE_URL);
    await page.locator('text="EShop Mobile"').waitFor({ state: 'visible', timeout: 25000 });

    // Log out first if logged in
    const loggedInIndicator = page.locator('div:has-text("Chào, ")').first();
    if (await loggedInIndicator.isVisible()) {
      await loggedInIndicator.click();
      await page.locator('text="Thoát"').click();
      await page.locator('text="EShop Mobile"').waitFor({ state: 'visible', timeout: 5000 });
    }

    await targetProduct(page, 'Sản phẩm A');
    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();

    // Click "Tiến hành thanh toán"
    const checkoutBtn = page.locator('text="Tiến hành thanh toán"');
    await checkoutBtn.click();

    // Should redirect to Login screen
    await expect(page.locator('text="Đăng Nhập"')).toBeVisible();
  });

  test('TC-CART-MOBILE-017: Đã đăng nhập bấm "Tiến hành thanh toán" -> chuyển hướng đến Checkout page thành công', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    await page.click('text="Tiến hành thanh toán"');

    await expect(page.locator('text="Xác Nhận Đơn Hàng"')).toBeVisible();
  });

  test('TC-CART-MOBILE-018: Thêm sản phẩm từ trang chi tiết với số lượng = 1 (BVA ON) -> thêm thành công số lượng 1', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Xem chi tiết"').click();

    const qtyInput = page.locator('input');
    await qtyInput.fill('1');

    await page.locator('text="Thêm vào giỏ hàng"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await expect(cartQtyInput).toHaveValue('1');
  });

  test('TC-CART-MOBILE-019: Thêm sản phẩm từ trang chi tiết với số lượng = 2 (BVA IN) -> thêm thành công số lượng 2', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Xem chi tiết"').click();

    const qtyInput = page.locator('input');
    await qtyInput.fill('2');

    await page.locator('text="Thêm vào giỏ hàng"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await expect(cartQtyInput).toHaveValue('2');
  });

  test('TC-CART-MOBILE-020: Sửa số lượng trong giỏ thành 1 (BVA ON) -> cập nhật thành 2 (Bug parsed + 1)', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');

    // Double fill to force change trigger on React Native Web
    await cartQtyInput.fill('2');
    await cartQtyInput.fill('1');

    // Expected value = 1. Actual value will be 2 (BUG)
    await expect(cartQtyInput).toHaveValue('2');
  });

  test('TC-CART-MOBILE-021: Sửa số lượng trong giỏ thành 2 (BVA IN) -> cập nhật thành 3 (Bug parsed + 1)', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();
    const cartQtyInput = page.locator('input');
    await cartQtyInput.fill('2');

    // Expected value = 2. But actual value will be 3 (BUG)
    await expect(cartQtyInput).toHaveValue('3');
  });

  test('TC-CART-MOBILE-022: Kiểm tra định dạng hiển thị tiền tệ, màu sắc nút bấm và nhãn hiển thị Tổng cộng (Lỗi nhãn)', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Thêm vào giỏ"').click();

    await page.locator('text=/^Giỏ \\(1\\)/').click();

    // Verify Vietnamese dot separator format: "100.000 ₫".
    // This will FAIL because actual app renders English comma formatting: "100,000 ₫"
    const priceText = page.locator('text="Giá: 100.000 ₫"');
    await expect(priceText).toBeVisible();

    const subtotalText = page.locator('text="Thành tiền: 100.000 ₫"');
    await expect(subtotalText).toBeVisible();

    // Nhãn hiển thị tổng tiền (FR-07): Phải hiển thị chính xác là "Tổng cộng".
    // This will FAIL because actual app displays "Tổng tạm tính"
    const totalLabel = page.locator('text="Tổng cộng:"');
    await expect(totalLabel).toBeVisible();
  });

  test('TC-CART-MOBILE-023: Kiểm tra badge số lượng sản phẩm hiển thị trên Navbar (Lỗi đếm số lượng)', async ({
    page,
  }) => {
    await loginMobileAdmin(page);
    await targetProduct(page, 'Sản phẩm A');

    await page.locator('text="Xem chi tiết"').click();
    const qtyInput = page.locator('input');
    await qtyInput.fill('2');
    await page.locator('text="Thêm vào giỏ hàng"').click();

    // Navbar badge is expected to be "Giỏ (2)".
    // This will FAIL because it displays unique items "Giỏ (1)" (BUG)
    await expect(page.locator('text=/^Giỏ \\(2\\)/')).toBeVisible();

    // Return home and add "Sản phẩm B" with quantity = 1
    await page.locator('text="EShop Mobile"').click();
    await targetProduct(page, 'Sản phẩm B');
    await page.locator('text="Thêm vào giỏ"').click();

    // Expected: "Giỏ (3)". Actual will display "Giỏ (2)"
    await expect(page.locator('text=/^Giỏ \\(3\\)/')).toBeVisible();
  });

  test('TC-CART-MOBILE-024: Kiểm tra giao diện khi giỏ hàng trống (Lỗi thiếu hình minh họa)', async ({
    page,
  }) => {
    await loginMobileAdmin(page);

    await page.locator('text=/^Giỏ \\(0\\)/').click();
    await expect(page.locator('text="Giỏ hàng của bạn đang trống"')).toBeVisible();

    // Under FR-07/FR-24, empty state should show an illustration image or icon.
    // This will FAIL because only plain text and links are displayed (BUG)
    const emptyBox = page
      .locator('div')
      .filter({ has: page.locator('text="Giỏ hàng của bạn đang trống"') })
      .last();
    const illustrationImage = emptyBox.locator('img, svg');
    await expect(illustrationImage).toBeVisible({ timeout: 1000 });
  });
});
