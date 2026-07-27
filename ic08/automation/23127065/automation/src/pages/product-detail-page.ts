import { expect, type Locator, type Page, type Response } from "@playwright/test";

export class ProductDetailPage {
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly main: Locator;
  readonly productImage: Locator;
  private productResponse?: Response;
  private observedDialogs = 0;

  constructor(readonly page: Page) {
    this.quantityInput = page.getByRole("spinbutton");
    this.addToCartButton = page.getByRole("button", { name: /Thêm vào giỏ hàng|Đã thêm/ });
    this.cartLink = page.getByRole("link", { name: "Giỏ hàng" });
    this.main = page.locator("main");
    this.productImage = this.main.locator("img").first();
    page.on("dialog", async (dialog) => {
      this.observedDialogs += 1;
      await dialog.dismiss();
    });
  }

  async open(routeParam: string): Promise<void> {
    const responsePromise = this.page.waitForResponse((response) =>
      response.url().endsWith(`/api/products/${routeParam}`),
    );
    await this.page.goto(`/product/${encodeURIComponent(routeParam)}`, {
      waitUntil: "domcontentloaded",
    });
    this.productResponse = await responsePromise;
    await expect(this.main).not.toContainText("Đang tải...", { timeout: 5_000 });
  }

  productApiStatus(): number {
    if (!this.productResponse) throw new Error("Product API response was not captured");
    return this.productResponse.status();
  }

  async enterQuantity(rawValue: string): Promise<void> {
    await this.quantityInput.evaluate((element, value) => {
      const input = element as HTMLInputElement;
      const nativeSetter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      )?.set;
      nativeSetter?.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }, rawValue);
  }

  async clickAddToCartOnce(): Promise<void> {
    await this.addToCartButton.click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/\/cart$/);
  }

  cartRows(): Locator {
    return this.page.locator("main tbody tr");
  }

  cartEmptyState(): Locator {
    return this.page.getByText("Giỏ hàng của bạn đang trống", { exact: true });
  }

  dialogCount(): number {
    return this.observedDialogs;
  }
}
