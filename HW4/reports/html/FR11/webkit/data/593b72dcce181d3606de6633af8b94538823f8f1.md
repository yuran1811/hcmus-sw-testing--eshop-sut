# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR11_order_history.spec.ts >> F11-TC-010: Verify empty state displays message and illustration when user has no orders
- Location: tests\FR11_order_history.spec.ts:158:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.w-full.md\\:w-2\\:3 img, .w-full.md\\:w-2\\:3 svg, p:has(svg)')
Expected: visible
Timeout: 2000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 2000ms
  - waiting for locator('.w-full.md\\:w-2\\:3 img, .w-full.md\\:w-2\\:3 svg, p:has(svg)')

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Chào, User F11 Empty":
      - /url: /profile
    - button "Thoát"
- main:
  - heading "Hồ sơ của bạn" [level=2]
  - text: Email (Không đổi)
  - textbox [disabled]: user_f11_empty@eshop.com
  - text: Họ Tên
  - textbox: User F11 Empty
  - text: Số điện thoại
  - 'textbox "VD: 0912345678"'
  - text: Địa chỉ giao hàng
  - textbox "Nhập địa chỉ của bạn"
  - button "Cập nhật"
  - heading "Lịch sử đơn hàng" [level=2]
  - paragraph: Bạn chưa có đơn hàng nào.
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  145 |     await seedOrder(mainToken, 800000, 'shipping'); // For cancellation test 13 (should not cancel)
  146 |   }
  147 | 
  148 |   // Seed order for other user (to verify isolation)
  149 |   if (otherToken) {
  150 |     await seedOrder(otherToken, 900000, 'pending');
  151 |   }
  152 | 
  153 |   await requestContext.dispose();
  154 | });
  155 | 
  156 | // Dynamic test generation from JSON file
  157 | for (const tc of testCases) {
  158 |   test(`${tc.caseId}: ${tc.purpose}`, async ({ page }) => {
  159 |     // Dialog listener to capture alert messages
  160 |     let lastDialogMessage = '';
  161 |     page.on('dialog', async (dialog) => {
  162 |       lastDialogMessage = dialog.message();
  163 |       console.log(`[Dialog Alert - ${tc.caseId}] message: "${lastDialogMessage}"`);
  164 |       await dialog.accept();
  165 |     });
  166 | 
  167 |     // 1. Navigation and Authentication setup
  168 |     if (tc.email) {
  169 |       // Go to Login Page
  170 |       await page.goto('/login');
  171 |       // Fill login credentials
  172 |       await page.locator('label:has-text("Username") + input').fill(tc.email);
  173 |       const password = tc.email.includes('empty') ? 'Empty1234!' : 'Main1234!';
  174 |       await page.locator('label:has-text("Mật khẩu") + input').fill(password);
  175 |       await page.getByRole('button', { name: 'Sign In' }).click();
  176 |       await page.waitForTimeout(500); // Allow login redirect
  177 |       
  178 |       // Go to Profile Page
  179 |       await page.goto('/profile');
  180 |     } else {
  181 |       // Unauthenticated direct access
  182 |       await page.goto('/profile');
  183 |     }
  184 | 
  185 |     // 2. Assertions
  186 |     if (tc.caseId === 'F11-TC-001') {
  187 |       // Access Control: Block guest
  188 |       await expect(page.getByText('Vui lòng đăng nhập')).toBeVisible({ timeout: 3000 });
  189 |       return;
  190 |     }
  191 | 
  192 |     if (tc.caseId === 'F11-TC-002') {
  193 |       // Access Control: Isolation
  194 |       await expect(page.getByText('Bạn chưa có đơn hàng nào.')).toBeVisible({ timeout: 3000 });
  195 |       // Ensure other user's order is not visible
  196 |       const otherOrderRow = page.locator('tr', { hasText: /900[.,]000/ });
  197 |       await expect(otherOrderRow).toBeHidden();
  198 |       return;
  199 |     }
  200 | 
  201 |     if (tc.caseId === 'F11-TC-003') {
  202 |       // Data Display: Required columns
  203 |       const tableHeader = page.locator('table thead tr');
  204 |       await expect(tableHeader).toBeVisible();
  205 |       await expect(tableHeader).toContainText('Mã ĐH');
  206 |       await expect(tableHeader).toContainText('Ngày đặt');
  207 |       await expect(tableHeader).toContainText('Tổng tiền');
  208 |       await expect(tableHeader).toContainText('Trạng thái');
  209 |       await expect(tableHeader).toContainText('Thao tác');
  210 |       return;
  211 |     }
  212 | 
  213 |     if (tc.caseId === 'F11-TC-004') {
  214 |       // Data Display: Currency formatting
  215 |       const orderRow = page.locator('tr', { hasText: /100[.,]000/ });
  216 |       await expect(orderRow).toBeVisible();
  217 |       const totalAmountCell = orderRow.locator('td.text-red-600');
  218 |       // Assert thousand separator and ₫ suffix
  219 |       await expect(totalAmountCell).toHaveText(/100[.,]000\s*₫/);
  220 |       return;
  221 |     }
  222 | 
  223 |     if (['F11-TC-005', 'F11-TC-006', 'F11-TC-007', 'F11-TC-008', 'F11-TC-009'].includes(tc.caseId)) {
  224 |       // Status Label and Color (Tailwind classes) check
  225 |       const amountStr = `${tc.amount / 1000}[.,]000`;
  226 |       const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
  227 |       await expect(orderRow).toBeVisible();
  228 |       
  229 |       const statusSpan = orderRow.locator('td span');
  230 |       // 1. Text Assert
  231 |       await expect(statusSpan).toHaveText(tc.expectedLabel);
  232 |       // 2. Class Assert
  233 |       if (tc.expectedClass) {
  234 |         await expect(statusSpan).toHaveClass(new RegExp(tc.expectedClass));
  235 |       }
  236 |       return;
  237 |     }
  238 | 
  239 |     if (tc.caseId === 'F11-TC-010') {
  240 |       // Empty State visual/illustration check
  241 |       await expect(page.getByText('Bạn chưa có đơn hàng nào.')).toBeVisible();
  242 |       // Spec requirement (FR-24): illustration/icon must exist
  243 |       // Since SUT only has text <p>, this assertion is expected to fail on SUT.
  244 |       const illustration = page.locator('.w-full.md\\:w-2\\:3 img, .w-full.md\\:w-2\\:3 svg, p:has(svg)');
> 245 |       await expect(illustration).toBeVisible({ timeout: 2000 });
      |                                  ^ Error: expect(locator).toBeVisible() failed
  246 |       return;
  247 |     }
  248 | 
  249 |     if (tc.caseId === 'F11-TC-011' || tc.caseId === 'F11-TC-012') {
  250 |       // Cancellation of pending/confirmed orders
  251 |       const amountStr = `${tc.amount / 1000}[.,]000`;
  252 |       const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
  253 |       await expect(orderRow).toBeVisible();
  254 |       
  255 |       const cancelBtn = orderRow.getByRole('button', { name: 'Hủy đơn' });
  256 |       await expect(cancelBtn).toBeVisible();
  257 |       await cancelBtn.click();
  258 |       await page.waitForTimeout(500); // Allow update
  259 |       
  260 |       expect(lastDialogMessage).toContain('Hủy đơn thành công!');
  261 |       
  262 |       const statusSpan = orderRow.locator('td span');
  263 |       await expect(statusSpan).toHaveText('Đã hủy');
  264 |       await expect(statusSpan).toHaveClass(/bg-red-100 text-red-800/);
  265 |       return;
  266 |     }
  267 | 
  268 |     if (tc.caseId === 'F11-TC-013') {
  269 |       // Shipping Cancellation Restriction: User must not be allowed to cancel a shipping order.
  270 |       // Spec (FR-10): button hidden or disabled.
  271 |       // SUT Bug: SUT renders "Hủy đơn" for shipping status and successfully cancels it.
  272 |       // This will fail on SUT, proving the bug.
  273 |       const amountStr = `${tc.amount / 1000}[.,]000`;
  274 |       const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
  275 |       await expect(orderRow).toBeVisible();
  276 |       
  277 |       const cancelBtn = orderRow.getByRole('button', { name: 'Hủy đơn' });
  278 |       await expect(cancelBtn).toBeHidden({ timeout: 2000 });
  279 |       return;
  280 |     }
  281 | 
  282 |     if (tc.caseId === 'F11-TC-014' || tc.caseId === 'F11-TC-015') {
  283 |       // Delivered/Canceled orders cancellation button visibility: Button must not be visible.
  284 |       const amountStr = `${tc.amount / 1000}[.,]000`;
  285 |       const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
  286 |       await expect(orderRow).toBeVisible();
  287 |       
  288 |       const cancelBtn = orderRow.getByRole('button', { name: 'Hủy đơn' });
  289 |       await expect(cancelBtn).toBeHidden();
  290 |       return;
  291 |     }
  292 | 
  293 |     if (tc.caseId === 'F11-TC-016') {
  294 |       // GUI: Exactly one h1 tag per page
  295 |       // SUT Bug: lacks <h1>. Will fail on SUT.
  296 |       const h1Count = await page.locator('h1').count();
  297 |       expect(h1Count).toBe(1);
  298 |       return;
  299 |     }
  300 | 
  301 |     if (tc.caseId === 'F11-TC-017') {
  302 |       // GUI: Highlight active navbar menu item
  303 |       // SUT Bug: no dynamic active page highlight styling. Will fail on SUT.
  304 |       const profileLink = page.getByRole('link', { name: /Chào, / });
  305 |       await expect(profileLink).toHaveClass(/active|highlight|bg-blue-800/);
  306 |       return;
  307 |     }
  308 | 
  309 |     if (tc.caseId === 'F11-TC-018') {
  310 |       // GUI: Logout button must be labeled "Đăng xuất"
  311 |       // SUT Bug: Labeled "Thoát". Will fail on SUT.
  312 |       const logoutBtn = page.getByRole('button', { name: 'Đăng xuất' });
  313 |       await expect(logoutBtn).toBeVisible({ timeout: 2000 });
  314 |       return;
  315 |     }
  316 |   });
  317 | }
  318 | 
```