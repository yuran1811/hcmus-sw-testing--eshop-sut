# TC-MOBILE-CHECKOUT-013: Backend chặn thanh toán và tự tính lại tiền khi client gửi tổng tiền sai lệch

## Requirement ID

FR-12

## Module / Test type / Technique

mobile-checkout / Security / Error Isolation

## Preconditions

- Tài khoản `test@eshop.com` đang đăng nhập trên ứng dụng di động.
- Giỏ hàng di động đang có các sản phẩm với tổng giá trị thực tế là 450.000 ₫.

## Test data

| Parameter | Value |
| --- | --- |
| realTotalAmount | 450.000 ₫ |
| tamperedTotalAmountSent | 10.000 ₫ (cố tình chỉnh sửa từ client) |

## Test steps

1. Đăng nhập tài khoản `test@eshop.com` trên client di động.
2. Sử dụng công cụ can thiệp proxy (như Charles Proxy hoặc Fiddler) hoặc gửi API request trực tiếp đến backend để tạo đơn hàng.
3. Cố tình sửa đổi giá trị tham số `total_amount` trong payload gửi lên backend thành `10000` (10.000 ₫) thay vì giá trị thực tế `450000`.
4. Gửi request POST thanh toán đến API: `http://localhost:3000/api/orders`.
5. Quan sát mã trạng thái HTTP và nội dung phản hồi từ backend.

## Expected result

- Backend phát hiện giá trị tổng tiền gửi lên không khớp với giá trị thực tế tự tính toán của hệ thống.
- Backend từ chối xử lý và chặn giao dịch thanh toán này.
- HTTP Status Code trả về là `400 Bad Request` hoặc `422 Unprocessable Entity`.
- Nội dung phản hồi trả về lỗi tiếng Việt rõ ràng: "Tổng số tiền đơn hàng không hợp lệ!".
- Không có đơn hàng nào được tạo ra trong cơ sở dữ liệu với giá trị sai lệch.

## Status / Related bugs

Not Run / None
