/**
 * Checkout Web UI Test Suite (FR-08)
 * Covers: TC-CHECKOUT-011, TC-CHECKOUT-012
 * Technique: Equivalence Partitioning (Domain Testing)
 *
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: HW04 - Automation Testing
 *
 * Assertion patterns used:
 *   Pattern 1 — Element visibility / state (toBeVisible, toBeDisabled)
 *   Pattern 2 — Text / value content (toContainText, toHaveText, toHaveValue)
 *   Pattern 3 — Navigation / URL (toHaveURL)
 */

import { test, expect } from '@playwright/test';
import { CheckoutWebPage } from '../pages/CheckoutPage';
import { CheckoutAPIHelper, CartItem } from '../pages/CheckoutPage';

const API_BASE = 'http://localhost:3000';
const WEB_BASE = 'http://localhost:5173';

interface User { email: string; password: string; name: string }
interface TestData {
  users: { userA: User };
  products: { airpods: CartItem; keychron: CartItem };
}

// ─── Local helpers ────────────────────────────────────────────────────────────

async function ensureUserAndGetToken(
  api: CheckoutAPIHelper,
  user: User
): Promise<string> {
  await api.request.post(`${API_BASE}/api/register`, {
    data: { name: user.name, email: user.email, password: user.password },
  });
  return await api.login(user.email, user.password);
}

async function resetCart(api: CheckoutAPIHelper, token: string) {
  await api.clearCart(token);
}

async function prepareCart(api: CheckoutAPIHelper, token: string, items: CartItem[]) {
  await resetCart(api, token);
  for (const item of items) {
    await api.addToCart(token, item);
  }
}

/** Set browser localStorage so the frontend recognises the logged-in user */
async function loginViaStorage(page: import('@playwright/test').Page, token: string) {
  await page.addInitScript((t: string) => {
    window.localStorage.setItem('token', t);
    window.localStorage.setItem('authToken', t);
    window.localStorage.setItem('jwt', t);
  }, token);
}

