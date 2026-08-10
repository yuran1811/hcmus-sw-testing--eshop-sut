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
import testData from '../data/plas-test-data.json';
import { UI_CONSTANTS } from '../../_common/constants';

test.describe('FR-05 Product List & Search — BVA (Boundary Value Analysis)', () => {

  let plasPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    plasPage = new ProductListPage(page);
    await plasPage.goto();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-001: Tìm kiếm từ khóa ở biên dưới hợp lệ
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-001: Tìm kiếm từ khóa ở biên dưới hợp lệ', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-001')!;
    await plasPage.search(tc.search_keyword!);

    // [Pattern 5] — Count matches the dataset expectation
    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    // [Pattern 3] — Soft assertion for <h1> tag count
    const h1Count = await plasPage.getH1Count();
    expect.soft(h1Count).toBe(UI_CONSTANTS.EXPECTED_H1_COUNT);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-002: Tìm kiếm từ khóa 255 ký tự (Biên trên mốc R = 255)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-002: Tìm kiếm từ khóa 255 ký tự (Biên trên mốc R = 255)', async ({ page }) => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-002')!;
    const keyword255 = 'A'.repeat(tc.search_keyword_length!);
    await plasPage.search(keyword255);

    // [Pattern 1] — Error box must not appear; page does not crash
    await expect(plasPage.errorBox).not.toBeVisible();
    await expect(page.locator('body')).toBeVisible();
    for (const keyword of UI_CONSTANTS.DB_ERROR_KEYWORDS) {
      await expect.soft(page.locator('body')).not.toContainText(keyword);
    }
    expect(await plasPage.hasHorizontalOverflow()).toBe(false);

    // [Pattern 5] — Count = 0 (empty state)
    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count ?? 0);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-003: Tìm kiếm từ khóa ở biên trên hợp lệ
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-003: Tìm kiếm từ khóa ở biên trên hợp lệ', async ({ page }) => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-003')!;
    const keyword256 = 'A'.repeat(tc.search_keyword_length!);
    await plasPage.search(keyword256);

    // [Pattern 1] — Error box must not appear; page does not crash
    await expect(plasPage.errorBox).not.toBeVisible();
    await expect(page.locator('body')).toBeVisible();
    for (const keyword of UI_CONSTANTS.DB_ERROR_KEYWORDS) {
      await expect.soft(page.locator('body')).not.toContainText(keyword);
    }
    expect(await plasPage.hasHorizontalOverflow()).toBe(false);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-004: Tìm kiếm bằng ký tự đặc biệt SQL Injection
  // ──────────────────────────────────────────────────────────────────────────
  test("TC-PLAS-BVA-004: Tìm kiếm bằng ký tự đặc biệt SQL Injection (' OR '1'='1)", async ({ page }) => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-004')!;
    await plasPage.search(tc.search_keyword!);

    // [Pattern 1] — No SQL error displayed
    await expect(plasPage.errorBox).not.toBeVisible();
    await expect(page.locator('body')).toBeVisible();
    for (const keyword of UI_CONSTANTS.DB_ERROR_KEYWORDS) {
      await expect.soft(page.locator('body')).not.toContainText(keyword);
    }

    // [Pattern 5] — 0 matching items for exact string payload
    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-005: Kiểm tra duy trì đúng 1 thẻ h1 duy nhất
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-005: Kiểm tra duy trì đúng 1 thẻ h1 duy nhất sau khi search', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-005')!;
    await plasPage.search(tc.search_keyword!);

    // [Pattern 3] — Soft assertion for single <h1> tag requirement (BUG-PLAS-001)
    const h1Count = await plasPage.getH1Count();
    expect.soft(h1Count, 'FR-05 requires exactly 1 <h1> tag on page (BUG-PLAS-001)').toBe(UI_CONSTANTS.EXPECTED_H1_COUNT);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-006: Tìm kiếm từ khóa rỗng
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-006: Tìm kiếm từ khóa rỗng', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-006')!;
    await plasPage.search(tc.search_keyword!);

    // [Pattern 5] — Returns all 5 products
    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-007: Tìm kiếm từ khóa ngay trên biên dưới
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-007: Tìm kiếm từ khóa ngay trên biên dưới', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-007')!;
    await plasPage.search(tc.search_keyword!);

    // [Pattern 5] — Matches Samsung Galaxy S24 Ultra
    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    // [Pattern 2] — Title match
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain(tc.expected_title!);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-008: Tìm kiếm từ khóa ngay dưới biên trên
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-008: Tìm kiếm từ khóa ngay dưới biên trên', async ({ page }) => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-008')!;
    const keyword254 = 'A'.repeat(tc.search_keyword_length!);
    await plasPage.search(keyword254);

    // [Pattern 1] — No crash
    await expect(plasPage.errorBox).not.toBeVisible();
    await expect(page.locator('body')).toBeVisible();
    for (const keyword of UI_CONSTANTS.DB_ERROR_KEYWORDS) {
      await expect.soft(page.locator('body')).not.toContainText(keyword);
    }
    expect(await plasPage.hasHorizontalOverflow()).toBe(false);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-009: Tìm kiếm từ khóa ký tự số (15)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-009: Tìm kiếm từ khóa ký tự số ("15")', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-009')!;
    await plasPage.search(tc.search_keyword!);

    // [Pattern 5] — Matches iPhone 15 Pro Max
    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    // [Pattern 2] — Title match
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain(tc.expected_title!);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-BVA-010: Tìm kiếm từ khóa kết hợp chữ, số và khoảng trắng
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-BVA-010: Tìm kiếm từ khóa kết hợp chữ, số và khoảng trắng ("Galaxy S24")', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-BVA-010')!;
    await plasPage.search(tc.search_keyword!);

    // [Pattern 5] — Matches Samsung Galaxy S24 Ultra
    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    // [Pattern 2] — Title match
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain(tc.expected_title!);
  });
});
