# TC-COUPON-004: Tạo mã giảm giá với Giá trị <= 0 (Boundary)

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Management / Functional / Boundary Value Analysis

## Preconditions

- Đang ở trang Quản lý Mã giảm giá Admin

## Test data

| Code | ZEROVAL |
| Type | percent |
| Value | 0 |

## Test steps

1. Nhập Mã: `ZEROVAL`
2. Chọn Loại: `Phần trăm`
3. Nhập Giá trị: `0` (hoặc `-5`)
4. Bấm **Tạo mã**

## Expected result

- Giao diện ngăn chặn submit hoặc hiển thị thông báo lỗi yêu cầu Giá trị phải là số dương (> 0).

## Status / Related bugs

Not Run / None
