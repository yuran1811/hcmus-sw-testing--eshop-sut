# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: FR11_order_history.spec.ts >> F11-TC-013: Verify user cannot cancel shipping orders (button hidden or disabled)
- Location: tests\FR11_order_history.spec.ts:177:7

# Error details

```
Error: expect(locator).toBeHidden() failed

Locator:  locator('tr').filter({ hasText: /800[.,]000/ }).getByRole('button', { name: 'Hủy đơn' })
Expected: hidden
Received: visible
Timeout:  2000ms

Call log:
  - Expect "toBeHidden" with timeout 2000ms
  - waiting for locator('tr').filter({ hasText: /800[.,]000/ }).getByRole('button', { name: 'Hủy đơn' })
    17 × locator resolved to <button class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">Hủy đơn</button>
       - unexpected value "visible"

```

```yaml
- button "Hủy đơn"
```

# Test source

```ts
  197 |       // Go to Profile Page
  198 |       await page.goto('/profile');
  199 |     } else {
  200 |       // Unauthenticated direct access
  201 |       await page.goto('/profile');
  202 |     }
  203 | 
  204 |     // 2. Assertions
  205 |     if (tc.caseId === 'F11-TC-001') {
  206 |       // Access Control: Block guest
  207 |       await expect(page.getByText('Vui lòng đăng nhập')).toBeVisible({ timeout: 3000 });
  208 |       return;
  209 |     }
  210 | 
  211 |     if (tc.caseId === 'F11-TC-002') {
  212 |       // Access Control: Isolation
  213 |       await expect(page.getByText('Bạn chưa có đơn hàng nào.')).toBeVisible({ timeout: 3000 });
  214 |       // Ensure other user's order is not visible
  215 |       const otherOrderRow = page.locator('tr', { hasText: /900[.,]000/ });
  216 |       await expect(otherOrderRow).toBeHidden();
  217 |       return;
  218 |     }
  219 | 
  220 |     if (tc.caseId === 'F11-TC-003') {
  221 |       // Data Display: Required columns
  222 |       const tableHeader = page.locator('table thead tr');
  223 |       await expect(tableHeader).toBeVisible();
  224 |       await expect(tableHeader).toContainText('Mã ĐH');
  225 |       await expect(tableHeader).toContainText('Ngày đặt');
  226 |       await expect(tableHeader).toContainText('Tổng tiền');
  227 |       await expect(tableHeader).toContainText('Trạng thái');
  228 |       await expect(tableHeader).toContainText('Thao tác');
  229 |       return;
  230 |     }
  231 | 
  232 |     if (tc.caseId === 'F11-TC-004') {
  233 |       // Data Display: Currency formatting
  234 |       const orderRow = page.locator('tr', { hasText: /100[.,]000/ });
  235 |       await expect(orderRow).toBeVisible();
  236 |       const totalAmountCell = orderRow.locator('td.text-red-600');
  237 |       // Assert thousand separator and ₫ suffix
  238 |       await expect(totalAmountCell).toHaveText(/100[.,]000\s*₫/);
  239 |       return;
  240 |     }
  241 | 
  242 |     if (['F11-TC-005', 'F11-TC-006', 'F11-TC-007', 'F11-TC-008', 'F11-TC-009'].includes(tc.caseId)) {
  243 |       // Status Label and Color (Tailwind classes) check
  244 |       const amountStr = `${tc.amount / 1000}[.,]000`;
  245 |       const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
  246 |       await expect(orderRow).toBeVisible();
  247 |       
  248 |       const statusSpan = orderRow.locator('td span');
  249 |       // 1. Text Assert
  250 |       await expect(statusSpan).toHaveText(tc.expectedLabel);
  251 |       // 2. Class Assert
  252 |       if (tc.expectedClass) {
  253 |         await expect(statusSpan).toHaveClass(new RegExp(tc.expectedClass));
  254 |       }
  255 |       return;
  256 |     }
  257 | 
  258 |     if (tc.caseId === 'F11-TC-010') {
  259 |       // Empty State visual/illustration check
  260 |       await expect(page.getByText('Bạn chưa có đơn hàng nào.')).toBeVisible();
  261 |       // Spec requirement (FR-24): illustration/icon must exist
  262 |       // Since SUT only has text <p>, this assertion is expected to fail on SUT.
  263 |       const illustration = page.locator('.w-full.md\\:w-2\\:3 img, .w-full.md\\:w-2\\:3 svg, p:has(svg)');
  264 |       await expect(illustration).toBeVisible({ timeout: 2000 });
  265 |       return;
  266 |     }
  267 | 
  268 |     if (tc.caseId === 'F11-TC-011' || tc.caseId === 'F11-TC-012') {
  269 |       // Cancellation of pending/confirmed orders
  270 |       const amountStr = `${tc.amount / 1000}[.,]000`;
  271 |       const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
  272 |       await expect(orderRow).toBeVisible();
  273 |       
  274 |       const cancelBtn = orderRow.getByRole('button', { name: 'Hủy đơn' });
  275 |       await expect(cancelBtn).toBeVisible();
  276 |       await cancelBtn.click();
  277 |       await page.waitForTimeout(500); // Allow update
  278 |       
  279 |       expect(lastDialogMessage).toContain('Hủy đơn thành công!');
  280 |       
  281 |       const statusSpan = orderRow.locator('td span');
  282 |       await expect(statusSpan).toHaveText('Đã hủy');
  283 |       await expect(statusSpan).toHaveClass(/bg-red-100 text-red-800/);
  284 |       return;
  285 |     }
  286 | 
  287 |     if (tc.caseId === 'F11-TC-013') {
  288 |       // Shipping Cancellation Restriction: User must not be allowed to cancel a shipping order.
  289 |       // Spec (FR-10): button hidden or disabled.
  290 |       // SUT Bug: SUT renders "Hủy đơn" for shipping status and successfully cancels it.
  291 |       // This will fail on SUT, proving the bug.
  292 |       const amountStr = `${tc.amount / 1000}[.,]000`;
  293 |       const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
  294 |       await expect(orderRow).toBeVisible();
  295 |       
  296 |       const cancelBtn = orderRow.getByRole('button', { name: 'Hủy đơn' });
> 297 |       await expect(cancelBtn).toBeHidden({ timeout: 2000 });
      |                               ^ Error: expect(locator).toBeHidden() failed
  298 |       return;
  299 |     }
  300 | 
  301 |     if (tc.caseId === 'F11-TC-014' || tc.caseId === 'F11-TC-015') {
  302 |       // Delivered/Canceled orders cancellation button visibility: Button must not be visible.
  303 |       const amountStr = `${tc.amount / 1000}[.,]000`;
  304 |       const orderRow = page.locator('tr', { hasText: new RegExp(amountStr) });
  305 |       await expect(orderRow).toBeVisible();
  306 |       
  307 |       const cancelBtn = orderRow.getByRole('button', { name: 'Hủy đơn' });
  308 |       await expect(cancelBtn).toBeHidden();
  309 |       return;
  310 |     }
  311 | 
  312 |     if (tc.caseId === 'F11-TC-016') {
  313 |       // GUI: Exactly one h1 tag per page
  314 |       // SUT Bug: lacks <h1>. Will fail on SUT.
  315 |       const h1Count = await page.locator('h1').count();
  316 |       expect(h1Count).toBe(1);
  317 |       return;
  318 |     }
  319 | 
  320 |     if (tc.caseId === 'F11-TC-017') {
  321 |       // GUI: Highlight active navbar menu item
  322 |       // SUT Bug: no dynamic active page highlight styling. Will fail on SUT.
  323 |       const profileLink = page.getByRole('link', { name: /Chào, / });
  324 |       await expect(profileLink).toHaveClass(/active|highlight|bg-blue-800/);
  325 |       return;
  326 |     }
  327 | 
  328 |     if (tc.caseId === 'F11-TC-018') {
  329 |       // GUI: Logout button must be labeled "Đăng xuất"
  330 |       // SUT Bug: Labeled "Thoát". Will fail on SUT.
  331 |       const logoutBtn = page.getByRole('button', { name: 'Đăng xuất' });
  332 |       await expect(logoutBtn).toBeVisible({ timeout: 2000 });
  333 |       return;
  334 |     }
  335 |   });
  336 | }
  337 | 
```