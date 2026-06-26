# TC-FORGOT-PASSWORD-006: Bước 1 - Nhấp nút Quay lại đăng nhập (Functional - Navigation)

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Functional / Navigation check

## Preconditions

- Người dùng đang ở giao diện Quên mật khẩu Bước 1.

## Test data

| Parameter | Value |
| --- | --- |
| N/A | N/A |

## Test steps

1. Truy cập trang chủ EShop tại địa chỉ `http://localhost:5173`.
2. Đi tới trang đăng nhập và chọn "Quên mật khẩu?".
3. Quan sát giao diện để xác nhận sự hiện diện của nút "Quay lại đăng nhập".
4. Nhấp vào nút "Quay lại đăng nhập".

## Expected result

- Hệ thống ngay lập tức chuyển hướng người dùng quay trở lại màn hình Đăng nhập (`http://localhost:5173/login`).
- Form Đăng nhập hiển thị bình thường và không có thông báo lỗi nào sót lại.

## Status / Related bugs

Not Run / None
