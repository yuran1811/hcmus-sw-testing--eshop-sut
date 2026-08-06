/**
 * Product List & Search UI & Navigation Test Suite (FR-05)
 * Covers: TC-PLAS-007, 015, 016, 017, 018, 019
 * Technique: Web UI Layout, Navigation & State Testing
 *
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: HW04 - Automation Testing
 *
 * Assertion patterns used:
 *   Pattern 1 — Element visibility / state (toBeVisible)
 *   Pattern 2 — URL / navigation assertion (toContain)
 *   Pattern 3 — Text / content assertion (toContainText, toBe)
 *   Pattern 5 — Count / length assertion (toBeGreaterThan)
 */

import { test, expect } from '@playwright/test';
import { ProductListPage } from '../pages/ProductListPage';
import testData from '../data/plas-test-data.json';

test.describe('FR-05 Product List & Search — UI & Navigation', () => {

  let plasPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    plasPage = new ProductListPage(page);
    await plasPage.goto();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-007: Kiểm tra hiển thị chi tiết thẻ sản phẩm (ảnh, tên, giá)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-007: Kiểm tra hiển thị chi tiết thẻ sản phẩm (ảnh, tên, giá)', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-007')!;
    await plasPage.search(tc.search_keyword!);

    // [Pattern 5] — Count = 1
    const count = await plasPage.getProductCount();
    expect(count).toBe(tc.expected_count);

    // [Pattern 1] — Product image is visible
    await expect(plasPage.productImages.first()).toBeVisible();

    // [Pattern 3] — Title & price check
    const titles = await plasPage.getProductTitles();
    expect(titles[0]).toContain(tc.expected_title!);

    const prices = await plasPage.getProductPrices();
    expect(prices[0]).toBeTruthy();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-015: Kiểm tra nút Xem chi tiết sản phẩm
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-015: Kiểm tra nút Xem chi tiết sản phẩm — điều hướng đến trang detail', async ({ page }) => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-015')!;
    await plasPage.search(tc.search_keyword!);
    expect(await plasPage.getProductCount()).toBeGreaterThan(0);

    // Click "Xem chi tiết"
    await plasPage.detailButtons.first().click();
    await page.waitForLoadState('domcontentloaded');

    // [Pattern 2] — URL should navigate to /product/:id
    expect(page.url()).toContain('/product/');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-016: Kiểm tra nút Thêm vào giỏ hàng sản phẩm
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-016: Kiểm tra nút Thêm vào giỏ hàng sản phẩm', async () => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-016')!;
    await plasPage.search(tc.search_keyword!);

    // [Pattern 1] — Button is visible and clickable
    await expect(plasPage.addToCartButtons.first()).toBeVisible();
    await plasPage.addToCartButtons.first().click();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-017: Kiểm tra điều hướng logo EShop về trang chủ
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-017: Kiểm tra điều hướng logo EShop về trang chủ', async ({ page }) => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-017')!;
    // Perform search first
    await plasPage.search('MacBook');

    // [Pattern 1] — Logo link is visible
    await expect(plasPage.logoLink).toBeVisible();
    await plasPage.logoLink.click();
    await page.waitForLoadState('domcontentloaded');

    // [Pattern 2] — URL back to home page
    expect(page.url()).toMatch(/\/(#.*)?$/);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-018: Kiểm tra hiển thị tổng số sản phẩm bên dưới
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-018: Kiểm tra hiển thị tổng số sản phẩm bên dưới (Footer count)', async ({ page }) => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-018')!;
    // [Pattern 1] — Footer product count indicator check
    const footerCount = page.locator('text=Hiển thị 5 sản phẩm').or(page.locator('h1.text-center.text-gray-400'));
    await expect(footerCount.first()).toBeVisible();
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-PLAS-019: Kiểm tra chỉ báo trạng thái đang tải
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-PLAS-019: Kiểm tra chỉ báo trạng thái đang tải — page loads cleanly', async ({ page }) => {
    const tc = testData.test_cases.find(c => c.tc_id === 'TC-PLAS-019')!;
    // Reload page and check page loads completely without permanent loading spinners
    await page.reload();
    await page.waitForLoadState('domcontentloaded');

    // [Pattern 1] — Product cards visible after load
    const count = await plasPage.getProductCount();
    expect(count).toBeGreaterThan(0);
  });
});
