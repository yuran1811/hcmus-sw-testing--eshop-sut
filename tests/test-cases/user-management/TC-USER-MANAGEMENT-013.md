# TC-USER-MANAGEMENT-013: Xác thực thẻ tiêu đề H1 đạt chuẩn trên trang quản lý người dùng

## Requirement ID

FR-21

## Module / Test type / Technique

user-management / GUI / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập và ở trên trang quản lý người dùng.

## Test data

| Parameter | Value |
| --- | --- |
| userSession | logged in as admin@eshop.com (role = admin) |

## Test steps

1. Đăng nhập Admin Portal và mở trang "Quản lý Người dùng".
2. Nhấp chuột phải, chọn "Inspect Element" (Kiểm tra phần tử).
3. Mở tab Console hoặc thực hiện tìm kiếm trong Elements với từ khóa `//h1` hoặc tag `<h1>`.
4. Đếm số lượng thẻ `<h1>` xuất hiện trên trang và đọc nội dung văn bản bên trong thẻ.

## Expected result

- Trang quản lý người dùng có **chính xác duy nhất 1 thẻ `<h1>`** (BVA-USER-H1-2).
- Nội dung bên trong thẻ `<h1>` mô tả chính xác nội dung trang bằng tiếng Việt (ví dụ: `<h1>Quản lý Người dùng</h1>` hoặc `<h1>Danh sách Người dùng</h1>`).

## Status / Related bugs

Not Run / None
