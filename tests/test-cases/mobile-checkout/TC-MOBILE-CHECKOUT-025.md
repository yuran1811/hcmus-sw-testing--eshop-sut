# TC-MOBILE-CHECKOUT-025: Đặt hàng thành công trên Mobile với cơ chế chống gửi trùng lặp đơn hàng (Double Submit)

## Requirement ID

FR-20

## Module / Test type / Technique

mobile-checkout / Functional / Network Latency (Idempotency)

## Preconditions

- Tài khoản `test@eshop.com` đã đăng nhập trên ứng dụng di động EShop.
- Người dùng đang ở màn hình Checkout với giỏ hàng trị giá 450.000 ₫.
- Giả lập mạng di động có độ trễ cao (High Latency hoặc kết nối 3G rất yếu) sử dụng công cụ Network Throttling.

## Test data

| Parameter | Value |
| --- | --- |
| networkState | Connected with high latency (e.g., 3000ms delay) |

## Test steps

1. Mở ứng dụng di động EShop, đăng nhập và điều hướng đến màn hình Checkout.
2. Nhập thông tin giao hàng đầy đủ.
3. Nhấn nút "Đặt hàng".
4. Ngay lập tức, trong khi vòng xoay loading đang hiển thị và yêu cầu API đang được gửi đi (chưa nhận phản hồi từ server), cố ý nhấn liên tục nút "Đặt hàng" thêm 2 đến 3 lần nữa thật nhanh.
5. Chờ cho đến khi mạng hoàn tất xử lý và hiển thị thông báo phản hồi của hệ thống.
6. Truy cập vào mục "Lịch sử đơn hàng" trên Mobile hoặc kiểm tra cơ sở dữ liệu backend để xác minh số lượng đơn hàng được tạo.

## Expected result

- Ngay sau lượt nhấn nút "Đặt hàng" đầu tiên, nút này phải được chuyển sang trạng thái vô hiệu hóa (disabled) hoặc hiển thị vòng xoay loading chặn tương tác, không cho phép người dùng click thêm.
- Hệ thống chỉ xử lý và gửi duy nhất **1 yêu cầu tạo đơn hàng** lên backend (hoặc backend áp dụng cơ chế Idempotency để chặn tạo đơn trùng lặp).
- Chỉ có đúng **1 đơn hàng** duy nhất được tạo ra thành công trong hệ thống. Không phát sinh đơn hàng trùng lặp và không trừ tiền nhiều lần.

## Status / Related bugs

Not Run / None
