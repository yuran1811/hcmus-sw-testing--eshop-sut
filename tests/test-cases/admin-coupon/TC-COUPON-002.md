# TC-COUPON-002: Admin tạo mã giảm giá loại Cố định hợp lệ

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Management / Functional / Equivalence Partitioning

## Preconditions

- Đã đăng nhập Web Admin bằng tài khoản Admin
- Đang ở Tab **Mã giảm giá**

## Test data

| Code | FIX50K |
| Type | fixed |
| Value | 50000 |
| Min Order | 300000 |
| Expired At | 2099-12-31 |
| Max Uses | 2 |

## Test steps

1. Nhập Mã: `FIX50K`
2. Chọn Loại: `Số tiền cố định (₫)`
3. Nhập Giá trị: `50000`
4. Nhập Đơn tối thiểu: `300000`
5. Chọn Hết hạn: `2099-12-31`
6. Nhập Giới hạn: `2`
7. Bấm **Tạo mã**

## Expected result

- Mã `FIX50K` tạo thành công.
- Bảng hiển thị Loại "Cố định", Giá trị "50.000 ₫", Đơn tối thiểu "300.000 ₫", Giới hạn "2 lần".

## Status / Related bugs

Not Run / None
