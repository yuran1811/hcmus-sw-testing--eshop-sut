# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: coupon-admin.spec.js >> Coupon Admin (FR-17) E2E Tests >> TC-COUPON-ADMIN-007: discount_value = số âm → bị từ chối
- Location: coupon-admin.spec.js:230:3

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 400
Received:    200
```

# Test source

```ts
  149 |     await loginAdmin(page);
  150 |     await navigateToCoupons(page);
  151 |
  152 |     // SAVE10 already exists in seed data
  153 |     await fillCouponForm(page, {
  154 |       code: 'SAVE10',
  155 |       type: 'percent',
  156 |       discount_value: 10,
  157 |       min_order_amount: 0,
  158 |       expired_at: '2099-12-31',
  159 |       max_uses_per_user: 1,
  160 |     });
  161 |
  162 |     page.on('dialog', dialog => dialog.dismiss());
  163 |     await page.click('button:has-text("Tạo mã")');
  164 |
  165 |     // Expect an alert containing "Lỗi"
  166 |     // We handle it above; after dismiss, verify the old SAVE10 row is still just 1
  167 |     await page.waitForTimeout(1000);
  168 |     const saveRows = page.locator('table tbody tr td.font-mono', { hasText: 'SAVE10' });
  169 |     // There should be exactly 1 row for SAVE10 (duplicate rejected)
  170 |     const count = await saveRows.count();
  171 |     expect(count).toBe(1);
  172 |   });
  173 |
  174 |   // ── TC-005: type = "voucher" (invalid) ───────────────────────────────────────
  175 |
  176 |   test('TC-COUPON-ADMIN-005: type = giá trị không hợp lệ ("voucher") → bị từ chối', async ({ page }) => {
  177 |     // The UI select only exposes "percent" and "fixed" – "voucher" cannot be selected via UI.
  178 |     // We test via direct API call to verify backend validation.
  179 |     const ctx = await request.newContext();
  180 |     const loginRes = await ctx.post(`${API_URL}/login`, {
  181 |       data: { email: 'admin@eshop.com', password: 'Admin123!' },
  182 |     });
  183 |     const { token } = await loginRes.json();
  184 |
  185 |     const res = await ctx.post(`${API_URL}/admin/coupons`, {
  186 |       headers: { Authorization: `Bearer ${token}` },
  187 |       data: {
  188 |         code: 'BADTYPE',
  189 |         type: 'voucher',
  190 |         discount_value: 10,
  191 |         min_order_amount: 0,
  192 |         expired_at: '2099-12-31',
  193 |         max_uses_per_user: 1,
  194 |       },
  195 |     });
  196 |
  197 |     // Expected: backend rejects invalid type. May return 400 or accepts it (bug).
  198 |     // PASS if status is 4xx; FAIL if 200 (bug: backend accepts unknown type)
  199 |     expect(res.status()).toBeGreaterThanOrEqual(400);
  200 |     await ctx.dispose();
  201 |   });
  202 |
  203 |   // ── TC-006: discount_value = 0 → bị từ chối (BVA OFF) ──────────────────────
  204 |
  205 |   test('TC-COUPON-ADMIN-006: discount_value = 0 → bị từ chối (BVA OFF discount_value)', async ({ page }) => {
  206 |     const ctx = await request.newContext();
  207 |     const loginRes = await ctx.post(`${API_URL}/login`, {
  208 |       data: { email: 'admin@eshop.com', password: 'Admin123!' },
  209 |     });
  210 |     const { token } = await loginRes.json();
  211 |
  212 |     const res = await ctx.post(`${API_URL}/admin/coupons`, {
  213 |       headers: { Authorization: `Bearer ${token}` },
  214 |       data: {
  215 |         code: 'ZERODV',
  216 |         type: 'percent',
  217 |         discount_value: 0,
  218 |         min_order_amount: 0,
  219 |         expired_at: '2099-12-31',
  220 |         max_uses_per_user: 1,
  221 |       },
  222 |     });
  223 |
  224 |     expect(res.status()).toBeGreaterThanOrEqual(400);
  225 |     await ctx.dispose();
  226 |   });
  227 |
  228 |   // ── TC-007: discount_value âm → bị từ chối ──────────────────────────────────
  229 |
  230 |   test('TC-COUPON-ADMIN-007: discount_value = số âm → bị từ chối', async ({ page }) => {
  231 |     const ctx = await request.newContext();
  232 |     const loginRes = await ctx.post(`${API_URL}/login`, {
  233 |       data: { email: 'admin@eshop.com', password: 'Admin123!' },
  234 |     });
  235 |     const { token } = await loginRes.json();
  236 |
  237 |     const res = await ctx.post(`${API_URL}/admin/coupons`, {
  238 |       headers: { Authorization: `Bearer ${token}` },
  239 |       data: {
  240 |         code: 'NEGDV',
  241 |         type: 'percent',
  242 |         discount_value: -10,
  243 |         min_order_amount: 0,
  244 |         expired_at: '2099-12-31',
  245 |         max_uses_per_user: 1,
  246 |       },
  247 |     });
  248 |
> 249 |     expect(res.status()).toBeGreaterThanOrEqual(400);
      |                          ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  250 |     await ctx.dispose();
  251 |   });
  252 |
  253 |   // ── TC-008: expired_at = rỗng → bị từ chối ──────────────────────────────────
  254 |
  255 |   test('TC-COUPON-ADMIN-008: expired_at = rỗng → bị từ chối', async ({ page }) => {
  256 |     await loginAdmin(page);
  257 |     await navigateToCoupons(page);
  258 |
  259 |     await fillCouponForm(page, {
  260 |       code: 'NOEXPIRY',
  261 |       type: 'percent',
  262 |       discount_value: 10,
  263 |       min_order_amount: 0,
  264 |       expired_at: '',       // leave date blank
  265 |       max_uses_per_user: 1,
  266 |     });
  267 |
  268 |     await page.click('button:has-text("Tạo mã")');
  269 |
  270 |     // Browser HTML5 required validation blocks submission
  271 |     await expect(page.locator('button:has-text("Tạo mã")')).toBeVisible();
  272 |     const noExpiryRow = page.locator('table tbody tr td.font-mono').filter({ hasText: 'NOEXPIRY' });
  273 |     await expect(noExpiryRow).not.toBeVisible({ timeout: 1000 });
  274 |   });
  275 |
  276 |   // ── TC-009: expired_at = định dạng ngày không hợp lệ → bị từ chối ──────────
  277 |
  278 |   test('TC-COUPON-ADMIN-009: expired_at = định dạng ngày không hợp lệ ("31-12-2099") → bị từ chối', async ({ page }) => {
  279 |     const ctx = await request.newContext();
  280 |     const loginRes = await ctx.post(`${API_URL}/login`, {
  281 |       data: { email: 'admin@eshop.com', password: 'Admin123!' },
  282 |     });
  283 |     const { token } = await loginRes.json();
  284 |
  285 |     const res = await ctx.post(`${API_URL}/admin/coupons`, {
  286 |       headers: { Authorization: `Bearer ${token}` },
  287 |       data: {
  288 |         code: 'BADDATE',
  289 |         type: 'percent',
  290 |         discount_value: 10,
  291 |         min_order_amount: 0,
  292 |         expired_at: '31-12-2099',
  293 |         max_uses_per_user: 1,
  294 |       },
  295 |     });
  296 |
  297 |     // Backend should reject or interpret incorrectly - expect 4xx
  298 |     expect(res.status()).toBeGreaterThanOrEqual(400);
  299 |     await ctx.dispose();
  300 |   });
  301 |
  302 |   // ── TC-010: min_order_amount âm → bị từ chối (BVA OFF) ─────────────────────
  303 |
  304 |   test('TC-COUPON-ADMIN-010: min_order_amount = số âm (-1) → bị từ chối (BVA OFF)', async ({ page }) => {
  305 |     const ctx = await request.newContext();
  306 |     const loginRes = await ctx.post(`${API_URL}/login`, {
  307 |       data: { email: 'admin@eshop.com', password: 'Admin123!' },
  308 |     });
  309 |     const { token } = await loginRes.json();
  310 |
  311 |     const res = await ctx.post(`${API_URL}/admin/coupons`, {
  312 |       headers: { Authorization: `Bearer ${token}` },
  313 |       data: {
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
```
