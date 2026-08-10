/**
 * Category CRUD Test Suite (FR-14)
 * Covers: TC-CATEGORY-001, 002, 003, 004, 005, 006, 009, 012, 013, 014, 015, 019, 020
 * Technique: Equivalence Partitioning (Domain Testing), Data-driven
 *
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: HW04 - Automation Testing
 *
 * Assertion patterns used:
 *   Pattern 1 — HTTP status code  (expect(resp.status()).toBe(...))
 *   Pattern 2 — Body field / value (expect.soft on JSON fields)
 *   Pattern 3 — Count / length    (toHaveLength, toBeGreaterThan)
 *   Pattern 4 — Network / API     (request.post / get / delete)
 *   Pattern 5 — Soft assertion    (expect.soft for characterization tests)
 */

import { test, expect } from '@playwright/test';
import { CategoryAPIHelper, Category } from '../pages/CategoryPage';
import testData from '../data/category-test-data.json';
import { automationEnv } from '../../_common/env';
import { HTTP_STATUS } from '../../_common/http-status';

const BASE_URL = automationEnv.apiBaseUrl;

// ─── Shared credentials ───────────────────────────────────────────────────────
const ADMIN = testData.users.admin;

// ─── Suite ────────────────────────────────────────────────────────────────────
test.describe('FR-14 Category CRUD — Equivalence Partitioning', () => {

  let adminToken: string;

  test.beforeAll(async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    adminToken = await api.ensureLogin(ADMIN);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-001: Thêm danh mục thành công với tên hợp lệ
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-001: Thêm danh mục thành công với tên hợp lệ (EC1)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-001')!;
    const uniqueName = `${tc.name_prefix} TC001 ${Date.now()}`;

    // [Pattern 4] — Network: POST /api/categories
    const resp = await api.createCategory(adminToken, uniqueName);

    // [Pattern 1] — Success status on create
    expect(tc.expected_status_oneOf).toContain(resp.status());

    // [Pattern 2] — Body has id
    const body = await resp.json() as { id?: number; category?: { id: number } };
    const id = body.id ?? (body.category as Category | undefined)?.id;
    expect(id).toBeTruthy();

    // [Pattern 4] — Verify appears in list
    const listResp = await api.getCategories(adminToken);
    expect(listResp.status()).toBe(HTTP_STATUS.OK);
    const list = await listResp.json() as Category[];
    const found = list.some((c) => c.name === uniqueName);
    // [Pattern 2] — Name must be in list
    expect(found).toBe(true);

    // Cleanup
    if (id) await api.cleanupCategory(adminToken, id);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-002: Tên để trống → bị từ chối
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-002: Thêm danh mục thất bại khi tên rỗng (EC2)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-002')!;
    const countBefore = await api.getCategoryCount(adminToken);

    // [Pattern 4] — Network: POST with empty name
    const resp = await api.createCategory(adminToken, '');

    // [Pattern 1] — Validation rejection status
    expect(resp.status()).toBe(tc.expected_status);

    // [Pattern 3] — Count unchanged
    const countAfter = await api.getCategoryCount(adminToken);
    expect(countAfter).toBe(countBefore);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-003: Tên chỉ gồm khoảng trắng → bị từ chối
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-003: Thêm danh mục thất bại khi tên chỉ chứa khoảng trắng (EC3)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-003')!;
    const countBefore = await api.getCategoryCount(adminToken);

    // [Pattern 4] — Network: POST whitespace-only name
    const resp = await api.createCategory(adminToken, '   ');

    // [Pattern 1] — Validation rejection status
    expect(resp.status()).toBe(tc.expected_status);

    // [Pattern 3] — Count unchanged
    const countAfter = await api.getCategoryCount(adminToken);
    expect(countAfter).toBe(countBefore);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-004: Xem danh sách danh mục thành công
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-004: Xem danh sách danh mục thành công — GET /api/categories', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-004')!;

    // Pre-condition: ensure at least 2 categories exist
    const id1 = await api.createTestCategory(adminToken, `${tc.list_name_prefix_a} ${Date.now()}`);
    const id2 = await api.createTestCategory(adminToken, `${tc.list_name_prefix_b} ${Date.now() + 1}`);

    // [Pattern 4] — Network: GET /api/categories
    const resp = await api.getCategories(adminToken);

    // [Pattern 1] — Success status on list retrieval
    expect(resp.status()).toBe(tc.expected_status);

    // [Pattern 2] — Body is array with id and name fields
    const list = await resp.json() as Category[];
    expect(Array.isArray(list)).toBe(true);

    // [Pattern 3] — Must have at least 2 categories
    expect(list.length).toBeGreaterThanOrEqual(2);

    // [Pattern 2] — Each element has id and name
    for (const cat of list) {
      expect.soft(typeof cat.id).toBe('number');
      expect.soft(typeof cat.name).toBe('string');
    }

    // Cleanup
    await api.cleanupCategory(adminToken, id1);
    await api.cleanupCategory(adminToken, id2);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-005: Xóa danh mục thành công
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-005: Xóa danh mục thành công với ID hợp lệ (EC7)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-005')!;

    // Create a target category to delete
    const targetName = `${tc.delete_target_prefix} ${Date.now()}`;
    const targetId = await api.createTestCategory(adminToken, targetName);

    // [Pattern 4] — Network: DELETE
    const resp = await api.deleteCategory(adminToken, targetId);

    // [Pattern 1] — Success status on delete
    expect(tc.expected_status_oneOf).toContain(resp.status());

    // [Pattern 2] — Verify removed from list
    const list = await api.getCategoryList(adminToken);
    const stillExists = list.some((c) => c.id === targetId);
    expect(stillExists).toBe(false);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-006: Xóa category_id không tồn tại — xử lý có kiểm soát
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-006: Xóa category_id không tồn tại — không crash, không claim deleted (EC8)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_characterization.find((item) => item.tc_id === 'TC-CATEGORY-006')!;
    const countBefore = await api.getCategoryCount(adminToken);

    // [Pattern 4] — Network: DELETE non-existent ID
    const resp = await api.deleteCategory(adminToken, 99999);

    // [Pattern 1] — Must not server error
    expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    // [Pattern 5] — Nonexistent delete must not be reported as success
    expect(tc.expected_status_oneOf).toContain(resp.status());

    // [Pattern 3] — Category count unchanged
    const countAfter = await api.getCategoryCount(adminToken);
    expect(countAfter).toBe(countBefore);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-009: Chính sách xóa danh mục đang được sản phẩm tham chiếu
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-009: Xóa danh mục có sản phẩm liên kết — không để orphan records (EC9)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-009') as {
      protected_target_id: string | number;
      expected_status_oneOf: number[];
    };

    // This test documents the characterization policy for cascade delete.
    // We check behavior when deleting a category that likely has products (id=1 from seed data).
    const resp = await api.deleteCategory(adminToken, tc.protected_target_id);

    // [Pattern 1] — Must not server error or return raw DB error
    expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    // [Pattern 5] — Characterization: accept either strict rejection or safe cascade
    expect(tc.expected_status_oneOf).toContain(resp.status());

    if (([HTTP_STATUS.OK, HTTP_STATUS.NO_CONTENT] as number[]).includes(resp.status())) {
      // [Pattern 4] — After a successful delete, no product may keep the deleted category_id
      const productsResp = await request.get(`${BASE_URL}/api/products`);
      expect(productsResp.status()).toBe(HTTP_STATUS.OK);
      const products = await productsResp.json() as Array<{ category_id?: number | null }>;
      expect(Array.isArray(products)).toBe(true);
      const orphaned = products.filter((product) => product.category_id === tc.protected_target_id);
      expect(orphaned).toHaveLength(0);
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-012: Thiếu trường name (body = {})
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-012: Thêm danh mục thất bại khi body thiếu thuộc tính name (EC2)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-012')!;
    const countBefore = await api.getCategoryCount(adminToken);

    // [Pattern 4] — Network: POST empty body {}
    const resp = await api.createCategoryRaw(adminToken, {});

    // [Pattern 1] — Validation rejection status
    expect(resp.status()).toBe(tc.expected_status);

    // [Pattern 3] — Count unchanged
    const countAfter = await api.getCategoryCount(adminToken);
    expect(countAfter).toBe(countBefore);
  });

  for (const variant of testData.tc_type_variants) {
    test(`${variant.tc_id}: ${variant.description} → từ chối với ${variant.expected_status}`, async ({ request }) => {
      const api = new CategoryAPIHelper(request, BASE_URL);
      const countBefore = await api.getCategoryCount(adminToken);

      // [Pattern 4] — Network: POST with invalid type
      const resp = await api.createCategoryRaw(adminToken, { name: variant.name });

      // [Pattern 1] — Validation rejection status
      expect(resp.status()).toBe(variant.expected_status);

      // [Pattern 3] — Count unchanged
      const countAfter = await api.getCategoryCount(adminToken);
      expect(countAfter).toBe(countBefore);
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-014: Thêm danh mục Unicode / emoji
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-014: Thêm danh mục với Unicode và emoji — lưu nguyên vẹn (EC12)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-014')!;
    const unicodeName = `${tc.name_prefix} ${Date.now()}`;

    // [Pattern 4] — Network: POST unicode name
    const resp = await api.createCategory(adminToken, unicodeName);

    // [Pattern 1] — Success status on create
    expect(tc.expected_status_oneOf).toContain(resp.status());

    const body = await resp.json() as { id?: number };
    const id = body.id;

    // [Pattern 2] — Name preserved in list (no encoding loss)
    const list = await api.getCategoryList(adminToken);
    const found = list.find((c) => c.id === id);
    expect.soft(found?.name).toBe(unicodeName);

    // Cleanup
    if (id) await api.cleanupCategory(adminToken, id);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-015: Chính sách trùng tên — characterization
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-015: Chính sách khi tạo hai danh mục trùng tên (EC13)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-015')!;
    const dupName = `${tc.name_prefix} DUP ${Date.now()}`;

    // [Pattern 4] — First creation
    const resp1 = await api.createCategory(adminToken, dupName);
    const id1Body = await resp1.json() as { id?: number };
    const id1 = id1Body.id;

    expect(tc.expected_status_oneOf).toContain(resp1.status());

    // [Pattern 4] — Second creation with same name
    const resp2 = await api.createCategory(adminToken, dupName);

    // [Pattern 1] — Must not server error
    expect(resp2.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);

    // [Pattern 5] — Characterization: either allowed success or rejected by validation/conflict
    expect.soft(tc.expected_status_oneOf).toContain(resp2.status());

    // [Pattern 2] — If rejected, first record still intact
    if (resp2.status() >= 400) {
      const list = await api.getCategoryList(adminToken);
      expect.soft(list.some((c) => c.id === id1)).toBe(true);
    }

    // Cleanup
    if (id1) await api.cleanupCategory(adminToken, id1);
    const id2Body = await resp2.json().catch(() => ({})) as { id?: number };
    if (id2Body.id) await api.cleanupCategory(adminToken, id2Body.id);
  });

  const syntaxIds = testData.tc_characterization.filter(tc => tc.tc_id.startsWith('TC-CATEGORY-019'));

  for (const variant of syntaxIds) {
    test(`${variant.tc_id}: DELETE với ID sai cú pháp (${variant.delete_id}) — không xóa, không lỗi máy chủ (EC17)`, async ({ request }) => {
      const api = new CategoryAPIHelper(request, BASE_URL);
      const countBefore = await api.getCategoryCount(adminToken);

      // [Pattern 4] — Network: DELETE with bad ID
      const resp = await api.deleteCategory(adminToken, variant.delete_id);

      // [Pattern 1] — Must not server error; must be rejection or not-found
      expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      expect.soft(variant.expected_status_oneOf).toContain(resp.status());

      // [Pattern 3] — Count unchanged
      const countAfter = await api.getCategoryCount(adminToken);
      expect(countAfter).toBe(countBefore);
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-020: Xóa lặp cùng category_id — idempotency characterization
  // ──────────────────────────────────────────────────────────────────────────
    test('TC-CATEGORY-020: Xóa lặp cùng ID — không lỗi máy chủ, không tạo lại, hành vi nhất quán (EC18)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_crud.find((item) => item.tc_id === 'TC-CATEGORY-020')!;

    // Create isolated target
    const id = await api.createTestCategory(adminToken, `${tc.idempotency_target_prefix} ${Date.now()}`);

    // [Pattern 4] — First DELETE: must succeed
    const resp1 = await api.deleteCategory(adminToken, id);
    expect(tc.expected_status_oneOf).toContain(resp1.status());

    // Confirm deleted
    const listAfter1 = await api.getCategoryList(adminToken);
    expect(listAfter1.some((c) => c.id === id)).toBe(false);

    // [Pattern 4] — Second DELETE on same ID
    const resp2 = await api.deleteCategory(adminToken, id);

    // [Pattern 1] — Must not server error, must not recreate
    expect(resp2.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    // [Pattern 5] — Characterization: not-found/gone preferred or success on idempotent delete
    expect.soft(tc.expected_status_oneOf).toContain(resp2.status());

    // [Pattern 3] — Item still gone
    const listAfter2 = await api.getCategoryList(adminToken);
    expect(listAfter2.some((c) => c.id === id)).toBe(false);
  });
});
