# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-api.spec.ts >> FR-08 Checkout — API Tests (Equivalence Partitioning) >> TC-CHECKOUT-001: Thanh toán thành công với token và giỏ hàng hợp lệ
- Location: tests\checkout-api.spec.ts:78:7

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 72
Received array:  [{"id": 4, "name": "Tai nghe AirPods Pro 2", "price": 6000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 4, "name": "Tai nghe AirPods Pro 2", "price": 6000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 4, "name": "Tai nghe AirPods Pro 2", "price": 6000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, …]
```

# Test source

```ts
  1   | /**
  2   |  * Checkout API Test Suite (FR-08)
  3   |  * Covers: TC-CHECKOUT-001 to TC-CHECKOUT-009, TC-CHECKOUT-013, TC-CHECKOUT-014
  4   |  * Technique: Equivalence Partitioning (Domain Testing)
  5   |  *
  6   |  * Student: Mạch Quốc Tấn - 23127115
  7   |  * Assignment: HW04 - Automation Testing
  8   |  *
  9   |  * Assertion patterns used:
  10  |  *   Pattern 1 — HTTP status code assertion (expect(response.status()).toBe(...))
  11  |  *   Pattern 2 — Response body / field value assertion (toMatchObject, toContain)
  12  |  *   Pattern 3 — Soft assertion (expect.soft) for characterization tests
  13  |  */
  14  | 
  15  | import { test, expect } from '@playwright/test';
  16  | import { CheckoutAPIHelper, CartItem } from '../pages/CheckoutPage';
  17  | import testDataRaw from '../data/checkout-test-data.json';
  18  | import { automationEnv } from '../../_common/env';
  19  | import { HTTP_STATUS } from '../../_common/http-status';
  20  | 
  21  | // ─── Type helpers ────────────────────────────────────────────────────────────
  22  | interface User { email: string; password: string; name: string }
  23  | interface TestData {
  24  |   users: { userA: User; userB: User; invalid: User };
  25  |   products: Record<string, CartItem>;
  26  |   tc_api: any[];
  27  |   tc_type_variants: any[];
  28  |   meta: { robustness_ref: number; shipping_address_short: string; shipping_address_unicode: string };
  29  | }
  30  | const testData = testDataRaw as unknown as TestData;
  31  | 
  32  | // ─── Helpers ─────────────────────────────────────────────────────────────────
  33  | const BASE_URL = automationEnv.apiBaseUrl;
  34  | 
  35  | /** Ensure user exists (register if needed) then login and return token */
  36  | async function ensureUserAndLogin(
  37  |   api: CheckoutAPIHelper,
  38  |   user: User
  39  | ): Promise<string> {
  40  |   // Attempt registration — ignore bad-request when the user already exists
  41  |   await api.request.post(`${BASE_URL}/api/register`, {
  42  |     data: { name: user.name, email: user.email, password: user.password },
  43  |   });
  44  |   return await api.login(user.email, user.password);
  45  | }
  46  | 
  47  | /** Reset cart: perform a dummy checkout or DELETE. Returns after cart is empty. */
  48  | async function resetCart(api: CheckoutAPIHelper, token: string): Promise<void> {
  49  |   const del = await api.clearCart(token);
  50  |   if (del.status() === HTTP_STATUS.OK || del.status() === HTTP_STATUS.NO_CONTENT) return;
  51  |   const cart = await api.getCart(token);
  52  |   if (cart.ok()) {
  53  |     const items = await cart.json() as unknown[];
  54  |     if (items && items.length > 0) {
  55  |       await api.checkout(token, { total_amount: 0, shipping_address: 'reset' });
  56  |     }
  57  |   }
  58  | }
  59  | 
  60  | /** Add items to cart after clearing */
  61  | async function prepareCart(
  62  |   api: CheckoutAPIHelper,
  63  |   token: string,
  64  |   items: CartItem[]
  65  | ): Promise<void> {
  66  |   await resetCart(api, token);
  67  |   if (items.length > 0) {
  68  |     await api.setupCart(token, items);
  69  |   }
  70  | }
  71  | 
  72  | // ─── Test Suite ──────────────────────────────────────────────────────────────
  73  | test.describe('FR-08 Checkout — API Tests (Equivalence Partitioning)', () => {
  74  | 
  75  |   // ──────────────────────────────────────────────────────────────────────────
  76  |   // TC-CHECKOUT-001: Thanh toán thành công với thông tin hợp lệ
  77  |   // ──────────────────────────────────────────────────────────────────────────
  78  |   test('TC-CHECKOUT-001: Thanh toán thành công với token và giỏ hàng hợp lệ', async ({ request }) => {
  79  |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-001')!;
  80  |     const api = new CheckoutAPIHelper(request, BASE_URL);
  81  |     const token = await ensureUserAndLogin(api, testData.users.userA);
  82  |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  83  | 
  84  |     const checkoutResp = await api.checkout(token, tc.payload);
  85  | 
  86  |     expect(checkoutResp.status()).toBe(tc.expected_status);
  87  | 
  88  |     const body = await checkoutResp.json() as { message?: string; orderId?: number };
  89  |     expect.soft(body.message).toContain(tc.expected_message_contains);
  90  |     expect(body.orderId).toBeTruthy();
  91  | 
  92  |     const cartResp = await api.getCart(token);
  93  |     expect(cartResp.status()).toBe(HTTP_STATUS.OK);
  94  |     const cartItems = await cartResp.json() as unknown[];
> 95  |     expect(cartItems).toHaveLength(0);
      |                       ^ Error: expect(received).toHaveLength(expected)
  96  | 
  97  |     if (body.orderId) {
  98  |       const orderResp = await api.getOrder(token, body.orderId);
  99  |       if (orderResp.ok()) {
  100 |         const order = await orderResp.json() as { total_amount?: number; status?: string };
  101 |         expect.soft(order.status).toBe(tc.expected_order_status);
  102 |         expect.soft(order.total_amount).toBe(tc.expected_total_in_db);
  103 |       }
  104 |     }
  105 |   });
  106 | 
  107 |   // ──────────────────────────────────────────────────────────────────────────
  108 |   // TC-CHECKOUT-002: Từ chối khi token không hợp lệ
  109 |   // ──────────────────────────────────────────────────────────────────────────
  110 |   test('TC-CHECKOUT-002: Từ chối checkout khi dùng token JWT không hợp lệ', async ({ request }) => {
  111 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-002')!;
  112 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  113 | 
  114 |     const resp = await api.checkout(tc.invalid_token.replace('Bearer ', ''), tc.payload);
  115 | 
  116 |     expect(resp.status()).toBe(tc.expected_status);
  117 |   });
  118 | 
  119 |   // ──────────────────────────────────────────────────────────────────────────
  120 |   // TC-CHECKOUT-002B: Từ chối khi không có Authorization header
  121 |   // ──────────────────────────────────────────────────────────────────────────
  122 |   test('TC-CHECKOUT-002B: Từ chối checkout khi không có Authorization header', async ({ request }) => {
  123 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-002B')!;
  124 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  125 | 
  126 |     const resp = await api.checkoutNoAuth(tc.payload);
  127 | 
  128 |     expect(resp.status()).toBe(tc.expected_status);
  129 |   });
  130 | 
  131 |   // ──────────────────────────────────────────────────────────────────────────
  132 |   // TC-CHECKOUT-003: Từ chối khi giỏ hàng trống
  133 |   // ──────────────────────────────────────────────────────────────────────────
  134 |   test('TC-CHECKOUT-003: Từ chối checkout khi giỏ hàng trống', async ({ request }) => {
  135 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-003')!;
  136 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  137 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  138 | 
  139 |     await resetCart(api, token);
  140 | 
  141 |     const resp = await api.checkout(token, tc.payload);
  142 | 
  143 |     expect(resp.status()).toBe(tc.expected_status);
  144 | 
  145 |     const body = await resp.json() as { error?: string; message?: string };
  146 |     const errorText = (body.error || body.message || '').toLowerCase();
  147 |     expect.soft(errorText).toMatch(/empty|cart|giỏ/i);
  148 |   });
  149 | 
  150 |   // ──────────────────────────────────────────────────────────────────────────
  151 |   // TC-CHECKOUT-004: Tổng tiền client gửi không khớp server tính
  152 |   // ──────────────────────────────────────────────────────────────────────────
  153 |   test('TC-CHECKOUT-004: Xử lý an toàn khi total_amount client gửi không khớp (giả mạo thấp hơn)', async ({ request }) => {
  154 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-004')!;
  155 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  156 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  157 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  158 | 
  159 |     const orderCountBefore = await api.getOrderCount(token);
  160 | 
  161 |     const resp = await api.checkout(token, tc.payload);
  162 | 
  163 |     const status = resp.status();
  164 |     expect(tc.expected_status_oneOf).toContain(status);
  165 | 
  166 |     if (status === HTTP_STATUS.OK) {
  167 |       const body = await resp.json() as { orderId?: number };
  168 |       if (body.orderId) {
  169 |         const orderResp = await api.getOrder(token, body.orderId);
  170 |         if (orderResp.ok()) {
  171 |           const order = await orderResp.json() as { total_amount?: number };
  172 |           expect(order.total_amount).not.toBe(tc.must_not_persist_total);
  173 |           expect(order.total_amount).toBe(tc.if_200_expected_total_in_db);
  174 |         }
  175 |       }
  176 |     } else {
  177 |       const orderCountAfter = await api.getOrderCount(token);
  178 |       expect.soft(orderCountAfter).toBe(orderCountBefore);
  179 |     }
  180 |   });
  181 | 
  182 |   // ──────────────────────────────────────────────────────────────────────────
  183 |   // TC-CHECKOUT-005: Thanh toán với địa chỉ thông thường
  184 |   // ──────────────────────────────────────────────────────────────────────────
  185 |   test('TC-CHECKOUT-005: Thanh toán thành công với địa chỉ giao hàng thông thường', async ({ request }) => {
  186 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-005')!;
  187 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  188 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  189 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  190 | 
  191 |     const resp = await api.checkout(token, tc.payload);
  192 | 
  193 |     expect(resp.status()).toBe(tc.expected_status);
  194 | 
  195 |     const body = await resp.json() as { orderId?: number };
```