# BUG-CART-004: Xóa sản phẩm khỏi giỏ hàng không có dialog xác nhận — xóa ngay khi bấm

## Found by Test Case

TC-CART-008, TC-CART-009 (TC-CART-007 cũng liên quan — xem Notes)

## Requirement liên quan

FR-07 (Giỏ hàng — "Hành động Xóa sản phẩm khỏi giỏ bắt buộc phải có dialog xác nhận trước khi thực hiện; không xóa ngay khi bấm nút")

## Severity / Priority

Major / P2

## Environment

- Browser: Chromium (Desktop Chrome)
- OS: Windows 11
- URL: http://localhost:5173 (frontend-web)
- Build: nhánh `anh-khoa`, commit `fdf93ff`

## Steps to reproduce

1. Thêm 1 sản phẩm (ví dụ "iPhone 15 Pro Max") vào giỏ hàng
2. Vào trang Giỏ hàng
3. Bấm nút "Xóa" ở dòng sản phẩm đó

## Expected result

Hệ thống hiển thị dialog xác nhận (có nút xác nhận và nút "Hủy"); chỉ xóa dòng khỏi giỏ nếu người dùng bấm xác nhận. Nếu bấm "Hủy", dòng phải được giữ nguyên.

## Actual result

Không có dialog/popup xác nhận nào xuất hiện — sản phẩm bị xóa khỏi giỏ **ngay lập tức** khi bấm "Xóa". Ảnh chụp đính kèm cho thấy giỏ chỉ còn lại trạng thái sau khi đã xóa, không có bất kỳ bước xác nhận trung gian nào được hiển thị.

## Evidence

- Screenshot (TC-CART-008): `![BUG-CART-004-not-display-dialog](../screenshots/BUG-CART-004-not-display-dialog.png)`
- Screenshot (TC-CART-009 — xóa dòng cuối cùng, không qua dialog nào): `![BUG-CART-004-tc009](../screenshots/BUG-CART-004-tc009-empty-no-dialog.png)`
- Playwright: `cart.spec.ts:149` (TC-CART-008) — `page.getByRole('button', { name: 'Hủy' }).click({ timeout: 5_000 })` timeout vì không tồn tại nút "Hủy" nào trên trang.

## Notes

TC-CART-007 ([cart.spec.ts:126-139](../../e2e/cart.spec.ts#L126-L139)) **pass nhưng vì lý do sai**: test này set `page.once('dialog', (dialog) => dialog.accept())` rồi assert dòng đã bị xóa — nhưng vì app xóa ngay không qua dialog nào, listener đó không bao giờ được gọi, và assertion "đã xóa" vẫn đúng một cách tình cờ. Đây là lỗi thiết kế test (false positive che giấu bug), không phải bằng chứng app hoạt động đúng — nên không dùng TC-CART-007 làm "Found by Test Case" cho bug này.

TC-CART-009 (xóa dòng cuối cùng trong giỏ → giỏ rỗng) test tay xác nhận lại đúng cùng triệu chứng: xóa "ngay lập tức", không có dialog nào xuất hiện trước khi giỏ chuyển sang trạng thái rỗng.
