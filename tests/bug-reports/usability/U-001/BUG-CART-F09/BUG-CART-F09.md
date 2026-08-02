---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Cart] Thêm cùng sản phẩm tạo nhiều dòng thay vì tăng số lượng"
assignees: ""
---

## Found by Test Case

F09 (Sessions: P02, P03)

## Requirement liên quan

FR-07

## Severity / Priority

Major / P2

Duplicate lines và click lặp do thiếu feedback làm tổng đơn phình to, gây confusion; người dùng vẫn có thể xóa item thủ công.

## Environment

Browser/OS: Brave / Windows; Chrome / Windows  
URL/build: `https://23127115-testing-hw3.vercel.app/`, observed 01/08/2026

## Steps to reproduce

1. Ở Home, chọn một product card.
2. Bấm **Thêm vào giỏ** hai lần cho cùng product.
3. Mở **Giỏ hàng**.

## Expected result

Cart có một dòng cho product; quantity của dòng đó tăng lên 2 theo FR-07.

## Actual result

Cart có hai dòng riêng cho cùng product. P02 bấm lặp vì thiếu feedback và thấy bill tăng bất ngờ.

## Source corroboration

`CartContext.jsx` luôn `setCart([...cart, { ...product, quantity }])`, không tìm product ID hiện có để merge.

## Evidence

- [P02 note — 00:44](../../../../usability-tests/U-001/3_sessions/P02.md)
- [P03 note — OQ-01](../../../../usability-tests/U-001/3_sessions/P03.md)
- [P02 video 00:44](https://drive.google.com/file/d/1UnZxGGsmdV04Kp1MBT1dl3RqPO1Z3t8U/view?usp=sharing#t=44s)

## Review notes

- Retest add từ Home, Product Detail và hỗn hợp hai route.
- Verify quantity arithmetic and cart total after merge.

## Status

New

## GitHub Issue

Not yet filed
