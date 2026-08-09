# TC-CHECKOUT-008: Đặc tả hóa hành vi khi bỏ thuộc tính hoặc gửi null cho shipping_address

## Requirement ID

FR-08 / API Specification 4.3 (Specification-gap characterization)

## Module / Test type / Technique

Checkout API / Robustness-Characterization / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập và có Token JWT hợp lệ.
- Trước mỗi biến thể, khôi phục giỏ hàng phía máy chủ về đúng 1 "Bàn phím cơ Keychron Q1" giá 4.000.000 ₫.
- Ghi lại số đơn hàng trước mỗi lần gửi request.

## Test data

| Variant | Request Body                                      | Meaning                         |
| ------- | ------------------------------------------------- | ------------------------------- |
| A       | `{"total_amount": 4000000}`                     | Omitted `shipping_address`      |
| B       | `{"total_amount": 4000000, "shipping_address": null}` | Explicit JSON `null`  |

## Test steps

1. Với từng variant, gửi `POST /api/checkout` bằng Token hợp lệ.
2. Ghi nhận status code, response body, số đơn mới, giá trị địa chỉ trong DB và trạng thái giỏ.
3. So sánh chính sách xử lý giữa omitted và explicit `null`.

## Expected result

- FR-08 không quy định `shipping_address` là bắt buộc, nên test này không tự giả định `200` hay `400` là đúng nghiệp vụ; Product Owner cần chốt chính sách.
- Tiêu chí kỹ thuật tối thiểu: không trả `500`, không crash và không tạo bản ghi dở dang.
- Ghi nhận omitted và explicit `null` độc lập. Hai status khác nhau không tự động là bug khi SRS chưa định nghĩa; khác biệt phải được tài liệu hóa và Product Owner chốt policy.
- Nếu chấp nhận: đơn phải có tổng tiền đúng do máy chủ tính, trạng thái `pending`, địa chỉ `NULL`, và giỏ được xóa.
- Nếu từ chối: trả `400` với lỗi validation rõ ràng, không tạo đơn và không xóa giỏ.

## EC / Partition Covered

- EC11 (Specification gap: omitted or null shipping address)
- OC7 (Deterministic handling without server error or partial state)

## Status / Related bugs

Pass / None
