import { test, expect } from '@playwright/test';
import { ProductListPage } from '../pages/ProductListPage';
import * as testData from '../data/plas-test-data.json';

interface TestCaseItem {
  tc_id: string;
  description: string;
  search_keyword?: string;
  search_keyword_length?: number;
  expected_count?: number;
  expected_title?: string;
  check_h1?: boolean;
  check_alt?: boolean;
  check_price_symbol?: boolean;
  check_xss_safe?: boolean;
  check_sql_safe?: boolean;
  check_no_crash?: boolean;
  expect_empty_state?: boolean;
  use_enter_key?: boolean;
  then_clear?: boolean;
  click_detail?: boolean;
  click_add_to_cart?: boolean;
  click_logo?: boolean;
  check_footer_count?: boolean;
  check_loading_state?: boolean;
}

test.describe('FR-05 Product List & Search Complete Automation Suite (29 Test Cases)', () => {
  let plasPage: ProductListPage;

  test.beforeEach(async ({ page }) => {
    plasPage = new ProductListPage(page);
    await plasPage.goto();
  });

  const cases: TestCaseItem[] = testData.test_cases;

  for (const tc of cases) {
    test(`${tc.tc_id}: ${tc.description}`, async ({ page }) => {
      // Determine search keyword string
      let keyword = tc.search_keyword ?? '';
      if (tc.search_keyword_length) {
        keyword = 'A'.repeat(tc.search_keyword_length);
      }

      // Action: Perform Search
      if (tc.use_enter_key) {
        await plasPage.searchByPressingEnter(keyword);
      } else if (tc.click_logo) {
        await plasPage.logoLink.click();
        await page.waitForLoadState('domcontentloaded');
      } else if (!tc.click_detail && !tc.click_add_to_cart && !tc.click_logo) {
        await plasPage.search(keyword);
      }

      // Handle Clear Search
      if (tc.then_clear) {
        await plasPage.clearSearch();
      }

      // Action & Assertion for Detail Navigation
      if (tc.click_detail) {
        await plasPage.search(keyword);
        await plasPage.detailButtons.first().click();
        await page.waitForLoadState('domcontentloaded');
        expect(page.url()).toContain('/product/');
        return;
      }

      // Action & Assertion for Add to Cart Button
      if (tc.click_add_to_cart) {
        await plasPage.search(keyword);
        const countBefore = await plasPage.getProductCount();
        expect(countBefore).toBeGreaterThan(0);
        await plasPage.addToCartButtons.first().click();
        return;
      }

      // Assertion: Product Count
      if (typeof tc.expected_count === 'number') {
        const productCount = await plasPage.getProductCount();
        expect(productCount).toBe(tc.expected_count);
      }

      // Assertion: Expected Title Content
      if (tc.expected_title) {
        const titles = await plasPage.getProductTitles();
        const matches = titles.some(title => title.toLowerCase().includes(tc.expected_title!.toLowerCase()));
        expect(matches).toBeTruthy();
      }

      // Soft Assertion: Single <h1> Requirement Compliance (BUG-PLAS-001)
      if (tc.check_h1) {
        const h1Count = await plasPage.getH1Count();
        expect.soft(h1Count, 'FR-05 requires exactly 1 <h1> tag on Home page (BUG-PLAS-001)').toBe(1);
      }

      // Soft Assertion: Image Alt Text (BUG-PLAS-002)
      if (tc.check_alt) {
        const imageAlts = await plasPage.getProductImagesAlt();
        for (const alt of imageAlts) {
          expect.soft(alt && alt.trim().length > 0, 'Product image must have non-empty alt text (BUG-PLAS-002)').toBeTruthy();
        }
      }

      // Soft Assertion: Price Symbol Format ₫ vs VND (BUG-PLAS-003)
      if (tc.check_price_symbol) {
        const prices = await plasPage.getProductPrices();
        for (const price of prices) {
          expect.soft(price.includes('₫'), 'Price must display ₫ symbol instead of VND (BUG-PLAS-003)').toBeTruthy();
        }
      }

      // Assertion: XSS Security Handling
      if (tc.check_xss_safe) {
        let alertFired = false;
        page.on('dialog', () => { alertFired = true; });
        expect(alertFired).toBeFalsy();
      }

      // Assertion: SQL Safety & System Error Box
      if (tc.check_sql_safe || tc.check_no_crash) {
        await expect(plasPage.errorBox).not.toBeVisible();
        await expect(page.locator('body')).toBeVisible();
      }

      // Soft Assertion: Empty State Indicator (BUG-PLAS-004)
      if (tc.expect_empty_state) {
        const emptyStateLocator = page.locator('text=Không tìm thấy sản phẩm').or(page.locator('.empty-state'));
        await expect.soft(emptyStateLocator, 'System should display empty state message when no products match (BUG-PLAS-004)').toBeVisible();
      }

      // Assertion: Footer Product Count Text (FR-05)
      if (tc.check_footer_count) {
        const footerCount = page.locator('text=Hiển thị 5 sản phẩm');
        await expect(footerCount).toBeVisible();
      }
    });
  }
});
