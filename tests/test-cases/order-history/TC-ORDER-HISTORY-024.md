# TC-ORDER-HISTORY-024: Điều hướng thành công đến trang Chi tiết Đơn hàng từ danh sách Lịch sử

## Requirement ID

FR-11

## Module / Test type / Technique

order-history / Functional / Equivalence Partitioning

## Preconditions

- Tài khoản `test@eshop.com` đã đăng ký và đăng nhập trên hệ thống.
- Tài khoản này có ít nhất một đơn hàng đã đặt thành công (Mã đơn hàng: `ORD-001`).

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as test@eshop.com |
| targetOrderId | ORD-001 |

## Test steps

1. Đăng nhập EShop bằng tài khoản `test@eshop.com`.
2. Truy cập trang "Lịch sử đơn hàng" tại địa chỉ `http://localhost:5173/orders`.
3. Tìm đơn hàng có mã `ORD-001` trong danh sách hiển thị.
4. Nhấp chọn vào liên kết Mã đơn hàng `ORD-001` hoặc nút "Xem chi tiết" tương ứng trên dòng đơn hàng đó.
5. Quan sát URL trình duyệt và nội dung giao diện hiển thị.

## Expected result

- Hệ thống thực hiện chuyển hướng người dùng đến trang Chi tiết đơn hàng thành công.
- URL trình duyệt cập nhật chính xác (ví dụ: `/orders/ORD-001` hoặc `/order-detail?id=ORD-001`).
- Tiêu đề trang hiển thị đúng tiêu đề tiếng Việt "Chi tiết đơn hàng #ORD-001" và tải đúng dữ liệu của đơn hàng `ORD-001`.

## Status / Related bugs

Not Run / None
