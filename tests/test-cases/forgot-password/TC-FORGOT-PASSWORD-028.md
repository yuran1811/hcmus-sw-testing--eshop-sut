# TC-FORGOT-PASSWORD-028: Ngăn chặn truy cập trực tiếp vào giao diện đặt lại mật khẩu Bước 2 (Bypass Step 1)

## Requirement ID

FR-03

## Module / Test type / Technique

forgot-password / Security / Flow Validation (Session Check)

## Preconditions

- Người dùng chưa thực hiện yêu cầu gửi mã OTP ở Bước 1.
- Trình duyệt sạch session/cache (hoặc đang ở chế độ ẩn danh).

## Test data

| Parameter | Value |
| --- | --- |
| sessionState | empty / step 1 not completed |

## Test steps

1. Mở trình duyệt ở chế độ ẩn danh.
2. Nhập trực tiếp địa chỉ URL của trang Bước 2 vào thanh địa chỉ: `http://localhost:5173/forgot-password/step-2`.
3. Nhấn Enter để thực hiện truy cập.
4. Quan sát phản ứng và hành vi điều hướng của ứng dụng.

## Expected result

- Hệ thống phát hiện phiên đặt lại mật khẩu chưa được khởi tạo (chưa hoàn thành Bước 1).
- Chặn không cho phép hiển thị giao diện nhập mật khẩu mới ở Bước 2.
- Tự động điều hướng (redirect) người dùng quay trở lại trang Bước 1 (`http://localhost:5173/forgot-password` hoặc `/forgot-password/step-1`) kèm thông báo yêu cầu nhập email trước.

## Status / Related bugs

Not Run / None
