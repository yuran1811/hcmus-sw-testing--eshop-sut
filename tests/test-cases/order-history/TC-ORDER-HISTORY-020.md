# TC-ORDER-HISTORY-020: Lọc đơn hàng theo trạng thái và hiển thị bảng rỗng khi không có đơn hàng tương ứng

## Requirement ID

FR-24

## Module / Test type / Technique

order-history / GUI / Equivalence Partitioning

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập.
- Tài khoản này có 5 đơn hàng trong DB nhưng tất cả đều ở trạng thái "đã giao" (delivered). Không có đơn hàng nào ở trạng thái "đã hủy" (canceled).

## Test data

| Parameter | Value |
| --- | --- |
| filterStatus | Canceled |
| ordersInDB | 5 orders (all Delivered) |

## Test steps

1. Đăng nhập EShop bằng tài khoản `test@eshop.com` và truy cập trang "Lịch sử đơn hàng".
2. Tại bộ lọc trạng thái đơn hàng (các tab hoặc nút lọc), chọn trạng thái "Đã hủy".
3. Quan sát giao diện hiển thị của bảng danh sách.

## Expected result

- Bảng danh sách đơn hàng trống hoàn toàn.
- Hệ thống hiển thị giao diện trang trống (Empty State) cho bộ lọc hoạt động theo tiêu chuẩn FR-24 gồm:
  - Icon minh họa thân thiện.
  - Dòng thông báo tiếng Việt: "Không tìm thấy đơn hàng nào ở trạng thái Đã hủy!".

## Status / Related bugs

Not Run / None
