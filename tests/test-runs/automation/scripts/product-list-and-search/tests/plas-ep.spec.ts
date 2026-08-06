/**
 * Product List & Search Equivalence Partitioning Test Suite (FR-05)
 * Covers: TC-PLAS-001, 002, 003, 004, 005, 006, 008, 009, 010, 011, 012, 013, 014
 * Technique: Equivalence Partitioning (Domain Testing)
 *
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: HW04 - Automation Testing
 *
 * Assertion patterns used:
 *   Pattern 1 — Element visibility / state (toBeVisible, not.toBeVisible)
 *   Pattern 2 — Text / content assertion (toContain, toHaveText)
 *   Pattern 3 — Soft assertion (expect.soft)
 *   Pattern 4 — Event / Dialog assertion (XSS prevention)
 *   Pattern 5 — Count / length assertion (toBe, toBeGreaterThan)
 */

import { test, expect } from '@playwright/test';
import { ProductListPage } from '../pages/ProductListPage';
import testDataRaw from '../data/plas-test-data.json';

// Type assertion for TS safety
interface TestCase {
  tc_id: string;
  description: string;
  search_keyword?: string;
  search_keyword_length?: number;
  expected_count?: number;
  expected_title?: string;
  expect_empty_state?: boolean;
  check_h1?: boolean;
  check_alt?: boolean;
  check_price_symbol?: boolean;
  check_xss_safe?: boolean;
  check_no_crash?: boolean;
  use_enter_key?: boolean;
  then_clear?: boolean;
}

const testData = testDataRaw as { test_cases: TestCase[] };

test.describe('FR-05 Product List & Search — Equivalence Partitioning', () => {

  let plasPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    plasPage = new ProductListPage(page);
    await plasPage.goto();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-001: Xem toàn bộ danh sách sản phẩm thành công khi search rỗng
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-001: Xem toàn bộ danh sách sản phẩm thành công khi search rỗng', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-001')!;
    const productCount = await plasPage.getProductCount();
    expect(productCount).toBe(tc.expected_count);

    const h1Count = await plasPage.getH1Count();
    expect.soft(h1Count, 'FR-05 requires exactly 1 <h1> tag on page (BUG-PLAS-001)').toBe(1);

    const imageAlts = await plasPage.getProductImagesAlt();
    for (const alt of imageAlts) {
      expect.soft(alt && alt.trim().length > 0, 'Image must have non-empty alt text (BUG-PLAS-002)').toBeTruthy();
    }

    const prices = await plasPage.getProductPrices();
    for (const price of prices) {
      expect.soft(price.includes('₫'), 'Price must display ₫ symbol (BUG-PLAS-003)').toBeTruthy();
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-002: Tìm kiếm sản phẩm theo tên chính xác hợp lệ
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-002: Tìm kiếm sản phẩm theo tên chính xác hợp lệ', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-002')!;
    await plasPage.search(tc.search_keyword!);

    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain(tc.expected_title!);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-003: Tìm kiếm với từ khóa không tồn tại
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-003: Tìm kiếm với từ khóa không tồn tại — hiển thị empty state', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-003')!;
    await plasPage.search(tc.search_keyword!);

    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    await expect.soft(plasPage.emptyStateText, 'Must show empty state message (BUG-PLAS-004)').toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-004: Tìm kiếm từ khóa Tiếng Việt có dấu
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-004: Tìm kiếm từ khóa Tiếng Việt có dấu', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-004')!;
    await plasPage.search(tc.search_keyword!);

    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain(tc.expected_title!);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-005: Tìm kiếm với mã độc XSS / script HTML
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-005: Tìm kiếm với mã độc XSS / script HTML — không thực thi script', async ({ page }) => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-005')!;
    let dialogFired = false;
    page.on('dialog', () => { dialogFired = true; });

    await plasPage.search(tc.search_keyword!);

    expect(dialogFired).toBe(false);
    await expect(page.locator('body')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-006: Tìm kiếm từ khóa cực dài 300 ký tự A
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-006: Tìm kiếm từ khóa cực dài 300 ký tự — không crash hệ thống', async ({ page }) => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-006')!;
    const longKeyword = 'A'.repeat(tc.search_keyword_length!);
    await plasPage.search(longKeyword);

    await expect(plasPage.errorBox).not.toBeVisible();
    await expect(page.locator('body')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-008: Tìm kiếm không phân biệt hoa thường
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-008: Tìm kiếm không phân biệt hoa thường (case-insensitive)', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-008')!;
    await plasPage.search(tc.search_keyword!);

    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    const titles = await plasPage.getProductTitles();
    expect(titles[0].toLowerCase()).toContain(tc.expected_title!.toLowerCase());
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-009: Tìm kiếm một phần tên sản phẩm (partial match)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-009: Tìm kiếm một phần tên sản phẩm (partial match)', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-009')!;
    await plasPage.search(tc.search_keyword!);

    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain(tc.expected_title!);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-010: Tìm kiếm từ khóa có khoảng trắng thừa ở đầu/cuối
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-010: Tìm kiếm từ khóa có khoảng trắng thừa ở đầu/cuối (trimmed)', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-010')!;
    await plasPage.search(tc.search_keyword!);

    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain(tc.expected_title!);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-011: Tìm kiếm chỉ chứa khoảng trắng
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-011: Tìm kiếm chỉ chứa khoảng trắng — trả về toàn bộ 5 sản phẩm', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-011')!;
    await plasPage.search(tc.search_keyword!);

    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-012: Nhấn nút Tìm kiếm mà không nhập từ khóa
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-012: Nhấn nút Tìm kiếm mà không nhập từ khóa', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-012')!;
    await plasPage.search(tc.search_keyword!);

    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-013: Nhấn phím Enter trên ô nhập liệu để tìm kiếm
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-013: Nhấn phím Enter trên ô nhập liệu để tìm kiếm', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-013')!;
    await plasPage.searchByPressingEnter(tc.search_keyword!);

    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain(tc.expected_title!);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-014: Kiểm tra khi xóa từ khóa trong ô tìm kiếm và tìm lại
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-014: Kiểm tra khi xóa từ khóa trong ô tìm kiếm và tìm lại', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-014')!;
    await plasPage.search(tc.search_keyword!);
    expect(await plasPage.getProductCount()).toBe(1);

    await plasPage.clearSearch();

    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);
  });
});
