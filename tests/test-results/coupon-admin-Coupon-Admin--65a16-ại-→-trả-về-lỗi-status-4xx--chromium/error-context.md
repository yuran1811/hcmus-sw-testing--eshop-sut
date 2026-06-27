# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: coupon-admin.spec.js >> Coupon Admin (FR-17) E2E Tests >> TC-COUPON-ADMIN-014: Xóa coupon theo ID không tồn tại → trả về lỗi (status 4xx)
- Location: coupon-admin.spec.js:402:3

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 400
Received:    200
```

# Test source

```ts
  314 |         code: 'NEGMIN',
  315 |         type: 'percent',
  316 |         discount_value: 10,
  317 |         min_order_amount: -1,
  318 |         expired_at: '2099-12-31',
  319 |         max_uses_per_user: 1,
  320 |       },
  321 |     });
  322 |
  323 |     expect(res.status()).toBeGreaterThanOrEqual(400);
  324 |     await ctx.dispose();
  325 |   });
  326 |
  327 |   // ── TC-011: max_uses_per_user = 0 → bị từ chối (BVA OFF) ──────────────────
  328 |
  329 |   test('TC-COUPON-ADMIN-011: max_uses_per_user = 0 → bị từ chối (BVA OFF)', async ({ page }) => {
  330 |     const ctx = await request.newContext();
  331 |     const loginRes = await ctx.post(`${API_URL}/login`, {
  332 |       data: { email: 'admin@eshop.com', password: 'Admin123!' },
  333 |     });
  334 |     const { token } = await loginRes.json();
  335 |
  336 |     const res = await ctx.post(`${API_URL}/admin/coupons`, {
  337 |       headers: { Authorization: `Bearer ${token}` },
  338 |       data: {
  339 |         code: 'ZEROMAX',
  340 |         type: 'percent',
  341 |         discount_value: 10,
  342 |         min_order_amount: 0,
  343 |         expired_at: '2099-12-31',
  344 |         max_uses_per_user: 0,
  345 |       },
  346 |     });
  347 |
  348 |     expect(res.status()).toBeGreaterThanOrEqual(400);
  349 |     await ctx.dispose();
  350 |   });
  351 |
  352 |   // ── TC-012: max_uses_per_user âm → bị từ chối ───────────────────────────────
  353 |
  354 |   test('TC-COUPON-ADMIN-012: max_uses_per_user = số âm → bị từ chối', async ({ page }) => {
  355 |     const ctx = await request.newContext();
  356 |     const loginRes = await ctx.post(`${API_URL}/login`, {
  357 |       data: { email: 'admin@eshop.com', password: 'Admin123!' },
  358 |     });
  359 |     const { token } = await loginRes.json();
  360 |
  361 |     const res = await ctx.post(`${API_URL}/admin/coupons`, {
  362 |       headers: { Authorization: `Bearer ${token}` },
  363 |       data: {
  364 |         code: 'NEGMAX',
  365 |         type: 'percent',
  366 |         discount_value: 10,
  367 |         min_order_amount: 0,
  368 |         expired_at: '2099-12-31',
  369 |         max_uses_per_user: -1,
  370 |       },
  371 |     });
  372 |
  373 |     expect(res.status()).toBeGreaterThanOrEqual(400);
  374 |     await ctx.dispose();
  375 |   });
  376 |
  377 |   // ── TC-013: Xóa coupon hợp lệ ───────────────────────────────────────────────
  378 |
  379 |   test('TC-COUPON-ADMIN-013: Xóa coupon theo ID hợp lệ → xóa thành công', async ({ page }) => {
  380 |     // Seed a coupon to delete
  381 |     await runQuery(`INSERT OR REPLACE INTO coupons (code, type, discount_value, min_order_amount, expired_at, is_active, max_uses_per_user)
  382 |       VALUES ('DELETEME', 'percent', 10, 0, '2099-12-31', 1, 1)`);
  383 |
  384 |     await loginAdmin(page);
  385 |     await navigateToCoupons(page);
  386 |
  387 |     // Verify it appears in the table first
  388 |     const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'DELETEME' });
  389 |     await expect(row).toBeVisible({ timeout: 5000 });
  390 |
  391 |     // Click the delete button in that row
  392 |     const deleteBtn = page.locator('table tbody tr', { has: page.locator('td.font-mono:has-text("DELETEME")') })
  393 |       .locator('button:has-text("Xóa")');
  394 |     await deleteBtn.click();
  395 |
  396 |     // Wait for list to reload; row should be gone
  397 |     await expect(row).not.toBeVisible({ timeout: 5000 });
  398 |   });
  399 |
  400 |   // ── TC-014: Xóa coupon ID không tồn tại → lỗi 4xx ──────────────────────────
  401 |
  402 |   test('TC-COUPON-ADMIN-014: Xóa coupon theo ID không tồn tại → trả về lỗi (status 4xx)', async () => {
  403 |     const ctx = await request.newContext();
  404 |     const loginRes = await ctx.post(`${API_URL}/login`, {
  405 |       data: { email: 'admin@eshop.com', password: 'Admin123!' },
  406 |     });
  407 |     const { token } = await loginRes.json();
  408 |
  409 |     const res = await ctx.delete(`${API_URL}/admin/coupons/999999`, {
  410 |       headers: { Authorization: `Bearer ${token}` },
  411 |     });
  412 |
  413 |     // Expected: 404 or 400. Bug if 200.
> 414 |     expect(res.status()).toBeGreaterThanOrEqual(400);
      |                          ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  415 |     await ctx.dispose();
  416 |   });
  417 |
  418 |   // ── TC-015: GET /api/coupons → trả về đầy đủ các trường ─────────────────────
  419 |
  420 |   test('TC-COUPON-ADMIN-015: Admin lấy danh sách coupon → trả về đầy đủ các trường', async () => {
  421 |     const ctx = await request.newContext();
  422 |     const loginRes = await ctx.post(`${API_URL}/login`, {
  423 |       data: { email: 'admin@eshop.com', password: 'Admin123!' },
  424 |     });
  425 |     const { token } = await loginRes.json();
  426 |
  427 |     const res = await ctx.get(`${API_URL}/coupons`, {
  428 |       headers: { Authorization: `Bearer ${token}` },
  429 |     });
  430 |
  431 |     expect(res.ok()).toBeTruthy();
  432 |     const data = await res.json();
  433 |     expect(Array.isArray(data)).toBe(true);
  434 |     expect(data.length).toBeGreaterThan(0);
  435 |
  436 |     const first = data[0];
  437 |     expect(first).toHaveProperty('id');
  438 |     expect(first).toHaveProperty('code');
  439 |     expect(first).toHaveProperty('type');
  440 |     expect(first).toHaveProperty('discount_value');
  441 |     expect(first).toHaveProperty('min_order_amount');
  442 |     expect(first).toHaveProperty('expired_at');
  443 |     expect(first).toHaveProperty('max_uses_per_user');
  444 |
  445 |     await ctx.dispose();
  446 |   });
  447 |
  448 |   // ── TC-016: Chưa đăng nhập → 401 ────────────────────────────────────────────
  449 |
  450 |   test('TC-COUPON-ADMIN-016: Chưa đăng nhập (không có JWT) → 401 Unauthorized', async () => {
  451 |     const ctx = await request.newContext();
  452 |
  453 |     const res = await ctx.post(`${API_URL}/admin/coupons`, {
  454 |       data: {
  455 |         code: 'NOAUTH',
  456 |         type: 'percent',
  457 |         discount_value: 10,
  458 |         min_order_amount: 100000,
  459 |         expired_at: '2099-12-31',
  460 |         max_uses_per_user: 1,
  461 |       },
  462 |     });
  463 |
  464 |     expect(res.status()).toBe(401);
  465 |     await ctx.dispose();
  466 |   });
  467 |
  468 |   // ── TC-017: role = user → 403 Forbidden ─────────────────────────────────────
  469 |
  470 |   test('TC-COUPON-ADMIN-017: Đăng nhập với role = user (non-admin) → 403 Forbidden', async () => {
  471 |     const ctx = await request.newContext();
  472 |     const loginRes = await ctx.post(`${API_URL}/login`, {
  473 |       data: { email: 'test@eshop.com', password: 'Test1234!' },
  474 |     });
  475 |     const { token } = await loginRes.json();
  476 |
  477 |     const res = await ctx.post(`${API_URL}/admin/coupons`, {
  478 |       headers: { Authorization: `Bearer ${token}` },
  479 |       data: {
  480 |         code: 'TESTROLE',
  481 |         type: 'percent',
  482 |         discount_value: 10,
  483 |         min_order_amount: 0,
  484 |         expired_at: '2099-12-31',
  485 |         max_uses_per_user: 1,
  486 |       },
  487 |     });
  488 |
  489 |     expect(res.status()).toBe(403);
  490 |     await ctx.dispose();
  491 |   });
  492 |
  493 |   // ── TC-018: discount_value = 1 (BVA ON) → chấp nhận ───────────────────────
  494 |
  495 |   test('TC-COUPON-ADMIN-018: discount_value = 1 (ON, đúng min > 0) → được chấp nhận', async ({ page }) => {
  496 |     await loginAdmin(page);
  497 |     await navigateToCoupons(page);
  498 |
  499 |     await fillCouponForm(page, {
  500 |       code: 'DVON',
  501 |       type: 'percent',
  502 |       discount_value: 1,
  503 |       min_order_amount: 0,
  504 |       expired_at: '2099-12-31',
  505 |       max_uses_per_user: 1,
  506 |     });
  507 |
  508 |     await page.click('button:has-text("Tạo mã")');
  509 |     const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'DVON' });
  510 |     await expect(row).toBeVisible({ timeout: 5000 });
  511 |     // Cleanup
  512 |     await runQuery("DELETE FROM coupons WHERE code = 'DVON'");
  513 |   });
  514 |
```