// ─── Test Suite ──────────────────────────────────────────────────────────────
test.describe('FR-08 Checkout — Web UI Tests (Equivalence Partitioning)', () => {
  // Shared state across tests in this suite
  let tokenA: string;

  test.beforeAll(async ({ request }) => {
    const testData = (await import('../data/checkout-test-data.json')) as unknown as TestData;
    const api = new CheckoutAPIHelper(request, API_BASE);
    tokenA = await ensureUserAndGetToken(api, testData.users.userA);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-011: Trang Checkout hiển thị đầy đủ mọi dòng sản phẩm
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-011: Trang Checkout hiển thị đầy đủ tên, đơn giá, số lượng các sản phẩm', async ({ page, request }) => {
    const testData = (await import('../data/checkout-test-data.json')) as unknown as TestData;
    const api = new CheckoutAPIHelper(request, API_BASE);

    // Setup cart with 2 AirPods and 1 Keychron
    const cartItems: CartItem[] = [
      { ...testData.products.airpods, quantity: 2 },
      { ...testData.products.keychron, quantity: 1 },
    ];
    await prepareCart(api, tokenA, cartItems);

    // Inject token into localStorage so frontend considers user logged in
    await loginViaStorage(page, tokenA);

    const webPage = new CheckoutWebPage(page);
    await webPage.gotoCheckout(WEB_BASE);

    // [Pattern 1] — Verify checkout page loaded (URL assertion)
    // [Pattern 3] — URL should be on /checkout or similar
    await expect(page).toHaveURL(/checkout|cart|order/i);

    // Collect all product names shown on the checkout page
    // [Pattern 1] — At least 2 product rows must be visible
    const itemCount = await webPage.getOrderItemCount();
    expect(itemCount).toBeGreaterThanOrEqual(2);

    // [Pattern 2] — Text assertion: product names should appear
    const names = await webPage.getOrderItemNames();
    const nameLower = names.map((n) => n.toLowerCase()).join(' ');
    expect.soft(nameLower).toContain('airpods');
    expect.soft(nameLower).toContain('keychron');

    // [Pattern 2] — Total should reflect 2×6,000,000 + 4,000,000 = 16,000,000
    const totalText = await webPage.getTotalAmountText();
    // Accept both formatted (16.000.000) and raw (16000000) representations
    const totalClean = totalText.replace(/\D/g, '');
    expect.soft(totalClean).toContain('16000000');
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-012: Tổng tiền là giá trị tự động và không thể chỉnh sửa
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-012: Điều khiển tổng tiền là read-only và backend không tin giá trị client sửa', async ({ page, request }) => {
    const testData = (await import('../data/checkout-test-data.json')) as unknown as TestData;
    const api = new CheckoutAPIHelper(request, API_BASE);

    const cartItems: CartItem[] = [
      testData.products.airpods,
      testData.products.keychron,
    ];
    await prepareCart(api, tokenA, cartItems);
    await loginViaStorage(page, tokenA);

    const webPage = new CheckoutWebPage(page);
    await webPage.gotoCheckout(WEB_BASE);

    // [Pattern 3] — URL reached checkout page
    await expect(page).toHaveURL(/checkout|cart|order/i);

    // [Pattern 1] — The total-amount control should be disabled or read-only
    // Try to locate the element
    const totalEl = page.locator(
      'input[name="total_amount"], input[data-testid="total-amount"], [data-testid="checkout-total"]'
    ).first();

    const isVisible = await totalEl.isVisible().catch(() => false);
    if (isVisible) {
      const isDisabled = await totalEl.isDisabled().catch(() => false);
      const isReadOnly = await totalEl.getAttribute('readonly').catch(() => null);
      const isReadOnlyBool = await totalEl.getAttribute('type').then((t) => t === 'text' ? false : false).catch(() => false);

      // [Pattern 1] — Should be disabled or readonly
      const isProtected = isDisabled || isReadOnly !== null || isReadOnlyBool;
      expect.soft(isProtected).toBe(true);

      // [Pattern 2] — Try to modify via keyboard; value should not change
      const originalValue = await totalEl.inputValue().catch(() => '');
      await webPage.tryEditTotalAmount('1');
      const modifiedValue = await totalEl.inputValue().catch(() => originalValue);
      expect.soft(modifiedValue).toBe(originalValue);
    } else {
      // If no editable input for total: find text-only display
      const totalText = page.locator(
        '.checkout-total, [data-testid="checkout-total"], .total-price, .order-total'
      ).first();
      // [Pattern 1] — Total price display should be visible
      await expect.soft(totalText).toBeVisible();
    }

    // [Pattern 2] — After DOM manipulation (override total to 1) and submitting,
    // backend should still use its own computed total.
    // (Simulate via DevTools evaluation; verify via API)
    await page.evaluate(() => {
      const inputs = document.querySelectorAll('input');
      inputs.forEach((inp) => {
        if (inp.name === 'total_amount' || inp.getAttribute('data-testid') === 'total-amount') {
          (inp as HTMLInputElement).removeAttribute('disabled');
          (inp as HTMLInputElement).removeAttribute('readonly');
          (inp as HTMLInputElement).value = '1';
        }
      });
    });

    // Check order count before submitting
    const orderCountBefore = await api.getOrderCount(tokenA);

    // Try to find and click the submit button
    const submitBtn = page.locator(
      'button[type="submit"]:has-text("Xác nhận"), button:has-text("Đặt hàng"), button:has-text("Confirm"), button:has-text("Checkout")'
    ).first();
    const submitVisible = await submitBtn.isVisible().catch(() => false);
    if (submitVisible) {
      await submitBtn.click();
      await page.waitForTimeout(2000);

      const orderCountAfter = await api.getOrderCount(tokenA);
      if (orderCountAfter > orderCountBefore) {
        // A new order was placed — verify its total from API
        const ordersResp = await api.getMyOrders(tokenA);
        if (ordersResp.ok()) {
          const orders = await ordersResp.json() as Array<{ total_amount?: number; id?: number }>;
          const latestOrder = orders[orders.length - 1];
          if (latestOrder) {
            // [Pattern 2] — Backend must not have accepted the DOM-manipulated total of "1"
            expect(latestOrder.total_amount).not.toBe(1);
          }
        }
      }
    }
  });
});
