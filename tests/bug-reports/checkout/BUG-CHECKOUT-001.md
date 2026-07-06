---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Checkout] Giỏ hàng không được tự động xóa sau khi thanh toán thành công"
labels: "type: bug, module: checkout, severity: Major, priority: P1, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-CHECKOUT-DTT-003, TC-CHECKOUT-PWS-004, TC-CHECKOUT-PWS-009

## Requirement liên quan

FR-08 (Thanh toán)

## Severity / Priority

Major / P1

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Đăng nhập vào tài khoản User.
2. Thêm một hoặc nhiều sản phẩm vào giỏ hàng.
3. Nhấp chọn "Thanh toán".
4. Điền các thông tin thanh toán và xác nhận đặt hàng thành công.
5. Kiểm tra biểu tượng giỏ hàng hoặc truy cập trang giỏ hàng.

## Expected result

Sau khi thanh toán thành công, giỏ hàng của người dùng phải được tự động xóa sạch (trống trơn).

## Actual result

Đơn hàng được tạo thành công nhưng giỏ hàng của người dùng vẫn giữ nguyên các sản phẩm đã thanh toán.

## Evidence

Không có screenshot.
