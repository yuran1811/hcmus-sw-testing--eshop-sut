# BUG-CART-001: Nút tăng/giảm số lượng trong giỏ hàng không phản hồi (Timeout)

## Found by Test Case

TC-CART-003, TC-CART-004, TC-CART-005

## Requirement liên quan

FR-07 (Giỏ hàng — cập nhật số lượng sản phẩm)

## Severity / Priority

Critical / P1

## Environment

- Browser: Chromium (Desktop Chrome)
- OS: Windows 11
- URL: http://localhost:5173 (frontend-web)
- Build: nhánh `anh-khoa`, commit `a7b11fd`

## Steps to reproduce

**Kịch bản A — TC-CART-003 (Tăng số lượng bằng nút "+"):**

1. Đăng nhập vào tài khoản khách hàng
2. Từ trang chủ, thêm một sản phẩm vào giỏ hàng
3. Vào trang Giỏ hàng
4. Bấm nút "+" để tăng số lượng sản phẩm lên 2

**Kịch bản B — TC-CART-004 (Giảm số lượng bằng nút "-"):**

1. Đăng nhập vào tài khoản khách hàng
2. Thêm một sản phẩm vào giỏ (số lượng ban đầu = 1)
3. Tăng số lượng lên 2 (bấm "+")
4. Vào trang Giỏ hàng
5. Bấm nút "-" để giảm số lượng từ 2 về 1

## Expected result

- Kịch bản A: Số lượng tăng lên 2, "Thành tiền" và "Tổng cộng" cập nhật tức thì.
- Kịch bản B: Số lượng giảm về 1, "Thành tiền" và "Tổng cộng" cập nhật.

## Actual result

Playwright timeout sau 5 giây khi chờ click vào nút "+" hoặc "-". Các nút này không tồn tạt trên giao diện

`TimeoutError: locator.click: Timeout 5000ms exceeded`

## Evidence

- Screenshot TC-CART-003 (nút "+"): `![BUG-CART-001-plus](../screenshots/BUG-CART-001-quantity-plus.png)`
- Screenshot TC-CART-004 (nút "-"): `![BUG-CART-001-minus](../screenshots/BUG-CART-001-quantity-minus.png)`
- Playwright log: `TimeoutError: locator.click: Timeout 5000ms exceeded`

## Notes

TC-CART-001 (thêm sản phẩm vào giỏ) pass bình thường, xác nhận sản phẩm được thêm thành công. Lỗi xảy ra ở bước tương tác với nút điều chỉnh số lượng trong trang giỏ hàng.
