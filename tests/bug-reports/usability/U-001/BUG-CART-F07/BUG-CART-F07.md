---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Cart] Cho phép thêm sản phẩm với số lượng 0 hoặc âm"
assignees: ""
labels: "type: bug, module: cart, severity: major, priority: P1, status: new, found-by: usability-test, type: usability-issue"
---

## Found by Test Case

F07 (Sessions: P05, P07)

## Requirement liên quan

FR-06, FR-07, FR-08

## Severity / Priority

Major / P1

Quantity ngoài miền hợp lệ làm sai cart/order total và làm giảm độ tin cậy; 2/7 participant chủ động phát hiện.

## Environment

Browser/OS: Zen / Linux; Microsoft Edge / Windows  
URL/build: `https://23127115-testing-hw3.vercel.app/product/1` (ví dụ), observed 01–02/08/2026

## Steps to reproduce

1. Mở trang chi tiết một sản phẩm.
2. Nhập quantity `0` hoặc `-1`.
3. Bấm **Thêm vào giỏ hàng**; trên build quan sát, bấm lần hai nếu lần đầu không phản hồi.
4. Mở giỏ hàng và xem quantity/thành tiền.

## Expected result

Input chỉ nhận số nguyên ≥1; Add bị disable hoặc hiển thị validation error khi giá trị invalid. Backend cũng từ chối quantity invalid.

## Actual result

Sản phẩm quantity 0/âm được đưa vào giỏ; P07 thấy item 0 đồng có thể đi tiếp tới checkout.

## Source corroboration

`ProductDetail.jsx` không đặt `min=1` và gọi `parseInt(quantity)` rồi add mà không validate.

## Evidence

- [P05 note — 01:50](../../../../usability-tests/U-001/3_sessions/P05.md)
- [P07 note — 04:18](../../../../usability-tests/U-001/3_sessions/P07.md)
- [P05 video 01:50](https://drive.google.com/file/d/1cBgjcD05Xyzq2sC3j2L85z_iyfAwLI5h/view?usp=drive_link#t=1m50s)
- [P07 video 04:18](https://drive.google.com/file/d/1m_XPwGj0JsTt6yPhziYBINCvaFliqJN3/view?usp=sharing#t=4m18s)

## Review notes

- Retest thêm empty, decimal, NaN-like input và very large value; FR yêu cầu số nguyên dương.

## Status

New

## GitHub Issue

Not yet filed
