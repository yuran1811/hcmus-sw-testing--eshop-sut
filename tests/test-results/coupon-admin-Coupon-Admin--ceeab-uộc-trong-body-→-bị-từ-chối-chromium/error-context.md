# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: coupon-admin.spec.js >> Coupon Admin (FR-17) E2E Tests >> TC-COUPON-ADMIN-025: Thiếu hoàn toàn trường bắt buộc trong body → bị từ chối
- Location: coupon-admin.spec.js:662:3

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 400
Received:    200
```

# Test source

```ts
  583 |
  584 |     await fillCouponForm(page, {
  585 |       code: 'MPUON',
  586 |       type: 'percent',
  587 |       discount_value: 10,
  588 |       min_order_amount: 0,
  589 |       expired_at: '2099-12-31',
  590 |       max_uses_per_user: 1,
  591 |     });
  592 |
  593 |     await page.click('button:has-text("Tạo mã")');
  594 |     const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'MPUON' });
  595 |     await expect(row).toBeVisible({ timeout: 5000 });
  596 |     await runQuery("DELETE FROM coupons WHERE code = 'MPUON'");
  597 |   });
  598 |
  599 |   // ── TC-023: max_uses_per_user = 2 (BVA IN) → chấp nhận ─────────────────────
  600 |
  601 |   test('TC-COUPON-ADMIN-023: max_uses_per_user = 2 (IN, vừa trên min) → được chấp nhận', async ({ page }) => {
  602 |     await loginAdmin(page);
  603 |     await navigateToCoupons(page);
  604 |
  605 |     await fillCouponForm(page, {
  606 |       code: 'MPUIN',
  607 |       type: 'percent',
  608 |       discount_value: 10,
  609 |       min_order_amount: 0,
  610 |       expired_at: '2099-12-31',
  611 |       max_uses_per_user: 2,
  612 |     });
  613 |
  614 |     await page.click('button:has-text("Tạo mã")');
  615 |     const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'MPUIN' });
  616 |     await expect(row).toBeVisible({ timeout: 5000 });
  617 |     await runQuery("DELETE FROM coupons WHERE code = 'MPUIN'");
  618 |   });
  619 |
  620 |   // ── TC-024: expired_at = ngày trong quá khứ (thăm dò) ──────────────────────
  621 |
  622 |   test('TC-COUPON-ADMIN-024: expired_at = ngày quá khứ ("2020-01-01") → ghi nhận hành vi thực tế', async ({ page }) => {
  623 |     await loginAdmin(page);
  624 |     await navigateToCoupons(page);
  625 |
  626 |     await fillCouponForm(page, {
  627 |       code: 'PAST2020',
  628 |       type: 'percent',
  629 |       discount_value: 20,
  630 |       min_order_amount: 0,
  631 |       expired_at: '2020-01-01',
  632 |       max_uses_per_user: 1,
  633 |     });
  634 |
  635 |     let alertMsg = '';
  636 |     page.on('dialog', async dialog => { alertMsg = dialog.message(); await dialog.dismiss(); });
  637 |
  638 |     await page.click('button:has-text("Tạo mã")');
  639 |     await page.waitForTimeout(1000);
  640 |
  641 |     const row = page.locator('table tbody tr td.font-mono').filter({ hasText: 'PAST2020' });
  642 |     const rowVisible = await row.isVisible();
  643 |
  644 |     if (rowVisible) {
  645 |       // Bug: backend accepted a past expiry date — coupon shows as "Hết hạn" in red
  646 |       const expiryCell = page.locator('table tbody tr', { has: page.locator('td.font-mono:has-text("PAST2020")') })
  647 |         .locator('span.text-red-500:has-text("Hết hạn")');
  648 |       await expect(expiryCell).toBeVisible();
  649 |       // Document: pass with note that system accepts past date (possible bug)
  650 |       console.log('TC-024: Backend accepted past expiry date. Coupon shows as "Hết hạn".');
  651 |     } else {
  652 |       // Pass: backend rejected past expiry date
  653 |       console.log('TC-024: Backend correctly rejected past expiry date.');
  654 |     }
  655 |
  656 |     // Either behavior is documented; test passes by observing the actual behavior
  657 |     expect(true).toBe(true);
  658 |   });
  659 |
  660 |   // ── TC-025: Thiếu hoàn toàn field bắt buộc (no key in body) → bị từ chối ──
  661 |
  662 |   test('TC-COUPON-ADMIN-025: Thiếu hoàn toàn trường bắt buộc trong body → bị từ chối', async () => {
  663 |     const ctx = await request.newContext();
  664 |     const loginRes = await ctx.post(`${API_URL}/login`, {
  665 |       data: { email: 'admin@eshop.com', password: 'Admin123!' },
  666 |     });
  667 |     const { token } = await loginRes.json();
  668 |
  669 |     // Send body with no `code` key at all
  670 |     const res = await ctx.post(`${API_URL}/admin/coupons`, {
  671 |       headers: { Authorization: `Bearer ${token}` },
  672 |       data: {
  673 |         type: 'percent',
  674 |         discount_value: 10,
  675 |         min_order_amount: 0,
  676 |         expired_at: '2099-12-31',
  677 |         max_uses_per_user: 1,
  678 |         // code is intentionally missing
  679 |       },
  680 |     });
  681 |
  682 |     // Backend should reject missing required field
> 683 |     expect(res.status()).toBeGreaterThanOrEqual(400);
      |                          ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  684 |     await ctx.dispose();
  685 |   });
  686 |
  687 |   // ── TC-026: XSS trong code → hiển thị an toàn ──────────────────────────────
  688 |
  689 |   test('TC-COUPON-ADMIN-026: Xử lý an toàn chuỗi nhập vào khi hiển thị mã coupon (chống XSS)', async ({ page }) => {
  690 |     // Seed a coupon with an XSS code directly in DB to bypass UI uppercasing
  691 |     await runQuery(`INSERT OR REPLACE INTO coupons (code, type, discount_value, min_order_amount, expired_at, is_active, max_uses_per_user)
  692 |       VALUES ('<script>alert(1)</script>', 'percent', 5, 0, '2099-12-31', 1, 1)`);
  693 |
  694 |     let xssTriggered = false;
  695 |     page.on('dialog', dialog => { xssTriggered = true; dialog.dismiss(); });
  696 |
  697 |     await loginAdmin(page);
  698 |     await navigateToCoupons(page);
  699 |
  700 |     // Wait for the table to load
  701 |     await page.waitForTimeout(1500);
  702 |     expect(xssTriggered).toBeFalsy();
  703 |
  704 |     // Also verify the code is rendered as text, not HTML
  705 |     const codeCell = page.locator('table tbody tr td.font-mono').filter({ hasText: 'script' });
  706 |     if (await codeCell.isVisible()) {
  707 |       // Check inner text is escaped (rendered as plain text, not executed)
  708 |       const innerText = await codeCell.innerText();
  709 |       expect(innerText).toContain('script');
  710 |     }
  711 |
  712 |     await runQuery("DELETE FROM coupons WHERE code = '<script>alert(1)</script>'");
  713 |   });
  714 |
  715 | });
  716 |
```
