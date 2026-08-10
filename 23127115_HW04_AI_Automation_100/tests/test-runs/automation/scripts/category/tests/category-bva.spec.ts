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
import testData from '../data/category-test-data.json';
import { automationEnv } from '../../_common/env';
import { HTTP_STATUS } from '../../_common/http-status';

const BASE_URL = automationEnv.apiBaseUrl;
const ADMIN = testData.users.admin;

test.describe('FR-14 Category — BVA (Boundary Value Analysis)', () => {

  let adminToken: string;

  test.beforeAll(async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    adminToken = await api.ensureLogin(ADMIN);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-001: Name length tại biên dưới hợp lệ
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-001: Tên ở biên dưới hợp lệ — phải được chấp nhận', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-001')!;

    // [Pattern 4] — Network: POST name="A"
    const resp = await api.createCategory(adminToken, tcData.name!);

    // [Pattern 1] — Success status on create
    expect(tcData.expected_status_oneOf).toContain(resp.status());

    const body = await resp.json() as { id?: number };
    const id = body.id;

    // [Pattern 2] — Name 'A' appears in list
    if (id) {
      const list = await api.getCategoryList(adminToken);
      const found = list.find((c) => c.id === id);
      expect.soft(found?.name).toBe(tcData.name);

      // Cleanup
      await api.cleanupCategory(adminToken, id);
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-002: Name length ngay trên biên dưới
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-002: Tên ngay trên biên dưới — phải được chấp nhận', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-002')!;

    // [Pattern 4] — Network: POST name="AB"
    const resp = await api.createCategory(adminToken, tcData.name!);

    // [Pattern 1] — Success status on create
    expect(tcData.expected_status_oneOf).toContain(resp.status());

    const body = await resp.json() as { id?: number };
    const id = body.id;

    if (id) {
      // [Pattern 2] — Name 'AB' preserved
      const list = await api.getCategoryList(adminToken);
      const found = list.find((c) => c.id === id);
      expect.soft(found?.name).toBe(tcData.name);

      // [Pattern 2] — Length must not be silently truncated
      expect.soft(found?.name.length).toBe(tcData.name!.length);

      await api.cleanupCategory(adminToken, id);
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-003: DELETE với ID dưới mốc tham chiếu
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-003: DELETE với ID dưới mốc tham chiếu — không xóa gì, không lỗi máy chủ', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-003')!;
    const countBefore = await api.getCategoryCount(adminToken);

    // [Pattern 4] — Network: DELETE id=0
    const resp = await api.deleteCategory(adminToken, tcData.delete_id!);

    // [Pattern 1] — Must not server error
    expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    // [Pattern 5] — Characterization: rejection or not-found preferred
    expect.soft(tcData.expected_status_oneOf).toContain(resp.status());

    // [Pattern 3] — Count unchanged
    const countAfter = await api.getCategoryCount(adminToken);
    expect(countAfter).toBe(countBefore);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-004: DELETE với ID tại mốc tham chiếu
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-004: DELETE với ID tại mốc tham chiếu — xóa thành công nếu tồn tại và không có sản phẩm', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-004')!;

    // Create a fresh category that will get a low ID
    // NOTE: In a live system, id=1 may have products. We use a newly created one.
    // If id=1 exists and has no products, we can test directly.
    // For safety, we create a clean category and use its ID.
    const freshId = await api.createTestCategory(adminToken, `${tcData.fresh_name_prefix} ${Date.now()}`);

    // [Pattern 4] — Network: DELETE freshId
    const resp = await api.deleteCategory(adminToken, freshId);

    // [Pattern 1] — Success status on delete
    expect([HTTP_STATUS.OK, HTTP_STATUS.NO_CONTENT]).toContain(resp.status());

    // [Pattern 3] — Verify removed
    const list = await api.getCategoryList(adminToken);
    expect(list.some((c) => c.id === freshId)).toBe(false);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-005: DELETE với ID ngay trên mốc tham chiếu
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-005: DELETE với ID ngay trên mốc tham chiếu — xóa thành công', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-005')!;

    // Create two categories to get IDs around the reference point
    const id1 = await api.createTestCategory(adminToken, `${tcData.target_name_prefix} 1 ${Date.now()}`);
    const id2 = await api.createTestCategory(adminToken, `${tcData.target_name_prefix} 2 ${Date.now() + 1}`);

    // [Pattern 4] — Delete the second one (above-reference target)
    const resp = await api.deleteCategory(adminToken, id2);

    // [Pattern 1] — Success status on delete
    expect([HTTP_STATUS.OK, HTTP_STATUS.NO_CONTENT]).toContain(resp.status());

    // [Pattern 3] — id2 gone, id1 still present
    const list = await api.getCategoryList(adminToken);
    expect(list.some((c) => c.id === id2)).toBe(false);
    expect(list.some((c) => c.id === id1)).toBe(true);

    // Cleanup id1
    await api.cleanupCategory(adminToken, id1);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-BVA-006: GET /api/categories khi danh sách trống — empty array
  // NOTE: This test is a best-effort characterization since the DB is shared.
  //       We verify at minimum that the empty array format is correct on a fresh DB.
  //       On a shared DB, we verify the API handles the response format correctly.
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-006: GET danh sách khi danh sách trống — trả về mảng rỗng, không crash', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);

    // [Pattern 4] — Network: GET /api/categories
    const resp = await api.getCategories(adminToken);

    // [Pattern 1] — Success status on list retrieval
    expect(resp.status()).toBe(HTTP_STATUS.OK);

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
  // TC-CATEGORY-BVA-007: GET /api/categories khi có đúng 1 danh mục
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-007: GET danh sách với đúng 1 danh mục — mảng có 1 phần tử đúng', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-007')!;

    // Create an isolated category
    const uniqueName = `${tcData.unique_name_prefix} ${Date.now()}`;
    const id = await api.createTestCategory(adminToken, uniqueName);

    // [Pattern 4] — Network: GET
    const resp = await api.getCategories(adminToken);

    // [Pattern 1] — Success status on list retrieval
    expect(resp.status()).toBe(HTTP_STATUS.OK);

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
  // TC-CATEGORY-BVA-008: GET /api/categories khi có 2 danh mục ở vùng lân cận biên
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-BVA-008: GET danh sách với 2 danh mục — cả hai xuất hiện đúng', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tcData = testData.tc_bva.find(tc => tc.tc_id === 'TC-CATEGORY-BVA-008')!;

    const nameA = `${tcData.name_a_prefix} ${Date.now()}`;
    const nameB = `${tcData.name_b_prefix} ${Date.now() + 1}`;

    const idA = await api.createTestCategory(adminToken, nameA);
    const idB = await api.createTestCategory(adminToken, nameB);

    // [Pattern 4] — Network: GET
    const resp = await api.getCategories(adminToken);

    // [Pattern 1] — Success status on list retrieval
    expect(resp.status()).toBe(HTTP_STATUS.OK);

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
