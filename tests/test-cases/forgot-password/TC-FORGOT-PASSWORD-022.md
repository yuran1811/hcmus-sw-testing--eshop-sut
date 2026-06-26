# TC-FORGOT-PASSWORD-022: Bước 2 - Kiểm tra ẩn mật khẩu khi nhập liệu (GUI Validation - Password Masking)

## Requirement ID

FR-22

## Module / Test type / Technique

forgot-password / GUI Validation / Field Type Check

## Preconditions

- Người dùng đã hoàn thành Bước 1 và đang ở giao diện Bước 2.

## Test data

| Parameter | Value |
| --- | --- |
| newPassword | Reset123! |
| confirmNewPassword | Reset123! |

## Test steps

1. Đứng tại màn hình đặt lại mật khẩu Bước 2.
2. Nhập mật khẩu `Reset123!` vào trường Mật khẩu mới và trường Xác nhận mật khẩu mới.
3. Kiểm tra định dạng hiển thị của các ký tự mật khẩu vừa nhập trên màn hình.
4. Nhấp chuột phải chọn "Kiểm tra phần tử" (Inspect) tại các trường này để kiểm tra mã HTML.

## Expected result

- Các ký tự mật khẩu không hiển thị rõ dưới dạng văn bản thường mà bị ẩn đi dưới dạng dấu chấm tròn hoặc dấu sao (`●` hoặc `*`).
- Mã nguồn HTML của cả 2 trường này phải chứa thuộc tính định dạng `type="password"`.

## Status / Related bugs

Not Run / None
