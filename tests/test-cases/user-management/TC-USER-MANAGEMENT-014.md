# TC-USER-MANAGEMENT-014: Biên thẻ tiêu đề H1 - Không có thẻ H1 nào trên trang

## Requirement ID

FR-21

## Module / Test type / Technique

user-management / GUI / Boundary Value Analysis (3-Point BVA)

## Preconditions

- Tài khoản Admin `admin@eshop.com` đang đăng nhập và ở trên trang quản lý người dùng.

## Test data

| Parameter | Value |
| --- | --- |
| h1TagsCount | 0 |

## Test steps

1. Đăng nhập Admin Portal và mở trang "Quản lý Người dùng".
2. Nhấp chuột phải, chọn "Inspect Element" (Kiểm tra phần tử).
3. Tìm kiếm thẻ `<h1>` trong cây DOM.
4. Xác nhận sự thiếu hụt thẻ `<h1>` (đếm được 0 thẻ).

## Expected result

- Kết quả đếm trả về 0 thẻ `<h1>` trên trang (BVA-USER-H1-1).
- Hệ thống vi phạm tiêu chuẩn giao diện chung FR-21 và cấu trúc chuẩn SEO -> Ghi nhận lỗi cấu trúc giao diện.

## Status / Related bugs

Not Run / None
