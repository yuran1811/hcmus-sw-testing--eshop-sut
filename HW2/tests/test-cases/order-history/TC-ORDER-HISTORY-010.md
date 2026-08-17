# TC-ORDER-HISTORY-010: Kiểm tra dịch trạng thái và phân biệt màu sắc - Đã hủy (chức năng trạng thái)

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / GUI Validation / Equivalence Partitioning (Status canceled)

## Preconditions

- Người dùng đã đăng nhập và có đơn hàng `ORD005` ở trạng thái `canceled` trong CSDL.

## Test data

| Parameter | Value |
| --- | --- |
| orderId | ORD005 |
| statusInDB | canceled |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Tìm đơn hàng `ORD005` trong danh sách và kiểm tra nhãn trạng thái.

## Expected result

- Trạng thái hiển thị rõ ràng bằng tiếng Việt là: `"đã hủy"`.
- Nhãn trạng thái hiển thị màu sắc đặc trưng biểu thị sự thất bại/dừng lại (ví dụ: màu đỏ hoặc màu xám đậm).

## Status / Related bugs

Not Run / None
