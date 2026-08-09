# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-api.spec.ts >> FR-08 Checkout — API Tests (Equivalence Partitioning) >> TC-CHECKOUT-004: Xử lý an toàn khi total_amount client gửi không khớp (giả mạo thấp hơn)
- Location: tests\checkout-api.spec.ts:153:7

# Error details

```
Error: expect(received).not.toBe(expected) // Object.is equality

Expected: not 1000
```

# Test source

```ts
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
  95  |     expect(cartItems).toHaveLength(0);
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
> 172 |           expect(order.total_amount).not.toBe(tc.must_not_persist_total);
      |                                          ^ Error: expect(received).not.toBe(expected) // Object.is equality
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
  196 |     if (body.orderId) {
  197 |       const orderResp = await api.getOrder(token, body.orderId);
  198 |       if (orderResp.ok()) {
  199 |         const order = await orderResp.json() as { shipping_address?: string; status?: string };
  200 |         expect.soft(order.shipping_address).toBe(tc.expected_address_in_order);
  201 |       }
  202 |     }
  203 | 
  204 |     const cartResp = await api.getCart(token);
  205 |     const cartItems = await cartResp.json() as unknown[];
  206 |     expect(cartItems).toHaveLength(0);
  207 |   });
  208 | 
  209 |   // ──────────────────────────────────────────────────────────────────────────
  210 |   // TC-CHECKOUT-006: Địa chỉ Unicode / tiếng Việt
  211 |   // ──────────────────────────────────────────────────────────────────────────
  212 |   test('TC-CHECKOUT-006: Địa chỉ Unicode và tiếng Việt được lưu không mất mã hóa', async ({ request }) => {
  213 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-006')!;
  214 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  215 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  216 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  217 | 
  218 |     const resp = await api.checkout(token, tc.payload);
  219 | 
  220 |     expect(resp.status()).toBe(tc.expected_status);
  221 | 
  222 |     const body = await resp.json() as { orderId?: number };
  223 |     if (body.orderId) {
  224 |       const orderResp = await api.getOrder(token, body.orderId);
  225 |       if (orderResp.ok()) {
  226 |         const order = await orderResp.json() as { shipping_address?: string };
  227 |         expect.soft(order.shipping_address).toBe(tc.expected_address_in_order);
  228 |       }
  229 |     }
  230 |   });
  231 | 
  232 |   // ──────────────────────────────────────────────────────────────────────────
  233 |   // TC-CHECKOUT-007: XSS payload trong địa chỉ
  234 |   // ──────────────────────────────────────────────────────────────────────────
  235 |   test('TC-CHECKOUT-007: Địa chỉ chứa HTML/XSS — không thực thi script', async ({ request }) => {
  236 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-007')!;
  237 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  238 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  239 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  240 | 
  241 |     const resp = await api.checkout(token, tc.payload);
  242 | 
  243 |     const status = resp.status();
  244 |     expect(tc.expected_status_oneOf).toContain(status);
  245 |     expect(status).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  246 | 
  247 |     if (status === HTTP_STATUS.OK) {
  248 |       const body = await resp.json() as { orderId?: number };
  249 |       if (body.orderId) {
  250 |         const orderResp = await api.getOrder(token, body.orderId);
  251 |         if (orderResp.ok()) {
  252 |           const order = await orderResp.json() as { shipping_address?: string };
  253 |           expect.soft(typeof order.shipping_address).toBe('string');
  254 |         }
  255 |       }
  256 |     }
  257 |   });
  258 | 
  259 |   // ──────────────────────────────────────────────────────────────────────────
  260 |   // TC-CHECKOUT-008: Omitted / null shipping_address (specification gap)
  261 |   // ──────────────────────────────────────────────────────────────────────────
  262 |   test('TC-CHECKOUT-008A: Hành vi khi shipping_address bị bỏ qua (omitted)', async ({ request }) => {
  263 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-008A')!;
  264 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  265 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  266 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  267 | 
  268 |     const resp = await api.checkout(token, tc.payload);
  269 | 
  270 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  271 |     expect.soft(tc.expected_status_oneOf).toContain(resp.status());
  272 |   });
```