---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Checkout] Client có thể sửa và quyết định tổng tiền đơn hàng"
assignees: ""
labels: "type: bug, module: checkout, severity: critical, priority: P0, status: new, found-by: usability-test, type: usability-issue"
---

## Found by Test Case

F05 (Sessions: P01, P02, P03, P05, P06)

## Requirement liên quan

FR-08

## Severity / Priority

Critical / P0

Đây là lỗi integrity/trust-boundary có thể tạo đơn sai giá trị. Priority P0 vì backend nhận số tiền do client cung cấp thay vì tự tính lại.

## Environment

Browser/OS: Chrome, Brave, Microsoft Edge / Windows; Zen / Linux  
URL/build: `https://23127115-testing-hw3.vercel.app/checkout`, observed 01–02/08/2026

## Steps to reproduce

1. Đăng nhập bằng tài khoản hợp lệ.
2. Thêm một sản phẩm có giá khác 1 ₫ vào giỏ và mở checkout.
3. Sửa **Tổng tiền thanh toán** thành `1`.
4. Bấm **Xác Nhận Thanh Toán**.
5. Mở lịch sử đơn hàng và kiểm tra tổng tiền đã lưu.

## Expected result

Tổng tiền là read-only và backend tự tính từ product ID, authoritative price và quantity; request client không thể thay đổi giá trị order.

## Actual result

UI cho sửa tổng tiền. Source xác nhận giá trị sửa được gửi thành `total_amount`, và backend ghi trực tiếp vào order mà không tính lại.

## Source corroboration

- `frontend-web/src/pages/Checkout.jsx`: input number cập nhật `editableTotal` và gửi làm `total_amount`.
- `backend/server.js`: `/api/checkout` lấy `total_amount` từ body rồi INSERT trực tiếp.

## Evidence

- [P06 note — 03:56](../../../../usability-tests/U-001/3_sessions/P06.md)
- [P06 video 03:56](https://drive.google.com/file/d/1Wz8BLp15dhaxPXwhJElNxajRZD6ea_Wy/view?usp=sharing#t=3m56s)
- [P05 video 06:55](https://drive.google.com/file/d/1cBgjcD05Xyzq2sC3j2L85z_iyfAwLI5h/view?usp=drive_link#t=6m55s)

## Review notes

- Re-run với giá thấp hơn, cao hơn, 0 và âm; không dùng dữ liệu production.
- Retest phải kiểm tra cả response và order record, không chỉ input read-only.

## Status

New

## GitHub Issue

Not yet filed
