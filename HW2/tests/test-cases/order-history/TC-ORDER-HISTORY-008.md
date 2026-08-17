# TC-ORDER-HISTORY-008: Kiểm tra dịch trạng thái và phân biệt màu sắc - Đang giao (chức năng trạng thái)

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / GUI Validation / Equivalence Partitioning (Status shipping)

## Preconditions

- Người dùng đã đăng nhập và có đơn hàng `ORD003` ở trạng thái `shipping` trong CSDL.

## Test data

| Parameter | Value |
| --- | --- |
| orderId | ORD003 |
| statusInDB | shipping |

## Test steps

1. Đi tới trang Lịch sử đơn hàng.
2. Tìm đơn hàng `ORD003` trong danh sách và kiểm tra nhãn trạng thái.

## Expected result

- Trạng thái hiển thị rõ ràng bằng tiếng Việt là: `"đang giao"`.
- Nhãn trạng thái hiển thị màu sắc đặc trưng biểu thị hành động đang diễn ra (ví dụ: màu xanh lam nhạt hoặc màu tím nhẹ).

## Status / Related bugs

Not Run / None
