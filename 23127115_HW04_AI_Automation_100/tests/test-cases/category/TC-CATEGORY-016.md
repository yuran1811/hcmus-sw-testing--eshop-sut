# TC-CATEGORY-016: Hiển thị an toàn tên danh mục chứa HTML/XSS

## Requirement ID

FR-14, SEC-04

## Module / Test type / Technique

Quản lý Danh mục / Security-Functional / Domain Testing (Malicious Input Partition)

## Preconditions

- Admin đã đăng nhập và có JWT token hợp lệ
- Trang Admin → Categories có thể được mở trong trình duyệt có DevTools

## Test data

| Field | Value |
| ----- | ----- |
| name | `<img src=x onerror=alert('CATEGORY-XSS')>` |
| Token | JWT token hợp lệ của admin |

## Test steps

1. Gửi `POST /api/categories` với payload trong bảng
2. Mở hoặc tải lại trang Admin → Categories
3. Quan sát giao diện, Console và DOM của hàng danh mục vừa tạo

## Expected result

- Chuỗi được xử lý như dữ liệu văn bản, không thực thi JavaScript
- Không xuất hiện alert `CATEGORY-XSS` và không tạo thẻ `<img>` từ dữ liệu nhập
- Nội dung được escape an toàn khi hiển thị trong ô tên danh mục
- Trang quản trị vẫn hoạt động bình thường

## EC / Partition Covered

EC14 (Name chứa HTML/XSS — dữ liệu không tin cậy) + OC8 (Safe text rendering)

## Status / Related bugs

Pass / None

