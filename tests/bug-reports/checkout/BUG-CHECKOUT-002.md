---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Checkout] Backend chấp nhận số tiền thanh toán (total_amount) do client gửi lên mà không tự động tính lại"
labels: "type: bug, module: checkout, severity: Critical, priority: P0, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-CHECKOUT-DTT-004, TC-CHECKOUT-PWS-006, TC-CHECKOUT-PWS-008

## Requirement liên quan

FR-08 (Thanh toán)

## Severity / Priority

Critical / P0

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Đăng nhập vào hệ thống bằng tài khoản User.
2. Thêm sản phẩm vào giỏ hàng (ví dụ: Tổng tiền thực tế là 500,000 ₫).
3. Tiến hành thanh toán, sử dụng DevTools hoặc Burp Suite/Postman để chặn bắt API request `POST /checkout`.
4. Thay đổi giá trị trường `total_amount` trong payload body gửi lên thành `0` hoặc `1` (hoặc bất kỳ giá trị sai lệch nào).
5. Gửi request đi và hoàn tất giao dịch.

## Expected result

Backend phải tự tính lại tổng tiền dựa trên cơ sở dữ liệu giỏ hàng, bỏ qua trường `total_amount` do client gửi lên, hoặc từ chối xử lý request (lỗi 400 Bad Request). Giao dịch phải được ghi nhận đúng giá trị thực tế.

## Actual result

Backend chấp nhận luôn giá trị `total_amount` sai lệch do client gửi lên và tạo đơn hàng thanh toán thành công với số tiền bị thao túng (ví dụ: Đơn hàng tạo thành công với giá 0 ₫).

## Evidence

Không có screenshot.
