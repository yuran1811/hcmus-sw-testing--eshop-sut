# TC-USER-MANAGEMENT-020: Xử lý tranh chấp đồng thời khi hai Admin cùng thực hiện xóa một người dùng (Concurrency)

## Requirement ID

FR-19

## Module / Test type / Technique

user-management / Functional / Error Isolation

## Preconditions

- Cả hai Admin A và Admin B đều đang đăng nhập vào Admin Portal và cùng đứng tại trang "Quản lý Người dùng".
- Danh sách người dùng hiển thị trên màn hình của cả hai Admin đều chứa người dùng `test_user@eshop.com` (chưa bị xóa).

## Test data

| Parameter | Value |
| --- | --- |
| adminASession | logged in as admin_a@eshop.com |
| adminBSession | logged in as admin_b@eshop.com |
| targetUser | test_user@eshop.com |

## Test steps

1. Admin A nhấn nút "Xóa" màu đỏ tương ứng với người dùng `test_user@eshop.com` và nhấn nút "Xác nhận" trên hộp thoại xác nhận. Giao dịch của Admin A hoàn thành và xóa thành công người dùng khỏi hệ thống.
2. Ngay lập tức (trước khi trang của Admin B tự động reload hoặc tải lại danh sách mới), Admin B cũng nhấn nút "Xóa" màu đỏ tương ứng với người dùng `test_user@eshop.com` vẫn đang hiển thị trên màn hình của mình, sau đó nhấn nút "Xác nhận".
3. Quan sát thông báo phản hồi hiển thị trên màn hình của Admin B và trạng thái hoạt động của máy chủ backend.

## Expected result

- Yêu cầu xóa của Admin A được thực thi thành công; người dùng bị xóa khỏi cơ sở dữ liệu.
- Yêu cầu xóa gửi sau của Admin B bị backend chặn lại và xử lý ngoại lệ một cách an toàn do bản ghi mục tiêu không còn tồn tại.
- Máy chủ backend không bị crash hay gặp lỗi hệ thống nghiêm trọng; API trả về mã lỗi HTTP `404 Not Found` hoặc `400 Bad Request`.
- Màn hình của Admin B hiển thị thông báo lỗi bằng tiếng Việt thân thiện: "Người dùng không tồn tại hoặc đã bị xóa trước đó!".

## Status / Related bugs

Not Run / None
