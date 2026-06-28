# TC-CHECKOUT-BVA-003: Thanh toán đơn hàng thất bại khi tổng tiền client gửi nhiều hơn máy chủ tính đúng 1 đơn vị

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Boundary Value Analysis (3-point + 2-point)

## Preconditions

- Người dùng đã đăng nhập vào hệ thống và có Token JWT hợp lệ.
- Người dùng đã thêm 1 "Tai nghe AirPods Pro 2" (giá 6.000.000 ₫) và 1 "Bàn phím cơ Keychron Q1" (giá 4.000.000 ₫) vào giỏ hàng.
- Tổng tiền trong giỏ hàng thực tế do máy chủ tính toán là 10.000.000 ₫.

## Test data

| Field                | Value                                                                  |
| -------------------- | ---------------------------------------------------------------------- |
| Authorization Header | `Bearer <valid_token>`                                                 |
| Request Body         | `{"total_amount": 10000001, "shipping_address": "123 Le Loi, TP.HCM"}` |

## Test steps

1. Đăng nhập và lấy Token JWT hợp lệ.
2. Thêm các sản phẩm trên vào giỏ hàng (tổng tiền 10.000.000 ₫).
3. Gửi yêu cầu POST tới `/api/checkout` với Token JWT và Request Body chứa `total_amount = 10000001` (nhiều hơn 1 đơn vị) và `shipping_address = "123 Le Loi, TP.HCM"`.
4. Kiểm tra phản hồi trả về từ API.
5. Kiểm tra cơ sở dữ liệu để xác nhận không có đơn hàng mới nào được tạo (hoặc nếu được tạo thì giá trị lưu trong DB phải được sửa lại đúng là `10000000`, từ chối giá trị `10000001`).

## Expected result

- API phản hồi với mã trạng thái `400 Bad Request` và thông báo lỗi tổng tiền không chính xác.
- Không có đơn hàng nào được tạo trong cơ sở dữ liệu (hoặc tổng tiền được lưu là 10.000.000 ₫, không được lưu 10.000.001 ₫).

## BVA Coverage

- Tổng tiền gửi lên `total_amount` = `server_calculated_total + 1` (Điểm biên B + 1, invalid mismatch).
- Bao phủ bởi kỹ thuật 3-Point BVA và 2-Point BVA.

## Status / Related bugs

Not Run / None
