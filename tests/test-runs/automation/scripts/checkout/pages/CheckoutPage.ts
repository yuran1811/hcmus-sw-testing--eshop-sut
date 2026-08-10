import { Page, APIRequestContext, Locator } from '@playwright/test';
import { automationEnv } from '../../_common/env';

/**
 * Page Object Model for Checkout API + Web UI (FR-08)
 * EShop SUT
 * Student: Mạch Quốc Tấn - 23127115
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface LoginResponse {
  token: string;
  user: { id: number; name: string; email: string };
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CheckoutPayload {
  total_amount?: number;
  shipping_address?: unknown; // unknown allows us to send non-string for TC-010
  items?: CartItem[];
}

export interface CheckoutResponse {
  message?: string;
  orderId?: number;
  order?: {
    id: number;
    total_amount: number;
    status: string;
    shipping_address?: string | null;
  };
  error?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// CheckoutAPIHelper — wraps raw API calls (for API-level test cases)
// ─────────────────────────────────────────────────────────────────────────────

export class CheckoutAPIHelper {
  readonly request: APIRequestContext;
  readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL = automationEnv.apiBaseUrl) {
    this.request = request;
    this.baseURL = baseURL;
  }

  /**
   * POST /api/login — authenticate and return token
   */
  async login(email: string, password: string): Promise<string> {
    const response = await this.request.post(`${this.baseURL}/api/login`, {
      data: { email, password },
    });
    if (!response.ok()) {
      throw new Error(`Login failed with status ${response.status()}: ${await response.text()}`);
    }
    const body = await response.json() as LoginResponse;
    return body.token;
  }

  /**
   * GET /api/cart — return cart items for the authenticated user
   */
  async getCart(token: string) {
    const response = await this.request.get(`${this.baseURL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }

  /**
   * POST /api/cart — add a product to the cart
   */
  async addToCart(token: string, item: CartItem) {
    const response = await this.request.post(`${this.baseURL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
      data: item,
    });
    return response;
  }

  /**
   * DELETE /api/cart — clear the cart (helper to reset state between tests)
   * Note: If no DELETE /api/cart endpoint exists, items are cleared by
   * performing a checkout or other helper means. Adjust if needed.
   */
  async clearCart(token: string) {
    // Try standard delete; if not-found use workaround
    const response = await this.request.delete(`${this.baseURL}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }

  /**
   * POST /api/checkout — submit a checkout request
   * Accepts raw payload so tests can send malformed data (e.g. wrong types)
   */
  async checkout(token: string | null, payload: unknown) {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await this.request.post(`${this.baseURL}/api/checkout`, {
      headers,
      data: payload,
    });
    return response;
  }

  /**
   * POST /api/checkout without Authorization header at all
   */
  async checkoutNoAuth(payload: unknown) {
    const response = await this.request.post(`${this.baseURL}/api/checkout`, {
      headers: { 'Content-Type': 'application/json' },
      data: payload,
    });
    return response;
  }

  /**
   * GET /api/orders/my-orders — retrieve orders for the authenticated user
   */
  async getMyOrders(token: string) {
    const response = await this.request.get(`${this.baseURL}/api/orders/my-orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }

  /**
   * GET /api/orders/:id — retrieve a single order by ID
   */
  async getOrder(token: string, orderId: number) {
    const response = await this.request.get(`${this.baseURL}/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  }

  /**
   * Utility: add items to cart and return
   * (Adds each item sequentially to ensure cart state is correct.)
   */
  async setupCart(token: string, items: CartItem[]): Promise<void> {
    for (const item of items) {
      const r = await this.addToCart(token, item);
      if (!r.ok()) {
        throw new Error(`Failed to add item ${item.name}: ${r.status()} — ${await r.text()}`);
      }
    }
  }

  /**
   * Utility: count orders before a given order list snapshot
   */
  async getOrderCount(token: string): Promise<number> {
    const r = await this.getMyOrders(token);
    if (!r.ok()) return 0;
    const body = await r.json() as unknown[];
    return body.length;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CheckoutWebPage — Page Object for the Web UI checkout flow (FR-08 UI tests)
// ─────────────────────────────────────────────────────────────────────────────

export class CheckoutWebPage {
  readonly page: Page;

  // Locators
  readonly cartIcon: Locator;
  readonly checkoutButton: Locator;
  readonly orderItemRows: Locator;
  readonly productNameCells: Locator;
  readonly productPriceCells: Locator;
  readonly productQtyCells: Locator;
  readonly productLineTotalCells: Locator;
  readonly totalAmountInput: Locator;
  readonly confirmOrderButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Cart/Checkout navigation
    this.cartIcon = page.locator('a[href="/cart"], button[aria-label*="cart"], a:has-text("Giỏ hàng")');
    this.checkoutButton = page.locator(
      'button:has-text("Tiến hành thanh toán"), button:has-text("Checkout"), a:has-text("Thanh toán")'
    );

    // Checkout page product list
    this.orderItemRows = page.locator(
      'table tbody tr, .checkout-items > div, [data-testid="checkout-item"]'
    );
    this.productNameCells = page.locator(
      'table tbody tr td:first-child, .checkout-item-name, [data-testid="item-name"]'
    );
    this.productPriceCells = page.locator(
      'table tbody tr td:nth-child(2), .checkout-item-price, [data-testid="item-price"]'
    );
    this.productQtyCells = page.locator(
      'table tbody tr td:nth-child(3), .checkout-item-qty, [data-testid="item-qty"]'
    );
    this.productLineTotalCells = page.locator(
      'table tbody tr td:last-child, .checkout-item-total, [data-testid="item-total"]'
    );

    // Total amount field — expected to be read-only / non-editable
    this.totalAmountInput = page.locator(
      'input[name="total_amount"], input[data-testid="total-amount"], [data-testid="checkout-total"], .checkout-total'
    );

    // Actions and feedback
    this.confirmOrderButton = page.locator(
      'button[type="submit"]:has-text("Xác nhận"), button:has-text("Đặt hàng"), button:has-text("Confirm")'
    );
    this.successMessage = page.locator(
      '.alert-success, [data-testid="checkout-success"], :has-text("Checkout successful"), :has-text("Đặt hàng thành công")'
    );
    this.errorMessage = page.locator(
      '.alert-error, [data-testid="checkout-error"], :has-text("Lỗi"), :has-text("error")'
    );
  }

  /** Navigate to the web frontend home page */
  async gotoFrontend(baseURL = automationEnv.frontendBaseUrl) {
    await this.page.goto(baseURL);
    await this.page.locator('body').waitFor({ state: 'visible' });
  }

  /** Navigate to the cart page */
  async gotoCart(baseURL = automationEnv.frontendBaseUrl) {
    await this.page.goto(`${baseURL}/cart`);
    await this.page.waitForURL(/\/cart(?:[/?#].*)?$/);
    await this.page.locator('body').waitFor({ state: 'visible' });
  }

  /** Navigate to the checkout page */
  async gotoCheckout(baseURL = automationEnv.frontendBaseUrl) {
    await this.page.goto(`${baseURL}/checkout`);
    await this.page.waitForURL(/\/checkout(?:[/?#].*)?$/);
    await this.page.locator('body').waitFor({ state: 'visible' });
  }

  /** Get count of product rows shown in the checkout table */
  async getOrderItemCount(): Promise<number> {
    return await this.orderItemRows.count();
  }

  /** Get all product names from the checkout item list */
  async getOrderItemNames(): Promise<string[]> {
    return await this.productNameCells.allTextContents();
  }

  /** Get text content of the total amount display element */
  async getTotalAmountText(): Promise<string> {
    return (await this.totalAmountInput.textContent() ||
            await this.totalAmountInput.inputValue() ||
            '').trim();
  }

  /** Attempt to set total amount via keyboard (for read-only test) */
  async tryEditTotalAmount(value: string): Promise<void> {
    await this.totalAmountInput.focus();
    await this.totalAmountInput.fill(value);
  }
}
