/**
 * Category Auth/Authorization Test Suite (FR-14)
 * Covers: TC-CATEGORY-007, 008, 010, 011, 018
 * Technique: Equivalence Partitioning (Domain Testing), Data-driven
 *
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: HW04 - Automation Testing
 *
 * Assertion patterns used:
 *   Pattern 1 — HTTP status code (expect(resp.status()).toBe(...))
 *   Pattern 3 — Count/length assertion (count unchanged after unauthorized attempt)
 *   Pattern 4 — Network / API response
 */

import { test, expect } from '@playwright/test';
import { CategoryAPIHelper } from '../pages/CategoryPage';

const BASE_URL = 'http://localhost:3000';

// ─── Credentials ─────────────────────────────────────────────────────────────
const ADMIN       = { email: 'admin@eshop.com', password: 'Admin123!', name: 'Admin User' };
const NORMAL_USER = { email: 'test@eshop.com',  password: 'Test1234!', name: 'Test User' };

// ─── Suite ────────────────────────────────────────────────────────────────────
test.describe('FR-14 Category Authorization — Equivalence Partitioning', () => {

  let adminToken: string;
  let userToken: string;

  test.beforeAll(async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    adminToken = await api.ensureLogin(ADMIN);
    userToken  = await api.ensureLogin(NORMAL_USER);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-007: POST /api/categories — no auth token → 401/403
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-007: Thêm danh mục thất bại khi không có token (EC4 → OC6)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const countBefore = await api.getCategoryCount(adminToken);

    // [Pattern 4] — Network: POST without Authorization header
    const resp = await api.createCategory(null, 'Điện tử');

    // [Pattern 1] — Status 401 or 403
    expect([401, 403]).toContain(resp.status());

    // [Pattern 3] — No category was created
    const countAfter = await api.getCategoryCount(adminToken);
    expect(countAfter).toBe(countBefore);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-008: POST /api/categories — normal user token → 403
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-008: Thêm danh mục thất bại khi dùng token user thường (EC5 → OC6)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const countBefore = await api.getCategoryCount(adminToken);

    // [Pattern 4] — Network: POST with non-admin token
    const resp = await api.createCategory(userToken, 'Điện tử');

    // [Pattern 1] — Status 403
    expect(resp.status()).toBe(403);

    // [Pattern 3] — No category was created
    const countAfter = await api.getCategoryCount(adminToken);
    expect(countAfter).toBe(countBefore);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-010: DELETE /api/categories/:id — no auth → 401
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-010: Xóa danh mục thất bại khi không có token (EC4)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);

    // Ensure category id=1 exists or create a target
    const list = await api.getCategoryList(adminToken);
    let targetId: number;
    if (list.length > 0) {
      targetId = list[0].id;
    } else {
      targetId = await api.createTestCategory(adminToken, `Auth Test Target ${Date.now()}`);
    }

    // [Pattern 4] — Network: DELETE without token
    const resp = await api.deleteCategory(null, targetId);

    // [Pattern 1] — Status 401
    expect(resp.status()).toBe(401);

    // [Pattern 3] — Category still exists
    const listAfter = await api.getCategoryList(adminToken);
    expect(listAfter.some((c) => c.id === targetId)).toBe(true);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-011: DELETE /api/categories/:id — normal user token → 403
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-011: Xóa danh mục thất bại khi dùng token user thường (EC5)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);

    // Create target via admin
    const targetId = await api.createTestCategory(adminToken, `Forbidden Delete Target ${Date.now()}`);

    // [Pattern 4] — Network: DELETE with non-admin token
    const resp = await api.deleteCategory(userToken, targetId);

    // [Pattern 1] — Status 403
    expect(resp.status()).toBe(403);

    // [Pattern 3] — Category still exists
    const listAfter = await api.getCategoryList(adminToken);
    expect(listAfter.some((c) => c.id === targetId)).toBe(true);

    // Cleanup (must use admin token)
    await api.cleanupCategory(adminToken, targetId);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-018: Token sai chữ ký hoặc hết hạn — data-driven
  // ──────────────────────────────────────────────────────────────────────────
  const invalidTokenVariants = [
    {
      tcId: 'TC-CATEGORY-018-1',
      label: 'token sai chữ ký',
      authHeader: 'Bearer invalid.token.signature',
      categoryName: 'Token sai',
    },
    {
      tcId: 'TC-CATEGORY-018-2',
      label: 'token hết hạn (expired JWT)',
      // A syntactically valid but expired JWT (exp = 1700000001, long past)
      authHeader: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBlc2hvcC52biIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzAwMDAwMDAxfQ.INVALID_EXPIRED',
      categoryName: 'Token hết hạn',
    },
  ] as const;

  for (const variant of invalidTokenVariants) {
    test(`${variant.tcId}: Từ chối tạo danh mục với ${variant.label} (EC16)`, async ({ request }) => {
      const api = new CategoryAPIHelper(request, BASE_URL);
      const countBefore = await api.getCategoryCount(adminToken);

      // [Pattern 4] — Network: POST with invalid/expired token
      const resp = await api.createCategoryWithRawAuth(
        variant.authHeader,
        { name: variant.categoryName }
      );

      // [Pattern 1] — Status 401 or 403
      expect([401, 403]).toContain(resp.status());

      // [Pattern 3] — No category created
      const countAfter = await api.getCategoryCount(adminToken);
      expect(countAfter).toBe(countBefore);
    });
  }
});
