# TC-ORDER-HISTORY-013: Định dạng tiền tệ tại mốc bắt đầu có phân cách hàng nghìn (BVA - 3-Point BVA: Currency = 1,000)

## Requirement ID

FR-21

## Module / Test type / Technique

order-history / GUI Validation / Boundary Value Analysis (Currency = 1000)

## Preconditions

- Người dùng đã đăng nhập.
- Người dùng có đơn hàng trị giá đúng 1,000 ₫ trong CSDL.

## Test data

| Parameter | Value |
| --- | --- |
| orderId | ORD013 |
| totalAmount | 1000 |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Tìm đơn hàng `ORD013` và kiểm tra hiển thị số tiền.

## Expected result

- Số tiền hiển thị chính xác định dạng phân cách hàng nghìn: `1.000 ₫`.
- Bắt buộc có dấu chấm `.` ngăn cách giữa chữ số hàng nghìn và hàng trăm.
- Có ký hiệu `₫` ở cuối.

## Status / Related bugs

Not Run / None
