# TC-USER-MANAGEMENT-006: Xóa thành công người dùng khác sau khi xác nhận qua Dialog

## Requirement ID

FR-19

## Module / Test type / Technique

user-management / Functional / Boundary Value Analysis (2-Point BVA)

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập.
- Hệ thống có 1 tài khoản người dùng thường khác tên là `delete-test@eshop.com`.

## Test data

| Parameter | Value |
| --- | --- |
| targetUserToDelete | delete-test@eshop.com |
| deleteAction | click Confirm in dialog |

## Test steps

1. Đăng nhập vào Admin Portal bằng tài khoản `admin@eshop.com` và truy cập trang "Quản lý Người dùng".
2. Tìm tài khoản `delete-test@eshop.com` trong bảng danh sách.
3. Nhấp vào nút "Xóa" (nút màu đỏ) tương ứng với dòng của người dùng này.
4. Quan sát dialog xác nhận xuất hiện trên màn hình.
5. Nhấn nút "Xác nhận" (hoặc "Đồng ý") trong dialog.
6. Quan sát bảng danh sách và thông báo phản hồi từ hệ thống.

## Expected result

- Một dialog xác nhận xuất hiện hỏi: "Bạn có chắc chắn muốn xóa người dùng này không?" bằng tiếng Việt (FR-24).
- Sau khi nhấn "Xác nhận", dialog đóng lại, hệ thống thực hiện xóa tài khoản `delete-test@eshop.com` khỏi cơ sở dữ liệu.
- Bảng danh sách lập tức cập nhật, dòng của người dùng `delete-test@eshop.com` biến mất.
- Hiển thị thông báo phản hồi trực quan (toast notification) thành công màu xanh lá hoặc thông báo thân thiện: "Xóa người dùng thành công!".

## Status / Related bugs

Not Run / None
