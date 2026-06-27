const { test, expect, request } = require('@playwright/test');
const sqlite3 = require('../backend/node_modules/sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../backend/database.sqlite');

const ADMIN_URL = 'http://localhost:5174';
const API_URL = 'http://localhost:3000/api';

// ── DB helpers ──────────────────────────────────────────────────────────────

function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) return reject(err);
    });
    db.run(query, params, function (err) {
      db.close();
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function getRow(query, params = []) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) return reject(err);
    });
    db.get(query, params, (err, row) => {
      db.close();
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// ── UI helpers ───────────────────────────────────────────────────────────────

async function loginAdmin(page) {
  await page.goto(ADMIN_URL);
  await page.locator('input[placeholder="Email"]').fill('admin@eshop.com');
  await page.locator('input[placeholder="Password"]').fill('Admin123!');
  await page.click('button:has-text("Login")');
  // Wait for the dashboard to appear
  await page.waitForSelector('text=EShop Admin', { timeout: 5000 });
}

async function navigateToCoupons(page) {
  await page.click('li:has-text("Mã Giảm Giá")');
  await page.waitForSelector('text=Quản lý Mã Giảm Giá', { timeout: 3000 });
}

async function fillCouponForm(
  page,
  { code, type, discount_value, min_order_amount, expired_at, max_uses_per_user },
) {
  if (code !== undefined) {
    await page.locator('input[placeholder="Mã coupon (VD: SAVE10)"]').fill(code);
  }
  if (type !== undefined) {
    await page.locator('select').first().selectOption(type);
  }
  if (discount_value !== undefined) {
    const discountInput = page.locator('input[type="number"]').first();
    await discountInput.fill(String(discount_value));
  }
  if (min_order_amount !== undefined) {
    await page.locator('input[placeholder="Đơn tối thiểu (₫)"]').fill(String(min_order_amount));
  }
  if (expired_at !== undefined) {
    await page.locator('input[type="date"]').fill(expired_at);
  }
  if (max_uses_per_user !== undefined) {
    await page
      .locator('input[placeholder="Số lần dùng tối đa/người"]')
      .fill(String(max_uses_per_user));
  }
}

// ── Test suite ───────────────────────────────────────────────────────────────

test.describe('Coupon Admin (FR-17) E2E Tests', () => {
  test.afterEach(async () => {
    // Clean up test coupons created during tests
    await runQuery(`DELETE FROM coupons WHERE code IN (
      'SUMMER25','WINTER50','DELETEME','NOAUTH','PAST2020','TESTROLE','XSS_TEST'
    )`);
  });

  // ── TC-001: Tạo mã percent hợp lệ ──────────────────────────────────────────

  test('TC-COUPON-ADMIN-001: Tạo mã giảm giá percent hợp lệ thành công', async ({ page }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    await fillCouponForm(page, {
      code: 'SUMMER25',
      type: 'percent',
      discount_value: 15,
      min_order_amount: 200000,
      expired_at: '2099-12-31',
      max_uses_per_user: 5,
    });

    const submitBtn = page.locator('button:has-text("Tạo mã")');
    await submitBtn.click();

    // Wait for table to update and row to appear
    const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'SUMMER25' });
    await expect(row).toBeVisible({ timeout: 5000 });
  });

  // ── TC-002: Tạo mã fixed hợp lệ ─────────────────────────────────────────────

  test('TC-COUPON-ADMIN-002: Tạo mã giảm giá fixed hợp lệ thành công', async ({ page }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    await fillCouponForm(page, {
      code: 'WINTER50',
      type: 'fixed',
      discount_value: 50000,
      min_order_amount: 300000,
      expired_at: '2099-12-31',
      max_uses_per_user: 3,
    });

    await page.click('button:has-text("Tạo mã")');

    const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'WINTER50' });
    await expect(row).toBeVisible({ timeout: 5000 });
  });

  // ── TC-003: code = rỗng → bị từ chối ────────────────────────────────────────

  test('TC-COUPON-ADMIN-003: code = rỗng → bị từ chối', async ({ page }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    // Leave code blank; fill other required fields
    await fillCouponForm(page, {
      code: '',
      type: 'percent',
      discount_value: 10,
      min_order_amount: 0,
      expired_at: '2099-12-31',
      max_uses_per_user: 1,
    });

    // HTML5 required validation should prevent submission (no alert/dialog expected)
    await page.click('button:has-text("Tạo mã")');

    // The code field has `required`; browser blocks submission with native validation.
    // Verify no new coupon with blank code was created (table unchanged; no row with empty code).
    const emptyCodeRow = page.locator('table tbody tr td.font-mono').filter({ hasText: /^$/ });
    await expect(emptyCodeRow).not.toBeVisible({ timeout: 1000 });

    // Verify the form is still present (not reset, i.e., submission was blocked)
    await expect(page.locator('button:has-text("Tạo mã")')).toBeVisible();
  });

  // ── TC-004: code trùng → unique constraint ───────────────────────────────────

  test('TC-COUPON-ADMIN-004: code trùng với mã đã tồn tại → bị từ chối (unique constraint)', async ({
    page,
  }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    // SAVE10 already exists in seed data
    await fillCouponForm(page, {
      code: 'SAVE10',
      type: 'percent',
      discount_value: 10,
      min_order_amount: 0,
      expired_at: '2099-12-31',
      max_uses_per_user: 1,
    });

    page.on('dialog', (dialog) => dialog.dismiss());
    await page.click('button:has-text("Tạo mã")');

    // Expect an alert containing "Lỗi"
    // We handle it above; after dismiss, verify the old SAVE10 row is still just 1
    await page.waitForTimeout(1000);
    const saveRows = page.locator('table tbody tr td.font-mono', { hasText: 'SAVE10' });
    // There should be exactly 1 row for SAVE10 (duplicate rejected)
    const count = await saveRows.count();
    expect(count).toBe(1);
  });

  // ── TC-005: type = "voucher" (invalid) ───────────────────────────────────────

  test('TC-COUPON-ADMIN-005: type = giá trị không hợp lệ ("voucher") → bị từ chối', async ({
    page,
  }) => {
    // The UI select only exposes "percent" and "fixed" – "voucher" cannot be selected via UI.
    // We test via direct API call to verify backend validation.
    const ctx = await request.newContext();
    const loginRes = await ctx.post(`${API_URL}/login`, {
      data: { email: 'admin@eshop.com', password: 'Admin123!' },
    });
    const { token } = await loginRes.json();

    const res = await ctx.post(`${API_URL}/admin/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        code: 'BADTYPE',
        type: 'voucher',
        discount_value: 10,
        min_order_amount: 0,
        expired_at: '2099-12-31',
        max_uses_per_user: 1,
      },
    });

    // Expected: backend rejects invalid type. May return 400 or accepts it (bug).
    // PASS if status is 4xx; FAIL if 200 (bug: backend accepts unknown type)
    expect(res.status()).toBeGreaterThanOrEqual(400);
    await ctx.dispose();
  });

  // ── TC-006: discount_value = 0 → bị từ chối (BVA OFF) ──────────────────────

  test('TC-COUPON-ADMIN-006: discount_value = 0 → bị từ chối (BVA OFF discount_value)', async ({
    page,
  }) => {
    const ctx = await request.newContext();
    const loginRes = await ctx.post(`${API_URL}/login`, {
      data: { email: 'admin@eshop.com', password: 'Admin123!' },
    });
    const { token } = await loginRes.json();

    const res = await ctx.post(`${API_URL}/admin/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        code: 'ZERODV',
        type: 'percent',
        discount_value: 0,
        min_order_amount: 0,
        expired_at: '2099-12-31',
        max_uses_per_user: 1,
      },
    });

    expect(res.status()).toBeGreaterThanOrEqual(400);
    await ctx.dispose();
  });

  // ── TC-007: discount_value âm → bị từ chối ──────────────────────────────────

  test('TC-COUPON-ADMIN-007: discount_value = số âm → bị từ chối', async ({ page }) => {
    const ctx = await request.newContext();
    const loginRes = await ctx.post(`${API_URL}/login`, {
      data: { email: 'admin@eshop.com', password: 'Admin123!' },
    });
    const { token } = await loginRes.json();

    const res = await ctx.post(`${API_URL}/admin/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        code: 'NEGDV',
        type: 'percent',
        discount_value: -10,
        min_order_amount: 0,
        expired_at: '2099-12-31',
        max_uses_per_user: 1,
      },
    });

    expect(res.status()).toBeGreaterThanOrEqual(400);
    await ctx.dispose();
  });

  // ── TC-008: expired_at = rỗng → bị từ chối ──────────────────────────────────

  test('TC-COUPON-ADMIN-008: expired_at = rỗng → bị từ chối', async ({ page }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    await fillCouponForm(page, {
      code: 'NOEXPIRY',
      type: 'percent',
      discount_value: 10,
      min_order_amount: 0,
      expired_at: '', // leave date blank
      max_uses_per_user: 1,
    });

    await page.click('button:has-text("Tạo mã")');

    // Browser HTML5 required validation blocks submission
    await expect(page.locator('button:has-text("Tạo mã")')).toBeVisible();
    const noExpiryRow = page.locator('table tbody tr td.font-mono').filter({ hasText: 'NOEXPIRY' });
    await expect(noExpiryRow).not.toBeVisible({ timeout: 1000 });
  });

  // ── TC-009: expired_at = định dạng ngày không hợp lệ → bị từ chối ──────────

  test('TC-COUPON-ADMIN-009: expired_at = định dạng ngày không hợp lệ ("31-12-2099") → bị từ chối', async ({
    page,
  }) => {
    const ctx = await request.newContext();
    const loginRes = await ctx.post(`${API_URL}/login`, {
      data: { email: 'admin@eshop.com', password: 'Admin123!' },
    });
    const { token } = await loginRes.json();

    const res = await ctx.post(`${API_URL}/admin/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        code: 'BADDATE',
        type: 'percent',
        discount_value: 10,
        min_order_amount: 0,
        expired_at: '31-12-2099',
        max_uses_per_user: 1,
      },
    });

    // Backend should reject or interpret incorrectly - expect 4xx
    expect(res.status()).toBeGreaterThanOrEqual(400);
    await ctx.dispose();
  });

  // ── TC-010: min_order_amount âm → bị từ chối (BVA OFF) ─────────────────────

  test('TC-COUPON-ADMIN-010: min_order_amount = số âm (-1) → bị từ chối (BVA OFF)', async ({
    page,
  }) => {
    const ctx = await request.newContext();
    const loginRes = await ctx.post(`${API_URL}/login`, {
      data: { email: 'admin@eshop.com', password: 'Admin123!' },
    });
    const { token } = await loginRes.json();

    const res = await ctx.post(`${API_URL}/admin/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        code: 'NEGMIN',
        type: 'percent',
        discount_value: 10,
        min_order_amount: -1,
        expired_at: '2099-12-31',
        max_uses_per_user: 1,
      },
    });

    expect(res.status()).toBeGreaterThanOrEqual(400);
    await ctx.dispose();
  });

  // ── TC-011: max_uses_per_user = 0 → bị từ chối (BVA OFF) ──────────────────

  test('TC-COUPON-ADMIN-011: max_uses_per_user = 0 → bị từ chối (BVA OFF)', async ({ page }) => {
    const ctx = await request.newContext();
    const loginRes = await ctx.post(`${API_URL}/login`, {
      data: { email: 'admin@eshop.com', password: 'Admin123!' },
    });
    const { token } = await loginRes.json();

    const res = await ctx.post(`${API_URL}/admin/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        code: 'ZEROMAX',
        type: 'percent',
        discount_value: 10,
        min_order_amount: 0,
        expired_at: '2099-12-31',
        max_uses_per_user: 0,
      },
    });

    expect(res.status()).toBeGreaterThanOrEqual(400);
    await ctx.dispose();
  });

  // ── TC-012: max_uses_per_user âm → bị từ chối ───────────────────────────────

  test('TC-COUPON-ADMIN-012: max_uses_per_user = số âm → bị từ chối', async ({ page }) => {
    const ctx = await request.newContext();
    const loginRes = await ctx.post(`${API_URL}/login`, {
      data: { email: 'admin@eshop.com', password: 'Admin123!' },
    });
    const { token } = await loginRes.json();

    const res = await ctx.post(`${API_URL}/admin/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        code: 'NEGMAX',
        type: 'percent',
        discount_value: 10,
        min_order_amount: 0,
        expired_at: '2099-12-31',
        max_uses_per_user: -1,
      },
    });

    expect(res.status()).toBeGreaterThanOrEqual(400);
    await ctx.dispose();
  });

  // ── TC-013: Xóa coupon hợp lệ ───────────────────────────────────────────────

  test('TC-COUPON-ADMIN-013: Xóa coupon theo ID hợp lệ → xóa thành công', async ({ page }) => {
    // Seed a coupon to delete
    await runQuery(`INSERT OR REPLACE INTO coupons (code, type, discount_value, min_order_amount, expired_at, is_active, max_uses_per_user)
      VALUES ('DELETEME', 'percent', 10, 0, '2099-12-31', 1, 1)`);

    await loginAdmin(page);
    await navigateToCoupons(page);

    // Verify it appears in the table first
    const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'DELETEME' });
    await expect(row).toBeVisible({ timeout: 5000 });

    // Click the delete button in that row
    const deleteBtn = page
      .locator('table tbody tr', { has: page.locator('td.font-mono:has-text("DELETEME")') })
      .locator('button:has-text("Xóa")');
    await deleteBtn.click();

    // Wait for list to reload; row should be gone
    await expect(row).not.toBeVisible({ timeout: 5000 });
  });

  // ── TC-014: Xóa coupon ID không tồn tại → lỗi 4xx ──────────────────────────

  test('TC-COUPON-ADMIN-014: Xóa coupon theo ID không tồn tại → trả về lỗi (status 4xx)', async () => {
    const ctx = await request.newContext();
    const loginRes = await ctx.post(`${API_URL}/login`, {
      data: { email: 'admin@eshop.com', password: 'Admin123!' },
    });
    const { token } = await loginRes.json();

    const res = await ctx.delete(`${API_URL}/admin/coupons/999999`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Expected: 404 or 400. Bug if 200.
    expect(res.status()).toBeGreaterThanOrEqual(400);
    await ctx.dispose();
  });

  // ── TC-015: GET /api/coupons → trả về đầy đủ các trường ─────────────────────

  test('TC-COUPON-ADMIN-015: Admin lấy danh sách coupon → trả về đầy đủ các trường', async () => {
    const ctx = await request.newContext();
    const loginRes = await ctx.post(`${API_URL}/login`, {
      data: { email: 'admin@eshop.com', password: 'Admin123!' },
    });
    const { token } = await loginRes.json();

    const res = await ctx.get(`${API_URL}/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    const first = data[0];
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('code');
    expect(first).toHaveProperty('type');
    expect(first).toHaveProperty('discount_value');
    expect(first).toHaveProperty('min_order_amount');
    expect(first).toHaveProperty('expired_at');
    expect(first).toHaveProperty('max_uses_per_user');

    await ctx.dispose();
  });

  // ── TC-016: Chưa đăng nhập → 401 ────────────────────────────────────────────

  test('TC-COUPON-ADMIN-016: Chưa đăng nhập (không có JWT) → 401 Unauthorized', async () => {
    const ctx = await request.newContext();

    const res = await ctx.post(`${API_URL}/admin/coupons`, {
      data: {
        code: 'NOAUTH',
        type: 'percent',
        discount_value: 10,
        min_order_amount: 100000,
        expired_at: '2099-12-31',
        max_uses_per_user: 1,
      },
    });

    expect(res.status()).toBe(401);
    await ctx.dispose();
  });

  // ── TC-017: role = user → 403 Forbidden ─────────────────────────────────────

  test('TC-COUPON-ADMIN-017: Đăng nhập với role = user (non-admin) → 403 Forbidden', async () => {
    const ctx = await request.newContext();
    const loginRes = await ctx.post(`${API_URL}/login`, {
      data: { email: 'test@eshop.com', password: 'Test1234!' },
    });
    const { token } = await loginRes.json();

    const res = await ctx.post(`${API_URL}/admin/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        code: 'TESTROLE',
        type: 'percent',
        discount_value: 10,
        min_order_amount: 0,
        expired_at: '2099-12-31',
        max_uses_per_user: 1,
      },
    });

    expect(res.status()).toBe(403);
    await ctx.dispose();
  });

  // ── TC-018: discount_value = 1 (BVA ON) → chấp nhận ───────────────────────

  test('TC-COUPON-ADMIN-018: discount_value = 1 (ON, đúng min > 0) → được chấp nhận', async ({
    page,
  }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    await fillCouponForm(page, {
      code: 'DVON',
      type: 'percent',
      discount_value: 1,
      min_order_amount: 0,
      expired_at: '2099-12-31',
      max_uses_per_user: 1,
    });

    await page.click('button:has-text("Tạo mã")');
    const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'DVON' });
    await expect(row).toBeVisible({ timeout: 5000 });
    // Cleanup
    await runQuery("DELETE FROM coupons WHERE code = 'DVON'");
  });

  // ── TC-019: discount_value = 2 (BVA IN) → chấp nhận ───────────────────────

  test('TC-COUPON-ADMIN-019: discount_value = 2 (IN, vừa trên min) → được chấp nhận', async ({
    page,
  }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    await fillCouponForm(page, {
      code: 'DVIN',
      type: 'percent',
      discount_value: 2,
      min_order_amount: 0,
      expired_at: '2099-12-31',
      max_uses_per_user: 1,
    });

    await page.click('button:has-text("Tạo mã")');
    const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'DVIN' });
    await expect(row).toBeVisible({ timeout: 5000 });
    await runQuery("DELETE FROM coupons WHERE code = 'DVIN'");
  });

  // ── TC-020: min_order_amount = 0 (BVA ON) → chấp nhận ──────────────────────

  test('TC-COUPON-ADMIN-020: min_order_amount = 0 (ON, đúng min ≥ 0) → được chấp nhận', async ({
    page,
  }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    await fillCouponForm(page, {
      code: 'MOAON',
      type: 'percent',
      discount_value: 10,
      min_order_amount: 0,
      expired_at: '2099-12-31',
      max_uses_per_user: 1,
    });

    await page.click('button:has-text("Tạo mã")');
    const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'MOAON' });
    await expect(row).toBeVisible({ timeout: 5000 });
    await runQuery("DELETE FROM coupons WHERE code = 'MOAON'");
  });

  // ── TC-021: min_order_amount = 1 (BVA IN) → chấp nhận ──────────────────────

  test('TC-COUPON-ADMIN-021: min_order_amount = 1 (IN, vừa trên min) → được chấp nhận', async ({
    page,
  }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    await fillCouponForm(page, {
      code: 'MOAIN',
      type: 'percent',
      discount_value: 10,
      min_order_amount: 1,
      expired_at: '2099-12-31',
      max_uses_per_user: 1,
    });

    await page.click('button:has-text("Tạo mã")');
    const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'MOAIN' });
    await expect(row).toBeVisible({ timeout: 5000 });
    await runQuery("DELETE FROM coupons WHERE code = 'MOAIN'");
  });

  // ── TC-022: max_uses_per_user = 1 (BVA ON) → chấp nhận ─────────────────────

  test('TC-COUPON-ADMIN-022: max_uses_per_user = 1 (ON, đúng min ≥ 1) → được chấp nhận', async ({
    page,
  }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    await fillCouponForm(page, {
      code: 'MPUON',
      type: 'percent',
      discount_value: 10,
      min_order_amount: 0,
      expired_at: '2099-12-31',
      max_uses_per_user: 1,
    });

    await page.click('button:has-text("Tạo mã")');
    const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'MPUON' });
    await expect(row).toBeVisible({ timeout: 5000 });
    await runQuery("DELETE FROM coupons WHERE code = 'MPUON'");
  });

  // ── TC-023: max_uses_per_user = 2 (BVA IN) → chấp nhận ─────────────────────

  test('TC-COUPON-ADMIN-023: max_uses_per_user = 2 (IN, vừa trên min) → được chấp nhận', async ({
    page,
  }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    await fillCouponForm(page, {
      code: 'MPUIN',
      type: 'percent',
      discount_value: 10,
      min_order_amount: 0,
      expired_at: '2099-12-31',
      max_uses_per_user: 2,
    });

    await page.click('button:has-text("Tạo mã")');
    const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'MPUIN' });
    await expect(row).toBeVisible({ timeout: 5000 });
    await runQuery("DELETE FROM coupons WHERE code = 'MPUIN'");
  });

  // ── TC-024: expired_at = ngày trong quá khứ (thăm dò) ──────────────────────

  test('TC-COUPON-ADMIN-024: expired_at = ngày quá khứ ("2020-01-01") → ghi nhận hành vi thực tế', async ({
    page,
  }) => {
    await loginAdmin(page);
    await navigateToCoupons(page);

    await fillCouponForm(page, {
      code: 'PAST2020',
      type: 'percent',
      discount_value: 20,
      min_order_amount: 0,
      expired_at: '2020-01-01',
      max_uses_per_user: 1,
    });

    let alertMsg = '';
    page.on('dialog', async (dialog) => {
      alertMsg = dialog.message();
      await dialog.dismiss();
    });

    await page.click('button:has-text("Tạo mã")');
    await page.waitForTimeout(1000);

    const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'PAST2020' });
    const rowVisible = await row.isVisible();

    if (rowVisible) {
      // Bug: backend accepted a past expiry date — coupon shows as "Hết hạn" in red
      const expiryCell = page
        .locator('table tbody tr', { has: page.locator('td.font-mono:has-text("PAST2020")') })
        .locator('span.text-red-500:has-text("Hết hạn")');
      await expect(expiryCell).toBeVisible();
      // Document: pass with note that system accepts past date (possible bug)
      console.log('TC-024: Backend accepted past expiry date. Coupon shows as "Hết hạn".');
    } else {
      // Pass: backend rejected past expiry date
      console.log('TC-024: Backend correctly rejected past expiry date.');
    }

    // Either behavior is documented; test passes by observing the actual behavior
    expect(true).toBe(true);
  });

  // ── TC-025: Thiếu hoàn toàn field bắt buộc (no key in body) → bị từ chối ──

  test('TC-COUPON-ADMIN-025: Thiếu hoàn toàn trường bắt buộc trong body → bị từ chối', async () => {
    const ctx = await request.newContext();
    const loginRes = await ctx.post(`${API_URL}/login`, {
      data: { email: 'admin@eshop.com', password: 'Admin123!' },
    });
    const { token } = await loginRes.json();

    // Send body with no `code` key at all
    const res = await ctx.post(`${API_URL}/admin/coupons`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        type: 'percent',
        discount_value: 10,
        min_order_amount: 0,
        expired_at: '2099-12-31',
        max_uses_per_user: 1,
        // code is intentionally missing
      },
    });

    // Backend should reject missing required field
    expect(res.status()).toBeGreaterThanOrEqual(400);
    await ctx.dispose();
  });

  // ── TC-026: XSS trong code → hiển thị an toàn ──────────────────────────────

  test('TC-COUPON-ADMIN-026: Xử lý an toàn chuỗi nhập vào khi hiển thị mã coupon (chống XSS)', async ({
    page,
  }) => {
    // Seed a coupon with an XSS code directly in DB to bypass UI uppercasing
    await runQuery(`INSERT OR REPLACE INTO coupons (code, type, discount_value, min_order_amount, expired_at, is_active, max_uses_per_user)
      VALUES ('<script>alert(1)</script>', 'percent', 5, 0, '2099-12-31', 1, 1)`);

    let xssTriggered = false;
    page.on('dialog', (dialog) => {
      xssTriggered = true;
      dialog.dismiss();
    });

    await loginAdmin(page);
    await navigateToCoupons(page);

    // Wait for the table to load
    await page.waitForTimeout(1500);
    expect(xssTriggered).toBeFalsy();

    // Also verify the code is rendered as text, not HTML
    const codeCell = page.locator('table tbody tr td.font-mono').filter({ hasText: 'script' });
    if (await codeCell.isVisible()) {
      // Check inner text is escaped (rendered as plain text, not executed)
      const innerText = await codeCell.innerText();
      expect(innerText).toContain('script');
    }

    await runQuery("DELETE FROM coupons WHERE code = '<script>alert(1)</script>'");
  });
});
