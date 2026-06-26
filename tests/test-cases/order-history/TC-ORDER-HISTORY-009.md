# TC-ORDER-HISTORY-009: Kiểm tra dịch trạng thái và phân biệt màu sắc - Đã giao (chức năng trạng thái)

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / GUI Validation / Equivalence Partitioning (Status delivered)

## Preconditions

- Người dùng đã đăng nhập và có đơn hàng `ORD004` ở trạng thái `delivered` trong CSDL.

## Test data

| Parameter | Value |
| --- | --- |
| orderId | ORD004 |
| statusInDB | delivered |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Tìm đơn hàng `ORD004` trong danh sách và kiểm tra nhãn trạng thái.

## Expected result

- Trạng thái hiển thị rõ ràng bằng tiếng Việt là: `"đã giao"`.
- Nhãn trạng thái hiển thị màu sắc đặc trưng biểu thị sự hoàn thành an toàn (ví dụ: màu xanh lá cây) để người dùng yên tâm.

## Status / Related bugs

Not Run / None
