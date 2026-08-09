# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-bva.spec.ts >> FR-08 Checkout — BVA Tests (Boundary Value Analysis) >> TC-CHECKOUT-BVA-003: total_amount cao hơn giá trị hệ thống tính
- Location: tests\checkout-bva.spec.ts:131:7

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not 10000001
```

# Test source

```ts
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
  88  |     expect(cartItems).toHaveLength(0);
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
> 149 |           expect(order.total_amount).not.toBe(tc.payload.total_amount);
      |                                          ^ Error: expect(received).not.toBe(expected) // Object.is equality
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
  189 |         if (orderResp.ok()) {
  190 |           const order = await orderResp.json() as { shipping_address?: string };
  191 |           expect.soft(order.shipping_address).toBe(tc.payload.shipping_address);
  192 |         }
  193 |       }
  194 |     }
  195 |   });
  196 | 
  197 |   // ──────────────────────────────────────────────────────────────────────────
  198 |   // TC-CHECKOUT-BVA-006: shipping_address trên mốc tham chiếu
  199 |   // ──────────────────────────────────────────────────────────────────────────
  200 |   test('TC-CHECKOUT-BVA-006: shipping_address trên mốc tham chiếu', async ({ request }) => {
  201 |     const tc = testData.tc_bva.find(c => c.tc_id === 'TC-CHECKOUT-BVA-006')!;
  202 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  203 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  204 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  205 | 
  206 |     const resp = await api.checkout(token, tc.payload);
  207 | 
  208 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  209 |     expect(tc.expected_status_oneOf).toContain(resp.status());
  210 | 
  211 |     if (resp.status() === HTTP_STATUS.OK) {
  212 |       const body = await resp.json() as { orderId?: number };
  213 |       if (body.orderId) {
  214 |         const orderResp = await api.getOrder(token, body.orderId);
  215 |         if (orderResp.ok()) {
  216 |           const order = await orderResp.json() as { shipping_address?: string };
  217 |           expect.soft(order.shipping_address).toBe(tc.payload.shipping_address);
  218 |         }
  219 |       }
  220 |     }
  221 |   });
  222 | 
  223 |   // ──────────────────────────────────────────────────────────────────────────
  224 |   // TC-CHECKOUT-BVA-007: shipping_address tại vùng biên độ bền
  225 |   // ──────────────────────────────────────────────────────────────────────────
  226 |   const robustnessRef = testData.meta.robustness_ref;
  227 |   const robustnessIterations = [
  228 |     { id: 'A', label: 'Dưới mốc', len: robustnessRef - 1 },
  229 |     { id: 'B', label: 'Tại mốc', len: robustnessRef },
  230 |     { id: 'C', label: 'Trên mốc', len: robustnessRef + 1 },
  231 |   ] as const;
  232 | 
  233 |   for (const iter of robustnessIterations) {
  234 |     test(`TC-CHECKOUT-BVA-007${iter.id}: shipping_address ${iter.label} ký tự — không crash, không silent truncation`, async ({ request }) => {
  235 |       const api = new CheckoutAPIHelper(request, BASE_URL);
  236 |       const token = await ensureUserAndLogin(api, testData.users.userA);
  237 |       await prepareCart(api, token, [testData.products.keychron]);
  238 | 
  239 |       const longAddress = 'A'.repeat(iter.len);
  240 |       expect(longAddress.length).toBe(iter.len);
  241 | 
  242 |       const resp = await api.checkout(token, {
  243 |         total_amount: testData.products.keychron.price,
  244 |         shipping_address: longAddress,
  245 |       });
  246 | 
  247 |       expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  248 |       expect([HTTP_STATUS.OK, HTTP_STATUS.BAD_REQUEST]).toContain(resp.status());
  249 | 
```