# TC-ORDER-HISTORY-006: Kiểm tra dịch trạng thái và phân biệt màu sắc - Chờ xác nhận (chức năng trạng thái)

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / GUI Validation / Equivalence Partitioning (Status pending)

## Preconditions

- Người dùng đã đăng nhập và đang ở trang Lịch sử đơn hàng.
- Người dùng có đơn hàng mã `ORD001` đang ở trạng thái `pending` trong CSDL.

## Test data

| Parameter | Value |
| --- | --- |
| orderId | ORD001 |
| statusInDB | pending |

## Test steps

1. Đi tới trang Lịch sử đơn hàng (`http://localhost:5173/orders`).
2. Tìm đơn hàng `ORD001` trong danh sách.
3. Kiểm tra văn bản hiển thị tại cột Trạng thái và màu sắc của nhãn trạng thái này.

## Expected result

- Trạng thái hiển thị rõ ràng bằng tiếng Việt là: `"chờ xác nhận"`.
- Nhãn trạng thái hiển thị màu sắc đặc trưng cảnh báo/đang chờ (ví dụ: màu vàng hoặc màu cam) để dễ dàng phân biệt trực quan.

## Status / Related bugs

Not Run / None
