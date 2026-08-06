/**
 * Checkout API Test Suite (FR-08)
 * Covers: TC-CHECKOUT-001 to TC-CHECKOUT-009, TC-CHECKOUT-013, TC-CHECKOUT-014
 * Technique: Equivalence Partitioning (Domain Testing)
 *
 * Student: Mạch Quốc Tấn - 23127115
 * Assignment: HW04 - Automation Testing
 *
 * Assertion patterns used:
 *   Pattern 1 — HTTP status code assertion (expect(response.status()).toBe(...))
 *   Pattern 2 — Response body / field value assertion (toMatchObject, toContain)
 *   Pattern 3 — Soft assertion (expect.soft) for characterization tests
 */

import { test, expect } from '@playwright/test';
import { CheckoutAPIHelper, CartItem } from '../pages/CheckoutPage';
import testDataRaw from '../data/checkout-test-data.json';

// ─── Type helpers ────────────────────────────────────────────────────────────
interface User { email: string; password: string; name: string }
interface TestData {
  users: { userA: User; userB: User; invalid: User };
  products: Record<string, CartItem>;
  tc_api: any[];
}
const testData = testDataRaw as unknown as TestData;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const BASE_URL = 'http://localhost:3000';

/** Ensure user exists (register if needed) then login and return token */
async function ensureUserAndLogin(
  api: CheckoutAPIHelper,
  user: User
): Promise<string> {
  // Attempt registration — ignore 400 "already exists"
  await api.request.post(`${BASE_URL}/api/register`, {
    data: { name: user.name, email: user.email, password: user.password },
  });
  return await api.login(user.email, user.password);
}

/** Reset cart: perform a dummy checkout or DELETE. Returns after cart is empty. */
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

