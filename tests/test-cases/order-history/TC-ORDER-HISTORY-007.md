# TC-ORDER-HISTORY-007: Kiểm tra dịch trạng thái và phân biệt màu sắc - Đã xác nhận (chức năng trạng thái)

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / GUI Validation / Equivalence Partitioning (Status confirmed)

## Preconditions

- Người dùng đã đăng nhập và có đơn hàng `ORD002` ở trạng thái `confirmed` trong CSDL.

## Test data

| Parameter | Value |
| --- | --- |
| orderId | ORD002 |
| statusInDB | confirmed |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Tìm đơn hàng `ORD002` trong danh sách và kiểm tra nhãn trạng thái.

## Expected result

- Trạng thái hiển thị rõ ràng bằng tiếng Việt là: `"đã xác nhận"`.
- Nhãn trạng thái hiển thị màu sắc đặc trưng biểu thị tính sẵn sàng (ví dụ: màu xanh dương) để phân biệt với các trạng thái khác.

## Status / Related bugs

Not Run / None
