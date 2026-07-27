# TC-COUPON-001: Admin tạo mã giảm giá loại Phần trăm hợp lệ

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Management / Functional / Equivalence Partitioning

## Preconditions

- Đã đăng nhập Web Admin (`http://localhost:5174`) bằng tài khoản Admin (`admin@eshop.com`)
- Đang ở Tab **Mã giảm giá**

## Test data

| Code | SUMMER10 |
| Type | percent |
| Value | 10 |
| Min Order | 200000 |
| Expired At | 2099-12-31 |
| Max Uses | 1 |

## Test steps

1. Nhập Mã coupon: `SUMMER10`
2. Chọn Loại: `Phần trăm (%)`
3. Nhập Giá trị: `10`
4. Nhập Đơn tối thiểu: `200000`
5. Chọn Ngày hết hạn: `2099-12-31`
6. Nhập Giới hạn/người: `1`
7. Bấm nút **Tạo mã**

## Expected result

- Hệ thống thông báo tạo thành công.
- Mã `SUMMER10` xuất hiện trong bảng danh sách với Loại "Phần trăm", Giá trị "10%", Đơn tối thiểu "200.000 ₫".

## Status / Related bugs

Not Run / None
