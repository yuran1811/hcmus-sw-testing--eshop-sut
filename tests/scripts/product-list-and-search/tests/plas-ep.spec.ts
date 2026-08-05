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
    // [Pattern 5] — Product count assertion (5 items in seed DB)
    const productCount = await plasPage.getProductCount();
    expect(productCount).toBe(5);

    // [Pattern 3] — Soft assertion for <h1> tag count requirement (BUG-PLAS-001)
    const h1Count = await plasPage.getH1Count();
    expect.soft(h1Count, 'FR-05 requires exactly 1 <h1> tag on page (BUG-PLAS-001)').toBe(1);

    // [Pattern 3] — Soft assertion for image alt text (BUG-PLAS-002)
    const imageAlts = await plasPage.getProductImagesAlt();
    for (const alt of imageAlts) {
      expect.soft(alt && alt.trim().length > 0, 'Image must have non-empty alt text (BUG-PLAS-002)').toBeTruthy();
    }

    // [Pattern 3] — Soft assertion for price currency symbol (BUG-PLAS-003)
    const prices = await plasPage.getProductPrices();
    for (const price of prices) {
      expect.soft(price.includes('₫'), 'Price must display ₫ symbol (BUG-PLAS-003)').toBeTruthy();
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-002: Tìm kiếm sản phẩm theo tên chính xác hợp lệ
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-002: Tìm kiếm sản phẩm theo tên chính xác hợp lệ', async () => {
    await plasPage.search('MacBook Pro M3');

    // [Pattern 5] — Count: exactly 1 matching item
    const count = await plasPage.getProductCount();
    expect(count).toBe(1);

    // [Pattern 2] — Content matching
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain('MacBook Pro M3');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-003: Tìm kiếm với từ khóa không tồn tại
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-003: Tìm kiếm với từ khóa không tồn tại — hiển thị empty state', async () => {
    await plasPage.search('NonExistentProduct99999');

    // [Pattern 5] — Count: 0 items
    const count = await plasPage.getProductCount();
    expect(count).toBe(0);

    // [Pattern 3] — Soft assertion for empty state message (BUG-PLAS-004)
    await expect.soft(plasPage.emptyStateText, 'Must show empty state message (BUG-PLAS-004)').toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-004: Tìm kiếm từ khóa Tiếng Việt có dấu
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-004: Tìm kiếm từ khóa Tiếng Việt có dấu', async () => {
    await plasPage.search('Bàn phím');

    // [Pattern 5] — Count = 1
    const count = await plasPage.getProductCount();
    expect(count).toBe(1);

    // [Pattern 2] — Text matching Unicode
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain('Bàn phím cơ Keychron Q1');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-005: Tìm kiếm với mã độc XSS / script HTML
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-005: Tìm kiếm với mã độc XSS / script HTML — không thực thi script', async ({ page }) => {
    let dialogFired = false;
    page.on('dialog', () => { dialogFired = true; });

    await plasPage.search("<script>alert('XSS')</script>");

    // [Pattern 4] — Event assertion: no alert dialog popped up
    expect(dialogFired).toBe(false);

    // [Pattern 1] — Page body remains intact
    await expect(page.locator('body')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-006: Tìm kiếm từ khóa cực dài 300 ký tự A
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-006: Tìm kiếm từ khóa cực dài 300 ký tự — không crash hệ thống', async ({ page }) => {
    const longKeyword = 'A'.repeat(300);
    await plasPage.search(longKeyword);

    // [Pattern 1] — Error box must not be displayed
    await expect(plasPage.errorBox).not.toBeVisible();
    await expect(page.locator('body')).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-008: Tìm kiếm không phân biệt hoa thường
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-008: Tìm kiếm không phân biệt hoa thường (case-insensitive)', async () => {
    await plasPage.search('macbook pro m3');

    // [Pattern 5] — Count = 1
    const count = await plasPage.getProductCount();
    expect(count).toBe(1);

    // [Pattern 2] — Correct title matches regardless of case
    const titles = await plasPage.getProductTitles();
    expect(titles[0].toLowerCase()).toContain('macbook pro m3');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-009: Tìm kiếm một phần tên sản phẩm (partial match)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-009: Tìm kiếm một phần tên sản phẩm (partial match)', async () => {
    await plasPage.search('Galaxy');

    // [Pattern 5] — Count = 1
    const count = await plasPage.getProductCount();
    expect(count).toBe(1);

    // [Pattern 2] — Title contains substring
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain('Samsung Galaxy S24 Ultra');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-010: Tìm kiếm từ khóa có khoảng trắng thừa ở đầu/cuối
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-010: Tìm kiếm từ khóa có khoảng trắng thừa ở đầu/cuối (trimmed)', async () => {
    await plasPage.search('  iPhone 15  ');

    // [Pattern 5] — Count = 1
    const count = await plasPage.getProductCount();
    expect(count).toBe(1);

    // [Pattern 2] — Matches iPhone
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain('iPhone 15 Pro Max');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-011: Tìm kiếm chỉ chứa khoảng trắng
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-011: Tìm kiếm chỉ chứa khoảng trắng — trả về toàn bộ 5 sản phẩm', async () => {
    await plasPage.search('   ');

    // [Pattern 5] — Treated as empty search, returns all 5 products
    const count = await plasPage.getProductCount();
    expect(count).toBe(5);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-012: Nhấn nút Tìm kiếm mà không nhập từ khóa
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-012: Nhấn nút Tìm kiếm mà không nhập từ khóa', async () => {
    await plasPage.search('');

    // [Pattern 5] — Returns all 5 products
    const count = await plasPage.getProductCount();
    expect(count).toBe(5);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-013: Nhấn phím Enter trên ô nhập liệu để tìm kiếm
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-013: Nhấn phím Enter trên ô nhập liệu để tìm kiếm', async () => {
    await plasPage.searchByPressingEnter('AirPods');

    // [Pattern 5] — Count = 1
    const count = await plasPage.getProductCount();
    expect(count).toBe(1);

    // [Pattern 2] — Matching AirPods
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain('Tai nghe AirPods Pro 2');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-014: Kiểm tra khi xóa từ khóa trong ô tìm kiếm và tìm lại
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-014: Kiểm tra khi xóa từ khóa trong ô tìm kiếm và tìm lại', async () => {
    await plasPage.search('AirPods');
    expect(await plasPage.getProductCount()).toBe(1);

    await plasPage.clearSearch();

    // [Pattern 5] — Returns all 5 products after clearing
    const count = await plasPage.getProductCount();
    expect(count).toBe(5);
  });
});
