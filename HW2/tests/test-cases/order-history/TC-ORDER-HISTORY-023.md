# TC-ORDER-HISTORY-023: Xác thực định dạng hiển thị trường Ngày đặt (orderDate)

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / GUI Validation / Equivalence Partitioning

## Preconditions

- Người dùng đã đăng nhập.
- Người dùng có ít nhất một đơn hàng trong cơ sở dữ liệu (ví dụ: đơn hàng đặt ngày 26 tháng 6 năm 2026).

## Test data

| Parameter | Value |
| --- | --- |
| orderId | ORD023 |
| orderDate | 2026-06-26T07:39:15.000Z (chuỗi ISO thô từ DB) |

## Test steps

1. Đi tới trang Lịch sử đơn hàng (`http://localhost:5173/orders`).
2. Tìm đơn hàng `ORD023` trong bảng danh sách đơn hàng.
3. Kiểm tra cột "Ngày đặt" của đơn hàng đó.
4. Xác minh định dạng hiển thị của ngày đặt.

## Expected result

- Trường "Ngày đặt" của đơn hàng hiển thị đầy đủ ngày, tháng, năm.
- Định dạng hiển thị phải thân thiện và rõ ràng theo chuẩn Việt Nam (ví dụ: `26/06/2026` hoặc `26-06-2026`).
- Không được hiển thị chuỗi ngày giờ ISO thô của cơ sở dữ liệu (ví dụ: không được hiển thị dạng `2026-06-26T07:39:15.000Z`).

## Status / Related bugs

Not Run / None
