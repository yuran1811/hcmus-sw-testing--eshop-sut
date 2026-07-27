# TC-COUPON-006: Tạo mã giảm giá với Đơn tối thiểu âm (Boundary)

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Management / Functional / Boundary Value Analysis

## Preconditions

- Đang ở trang Quản lý Mã giảm giá Admin

## Test data

| Code | NEGORDER |
| Min Order | -50000 |

## Test steps

1. Nhập Mã: `NEGORDER`
2. Nhập Đơn tối thiểu: `-50000`
3. Bấm **Tạo mã**

## Expected result

- Hệ thống không cho phép nhập số âm hoặc báo lỗi `min_order_amount` phải >= 0.

## Status / Related bugs

Not Run / None
