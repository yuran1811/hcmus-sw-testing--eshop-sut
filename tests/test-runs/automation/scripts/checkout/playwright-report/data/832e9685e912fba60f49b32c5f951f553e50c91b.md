# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-api.spec.ts >> FR-08 Checkout — API Tests (Equivalence Partitioning) >> TC-CHECKOUT-005: Thanh toán thành công với địa chỉ giao hàng thông thường
- Location: tests\checkout-api.spec.ts:185:7

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 0
Received length: 6
Received array:  [{"id": 4, "name": "Tai nghe AirPods Pro 2", "price": 6000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 4, "name": "Tai nghe AirPods Pro 2", "price": 6000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}, {"id": 4, "name": "Tai nghe AirPods Pro 2", "price": 6000000, "quantity": 1}, {"id": 5, "name": "Bàn phím cơ Keychron Q1", "price": 4000000, "quantity": 1}]
```

# Test source

```ts
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
> 206 |     expect(cartItems).toHaveLength(0);
      |                       ^ Error: expect(received).toHaveLength(expected)
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
  273 | 
  274 |   test('TC-CHECKOUT-008B: Hành vi khi shipping_address là JSON null', async ({ request }) => {
  275 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-008B')!;
  276 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  277 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  278 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  279 | 
  280 |     const resp = await api.checkout(token, tc.payload);
  281 | 
  282 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  283 |     expect.soft(tc.expected_status_oneOf).toContain(resp.status());
  284 |   });
  285 | 
  286 |   // ──────────────────────────────────────────────────────────────────────────
  287 |   // TC-CHECKOUT-009: Địa chỉ chỉ chứa khoảng trắng
  288 |   // ──────────────────────────────────────────────────────────────────────────
  289 |   test('TC-CHECKOUT-009: Địa chỉ chỉ chứa khoảng trắng — không crash, không tạo state dở dang', async ({ request }) => {
  290 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-009')!;
  291 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  292 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  293 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  294 | 
  295 |     const resp = await api.checkout(token, tc.payload);
  296 | 
  297 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  298 |     expect.soft(tc.expected_status_oneOf).toContain(resp.status());
  299 |   });
  300 | 
  301 |   // ──────────────────────────────────────────────────────────────────────────
  302 |   // TC-CHECKOUT-010: Non-string shipping_address types
  303 |   // ──────────────────────────────────────────────────────────────────────────
  304 |   for (const variant of testData.tc_type_variants) {
  305 |     test(`${variant.tc_id}: ${variant.description}`, async ({ request }) => {
  306 |       const api = new CheckoutAPIHelper(request, BASE_URL);
```