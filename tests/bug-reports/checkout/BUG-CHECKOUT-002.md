---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Checkout] Hệ thống (Frontend) không gọi API của cart"
labels: "type: bug, module: checkout, severity: major, priority: P2, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-CHECKOUT-001

## Requirement liên quan

FR-08 (Thanh toán)

## Severity / Priority

Major / P2

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Đăng nhập vào hệ thống bằng tài khoản hợp lệ.
2. Thêm sản phẩm vào giỏ hàng và chuyển sang trang thanh toán.
3. Mở Developer Tools (Network tab) để theo dõi các HTTP request.
4. Bấm xác nhận đặt hàng và quan sát các API được gọi.

## Expected result

Hệ thống cần gọi API của cart để đồng bộ dữ liệu (ví dụ: lấy thông tin giỏ hàng trước khi thanh toán, hoặc cập nhật/xoá giỏ hàng sau khi thanh toán xong).

## Actual result

Hệ thống hoàn toàn không gọi API của cart trong suốt quá trình. Việc thiếu đồng bộ dữ liệu qua API này có thể gây ra sai lệch thông tin hiển thị so với dữ liệu thực tế trên máy chủ.

## Evidence

None
