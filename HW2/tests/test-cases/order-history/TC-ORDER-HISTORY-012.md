# TC-ORDER-HISTORY-012: Định dạng tiền tệ cho đơn hàng dưới 1,000 ₫ (BVA - Currency below 1,000)

## Requirement ID

FR-21

## Module / Test type / Technique

order-history / GUI Validation / Boundary Value Analysis (Currency < 1000)

## Preconditions

- Người dùng đã đăng nhập.
- Người dùng có đơn hàng trị giá 999 ₫ (biên cận dưới của hàng nghìn).

## Test data

| Parameter | Value |
| --- | --- |
| orderId | ORD012 |
| totalAmount | 999 |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Tìm đơn hàng `ORD012` và kiểm tra hiển thị số tiền.

## Expected result

- Số tiền hiển thị đúng định dạng: `999 ₫`.
- Không hiển thị dấu chấm phân cách hàng nghìn (vì chưa đạt 1,000).
- Có ký hiệu `₫` ở cuối.

## Status / Related bugs

Not Run / None
