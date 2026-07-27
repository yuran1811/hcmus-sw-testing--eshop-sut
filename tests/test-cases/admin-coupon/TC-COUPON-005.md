# TC-COUPON-005: Tạo mã giảm giá Phần trăm với Giá trị > 100% (Boundary)

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Management / Functional / Boundary Value Analysis

## Preconditions

- Đang ở trang Quản lý Mã giảm giá Admin

## Test data

| Code | OVER100 |
| Type | percent |
| Value | 150 |

## Test steps

1. Nhập Mã: `OVER100`
2. Chọn Loại: `Phần trăm (%)`
3. Nhập Giá trị: `150`
4. Bấm **Tạo mã**

## Expected result

- Hệ thống từ chối và cảnh báo giá trị phần trăm không được vượt quá 100%.

## Status / Related bugs

Not Run / None
