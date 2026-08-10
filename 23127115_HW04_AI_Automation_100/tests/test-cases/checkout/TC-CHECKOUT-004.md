# TC-CHECKOUT-004: Xử lý an toàn khi tổng tiền client gửi không khớp với máy chủ tính toán

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập vào hệ thống và có Token JWT hợp lệ.
- Người dùng đã thêm 1 "Tai nghe AirPods Pro 2" (giá 6.000.000 ₫) và 1 "Bàn phím cơ Keychron Q1" (giá 4.000.000 ₫) vào giỏ hàng.
- Tổng tiền trong giỏ hàng thực tế do máy chủ tính toán là 10.000.000 ₫.

## Test data

| Field                | Value                    |
| -------------------- | ------------------------ |
| Authorization Header | `Bearer <valid_token>`   |
| Request Body         | `{"total_amount": 1000}` |

## Test steps

1. Đăng nhập và lấy Token JWT hợp lệ.
2. Thêm sản phẩm vào giỏ hàng sao cho tổng tiền thực tế là 10.000.000 ₫.
3. Gửi yêu cầu POST tới `/api/checkout` với Token JWT trong header và Request Body chứa `total_amount = 1000` (giá trị không khớp nhằm gian lận).
4. Kiểm tra phản hồi trả về từ API.
5. Kiểm tra cơ sở dữ liệu để xác nhận không có đơn hàng mới nào được tạo (hoặc nếu được tạo thì tổng tiền phải tự động cập nhật đúng về 10.000.000 ₫, không chấp nhận 1.000 ₫).

## Expected result

- Hợp lệ theo FR-08 nếu hệ thống chọn một trong hai nhánh an toàn:
  - Từ chối bằng `400 Bad Request`, không tạo đơn và không thay đổi giỏ; hoặc
  - Chấp nhận checkout nhưng bỏ qua giá trị client, tự tính và lưu đúng `total_amount = 10000000`, tạo đúng order items rồi xóa giỏ một cách nhất quán.
- Test **Fail** nếu đơn hàng lưu `total_amount = 1000`, dùng item/price giả từ client, hoặc để lại trạng thái order/cart dở dang.

## EC / Partition Covered

- EC7 (Client-sent total_amount mismatches server total)
- OC4 (Safe handling - reject mismatch or use server-authoritative total)

## Status / Related bugs

Fail / BUG-CHECKOUT-003
