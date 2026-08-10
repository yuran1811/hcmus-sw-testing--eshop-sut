# TC-CHECKOUT-BVA-006: shipping_address có 2 ký tự ngay trên mốc tham chiếu

## Requirement ID

FR-08 / API Specification 4.3 (Specification-gap characterization)

## Module / Test type / Technique

Checkout API / Robustness-Characterization / Length Reference Analysis (`R = 1`)

## Preconditions

- Người dùng đã đăng nhập và có Token JWT hợp lệ.
- Giỏ hàng phía máy chủ có đúng 1 Keychron Q1 giá 4.000.000 ₫.

## Test data

| Field                      | Value                                                     |
| -------------------------- | --------------------------------------------------------- |
| Reference point            | `R = 1` ký tự (không phải giới hạn do SRS công bố)        |
| Test point                 | `R + 1 = 2`                                               |
| `shipping_address`         | `AB`                                                      |
| Request Body               | `{"total_amount": 4000000, "shipping_address": "AB"}` |

## Test steps

1. Gửi `POST /api/checkout` với body trên.
2. Kiểm tra response, đơn hàng/địa chỉ trong DB và giỏ sau request.
3. So sánh với kết quả của TC-CHECKOUT-BVA-004 và TC-CHECKOUT-BVA-005.

## Expected result

- Không có lỗi `500`, crash, cắt chuỗi hoặc thay đổi dữ liệu âm thầm tại bước chuyển từ 1 sang 2 ký tự.
- Nếu API chấp nhận non-empty String: trả `200`, lưu đúng `AB`, tổng `4000000`, trạng thái `pending` và xóa giỏ.
- Nếu tồn tại min length nghiệp vụ chưa được tài liệu hóa: trả `400`, không tạo đơn/không xóa giỏ và mở yêu cầu cập nhật SRS.

## BVA Coverage

- `shipping_address.length = 2` (reference point `R + 1`).
- Đây là điểm characterization, không phải min boundary do SRS quy định.

## Status / Related bugs

Pass / None
