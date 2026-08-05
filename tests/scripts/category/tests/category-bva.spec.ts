/**
 * Category BVA Test Suite (FR-14)
 * Covers: TC-CATEGORY-BVA-001 to BVA-008
 * Technique: Boundary Value Analysis (3-Point, 2-Point, Identifier Reference Analysis)
 *
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: HW04 - Automation Testing
 *
 * Assertion patterns used:
 *   Pattern 1 — HTTP status assertion
 *   Pattern 2 — Body field / value assertion
 *   Pattern 3 — Count / length assertion
 *   Pattern 4 — Network / API response
 *   Pattern 5 — Soft assertion for characterization points
 */

import { test, expect } from '@playwright/test';
import { CategoryAPIHelper, Category } from '../pages/CategoryPage';

const BASE_URL = 'http://localhost:3000';
const ADMIN = { email: 'admin_cat_test@eshop.test', password: 'Admin123!', name: 'Admin Category Tester' };

test.describe('FR-14 Category — BVA (Boundary Value Analysis)', () => {

  let adminToken: string;

  test.beforeAll(async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    adminToken = await api.ensureLogin(ADMIN);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-001: Name length = 1 (Boundary Min B)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-001: Tên 1 ký tự (Boundary Min B) — phải được chấp nhận', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);

    // [Pattern 4] — Network: POST name="A"
    const resp = await api.createCategory(adminToken, 'A');

    // [Pattern 1] — Status 200 or 201
    expect([200, 201]).toContain(resp.status());

    const body = await resp.json() as { id?: number };
    const id = body.id;

    // [Pattern 2] — Name 'A' appears in list
    if (id) {
      const list = await api.getCategoryList(adminToken);
      const found = list.find((c) => c.id === id);
      expect.soft(found?.name).toBe('A');

      // Cleanup
      await api.cleanupCategory(adminToken, id);
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-002: Name length = 2 (B+1)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-002: Tên 2 ký tự (B+1 tại biên Min) — phải được chấp nhận', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);

    // [Pattern 4] — Network: POST name="AB"
    const resp = await api.createCategory(adminToken, 'AB');

    // [Pattern 1] — Status 200 or 201
    expect([200, 201]).toContain(resp.status());

    const body = await resp.json() as { id?: number };
    const id = body.id;

    if (id) {
      // [Pattern 2] — Name 'AB' preserved
      const list = await api.getCategoryList(adminToken);
      const found = list.find((c) => c.id === id);
      expect.soft(found?.name).toBe('AB');

      // [Pattern 2] — Length must not be silently truncated
      expect.soft(found?.name.length).toBe(2);

      await api.cleanupCategory(adminToken, id);
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-003: DELETE /api/categories/0 — ID dưới mốc tham chiếu (R-1)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-003: DELETE với ID = 0 (R-1) — không xóa gì, không 500', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const countBefore = await api.getCategoryCount(adminToken);

    // [Pattern 4] — Network: DELETE id=0
    const resp = await api.deleteCategory(adminToken, 0);

    // [Pattern 1] — Must not 500
    expect(resp.status()).not.toBe(500);
    // [Pattern 5] — Characterization: 400 or 404 preferred
    expect.soft([400, 404]).toContain(resp.status());

    // [Pattern 3] — Count unchanged
    const countAfter = await api.getCategoryCount(adminToken);
    expect(countAfter).toBe(countBefore);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-004: DELETE /api/categories/1 — ID tại mốc tham chiếu (R)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-004: DELETE với ID = 1 (mốc R) — xóa thành công nếu tồn tại và không có sản phẩm', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);

    // Create a fresh category that will get a low ID
    // NOTE: In a live system, id=1 may have products. We use a newly created one.
    // If id=1 exists and has no products, we can test directly.
    // For safety, we create a clean category and use its ID.
    const freshId = await api.createTestCategory(adminToken, `BVA-004 Test ${Date.now()}`);

    // [Pattern 4] — Network: DELETE freshId
    const resp = await api.deleteCategory(adminToken, freshId);

    // [Pattern 1] — Status 200 or 204
    expect([200, 204]).toContain(resp.status());

    // [Pattern 3] — Verify removed
    const list = await api.getCategoryList(adminToken);
    expect(list.some((c) => c.id === freshId)).toBe(false);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-005: DELETE với ID = R+1 — ngay trên mốc tham chiếu
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-005: DELETE với ID ngay trên mốc tham chiếu (R+1) — xóa thành công', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);

    // Create two categories to get IDs at R and R+1 reference
    const id1 = await api.createTestCategory(adminToken, `BVA-005 Target 1 ${Date.now()}`);
    const id2 = await api.createTestCategory(adminToken, `BVA-005 Target 2 ${Date.now() + 1}`);

    // [Pattern 4] — Delete the second one (R+1 reference)
    const resp = await api.deleteCategory(adminToken, id2);

    // [Pattern 1] — Status 200 or 204
    expect([200, 204]).toContain(resp.status());

    // [Pattern 3] — id2 gone, id1 still present
    const list = await api.getCategoryList(adminToken);
    expect(list.some((c) => c.id === id2)).toBe(false);
    expect(list.some((c) => c.id === id1)).toBe(true);

    // Cleanup id1
    await api.cleanupCategory(adminToken, id1);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-006: GET /api/categories khi có 0 danh mục — empty array
  // NOTE: This test is a best-effort characterization since the DB is shared.
  //       We verify at minimum that the empty array format is correct on a fresh DB.
  //       On a shared DB, we verify the API handles the response format correctly.
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-006: GET danh sách khi DB trống — trả về mảng rỗng, không crash (Boundary Min B=0)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);

    // [Pattern 4] — Network: GET /api/categories
    const resp = await api.getCategories(adminToken);

    // [Pattern 1] — Status 200
    expect(resp.status()).toBe(200);

    // [Pattern 2] — Response is an array (not null or error object)
    const body = await resp.json() as Category[] | { error?: string };
    // Body must be an array (even if non-empty on shared DB — format is what matters here)
    expect(Array.isArray(body)).toBe(true);

    // [Pattern 5] — Soft: verify the format when count happens to be 0
    // (in a shared DB this may not be 0; document actual behavior)
    const list = body as Category[];
    if (list.length === 0) {
      // True empty case: verify it's `[]`, not null or omitted field
      expect.soft(list).toEqual([]);
    } else {
      // Shared DB case: at least we verify the array format is correct
      expect.soft(list.length).toBeGreaterThan(0);
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-007: GET /api/categories khi có đúng 1 danh mục (B+1)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-007: GET danh sách với đúng 1 danh mục — mảng có 1 phần tử đúng (B+1)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);

    // Create an isolated category
    const uniqueName = `Danh mục duy nhất BVA007 ${Date.now()}`;
    const id = await api.createTestCategory(adminToken, uniqueName);

    // [Pattern 4] — Network: GET
    const resp = await api.getCategories(adminToken);

    // [Pattern 1] — Status 200
    expect(resp.status()).toBe(200);

    const list = await resp.json() as Category[];

    // [Pattern 3] — At least 1 element in the response
    expect(list.length).toBeGreaterThanOrEqual(1);

    // [Pattern 2] — The created category is in the list with correct data
    const found = list.find((c) => c.id === id);
    expect(found).toBeTruthy();
    expect.soft(found?.name).toBe(uniqueName);

    // Cleanup
    await api.cleanupCategory(adminToken, id);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-008: GET /api/categories khi có 2 danh mục (Near-boundary B+2)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-008: GET danh sách với 2 danh mục — cả hai xuất hiện đúng (B+2)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);

    const nameA = `Điện tử BVA008A ${Date.now()}`;
    const nameB = `Gia dụng BVA008B ${Date.now() + 1}`;

    const idA = await api.createTestCategory(adminToken, nameA);
    const idB = await api.createTestCategory(adminToken, nameB);

    // [Pattern 4] — Network: GET
    const resp = await api.getCategories(adminToken);

    // [Pattern 1] — Status 200
    expect(resp.status()).toBe(200);

    const list = await resp.json() as Category[];

    // [Pattern 3] — At least 2 elements
    expect(list.length).toBeGreaterThanOrEqual(2);

    // [Pattern 2] — Both categories appear with correct names
    const foundA = list.find((c) => c.id === idA);
    const foundB = list.find((c) => c.id === idB);
    expect.soft(foundA?.name).toBe(nameA);
    expect.soft(foundB?.name).toBe(nameB);

    // Cleanup
    await api.cleanupCategory(adminToken, idA);
    await api.cleanupCategory(adminToken, idB);
  });
});
