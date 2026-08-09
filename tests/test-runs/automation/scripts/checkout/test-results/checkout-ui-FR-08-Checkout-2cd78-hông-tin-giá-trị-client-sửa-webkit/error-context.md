# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-ui.spec.ts >> FR-08 Checkout — Web UI Tests (Equivalence Partitioning) >> TC-CHECKOUT-012: Điều khiển tổng tiền là read-only và backend không tin giá trị client sửa
- Location: tests\checkout-ui.spec.ts:116:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.checkout-total, [data-testid="checkout-total"], .total-price, .order-total').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "soft toBeVisible" with timeout 5000ms
  - waiting for locator('.checkout-total, [data-testid="checkout-total"], .total-price, .order-total').first()

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
  - text: "Tổng tiền thanh toán (VND):"
  - spinbutton: "0"
  - text: Mã Giảm Giá
  - textbox "Nhập mã giảm giá..."
  - button "Áp dụng" [disabled]
  - text: "Tổng thanh toán: 0 ₫"
  - button "Xác Nhận Thanh Toán"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  55  | 
  56  | /** Set browser localStorage so the frontend recognises the logged-in user */
  57  | async function loginViaStorage(page: import('@playwright/test').Page, token: string) {
  58  |   await page.addInitScript((t: string) => {
  59  |     window.localStorage.setItem('token', t);
  60  |     window.localStorage.setItem('authToken', t);
  61  |     window.localStorage.setItem('jwt', t);
  62  |   }, token);
  63  | }
  64  | 
  65  | // ─── Test Suite ──────────────────────────────────────────────────────────────
  66  | test.describe('FR-08 Checkout — Web UI Tests (Equivalence Partitioning)', () => {
  67  |   // Shared state across tests in this suite
  68  |   let tokenA: string;
  69  | 
  70  |   test.beforeAll(async ({ request }) => {
  71  |     const api = new CheckoutAPIHelper(request, API_BASE);
  72  |     tokenA = await ensureUserAndGetToken(api, testData.users.userA);
  73  |   });
  74  | 
  75  |   // ──────────────────────────────────────────────────────────────────────────
  76  |   // TC-CHECKOUT-011: Trang Checkout hiển thị đầy đủ mọi dòng sản phẩm
  77  |   // ──────────────────────────────────────────────────────────────────────────
  78  |   test('TC-CHECKOUT-011: Trang Checkout hiển thị đầy đủ tên, đơn giá, số lượng các sản phẩm', async ({ page, request }) => {
  79  |     const api = new CheckoutAPIHelper(request, API_BASE);
  80  |     const tc = testData.tc_ui.find(c => c.tc_id === 'TC-CHECKOUT-011')!;
  81  | 
  82  |     // Setup cart from data-driven checkout UI scenario
  83  |     await prepareCart(api, tokenA, tc.cart_items as CartItem[]);
  84  | 
  85  |     // Inject token into localStorage so frontend considers user logged in
  86  |     await loginViaStorage(page, tokenA);
  87  | 
  88  |     const webPage = new CheckoutWebPage(page);
  89  |     await webPage.gotoCheckout(WEB_BASE);
  90  | 
  91  |     // [Pattern 1] — Verify checkout page loaded (URL assertion)
  92  |     // [Pattern 3] — URL should be on /checkout or similar
  93  |     await expect(page).toHaveURL(/checkout|cart|order/i);
  94  | 
  95  |     // Collect all product names shown on the checkout page
  96  |     // [Pattern 1] — At least 2 product rows must be visible
  97  |     const itemCount = await webPage.getOrderItemCount();
  98  |     expect(itemCount).toBeGreaterThanOrEqual(2);
  99  | 
  100 |     // [Pattern 2] — Text assertion: product names should appear
  101 |     const names = await webPage.getOrderItemNames();
  102 |     const nameLower = names.map((n) => n.toLowerCase()).join(' ');
  103 |     for (const keyword of tc.expected_name_keywords) {
  104 |       expect.soft(nameLower).toContain(keyword);
  105 |     }
  106 | 
  107 |     // [Pattern 2] — Total should reflect the expected calculated amount from data
  108 |     const totalText = await webPage.getTotalAmountText();
  109 |     const totalClean = totalText.replace(/\D/g, '');
  110 |     expect.soft(totalClean).toContain(String(tc.expected_total_amount));
  111 |   });
  112 | 
  113 |   // ──────────────────────────────────────────────────────────────────────────
  114 |   // TC-CHECKOUT-012: Tổng tiền là giá trị tự động và không thể chỉnh sửa
  115 |   // ──────────────────────────────────────────────────────────────────────────
  116 |   test('TC-CHECKOUT-012: Điều khiển tổng tiền là read-only và backend không tin giá trị client sửa', async ({ page, request }) => {
  117 |     const api = new CheckoutAPIHelper(request, API_BASE);
  118 |     const tc = testData.tc_ui.find(c => c.tc_id === 'TC-CHECKOUT-012')!;
  119 |     await prepareCart(api, tokenA, tc.cart_items as CartItem[]);
  120 |     await loginViaStorage(page, tokenA);
  121 | 
  122 |     const webPage = new CheckoutWebPage(page);
  123 |     await webPage.gotoCheckout(WEB_BASE);
  124 | 
  125 |     // [Pattern 3] — URL reached checkout page
  126 |     await expect(page).toHaveURL(/checkout|cart|order/i);
  127 | 
  128 |     // [Pattern 1] — The total-amount control should be disabled or read-only
  129 |     // Try to locate the element
  130 |     const totalEl = page.locator(
  131 |       'input[name="total_amount"], input[data-testid="total-amount"], [data-testid="checkout-total"]'
  132 |     ).first();
  133 | 
  134 |     const isVisible = await totalEl.isVisible().catch(() => false);
  135 |     if (isVisible) {
  136 |       const isDisabled = await totalEl.isDisabled().catch(() => false);
  137 |       const isReadOnly = await totalEl.getAttribute('readonly').catch(() => null);
  138 |       const isReadOnlyBool = await totalEl.getAttribute('type').then((t) => t === 'text' ? false : false).catch(() => false);
  139 | 
  140 |       // [Pattern 1] — Should be disabled or readonly
  141 |       const isProtected = isDisabled || isReadOnly !== null || isReadOnlyBool;
  142 |       expect.soft(isProtected).toBe(true);
  143 | 
  144 |       // [Pattern 2] — Try to modify via keyboard; value should not change
  145 |       const originalValue = await totalEl.inputValue().catch(() => '');
  146 |       await webPage.tryEditTotalAmount('1');
  147 |       const modifiedValue = await totalEl.inputValue().catch(() => originalValue);
  148 |       expect.soft(modifiedValue).toBe(originalValue);
  149 |     } else {
  150 |       // If no editable input for total: find text-only display
  151 |       const totalText = page.locator(
  152 |         '.checkout-total, [data-testid="checkout-total"], .total-price, .order-total'
  153 |       ).first();
  154 |       // [Pattern 1] — Total price display should be visible
> 155 |       await expect.soft(totalText).toBeVisible();
      |                                    ^ Error: expect(locator).toBeVisible() failed
  156 |     }
  157 | 
  158 |     // [Pattern 2] — After DOM manipulation (override total to 1) and submitting,
  159 |     // backend should still use its own computed total.
  160 |     // (Simulate via DevTools evaluation; verify via API)
  161 |     await page.evaluate((tamperedTotal: number) => {
  162 |       const inputs = document.querySelectorAll('input');
  163 |       inputs.forEach((inp) => {
  164 |         if (inp.name === 'total_amount' || inp.getAttribute('data-testid') === 'total-amount') {
  165 |           (inp as HTMLInputElement).removeAttribute('disabled');
  166 |           (inp as HTMLInputElement).removeAttribute('readonly');
  167 |           (inp as HTMLInputElement).value = String(tamperedTotal);
  168 |         }
  169 |       });
  170 |     }, tc.tampered_total_amount);
  171 | 
  172 |     // Check order count before submitting
  173 |     const orderCountBefore = await api.getOrderCount(tokenA);
  174 | 
  175 |     // Try to find and click the submit button
  176 |     const submitBtn = page.locator(
  177 |       'button[type="submit"]:has-text("Xác nhận"), button:has-text("Đặt hàng"), button:has-text("Confirm"), button:has-text("Checkout")'
  178 |     ).first();
  179 |     const submitVisible = await submitBtn.isVisible().catch(() => false);
  180 |     if (submitVisible) {
  181 |       await submitBtn.click();
  182 |       await page.waitForTimeout(tc.post_submit_wait_ms);
  183 | 
  184 |       const orderCountAfter = await api.getOrderCount(tokenA);
  185 |       if (orderCountAfter > orderCountBefore) {
  186 |         // A new order was placed — verify its total from API
  187 |         const ordersResp = await api.getMyOrders(tokenA);
  188 |         if (ordersResp.ok()) {
  189 |           const orders = await ordersResp.json() as Array<{ total_amount?: number; id?: number }>;
  190 |           const latestOrder = orders[orders.length - 1];
  191 |           if (latestOrder) {
  192 |             // [Pattern 2] — Backend must not have accepted the DOM-manipulated total
  193 |             expect(latestOrder.total_amount).not.toBe(tc.tampered_total_amount);
  194 |           }
  195 |         }
  196 |       }
  197 |     }
  198 |   });
  199 | });
  200 | 
```