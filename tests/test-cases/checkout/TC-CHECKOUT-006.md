# TC-CHECKOUT-006: Thanh toán với địa chỉ Unicode, dấu tiếng Việt và dấu câu hợp lệ

## Requirement ID

FR-08 / API Specification 4.3

## Module / Test type / Technique

Checkout API / Functional / Domain Testing (Equivalence Partitioning)

## Preconditions

- Người dùng đã đăng nhập và có Token JWT hợp lệ.
- Giỏ hàng phía máy chủ chứa đúng 1 "Bàn phím cơ Keychron Q1" giá 4.000.000 ₫.

## Test data

| Field                | Value                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Authorization Header | `Bearer <valid_token>`                                                                                                            |
| `shipping_address`   | `Số 12/3, Đường Nguyễn Huệ, P. Bến Nghé, Q.1, TP. Hồ Chí Minh`                                                                    |
| Request Body         | `{"total_amount": 4000000, "shipping_address": "Số 12/3, Đường Nguyễn Huệ, P. Bến Nghé, Q.1, TP. Hồ Chí Minh"}`                |

## Test steps

1. Đăng nhập và thêm đúng sản phẩm nêu trong Preconditions vào giỏ.
2. Gửi `POST /api/checkout` với dữ liệu trên.
3. Kiểm tra response và đơn hàng vừa tạo.
4. Mở nơi hiển thị địa chỉ của đơn hàng để đối chiếu chuỗi.

## Expected result

- API trả `200 OK`; đơn hàng `pending` có tổng tiền máy chủ tính là `4000000`.
- Toàn bộ chữ có dấu, dấu `/`, dấu phẩy, dấu chấm và khoảng trắng trong địa chỉ được lưu/hiển thị đúng, không lỗi mã hóa và không bị cắt âm thầm.
- Giỏ hàng được xóa sau khi tạo đơn thành công.

## EC / Partition Covered

- EC9 (Valid shipping address with Unicode and common punctuation)
- OC5 (Address accepted and preserved without encoding loss)

## Status / Related bugs

Not Run / N/A
