# TC-CHECKOUT-004: Thanh toán đơn hàng thất bại khi tổng tiền client gửi không khớp với máy chủ tính toán

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

- API phản hồi với mã trạng thái `400 Bad Request` và thông báo lỗi không khớp tổng tiền (ví dụ: `"Total amount mismatch"`).
- Hoặc nếu chấp nhận tạo đơn hàng, tổng tiền lưu trong cơ sở dữ liệu của đơn hàng đó bắt buộc phải là `10000000` (tính lại từ giỏ hàng), không được lưu giá trị `1000` do client gửi lên.
- Trình tự khuyên dùng: Từ chối yêu cầu thanh toán không hợp lệ với mã `400 Bad Request`.

## EC / Partition Covered

- EC7 (Client-sent total_amount mismatches server total)
- OC4 (Error - Total Mismatch)

## Status / Related bugs

Fail / BUG-CHECKOUT-004
