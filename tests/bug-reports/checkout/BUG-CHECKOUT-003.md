---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Checkout] Hệ thống cho phép thanh toán thành công qua API khi giỏ hàng trống"
labels: "type: bug, module: checkout, severity: Major, priority: P1, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-CHECKOUT-PWS-005

## Requirement liên quan

FR-08 (Thanh toán)

## Severity / Priority

Major / P1

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Đăng nhập vào hệ thống bằng tài khoản User.
2. Đảm bảo giỏ hàng hiện tại trống (không có sản phẩm).
3. Gửi trực tiếp một request API `POST /api/checkout` bằng Postman hoặc cURL với body:
   ```json
   {
     "total_amount": 50000,
     "shipping_address": "123 Đường ABC, Quận 1"
   }
   ```

## Expected result

Hệ thống trả về lỗi 400 Bad Request hoặc 422 Unprocessable Entity báo lỗi giỏ hàng trống, chặn không cho phép checkout.

## Actual result

Hệ thống chấp nhận yêu cầu thanh toán và tạo đơn hàng thành công (trả về status 200 và orderId).

## Evidence

Không có screenshot.
