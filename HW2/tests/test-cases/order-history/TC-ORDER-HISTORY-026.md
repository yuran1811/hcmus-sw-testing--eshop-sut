# TC-ORDER-HISTORY-026: Chặn truy cập trực tiếp chi tiết đơn hàng của người dùng khác qua URL hoặc API (Bảo mật IDOR)

## Requirement ID

FR-11, FR-12

## Module / Test type / Technique

order-history / Security / Error Isolation

## Preconditions

- Tài khoản A `user_a@eshop.com` đang đăng nhập và có token JWT hợp lệ.
- Tài khoản B `user_b@eshop.com` sở hữu đơn hàng có ID là `ORD-B-999` trong cơ sở dữ liệu.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as user_a@eshop.com |
| targetOrderId | ORD-B-999 (đơn hàng của người dùng khác) |

## Test steps

1. Đăng nhập EShop bằng Tài khoản A `user_a@eshop.com`.
2. Trên thanh địa chỉ trình duyệt, nhập trực tiếp đường dẫn chi tiết đơn hàng của Tài khoản B: `http://localhost:5173/orders/ORD-B-999` (hoặc `/order-detail?id=ORD-B-999`) và nhấn Enter.
3. Sử dụng công cụ API (Postman hoặc cURL) gửi một request `GET` trực tiếp đến API backend: `http://localhost:3000/api/orders/ORD-B-999` kèm theo token JWT của Tài khoản A ở header `Authorization`.
4. Quan sát mã trạng thái phản hồi HTTP và nội dung trả về từ giao diện cũng như API.

## Expected result

- Hệ thống phát hiện tài khoản đăng nhập hiện tại (`user_a@eshop.com`) không phải là chủ sở hữu hợp pháp của đơn hàng `ORD-B-999`.
- Trực quan trên giao diện: Hệ thống từ chối hiển thị thông tin, hiển thị thông báo lỗi tiếng Việt nổi bật: "Bạn không có quyền xem đơn hàng này!" và tự động điều hướng người dùng về trang Lịch sử đơn hàng của chính họ.
- Tầng API backend: API từ chối trả về dữ liệu và trả về mã lỗi HTTP `403 Forbidden` hoặc `404 Not Found` (để ẩn sự hiện diện của bản ghi nhằm tăng tính bảo mật), kèm thông báo lỗi thân thiện bằng tiếng Việt.
- Không có bất kỳ thông tin nhạy cảm nào của đơn hàng `ORD-B-999` bị rò rỉ sang Tài khoản A.

## Status / Related bugs

Not Run / None
