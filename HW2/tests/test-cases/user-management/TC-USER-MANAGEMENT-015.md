# TC-USER-MANAGEMENT-015: Biên thẻ tiêu đề H1 - Có nhiều hơn 1 thẻ H1 trên trang

## Requirement ID

FR-21

## Module / Test type / Technique

user-management / GUI / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập và ở trên trang quản lý người dùng.

## Test data

| Parameter | Value |
| --- | --- |
| h1TagsCount | 2 |

## Test steps

1. Đăng nhập Admin Portal và mở trang "Quản lý Người dùng".
2. Nhấp chuột phải, chọn "Inspect Element" (Kiểm tra phần tử).
3. Tìm kiếm thẻ `<h1>` trong cây DOM.
4. Phát hiện và đếm số lượng thẻ `<h1>` hiển thị (đếm được 2 thẻ trở lên).

## Expected result

- Kết quả đếm trả về từ 2 thẻ `<h1>` trở lên trên cùng một trang (BVA-USER-H1-3).
- Hệ thống vi phạm tiêu chuẩn giao diện chung FR-21 (Mỗi trang chỉ có đúng 1 thẻ H1) -> Ghi nhận lỗi cấu trúc giao diện.

## Status / Related bugs

Not Run / None
