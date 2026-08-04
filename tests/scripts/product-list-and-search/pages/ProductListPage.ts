import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Product List & Search Page (FR-05)
 * EShop SUT
 */
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
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Perform a search action
   */
  async search(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Clear search input
   */
  async clearSearch() {
    await this.searchInput.fill('');
    await this.searchButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Perform search by pressing Enter key
   */
  async searchByPressingEnter(keyword: string) {
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Get total count of product cards displayed
   */
  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

  /**
   * Get total count of <h1> tags on the page
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
}
