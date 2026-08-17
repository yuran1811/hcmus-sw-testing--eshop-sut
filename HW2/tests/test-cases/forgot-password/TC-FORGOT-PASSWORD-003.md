# TC-FORGOT-PASSWORD-003: Bước 1 - Để trống trường Email (Boundary Value Analysis - Empty Check)

## Requirement ID

FR-03, FR-22

## Module / Test type / Technique

forgot-password / Functional & GUI / Boundary Value Analysis (Empty Input)

## Preconditions

- Người dùng đang ở giao diện Quên mật khẩu Bước 1.

## Test data

| Parameter | Value |
| --- | --- |
| email | "" (để trống) |

## Test steps

1. Truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`.
2. Đi tới trang đăng nhập và chọn "Quên mật khẩu?".
3. Để trống trường Email.
4. Nhấp vào nút "Gửi mã OTP".

## Expected result

- Hệ thống không thực hiện gửi yêu cầu và ngăn chặn submit.
- Thông báo lỗi "Email không được để trống" xuất hiện ngay **phía trên** nút submit (không xuất hiện bên dưới nút).
- Trường Email hiển thị viền đỏ cảnh báo lỗi.

## Status / Related bugs

Not Run / None