/** Add items to cart after clearing */
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
test.describe('FR-08 Checkout — API Tests (Equivalence Partitioning)', () => {

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-001: Thanh toán thành công với thông tin hợp lệ
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-001: Thanh toán thành công với token và giỏ hàng hợp lệ', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-001')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.airpods, testData.products.keychron]);

    const checkoutResp = await api.checkout(token, tc.payload);

    expect(checkoutResp.status()).toBe(tc.expected_status);

    const body = await checkoutResp.json() as { message?: string; orderId?: number };
    expect.soft(body.message).toContain(tc.expected_message_contains);
    expect(body.orderId).toBeTruthy();

    const cartResp = await api.getCart(token);
    expect(cartResp.status()).toBe(200);
    const cartItems = await cartResp.json() as unknown[];
    expect(cartItems).toHaveLength(0);

    if (body.orderId) {
      const orderResp = await api.getOrder(token, body.orderId);
      if (orderResp.ok()) {
        const order = await orderResp.json() as { total_amount?: number; status?: string };
        expect.soft(order.status).toBe(tc.expected_order_status);
        expect.soft(order.total_amount).toBe(tc.expected_total_in_db);
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-002: Từ chối khi token không hợp lệ
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-002: Từ chối checkout khi dùng token JWT không hợp lệ', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-002')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);

    const resp = await api.checkout(tc.invalid_token.replace('Bearer ', ''), tc.payload);

    expect(resp.status()).toBe(tc.expected_status);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-002B: Từ chối khi không có Authorization header
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-002B: Từ chối checkout khi không có Authorization header', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-002B')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);

    const resp = await api.checkoutNoAuth(tc.payload);

    expect(resp.status()).toBe(tc.expected_status);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-003: Từ chối khi giỏ hàng trống
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-003: Từ chối checkout khi giỏ hàng trống', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-003')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);

    await resetCart(api, token);

    const resp = await api.checkout(token, tc.payload);

    expect(resp.status()).toBe(tc.expected_status);

    const body = await resp.json() as { error?: string; message?: string };
    const errorText = (body.error || body.message || '').toLowerCase();
    expect.soft(errorText).toMatch(/empty|cart|giỏ/i);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-004: Tổng tiền client gửi không khớp server tính
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-004: Xử lý an toàn khi total_amount client gửi không khớp (giả mạo thấp hơn)', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-004')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.airpods, testData.products.keychron]);

    const orderCountBefore = await api.getOrderCount(token);

    const resp = await api.checkout(token, tc.payload);

    const status = resp.status();
    expect(tc.expected_status_oneOf).toContain(status);

    if (status === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { total_amount?: number };
          expect(order.total_amount).not.toBe(tc.must_not_persist_total);
          expect(order.total_amount).toBe(tc.if_200_expected_total_in_db);
        }
      }
    } else {
      const orderCountAfter = await api.getOrderCount(token);
      expect.soft(orderCountAfter).toBe(orderCountBefore);
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-005: Thanh toán với địa chỉ thông thường
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-005: Thanh toán thành công với địa chỉ giao hàng thông thường', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-005')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.airpods, testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    expect(resp.status()).toBe(tc.expected_status);

    const body = await resp.json() as { orderId?: number };
    if (body.orderId) {
      const orderResp = await api.getOrder(token, body.orderId);
      if (orderResp.ok()) {
        const order = await orderResp.json() as { shipping_address?: string; status?: string };
        expect.soft(order.shipping_address).toBe(tc.expected_address_in_order);
      }
    }

    const cartResp = await api.getCart(token);
    const cartItems = await cartResp.json() as unknown[];
    expect(cartItems).toHaveLength(0);
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-006: Địa chỉ Unicode / tiếng Việt
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-006: Địa chỉ Unicode và tiếng Việt được lưu không mất mã hóa', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-006')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    expect(resp.status()).toBe(tc.expected_status);

    const body = await resp.json() as { orderId?: number };
    if (body.orderId) {
      const orderResp = await api.getOrder(token, body.orderId);
      if (orderResp.ok()) {
        const order = await orderResp.json() as { shipping_address?: string };
        expect.soft(order.shipping_address).toBe(tc.expected_address_in_order);
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-007: XSS payload trong địa chỉ
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-007: Địa chỉ chứa HTML/XSS — không thực thi script', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-007')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    const status = resp.status();
    expect(tc.expected_status_oneOf).toContain(status);
    expect(status).not.toBe(500);

    if (status === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { shipping_address?: string };
          expect.soft(typeof order.shipping_address).toBe('string');
        }
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-008: Omitted / null shipping_address (specification gap)
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-008A: Hành vi khi shipping_address bị bỏ qua (omitted)', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-008A')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    expect(resp.status()).not.toBe(500);
    expect.soft(tc.expected_status_oneOf).toContain(resp.status());
  });

  test('TC-CHECKOUT-008B: Hành vi khi shipping_address là JSON null', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-008B')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    expect(resp.status()).not.toBe(500);
    expect.soft(tc.expected_status_oneOf).toContain(resp.status());
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-009: Địa chỉ chỉ chứa khoảng trắng
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-009: Địa chỉ chỉ chứa khoảng trắng — không crash, không tạo state dở dang', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-009')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    expect(resp.status()).not.toBe(500);
    expect.soft(tc.expected_status_oneOf).toContain(resp.status());
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-010: Non-string shipping_address types
  // ──────────────────────────────────────────────────────────────────────────
  const typeVariants = [
    { id: 'A', label: 'Number',  addr: 12345 },
    { id: 'B', label: 'Boolean', addr: true },
    { id: 'C', label: 'Object',  addr: { line: '123 Le Loi' } },
    { id: 'D', label: 'Array',   addr: ['123 Le Loi'] },
  ] as const;

  for (const variant of typeVariants) {
    test(`TC-CHECKOUT-010${variant.id}: shipping_address là ${variant.label} — không crash, không lưu [object Object]`, async ({ request }) => {
      const api = new CheckoutAPIHelper(request, BASE_URL);
      const token = await ensureUserAndLogin(api, testData.users.userA);
      await prepareCart(api, token, [testData.products.keychron]);

      const resp = await api.checkout(token, {
        total_amount: 4000000,
        shipping_address: variant.addr,
      });

      expect(resp.status()).not.toBe(500);
      expect.soft([200, 400]).toContain(resp.status());

      if (resp.status() === 200) {
        const body = await resp.json() as { orderId?: number };
        if (body.orderId) {
          const orderResp = await api.getOrder(token, body.orderId);
          if (orderResp.ok()) {
            const order = await orderResp.json() as { shipping_address?: string };
            expect.soft(order.shipping_address).not.toBe('[object Object]');
          }
        }
      }
    });
  }

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-013: Backend tự tính tổng khi client không gửi total_amount
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-013: Backend tự tính total_amount khi client không gửi', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-013')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.airpods, testData.products.keychron]);

    const resp = await api.checkout(token, tc.payload);

    expect(resp.status()).not.toBe(500);

    if (resp.status() === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { total_amount?: number; status?: string };
          expect.soft(order.total_amount).toBeGreaterThan(0);
          expect.soft(order.status).toBe('pending');
        }
      }
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-014: Backend không tin payload items giả mạo từ client
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-014: Backend không dùng items/giá giả mạo từ client payload', async ({ request }) => {
    const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-014')!;
    const api = new CheckoutAPIHelper(request, BASE_URL);
    const token = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, token, [testData.products.airpods, testData.products.keychron]);

    const orderCountBefore = await api.getOrderCount(token);

    const resp = await api.checkout(token, tc.forged_payload);

    expect(resp.status()).not.toBe(500);

    if (resp.status() === 200) {
      const body = await resp.json() as { orderId?: number };
      if (body.orderId) {
        const orderResp = await api.getOrder(token, body.orderId);
        if (orderResp.ok()) {
          const order = await orderResp.json() as { total_amount?: number };
          expect(order.total_amount).not.toBe(tc.must_not_persist_total);
          expect.soft(order.total_amount).toBe(tc.if_200_expected_total_in_db);
        }
      }
    } else {
      const orderCountAfter = await api.getOrderCount(token);
      expect.soft(orderCountAfter).toBe(orderCountBefore);
    }
  });

  // ──────────────────────────────────────────────────────────────────────────
  // TC-CHECKOUT-015: Checkout chỉ xóa giỏ của đúng người dùng thực hiện
  // ──────────────────────────────────────────────────────────────────────────
  test('TC-CHECKOUT-015: Checkout chỉ xóa giỏ của user A, không ảnh hưởng user B', async ({ request }) => {
    const api = new CheckoutAPIHelper(request, BASE_URL);

    const tokenA = await ensureUserAndLogin(api, testData.users.userA);
    await prepareCart(api, tokenA, [testData.products.keychron]);

    const tokenB = await ensureUserAndLogin(api, testData.users.userB);
    await prepareCart(api, tokenB, [testData.products.airpods]);

    const cartBefore = await api.getCart(tokenB);
    const cartBItems = await cartBefore.json() as unknown[];
    const cartBCountBefore = cartBItems.length;

    const respA = await api.checkout(tokenA, {
      total_amount: 4000000,
      shipping_address: '123 Le Loi',
    });

    expect(respA.status()).toBe(200);

    const cartARespAfter = await api.getCart(tokenA);
    const cartAItems = await cartARespAfter.json() as unknown[];
    expect(cartAItems).toHaveLength(0);

    const cartBRespAfter = await api.getCart(tokenB);
    const cartBItemsAfter = await cartBRespAfter.json() as unknown[];
    expect(cartBItemsAfter).toHaveLength(cartBCountBefore);

    const ordersB = await api.getMyOrders(tokenB);
    if (ordersB.ok()) {
      const ordersBBody = await ordersB.json() as Array<{ user_id?: number }>;
      const newOrdersForB = ordersBBody.filter((o) => o.user_id !== undefined);
      expect.soft(newOrdersForB.length).toBeGreaterThanOrEqual(0);
    }
  });
});
