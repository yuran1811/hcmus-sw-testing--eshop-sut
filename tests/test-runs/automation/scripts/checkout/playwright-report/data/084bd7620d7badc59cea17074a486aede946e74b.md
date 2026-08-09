# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-api.spec.ts >> FR-08 Checkout — API Tests (Equivalence Partitioning) >> TC-CHECKOUT-013: Backend tự tính total_amount khi client không gửi
- Location: tests\checkout-api.spec.ts:333:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Matcher error: received value must be a number or bigint

Received has value: null
```

# Test source

```ts
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
  307 |       const token = await ensureUserAndLogin(api, testData.users.userA);
  308 |       await prepareCart(api, token, variant.cart_items as CartItem[]);
  309 | 
  310 |       const resp = await api.checkout(token, variant.payload);
  311 | 
  312 |       expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  313 |       expect.soft(variant.expected_status_oneOf).toContain(resp.status());
  314 | 
  315 |       if (resp.status() === HTTP_STATUS.OK) {
  316 |         const body = await resp.json() as { orderId?: number };
  317 |         if (body.orderId) {
  318 |           const orderResp = await api.getOrder(token, body.orderId);
  319 |           if (orderResp.ok()) {
  320 |             const order = await orderResp.json() as { shipping_address?: string };
  321 |             if (variant.must_not_persist_object_string) {
  322 |               expect.soft(order.shipping_address).not.toBe(variant.must_not_persist_object_string);
  323 |             }
  324 |           }
  325 |         }
  326 |       }
  327 |     });
  328 |   }
  329 | 
  330 |   // ──────────────────────────────────────────────────────────────────────────
  331 |   // TC-CHECKOUT-013: Backend tự tính tổng khi client không gửi total_amount
  332 |   // ──────────────────────────────────────────────────────────────────────────
  333 |   test('TC-CHECKOUT-013: Backend tự tính total_amount khi client không gửi', async ({ request }) => {
  334 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-013')!;
  335 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  336 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  337 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  338 | 
  339 |     const resp = await api.checkout(token, tc.payload);
  340 | 
  341 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  342 | 
  343 |     if (resp.status() === HTTP_STATUS.OK) {
  344 |       const body = await resp.json() as { orderId?: number };
  345 |       if (body.orderId) {
  346 |         const orderResp = await api.getOrder(token, body.orderId);
  347 |         if (orderResp.ok()) {
  348 |           const order = await orderResp.json() as { total_amount?: number; status?: string };
> 349 |           expect.soft(order.total_amount).toBeGreaterThan(0);
      |                                           ^ Error: expect(received).toBeGreaterThan(expected)
  350 |           expect.soft(order.status).toBe('pending');
  351 |         }
  352 |       }
  353 |     }
  354 |   });
  355 | 
  356 |   // ──────────────────────────────────────────────────────────────────────────
  357 |   // TC-CHECKOUT-014: Backend không tin payload items giả mạo từ client
  358 |   // ──────────────────────────────────────────────────────────────────────────
  359 |   test('TC-CHECKOUT-014: Backend không dùng items/giá giả mạo từ client payload', async ({ request }) => {
  360 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-014')!;
  361 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  362 |     const token = await ensureUserAndLogin(api, testData.users.userA);
  363 |     await prepareCart(api, token, tc.cart_items as CartItem[]);
  364 | 
  365 |     const orderCountBefore = await api.getOrderCount(token);
  366 | 
  367 |     const resp = await api.checkout(token, tc.forged_payload);
  368 | 
  369 |     expect(resp.status()).not.toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
  370 | 
  371 |     if (resp.status() === HTTP_STATUS.OK) {
  372 |       const body = await resp.json() as { orderId?: number };
  373 |       if (body.orderId) {
  374 |         const orderResp = await api.getOrder(token, body.orderId);
  375 |         if (orderResp.ok()) {
  376 |           const order = await orderResp.json() as { total_amount?: number };
  377 |           expect(order.total_amount).not.toBe(tc.must_not_persist_total);
  378 |           expect.soft(order.total_amount).toBe(tc.if_200_expected_total_in_db);
  379 |         }
  380 |       }
  381 |     } else {
  382 |       const orderCountAfter = await api.getOrderCount(token);
  383 |       expect.soft(orderCountAfter).toBe(orderCountBefore);
  384 |     }
  385 |   });
  386 | 
  387 |   // ──────────────────────────────────────────────────────────────────────────
  388 |   // TC-CHECKOUT-015: Checkout chỉ xóa giỏ của đúng người dùng thực hiện
  389 |   // ──────────────────────────────────────────────────────────────────────────
  390 |   test('TC-CHECKOUT-015: Checkout chỉ xóa giỏ của user A, không ảnh hưởng user B', async ({ request }) => {
  391 |     const api = new CheckoutAPIHelper(request, BASE_URL);
  392 |     const tc = testData.tc_api.find(c => c.tc_id === 'TC-CHECKOUT-015')!;
  393 | 
  394 |     const tokenA = await ensureUserAndLogin(api, testData.users.userA);
  395 |     await prepareCart(api, tokenA, tc.user_a_cart_items as CartItem[]);
  396 | 
  397 |     const tokenB = await ensureUserAndLogin(api, testData.users.userB);
  398 |     await prepareCart(api, tokenB, tc.user_b_cart_items as CartItem[]);
  399 | 
  400 |     const cartBefore = await api.getCart(tokenB);
  401 |     const cartBItems = await cartBefore.json() as unknown[];
  402 |     const cartBCountBefore = cartBItems.length;
  403 | 
  404 |     const respA = await api.checkout(tokenA, {
  405 |       total_amount: tc.payload.total_amount,
  406 |       shipping_address: tc.payload.shipping_address,
  407 |     });
  408 | 
  409 |     expect(respA.status()).toBe(HTTP_STATUS.OK);
  410 | 
  411 |     const cartARespAfter = await api.getCart(tokenA);
  412 |     const cartAItems = await cartARespAfter.json() as unknown[];
  413 |     expect(cartAItems).toHaveLength(0);
  414 | 
  415 |     const cartBRespAfter = await api.getCart(tokenB);
  416 |     const cartBItemsAfter = await cartBRespAfter.json() as unknown[];
  417 |     expect(cartBItemsAfter).toHaveLength(cartBCountBefore);
  418 | 
  419 |     const ordersB = await api.getMyOrders(tokenB);
  420 |     if (ordersB.ok()) {
  421 |       const ordersBBody = await ordersB.json() as Array<{ user_id?: number }>;
  422 |       const newOrdersForB = ordersBBody.filter((o) => o.user_id !== undefined);
  423 |       expect.soft(newOrdersForB.length).toBeGreaterThanOrEqual(0);
  424 |     }
  425 |   });
  426 | });
  427 | 
```