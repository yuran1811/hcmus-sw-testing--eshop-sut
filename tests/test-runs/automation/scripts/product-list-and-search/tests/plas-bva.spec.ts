/**
 * Product List & Search BVA Test Suite (FR-05)
 * Covers: TC-PLAS-BVA-001 to TC-PLAS-BVA-010
 * Technique: Boundary Value Analysis (3-Point, Robustness Reference)
 *
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: HW04 - Automation Testing
 *
 * Assertion patterns used:
 *   Pattern 1 — Element visibility / state (not.toBeVisible, toBeVisible)
 *   Pattern 2 — Text / content matching (toContain)
 *   Pattern 3 — Soft assertion (expect.soft for characterization/BVA)
 *   Pattern 5 — Count / length assertion (toBe, toBeGreaterThan)
 */

import { test, expect } from '@playwright/test';
import { ProductListPage } from '../pages/ProductListPage';

test.describe('FR-05 Product List & Search — BVA (Boundary Value Analysis)', () => {

  let plasPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    plasPage = new ProductListPage(page);
    await plasPage.goto();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-001: Tìm kiếm từ khóa 1 ký tự (Biên dưới tối thiểu B+1)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-001: Tìm kiếm từ khóa 1 ký tự (Biên dưới B+1 = 1)', async () => {
    await plasPage.search('i');

    // [Pattern 5] — Count = 2 (iPhone 15 Pro Max, Tai nghe AirPods Pro 2 contain 'i')
    const count = await plasPage.getProductCount();
    expect(count).toBe(2);

    // [Pattern 3] — Soft assertion for <h1> tag count
    const h1Count = await plasPage.getH1Count();
    expect.soft(h1Count).toBe(1);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-002: Tìm kiếm từ khóa 255 ký tự (Biên trên mốc R = 255)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-002: Tìm kiếm từ khóa 255 ký tự (Biên trên mốc R = 255)', async ({ page }) => {
    const keyword255 = 'A'.repeat(255);
    await plasPage.search(keyword255);

    // [Pattern 1] — Error box must not appear; page does not crash
    await expect(plasPage.errorBox).not.toBeVisible();
    await expect(page.locator('body')).toBeVisible();

    // [Pattern 5] — Count = 0 (empty state)
    const count = await plasPage.getProductCount();
    expect(count).toBe(0);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-003: Tìm kiếm từ khóa 256 ký tự (Biên trên R+1 = 256)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-003: Tìm kiếm từ khóa 256 ký tự (Biên trên R+1 = 256)', async ({ page }) => {
    const keyword256 = 'A'.repeat(256);
    await plasPage.search(keyword256);

    // [Pattern 1] — Error box must not appear; page does not crash
    await expect(plasPage.errorBox).not.toBeVisible();
    await expect(page.locator('body')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-004: Tìm kiếm bằng ký tự đặc biệt SQL Injection
  // ──────────────────────────────────────────────────────────────────────────
  test("TC-PLAS-BVA-004: Tìm kiếm bằng ký tự đặc biệt SQL Injection (' OR '1'='1)", async ({ page }) => {
    await plasPage.search("' OR '1'='1");

    // [Pattern 1] — No SQL error displayed
    await expect(plasPage.errorBox).not.toBeVisible();
    await expect(page.locator('body')).toBeVisible();

    // [Pattern 5] — 0 matching items for exact string payload
    const count = await plasPage.getProductCount();
    expect(count).toBe(0);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-005: Kiểm tra duy trì đúng 1 thẻ h1 duy nhất
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-005: Kiểm tra duy trì đúng 1 thẻ h1 duy nhất sau khi search', async () => {
    await plasPage.search('iPhone');

    // [Pattern 3] — Soft assertion for single <h1> tag requirement (BUG-PLAS-001)
    const h1Count = await plasPage.getH1Count();
    expect.soft(h1Count, 'FR-05 requires exactly 1 <h1> tag on page (BUG-PLAS-001)').toBe(1);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-006: Tìm kiếm từ khóa độ dài 0 ký tự
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-006: Tìm kiếm từ khóa độ dài 0 ký tự (Boundary Min B = 0)', async () => {
    await plasPage.search('');

    // [Pattern 5] — Returns all 5 products
    const count = await plasPage.getProductCount();
    expect(count).toBe(5);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-007: Tìm kiếm từ khóa độ dài 2 ký tự
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-007: Tìm kiếm từ khóa độ dài 2 ký tự (B+2 = 2)', async () => {
    await plasPage.search('S2');

    // [Pattern 5] — Matches Samsung Galaxy S24 Ultra
    const count = await plasPage.getProductCount();
    expect(count).toBe(1);

    // [Pattern 2] — Title match
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain('Samsung Galaxy S24 Ultra');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-008: Tìm kiếm từ khóa độ dài 254 ký tự
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-008: Tìm kiếm từ khóa độ dài 254 ký tự (Biên R-1 = 254)', async ({ page }) => {
    const keyword254 = 'A'.repeat(254);
    await plasPage.search(keyword254);

    // [Pattern 1] — No crash
    await expect(plasPage.errorBox).not.toBeVisible();
    await expect(page.locator('body')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-009: Tìm kiếm từ khóa ký tự số (15)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-009: Tìm kiếm từ khóa ký tự số ("15")', async () => {
    await plasPage.search('15');

    // [Pattern 5] — Matches iPhone 15 Pro Max
    const count = await plasPage.getProductCount();
    expect(count).toBe(1);

    // [Pattern 2] — Title match
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain('iPhone 15 Pro Max');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-010: Tìm kiếm từ khóa kết hợp chữ, số và khoảng trắng
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-010: Tìm kiếm từ khóa kết hợp chữ, số và khoảng trắng ("Galaxy S24")', async () => {
    await plasPage.search('Galaxy S24');

    // [Pattern 5] — Matches Samsung Galaxy S24 Ultra
    const count = await plasPage.getProductCount();
    expect(count).toBe(1);

    // [Pattern 2] — Title match
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain('Samsung Galaxy S24 Ultra');
  });
});
