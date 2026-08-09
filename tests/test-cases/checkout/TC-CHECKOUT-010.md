# TC-CHECKOUT-010: Đặc tả hóa chính sách kiểu dữ liệu shipping_address

## Requirement ID

FR-08 / API Specification 4.3 (Specification-gap characterization)

## Module / Test type / Technique

Checkout API / Robustness-Characterization / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập và có Token JWT hợp lệ.
- Trước mỗi biến thể, giỏ hàng phía máy chủ có đúng 1 "Bàn phím cơ Keychron Q1" giá 4.000.000 ₫.

## Test data

| Variant | `shipping_address` value | JSON type |
| ------- | ------------------------ | --------- |
| A       | `12345`                  | Number    |
| B       | `true`                   | Boolean   |
| C       | `{"line": "123 Le Loi"}` | Object |
| D       | `["123 Le Loi"]`        | Array     |

Mỗi request còn có `total_amount = 4000000` và header `Authorization: Bearer <valid_token>`.

## Test steps

1. Với từng variant, gửi `POST /api/checkout`.
2. Kiểm tra HTTP status và thông báo validation.
3. Ghi nhận số đơn mới, `status`/`total_amount`/địa chỉ của đơn nếu có, và trạng thái giỏ sau request.
4. Đối chiếu state theo nhánh oracle bên dưới rồi khôi phục fixture giỏ trước khi chạy variant kế tiếp.

## Expected result

- API §4.3 chỉ đưa ví dụ chuỗi, chưa công bố schema/type validation; ca này ghi nhận policy thay vì mặc định mọi non-string phải trả đúng `400`.
- Nhánh ưu tiên: trả `400` với thông báo `shipping_address` phải là String, không tạo đơn và không đổi giỏ.
- Nếu implementation cho phép normalize/coerce: quy tắc phải được tài liệu hóa và ổn định; đơn tạo ở trạng thái `pending`, dùng total do server tính, lưu địa chỉ đúng policy rồi xóa giỏ. Không được lưu `[object Object]`, dữ liệu mất mát hoặc nội dung có thể render nguy hiểm.
- Trong mọi nhánh: không `500`, không mutation một phần; total vẫn phải do server tính. Product Owner cần chốt schema chính thức.

## EC / Partition Covered

- EC13 (Specification gap: non-string shipping address)
- OC8 (Deterministic type policy with no partial state)

## Status / Related bugs

Fail / BUG-CHECKOUT-010
