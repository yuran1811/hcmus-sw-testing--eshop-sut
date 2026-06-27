# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: coupon.spec.js >> Coupon (FR-09) E2E Tests >> TC-COUPON-010: VIP100 lần dùng thứ 2 (max_uses=2, usage=1) -> vẫn được chấp nhận
- Location: coupon.spec.js:175:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=Áp dụng thành công! Giảm 100.000 ₫')
Expected: visible
Timeout: 3000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 3000ms
  - waiting for locator('text=Áp dụng thành công! Giảm 100.000 ₫')

```

```yaml
- banner:
    - link "EShop":
        - /url: /
    - navigation:
        - link "Giỏ hàng":
            - /url: /cart
        - link "Chào, Test User":
            - /url: /profile
        - button "Thoát"
- main:
    - heading "Xác Nhận Đơn Hàng" [level=2]
    - heading "Sản phẩm:" [level=3]
    - list
    - text: 'Tổng tiền thanh toán (VND):'
    - spinbutton: '400000'
    - text: Mã Giảm Giá
    - textbox "Nhập mã giảm giá...": VIP100
    - button "Áp dụng"
    - paragraph: ✅ Áp dụng thành công! Giảm 100,000 ₫
    - paragraph:
        - text: 'Tiết kiệm:'
        - strong: 100,000 ₫
    - paragraph:
        - text: 'Thành tiền:'
        - strong: 300,000 ₫
    - text: 'Tổng thanh toán: 300,000 ₫'
    - button "Xác Nhận Thanh Toán"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  84  |     await expect(resultDiv).toContainText('Thành tiền: 360.000 ₫');
  85  |
  86  |     const finalTotal = page.locator('text=Tổng thanh toán: 360.000 ₫');
  87  |     await expect(finalTotal).toBeVisible();
  88  |   });
  89  |
  90  |   test('TC-COUPON-002: Áp dụng mã BIGBUY (fixed) hợp lệ', async ({ page }) => {
  91  |     await loginUser(page);
  92  |     // 500,000 is exactly equal to min_order_amount (500k)
  93  |     await applyCouponAtCheckout(page, 500000, 'BIGBUY');
  94  |
  95  |     // Expected to PASS, but will FAIL because backend uses strictly greater than check (total > min)
  96  |     const successMsg = page.locator('text=Áp dụng thành công! Giảm 50.000 ₫');
  97  |     await expect(successMsg).toBeVisible();
  98  |
  99  |     const resultDiv = page.locator('div.text-green-700');
  100 |     await expect(resultDiv).toContainText('Tiết kiệm: 50.000 ₫');
  101 |     await expect(resultDiv).toContainText('Thành tiền: 450.000 ₫');
  102 |   });
  103 |
  104 |   test('TC-COUPON-003: Mã không tồn tại trong DB -> trả về lỗi phù hợp', async ({ page }) => {
  105 |     await loginUser(page);
  106 |     await applyCouponAtCheckout(page, 400000, 'NOTEXIST');
  107 |
  108 |     // Expected to show not found error (Expected to PASS)
  109 |     const errMsg = page.locator('text=Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa');
  110 |     await expect(errMsg).toBeVisible();
  111 |   });
  112 |
  113 |   test('TC-COUPON-004: Mã bị vô hiệu hóa (INACTIVE, is_active=0) -> trả về lỗi', async ({ page }) => {
  114 |     await loginUser(page);
  115 |     await applyCouponAtCheckout(page, 400000, 'INACTIVE');
  116 |
  117 |     // Expected to show not found / inactive error (Expected to PASS)
  118 |     const errMsg = page.locator('text=Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa');
  119 |     await expect(errMsg).toBeVisible();
  120 |   });
  121 |
  122 |   test('TC-COUPON-005: Mã đã hết hạn (EXPIRED) -> trả về lỗi', async ({ page }) => {
  123 |     await loginUser(page);
  124 |     await applyCouponAtCheckout(page, 400000, 'EXPIRED');
  125 |
  126 |     // Expected to show expired error (Expected to PASS)
  127 |     const errMsg = page.locator('text=Mã giảm giá đã hết hạn');
  128 |     await expect(errMsg).toBeVisible();
  129 |   });
  130 |
  131 |   test('TC-COUPON-006: SAVE10, total_amount = 299,999 < min_order_amount (300,000) -> bị từ chối', async ({ page }) => {
  132 |     await loginUser(page);
  133 |     await applyCouponAtCheckout(page, 299999, 'SAVE10');
  134 |
  135 |     // Expected to show under threshold error. This will FAIL because actual app renders with comma: "300,000 ₫"
  136 |     const errMsg = page.locator('text=Đơn hàng chưa đủ giá trị tối thiểu 300.000 ₫ để áp dụng mã này');
  137 |     await expect(errMsg).toBeVisible();
  138 |   });
  139 |
  140 |   test('TC-COUPON-007: SAVE10, total_amount = 0 -> bị từ chối', async ({ page }) => {
  141 |     await loginUser(page);
  142 |     await applyCouponAtCheckout(page, 0, 'SAVE10');
  143 |
  144 |     // Expected to show under threshold error. This will FAIL because actual app renders with comma: "300,000 ₫"
  145 |     const errMsg = page.locator('text=Đơn hàng chưa đủ giá trị tối thiểu 300.000 ₫ để áp dụng mã này');
  146 |     await expect(errMsg).toBeVisible();
  147 |   });
  148 |
  149 |   test('TC-COUPON-008: Chưa đăng nhập hệ thống -> trả về lỗi xác thực', async ({ page }) => {
  150 |     // Clear user token
  151 |     await page.goto('/');
  152 |     await page.evaluate(() => localStorage.removeItem('token'));
  153 |     await page.reload();
  154 |
  155 |     await applyCouponAtCheckout(page, 400000, 'SAVE10');
  156 |
  157 |     // Expected: coupon is rejected for guests.
  158 |     // This will FAIL because the unauthenticated guest successfully applies the coupon and resultDiv becomes visible.
  159 |     const resultDiv = page.locator('div.text-green-700');
  160 |     await expect(resultDiv).not.toBeVisible({ timeout: 1000 });
  161 |   });
  162 |
  163 |   test('TC-COUPON-009: SAVE10 dùng lần thứ 2 (vượt max_uses_per_user = 1) -> bị từ chối', async ({ page }) => {
  164 |     // Seed 1 usage of SAVE10 (coupon id = 1) for user id = 2
  165 |     await runQuery("INSERT INTO coupon_usage (id, coupon_id, user_id) VALUES (100, 1, 2)");
  166 |
  167 |     await loginUser(page);
  168 |     await applyCouponAtCheckout(page, 400000, 'SAVE10');
  169 |
  170 |     // Expected: limit reached error (Expected to PASS)
  171 |     const errMsg = page.locator('text=Bạn đã sử dụng mã này 1 lần (đã đạt giới hạn)');
  172 |     await expect(errMsg).toBeVisible();
  173 |   });
  174 |
  175 |   test('TC-COUPON-010: VIP100 lần dùng thứ 2 (max_uses=2, usage=1) -> vẫn được chấp nhận', async ({ page }) => {
  176 |     // Seed 1 usage of VIP100 (coupon id = 3) for user id = 2
  177 |     await runQuery("INSERT INTO coupon_usage (id, coupon_id, user_id) VALUES (101, 3, 2)");
  178 |
  179 |     await loginUser(page);
  180 |     await applyCouponAtCheckout(page, 400000, 'VIP100');
  181 |
  182 |     // Expected: accepted. This will FAIL because actual app renders with comma: "100,000 ₫" and "300,000 ₫"
  183 |     const successMsg = page.locator('text=Áp dụng thành công! Giảm 100.000 ₫');
> 184 |     await expect(successMsg).toBeVisible();
      |                              ^ Error: expect(locator).toBeVisible() failed
  185 |
  186 |     const resultDiv = page.locator('div.text-green-700');
  187 |     await expect(resultDiv).toContainText('Tiết kiệm: 100.000 ₫');
  188 |     await expect(resultDiv).toContainText('Thành tiền: 300.000 ₫');
  189 |   });
  190 |
  191 |   test('TC-COUPON-011: VIP100 lần dùng thứ 3 (đã đạt max_uses=2) -> bị từ chối', async ({ page }) => {
  192 |     // Seed 2 usages of VIP100 (coupon id = 3) for user id = 2
  193 |     await runQuery("INSERT INTO coupon_usage (id, coupon_id, user_id) VALUES (102, 3, 2), (103, 3, 2)");
  194 |
  195 |     await loginUser(page);
  196 |     await applyCouponAtCheckout(page, 400000, 'VIP100');
  197 |
  198 |     // Expected: limit reached error (Expected to PASS)
  199 |     const errMsg = page.locator('text=Bạn đã sử dụng mã này 2 lần (đã đạt giới hạn)');
  200 |     await expect(errMsg).toBeVisible();
  201 |   });
  202 |
  203 |   test('TC-COUPON-012: SAVE10, total = 300,000 (ON, đúng ngưỡng min = 300,000) -> được chấp nhận', async ({ page }) => {
  204 |     await loginUser(page);
  205 |     await applyCouponAtCheckout(page, 300000, 'SAVE10');
  206 |
  207 |     // Expected: accepted.
  208 |     // Will FAIL because of strictly greater than check (300k is not > 300k)
  209 |     const successMsg = page.locator('text=Áp dụng thành công! Giảm 10%');
  210 |     await expect(successMsg).toBeVisible();
  211 |   });
  212 |
  213 |   test('TC-COUPON-013: SAVE10, total = 300,001 (IN, vừa trên ngưỡng SAVE10) -> được chấp nhận', async ({ page }) => {
  214 |     await loginUser(page);
  215 |     await applyCouponAtCheckout(page, 300001, 'SAVE10');
  216 |
  217 |     // Expected: accepted and math displays correctly.
  218 |     // This will FAIL because of the backend formula bug (1 - 10 = -9)
  219 |     const successMsg = page.locator('text=Áp dụng thành công! Giảm 10%');
  220 |     await expect(successMsg).toBeVisible();
  221 |
  222 |     const resultDiv = page.locator('div.text-green-700');
  223 |     await expect(resultDiv).toContainText('Tiết kiệm: 30.000 ₫');
  224 |     await expect(resultDiv).toContainText('Thành tiền: 270.001 ₫');
  225 |   });
  226 |
  227 |   test('TC-COUPON-014: BIGBUY, total = 499,999 (OFF, dưới ngưỡng min = 500,000) -> bị từ chối', async ({ page }) => {
  228 |     await loginUser(page);
  229 |     await applyCouponAtCheckout(page, 499999, 'BIGBUY');
  230 |
  231 |     // Expected: rejected. This will FAIL because actual app renders with comma: "500,000 ₫"
  232 |     const errMsg = page.locator('text=Đơn hàng chưa đủ giá trị tối thiểu 500.000 ₫ để áp dụng mã này');
  233 |     await expect(errMsg).toBeVisible();
  234 |   });
  235 |
  236 |   test('TC-COUPON-015: BIGBUY, total = 500,001 (IN, vừa trên ngưỡng BIGBUY) -> được chấp nhận', async ({ page }) => {
  237 |     await loginUser(page);
  238 |     await applyCouponAtCheckout(page, 500001, 'BIGBUY');
  239 |
  240 |     // Expected: accepted. This will FAIL because actual app renders with comma: "50.000 ₫" and "450.001 ₫"
  241 |     const successMsg = page.locator('text=Áp dụng thành công! Giảm 50.000 ₫');
  242 |     await expect(successMsg).toBeVisible();
  243 |
  244 |     const resultDiv = page.locator('div.text-green-700');
  245 |     await expect(resultDiv).toContainText('Tiết kiệm: 50.000 ₫');
  246 |     await expect(resultDiv).toContainText('Thành tiền: 450.001 ₫');
  247 |   });
  248 |
  249 |   test('TC-COUPON-016: Nhất quán đơn vị tiền: hiển thị số tiền giảm và tổng tiền có ký hiệu ₫ và phân cách hàng nghìn', async ({ page }) => {
  250 |     await loginUser(page);
  251 |     await applyCouponAtCheckout(page, 400000, 'VIP100');
  252 |
  253 |     // Assert currency symbol ₫ and thousands separator.
  254 |     // This will FAIL because actual app renders comma separators: "100,000 ₫"
  255 |     const resultDiv = page.locator('div.text-green-700');
  256 |     await expect(resultDiv).toContainText('100.000 ₫');
  257 |     await expect(resultDiv).toContainText('300.000 ₫');
  258 |
  259 |     const totalText = page.locator('text=Tổng thanh toán: 300.000 ₫');
  260 |     await expect(totalText).toBeVisible();
  261 |   });
  262 |
  263 |   test('TC-COUPON-017: Nhất quán ngôn ngữ: thông báo thành công/lỗi hiển thị bằng tiếng Việt rõ ràng', async ({ page }) => {
  264 |     await loginUser(page);
  265 |
  266 |     // Test success msg language
  267 |     await applyCouponAtCheckout(page, 400000, 'VIP100');
  268 |     const successMsg = page.locator('text=Áp dụng thành công!');
  269 |     await expect(successMsg).toBeVisible();
  270 |
  271 |     // Test error msg language
  272 |     await applyCouponAtCheckout(page, 400000, 'NOTEXIST');
  273 |     const errMsg = page.locator('text=Mã giảm giá không tồn tại hoặc đã bị vô hiệu hóa');
  274 |     await expect(errMsg).toBeVisible();
  275 |   });
  276 |
  277 |   test('TC-COUPON-018: Bảo mật hiển thị: mã giảm giá nhập vào được hiển thị an toàn, không render HTML', async ({ page }) => {
  278 |     await loginUser(page);
  279 |
  280 |     // Register XSS dialog listener to fail immediately if triggered
  281 |     let xssTriggered = false;
  282 |     page.on('dialog', dialog => {
  283 |       xssTriggered = true;
  284 |       dialog.dismiss();
```
