# TC-ORDER-HISTORY-014: Định dạng tiền tệ sát trên mốc 1,000 ₫ (BVA - 3-Point BVA: Currency = 1,001)

## Requirement ID

FR-21

## Module / Test type / Technique

order-history / GUI Validation / Boundary Value Analysis (Currency = 1001)

## Preconditions

- Người dùng đã đăng nhập.
- Người dùng có đơn hàng trị giá đúng 1,001 ₫ trong CSDL.

## Test data

| Parameter | Value |
| --- | --- |
| orderId | ORD014 |
| totalAmount | 1001 |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Tìm đơn hàng `ORD014` và kiểm tra hiển thị số tiền.

## Expected result

- Số tiền hiển thị chính xác định dạng phân cách hàng nghìn: `1.001 ₫`.
- Bắt buộc có dấu chấm `.` ngăn cách hàng nghìn.
- Có ký hiệu `₫` ở cuối.

## Status / Related bugs

Not Run / None
