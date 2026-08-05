/**
 * Checkout BVA Test Suite (FR-08)
 * Covers: TC-CHECKOUT-BVA-001 to TC-CHECKOUT-BVA-007
 * Technique: Boundary Value Analysis (3-point, 2-point, Length Reference)
 *
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: HW04 - Automation Testing
 *
 * Assertion patterns used:
 *   Pattern 1 — HTTP status assertion (expect(status).toBe / .not.toBe)
 *   Pattern 2 — Body field / value assertion (expect.soft)
 *   Pattern 4 — Network/API response assertion
 *   Pattern 5 — Count/length assertion (toHaveLength)
 */

import { test, expect } from '@playwright/test';
import { CheckoutAPIHelper, CartItem } from '../pages/CheckoutPage';

const BASE_URL = 'http://localhost:3000';

interface User { email: string; password: string; name: string }
interface TestData {
  users: { userA: User };
  products: { airpods: CartItem; keychron: CartItem };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function ensureUserAndLogin(api: CheckoutAPIHelper, user: User): Promise<string> {
  await api.request.post(`${BASE_URL}/api/register`, {
    data: { name: user.name, email: user.email, password: user.password },
  });
  return await api.login(user.email, user.password);
}

async function resetCart(api: CheckoutAPIHelper, token: string): Promise<void> {
  const del = await api.clearCart(token);
  if (del.status() === 200 || del.status() === 204) return;
  const cart = await api.getCart(token);
  if (cart.ok()) {
    const items = await cart.json() as unknown[];
    if (items && items.length > 0) {
      await api.checkout(token, { total_amount: 0, shipping_address: 'reset' });
    }
  }
}

async function prepareCart(
  api: CheckoutAPIHelper,
  token: string,
  items: CartItem[]
): Promise<void> {
  await resetCart(api, token);
  if (items.length > 0) {
    await api.setupCart(token, items);
  }
}

// ─── Test Suite ──────────────────────────────────────────────────────────────
test.describe('FR-08 Checkout — BVA Tests (Boundary Value Analysis)', () => {

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-001: Giỏ hàng đúng 1 sản phẩm (cực tiểu biên, valid)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-BVA-001: Checkout với đúng 1 sản phẩm trong giỏ (boundary min = 1)', async ({ request }) => {
    const testData = (await import('../data/checkout-test-data.json')) as unknown as TestData;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);

    // Prepare: exactly 1 item
    await prepareCart(api, token, [testData.products.keychron]);

    // [Pattern 4] — Network: checkout
    const resp = await api.checkout(token, {
      total_amount: 4000000,
      shipping_address: '123 Le Loi, Quan 1, TP.HCM',
    });

    // [Pattern 1] — Status must be 200 (valid boundary: 1 item)
    expect(resp.status()).toBe(200);

    const body = await resp.json() as { orderId?: number; message?: string };
    // [Pattern 2] — Message contains success indicator
    expect.soft(body.message).toContain('Checkout successful');
    expect(body.orderId).toBeTruthy();

    // [Pattern 5] — Cart must be empty after checkout
    const cartResp = await api.getCart(token);
    const cartItems = await cartResp.json() as unknown[];
    expect(cartItems).toHaveLength(0);

    // [Pattern 2] — Verify order in DB
    if (body.orderId) {
      const orderResp = await api.getOrder(token, body.orderId);
      if (orderResp.ok()) {
        const order = await orderResp.json() as { total_amount?: number; status?: string };
        expect.soft(order.total_amount).toBe(4000000);
        expect.soft(order.status).toBe('pending');
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-002: total_amount = server_total - 1 (biên B-1, invalid)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-BVA-002: total_amount = server_total - 1 (biên dưới lệch 1 đơn vị)', async ({ request }) => {
    const testData = (await import('../data/checkout-test-data.json')) as unknown as TestData;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.airpods, testData.products.keychron]);

    const serverTotal = 10000000;
    const clientTotal = serverTotal - 1; // = 9,999,999

    // [Pattern 4] — Network: send B-1 total
    const resp = await api.checkout(token, {
      total_amount: clientTotal,
      shipping_address: '123 Le Loi',
    });

    // [Pattern 1] — Must be 400 or 200 with corrected total
    const status = resp.status();
    expect([400, 200]).toContain(status);
    expect(status).not.toBe(500);

    if (status === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { total_amount?: number };
          // [Pattern 2] — Must not persist the mismatched B-1 value
          expect(order.total_amount).not.toBe(clientTotal);
          expect.soft(order.total_amount).toBe(serverTotal);
        }
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-003: total_amount = server_total + 1 (biên B+1, invalid)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-BVA-003: total_amount = server_total + 1 (biên trên lệch 1 đơn vị)', async ({ request }) => {
    const testData = (await import('../data/checkout-test-data.json')) as unknown as TestData;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.airpods, testData.products.keychron]);

    const serverTotal = 10000000;
    const clientTotal = serverTotal + 1; // = 10,000,001

    // [Pattern 4] — Network: send B+1 total
    const resp = await api.checkout(token, {
      total_amount: clientTotal,
      shipping_address: '123 Le Loi',
    });

    // [Pattern 1] — Must be 400 or 200 with corrected total
    const status = resp.status();
    expect([400, 200]).toContain(status);
    expect(status).not.toBe(500);

    if (status === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { total_amount?: number };
          // [Pattern 2] — Must not persist the B+1 over-reported value
          expect(order.total_amount).not.toBe(clientTotal);
          expect.soft(order.total_amount).toBe(serverTotal);
        }
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-004: shipping_address = empty string (length 0 = R-1)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-BVA-004: shipping_address chuỗi rỗng (length 0 = R-1 quanh mốc 1)', async ({ request }) => {
    const testData = (await import('../data/checkout-test-data.json')) as unknown as TestData;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.keychron]);

    // [Pattern 4] — Network: empty-string address
    const resp = await api.checkout(token, {
      total_amount: 4000000,
      shipping_address: '',
    });

    // [Pattern 1] — Must not be 500; 200 or 400 both acceptable
    expect(resp.status()).not.toBe(500);
    expect([200, 400]).toContain(resp.status());
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-005: shipping_address = 1 char (length = R)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-BVA-005: shipping_address 1 ký tự (length = R, tại mốc tham chiếu)', async ({ request }) => {
    const testData = (await import('../data/checkout-test-data.json')) as unknown as TestData;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.keychron]);

    // [Pattern 4] — Network: 1-char address
    const resp = await api.checkout(token, {
      total_amount: 4000000,
      shipping_address: 'A',
    });

    // [Pattern 1] — Must not 500
    expect(resp.status()).not.toBe(500);
    expect([200, 400]).toContain(resp.status());

    if (resp.status() === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { shipping_address?: string };
          // [Pattern 2] — Address stored exactly as 'A'
          expect.soft(order.shipping_address).toBe('A');
        }
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-006: shipping_address = 2 chars (length = R+1)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-BVA-006: shipping_address 2 ký tự (length = R+1, ngay trên mốc)', async ({ request }) => {
    const testData = (await import('../data/checkout-test-data.json')) as unknown as TestData;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.keychron]);

    // [Pattern 4] — Network: 2-char address
    const resp = await api.checkout(token, {
      total_amount: 4000000,
      shipping_address: 'AB',
    });

    // [Pattern 1] — Must not 500; behavior must be deterministic
    expect(resp.status()).not.toBe(500);
    expect([200, 400]).toContain(resp.status());

    if (resp.status() === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { shipping_address?: string };
          // [Pattern 2] — No silent truncation at length transition from 1→2
          expect.soft(order.shipping_address).toBe('AB');
        }
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-007: shipping_address at robustness boundary 499/500/501
  // ──────────────────────────────────────────────────────────────────────────
  const robustnessRef = 500;
  const robustnessIterations = [
    { id: 'A', label: 'R-1 (499)', len: robustnessRef - 1 },
    { id: 'B', label: 'R (500)',   len: robustnessRef },
    { id: 'C', label: 'R+1 (501)', len: robustnessRef + 1 },
  ] as const;

  for (const iter of robustnessIterations) {
    test(`TC-CHECKOUT-BVA-007${iter.id}: shipping_address ${iter.label} ký tự — không crash, không silent truncation`, async ({ request }) => {
      const testData = (await import('../data/checkout-test-data.json')) as unknown as TestData;
      const api = new CheckoutAPIHelper(request, BASE_URL);
      const token = await ensureUserAndLogin(api, testData.users.userA);
      await prepareCart(api, token, [testData.products.keychron]);

      // Generate exact-length string
      const longAddress = 'A'.repeat(iter.len);
      expect(longAddress.length).toBe(iter.len); // Pre-condition sanity check

      // [Pattern 4] — Network: send long address
      const resp = await api.checkout(token, {
        total_amount: 4000000,
        shipping_address: longAddress,
      });

      // [Pattern 1] — Must not 500 or crash
      expect(resp.status()).not.toBe(500);
      expect([200, 400]).toContain(resp.status());

      if (resp.status() === 200) {
        const body = await resp.json() as { orderId?: number };
        if (body.orderId) {
          const orderResp = await api.getOrder(token, body.orderId);
          if (orderResp.ok()) {
            const order = await orderResp.json() as { shipping_address?: string };
            if (order.shipping_address) {
              // [Pattern 2] — If stored, length must not be silently truncated
              expect.soft(order.shipping_address.length).toBe(iter.len);
              // Must not have been coerced to "[object Object]"
              expect.soft(order.shipping_address).not.toBe('[object Object]');
            }
          }
        }
      }
    });
  }
});
