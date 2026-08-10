# TC-CHECKOUT-BVA-005: shipping_address có đúng 1 ký tự tại mốc tham chiếu

## Requirement ID

FR-08 / API Specification 4.3 (Specification-gap characterization)

## Module / Test type / Technique

Checkout API / Robustness-Characterization / Length Reference Analysis (`R = 1`)

## Preconditions

- Người dùng đã đăng nhập và có Token JWT hợp lệ.
- Giỏ hàng phía máy chủ có đúng 1 Keychron Q1 giá 4.000.000 ₫.

## Test data

| Field                      | Value                                                    |
| -------------------------- | -------------------------------------------------------- |
| Reference point            | `R = 1` ký tự (không phải giới hạn do SRS công bố)       |
| Test point                 | `R = 1`                                                  |
| `shipping_address`         | `A`                                                      |
| Request Body               | `{"total_amount": 4000000, "shipping_address": "A"}` |

## Test steps

1. Gửi `POST /api/checkout` với body trên.
2. Kiểm tra response và địa chỉ của đơn hàng nếu được tạo.
3. Kiểm tra trạng thái giỏ sau request.

## Expected result

- Do SRS chưa quy định min length, hệ thống phải xử lý có kiểm soát và Product Owner cần xác nhận tính hợp lệ nghiệp vụ của địa chỉ 1 ký tự.
- Nếu String không rỗng được chấp nhận theo API hiện tại: trả `200`, lưu đúng `A`, tổng tiền `4000000`, trạng thái `pending` và xóa giỏ.
- Nếu có validation nghiệp vụ ngoài tài liệu: trả `400` rõ ràng, không tạo đơn/không xóa giỏ; tuyệt đối không trả `500` hay cắt/đổi chuỗi âm thầm.

## BVA Coverage

- `shipping_address.length = 1` (reference point `R`).
- Đây là điểm characterization, không phải min boundary do SRS quy định.

## Status / Related bugs

Pass / None
