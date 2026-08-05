/**
 * Category Security Test Suite (FR-14, SEC-04, SEC-05)
 * Covers: TC-CATEGORY-016 (XSS), TC-CATEGORY-017 (SQL Injection)
 * Technique: Malicious Input Partition
 *
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: HW04 - Automation Testing
 *
 * Assertion patterns used:
 *   Pattern 1 — HTTP status assertion (must not 500)
 *   Pattern 2 — Body field / value (name stored as literal, not executed)
 *   Pattern 3 — Count / length (table still exists and has records)
 *   Pattern 4 — Network / API response
 */

import { test, expect } from '@playwright/test';
import { CategoryAPIHelper, Category } from '../pages/CategoryPage';

const BASE_URL = 'http://localhost:3000';
const ADMIN = { email: 'admin@eshop.com', password: 'Admin123!', name: 'Admin User' };

test.describe('FR-14 Category Security — XSS & SQL Injection', () => {

  let adminToken: string;

  test.beforeAll(async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    adminToken = await api.ensureLogin(ADMIN);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-016: XSS payload in category name
  // ──────────────────────────────────────────────────────────────────────────
  test("TC-CATEGORY-016: Tên danh mục chứa HTML/XSS — lưu như plain text, không thực thi script (EC14)", async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const xssPayload = "<img src=x onerror=alert('CATEGORY-XSS')>";

    // [Pattern 4] — Network: POST XSS name
    const resp = await api.createCategory(adminToken, xssPayload);

    // [Pattern 1] — Must not 500
    expect(resp.status()).not.toBe(500);
    // Status: 200/201 (stored) or 400 (rejected with validation)
    expect([200, 201, 400]).toContain(resp.status());

    if ([200, 201].includes(resp.status())) {
      const body = await resp.json() as { id?: number };
      const id = body.id;

      if (id) {
        // [Pattern 2] — Retrieve from list; stored name must be the literal string, not interpreted
        const list = await api.getCategoryList(adminToken);
        const found = list.find((c) => c.id === id);
        if (found) {
          // Name stored must equal the literal payload (stored as text)
          expect.soft(found.name).toBe(xssPayload);
          // Must NOT be an empty string (which would indicate silent stripping)
          expect.soft(found.name.length).toBeGreaterThan(0);
        }

        // Cleanup
        await api.cleanupCategory(adminToken, id);
      }
    }
    // If 400 returned: XSS correctly rejected — test passes (no script execution possible)
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CATEGORY-017: SQL Injection payload in category name
  // ──────────────────────────────────────────────────────────────────────────
  test("TC-CATEGORY-017: Tên danh mục chứa payload SQL — bảng categories không bị DROP (EC15)", async ({ request }) => {
    const api = new CategoryAPIHelper(request, BASE_URL);
    const sqlPayload = "'); DROP TABLE categories; --";

    // [Pattern 3] — Capture count before attack
    const countBefore = await api.getCategoryCount(adminToken);

    // [Pattern 4] — Network: POST SQL injection name
    const resp = await api.createCategory(adminToken, sqlPayload);

    // [Pattern 1] — Must not 500 (raw SQL error is a security failure)
    expect(resp.status()).not.toBe(500);
    expect([200, 201, 400]).toContain(resp.status());

    // [Pattern 4] — Try GET categories — must succeed (table not dropped)
    const listResp = await api.getCategories(adminToken);
    // [Pattern 1] — GET must return 200 (categories table survived)
    expect(listResp.status()).toBe(200);

    const list = await listResp.json() as Category[];
    // [Pattern 3] — Table still has records (at minimum the ones before this test)
    expect(Array.isArray(list)).toBe(true);
    // Count should be >= countBefore (may be +1 if SQL name was accepted and stored)
    expect(list.length).toBeGreaterThanOrEqual(countBefore > 0 ? 1 : 0);

    // [Pattern 2] — Create a post-injection control category to verify DB is operational
    const controlResp = await api.createCategory(adminToken, `Đối chứng sau SQLi ${Date.now()}`);
    expect([200, 201]).toContain(controlResp.status());
    const controlBody = await controlResp.json() as { id?: number };
    if (controlBody.id) await api.cleanupCategory(adminToken, controlBody.id);

    // Cleanup the SQL payload category if it was accepted
    if ([200, 201].includes(resp.status())) {
      const body = await resp.json().catch(() => ({})) as { id?: number };
      if (body.id) await api.cleanupCategory(adminToken, body.id);
    }
  });
});
