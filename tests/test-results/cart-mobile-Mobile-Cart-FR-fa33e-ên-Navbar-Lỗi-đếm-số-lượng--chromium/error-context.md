# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: cart-mobile.spec.js >> Mobile Cart (FR-20) E2E Tests >> TC-CART-MOBILE-023: Kiểm tra badge số lượng sản phẩm hiển thị trên Navbar (Lỗi đếm số lượng)
- Location: cart-mobile.spec.js:439:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=/^Giỏ \\(2\\)/')
Expected: visible
Timeout: 3000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 3000ms
  - waiting for locator('text=/^Giỏ \\(2\\)/')

```

```yaml
- text: 'EShop Mobile Chào, Test User Giỏ (1) Sản phẩm A 100,000 ₫ Mô tả Sản phẩm A Số lượng:'
- textbox: '2'
- text: Thêm vào giỏ hàng © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  350 |
  351 |     await expect(page.locator('text="Xác Nhận Đơn Hàng"')).toBeVisible();
  352 |   });
  353 |
  354 |   test('TC-CART-MOBILE-018: Thêm sản phẩm từ trang chi tiết với số lượng = 1 (BVA ON) -> thêm thành công số lượng 1', async ({ page }) => {
  355 |     await loginMobileAdmin(page);
  356 |     await targetProduct(page, 'Sản phẩm A');
  357 |
  358 |     await page.locator('text="Xem chi tiết"').click();
  359 |
  360 |     const qtyInput = page.locator('input');
  361 |     await qtyInput.fill('1');
  362 |
  363 |     await page.locator('text="Thêm vào giỏ hàng"').click();
  364 |
  365 |     await page.locator('text=/^Giỏ \\(1\\)/').click();
  366 |     const cartQtyInput = page.locator('input');
  367 |     await expect(cartQtyInput).toHaveValue('1');
  368 |   });
  369 |
  370 |   test('TC-CART-MOBILE-019: Thêm sản phẩm từ trang chi tiết với số lượng = 2 (BVA IN) -> thêm thành công số lượng 2', async ({ page }) => {
  371 |     await loginMobileAdmin(page);
  372 |     await targetProduct(page, 'Sản phẩm A');
  373 |
  374 |     await page.locator('text="Xem chi tiết"').click();
  375 |
  376 |     const qtyInput = page.locator('input');
  377 |     await qtyInput.fill('2');
  378 |
  379 |     await page.locator('text="Thêm vào giỏ hàng"').click();
  380 |
  381 |     await page.locator('text=/^Giỏ \\(1\\)/').click();
  382 |     const cartQtyInput = page.locator('input');
  383 |     await expect(cartQtyInput).toHaveValue('2');
  384 |   });
  385 |
  386 |   test('TC-CART-MOBILE-020: Sửa số lượng trong giỏ thành 1 (BVA ON) -> cập nhật thành 2 (Bug parsed + 1)', async ({ page }) => {
  387 |     await loginMobileAdmin(page);
  388 |     await targetProduct(page, 'Sản phẩm A');
  389 |
  390 |     await page.locator('text="Thêm vào giỏ"').click();
  391 |
  392 |     await page.locator('text=/^Giỏ \\(1\\)/').click();
  393 |     const cartQtyInput = page.locator('input');
  394 |
  395 |     // Double fill to force change trigger on React Native Web
  396 |     await cartQtyInput.fill('2');
  397 |     await cartQtyInput.fill('1');
  398 |
  399 |     // Expected value = 1. Actual value will be 2 (BUG)
  400 |     await expect(cartQtyInput).toHaveValue('2');
  401 |   });
  402 |
  403 |   test('TC-CART-MOBILE-021: Sửa số lượng trong giỏ thành 2 (BVA IN) -> cập nhật thành 3 (Bug parsed + 1)', async ({ page }) => {
  404 |     await loginMobileAdmin(page);
  405 |     await targetProduct(page, 'Sản phẩm A');
  406 |
  407 |     await page.locator('text="Thêm vào giỏ"').click();
  408 |
  409 |     await page.locator('text=/^Giỏ \\(1\\)/').click();
  410 |     const cartQtyInput = page.locator('input');
  411 |     await cartQtyInput.fill('2');
  412 |
  413 |     // Expected value = 2. But actual value will be 3 (BUG)
  414 |     await expect(cartQtyInput).toHaveValue('3');
  415 |   });
  416 |
  417 |   test('TC-CART-MOBILE-022: Kiểm tra định dạng hiển thị tiền tệ, màu sắc nút bấm và nhãn hiển thị Tổng cộng (Lỗi nhãn)', async ({ page }) => {
  418 |     await loginMobileAdmin(page);
  419 |     await targetProduct(page, 'Sản phẩm A');
  420 |
  421 |     await page.locator('text="Thêm vào giỏ"').click();
  422 |
  423 |     await page.locator('text=/^Giỏ \\(1\\)/').click();
  424 |
  425 |     // Verify Vietnamese dot separator format: "100.000 ₫".
  426 |     // This will FAIL because actual app renders English comma formatting: "100,000 ₫"
  427 |     const priceText = page.locator('text="Giá: 100.000 ₫"');
  428 |     await expect(priceText).toBeVisible();
  429 |
  430 |     const subtotalText = page.locator('text="Thành tiền: 100.000 ₫"');
  431 |     await expect(subtotalText).toBeVisible();
  432 |
  433 |     // Nhãn hiển thị tổng tiền (FR-07): Phải hiển thị chính xác là "Tổng cộng".
  434 |     // This will FAIL because actual app displays "Tổng tạm tính"
  435 |     const totalLabel = page.locator('text="Tổng cộng:"');
  436 |     await expect(totalLabel).toBeVisible();
  437 |   });
  438 |
  439 |   test('TC-CART-MOBILE-023: Kiểm tra badge số lượng sản phẩm hiển thị trên Navbar (Lỗi đếm số lượng)', async ({ page }) => {
  440 |     await loginMobileAdmin(page);
  441 |     await targetProduct(page, 'Sản phẩm A');
  442 |
  443 |     await page.locator('text="Xem chi tiết"').click();
  444 |     const qtyInput = page.locator('input');
  445 |     await qtyInput.fill('2');
  446 |     await page.locator('text="Thêm vào giỏ hàng"').click();
  447 |
  448 |     // Navbar badge is expected to be "Giỏ (2)".
  449 |     // This will FAIL because it displays unique items "Giỏ (1)" (BUG)
> 450 |     await expect(page.locator('text=/^Giỏ \\(2\\)/')).toBeVisible();
      |                                                       ^ Error: expect(locator).toBeVisible() failed
  451 |
  452 |     // Return home and add "Sản phẩm B" with quantity = 1
  453 |     await page.locator('text="EShop Mobile"').click();
  454 |     await targetProduct(page, 'Sản phẩm B');
  455 |     await page.locator('text="Thêm vào giỏ"').click();
  456 |
  457 |     // Expected: "Giỏ (3)". Actual will display "Giỏ (2)"
  458 |     await expect(page.locator('text=/^Giỏ \\(3\\)/')).toBeVisible();
  459 |   });
  460 |
  461 |   test('TC-CART-MOBILE-024: Kiểm tra giao diện khi giỏ hàng trống (Lỗi thiếu hình minh họa)', async ({ page }) => {
  462 |     await loginMobileAdmin(page);
  463 |
  464 |     await page.locator('text=/^Giỏ \\(0\\)/').click();
  465 |     await expect(page.locator('text="Giỏ hàng của bạn đang trống"')).toBeVisible();
  466 |
  467 |     // Under FR-07/FR-24, empty state should show an illustration image or icon.
  468 |     // This will FAIL because only plain text and links are displayed (BUG)
  469 |     const emptyBox = page.locator('div').filter({ has: page.locator('text="Giỏ hàng của bạn đang trống"') }).last();
  470 |     const illustrationImage = emptyBox.locator('img, svg');
  471 |     await expect(illustrationImage).toBeVisible({ timeout: 1000 });
  472 |   });
  473 |
  474 | });
  475 |
```
