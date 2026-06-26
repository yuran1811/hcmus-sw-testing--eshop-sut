# TC-USER-MANAGEMENT-017: Đảm bảo hiển thị an toàn thông tin người dùng, tránh tấn công XSS

## Requirement ID

FR-21

## Module / Test type / Technique

user-management / Security / Error Isolation

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập.
- Hệ thống có một tài khoản người dùng thường với Họ tên chứa mã HTML nguy hiểm: `Nguyễn <script>alert('XSS')</script> Văn A` hoặc địa chỉ chứa thẻ HTML.

## Test data

| Parameter | Value |
| --- | --- |
| userNameInDB | Nguyễn <script>alert('XSS')</script> Văn A |

## Test steps

1. Đăng nhập Admin Portal và mở trang "Quản lý Người dùng".
2. Tìm người dùng có tên chứa mã script trong danh sách.
3. Quan sát hành vi hiển thị của dòng dữ liệu đó trên màn hình (có hộp thoại alert nào xuất hiện hay không).
4. Inspect Element dòng dữ liệu tên này để kiểm tra xem mã script có bị escape thành text an toàn (ví dụ: `&lt;script&gt;`) hay bị render trực tiếp thành thẻ HTML.

## Expected result

- Không có bất kỳ hộp thoại alert nào xuất hiện trên màn hình (tấn công XSS thất bại).
- Họ tên người dùng phải được hiển thị an toàn dưới dạng văn bản thuần thô: `Nguyễn <script>alert('XSS')</script> Văn A` trên bảng.
- Mã nguồn HTML trong DOM phải được escape đúng cách (sử dụng các cơ chế hiển thị an toàn như `innerText` hoặc React JSX curly braces `{}` thay vì `dangerouslySetInnerHTML`).

## Status / Related bugs

Not Run / None
