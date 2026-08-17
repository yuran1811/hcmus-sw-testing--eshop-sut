# TC-FORGOT-PASSWORD-005: Bước 1 - Nhập email sai định dạng (Equivalence Partitioning - Invalid Format)

## Requirement ID

FR-03, FR-22

## Module / Test type / Technique

forgot-password / Functional & GUI / Equivalence Partitioning (Invalid Format)

## Preconditions

- Người dùng đang ở giao diện Quên mật khẩu Bước 1.

## Test data

| Parameter | Value |
| --- | --- |
| email | invalid-email |

## Test steps

1. Truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`.
2. Đi tới trang đăng nhập và chọn "Quên mật khẩu?".
3. Nhập chuỗi `invalid-email` (thiếu ký tự `@` và domain) vào trường Email.
4. Nhấp vào nút "Gửi mã OTP".

## Expected result

- Trình duyệt hiển thị cảnh báo định dạng email không hợp lệ (do trường Email bắt buộc phải có thuộc tính `type="email"` theo đặc tả FR-22).
- Nếu vượt qua lớp bảo vệ của trình duyệt, hệ thống backend phải chặn lại và hiển thị thông báo lỗi "Email không đúng định dạng" ngay **phía trên** nút submit.

## Status / Related bugs

Not Run / None
