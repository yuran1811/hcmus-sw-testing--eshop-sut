# TC-COUPON-008: Xem danh sách mã giảm giá trong Web Admin

## Requirement ID

FR-17

## Module / Test type / Technique

Coupon Management / Functional / Equivalence Partitioning

## Preconditions

- Đã có dữ liệu các mã giảm giá mẫu (`SAVE10`, `BIGBUY`, `VIP100`, `EXPIRED`) trong CSDL

## Test data

| Tab | Mã giảm giá |

## Test steps

1. Đăng nhập Web Admin bằng tài khoản Admin
2. Chuyển sang Tab **Mã giảm giá**

## Expected result

- Bảng mã giảm giá hiển thị đầy đủ danh sách mã.
- Mỗi dòng hiển thị đúng Mã (code), Loại, Giá trị (có định dạng % hoặc ₫), Đơn tối thiểu, Hết hạn và Giới hạn/người.
- Mã quá hạn `EXPIRED` hiển thị nhãn/màu đỏ cảnh báo "Hết hạn".

## Status / Related bugs

Not Run / None
