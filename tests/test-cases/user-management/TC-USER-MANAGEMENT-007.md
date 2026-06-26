# TC-USER-MANAGEMENT-007: Hủy thao tác xóa người dùng khi chọn Hủy trên Dialog xác nhận

## Requirement ID

FR-19

## Module / Test type / Technique

user-management / Functional / Boundary Value Analysis (2-Point BVA)

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập.
- Hệ thống có tài khoản người dùng thường khác tên là `keep-test@eshop.com`.

## Test data

| Parameter | Value |
| --- | --- |
| targetUserToDelete | keep-test@eshop.com |
| deleteAction | click Cancel in dialog |

## Test steps

1. Đăng nhập vào Admin Portal bằng tài khoản `admin@eshop.com` và truy cập trang "Quản lý Người dùng".
2. Tìm tài khoản `keep-test@eshop.com` trong danh sách.
3. Nhấp vào nút "Xóa" (nút màu đỏ) tương ứng với dòng của người dùng này.
4. Quan sát dialog xác nhận xuất hiện trên màn hình.
5. Nhấn nút "Hủy" (hoặc "Quay lại") trong dialog.
6. Quan sát bảng danh sách và cơ sở dữ liệu.

## Expected result

- Dialog xác nhận đóng lại mà không có thay đổi nào được thực hiện.
- Tài khoản `keep-test@eshop.com` vẫn tồn tại nguyên vẹn trong bảng danh sách người dùng.
- Không có thông báo lỗi hay thông báo thành công nào xuất hiện.

## Status / Related bugs

Not Run / None
