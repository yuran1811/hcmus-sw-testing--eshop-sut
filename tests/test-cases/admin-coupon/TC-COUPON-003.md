# TC-COUPON-003: Tạo mã giảm giá với Mã (code) đã tồn tại

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Management / Functional / Equivalence Partitioning

## Preconditions

- Mã `SAVE10` đã có trong CSDL hệ thống

## Test data

| Code | SAVE10 |
| Type | percent |
| Value | 10 |

## Test steps

1. Đăng nhập Admin và chuyển tới tab **Mã giảm giá**
2. Nhập Mã: `SAVE10`
3. Điền các trường khác hợp lệ
4. Bấm **Tạo mã**

## Expected result

- Hệ thống từ chối tạo mã.
- Hiển thị thông báo lỗi rõ ràng "Mã đã tồn tại" hoặc tương tự.

## Status / Related bugs

Not Run / None
