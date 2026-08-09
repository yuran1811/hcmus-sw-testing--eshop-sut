# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-bva.spec.ts >> FR-08 Checkout — BVA Tests (Boundary Value Analysis) >> TC-CHECKOUT-BVA-001: Checkout với giỏ hàng ở biên dưới hợp lệ
- Location: tests\checkout-bva.spec.ts:71:7

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 21
Received array:  [{"id": 4, "name": "Tai nghe AirPods Pro 2", "price": 6000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 4, "name": "Tai nghe AirPods Pro 2", "price": 6000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 4, "name": "Tai nghe AirPods Pro 2", "price": 6000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, …]
```

# Test source

```ts
  1   | /**
  2   |  * Checkout BVA Test Suite (FR-08)
  3   |  * Covers: TC-CHECKOUT-BVA-001 to TC-CHECKOUT-BVA-007
  4   |  * Technique: Boundary Value Analysis (3-point, 2-point, Length Reference)
  5   |  *
  6   |  * Student: Mạch Quốc Tấn - 23127115
  7   |  * Assignment: HW04 - Automation Testing
  8   |  *
  9   |  * Assertion patterns used:
  10  |  *   Pattern 1 — HTTP status assertion (expect(status).toBe / .not.toBe)
  11  |  *   Pattern 2 — Body field / value assertion (expect.soft)
  12  |  *   Pattern 4 — Network/API response assertion
  13  |  *   Pattern 5 — Count/length assertion (toHaveLength)
  14  |  */
  15  | 
  16  | import { test, expect } from '@playwright/test';
  17  | import { CheckoutAPIHelper, CartItem } from '../pages/CheckoutPage';
  18  | import testDataRaw from '../data/checkout-test-data.json';
  19  | import { automationEnv } from '../../_common/env';
  20  | import { HTTP_STATUS } from '../../_common/http-status';
  21  | 
  22  | const BASE_URL = automationEnv.apiBaseUrl;
  23  | 
  24  | interface User { email: string; password: string; name: string }
  25  | interface TestData {
  26  |   users: { userA: User };
  27  |   products: { airpods: CartItem; keychron: CartItem };
  28  |   tc_bva: any[];
  29  |   meta: { robustness_ref: number; shipping_address_short: string; shipping_address_unicode: string };
  30  | }
  31  | const testData = testDataRaw as unknown as TestData;
  32  | 
  33  | // ─── Helpers ─────────────────────────────────────────────────────────────────
  34  | 
  35  | async function ensureUserAndLogin(api: CheckoutAPIHelper, user: User): Promise<string> {
  36  |   await api.request.post(`${BASE_URL}/api/register`, {
  37  |     data: { name: user.name, email: user.email, password: user.password },
  38  |   });
  39  |   return await api.login(user.email, user.password);
  40  | }
  41  | 
  42  | async function resetCart(api: CheckoutAPIHelper, token: string): Promise<void> {
  43  |   const del = await api.clearCart(token);
  44  |   if (del.status() === HTTP_STATUS.OK || del.status() === HTTP_STATUS.NO_CONTENT) return;
  45  |   const cart = await api.getCart(token);
  46  |   if (cart.ok()) {
  47  |     const items = await cart.json() as unknown[];
  48  |     if (items && items.length > 0) {
  49  |       await api.checkout(token, { total_amount: 0, shipping_address: 'reset' });
  50  |     }
  51  |   }
  52  | }
  53  | 
  54  | async function prepareCart(
  55  |   api: CheckoutAPIHelper,
  56  |   token: string,
  57  |   items: CartItem[]
  58  | ): Promise<void> {
  59  |   await resetCart(api, token);
  60  |   if (items.length > 0) {
  61  |     await api.setupCart(token, items);
  62  |   }
  63  | }
  64  | 
  65  | // ─── Test Suite ──────────────────────────────────────────────────────────────
  66  | test.describe('FR-08 Checkout — BVA Tests (Boundary Value Analysis)', () => {
  67  | 
  68  |   // ──────────────────────────────────────────────────────────────────────────
  69  |   // TC-CHECKOUT-BVA-001: Giỏ hàng tại biên dưới hợp lệ
  70  |   // ──────────────────────────────────────────────────────────────────────────
  71  |   test('TC-CHECKOUT-BVA-001: Checkout với giỏ hàng ở biên dưới hợp lệ', async ({ request }) => {
  72  |     const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-001')!;
  73  |     const api = new CheckoutAPIHelper(request, BASE_URL);
  74  |     const token = await ensureUserAndLogin(api, testData.users.userA);
  75  | 
  76  |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  77  | 
  78  |     const resp = await api.checkout(token, tc.payload);
  79  | 
  80  |     expect(resp.status()).toBe(tc.expected_status);
  81  | 
  82  |     const body = await resp.json() as { orderId?: number; message?: string };
  83  |     expect.soft(body.message).toContain('Checkout successful');
  84  |     expect(body.orderId).toBeTruthy();
  85  | 
  86  |     const cartResp = await api.getCart(token);
  87  |     const cartItems = await cartResp.json() as unknown[];
> 88  |     expect(cartItems).toHaveLength(0);
      |                       ^ Error: expect(received).toHaveLength(expected)
  89  | 
  90  |     if (body.orderId) {
  91  |       const orderResp = await api.getOrder(token, body.orderId);
  92  |       if (orderResp.ok()) {
  93  |         const order = await orderResp.json() as { total_amount?: number; status?: string };
  94  |         expect.soft(order.total_amount).toBe(tc.expected_total_in_db);
  95  |         expect.soft(order.status).toBe('pending');
  96  |       }
  97  |     }
  98  |   });
  99  | 
  100 |   // ──────────────────────────────────────────────────────────────────────────
  101 |   // TC-CHECKOUT-BVA-002: total_amount thấp hơn giá trị hệ thống tính
  102 |   // ──────────────────────────────────────────────────────────────────────────
  103 |   test('TC-CHECKOUT-BVA-002: total_amount thấp hơn giá trị hệ thống tính', async ({ request }) => {
  104 |     const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-002')!;
  105 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  106 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  107 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  108 | 
  109 |     const resp = await api.checkout(token, tc.payload);
  110 | 
  111 |     const status = resp.status();
  112 |     expect(tc.expected_status_oneOf).toContain(status);
  113 |     expect(status).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  114 | 
  115 |     if (status === HTTP_STATUS.OK) {
  116 |       const body = await resp.json() as { orderId?: number };
  117 |       if (body.orderId) {
  118 |         const orderResp = await api.getOrder(token, body.orderId);
  119 |         if (orderResp.ok()) {
  120 |           const order = await orderResp.json() as { total_amount?: number };
  121 |           expect(order.total_amount).not.toBe(tc.payload.total_amount);
  122 |           expect.soft(order.total_amount).toBe(tc.if_200_expected_total_in_db);
  123 |         }
  124 |       }
  125 |     }
  126 |   });
  127 | 
  128 |   // ──────────────────────────────────────────────────────────────────────────
  129 |   // TC-CHECKOUT-BVA-003: total_amount cao hơn giá trị hệ thống tính
  130 |   // ──────────────────────────────────────────────────────────────────────────
  131 |   test('TC-CHECKOUT-BVA-003: total_amount cao hơn giá trị hệ thống tính', async ({ request }) => {
  132 |     const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-003')!;
  133 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  134 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  135 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  136 | 
  137 |     const resp = await api.checkout(token, tc.payload);
  138 | 
  139 |     const status = resp.status();
  140 |     expect(tc.expected_status_oneOf).toContain(status);
  141 |     expect(status).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  142 | 
  143 |     if (status === HTTP_STATUS.OK) {
  144 |       const body = await resp.json() as { orderId?: number };
  145 |       if (body.orderId) {
  146 |         const orderResp = await api.getOrder(token, body.orderId);
  147 |         if (orderResp.ok()) {
  148 |           const order = await orderResp.json() as { total_amount?: number };
  149 |           expect(order.total_amount).not.toBe(tc.payload.total_amount);
  150 |           expect.soft(order.total_amount).toBe(tc.if_200_expected_total_in_db);
  151 |         }
  152 |       }
  153 |     }
  154 |   });
  155 | 
  156 |   // ──────────────────────────────────────────────────────────────────────────
  157 |   // TC-CHECKOUT-BVA-004: shipping_address rỗng, dưới mốc tham chiếu
  158 |   // ──────────────────────────────────────────────────────────────────────────
  159 |   test('TC-CHECKOUT-BVA-004: shipping_address rỗng, dưới mốc tham chiếu', async ({ request }) => {
  160 |     const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-004')!;
  161 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  162 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  163 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  164 | 
  165 |     const resp = await api.checkout(token, tc.payload);
  166 | 
  167 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  168 |     expect(tc.expected_status_oneOf).toContain(resp.status());
  169 |   });
  170 | 
  171 |   // ──────────────────────────────────────────────────────────────────────────
  172 |   // TC-CHECKOUT-BVA-005: shipping_address tại mốc tham chiếu
  173 |   // ──────────────────────────────────────────────────────────────────────────
  174 |   test('TC-CHECKOUT-BVA-005: shipping_address tại mốc tham chiếu', async ({ request }) => {
  175 |     const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-005')!;
  176 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  177 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  178 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  179 | 
  180 |     const resp = await api.checkout(token, tc.payload);
  181 | 
  182 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  183 |     expect(tc.expected_status_oneOf).toContain(resp.status());
  184 | 
  185 |     if (resp.status() === HTTP_STATUS.OK) {
  186 |       const body = await resp.json() as { orderId?: number };
  187 |       if (body.orderId) {
  188 |         const orderResp = await api.getOrder(token, body.orderId);
```