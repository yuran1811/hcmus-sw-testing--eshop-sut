# TC-CHECKOUT-BVA-004: shipping_address có độ dài 0 tại phía dưới mốc tham chiếu non-empty

## Requirement ID

FR-08 / API Specification 4.3 (Specification-gap characterization)

## Module / Test type / Technique

Checkout API / Robustness-Characterization / Length Reference Analysis (`R = 1`)

## Preconditions

- Người dùng đã đăng nhập và có Token JWT hợp lệ.
- Giỏ hàng phía máy chủ có đúng 1 Keychron Q1 giá 4.000.000 ₫.
- Ghi lại số đơn và snapshot giỏ trước test.

## Test data

| Field                      | Value                                                   |
| -------------------------- | ------------------------------------------------------- |
| Reference point            | `R = 1` ký tự (non-empty String; không phải giới hạn SRS) |
| Test point                 | `R - 1 = 0` ký tự                                        |
| `shipping_address`         | `""`                                                   |
| Request Body               | `{"total_amount": 4000000, "shipping_address": ""}`  |

## Test steps

1. Gửi `POST /api/checkout` với body trên.
2. Kiểm tra response, đơn hàng/địa chỉ trong DB và giỏ sau request.
3. Ghi nhận chính sách thực tế để Product Owner quyết định empty String hợp lệ hay không.

## Expected result

- FR-08 không định nghĩa độ dài tối thiểu, do đó đây là điểm characterization quanh mốc tham chiếu, không phải khẳng định `0` là invalid.
- Hệ thống không trả `500`, không crash và không tạo trạng thái dở dang.
- Nếu chấp nhận: đơn có tổng máy chủ tính đúng, địa chỉ là chuỗi rỗng và giỏ được xóa; nếu từ chối: trả `400`, không tạo đơn và giữ nguyên giỏ.

## BVA Coverage

- `shipping_address.length = 0` (`R - 1` quanh mốc non-empty tham chiếu `R = 1`).
- Overlap với EC12 (empty/blank specification gap), nhưng tách rõ điểm biên độ dài.

## Status / Related bugs

Not Run / N/A
