# TC-COUPON-007: Tạo mã giảm giá với Ngày hết hạn trong quá khứ

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Management / Functional / Boundary Value Analysis

## Preconditions

- Đang ở trang Quản lý Mã giảm giá Admin

## Test data

| Code | PASTEXP |
| Expired At | 2020-01-01 |

## Test steps

1. Nhập Mã: `PASTEXP`
2. Chọn Ngày hết hạn: `2020-01-01` (quá khứ)
3. Điền các trường khác hợp lệ
4. Bấm **Tạo mã**

## Expected result

- Giao diện ngăn chặn chọn ngày trong quá khứ hoặc thông báo lỗi ngày hết hạn phải ở tương lai khi tạo mới.

## Status / Related bugs

Not Run / None
