# TC-ORDER-HISTORY-011: Định dạng tiền tệ cho đơn hàng giá trị tối thiểu (BVA - Currency equal to 1 ₫)

## Requirement ID

FR-21

## Module / Test type / Technique

order-history / GUI Validation / Boundary Value Analysis (Currency = 1 ₫)

## Preconditions

- Người dùng đã đăng nhập.
- Người dùng có đơn hàng với tổng trị giá tối thiểu đúng 1 ₫ trong cơ sở dữ liệu (ngưỡng tối thiểu hợp lệ theo FR-15).

## Test data

| Parameter | Value |
| --- | --- |
| orderId | ORD011 |
| totalAmount | 1 |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Tìm đơn hàng `ORD011` và kiểm tra định dạng hiển thị cột Tổng tiền.

## Expected result

- Số tiền hiển thị đúng định dạng: `1 ₫`.
- Phải có ký hiệu tiền tệ `₫` đi kèm ở phía sau, không sử dụng dấu chấm phân cách hàng nghìn vì giá trị nhỏ hơn 1.000.

## Status / Related bugs

Not Run / None
