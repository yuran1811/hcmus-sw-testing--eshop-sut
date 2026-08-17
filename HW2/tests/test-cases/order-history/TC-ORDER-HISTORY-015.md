# TC-ORDER-HISTORY-015: Định dạng tiền tệ cho đơn hàng giá trị lớn (BVA - Currency above 1,000,000)

## Requirement ID

FR-21

## Module / Test type / Technique

order-history / GUI Validation / Boundary Value Analysis (Currency > 1,000,000)

## Preconditions

- Người dùng đã đăng nhập.
- Người dùng có đơn hàng trị giá 1,234,567 ₫ trong CSDL.

## Test data

| Parameter | Value |
| --- | --- |
| orderId | ORD015 |
| totalAmount | 1234567 |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Tìm đơn hàng `ORD015` và kiểm tra hiển thị số tiền.

## Expected result

- Số tiền hiển thị chính xác định dạng phân cách hàng nghìn tại tất cả các vị trí: `1.234.567 ₫`.
- Bắt buộc có dấu chấm `.` tại vị trí ngăn cách hàng triệu và ngăn cách hàng nghìn.
- Có ký hiệu `₫` ở cuối.

## Status / Related bugs

Not Run / None
