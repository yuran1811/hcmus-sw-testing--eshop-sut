import { Page, Locator } from '@playwright/test';
import { automationEnv } from '../../_common/env';

/**
 * Page Object Model for Product List & Search Page (FR-05)
 * EShop SUT — Web UI Automation
 *
 * Student: Mạch Quốc Tấn - 23127115
 */

export interface ProductItem {
  title: string;
  price: string;
  imageAlt: string | null;
}

export class ProductListPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly productCards: Locator;
  readonly productTitles: Locator;
  readonly productPrices: Locator;
  readonly productImages: Locator;
  readonly h1Headers: Locator;
  readonly searchResultBanner: Locator;
  readonly errorBox: Locator;
  readonly productCountFooter: Locator;
  readonly logoLink: Locator;
  readonly detailButtons: Locator;
  readonly addToCartButtons: Locator;
  readonly emptyStateText: Locator;
  readonly loadingIndicator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[placeholder="Tìm kiếm..."]');
    this.searchButton = page.locator('button[type="submit"]');
    this.productCards = page.locator('.grid > div.border');
    this.productTitles = page.locator('.grid > div.border h2');
    this.productPrices = page.locator('.grid > div.border p.text-red-500');
    this.productImages = page.locator('.grid > div.border img');
    this.h1Headers = page.locator('h1');
    this.searchResultBanner = page.locator('text=Kết quả tìm kiếm cho:');
    this.errorBox = page.locator('div.bg-red-100');
    this.productCountFooter = page.locator('h1.text-center.text-gray-400');
    this.logoLink = page.locator('header a:has-text("EShop")');
    this.detailButtons = page.locator('.grid > div.border a:has-text("Xem chi tiết")');
    this.addToCartButtons = page.locator('.grid > div.border button:has-text("Thêm vào giỏ")');
    this.emptyStateText = page.locator('text=Không tìm thấy sản phẩm').or(page.locator('.empty-state'));
    this.loadingIndicator = page
      .locator('text=Đang tải...')
      .or(page.locator('text=Đang tải'))
      .or(page.locator('[data-testid="loading"]'))
      .or(page.locator('.loading'))
      .or(page.locator('.spinner'));
  }

  /**
   * Navigate to home page
   */
  async goto(baseURL = automationEnv.frontendBaseUrl) {
    const productsResponse = this.page.waitForResponse((response) => {
      const url = response.url();
      return response.request().method() === 'GET'
        && url.includes('/api/products')
        && !url.includes('/api/products?search=');
    }).catch(() => null);

    await this.page.goto(baseURL);
    await productsResponse;
    await this.searchInput.waitFor({ state: 'visible' });
  }

  /**
   * Perform search by filling input and clicking button
   */
  async search(keyword: string) {
    await this.searchInput.fill(keyword);
    const responsePromise = this.page.waitForResponse((response) => {
      return response.request().method() === 'GET' && response.url().includes('/api/products?search=');
    });
    await this.searchButton.click();
    await responsePromise;
  }

  /**
   * Clear search input and trigger search
   */
  async clearSearch() {
    await this.searchInput.fill('');
    const responsePromise = this.page.waitForResponse((response) => {
      return response.request().method() === 'GET' && response.url().includes('/api/products?search=');
    });
    await this.searchButton.click();
    await responsePromise;
  }

  /**
   * Perform search by pressing Enter key
   */
  async searchByPressingEnter(keyword: string) {
    await this.searchInput.fill(keyword);
    const responsePromise = this.page.waitForResponse((response) => {
      return response.request().method() === 'GET' && response.url().includes('/api/products?search=');
    });
    await this.searchInput.press('Enter');
    await responsePromise;
  }

  /**
   * Get count of product cards displayed
   */
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  /**
   * Get count of <h1> tags on current page
   */
  async getH1Count(): Promise<number> {
    return await this.h1Headers.count();
  }

  /**
   * Get text content of all product titles
   */
  async getProductTitles(): Promise<string[]> {
    return await this.productTitles.allTextContents();
  }

  /**
   * Get text content of all product prices
   */
  async getProductPrices(): Promise<string[]> {
    return await this.productPrices.allTextContents();
  }

  /**
   * Get alt attribute values of all product images
   */
  async getProductImagesAlt(): Promise<(string | null)[]> {
    const images = await this.productImages.all();
    const alts: (string | null)[] = [];
    for (const img of images) {
      alts.push(await img.getAttribute('alt'));
    }
    return alts;
  }

  /**
   * Get the visible body text for raw-error detection.
   */
  async getBodyText(): Promise<string> {
    return await this.page.locator('body').innerText();
  }

  /**
   * Check whether the page is horizontally overflowing.
   */
  async hasHorizontalOverflow(): Promise<boolean> {
    return await this.page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth;
    });
  }
}
