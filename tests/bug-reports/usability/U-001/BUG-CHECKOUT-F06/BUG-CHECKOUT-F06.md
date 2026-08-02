---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Checkout] Giỏ hàng vẫn còn sau khi thanh toán thành công"
assignees: ""
---

## Found by Test Case

F06 (Sessions: P02, P04)

## Requirement liên quan

FR-08

## Severity / Priority

Major / P1

Lỗi gây người dùng nghi ngờ trạng thái order và có nguy cơ thanh toán lặp; workaround là kiểm tra lịch sử đơn.

## Environment

Browser/OS: Brave, Chrome / Windows  
URL/build: `https://23127115-testing-hw3.vercel.app/`, observed 01/08/2026

## Steps to reproduce

1. Đăng nhập và thêm ít nhất một sản phẩm vào giỏ.
2. Checkout và chờ thông báo **Thanh toán thành công**.
3. Điều hướng về Home rồi mở **Giỏ hàng**.

## Expected result

Giỏ hàng được xóa sau response checkout thành công theo FR-08.

## Actual result

Các sản phẩm vừa thanh toán vẫn còn trong giỏ. P02 thử thanh toán lại vì không tin order đã hoàn thành.

## Source corroboration

`frontend-web/src/pages/Checkout.jsx` lấy `clearCart` từ context nhưng success path chỉ gọi `setSuccess(true)` và không gọi `clearCart()`.

## Evidence

- [P02 note — 05:13–05:32](../../../../usability-tests/U-001/3_sessions/P02.md)
- [P04 note — 04:35](../../../../usability-tests/U-001/3_sessions/P04.md)
- [P02 video 05:13](https://drive.google.com/file/d/1UnZxGGsmdV04Kp1MBT1dl3RqPO1Z3t8U/view?usp=sharing#t=313s)
- [P04 video 04:35](https://drive.google.com/file/d/1Wy3gdWqb1sOhwFKaxgG_JJm6SnXKKjI-/view?usp=drive_link#t=275s)

## Review notes

- Retest chỉ clear sau confirmed success; nếu API fail thì cart phải được giữ.

## Status

New

## GitHub Issue

Not yet filed
