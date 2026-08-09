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
import testData from '../data/category-test-data.json';
import { automationEnv } from '../../_common/env';

const BASE_URL = automationEnv.apiBaseUrl;

// ─── Credentials ─────────────────────────────────────────────────────────────
const ADMIN       = testData.users.admin;
const NORMAL_USER = testData.users.normalUser;

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
  // TC-CATEGORY-007: POST /api/categories — no auth token → auth rejection
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-007: Thêm danh mục thất bại khi không có token (EC4 → OC6)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_auth.find((item) => item.tc_id === 'TC-CATEGORY-007')!;
    const countBefore = await api.getCategoryCount(adminToken);

    // [Pattern 4] — Network: POST without Authorization header
    const resp = await api.createCategory(null, tc.name_prefix);

    // [Pattern 1] — Auth rejection status
    expect(tc.expected_status_oneOf).toContain(resp.status());

    // [Pattern 3] — No category was created
    const countAfter = await api.getCategoryCount(adminToken);
    expect(countAfter).toBe(countBefore);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-008: POST /api/categories — normal user token → forbidden
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-008: Thêm danh mục thất bại khi dùng token user thường (EC5 → OC6)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_auth.find((item) => item.tc_id === 'TC-CATEGORY-008')!;
    const countBefore = await api.getCategoryCount(adminToken);

    // [Pattern 4] — Network: POST with non-admin token
    const resp = await api.createCategory(userToken, tc.name_prefix);

    // [Pattern 1] — Forbidden status
    expect(resp.status()).toBe(tc.expected_status);

    // [Pattern 3] — No category was created
    const countAfter = await api.getCategoryCount(adminToken);
    expect(countAfter).toBe(countBefore);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-010: DELETE /api/categories/:id — no auth → auth rejection
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-010: Xóa danh mục thất bại khi không có token (EC4)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_auth.find((item) => item.tc_id === 'TC-CATEGORY-010')!;

    // Ensure category id=1 exists or create a target
    const list = await api.getCategoryList(adminToken);
    let targetId: number;
    if (list.length > 0) {
      targetId = list[0].id;
    } else {
      targetId = await api.createTestCategory(adminToken, `${tc.target_name_prefix} ${Date.now()}`);
    }

    // [Pattern 4] — Network: DELETE without token
    const resp = await api.deleteCategory(null, targetId);

    // [Pattern 1] — Auth rejection status
    expect(resp.status()).toBe(tc.expected_status);

    // [Pattern 3] — Category still exists
    const listAfter = await api.getCategoryList(adminToken);
    expect(listAfter.some((c) => c.id === targetId)).toBe(true);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-011: DELETE /api/categories/:id — normal user token → forbidden
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CATEGORY-011: Xóa danh mục thất bại khi dùng token user thường (EC5)', async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const tc = testData.tc_auth.find((item) => item.tc_id === 'TC-CATEGORY-011')!;

    // Create target via admin
    const targetId = await api.createTestCategory(adminToken, `${tc.target_name_prefix} ${Date.now()}`);

    // [Pattern 4] — Network: DELETE with non-admin token
    const resp = await api.deleteCategory(userToken, targetId);

    // [Pattern 1] — Forbidden status
    expect(resp.status()).toBe(tc.expected_status);

    // [Pattern 3] — Category still exists
    const listAfter = await api.getCategoryList(adminToken);
    expect(listAfter.some((c) => c.id === targetId)).toBe(true);

    // Cleanup (must use admin token)
    await api.cleanupCategory(adminToken, targetId);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-018: Token sai chữ ký hoặc hết hạn — data-driven
  // ──────────────────────────────────────────────────────────────────────────
  for (const variant of testData.tc_invalid_token) {
    test(`${variant.tc_id}: ${variant.description} (EC16)`, async ({ request }) => {
      const api = new CategoryAPIHelper(request, BASE_URL);
      const countBefore = await api.getCategoryCount(adminToken);

      // [Pattern 4] — Network: POST with invalid/expired token
      const resp = await api.createCategoryWithRawAuth(
        variant.auth_header,
        { name: variant.name }
      );

      // [Pattern 1] — Auth rejection status
      expect(variant.expected_status_oneOf).toContain(resp.status());

      // [Pattern 3] — No category created
      const countAfter = await api.getCategoryCount(adminToken);
      expect(countAfter).toBe(countBefore);
    });
  }
});
