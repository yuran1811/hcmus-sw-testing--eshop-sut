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
import testDataRaw from '../data/checkout-test-data.json';

const BASE_URL = 'http://localhost:3000';

interface User { email: string; password: string; name: string }
interface TestData {
  users: { userA: User };
  products: { airpods: CartItem; keychron: CartItem };
  tc_bva: any[];
}
const testData = testDataRaw as unknown as TestData;

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
    const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-001')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);

    await prepareCart(api, token, [testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    expect(resp.status()).toBe(tc.expected_status);

    const body = await resp.json() as { orderId?: number; message?: string };
    expect.soft(body.message).toContain('Checkout successful');
    expect(body.orderId).toBeTruthy();

    const cartResp = await api.getCart(token);
    const cartItems = await cartResp.json() as unknown[];
    expect(cartItems).toHaveLength(0);

    if (body.orderId) {
      const orderResp = await api.getOrder(token, body.orderId);
      if (orderResp.ok()) {
        const order = await orderResp.json() as { total_amount?: number; status?: string };
        expect.soft(order.total_amount).toBe(tc.expected_total_in_db);
        expect.soft(order.status).toBe('pending');
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-002: total_amount = server_total - 1 (biên B-1, invalid)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-BVA-002: total_amount = server_total - 1 (biên dưới lệch 1 đơn vị)', async ({ request }) => {
    const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-002')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.airpods, testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    const status = resp.status();
    expect(tc.expected_status_oneOf).toContain(status);
    expect(status).not.toBe(500);

    if (status === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { total_amount?: number };
          expect(order.total_amount).not.toBe(tc.payload.total_amount);
          expect.soft(order.total_amount).toBe(tc.if_200_expected_total_in_db);
        }
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-003: total_amount = server_total + 1 (biên B+1, invalid)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-BVA-003: total_amount = server_total + 1 (biên trên lệch 1 đơn vị)', async ({ request }) => {
    const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-003')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.airpods, testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    const status = resp.status();
    expect(tc.expected_status_oneOf).toContain(status);
    expect(status).not.toBe(500);

    if (status === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { total_amount?: number };
          expect(order.total_amount).not.toBe(tc.payload.total_amount);
          expect.soft(order.total_amount).toBe(tc.if_200_expected_total_in_db);
        }
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-004: shipping_address = empty string (length 0 = R-1)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-BVA-004: shipping_address chuỗi rỗng (length 0 = R-1 quanh mốc 1)', async ({ request }) => {
    const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-004')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    expect(resp.status()).not.toBe(500);
    expect(tc.expected_status_oneOf).toContain(resp.status());
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-005: shipping_address = 1 char (length = R)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-BVA-005: shipping_address 1 ký tự (length = R, tại mốc tham chiếu)', async ({ request }) => {
    const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-005')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    expect(resp.status()).not.toBe(500);
    expect(tc.expected_status_oneOf).toContain(resp.status());

    if (resp.status() === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { shipping_address?: string };
          expect.soft(order.shipping_address).toBe(tc.payload.shipping_address);
        }
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-BVA-006: shipping_address = 2 chars (length = R+1)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-BVA-006: shipping_address 2 ký tự (length = R+1, ngay trên mốc)', async ({ request }) => {
    const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-006')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    expect(resp.status()).not.toBe(500);
    expect(tc.expected_status_oneOf).toContain(resp.status());

    if (resp.status() === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { shipping_address?: string };
          expect.soft(order.shipping_address).toBe(tc.payload.shipping_address);
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
      const api = new CheckoutAPIHelper(request, BASE_URL);
      const token = await ensureUserAndLogin(api, testData.users.userA);
      await prepareCart(api, token, [testData.products.keychron]);

      const longAddress = 'A'.repeat(iter.len);
      expect(longAddress.length).toBe(iter.len);

      const resp = await api.checkout(token, {
        total_amount: 4000000,
        shipping_address: longAddress,
      });

      expect(resp.status()).not.toBe(500);
      expect([200, 400]).toContain(resp.status());

      if (resp.status() === 200) {
        const body = await resp.json() as { orderId?: number };
        if (body.orderId) {
          const orderResp = await api.getOrder(token, body.orderId);
          if (orderResp.ok()) {
            const order = await orderResp.json() as { shipping_address?: string };
            if (order.shipping_address) {
              expect.soft(order.shipping_address.length).toBe(iter.len);
              expect.soft(order.shipping_address).not.toBe('[object Object]');
            }
          }
        }
      }
    });
  }
});
